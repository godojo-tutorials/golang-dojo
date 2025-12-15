---
title: Program Structure
description: Essential elements of a Go programme
tableOfContents:
  minHeadingLevel: 2
  maxHeadingLevel: 3
author: godojo
authorName: Godojo Master
updatedAt: '2025-12-15'
readingTime: 14
---
Go is a language with strict rules. Code is either written correctly and runs, or it won't even start. At first this feels restrictive, but then you realise: less time faffing about with trivialities, more time thinking about what the programme should actually do.

Let's break down what "pieces" make up any Go programme and why they must appear in precisely this order.

---

## Package: Your Code Doesn't Live in a Vacuum

Start with import—the compiler spits out: expected 'package', found 'import'.

```go
package main
```

### What Is a Package?

A package is simply a way to group code. Don't worry about it for now—just write package main at the top of your file. We'll cover what packages are and why they matter later, once your project grows beyond a single file.

### Why Is `main` Special?

In the world of Go, there's a VIP package—`package main`. It's like the main entrance to a building:

```go
package main      // "I'm an executable programme!"
package utils     // "I'm a library—use me"
```

If you write `package main` and add a `main()` function, Go creates an executable file. Any other package name—and you get a library that cannot be run directly.

**Real case from the trenches:** When I first started, I wasted half an hour on the error "cannot run non-main package". Copied code from someone else's project, it had package handlers. Renamed to package main—worked. Daft, but it happens.

### Naming Conventions: Short and Sweet

Go loves minimalism. Package names should be:

- **Lowercase**—no `Package Main` or `MAIN`
- **Single-word**—`http`, `json`, `time`, not `httpHelpers`
- **No underscores**—`mypackage`, not `my_package`

```go
// Good 👍
package user
package auth
package store

// Not so good 👎
package userHelpers      // too long
package user_service     // underscore
package Utilities        // capital letter
package common           // what's inside? everything?
```

:::tip Top Tip
If you can't think of a short name—perhaps your package does too much. Break it up.
:::

### Package Name = Prefix When Used

When someone imports your package, they'll write `packagename.Function()`. Bear this in mind:

```go
// Package is called "http"
http.Get("https://...")     // Reads well
http.HTTPGet("https://...")  // HTTPGet? Seriously?

// Package is called "strings"
strings.ToUpper("hello")    // Right-o
strings.StringToUpper("hello")  // Bit redundant, that
```

---

## Import: Inviting Guests to the Party

After the package declaration come the imports. Think of it as a guest list for a party—only those you've explicitly invited can enter.

### Basic Syntax

```go
// One guest
import "fmt"

// Several guests (the Go way)
import (
    "fmt"
    "os"
    "strings"
)
```

Grouping in parentheses isn't just tidy—it's **idiomatic Go**. One import per line is allowed, but colleagues might give you funny looks.

### Anatomy of an Import

```go
import (
    // Standard library — the locals
    "fmt"
    "os"
    "strings"

    // Blank line — separator

    // Third-party packages — guests from out of town
    "github.com/gin-gonic/gin"
    "github.com/jmoiron/sqlx"
)
```

This isn't mere convention—the `goimports` tool automatically sorts imports exactly like this. Set it up in your editor and never think about it again.

### Five Flavours of Import (From Normal to Peculiar)

#### 1. Standard Import — Your Daily Bread

```go
import "fmt"

fmt.Println("Hello!")  // Use with prefix
```

#### 2. Aliased Import — When Names Clash

```go
import (
    "crypto/rand"           // Cryptographic random
    mrand "math/rand"       // Mathematical random
)

// Now you can use both
cryptoBytes := make([]byte, 32)
rand.Read(cryptoBytes)        // crypto/rand

number := mrand.Intn(100)     // math/rand
```

**Real case:** One project had three `config` packages—our own, from the framework, and from a logging library. Without aliases—no chance:

```go
import (
    appconfig "myapp/config"
    ginconfig "github.com/gin-gonic/gin/config"
    logconfig "go.uber.org/zap/config"
)
```

#### 3. Blank Import — Inviting for Side Effects

Sometimes you need a package not for its functions, but for what it does when loaded:

```go
import (
    "database/sql"
    _ "github.com/lib/pq"  // Registers the PostgreSQL driver
)

// Now sql.Open("postgres", ...) works
// Even though we never call pq directly
```

