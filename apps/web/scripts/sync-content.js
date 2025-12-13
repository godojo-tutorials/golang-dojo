#!/usr/bin/env node
/**
 * sync-content.js
 * Syncs content from books/ to frontend
 *
 * What it does:
 * 1. Reads curriculum.yaml from books/go-language-ru and books/go-language-en
 * 2. Copies article.md files, transforming to Starlight format
 * 3. Generates toc.json for table of contents (per language)
 * 4. Adds prev/next navigation
 * 5. Only syncs topics with published: true
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import yaml from 'yaml';
import matter from 'gray-matter';

const __dirname = dirname(fileURLToPath(import.meta.url));
const frontendDir = join(__dirname, '..');

// Language configurations
const languages = [
  {
    code: 'ru',
    bookDir: join(frontendDir, '..', '..', 'books', 'go-language-ru'),
    label: 'Русский',
    prevLabel: '← Предыдущий',
    nextLabel: 'Следующий →',
  },
  {
    code: 'en',
    bookDir: join(frontendDir, '..', '..', 'books', 'go-language-en'),
    label: 'English',
    prevLabel: '← Previous',
    nextLabel: 'Next →',
  },
];

const dataDir = join(frontendDir, 'src', 'data');

console.log('🔄 Syncing content from book repositories...\n');

// Create data directory
mkdirSync(dataDir, { recursive: true });

// Store TOC data for all languages
const allTocData = {};

// Load authors for all languages first
const authorsMap = {};
for (const lang of languages) {
  const authorsPath = join(lang.bookDir, 'authors.yaml');
  if (existsSync(authorsPath)) {
    const authorsData = yaml.parse(readFileSync(authorsPath, 'utf8'));
    authorsMap[lang.code] = {};
    for (const author of (authorsData.authors || [])) {
      authorsMap[lang.code][author.id] = author;
    }
  } else {
    authorsMap[lang.code] = {};
  }
}

// Process each language
for (const lang of languages) {
  console.log(`\n📖 Processing ${lang.label} (${lang.code})...`);

  const curriculumPath = join(lang.bookDir, 'curriculum.yaml');
  const contentSourceDir = join(lang.bookDir, 'content');
  const contentDestDir = join(frontendDir, 'src', 'content', 'docs', lang.code);

  // Check if book directory exists
  if (!existsSync(curriculumPath)) {
    console.log(`   ⚠️  Skipping ${lang.code}: curriculum.yaml not found at ${curriculumPath}`);
    allTocData[lang.code] = { blocks: [] };
    continue;
  }

  // Read curriculum
  const curriculum = yaml.parse(readFileSync(curriculumPath, 'utf8'));
  console.log(`   📚 Found ${curriculum.blocks.length} blocks`);

  // Clean and recreate destination directory (except index.mdx and authors.mdx)
  if (existsSync(contentDestDir)) {
    // Keep index.mdx and authors.mdx, remove everything else
    const indexPath = join(contentDestDir, 'index.mdx');
    const authorsPath = join(contentDestDir, 'authors.mdx');
    const indexContent = existsSync(indexPath) ? readFileSync(indexPath, 'utf8') : null;
    const authorsContent = existsSync(authorsPath) ? readFileSync(authorsPath, 'utf8') : null;
    rmSync(contentDestDir, { recursive: true, force: true });
    mkdirSync(contentDestDir, { recursive: true });
    if (indexContent) {
      writeFileSync(indexPath, indexContent);
    }
    if (authorsContent) {
      writeFileSync(authorsPath, authorsContent);
    }
  } else {
    mkdirSync(contentDestDir, { recursive: true });
  }

  // Collect all topics with block info for breadcrumbs
  const allTopics = [];
  for (const block of curriculum.blocks) {
    for (const module of block.modules) {
      for (const topic of module.topics) {
        allTopics.push({
          slug: topic.slug,
          title: topic.title,
          description: topic.description,
          block: block.id,
          blockTitle: block.title,
          module: module.id,
          moduleTitle: module.title,
        });
      }
    }
  }

  console.log(`   📄 Total topics: ${allTopics.length}`);

  // Find source file
  function findSourceFile(block, module, topic) {
    const blockNums = Array.from({ length: 20 }, (_, i) => String(i + 1).padStart(2, '0'));

    for (const blockNum of blockNums) {
      const blockPath = join(contentSourceDir, `${blockNum}-${block}`);
      if (!existsSync(blockPath)) continue;

      const moduleNums = Array.from({ length: 80 }, (_, i) => String(i + 1).padStart(2, '0'));
      for (const moduleNum of moduleNums) {
        const modulePath = join(blockPath, `${moduleNum}-${module}`);
        if (!existsSync(modulePath)) continue;

        const articlePath = join(modulePath, topic, 'article.md');
        if (existsSync(articlePath)) {
          return articlePath;
        }
      }
    }
    return null;
  }

  // Filter published topics
  const publishedTopics = [];

  for (const topic of allTopics) {
    const sourcePath = findSourceFile(topic.block, topic.module, topic.slug);
    if (!sourcePath) continue;

    const sourceContent = readFileSync(sourcePath, 'utf8');
    const { data: sourceFrontmatter } = matter(sourceContent);

    if (sourceFrontmatter.published === true) {
      publishedTopics.push(topic);
    }
  }

  console.log(`   📢 Published topics: ${publishedTopics.length}`);

  // Sync published topics
  let syncedCount = 0;

  for (let i = 0; i < publishedTopics.length; i++) {
    const topic = publishedTopics[i];
    const prev = i > 0 ? publishedTopics[i - 1] : null;
    const next = i < publishedTopics.length - 1 ? publishedTopics[i + 1] : null;

    const sourcePath = findSourceFile(topic.block, topic.module, topic.slug);
    if (!sourcePath) continue;

    const sourceContent = readFileSync(sourcePath, 'utf8');
    const { data: sourceFrontmatter, content } = matter(sourceContent);

    // Remove first h1 if it exists (Starlight generates h1 from title)
    let finalContent = content.replace(/^\s*#\s+[^\n]+\n*/m, '');

    // Calculate reading time (words / 200 wpm)
    const wordCount = finalContent.split(/\s+/).filter(w => w.length > 0).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    // Get author name for frontmatter
    let authorName = null;
    if (sourceFrontmatter.author) {
      const authorData = authorsMap[lang.code][sourceFrontmatter.author];
      authorName = authorData ? authorData.name : sourceFrontmatter.author;
    }

    // Create Starlight frontmatter with meta for custom PageTitle component
    const starlightFrontmatter = {
      title: sourceFrontmatter.title || topic.title,
      description: sourceFrontmatter.description || topic.description,
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 3,
      },
      // Custom meta for PageTitle override
      author: sourceFrontmatter.author || null,
      authorName: authorName,
      updatedAt: sourceFrontmatter.updatedAt || null,
      readingTime: readingTime,
    };

    // Add navigation to content
    if (prev || next) {
      finalContent += '\n\n---\n\n';
      finalContent += '<nav class="lesson-nav">\n';
      if (prev) {
        finalContent += `  <a href="/${lang.code}/${prev.slug}/" class="lesson-nav-link">\n`;
        finalContent += `    <span class="lesson-nav-label">${lang.prevLabel}</span>\n`;
        finalContent += `    <span class="lesson-nav-title">${prev.title}</span>\n`;
        finalContent += `  </a>\n`;
      } else {
        finalContent += '  <div></div>\n';
      }
      if (next) {
        finalContent += `  <a href="/${lang.code}/${next.slug}/" class="lesson-nav-link" style="text-align: right;">\n`;
        finalContent += `    <span class="lesson-nav-label">${lang.nextLabel}</span>\n`;
        finalContent += `    <span class="lesson-nav-title">${next.title}</span>\n`;
        finalContent += `  </a>\n`;
      } else {
        finalContent += '  <div></div>\n';
      }
      finalContent += '</nav>\n';
    }

    // Write file
    const output = matter.stringify(finalContent, starlightFrontmatter);
    const destPath = join(contentDestDir, `${topic.slug}.md`);
    writeFileSync(destPath, output);
    syncedCount++;
  }

  console.log(`   ✅ Synced: ${syncedCount} files`);

  // Generate TOC data (only published)
  const publishedSlugs = new Set(publishedTopics.map(t => t.slug));

  allTocData[lang.code] = {
    blocks: curriculum.blocks
      .map(block => {
        const filteredModules = block.modules
          .map(module => {
            const filteredTopics = module.topics.filter(topic => publishedSlugs.has(topic.slug));
            if (filteredTopics.length === 0) return null;
            return {
              id: module.id,
              title: module.title,
              topics: filteredTopics.map(topic => ({
                slug: topic.slug,
                title: topic.title,
              })),
            };
          })
          .filter(Boolean);

        if (filteredModules.length === 0) return null;
        return {
          id: block.id,
          title: block.title,
          modules: filteredModules,
        };
      })
      .filter(Boolean),
  };
}

