#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Copy remotion folder to .next/server directory for serverless deployments
 * This ensures the remotion files are available in production environments
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.join(__dirname, '..', 'remotion');
const targetDir = path.join(__dirname, '..', '.next', 'server', 'remotion');

console.log('📦 Copying remotion folder to .next/server...');

try {
  // Create target directory if it doesn't exist
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
    console.log('✅ Created directory:', targetDir);
  }

  // Copy all files from remotion to .next/server/remotion
  const files = fs.readdirSync(sourceDir);

  files.forEach(file => {
    const sourceFile = path.join(sourceDir, file);
    const targetFile = path.join(targetDir, file);

    const stat = fs.statSync(sourceFile);

    if (stat.isFile()) {
      fs.copyFileSync(sourceFile, targetFile);
      console.log(`  ✓ Copied ${file}`);
    }
  });

  console.log('✅ Successfully copied remotion folder to production build!');
  process.exit(0);
} catch (error) {
  console.error('❌ Error copying remotion folder:', error.message);
  process.exit(1);
}
