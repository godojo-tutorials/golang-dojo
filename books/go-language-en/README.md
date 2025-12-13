# Godojo - Go Tutorial (English)

English content for Go Tutorial. Source of truth for [godojo.dev](https://godojo.dev).

## Structure

- **17 blocks**
- **79 modules**
- **395 topics**

```
content/
├── 01-fundamentals/     # Go Language Fundamentals
├── 02-toolchain/        # Go Toolchain
├── 03-concurrency/      # Concurrency
├── 04-web/              # Web Development
├── 05-database/         # Database Integration
├── 06-testing/          # Testing
├── 07-production/       # Production Basics
├── 08-performance/      # Performance
├── 09-frameworks/       # Frameworks
├── 10-advanced-database/# Advanced Database
├── 11-prod-engineering/ # Production Engineering
├── 12-security/         # Security
├── 13-kubernetes/       # Kubernetes
├── 14-advanced-concurrency/
├── 15-architecture/     # System Architecture
├── 16-interview/        # Interview Prep
└── 17-advanced/         # Advanced Topics
```

## Commands

```bash
npm install                    # Install dependencies
npm run generate:structure     # Generate structure from curriculum.yaml
```

## Content Format

Each topic is an `article.md` file:

```markdown
---
title: "Title"
description: "Description"
slug: topic-slug
published: false
---

# Title

Content...
```

**Important:** Only topics with `published: true` are displayed on the site.

## License

MIT