// Write combined TOC data
writeFileSync(join(dataDir, 'toc.json'), JSON.stringify(allTocData, null, 2));
console.log(`\n📋 Created toc.json with ${Object.keys(allTocData).length} languages`);

// Book titles per language
const bookTitles = {
  ru: 'Учебник Go',
  en: 'Go Tutorial',
};

// Generate sidebar config - per language (for reference)
const sidebars = {};

for (const [lang, data] of Object.entries(allTocData)) {
  if (!data.blocks || data.blocks.length === 0) {
    sidebars[lang] = [];
    continue;
  }

  const chapters = [];

  for (const block of data.blocks) {
    // Each block becomes a collapsible group
    const group = {
      label: block.title,
      collapsed: false,
      items: [],
    };

    for (const module of block.modules) {
      // Each module with its topics
      if (module.topics.length > 1) {
        // Multiple topics - create subgroup
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
        // Single topic - add directly with module title
        const topic = module.topics[0];
        group.items.push({
          label: topic.title,
          link: `/${lang}/${topic.slug}/`,
        });
      }
    }

    if (group.items.length > 0) {
      chapters.push(group);
    }
  }

  // Wrap all chapters under the book
  sidebars[lang] = [
    {
      label: bookTitles[lang] || 'Go Tutorial',
      collapsed: false,
      items: chapters,
    },
  ];
}

