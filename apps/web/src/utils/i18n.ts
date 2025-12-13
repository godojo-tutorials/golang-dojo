/**
 * Centralized internationalization (i18n) module
 * All UI strings for the Godojo website
 */

export type Lang = 'ru' | 'en';

export const translations = {
  ru: {
    // Navigation
    nav: {
      previous: '← Предыдущий',
      next: 'Следующий →',
    },
    // Book tabs
    books: {
      goLanguage: 'Go — Язык',
      goLanguageFull: 'Go — Язык программирования',
      architecture: 'Архитектура',
      distributed: 'Распределённые системы',
      comingSoon: 'Скоро',
    },
    // Table of contents
    toc: {
      empty: 'Контент скоро появится...',
    },
    // Authors
    authors: {
      noAuthors: 'Авторы пока не добавлены',
    },
    // Page title
    page: {
      minRead: 'мин чтение',
      updated: 'Обновлено',
    },
    // Site meta
    site: {
      description: 'Полный учебник по Go - от основ до эксперта',
    },
  },
  en: {
    // Navigation
    nav: {
      previous: '← Previous',
      next: 'Next →',
    },
    // Book tabs
    books: {
      goLanguage: 'Go Language',
      goLanguageFull: 'Go Programming Language',
      architecture: 'Architecture',
      distributed: 'Distributed',
      comingSoon: 'Soon',
    },
    // Table of contents
    toc: {
      empty: 'Content coming soon...',
    },
    // Authors
    authors: {
      noAuthors: 'No authors yet',
    },
    // Page title
    page: {
      minRead: 'min read',
      updated: 'Updated',
    },
    // Site meta
    site: {
      description: 'Complete Go tutorial - from basics to expert',
    },
  },
} as const;

export type Translations = typeof translations;

/**
 * Get translations for a specific language
 */
export function t(lang: Lang) {
  return translations[lang];
}

/**
 * Get a specific translation key
 */
export function getTranslation<
  K1 extends keyof Translations['ru'],
  K2 extends keyof Translations['ru'][K1]
>(lang: Lang, section: K1, key: K2): string {
  return translations[lang][section][key] as string;
}
