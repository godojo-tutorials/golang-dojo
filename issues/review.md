# SEO/Semantics Review

## Current State

| Element | Status | Details |
|---------|--------|---------|
| **JSON-LD (Article)** | Present | `ArticleSchema.astro` — headline, description, author (Person), publisher (Organization), dateModified, inLanguage |
| **Open Graph** | Partial | Global in `astro.config.mjs`: `og:type`, `og:site_name`, `og:image` (1200x630). Missing per-page `og:title`, `og:description`, `og:url`, `og:locale` |
| **Twitter Card** | Partial | Only `twitter:card` + `twitter:image`. Missing `twitter:title`, `twitter:description` |
| **Sitemap** | Present | `@astrojs/sitemap` generates `sitemap-index.xml` |
| **robots.txt** | Present | `Allow: /` + sitemap link |
| **Security headers** | Present | X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Referrer-Policy |
| **`<title>` and `<meta description>`** | Present | Starlight generates from frontmatter `title`/`description` |
| **Canonical URL** | Present | Starlight adds automatically (with `site` configured) |
| **Caching** | Present | Immutable cache on assets and images (1 year) |

## Issues

### 1. [CRITICAL] English title/description in RU articles frontmatter

```yaml
# apps/web/src/content/docs/ru/what-is-go.md
title: What is Go?                    # EN title for a Russian article
description: 'Overview of Go...'      # EN description too
```

Sync script takes `title` from curriculum.yaml where titles are in English. This ends up in `<title>`, `<meta description>`, JSON-LD, and OG — critical problem for RU SEO.

### 2. [CRITICAL] Missing `hreflang` tags

- No `<link rel="alternate" hreflang="...">` tags
- Google doesn't know that `/ru/what-is-go/` and `/en/what-is-go/` are the same page in different languages
- Starlight with configured locales may generate them automatically — needs verification in built HTML

### 3. [IMPORTANT] Incomplete Open Graph

- `og:type=website` globally — should be `article` for articles
- No per-page `og:title`, `og:description`, `og:url`
- No `og:locale` (`ru_RU` / `en_US`)
- No `og:locale:alternate` for cross-language linking
- `og:image` — single image for entire site, no per-page OG images

### 4. [IMPORTANT] Incomplete Twitter Card

- Missing `twitter:title`, `twitter:description` per-page

### 5. [MEDIUM] JSON-LD improvements

- `datePublished` = `dateModified` (same date) — no separate publish date
- No `mainEntityOfPage`
- No `image` in Article schema
- No `BreadcrumbList` schema (block -> module -> topic)
- No `Course` / `LearningResource` schema (relevant for educational content)

### 6. [MEDIUM] Root page (`index.astro`) semantics

- JS redirect instead of server-side — search engines may not handle it
- `<title>Redirecting...</title>` — empty semantics
- No meta description

### 7. [LOW] No `slug` in synced article frontmatter

- URL formed from filename, not explicit slug — may cause discrepancies

### 8. [LOW] No per-page OG images

- Single `og-image.png` for the entire site
- Per-page images would improve social sharing appearance

## Priority Order

1. Russian title/description for RU articles in frontmatter
2. Verify/add `hreflang` tags
3. Per-page OG tags (`og:title`, `og:description`, `og:url`, `og:locale`)
4. `og:type=article` for articles
5. `BreadcrumbList` JSON-LD
6. `Course`/`LearningResource` schema
7. Per-page OG images
8. Server-side redirect on root page
