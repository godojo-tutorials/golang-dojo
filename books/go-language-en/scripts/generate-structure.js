#!/usr/bin/env node
/**
 * Generate folder structure from curriculum.yaml
 * Creates all necessary directories and article.md templates
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

// article.md template
function createArticleTemplate(topic, module, block) {
  return `---
title: "${topic.title}"
description: "${topic.description}"
slug: ${topic.slug}
published: false
---

# ${topic.title}

> ${topic.description}

## Introduction

TODO: Add introduction

## Main Content

TODO: Add main content

## Code Examples

\`\`\`go
package main

func main() {
    // TODO: Add example
}
\`\`\`

## Practice

TODO: Add exercises

## Summary

TODO: Add summary
`;
}

// Create _index.yaml for block
function createBlockIndex(block) {
  return yaml.stringify({
    id: block.id,
    order: block.order,
    title: block.title,
    description: block.description,
    modulesCount: block.modules.length
  });
}

// Create _index.yaml for module
function createModuleIndex(module, block) {
  return yaml.stringify({
    id: module.id,
    order: module.order,
    title: module.title,
    block: block.id,
    topicsCount: module.topics.length
  });
}

// Generate structure
for (const block of curriculum.blocks) {
  const blockDir = join(rootDir, 'content', `${String(block.order).padStart(2, '0')}-${block.id}`);

  if (!existsSync(blockDir)) {
    mkdirSync(blockDir, { recursive: true });
    createdDirs++;
  }

  const blockIndexPath = join(blockDir, '_index.yaml');
  if (!existsSync(blockIndexPath)) {
    writeFileSync(blockIndexPath, createBlockIndex(block));
    createdFiles++;
  }

  for (const module of block.modules) {
    totalModules++;
    const moduleDir = join(blockDir, `${String(module.order).padStart(2, '0')}-${module.id}`);

    if (!existsSync(moduleDir)) {
      mkdirSync(moduleDir, { recursive: true });
      createdDirs++;
    }

    const moduleIndexPath = join(moduleDir, '_index.yaml');
    if (!existsSync(moduleIndexPath)) {
      writeFileSync(moduleIndexPath, createModuleIndex(module, block));
      createdFiles++;
    }

    for (const topic of module.topics) {
      totalTopics++;
      const topicDir = join(moduleDir, topic.slug);

      if (!existsSync(topicDir)) {
        mkdirSync(topicDir, { recursive: true });
        createdDirs++;
      }

      const articlePath = join(topicDir, 'article.md');
      if (!existsSync(articlePath)) {
        writeFileSync(articlePath, createArticleTemplate(topic, module, block));
        createdFiles++;
      }
    }
  }
}

console.log(`\n✅ Generation complete!`);
console.log(`   Modules: ${totalModules}`);
console.log(`   Topics: ${totalTopics}`);
console.log(`   Directories created: ${createdDirs}`);
console.log(`   Files created: ${createdFiles}`);
