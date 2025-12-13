#!/usr/bin/env node
/**
 * Генерация структуры папок из curriculum.yaml
 * Создаёт все необходимые директории и шаблоны article.md
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

// Шаблон article.md
function createArticleTemplate(topic, module, block) {
  return `---
title: "${topic.title}"
description: "${topic.description}"
slug: ${topic.slug}
published: false
---

# ${topic.title}

> ${topic.description}

## Введение

TODO: Добавить введение

## Основная часть

TODO: Добавить основной контент

## Примеры кода

\`\`\`go
package main

func main() {
    // TODO: Добавить пример
}
\`\`\`

## Практика

TODO: Добавить упражнения

## Итоги

TODO: Добавить итоги
`;
}

// Создаём _index.yaml для блока
function createBlockIndex(block) {
  return yaml.stringify({
    id: block.id,
    order: block.order,
    title: block.title,
    titleEn: block.titleEn,
    description: block.description,
    modulesCount: block.modules.length
  });
}

// Создаём _index.yaml для модуля
function createModuleIndex(module, block) {
  return yaml.stringify({
    id: module.id,
    order: module.order,
    title: module.title,
    titleEn: module.titleEn,
    block: block.id,
    topicsCount: module.topics.length
  });
}

// Генерируем структуру
for (const block of curriculum.blocks) {
  const blockDir = join(rootDir, 'content', `${String(block.order).padStart(2, '0')}-${block.id}`);

  // Создаём директорию блока
  if (!existsSync(blockDir)) {
    mkdirSync(blockDir, { recursive: true });
    createdDirs++;
  }

  // Создаём _index.yaml для блока
  const blockIndexPath = join(blockDir, '_index.yaml');
  if (!existsSync(blockIndexPath)) {
    writeFileSync(blockIndexPath, createBlockIndex(block));
    createdFiles++;
  }

  for (const module of block.modules) {
    totalModules++;
    const moduleDir = join(blockDir, `${String(module.order).padStart(2, '0')}-${module.id}`);

    // Создаём директорию модуля
    if (!existsSync(moduleDir)) {
      mkdirSync(moduleDir, { recursive: true });
      createdDirs++;
    }

    // Создаём _index.yaml для модуля
    const moduleIndexPath = join(moduleDir, '_index.yaml');
    if (!existsSync(moduleIndexPath)) {
      writeFileSync(moduleIndexPath, createModuleIndex(module, block));
      createdFiles++;
    }

    for (const topic of module.topics) {
      totalTopics++;
      const topicDir = join(moduleDir, topic.slug);

      // Создаём директорию топика
      if (!existsSync(topicDir)) {
        mkdirSync(topicDir, { recursive: true });
        createdDirs++;
      }

      // Создаём article.md
      const articlePath = join(topicDir, 'article.md');
      if (!existsSync(articlePath)) {
        writeFileSync(articlePath, createArticleTemplate(topic, module, block));
        createdFiles++;
      }
    }
  }
}

console.log(`\n✅ Генерация завершена!`);
console.log(`   Модулей: ${totalModules}`);
console.log(`   Топиков: ${totalTopics}`);
console.log(`   Создано директорий: ${createdDirs}`);
console.log(`   Создано файлов: ${createdFiles}`);