writeFileSync(join(dataDir, 'sidebar.json'), JSON.stringify(sidebars, null, 2));
console.log(`📑 Created sidebar.json`);

// Generate unified sidebar with translations for Starlight
// This creates a single sidebar that works for all locales
function generateUnifiedSidebar() {
  // Build topic map: slug -> { ru: title, en: title }
  const topicTitles = {};
  const moduleTitles = {};
  const blockTitles = {};

  for (const [lang, data] of Object.entries(allTocData)) {
    if (!data.blocks) continue;
    for (const block of data.blocks) {
      if (!blockTitles[block.id]) blockTitles[block.id] = {};
      blockTitles[block.id][lang] = block.title;

      for (const module of block.modules) {
        if (!moduleTitles[module.id]) moduleTitles[module.id] = {};
        moduleTitles[module.id][lang] = module.title;

        for (const topic of module.topics) {
          if (!topicTitles[topic.slug]) topicTitles[topic.slug] = {};
          topicTitles[topic.slug][lang] = topic.title;
        }
      }
    }
  }

  // Use Russian as base structure (primary content)
  const ruData = allTocData['ru'];
  if (!ruData || !ruData.blocks || ruData.blocks.length === 0) {
    return [];
  }

  const chapters = [];

  for (const block of ruData.blocks) {
    const translations = {};
    if (blockTitles[block.id]?.en) {
      translations.en = blockTitles[block.id].en;
    }

    const group = {
      label: block.title,
      ...(Object.keys(translations).length > 0 && { translations }),
      collapsed: false,
      items: [],
    };

    for (const module of block.modules) {
      const moduleTranslations = {};
      if (moduleTitles[module.id]?.en) {
        moduleTranslations.en = moduleTitles[module.id].en;
      }

      if (module.topics.length > 1) {
        const subgroup = {
          label: module.title,
          ...(Object.keys(moduleTranslations).length > 0 && { translations: moduleTranslations }),
          collapsed: true,
          items: module.topics.map(topic => {
            const topicTranslations = {};
            if (topicTitles[topic.slug]?.en) {
              topicTranslations.en = topicTitles[topic.slug].en;
            }
            return {
              label: topic.title,
              ...(Object.keys(topicTranslations).length > 0 && { translations: topicTranslations }),
              slug: topic.slug,
            };
          }),
        };
        group.items.push(subgroup);
      } else if (module.topics.length === 1) {
        const topic = module.topics[0];
        const topicTranslations = {};
        if (topicTitles[topic.slug]?.en) {
          topicTranslations.en = topicTitles[topic.slug].en;
        }
        group.items.push({
          label: topic.title,
          ...(Object.keys(topicTranslations).length > 0 && { translations: topicTranslations }),
          slug: topic.slug,
        });
      }
    }

    if (group.items.length > 0) {
      chapters.push(group);
    }
  }

  // Book wrapper with translations
  return [
    {
      label: bookTitles['ru'],
      translations: { en: bookTitles['en'] },
      collapsed: false,
      items: chapters,
    },
  ];
}

