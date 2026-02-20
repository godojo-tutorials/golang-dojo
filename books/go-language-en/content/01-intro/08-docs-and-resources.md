---
title: "Docs and Resources"
description: "Where to find Go information"
slug: docs-and-resources
published: true
author: godojo
updatedAt: "2026-02-20"
readingTime: 10
---

# Docs and Resources: Where to Find Answers About Go

Over seven lessons we've gone from installing Go to cross-compiling for any platform and experimenting in the Playground. The tools are set up, the first programmes are written. But sooner or later a question will come up that this course hasn't yet answered: "how does this function actually work?" or "which package solves my problem?".

This lesson is a map. You don't need to memorise everything at once — just know **where** to look. Bookmark this page and come back whenever you need to.

---

## `go doc` — Documentation in the Terminal

The quickest way to find out what a function does is not to open a browser, but to ask right in the terminal. The `go doc` command is built into Go and works without the internet.

Remember the doc comments from the [programme structure lesson](/en/program-structure/)? Those `//` lines before declarations that are visible in the IDE? `go doc` extracts exactly those — straight from the source code installed on your machine. The documentation always matches your version of Go.

### The Basics: Package, Function, Method

To see a package overview:

```bash
$ go doc fmt
```

```
package fmt // import "fmt"

Package fmt implements formatted I/O with functions analogous to C's printf
and scanf. The format 'verbs' are derived from C's but are simpler.
...
func Printf(format string, a ...any) (n int, err error)
func Println(a ...any) (n int, err error)
...
```

To look up a specific function's signature — add it after a dot:

```bash
$ go doc fmt.Println
```

```
func Println(a ...any) (n int, err error)
    Println formats using the default formats for its operands and writes to
    standard output. Spaces are always added between operands and a newline
    is appended. It returns the number of bytes written and any write error
    encountered.
```

You can dig deeper — down to a method on a specific type:

```bash
$ go doc json.Decoder.Decode
```

Case doesn't matter: `go doc json.decoder` and `go doc json.Decoder` give the same result.

### Useful Flags

| Flag | What it does | Example |
|------|-------------|---------|
| `-all` | Full package documentation | `go doc -all strings` |
| `-short` | Signatures only, no descriptions | `go doc -short fmt` |
| `-src` | Source code of a function | `go doc -src fmt.Println` |

:::tip Handy tip
`go doc -src` is one of the best ways to learn. Go's standard library (since version 1.5) is written entirely in Go itself. Want to see how Google's engineers implemented `strings.Builder`? Just run `go doc -src strings.Builder` — and the reference code is right there in your terminal.
:::

### When `go doc` Is Faster Than a Browser

A typical scenario: you're writing code in VS Code and forget the argument order for `strings.Replace`. Open the terminal (`` Ctrl+` ``), type `go doc strings.Replace` — and within a second the answer is before your eyes. No tabs, no searching.

---

## `pkg.go.dev` — Documentation in the Browser

