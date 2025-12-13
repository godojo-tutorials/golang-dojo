#!/usr/bin/env node
/**
 * generate-sidebar.js
 * Generates Starlight sidebar config from toc.json
 *
 * Output: src/data/sidebar.json
 * Format matches Starlight sidebar config
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const frontendDir = join(__dirname, '..');
const dataDir = join(frontendDir, 'src', 'data');

// Read toc.json
const tocPath = join(dataDir, 'toc.json');
const tocData = JSON.parse(readFileSync(tocPath, 'utf8'));

// Generate sidebar for each language
const sidebars = {};

for (const [lang, data] of Object.entries(tocData)) {
  if (!data.blocks || data.blocks.length === 0) {
    sidebars[lang] = [];
    continue;
  }

  const sidebar = [];

  for (const block of data.blocks) {
    // Each block becomes a collapsible group
    const group = {
      label: block.title,
      collapsed: true,
      items: [],
    };

    for (const module of block.modules) {
      // If module has multiple topics, create a subgroup
      if (module.topics.length > 1) {
        const subgroup = {
          label: module.title,
          collapsed: true,
          items: module.topics.map(topic => ({
            label: topic.title,
            link: `/${lang}/${topic.slug}/`,
          })),
        };
        group.items.push(subgroup);
      } else if (module.topics.length === 1) {
        // Single topic - add directly
        const topic = module.topics[0];
        group.items.push({
          label: topic.title,
          link: `/${lang}/${topic.slug}/`,
        });
      }
    }

    if (group.items.length > 0) {
      sidebar.push(group);
    }
  }

  sidebars[lang] = sidebar;
}

// Write sidebar.json
const sidebarPath = join(dataDir, 'sidebar.json');
writeFileSync(sidebarPath, JSON.stringify(sidebars, null, 2));
console.log(`✅ Generated sidebar.json`);

// Also output for astro.config.mjs (just Russian for now as example)
console.log('\n📋 Sidebar config for astro.config.mjs:');
console.log(JSON.stringify(sidebars.ru, null, 2));
