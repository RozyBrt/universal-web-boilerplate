#!/usr/bin/env ts-node
const moduleName = process.argv[2];
if (!moduleName) { console.error("Usage: ts-node generate-module.ts <ModuleName>"); process.exit(1); }
console.log(`Generating module: ${moduleName}`);
