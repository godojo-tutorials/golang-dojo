#!/usr/bin/env node
/**
 * Generate folder structure from curriculum.yaml (v2)
 * Creates all necessary directories and .md stub templates
 *
 * Structure: content/{block.path}/{module.path?}/{topic.file}
 * flat: true — topics directly in block folder
 * flat: false/absent — topics inside module folders
 */

import { readFileSync, mkdirSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import yaml from 'yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

// Read curriculum.yaml
const curriculumPath = join(rootDir, 'curriculum.yaml');
const curriculum = yaml.parse(readFileSync(curriculumPath, 'utf8'));

console.log(`📚 Generating structure from curriculum.yaml`);
console.log(`   Blocks: ${curriculum.blocks.length}`);

let totalModules = 0;
let totalTopics = 0;
let createdDirs = 0;
let createdFiles = 0;
let skippedFiles = 0;

// Article template
function createArticleTemplate(topic) {
  return `---
title: "${topic.title}"
description: "${topic.description || ''}"
slug: ${topic.slug}
published: false
---

# ${topic.title}

> TODO: Description

## Introduction

TODO

## Summary

TODO
`;
}

// Generate structure
for (const block of curriculum.blocks) {
  const contentDir = join(rootDir, 'content');
  const blockDir = join(contentDir, block.path);

  if (!existsSync(blockDir)) {
    mkdirSync(blockDir, { recursive: true });
    createdDirs++;
  }

  if (block.flat && block.topics) {
    // Flat block — topics directly in block
    for (const topic of block.topics) {
      totalTopics++;
      const filePath = join(blockDir, topic.file);

      if (!existsSync(filePath)) {
        writeFileSync(filePath, createArticleTemplate(topic));
        createdFiles++;
      } else {
        skippedFiles++;
      }
    }
  } else if (block.modules) {
    // Block with modules
    for (const module of block.modules) {
      totalModules++;
      const moduleDir = join(blockDir, module.path);

      if (!existsSync(moduleDir)) {
        mkdirSync(moduleDir, { recursive: true });
        createdDirs++;
      }

      for (const topic of module.topics) {
        totalTopics++;
        const filePath = join(moduleDir, topic.file);

        if (!existsSync(filePath)) {
          writeFileSync(filePath, createArticleTemplate(topic));
          createdFiles++;
        } else {
          skippedFiles++;
        }
      }
    }
  }
}

console.log(`\n✅ Generation complete!`);
console.log(`   Modules: ${totalModules}`);
console.log(`   Topics: ${totalTopics}`);
console.log(`   Directories created: ${createdDirs}`);
console.log(`   Files created: ${createdFiles}`);
console.log(`   Skipped (already exist): ${skippedFiles}`);
