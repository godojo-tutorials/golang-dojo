# Godojo Web

Фронтенд для [godojo.dev](https://godojo.dev). Astro + Starlight.

## Команды

```bash
# Из корня монорепо
npm run dev       # Dev-сервер (localhost:4321)
npm run build     # Сборка для продакшена
npm run sync      # Синхронизация контента из books/
npm run preview   # Превью продакшен-сборки
```

## Структура

```
apps/web/
├── src/
│   ├── content/docs/     # Синхронизированный контент
│   │   ├── ru/           # Русские статьи
│   │   └── en/           # Английские статьи
│   ├── components/       # Astro компоненты
│   ├── data/             # Сгенерированные JSON
│   │   ├── sidebar.json
│   │   ├── toc.json
│   │   └── authors.json
│   └── assets/
├── scripts/
│   └── sync-content.js   # Скрипт синхронизации
└── astro.config.mjs
```

## Синхронизация контента

Скрипт `sync-content.js`:
1. Читает `curriculum.yaml` из `books/go-language-ru` и `books/go-language-en`
2. Копирует статьи с `published: true`
3. Генерирует sidebar, toc, authors JSON
4. Добавляет навигацию prev/next

## URL

```
/ru/              # Главная (оглавление)
/ru/{slug}/       # Страница урока
/ru/authors/      # Авторы

/en/              # English home
/en/{slug}/       # Lesson page
/en/authors/      # Authors
```

## Деплой

Vercel. Автоматический билд при пуше.