The underscore says: "Yes, I know I'm not using this package directly. That's intentional."

**Where you'll see this:**
- Database drivers (`pq`, `mysql`, `sqlite3`)
- Image formats (`image/png`, `image/jpeg`)
- Profiling (`net/http/pprof`)

#### 4. Dot Import — Don't Do This

```go
import . "fmt"

Println("No prefix!")  // Works, but...
```

Looks convenient until you open the file six months later: "Where did this `Println` function come from? Ours? Imported? Built-in?"

:::danger Just Don't
The only legitimate use—tests where you can't import the tested package directly due to circular dependencies. Even then, think twice.
:::

#### 5. Named Package Import — For Special Occasions

```go
import (
    yaml "gopkg.in/yaml.v3"  // Long path, short name
)

yaml.Unmarshal(data, &config)
```

### What Happens If You Import and Don't Use?

```go
import "fmt"  // Imported

func main() {
    println("Using built-in println")  // fmt not needed
}
```

```
imported and not used: "fmt"
```

Go won't compile code with rubbish lying about. Annoying for the first five minutes, then you realise: your project will never have 50 unused imports slowing down compilation.

**Temporary workaround during debugging:**

```go
import "fmt"

var _ = fmt.Println  // Placeholder — remove before committing!
```

Or simply use `goimports`—it'll tidy up automatically.

---

## func main(): Where It All Begins

Every executable Go programme starts with the `main` function in the `main` package. It's like `public static void main` in Java, only without the faff.

```go
package main

func main() {
    // Your programme's universe begins here
}
```

### Why No Arguments?

In C you write `int main(int argc, char *argv[])`. In Go—just `func main()`.

Why? Because Go favours explicitness. If you need command-line arguments—import `os` and fetch them yourself:

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    // os.Args — a slice of strings
    // [0] — path to the programme
    // [1:] — your arguments

    fmt.Println("Programme:", os.Args[0])
    fmt.Println("Arguments:", os.Args[1:])
}
```

```bash
$ go run main.go hello world 123
Programme: /tmp/go-build123/main
Arguments: [hello world 123]
```

**Classic beginner mistake:**

```go
name := os.Args[1]  // Panic if no arguments!
```

Always check the length:

```go
if len(os.Args) < 2 {
    fmt.Println("Usage: programme <name>")
    os.Exit(1)
}
name := os.Args[1]
```

### How to Return an Exit Code?

`main()` returns nothing. For exit codes, use `os.Exit()`:

```go
func main() {
    if err := doSomething(); err != nil {
        fmt.Fprintln(os.Stderr, "Error:", err)
        os.Exit(1)  // Exit with error code
    }
    // os.Exit(0) not needed — success is the default
}
```

:::danger Trap with defer
`os.Exit()` terminates the programme **immediately**. Deferred functions won't run!
:::

```go
func main() {
    defer fmt.Println("This will never print!")
    os.Exit(1)
}
```

**Production pattern:**

```go
func main() {
    if err := run(); err != nil {
        fmt.Fprintln(os.Stderr, err)
        os.Exit(1)
    }
}

func run() error {
    // All logic here
    // defer works properly
    // Can be tested separately

    defer cleanup()

    if err := initialize(); err != nil {
        return fmt.Errorf("init failed: %w", err)
    }

    return nil
}
```

This pattern is used in production—it lets you test `run()` separately and guarantees defer execution.

### Case Matters!

```go
func Main() {}   // This is NOT the entry point
func MAIN() {}   // Neither is this
func main() {}   // Only this
```

Go is case-sensitive. `Main` and `main` are different identifiers.

---

## fmt.Println vs println: Battle of the Titans

Go has two functions for printing text, and beginners often get confused.

### println — The Built-in Ghost Function

```go
func main() {
    println("Hello!")  // Works without import
}
```

Handy for quick debugging, but:

- Writes to **stderr**, not stdout
- Output format **not guaranteed**—may change
- Officially: "may be removed in future versions"

### fmt.Println — The Grown-up Choice

```go
import "fmt"

