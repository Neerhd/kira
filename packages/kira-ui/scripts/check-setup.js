#!/usr/bin/env node
// @neerhd/kira-ui setup validator
// Run from your project root: node node_modules/@neerhd/kira-ui/scripts/check-setup.js

import fs from "fs";
import path from "path";

const cwd = process.cwd();
let passed = 0;
let failed = 0;

function ok(msg) {
  console.log(`  ✓ ${msg}`);
  passed++;
}

function fail(msg, fix) {
  console.log(`  ✗ ${msg}`);
  console.log(`    Fix: ${fix}`);
  failed++;
}

function findFile(candidates) {
  for (const candidate of candidates) {
    const full = path.join(cwd, candidate);
    if (fs.existsSync(full)) return full;
  }
  return null;
}

function findTsxFiles(dir, results = []) {
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findTsxFiles(full, results);
    } else if (/\.(tsx|ts)$/.test(entry.name)) {
      results.push(full);
    }
  }
  return results;
}

console.log("\nkira-ui setup check\n");

// Check 1 — postcss.config.mjs exists and has correct plugin order
console.log("1. PostCSS config");
const postcssCandidates = ["postcss.config.mjs", "postcss.config.js", "postcss.config.cjs"];
const postcssPath = findFile(postcssCandidates);

if (!postcssPath) {
  fail("postcss.config.mjs not found", 'Create postcss.config.mjs with "postcss-import" before "@tailwindcss/postcss"');
} else {
  const postcssContent = fs.readFileSync(postcssPath, "utf8");
  const hasPostcssImport = postcssContent.includes("postcss-import");
  const hasTailwind = postcssContent.includes("@tailwindcss/postcss");
  const importIndex = postcssContent.indexOf("postcss-import");
  const tailwindIndex = postcssContent.indexOf("@tailwindcss/postcss");

  if (!hasPostcssImport) {
    fail(
      '"postcss-import" not found in PostCSS config',
      'Add "postcss-import": {} before "@tailwindcss/postcss": {} in ' + path.basename(postcssPath)
    );
  } else if (!hasTailwind) {
    fail(
      '"@tailwindcss/postcss" not found in PostCSS config',
      'Add "@tailwindcss/postcss": {} after "postcss-import": {} in ' + path.basename(postcssPath)
    );
  } else if (importIndex > tailwindIndex) {
    fail(
      '"postcss-import" must come before "@tailwindcss/postcss"',
      'Reorder plugins in ' + path.basename(postcssPath) + ': "postcss-import" first, then "@tailwindcss/postcss"'
    );
  } else {
    ok('"postcss-import" is present and ordered before "@tailwindcss/postcss"');
  }
}

// Check 2 — globals.css has the explicit dist/style.css import
console.log("\n2. globals.css — kira style import");
const globalsCandidates = [
  "app/globals.css",
  "src/app/globals.css",
  "styles/globals.css",
  "src/styles/globals.css",
];
const globalsPath = findFile(globalsCandidates);

if (!globalsPath) {
  fail("globals.css not found", 'Create app/globals.css and add @import "@neerhd/kira-ui/dist/style.css"; at the top');
} else {
  const globalsContent = fs.readFileSync(globalsPath, "utf8");
  const hasExplicitPath = globalsContent.includes("@neerhd/kira-ui/dist/style.css");
  const hasAliasImport = globalsContent.includes("@neerhd/kira-ui/styles");

  if (hasAliasImport && !hasExplicitPath) {
    fail(
      'Found @import "@neerhd/kira-ui/styles" — alias not reliable with postcss-import',
      'Change to @import "@neerhd/kira-ui/dist/style.css"; (explicit path required)'
    );
  } else if (!hasExplicitPath) {
    fail(
      'Missing @import "@neerhd/kira-ui/dist/style.css"',
      'Add @import "@neerhd/kira-ui/dist/style.css"; at the top of ' + path.relative(cwd, globalsPath)
    );
  } else {
    ok('@import "@neerhd/kira-ui/dist/style.css" found in ' + path.relative(cwd, globalsPath));
  }
}

// Check 3 — globals.css has @source pointing at kira-ui.es.js
console.log("\n3. globals.css — @source directive");
if (!globalsPath) {
  fail("globals.css not found — cannot check @source", 'Create globals.css and add @source "../node_modules/@neerhd/kira-ui/dist/kira-ui.es.js";');
} else {
  const globalsContent = fs.readFileSync(globalsPath, "utf8");
  const hasSource = globalsContent.includes("kira-ui.es.js");

  if (!hasSource) {
    fail(
      'Missing @source directive for kira-ui bundle',
      'Add @source "../node_modules/@neerhd/kira-ui/dist/kira-ui.es.js"; after the kira @import in ' + path.relative(cwd, globalsPath)
    );
  } else {
    ok('@source directive for kira-ui.es.js found');
  }
}

// Check 4 — No kira style imports in .tsx or .ts files
console.log("\n4. No kira style imports in JS/TS files");
const tsxFiles = findTsxFiles(path.join(cwd, "app"))
  .concat(findTsxFiles(path.join(cwd, "src")));

const kiraImportPattern = /import\s+["']@neerhd\/kira-ui\/(styles|dist\/style\.css)["']/;
const offenders = tsxFiles.filter((f) => kiraImportPattern.test(fs.readFileSync(f, "utf8")));

if (offenders.length > 0) {
  offenders.forEach((f) => {
    fail(
      `Kira style import found in ${path.relative(cwd, f)}`,
      "Remove this import — styles must only be imported in globals.css via @import"
    );
  });
} else {
  ok("No kira style imports found in .tsx/.ts files");
}

// Summary
console.log("\n" + "─".repeat(40));
if (failed === 0) {
  console.log(`  All ${passed} checks passed. kira-ui is set up correctly.\n`);
} else {
  console.log(`  ${passed} passed, ${failed} failed. Fix the issues above and re-run.\n`);
  process.exit(1);
}
