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
      favicon: '/favicon.ico',
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
        Head: './src/components/overrides/Head.astro',
        Footer: './src/components/overrides/Footer.astro',
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
        // Favicons
        {
          tag: 'link',
          attrs: { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        },
        {
          tag: 'link',
          attrs: { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        },
        {
          tag: 'link',
          attrs: { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        },
        {
          tag: 'link',
          attrs: { rel: 'manifest', href: '/site.webmanifest' },
        },
        // Google Analytics 4
        {
          tag: 'script',
          attrs: { async: true, src: 'https://www.googletagmanager.com/gtag/js?id=G-BS6FE1SP8X' },
        },
        {
          tag: 'script',
          content: "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-BS6FE1SP8X');",
        },
        // Vercel Analytics
        {
          tag: 'script',
          attrs: { defer: true, src: '/_vercel/insights/script.js' },
        },
        // Open Graph (og:type set dynamically in Head.astro)
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
        {
          tag: 'meta',
          attrs: { property: 'og:image:alt', content: 'Godojo — Go Tutorial' },
        },
        // Twitter Card
        {
          tag: 'meta',
          attrs: { name: 'twitter:image', content: 'https://godojo.dev/og-image.png' },
        },
      ],
    }),
  ],
});