func main() {
    fmt.Println("Hello!")  // stdout, stable format
}
```

**Comparison:**

| | `println` | `fmt.Println` |
|---|----------|---------------|
| Import | Not needed | `import "fmt"` |
| Output | stderr | stdout |
| Format | Depends on Go version | Documented, stable |
| Returns | Nothing | `(n int, err error)` |
| For production | ❌ | ✅ |

**True story:** A service was logging via `println`. Worked fine locally. In production, logs went to stderr, which nobody collected. Spent a week debugging.

### My Advice

`println`—for "quick peek, then delete". Like `console.log` in JavaScript that you forget to remove. Except Go will force you to remove an unused `import "fmt"`, but not `println`. Dangerous, that.

For everything else—`fmt.Println` and its mates (`Printf`, `Sprintf`, `Fprintf`).

---

## Comments: Code for Humans

Go supports two kinds of comments:

```go
// Single-line — used most often

/*
   Multi-line — for larger blocks
   or temporarily disabling code
*/
```

### Doc Comments: Your Code Documents Itself

A comment directly before a declaration becomes documentation:

```go
// User represents a system user.
// The zero value is not ready for use — call NewUser.
type User struct {
    ID   int
    Name string
}

// NewUser creates a user with the given name.
// Returns an error if the name is empty.
func NewUser(name string) (*User, error) {
    if name == "" {
        return nil, errors.New("name cannot be empty")
    }
    return &User{Name: name}, nil
}
```

These comments:
- Appear in `go doc`
- Display on pkg.go.dev
- Show up in IDE tooltips

**Good form:**

1. Start with the name of what you're documenting:
   ```go
   // NewUser creates...     ✅
   // This function creates... ❌
   ```

2. Write complete sentences with full stops

3. For packages—the first line is particularly important:
   ```go
   // Package auth provides JWT authentication.
   package auth
   ```

---

## gofmt: One Style to Rule Them All

In Go there are no tabs vs spaces wars. There's `gofmt`—end of.

```bash
gofmt -w main.go     # Format and overwrite
go fmt ./...         # Format entire project
```

### What Does gofmt Do?

- **Tabs for indentation** (not spaces!)
- **Alignment** of operators and comments
- **Braces** in the right places
- **Spaces** where needed, and no extras

### Why Must the Opening Brace Be on the Same Line?

Go automatically inserts semicolons at the end of lines. So this code is broken:

```go
// Go sees: if x > 0;
if x > 0
{              // This is already a new statement!
    doSomething()
}
```

But this works:

```go
if x > 0 {
    doSomething()
}
```

Don't try to argue with this. Just accept it, set up auto-formatting in your editor, and forget about it.

### goimports = gofmt + Import Magic

```bash
go install golang.org/x/tools/cmd/goimports@latest
goimports -w main.go
```

Does everything `gofmt` does, plus:
- Adds missing imports
- Removes unused ones
- Sorts by groups

**Set up your editor to run goimports on save.** VS Code with the Go extension does this out of the box. After that, you simply write `fmt.Println`, save, and `import "fmt"` appears by itself.

---

## Compiler Strictness: Your Best Mate

The Go compiler isn't a nanny. It won't show "warnings" and hope you'll fix them. It simply won't compile.

### Unused Imports — Error

```go
import "fmt"
import "os"  // Not using this

func main() {
    fmt.Println("Hello")
}
```

```
imported and not used: "os"
```

### Unused Variables — Error

```go
func main() {
    x := 5     // Declared
    y := 10    // This too
    fmt.Println(x)  // Only using x
}
```

```
y declared and not used
```

### Why Is This Good?

Had a colleague who worked on a Python project with 2000+ unused imports (yes, they counted). Test startup time—40 seconds just for imports. In Go this is physically impossible.

### Blank Identifier for Intentional Ignoring

Sometimes you genuinely need to ignore a value:

```go
// Only need the second result
_, err := strconv.Atoi("123")

// Iterating only over values
for _, value := range myMap {
    fmt.Println(value)
}
```

---

## Common Beginner Pitfalls

Over years of code review, I've assembled a collection:

### 1. "Why Won't main Run?"

```go
package main

func Main() {  // Capital M!
    fmt.Println("Hello")
}
```

`Main` ≠ `main`. Go is case-sensitive.

### 2. "Why Doesn't go build Create Anything?"

```go
package utils  // Not main!

