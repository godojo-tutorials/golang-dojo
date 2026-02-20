---
title: Go Playground
description: Online environment for Go experiments
tableOfContents:
  minHeadingLevel: 2
  maxHeadingLevel: 3
author: godojo
authorName: Godojo Master
updatedAt: '2026-02-20'
readingTime: 11
---
In the previous lesson we traced the entire journey from source code to binary — `go run`, `go build`, cross-compilation. All of that requires Go installed locally and a terminal. But what if you want to quickly test an idea and there's no Go to hand? Or you need to show a colleague a code snippet so they can run it straight away?

That's where **Go Playground** comes in — an official web service where you can write, run, and share Go code right in the browser. No installation, no setup, no sign-up.

---

## What Is Go Playground

Open **[go.dev/play](https://go.dev/play)** in your browser. You'll see a text editor with familiar code:

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```

Above the editor are three buttons: **Run**, **Format**, and **Share**. To the right — a dropdown **Examples** with 15 ready-made templates and a Go version selector. Below the editor — the output panel where results appear.

That's it. No sign-ups, logins, or pricing plans. Open it — write — run.

---

## Run, Format, Share

### Run — Execute Code

Press **Run** (or `Shift+Enter`) — the code is sent to Google's servers, compiled, run in an isolated sandbox, and the result is returned to the output panel. Essentially it's the same `go run`, only remote.

Try changing the text:

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello from Playground!")
    fmt.Println(2 + 2)
    fmt.Println("Go" + " " + "rocks")
}
```

Press Run — and within a second you'll see:

```
Hello from Playground!
4
Go rocks
```

Looks familiar, doesn't it? Same thing we did in the Hello World lesson — just without a terminal.

### Format — Auto-Formatting

Press **Format** (or `Ctrl+Enter`) — and the code is automatically formatted. But Format in Playground does more than just fix spacing. It works like `goimports`: adds missing imports and removes unused ones. Type this:

```go
package main

func main() {
    fmt.Println(math.Sqrt(16))
}
```

Press Format — and Playground will add `import "fmt"` and `import "math"` on its own. That's exactly how `goimports` worked in the [programme structure](/en/program-structure/) lesson — only now it's right in the browser.

### Share — Sharing Code

Press **Share** — and Playground generates a permanent link like `go.dev/play/p/AbCdEf12345`. You can send this link to anyone: a colleague, a chat, a forum. When they open it, they'll see your code and can run it straight away.

Links are **never deleted**. Snippets created over ten years ago still work. Playground stores code by content hash — if two people write identical code, they get the same link.

:::tip Handy tip
The maximum snippet size is 64 KB. More than enough for short examples, but you won't fit an entire project in there.
:::

---

## What You Can Do in Playground

### Import Third-Party Packages

Playground isn't limited to the standard library. You can use any public Go module:

```go
package main

import (
    "fmt"
    "golang.org/x/text/language"
)

func main() {
    tag, _ := language.Parse("en")
    fmt.Println("Language:", tag)
}
```

Dependencies are fetched automatically via `proxy.golang.org` — the same proxy that `go get` uses locally. No `go.mod`, no `go get` needed — Playground handles it all.

:::caution Not all packages work
Packages that need CGO (C code), network access, or the host filesystem won't work. But most popular libraries for data processing, formatting, and validation work just fine.
:::

### Multiple Files

Playground supports multi-file projects via the **txtar** format. Files are separated by `-- filename.go --` markers:

```
-- go.mod --
module example
go 1.22

-- main.go --
package main

import (
    "fmt"
    "example/greet"
)

func main() {
    fmt.Println(greet.Hello("World"))
}

-- greet/greet.go --
package greet

import "fmt"

func Hello(name string) string {
    return fmt.Sprintf("Hello, %s!", name)
}
```

Playground unpacks this structure, creates virtual directories, and compiles everything as a proper project. Maximum — 20 files per snippet.

### Running Tests

If the code contains test functions and no `func main()`, Playground automatically runs `go test`:

```go
package main

import "testing"

func Reverse(s string) string {
    runes := []rune(s)
    for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
        runes[i], runes[j] = runes[j], runes[i]
    }
    return string(runes)
}

func TestReverse(t *testing.T) {
    got := Reverse("Hello")
    if got != "olleH" {
        t.Errorf("Reverse(\"Hello\") = %q, want \"olleH\"", got)
    }
}
```

Press Run — and you'll see `PASS`. Handy for checking algorithms and demonstrating tests without a local environment.

:::tip Benchmarks aren't supported
Playground runs in a sandbox with limited resources, so benchmarks (`testing.B`) won't produce meaningful results and are officially unsupported.
:::

### Templates and Go Version Selection

The **Examples** dropdown contains 15 ready-made programmes: from Hello World to parallel Pi computation, an HTTP server, and generics. Great for learning — open a template, tweak a couple of lines, and see what changes.

The version selector lets you switch between stable Go releases and the development branch. Want to try a feature from a yet-unreleased version? Pick the dev branch (gotip).

---

## Limitations: What Playground Cannot Do

Playground runs code in an isolated **sandbox** — a restricted environment that protects Google's servers from malicious code. This brings a number of limitations.

### Hard Limits

| Limitation | Value |
|---|---|
| Execution time | **5 seconds** |
| Memory | **100 MB** |
| Snippet size | **64 KB** |
| Files per project | **20** |
| CGO | Disabled |
| Platform | linux/amd64 |

### No Network

Playground cannot reach external servers. HTTP requests, database connections, file downloads — all blocked. Attempting `http.Get("https://example.com")` will fail with an error.

But there's a nuance: **localhost works**. You can spin up an HTTP server and connect to it from the same programme — there's a ready-made "HTTP Server" template in the examples list.

### No Real Filesystem

The filesystem is virtual, existing only in memory. You can create and read files in `/tmp` during a single run, but once the programme finishes, everything disappears.

### No Command-Line Arguments

Remember `os.Args` from the [programme structure lesson](/en/program-structure/)? In Playground, `os.Args` contains only one element — the path to the binary. You can't pass your own arguments.

### Fixed Time

This is the most surprising quirk. Try this:

```go
package main

import (
    "fmt"
    "time"
)

func main() {
    fmt.Println(time.Now())
}
```

Result:

```
2009-11-10 23:00:00 +0000 UTC
```

Playground **always** returns the same date: **10 November 2009, 23:00 UTC**. This isn't a bug — it's a deliberate decision. That's the day Go was publicly announced.

Why? For **determinism**. Identical code always produces identical output — and Playground can cache responses. If a thousand people run the same Hello World, the server compiles it once and serves the cached result to everyone else. This saves an enormous amount of resources.

`time.Sleep` does work — but not for real. When all goroutines are blocked, the scheduler instantly fast-forwards the internal clock to the next timer. The programme "thinks" 2 seconds have passed, when in reality it was milliseconds. In the browser, the output is played back with the correct delays — you see a pause even though execution finished ages ago.

:::tip For the experienced: how "fake sleep" works
Playground inserts special headers with timestamps into the output. The JavaScript client on the page parses these timestamps and replays text with the appropriate delays. So `time.Sleep(2 * time.Second)` looks like a two-second pause in the browser, even though the server finished everything in a fraction of a second.
:::

---

## When to Use Playground

### Stack Overflow and GitHub Issues

The standard way to demonstrate a problem in the Go community is a Playground link. The bug report template in `golang/go` says it directly: *"A link on play.golang.org is best"*. A minimal reproducible example in one click — saves everyone time.

### pkg.go.dev — Documentation with a Run Button

On Go package documentation pages (`pkg.go.dev`), next to every example (`Example`) there's a **Run** button. Press it — and the code runs via Playground right on the page. No need to copy and paste — poke around, understand how the API works.

### Quick Experiments

"What happens if..." — open Playground, write three lines, press Run. Faster than opening VS Code, creating a file, and running `go run .`. Especially if you're on someone else's computer or a tablet.

### Playground vs VS Code

| | Go Playground | VS Code + Go |
|---|---|---|
| **Installation** | Not needed | Go + VS Code + extension |
| **Autocomplete** | No | gopls |
| **Debugging** | No | Delve |
| **Network & files** | Sandbox | Full access |
| **Execution time** | 5 seconds | Unlimited |
| **Sharing code** | One button | Copy manually |
| **Best for** | Experiments, examples, learning | Real development |

Playground isn't a replacement for an editor. It's a **complement**: a quick scratchpad for experiments and a universal way to share code.

---

## Alternatives

### goplay.tools

A third-party client for Playground with the **Monaco** editor (the same engine as VS Code). Features autocomplete, syntax highlighting, line numbers, a dark theme, and Vim mode. Code runs via the same Google backend — the interface is just more comfortable. If the standard Playground feels lacking — give it a go.

### Godbolt (Compiler Explorer)

[godbolt.org](https://godbolt.org) — an entirely different tool. It shows the **assembly code** that the compiler turns your Go into. On the left — Go code, on the right — machine instructions with colour-coded mapping from source line to instruction. For advanced users, but if you're curious about what happens at the processor level — have a look.

---

## Common Pitfalls

### 1. "HTTP request doesn't work!"

```go
resp, err := http.Get("https://example.com")
// dial tcp: lookup example.com: no such host
```

External networking is blocked. Playground is for computation, not network I/O. For testing HTTP, use a local server on localhost (the "HTTP Server" template).

### 2. "time.Now() shows 2009 — is Playground broken?"

No. It's a **feature**, not a bug. The date 2009-11-10 is the day Go was announced. Fixed time ensures determinism and caching. This "error" is so common that there's even an [issue #41626](https://github.com/golang/go/issues/41626) on GitHub about it.

### 3. "rand.Intn() gives the same number every time"

Since Go 1.20+, the random number generator is automatically seeded, and `rand.Intn()` should produce different values. But Playground's cache may return a stored result. Change the code even slightly (even a space in a comment) — and you'll see a different number.

### 4. "Code works in Playground but not locally"

Format in Playground automatically adds missing imports. If you copy code without imports into VS Code — it won't compile. Solution: set up `goimports` on save in your editor (we did this in the [editor setup lesson](/en/ide-setup/)).

### 5. "Code works locally but not in Playground"

Check: does the code use networking, the filesystem, command-line arguments, CGO, or long-running computations (over 5 seconds)? All of these are restricted in the sandbox.

---

## Summary

| What | Detail |
|------|--------|
| URL | **go.dev/play** |
| Run | Compiles and runs code on Google's servers |
| Format | Formatting + auto-imports (like `goimports`) |
| Share | Permanent link to a snippet. Never deleted. |
| Keyboard shortcuts | `Shift+Enter` — Run, `Ctrl+Enter` — Format |
| Dark theme | Available (toggle at the bottom of the page) |
| Third-party packages | Work via `proxy.golang.org` |
| Multiple files | txtar format: `-- file.go --` |
| Tests | Automatically, if there's no `func main()` |
| Execution time | 5 seconds |
| Memory | 100 MB |
| Network | Localhost only |
| Filesystem | Virtual, `/tmp` only |
| `time.Now()` | Always 2009-11-10 23:00:00 UTC |

---

## What's Next?

Now you've got everything to get started: a local Go setup with VS Code, an understanding of compilation, and an online environment for experiments. In the next lesson — **Documentation and Resources**: where to find information about Go, how to read `pkg.go.dev`, what `go doc` is, and which materials are worth keeping to hand.

---

## Sources

- [The Go Playground](https://go.dev/play) — official Playground
- [Inside the Go Playground](https://go.dev/blog/playground) — Andrew Gerrand on the internal architecture
- [About the Playground](https://go.dev/play) — limitations description (About section at the bottom of the page)
- [golang.org/x/playground](https://github.com/golang/playground) — Playground source code
- [goplay.tools](https://goplay.tools) — alternative client with Monaco Editor
- [Compiler Explorer (Godbolt)](https://godbolt.org) — Go to assembly


---

<nav class="lesson-nav">
  <a href="/en/compile-and-run/" class="lesson-nav-link">
    <span class="lesson-nav-label">← Previous</span>
    <span class="lesson-nav-title">Compile and Run</span>
  </a>
  <a href="/en/docs-and-resources/" class="lesson-nav-link" style="text-align: right;">
    <span class="lesson-nav-label">Next →</span>
    <span class="lesson-nav-title">Docs and Resources</span>
  </a>
</nav>
