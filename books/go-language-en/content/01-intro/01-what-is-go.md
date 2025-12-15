---
title: "What is Go?"
description: "Overview of Go, its history, philosophy and use cases"
slug: what-is-go
published: true
author: godojo
updatedAt: "2025-12-15"
readingTime: 7
---

# What is Golang

Golang — or Go for short — is a programming language.

A programming language is a way to give instructions to a computer. Computers don't understand human language, and we can't make head or tail of machine code made of ones and zeros. A programming language sits in the middle: you write text following certain rules, and a special programme translates it into something the computer can execute.

A programme is a text file containing these instructions. Everything starts with a text file. You open an editor, write instructions according to the language's rules, and save. Then you run it — and the computer carries out what you've written, line by line.

There are hundreds of programming languages: Python, JavaScript, Java, C++, Rust, and others. Each has its own rules and area of application. Go is one of them.

---

## Where It Came From

In 2007, three Google engineers — Rob Pike, Ken Thompson, and Robert Griesemer — got fed up waiting. Literally. Compiling C++ projects at Google took tens of minutes. Dependencies turned into a nightmare. Java code required tonnes of boilerplate. Python was slow.

They decided to build their own language. From scratch. With three goals:

- **Fast compilation** — seconds, not minutes
- **Simple syntax** — fewer ways to do the same thing
- **Concurrency** — a programme can do several things at once, rather than one after another. Like a chef who chops a salad whilst the soup is simmering, instead of standing about waiting

Ken Thompson, by the way, is *that* Ken Thompson — one of the creators of Unix and the C language. Rob Pike worked on Plan 9 and UTF-8. Not random people.

### Key Dates

| Year | Event |
|------|-------|
| 2007 | Development begins |
| 2009 | Public announcement |
| 2012 | Go 1.0 — stable API, backwards-compatibility promise |
| 2015 | Go 1.5 — entirely rewritten in Go (previously in C) |
| 2022 | Go 1.18 — generics added |
| 2024 | Go 1.22+ — range over int, improved iterators |

Backwards compatibility is a big deal. Code written in 2012 for Go 1.0 still compiles today. Not every language can say that.

---

## How It Differs from Other Languages

### Go vs Python

Python is interpreted; Go is compiled. The speed difference can be tens of times.

```
Same algorithm:
Python: 47 seconds
Go: 1.2 seconds
```

But Python is easier to pick up, has more libraries for ML/DS, and is quicker for prototyping. Go is the choice when you need performance, or when a project grows and Python starts dragging its feet.

| | Python | Go |
|---|--------|-----|
| Typing | Dynamic | Static |
| Speed | Slow | Fast |
| Compilation | None (interpreter) | Yes (binary) |
| Concurrency | GIL, asyncio | Goroutines |
| Getting started | Easier | Slightly harder |

### Go vs Java

Both are compiled and statically typed. But:

- Go compiles to a native binary; Java compiles to bytecode for the JVM
- Go has no classes, inheritance, or exceptions (and that's deliberate)
- A Go binary is a single file with no dependencies. Java drags the JVM along
- Less boilerplate: no getters/setters, annotations, or XML configs

```java
// Java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

```go
// Go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```

Roughly the same here, but in real projects the difference is more noticeable — Java projects accumulate abstractions, whilst Go stays simple.

### Go vs C/C++

Go was designed as "C for the 21st century":

- Garbage collection — no manual memory management
- No pointer arithmetic (well, almost — there's `unsafe`, but that's another story)
- Compilation is orders of magnitude faster
- Built-in strings, slices, and maps

You pay for this with a small performance hit. For most tasks, it's barely noticeable. For kernel-level systems programming, Go won't do — that's still C/C++ or Rust territory.

### Go vs Rust

Rust is about maximum control and memory safety without a garbage collector. Brilliant, but hard. The learning curve is a wall.

Go is about productivity. You can write working code within a week. With Rust, you'll spend a week wrestling with the borrow checker.

For web services, APIs, CLIs — usually Go. For systems programming, embedded, where every microsecond counts — Rust.

---

## Where It's Used

### Infrastructure and Cloud

Docker, Kubernetes, Terraform, Prometheus, Grafana, etcd, CockroachDB — all written in Go.

Why: a single binary with no dependencies is easy to deploy. Goroutines fit network services nicely. Cross-compilation — build for Linux on a Mac with one command.

### Backend

Uber, Twitch, Dropbox, SoundCloud, Dailymotion — all use Go for high-load services.

Typical use cases:
- API services
- Microservices
- Message queues
- Proxies and load balancers

### CLI Tools

GitHub CLI, Hugo (static site generator), lazygit, fzf — written in Go.

Single binary, runs everywhere, starts up quickly. Perfect for CLI tools.

### Blockchain

The Ethereum client Geth and Hyperledger Fabric are in Go. Crypto projects like Go for its performance and easy code audits.

---

## Language Philosophy

Go is deliberately simple. That's not a bug — it's a feature.

**One way to do things.** In Python, you can use a list comprehension, map/filter, or a for loop — three ways to get the same result. In Go, there's usually one obvious way.

**Explicit is better than implicit.** No magic methods, no implicit type conversions, no hidden behaviour.

**Less is more.** The language has 25 keywords (C++ has over 90). No inheritance, no exceptions, no function overloading. Sounds limiting; in practice, it means less cognitive load.

**Code is read more often than it's written.** Go is optimised for reading. Boring, predictable, the same everywhere. You open someone else's project and immediately understand what's going on.

---

## What's Good

- **Speed** — compiled, native code
- **Simplicity** — you can learn the basics over a weekend
- **Concurrency** — goroutines and channels out of the box
- **Tooling** — formatting, tests, benchmarks, profiling built in
- **Single binary** — no runtime dependencies
- **Cross-compilation** — build for any platform with one command
- **Backwards compatibility** — code doesn't break when you upgrade

---

## What's Not So Good

No language is perfect, and that's fine.

- **Verbosity** — no generic map/filter/reduce functions (well, there are since 1.18, but the ecosystem hasn't fully caught up)
- **Error handling** — `if err != nil` at every turn; annoying at first
- **No exceptions** — a minus for some, a plus for others
- **GUI** — not for desktop apps; libraries are immature
- **Not for ML/DS** — the ecosystem doesn't compare to Python's

---

## Who Is This Language For

Go is a good fit if you:

- Write backends, APIs, microservices
- Build CLI tools
- Work with high loads
- Want a simple language without magic
- Value fast compilation and good tooling

Go is not a good fit if you:

- Do ML/DS — use Python
- Write mobile apps — Swift/Kotlin
- Build frontends — JavaScript/TypeScript
- Need maximum performance and control — Rust/C++

---

## Summary

Go is:
- A language from Google, started in 2007, released in 2009
- Compiled, statically typed, garbage-collected
- Simple syntax, built-in concurrency
- For backends, CLIs, infrastructure tools
- Docker, Kubernetes, Terraform — all built with it

In the following lessons, we'll install Go and write our first programme.

---

## Sources

- [Go at Google: Language Design in the Service of Software Engineering](https://go.dev/talks/2012/splash.article) — Rob Pike on why Go was created
- [Go FAQ](https://go.dev/doc/faq) — official answers to common questions
- [Wikipedia: Go (programming language)](https://en.wikipedia.org/wiki/Go_(programming_language))
- [The Go Blog](https://go.dev/blog)
- [TIOBE Index](https://www.tiobe.com/tiobe-index/) — programming language rankings
