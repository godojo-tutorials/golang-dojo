import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import { readFileSync } from 'fs';

// Load generated unified sidebar (with translations for all locales)
let sidebar = [];

try {
  sidebar = JSON.parse(readFileSync('./src/data/sidebar-unified.json', 'utf8'));
} catch (e) {
  console.warn('sidebar-unified.json not found, using empty sidebar');
}

export default defineConfig({
  site: 'https://godojo.dev',
  output: 'static',
  integrations: [
    sitemap(),
    starlight({
      title: 'Godojo',
      description: 'Полный учебник по Go - от основ до эксперта',
      defaultLocale: 'ru',
      locales: {
        ru: {
          label: 'Русский',
          lang: 'ru',
        },
        en: {
          label: 'English',
          lang: 'en',
        },
      },
      logo: {
        src: './src/assets/logo.svg',
        replacesTitle: true,
      },
      social: {
        github: 'https://github.com/godojo/godojo',
      },
      // Sidebar from generated JSON (unified with translations)
      sidebar: sidebar,
      // Custom components
      components: {
        PageTitle: './src/components/overrides/PageTitle.astro',
      },
      // Кастомизация
      customCss: [
        './src/styles/custom.css',
      ],
      // Code blocks с copy button
      expressiveCode: {
        themes: ['github-dark'],
        styleOverrides: {
          borderRadius: '0.375rem',
        },
      },
      // Отключаем pagination (prev/next) - делаем свою навигацию
      pagination: false,
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 3,
      },
      head: [
        // Vercel Analytics
        {
          tag: 'script',
          attrs: { defer: true, src: '/_vercel/insights/script.js' },
        },
        // Open Graph
        {
          tag: 'meta',
          attrs: { property: 'og:type', content: 'website' },
        },
        {
          tag: 'meta',
          attrs: { property: 'og:site_name', content: 'Godojo' },
        },
        {
          tag: 'meta',
          attrs: { property: 'og:image', content: 'https://godojo.dev/og-image.png' },
        },
        {
          tag: 'meta',
          attrs: { property: 'og:image:width', content: '1200' },
        },
        {
          tag: 'meta',
          attrs: { property: 'og:image:height', content: '630' },
        },
        // Twitter Card
        {
          tag: 'meta',
          attrs: { name: 'twitter:card', content: 'summary_large_image' },
        },
        {
          tag: 'meta',
          attrs: { name: 'twitter:image', content: 'https://godojo.dev/og-image.png' },
        },
      ],
    }),
  ],
});