func DoSomething() {}
```

Only `package main` creates an executable file.

### 3. "Index Out of Range"

```go
func main() {
    fmt.Println(os.Args[1])  // Panic if no arguments
}
```

Always check `len(os.Args)`.

### 4. "Defer Didn't Fire"

```go
func main() {
    defer fmt.Println("The End")
    os.Exit(1)  // defer is bypassed!
}
```

`os.Exit` skips all defers. Use the `run()` pattern.

### 5. Files in One Folder with Different Packages

```
myproject/
├── main.go      // package main
└── utils.go     // package utils  ← ERROR
```

All files in one directory must have the same package.

---

## Complete Example: Putting It All Together

```go
// Package main — entry point for the greeter application.
package main

import (
    "fmt"
    "os"
    "strings"
)

// defaultName is used when no name is provided.
const defaultName = "World"

func main() {
    if err := run(); err != nil {
        fmt.Fprintln(os.Stderr, "Error:", err)
        os.Exit(1)
    }
}

// run contains the main programme logic.
// Returns an error if something goes wrong.
func run() error {
    name := defaultName

    if len(os.Args) > 1 {
        name = strings.Join(os.Args[1:], " ")
    }

    greeting := fmt.Sprintf("Hello, %s!", name)
    fmt.Println(greeting)

    return nil
}
```

```bash
$ go run main.go
Hello, World!

$ go run main.go Alice
Hello, Alice!

$ go run main.go dear friend
Hello, dear friend!
```

---

## Summary

| Element | What to Remember |
|---------|------------------|
| `package` | First line, `main` = executable file |
| `import` | After package, group in parentheses |
| `func main()` | No arguments, no return, only in `package main` |
| `os.Args` | CLI arguments, check the length! |
| `os.Exit(n)` | For exit codes, but defer won't run |
| `fmt.Println` | For production |
| `println` | Debugging only |
| `gofmt` | One style, set up auto-formatting |

---

## Exercises

### Exercise 1: Warm-up ⭐

What will this programme output?

```go
package main

import "fmt"

func main() {
    fmt.Print("Go")
    fmt.Print("lan")
    fmt.Println("g")
    fmt.Println("!")
}
```

<details>
<summary>Solution</summary>

```
Golang
!
```

`Print` doesn't add a newline, `Println` does.

</details>

### Exercise 2: Find 4 Errors ⭐⭐

```go
import "fmt"
package main

func Main() {
    x := "Done"
    fmt.Println("Hello")
}
```

<details>
<summary>Solution</summary>

1. `package main` must come first
2. `func Main()` → `func main()`
3. Variable `x` declared but not used
4. (Bonus) No blank line between package and import — not an error, but gofmt will sort it

Corrected code:

```go
package main

import "fmt"

func main() {
    x := "Done"
    fmt.Println(x)
}
```

</details>

### Exercise 3: CLI Calculator ⭐⭐⭐

Write a programme that takes two numbers as arguments and outputs their sum.

```bash
$ go run main.go 5 3
8

$ go run main.go
Usage: calc <number1> <number2>
```

<details>
<summary>Hint</summary>

You'll need `strconv.Atoi()` to convert a string to a number.

</details>

<details>
<summary>Solution</summary>

```go
package main

import (
    "fmt"
    "os"
    "strconv"
)

func main() {
    if len(os.Args) != 3 {
        fmt.Println("Usage: calc <number1> <number2>")
        os.Exit(1)
    }

    a, err := strconv.Atoi(os.Args[1])
    if err != nil {
        fmt.Println("First argument is not a number:", os.Args[1])
        os.Exit(1)
    }

    b, err := strconv.Atoi(os.Args[2])
    if err != nil {
        fmt.Println("Second argument is not a number:", os.Args[2])
        os.Exit(1)
    }

    fmt.Println(a + b)
}
```

</details>

### Exercise 4: Reverse Arguments ⭐⭐⭐

Write a programme that outputs arguments in reverse order.

```bash
$ go run main.go one two three
three
two
one
```

<details>
<summary>Solution</summary>

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    args := os.Args[1:]  // Without programme name

    // Go from end to start
    for i := len(args) - 1; i >= 0; i-- {
        fmt.Println(args[i])
    }
}
```

</details>

---

## What's Next?

Now you know what a Go programme is made of. In the next lesson we'll cover **compiling and running**—how to turn code into an executable and what happens under the bonnet.


---

<nav class="lesson-nav">
  <a href="/en/hello-world/" class="lesson-nav-link">
    <span class="lesson-nav-label">← Previous</span>
    <span class="lesson-nav-title">Hello World</span>
  </a>
  <div></div>
</nav>