const unifiedSidebar = generateUnifiedSidebar();
writeFileSync(join(dataDir, 'sidebar-unified.json'), JSON.stringify(unifiedSidebar, null, 2));
console.log(`📑 Created sidebar-unified.json (with translations)`);

// Sync authors from all books - merge by ID
const mergedAuthors = {};

for (const lang of languages) {
  const authorsPath = join(lang.bookDir, 'authors.yaml');

  if (existsSync(authorsPath)) {
    const authorsData = yaml.parse(readFileSync(authorsPath, 'utf8'));
    const authors = authorsData.authors || [];

    for (const author of authors) {
      if (!mergedAuthors[author.id]) {
        // First time seeing this author
        mergedAuthors[author.id] = {
          id: author.id,
          name: author.name,
          books: [lang.code],
          role: { [lang.code]: author.role },
          bio: { [lang.code]: author.bio },
          quote: author.quote || null,
          github: author.github || null,
          telegram: author.telegram || null,
          twitter: author.twitter || null,
        };
      } else {
        // Author exists, add this book's data
        mergedAuthors[author.id].books.push(lang.code);
        mergedAuthors[author.id].role[lang.code] = author.role;
        mergedAuthors[author.id].bio[lang.code] = author.bio;
        // Update quote/social if not set
        if (author.quote && !mergedAuthors[author.id].quote) {
          mergedAuthors[author.id].quote = author.quote;
        }
        if (author.github && !mergedAuthors[author.id].github) {
          mergedAuthors[author.id].github = author.github;
        }
        if (author.telegram && !mergedAuthors[author.id].telegram) {
          mergedAuthors[author.id].telegram = author.telegram;
        }
        if (author.twitter && !mergedAuthors[author.id].twitter) {
          mergedAuthors[author.id].twitter = author.twitter;
        }
      }
    }
    console.log(`👤 Found ${authors.length} authors in ${lang.code} book`);
  }
}

// Convert to array for easier iteration
const authorsArray = Object.values(mergedAuthors);
console.log(`👥 Total unique authors: ${authorsArray.length}`);

writeFileSync(join(dataDir, 'authors.json'), JSON.stringify(authorsArray, null, 2));
console.log(`👥 Created authors.json`);

console.log('\n🎉 Sync complete!');
