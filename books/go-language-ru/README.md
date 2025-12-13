# Godojo - Go Tutorial (Russian)

Русскоязычный контент для учебника по Go. Source of truth для [godojo.dev](https://godojo.dev).

## Структура

- **17 блоков**
- **79 модулей**
- **395 топиков**

```
content/
├── 01-fundamentals/     # Основы языка Go
├── 02-toolchain/        # Go Toolchain
├── 03-concurrency/      # Конкурентность
├── 04-web/              # Web разработка
├── 05-database/         # Работа с БД
├── 06-testing/          # Тестирование
├── 07-production/       # Production basics
├── 08-performance/      # Производительность
├── 09-frameworks/       # Фреймворки
├── 10-advanced-database/# Продвинутые БД
├── 11-prod-engineering/ # Production engineering
├── 12-security/         # Безопасность
├── 13-kubernetes/       # Kubernetes
├── 14-advanced-concurrency/
├── 15-architecture/     # Системная архитектура
├── 16-interview/        # Собеседования
└── 17-advanced/         # Продвинутые темы
```

## Команды

```bash
npm install                    # Установка зависимостей
npm run generate:structure     # Генерация структуры из curriculum.yaml
```

## Формат контента

Каждый топик — файл `article.md`:

```markdown
---
title: "Название"
description: "Описание"
slug: topic-slug
published: false
---

# Название

Контент урока...
```

**Важно:** Только топики с `published: true` отображаются на сайте.

## License

MIT
