import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { readFileSync } from 'fs';

// Load generated sidebar
let sidebarRu = [];
let sidebarEn = [];

try {
  const sidebarData = JSON.parse(readFileSync('./src/data/sidebar.json', 'utf8'));
  sidebarRu = sidebarData.ru || [];
  sidebarEn = sidebarData.en || [];
} catch (e) {
  console.warn('sidebar.json not found, using empty sidebar');
}

export default defineConfig({
  site: 'https://godojo.dev',
  integrations: [
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
      // Sidebar from generated JSON
      sidebar: sidebarRu,
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
        {
          tag: 'meta',
          attrs: {
            name: 'og:image',
            content: 'https://godojo.dev/og-image.png',
          },
        },
      ],
    }),
  ],
});