When you need more context — examples, version history, dependencies — head to **[pkg.go.dev](https://pkg.go.dev)**. This is the official documentation portal for Go packages. It replaced godoc.org in 2020 and has since become the primary reference for the entire ecosystem.

### How a Package Page Is Structured

Every page follows the same layout:

- **Overview** — the package description (from the `package` doc comment).
- **Index** — a table of contents: all exported functions, types, and methods. On the left — sidebar navigation and a "Jump To" search box.
- **Examples** — runnable code examples. Remember the **Run** button on pkg.go.dev from the [Playground lesson](/en/go-playground/)? It sends code to the same Google servers — you can poke at a function right on the documentation page without copying anything into an editor.

The page header shows key metadata: module path, version, publication date, licence, and import count.

### How to Evaluate a Third-Party Package

The standard library can be imported without a second thought — it's backed by the Go Team. But with third-party packages, it pays to be more careful. pkg.go.dev shows several quality signals:

- **Imported By** — how many other projects use this package. If the count runs into the thousands, the package is community-vetted.
- **Licence** — a "Redistributable" badge means the licence (MIT, Apache 2.0, BSD) allows free use.
- **Version** — the presence of `v1.x.x` or higher indicates backward-compatible API. The author promises not to break your code on updates.

:::danger Trap
Packages at version `v0.x.x` are experimental. The author can break the API at any moment, and your code will stop compiling after `go get -u`. For production projects, choose packages at `v1+`.
:::

### Searching for Packages

In the pkg.go.dev search bar you can search by name, description, or even by symbol name — the filter `#Reader io` finds the `Reader` interface in the `io` package. The full standard library listing is at **[pkg.go.dev/std](https://pkg.go.dev/std)**.

---

## Official Go Team Resources

The Go team maintains an entire ecosystem of documents. You don't need to read everything right now — but it's useful to know what lives where.

| Resource | URL | When you'll need it |
|----------|-----|-------------------|
| **Tour of Go** | [go.dev/tour](https://go.dev/tour) | An interactive browser-based tutorial. A great complement to our course — you can even run it locally: `go install golang.org/x/website/cmd/tour@latest` |
| **Go Blog** | [go.dev/blog](https://go.dev/blog) | Articles from Go Team engineers. They explain the "why" behind every decision. Release announcements. Roughly 2–4 posts per month |
| **Go Wiki** | [go.dev/wiki](https://go.dev/wiki) | A collective knowledge base. Essential pages: [CodeReviewComments](https://go.dev/wiki/CodeReviewComments) (code style) and [CommonMistakes](https://go.dev/wiki/CommonMistakes) (typical errors) |
| **Specification** | [go.dev/ref/spec](https://go.dev/ref/spec) | The formal language specification. Not a tutorial, but surprisingly readable. When you need to know exactly how a construct works |
| **Go FAQ** | [go.dev/doc/faq](https://go.dev/doc/faq) | "Why no exceptions?", "Why no inheritance?" — answers to philosophical questions about Go |
| **Go Style Guide** | [google.github.io/styleguide/go](https://google.github.io/styleguide/go) | The modern standard for idiomatic Go code from Google (Style Guide + Decisions + Best Practices) |

:::caution About Effective Go
Many articles recommend "definitely read Effective Go". It's a legendary document from 2009 that laid the foundations of Go style. However, in January 2022 the Go Team added a disclaimer: the document hasn't been updated and won't be. It doesn't cover modules, generics, error wrapping with `%w`, and much more. Worth reading — but as a historical document, not a guide to action. For modern practices, use the Google Go Style Guide.
:::

### Blog: Articles Worth Reading First

A few posts from the Go Blog will come in handy soon:

- **"Error Handling and Go"** — idiomatic error handling (a pattern you'll use every day).
- **"Using Go Modules"** (5-part series) — how the dependency system works.
- **"Go Proverbs"** by Rob Pike — 19 principles such as "Clear is better than clever" and "Errors are values". Not a blog post but a [talk](https://go-proverbs.github.io/), yet it's the cultural DNA of the Go community.

There's no search on the blog site — use `site:go.dev/blog your-query` in Google.

---

## The Standard Library — A Package Map

Go is famous for its "batteries included" philosophy. The standard library covers the majority of a backend developer's needs — from an HTTP server to JSON handling. Here are the landmarks:

| Package | What it does | Connection to our lessons |
|---------|-------------|--------------------------|
| `fmt` | Formatted I/O | `fmt.Println` — since the [first programme](/en/hello-world/) |
| `strings` | String operations (Contains, Split, Replace) | `strings.Join` from [lesson 1.5](/en/program-structure/) |
| `strconv` | Strings ↔ numbers (Atoi, Itoa, ParseFloat) | |
| `os` | OS interaction, files | `os.Args` from [lesson 1.5](/en/program-structure/) |
| `io` | Reader and Writer interfaces | |
| `net/http` | HTTP client and server | HTTP Server template from the [Playground](/en/go-playground/) |
| `encoding/json` | JSON handling | |
| `testing` | Tests and benchmarks | Running tests in the [Playground](/en/go-playground/) |
| `errors` | Error handling (Is, As, Join) | |
| `time` | Time, timers, formatting | `time.Now()` from the [Playground](/en/go-playground/) |
| `math` | Mathematical functions | |
| `sort` / `slices` | Sorting (slices — since Go 1.21) | |

The full list is at **[pkg.go.dev/std](https://pkg.go.dev/std)**. No need to memorise it — just know that before reaching for a third-party library, it's worth checking whether the standard library already has a solution.

---

## Community

The Go community is known for being welcoming. Here's where Go developers gather:

### Where to Ask Questions

- **Stack Overflow** ([[go] tag](https://stackoverflow.com/questions/tagged/go)) — 170,000+ questions. One of the best knowledge bases. Remember: a Playground link in your question boosts the chances of getting an answer.
- **Reddit** ([r/golang](https://reddit.com/r/golang)) — 200,000+ subscribers. Discussions on architecture, new releases, libraries.
- **Gophers Slack** ([invite.slack.golangbridge.org](https://invite.slack.golangbridge.org)) — tens of thousands of members. The `#beginners` and `#general` channels are great for quick questions.
- **GitHub** ([github.com/golang/go](https://github.com/golang/go)) — 132,000+ stars. Where bugs in Go are reported and proposals for new features are discussed.

### Where to Learn

- **Go by Example** ([gobyexample.com](https://gobyexample.com)) — 79+ code examples with explanations. An excellent syntax cheat sheet.
- **Exercism** ([exercism.org/tracks/go](https://exercism.org/tracks/go)) — 141 exercises with mentoring. Free. 151,000+ students enrolled.
- **Awesome Go** ([github.com/avelino/awesome-go](https://github.com/avelino/awesome-go)) — a curated catalogue of the best Go libraries (130,000+ stars).

### Books (Current in 2026)

| Book | Who it's for |
|------|-------------|
| **"Learning Go" 2nd ed.** (Jon Bodner, O'Reilly, 2024) | A deep dive for programmers with experience. Covers generics |
| **"100 Go Mistakes"** (Teiva Harsanyi, Manning) | 100 specific mistakes with explanations and fixes. "Effective Java" for Go |
| **"Let's Go"** (Alex Edwards, 2025) | Practical: building a web application using the standard library |

### Podcasts and Video

- **Cup o' Go** ([cupogo.dev](https://cupogo.dev)) — weekly Go world news.
- **Fallthrough** ([fallthrough.fm](https://fallthrough.fm)) — the successor to the legendary Go Time (which ended in late 2024 after 340 episodes).
- **GopherCon** — the largest Go conference. All talks on YouTube (Gopher Academy channel). GopherCon 2026 takes place in Seattle (3–6 August).
- **Golang Weekly** ([golangweekly.com](https://golangweekly.com)) — a weekly newsletter. 35,000+ subscribers. The best way to keep up with the ecosystem.

---

## `go help` — Offline Reference

If `go doc` describes code, `go help` describes the Go toolchain itself.

```bash
$ go help
```

This lists all commands: `build`, `run`, `test`, `mod`, `install` — we worked with them in the [compilation lesson](/en/compile-and-run/).

For detailed help on a specific command:

```bash
$ go help build        # flags and options for go build
$ go help environment  # all environment variables (GOPATH, GOROOT from lesson 1.3)
$ go help buildconstraint  # build tags for cross-compilation (lesson 1.6)
```

This is your safety net on a server without a graphical interface or when the internet isn't available. Everything is compiled into the `go` binary — always to hand, always matching your version.

---

## Summary

| You need to... | Tool | Command / URL |
|----------------|------|--------------|
| Recall a function signature | `go doc` | `go doc fmt.Println` |
| Look up compiler flags | `go help` | `go help build` |
| Find a package, read examples | pkg.go.dev | [pkg.go.dev](https://pkg.go.dev) |
| Understand idiomatic style | Go Style Guide | [google.github.io/styleguide/go](https://google.github.io/styleguide/go) |
| Check yourself before code review | Go Wiki | [go.dev/wiki/CodeReviewComments](https://go.dev/wiki/CodeReviewComments) |
| Quickly look up syntax | Go by Example | [gobyexample.com](https://gobyexample.com) |
| Keep up with updates | Golang Weekly | [golangweekly.com](https://golangweekly.com) |

---

## What's Next?

The introductory block is complete. Over eight lessons we've learnt what Go is, set up our environment, written our first programmes, understood how compilation works, tried the Playground, and now know where to find answers.

Everything you need to get started is ready. From here, real programming begins.

In the next block, **"Language Basics"**, we'll dive into Go's syntax: variables, data types, control flow, and functions. Get VS Code ready — there's plenty of code ahead.

---

## Sources

- [pkg.go.dev](https://pkg.go.dev) — official Go package documentation portal
- [go.dev/blog](https://go.dev/blog) — Go Team blog
- [go.dev/doc/effective_go](https://go.dev/doc/effective_go) — Effective Go (2009, historical document)
- [google.github.io/styleguide/go](https://google.github.io/styleguide/go) — Google Go Style Guide
- [go.dev/tour](https://go.dev/tour) — interactive Tour of Go
- [go.dev/ref/spec](https://go.dev/ref/spec) — Go language specification
- [go.dev/wiki](https://go.dev/wiki) — Go Wiki
- [go.dev/doc/faq](https://go.dev/doc/faq) — Go FAQ
- [gobyexample.com](https://gobyexample.com) — Go by Example
- [golangweekly.com](https://golangweekly.com) — Golang Weekly newsletter
- [2025 Go Developer Survey Results](https://go.dev/blog/survey2025-h2-results) — developer survey results
