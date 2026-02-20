#!/usr/bin/env node
/**
 * Генерация структуры папок из curriculum.yaml (v2)
 * Создаёт все необходимые директории и шаблоны .md файлов
 *
 * Структура: content/{block.path}/{module.path?}/{topic.file}
 * flat: true — топики прямо в блоке
 * flat: false/отсутствует — топики в модулях
 */

import { readFileSync, mkdirSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import yaml from 'yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

// Читаем curriculum.yaml
const curriculumPath = join(rootDir, 'curriculum.yaml');
const curriculum = yaml.parse(readFileSync(curriculumPath, 'utf8'));

console.log(`📚 Генерация структуры из curriculum.yaml`);
console.log(`   Блоков: ${curriculum.blocks.length}`);

let totalModules = 0;
let totalTopics = 0;
let createdDirs = 0;
let createdFiles = 0;
let skippedFiles = 0;

// Шаблон article.md
function createArticleTemplate(topic) {
  return `---
title: "${topic.title}"
description: "${topic.description || ''}"
slug: ${topic.slug}
published: false
---

# ${topic.title}

> TODO: Описание

## Введение

TODO

## Итоги

TODO
`;
}

// Генерируем структуру
for (const block of curriculum.blocks) {
  const contentDir = join(rootDir, 'content');
  const blockDir = join(contentDir, block.path);

  // Создаём директорию блока
  if (!existsSync(blockDir)) {
    mkdirSync(blockDir, { recursive: true });
    createdDirs++;
  }

  if (block.flat && block.topics) {
    // Flat block — топики прямо в блоке
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

console.log(`\n✅ Генерация завершена!`);
console.log(`   Модулей: ${totalModules}`);
console.log(`   Топиков: ${totalTopics}`);
console.log(`   Создано директорий: ${createdDirs}`);
console.log(`   Создано файлов: ${createdFiles}`);
console.log(`   Пропущено (уже существуют): ${skippedFiles}`);
