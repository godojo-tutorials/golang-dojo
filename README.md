# Godojo

Go tutorial platform. Inspired by [learn.javascript.ru](https://learn.javascript.ru).

**Website:** [godojo.dev](https://godojo.dev)

## Structure

```
Godojo/
├── apps/
│   └── web/                  # Astro + Starlight
├── books/
│   ├── go-language-ru/       # Russian course (395 topics)
│   └── go-language-en/       # English course (395 topics)
└── package.json
```

## Quick Start

```bash
npm install

# Development
npm run dev

# Generate book structure
npm run ru:generate
npm run en:generate
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run sync` | Sync content |
| `npm run ru:generate` | Generate structure (RU) |
| `npm run ru:validate` | Validate content (RU) |
| `npm run ru:stats` | Statistics (RU) |
| `npm run en:generate` | Generate structure (EN) |
| `npm run en:validate` | Validate content (EN) |
| `npm run en:stats` | Statistics (EN) |

## Course

**17 blocks, 79 modules, 395 topics**

From language basics to production-ready applications.

## Contributing

1. Fork the repository
2. Edit `article.md` in `books/go-language-{ru,en}/content/`
3. Set `published: true` when article is ready
4. Create PR

## License

MIT

---

# Godojo

Учебник по Go. Вдохновлён [learn.javascript.ru](https://learn.javascript.ru).

**Сайт:** [godojo.dev](https://godojo.dev)

## Структура

```
Godojo/
├── apps/
│   └── web/                  # Astro + Starlight
├── books/
│   ├── go-language-ru/       # Русский курс (395 топиков)
│   └── go-language-en/       # Английский курс (395 топиков)
└── package.json
```

## Быстрый старт

```bash
npm install

# Разработка
npm run dev

# Генерация структуры книг
npm run ru:generate
npm run en:generate
```

## Команды

| Команда | Описание |
|---------|----------|
| `npm run dev` | Dev-сервер |
| `npm run build` | Сборка |
| `npm run sync` | Синхронизация контента |
| `npm run ru:generate` | Генерация структуры (RU) |
| `npm run ru:validate` | Валидация контента (RU) |
| `npm run ru:stats` | Статистика (RU) |
| `npm run en:generate` | Генерация структуры (EN) |
| `npm run en:validate` | Валидация контента (EN) |
| `npm run en:stats` | Статистика (EN) |

## Курс

**17 блоков, 79 модулей, 395 топиков**

От основ языка до production-ready приложений.

## Контрибьютинг

1. Форкни репозиторий
2. Редактируй `article.md` в `books/go-language-{ru,en}/content/`
3. Установи `published: true` когда статья готова
4. Создай PR

## Лицензия

MIT
