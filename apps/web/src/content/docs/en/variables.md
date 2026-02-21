---
title: Variables
description: 'var, :=, multiple declaration, zero values'
tableOfContents:
  minHeadingLevel: 2
  maxHeadingLevel: 3
author: godojo
authorName: Godojo Master
updatedAt: '2026-02-21'
readingTime: 28
---
Everything you need to get started is ready. In the previous block we set up our environment, wrote our first "Hello World", broke down the structure of a programme, and even peeked under the hood of the compiler to see how source code turns into machine code. Now the real programming begins.

In this new block, "Language Basics", we'll dive deep into Go syntax: data types, control structures, functions. And we'll start with the most fundamental concept in any imperative language — **variables**.

Remember seeing `x := 5` in the [lesson on programme structure](/en/program-structure/)? Or `var version = "dev"` in the [lesson on compilation](/en/compile-and-run/), when we discussed build flags? Back then we used them intuitively. You already know that a variable is a way to store data. But in Go, working with variables has its own unique, strict rules — laid down by Rob Pike, Ken Thompson, and Robert Griesemer to make code as readable and safe as possible.

In this article we'll formally explore how `var` and `:=` differ, why Go has no "undefined behaviour" at initialisation, what happens if you declare a variable and forget about it, and why the compiler is so strict about unused code.

---

## What Is a Variable in Go's Philosophy

Before we jump into syntax, let's agree on terminology. Imagine a warehouse. A variable is a labelled box on a shelf — you put a value of a certain type inside it. The box has a **name** (identifier), a **shape and size** (data type — integer, string, etc.), and its actual **contents** (value).

In dynamic languages like Python or JavaScript, you can take a box labelled `x`, put the number `5` in it, then a minute later throw the number out and put the string `"hello"` in instead. The language doesn't care — the box is elastic.

Go is a **statically typed** language. If you create a box for an integer (`int`), you can never put a string in it. The compiler, at the type-checking stage (the Type Checker we talked about in [lesson 1.6](/en/compile-and-run/)), will simply stop the build. This is deliberate: strict typing eliminates an entire class of bugs where a programme crashes at runtime because it expected a number but received text.

Moreover, variable declaration syntax in Go differs from classic C-like languages. In C or Java the type comes first, then the name: `int x = 5;`. Go's creators went with natural left-to-right reading: `var x int = 5`. You literally read: "variable (`var`) named `x` of type `int` equals `5`". A small but important change that makes code more expressive.

---

## Full Syntax: Declaring with `var`

The keyword `var` is the most complete and explicit way to declare a variable in Go. It works both inside functions (local variables) and outside them (package-level variables).

Let's look at the full syntax as described by the Go specification:

```go
package main

import "fmt"

func main() {
    // 1. Full declaration with explicit type and value
    var age int = 30

    // 2. Declaration with type inference
    var name = "Gopher"

    // 3. Declaration without initialisation (zero value)
    var isActive bool

    fmt.Printf("Name: %s, Age: %d, Active: %t\n", name, age, isActive)
}
```

```
Name: Gopher, Age: 30, Active: false
```

Let's break down each variant.

### 1. Explicit type and value (`var name type = value`)

You specify everything: that it's a variable, its name, its type, and its initial value. This is the most verbose variant. In idiomatic Go<sup>*</sup> it's rarely used — only when the type of the value on the right doesn't match the type you want the variable to have.

For example, the number `42` defaults to type `int`. But if you're writing a system utility and need exactly 8 bits of memory, you'd write:

```go
var smallNumber int8 = 42
```

Without explicitly specifying `int8`, the compiler won't guess your intentions.

<sup>*</sup> **Idiomatic** — "the way the community does it". You've already encountered this word in the [lesson on compilation](/en/compile-and-run/).

### 2. Type inference (`var name = value`)

If you assign a value straight away, Go is smart enough to figure out the type on its own. You write `var name = "Gopher"`, the compiler sees double quotes — it understands: this is a string (`string`). No need to write `var name string = "Gopher"`. Type inference is an excellent way to reduce visual noise in code.

### 3. Declaration without initialisation (`var name type`)

If you create a variable but don't yet know what will go in it, you simply specify its type: `var result int`. At this point Go does something magical that sets it apart from many other languages — the variable automatically receives a **zero value**. But more on that in its own section — it's a killer feature of the language.

### Grouping Variables with `var (...)`

Often you need to declare several variables at once. Writing `var` on every line gets tedious. Go lets you group declarations into blocks:

```go
package main

import "fmt"

// Grouping at package level
var (
    appName    string = "MyApp"
    appVersion string = "1.0.0"
    maxRetries int    = 3
)

func main() {
    fmt.Printf("Starting %s v%s (retries: %d)\n", appName, appVersion, maxRetries)
}
```

```
Starting MyApp v1.0.0 (retries: 3)
```

:::tip Pro tip
The official [Uber Go Style Guide](https://github.com/uber-go/guide/blob/master/style.md#group-similar-declarations) states: always group similar declarations. If you have several related variables outside functions (these are called package-level variables — declared directly in the file, like `appName` in the example above, not inside `func`), combine them into a single `var (...)` block. It makes code cleaner and shows the logical relationship between variables.
:::

---

## Short Declaration: the Magic of `:=`

In day-to-day Go development, you won't see `var` all that often. Virtually all local code is written using the **short variable declaration** — the `:=` operator.

Syntax: `name := value`.

```go
package main

import "fmt"

func main() {
    // Short declaration. Type is inferred automatically.
    message := "Hello, Gopher!"
    count := 42
    price := 19.99

    fmt.Printf("%s Count: %d, Price: %.2f\n", message, count, price)
}
```

```
Hello, Gopher! Count: 42, Price: 19.99
```

The `:=` operator does three things at once:

1. **Declares** a new variable
2. Automatically **infers** its type from the value on the right
3. **Assigns** the value to it

Incredibly convenient and concise. But `:=` has strict rules and restrictions.

### Restriction 1: Only Inside Functions

Short declaration is **forbidden** at the package level (outside functions):

```go
package main

// COMPILE ERROR: syntax error: non-declaration statement outside function body
version := "1.0.0"

func main() {
}
```

Why? In [lesson 1.5](/en/program-structure/) we discussed programme structure. The Go specification requires that any expression at the package level begins with a keyword: `package`, `import`, `func`, `var`, `const`, or `type`. The `:=` operator is a statement (an executable instruction), and only declarations are allowed at the package level. So outside functions you must write `var version = "1.0.0"`.

### Restriction 2: At Least One New Variable

The `:=` operator is specifically a **declaration** operator, not a simple assignment. There must be at least one **new** variable on the left that doesn't yet exist in the current scope (scope — the block of curly braces `{}` you're currently inside; we'll cover this in detail in lesson 2.1.6):

```go
package main

import "fmt"

func main() {
    x := 10
    fmt.Println(x)

    // COMPILE ERROR: no new variables on left side of :=
    // x := 20

    // Correct (simple assignment):
    x = 20
    fmt.Println(x)
}
```

But here lies an ingenious exception that makes error handling in Go so elegant.

:::tip Redeclaration Trap
If you declare several variables at once with `:=`, the compiler will accept the code even if **some** of those variables already exist. The key rule — there must be at least one **new** variable on the left. Existing variables simply get a new value assigned.
:::

Let's look at the classic Go pattern you'll write hundreds of times a day:

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    // os.Open returns two values: a file and an error
    file1, err := os.Open("file1.txt")
    if err != nil {
        fmt.Println("Error 1:", err)
    }

    // NOTE:
    // We use := again, even though err ALREADY exists!
    // This works because file2 is a NEW variable.
    file2, err := os.Open("file2.txt")
    if err != nil {
        fmt.Println("Error 2:", err)
    }

    // Clean up (more on this in future lessons)
    if file1 != nil { file1.Close() }
    if file2 != nil { file2.Close() }
}
```

If Go forced us to invent new names for errors (`err1`, `err2`, `err3`), our code would be a nightmare. Allowing the reuse of an existing `err` variable as long as a new variable appears (e.g. `file2`) is a pragmatic compromise from the language creators. Effective Go calls this "pure pragmatism, making it easy to use a single err value".

---

## Zero Values: a Safety Guarantee

Now we've reached a concept that fundamentally sets Go apart from languages like C or C++.

When I first started writing C, one of the most terrifying bugs was the **uninitialised variable**. If in C you write `int x;` and forget to assign a value, the variable's memory will contain "garbage" — random bits left over from previous programmes. This led to catastrophic, intermittent bugs that were nearly impossible to track down.

Java went a bit further: objects default to `null`, which led to billions of `NullPointerException` errors.

Rob Pike and the Go team solved this problem radically: **there are no uninitialised variables in Go**. The moment you create a variable with `var x type`, Go automatically clears the memory and writes a default, "zero" value for the given type.

### Zero Value Table

| Data type | Zero value | Meaning |
|---|---|---|
| `int`, `int64`, `float64` and other numbers | `0` (or `0.0`) | Ordinary mathematical zero |
| `bool` | `false` | False by default |
| `string` | `""` | Empty string (no spaces) |
| `pointer` (`*int`), `func`, `interface` | `nil` | No address or implementation |
| `slice`, `map`, `channel` | `nil` | Empty uninitialised collection |
| `array` (e.g. `[3]int`) | `[0, 0, 0]` | Array filled with zero values |
| `struct` | All fields — zeros | Every field reset to its own zero |

Let's verify in practice:

```go
package main

import "fmt"

func main() {
    var defaultInt int
    var defaultBool bool
    var defaultString string
    var defaultPointer *int

    // %q for strings to see the quotes around the empty string
    fmt.Printf("int:     %d\n", defaultInt)
    fmt.Printf("bool:    %t\n", defaultBool)
    fmt.Printf("string:  %q\n", defaultString)
    fmt.Printf("pointer: %v\n", defaultPointer)
}
```

```
int:     0
bool:    false
string:  ""
pointer: <nil>
```

### The Philosophy of "Make the zero value useful"

In idiomatic Go there's a golden rule: **"Make the zero value useful"**. It's one of Rob Pike's famous Go Proverbs. Since we know for certain that a struct will be initialised to zeros, Go's standard library is designed so that those zeros already make sense.

For example, Go has the synchronisation primitive `sync.Mutex`. You don't need to call constructors or initialisers. You simply write `var mu sync.Mutex`, and the variable is already ready to use — its zero internal state means "mutex unlocked". Similarly, `bytes.Buffer` — you can call `buf.WriteString("hello")` straight away without any initialisation. This makes code incredibly reliable and predictable.

### `nil` Is a Valid Slice

A separate note about slices (dynamic arrays, which we'll cover in detail later). A variable declared as `var items []string` receives the value `nil`. But this `nil` slice is **already ready to work** — you can add elements to it via `append` without calling `make()`:

```go
package main

import "fmt"

func main() {
    var names []string              // nil slice, but already functional
    names = append(names, "Alice")
    names = append(names, "Bob")

    fmt.Println(names)             // [Alice Bob]
    fmt.Println(len(names))        // 2
}
```

```
[Alice Bob]
2
```

The [Uber Go Style Guide](https://github.com/uber-go/guide/blob/master/style.md#nil-is-a-valid-slice) recommends: check slice emptiness with `len(s) == 0`, **not** with `s == nil`. An empty slice and a `nil` slice behave identically (length 0, `append` works), but technically they're different things — and `s == nil` can give unexpected results if the slice was initialised as `[]string{}`.

---

## Assignment and Multiple Operations

We've learnt to declare variables. Now we need to change them. Assignment in Go uses the `=` sign. Lock this distinction in your mind:

- **`:=`** is **creation** (declaration) + assignment
- **`=`** is **modification** (assignment) of an already existing variable

Since Go is statically typed, you cannot put a value of a different type into a variable:

```go
var count int = 5
count = "ten" // ERROR: cannot use "ten" (type untyped string) as type int
```

### Multiple Assignment (Tuple Assignment)

Go supports an elegant mechanism for multiple assignment on a single line. Imagine the classic task: swap the values of two variables `a` and `b`. In C or Java you'd need a temporary variable `temp`. In Go it's done in one line:

```go
package main

import "fmt"

func main() {
    a, b := 10, 20
    fmt.Printf("Before: a=%d, b=%d\n", a, b)

    // Values are computed simultaneously, then assigned
    a, b = b, a

    fmt.Printf("After:  a=%d, b=%d\n", a, b)
}
```

```
Before: a=10, b=20
After:  a=20, b=10
```

The compiler guarantees that all expressions on the right are fully evaluated **before** any writing to variables on the left begins.

The same pattern is used extensively when reading from maps (dictionaries) or receiving multiple values from a function:

```go
value, ok := myMap["key"]       // value + "was the key found?" flag
result, err := someFunc()       // result + error
```

---

## The Strict Enforcer: Unused Variables and `_`

Remember, in [lesson 1.5](/en/program-structure/) we mentioned that Go won't compile code with unused variables? Time to understand why and how to live with it.

In most languages (Java, Python, C++, TypeScript), an unused variable is a warning from a linter. The programme compiles anyway. In Go, the creators elevated code cleanliness to an absolute. According to the specification, an unused local variable is a **compile error**:

```go
package main

import "fmt"

func main() {
    x := 5
    y := 10 // COMPILE ERROR: y declared and not used
    fmt.Println(x)
}
```

The [Go FAQ](https://go.dev/doc/faq#unused_variables_and_imports) explains: *"The presence of an unused variable may indicate a bug [...] Go refuses to compile programs with unused variables or imports, trading short-term convenience for long-term build speed and program clarity."* An unused variable almost always means a bug — either you forgot to finish the logic, or you accidentally left debris after refactoring.

:::caution Note
This rule strictly applies only to **local** variables inside functions. A package-level variable (`var unused int` outside a function) won't cause an error — it could potentially be used in other files within the same package, or exported. The compiler cannot conclusively prove its "uselessness".
:::

### Blank Identifier (`_`)

What if a function returns several values but we only need one? For such situations Go has the **blank identifier** — the underscore `_`:

```go
package main

import "fmt"

func divide(a, b int) (int, int) {
    return a / b, a % b
}

func main() {
    // We only need the division result. Discard the remainder via _
    result, _ := divide(10, 3)

    fmt.Printf("Result: %d\n", result)
}
```

```
Result: 3
```

The underscore `_` is not a variable. It's a special syntactic marker for the compiler: "I know the function returns a value, but I'm deliberately discarding it. Don't allocate memory for it and don't complain." [Effective Go](https://go.dev/doc/effective_go#blank) describes it as analogous to writing to `/dev/null` — a write-only value.

Sometimes during debugging you need to temporarily keep a variable but comment out the code that uses it. To keep the compiler happy, developers use a hack:

```go
x := 42
_ = x // Now the compiler considers x "used"
```

:::danger Important
Don't leave `_ = x` in production code. This is a crutch exclusively for local debugging!
:::

The blank identifier is also used when importing packages solely for their side effects, e.g. for initialising database drivers: `import _ "github.com/lib/pq"`.

---

## How Go Infers Types (Type Inference)

We've seen that `x := 42` automatically makes `x` an integer. But how exactly does the type inference mechanism work?

If the right-hand side of the expression is a literal (a value in code without an explicit type), Go uses a default type table:

| Expression | Inferred type | Why |
|---|---|---|
| `42`, `-10` | `int` | Integers → `int` (64 bits on modern machines) |
| `3.14` | `float64` | Decimal numbers → **always** `float64`, never `float32` |
| `'G'`, `'⌘'` | `int32` (`rune`) | Single-quoted characters → `rune` (Unicode character) |
| `"Hello"` | `string` | Double-quoted text → `string` |
| `true`, `false` | `bool` | Boolean literals → `bool` |

Let's verify. `fmt.Printf` has the `%T` format specifier, which prints a variable's type:

```go
package main

import "fmt"

func main() {
    a := 42
    b := 3.14
    c := 'G'
    d := "Go"
    e := true

    fmt.Printf("a: %T (value: %v)\n", a, a)
    fmt.Printf("b: %T (value: %v)\n", b, b)
    fmt.Printf("c: %T (value: %v)\n", c, c)
    fmt.Printf("d: %T (value: %v)\n", d, d)
    fmt.Printf("e: %T (value: %v)\n", e, e)
}
```

```
a: int (value: 42)
b: float64 (value: 3.14)
c: int32 (value: 71)
d: string (value: Go)
e: bool (value: true)
```

Notice that `c` shows `71` — that's the ASCII code for the character `'G'`. The `int32` type (a.k.a. `rune`) stores the numeric code of a character, not the character itself. More on runes and strings in lesson 2.1.2 "Basic Types".

Type inference makes code cleaner. You only need to explicitly specify a type when the default doesn't suit you (e.g. you need `int8` or `float32`). We'll cover the nuances of type conversions in lesson 2.1.5 "Type Definitions".

---

## Scope and Initialisation

Where does a variable live and who can access it? That depends on where you declared it.

**Package level:** a variable declared outside any function (only via `var`). Accessible from any file within the same package. If its name starts with a capital letter (`var Version string`), it becomes **exported** — accessible to other packages. More on exports in lesson 2.1.7 "Naming and Export".

**Local level:** a variable inside a function (via `var` or `:=`). Exists only within the `{}` block where it was created.

### Reduce Variable Scope

The [Uber Go Style Guide](https://github.com/uber-go/guide/blob/master/style.md#reduce-scope-of-variables) recommends: declare variables **as close as possible** to where they're used.

:::tip For experienced developers: declaring a variable directly in `if`
We'll cover the `if` construct in detail in lesson 2.3.1. But it's worth knowing in advance: Go allows you to declare a variable right in the condition — with a semicolon before the check:

```go
// Ordinary approach: err lives until the end of the function
err := os.WriteFile("data.txt", data, 0644)
if err != nil {
    return err
}

// Idiomatic approach: err lives only inside the if block
if err := os.WriteFile("data.txt", data, 0644); err != nil {
    return err
}
```

In the second variant, `err` is created right in the `if` and **doesn't exist** beyond it. This reduces the number of variables you need to keep in your head and lowers the risk of accidental reuse. You'll come back to this technique once you've covered control structures.
:::

### Package Initialisation Order

Local variables are created the moment the programme reaches the line with their declaration. But package-level variables are more interesting — they're initialised **before** `main()` is called.

The compiler builds a dependency graph. If variable `a` is initialised with the value of variable `b`, the compiler will create `b` first, even if it's written lower in the code:

```go
package main

import "fmt"

// Go figures out on its own that b and c need to be computed first
var a = b + c
var b = 10
var c = 20

func main() {
    fmt.Printf("a = %d\n", a) // a = 30
}
```

But if you create a circular dependency (`var x = y` and `var y = x`), the programme simply won't compile.

---

## Shadowing: the Beginner's Worst Nightmare

Since we've started talking about scope and `{}` blocks, we must cover the most common logical mistake made by beginning Go developers — **variable shadowing**.

Shadowing occurs when you use `:=` inside a nested block (e.g. inside `if`) to "change" a variable declared outside. But instead of changing it, `:=` **creates a brand new variable** with the same name that overshadows the outer one:

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    var size int64 = 0

    f, err := os.Open("test.txt")
    if err == nil {
        info, err := f.Stat()
        if err == nil {
            size := info.Size() // SHADOWING! A NEW variable size is created!
            fmt.Println("Size inside block:", size)
        }
        f.Close()
    }

    // Will print 0! The outer variable was never changed.
    fmt.Println("File size outside:", size)
}
```

What happened? The compiler saw `size := info.Size()` inside the `if` block. It created a **new** local variable `size` for that block. It lived exactly until the closing brace `}`, after which it was destroyed. The outer variable `size` remained zero.

:::danger Shadowing Trap
Inside `if` and `for` blocks, be extremely careful. If you need to **update** the value of an outer variable, use the assignment operator `=`. The `:=` operator will create a shadow copy that disappears beyond the block's boundaries.
:::

To combat this, the community uses the `shadow` tool from the `golang.org/x/tools` package — it analyses code and finds suspicious name overlaps. More on scope in lesson 2.1.6 "Scope and Shadowing".

### Don't Name Variables After Built-in Functions

Another trap from the same family. Go has a set of built-in identifiers — `len`, `cap`, `append`, `copy`, `new`, `make`, `error`, `string`, and others. The language **allows** you to declare a variable with such a name — the code will compile. But you'll shadow the built-in function, and for the rest of the block it will stop working:

```go
// Bad: shadowed the built-in function len
len := 10
fmt.Println(len)

// Now len() as a function is UNAVAILABLE in this block!
// size := len(mySlice) — compile error

// Good: use a descriptive name
length := 10
```

The [Uber Go Style Guide](https://github.com/uber-go/guide/blob/master/style.md#avoid-using-built-in-names) explicitly prohibits this: *"The Go language specification outlines several built-in, predeclared identifiers that should not be used as names within Go programs."* Beginners especially often name a variable `string` or `error` — don't do this.

---

## Memory Layout: Stack, Heap, and Escape Analysis

:::tip For experienced developers: where variables end up
Does the way we declare a variable (`var` or `:=`) affect performance? No, not at all. The machine code will be identical.

But how does Go decide **where** in memory a variable will live? In C/C++ the programmer controls this manually (`malloc` for the heap). In Go, the compiler does it using **Escape Analysis**.

Each goroutine has its own **stack** — fast memory. When a function finishes, everything on its stack is instantly wiped. There's also the **heap** — shared memory where allocation is more expensive, and cleanup is handled by the garbage collector (GC).

By default, the compiler tries to keep local variables on the stack. But if you return a **pointer** to a local variable from a function, the compiler understands: "This variable is needed by someone outside the function. I need to move it to the heap." That's the "escape".

```go
func doNotEscape() int {
    x := 42
    return x   // x is copied, the original dies on the stack (fast)
}

func escape() *int {
    y := 100
    return &y  // y "escapes" to the heap because we're giving the address out
}
```

To check where your variables end up: `go build -gcflags="-m" .`
:::

---

## Idiomatic Go: How the Community Writes

The language allows you to write in different ways, but in professional circles it's customary to follow standards. Major companies — Google and Uber — have published style guides for Go.

:::caution Note
The Google and Uber style guides are **recommendations**, not law. They reflect practices of specific companies. Your team or project may have different rules. But if you're just starting out and don't have your own style yet — they're an excellent starting point.
:::

A summary of the main rules for working with variables:

### 1. `:=` by Default

Use short declaration `:=` everywhere for local variables. Google Go Style Guide: *"For consistency, prefer `:=` over `var` when initializing a new variable with a non-zero value."*

### 2. `var` — Only with Purpose

The `var` keyword is appropriate in three cases:

- **At the package level** (where `:=` is forbidden)
- **When you specifically want the zero value** and want to emphasise it: `var mu sync.Mutex`, `var result []string`. Uber prohibits writing `var x int = 0`, requiring simply `var x int`
- **When the type of the right-hand side doesn't match** what you need: `var id int64 = 42`

When we get to structs, this rule extends to them too: `var user User` is preferred over `user := User{}` when all fields should be zero-valued. The [Uber Go Style Guide](https://github.com/uber-go/guide/blob/master/style.md#use-var-for-zero-value-structs) explains: `var` explicitly signals "I specifically want the zero value".

### 3. Name Length Depends on Context

The Google Style Guide dictates: variable name length should be proportional to the size of its scope.

- Lives for 2–5 lines (loop index) → single letter: `i`, `v`, `k`
- Method parameter → short names: `w` for `io.Writer`, `r` for `io.Reader`
- Lives for 30 lines of a complex function → descriptive name: `dbConnection`, `userCount`

Also, don't embed types in names. Instead of `userSlice` — `users`, instead of `numUsers` — `userCount`.

| Situation | Use | Example |
|---|---|---|
| Zero value is intentional | `var` | `var count int` |
| Declaration + initialisation | `:=` | `name := "Go"` |
| Package level | `var` (required) | `var Version = "1.0"` |
| Empty slice | `var` | `var items []string` |
| Need a specific type | `var` or cast | `var r io.Reader = os.Stdin` |
| Loop | `:=` | `for i := 0; i < n; i++` |
| Function return | `:=` | `f, err := os.Open(name)` |

:::tip For experienced developers: package variable conventions
Two additional rules from the [Uber Go Style Guide](https://github.com/uber-go/guide/blob/master/style.md#prefix-unexported-globals-with-_) that will come in handy when you start working with packages:

**`_` prefix for unexported global variables.** If you have a package-level variable that shouldn't be visible externally, Uber recommends starting its name with `_`: `var _defaultPort = 8080` instead of `var defaultPort = 8080`. This visually highlights global state and reduces the risk of accidental shadowing. Exception — error variables with the `err` prefix (e.g. `var errNotFound = errors.New("not found")`). More on exports in lesson 2.1.7.

**[Avoid mutable global variables.](https://github.com/uber-go/guide/blob/master/style.md#avoid-mutable-globals)** Package-level variables that change at runtime are hidden global state. They complicate testing and create problems with concurrent access. Instead of `var _db *sql.DB` at the package level, it's better to pass dependencies explicitly — via function parameters or struct fields (dependency injection).
:::

---

## Variables in Go vs Other Languages

If you're coming to Go from other languages, it helps to see the differences:

| Language | Declaration syntax | Mutability | When uninitialised | Type inference |
|---|---|---|---|---|
| **Go** | `var x int` / `x := 5` | Mutable | Zero value (safe) | Yes |
| **Python** | `x = 5` | Mutable | `NameError` | Dynamic |
| **C / C++** | `int x = 5;` | Mutable | Garbage in memory (dangerous!) | Yes (`auto`) |
| **Java** | `int x = 5;` | Mutable | Objects — `null`, primitives — `0` | Yes (`var`, Java 10+) |
| **Rust** | `let x = 5;` | **Immutable** (needs `mut`) | Compile error | Yes |
| **TypeScript** | `let x: number = 5` | Mutable | `undefined` | Yes |

Go occupies a unique niche: it rejects garbage in memory (unlike C/C++), doesn't force you to write types everywhere (unlike old Java), keeps variables mutable by default (unlike Rust), but doesn't forgive unused variables (unlike Python and TypeScript).

---

## Recent Changes: Loop Fix in Go 1.22

Go is a conservative but evolving language. Between versions 1.22 and 1.26, an important change related to variables occurred.

Before Go 1.22, a variable declared in a loop (`for i, v := range items`) was **the same variable in memory**, overwritten on each iteration. This spawned bugs when using goroutines (concurrency): if you launched goroutines inside a loop and passed them a pointer to `v`, all goroutines received a reference to the same memory cell and printed the **last** value.

Starting with Go 1.22, the specification changed: **a new variable is created for each loop iteration**. This quiet change saved thousands of hours of debugging worldwide. The familiar `i := i` hack inside loops is no longer needed.

---

## Summary

| Concept | What to remember |
|---|---|
| `var x type` | Explicit declaration. Receives zero value. Works everywhere. |
| `var x = value` | Type inferred. For package level when `:=` is forbidden. |
| `x := value` | Short declaration. Only inside functions. Use by default. |
| `:=` vs `=` | `:=` creates a variable, `=` modifies an existing one. |
| Zero values | Go has no uninitialised variables. `int` → `0`, `string` → `""`, `bool` → `false`. |
| `_` (blank identifier) | Explicitly discards a value. Not a variable — a marker for the compiler. |
| Shadowing | `:=` in a nested block creates a **new** variable, doesn't change the outer one. |
| Unused | Local variable without usage → compile error. |

---

## Exercises

### Exercise 1: Zero Values ⭐

Declare variables of types `int`, `float64`, `bool`, `string` **without initialisation** and print their values. What will the programme output?

<details>
<summary>Solution</summary>

```go
package main

import "fmt"

func main() {
    var i int
    var f float64
    var b bool
    var s string

    fmt.Printf("int: %d, float64: %f, bool: %t, string: %q\n", i, f, b, s)
}
```

```
int: 0, float64: 0.000000, bool: false, string: ""
```

All variables received the zero values of their types — there's no "memory garbage" in Go.

</details>

### Exercise 2: Swap ⭐

Declare two variables `a = 100` and `b = 200`. Swap their values **without** a temporary variable. Print the result.

<details>
<summary>Solution</summary>

```go
package main

import "fmt"

func main() {
    a, b := 100, 200
    fmt.Printf("Before: a=%d, b=%d\n", a, b)

    a, b = b, a
    fmt.Printf("After:  a=%d, b=%d\n", a, b)
}
```

```
Before: a=100, b=200
After:  a=200, b=100
```

Go evaluates all expressions on the right of `=` before writing, so `a, b = b, a` is safe.

</details>

### Exercise 3: Find the Bug ⭐⭐

This code should print `result = 42`, but it outputs `result = 0`. Find the error and fix it.

```go
package main

import "fmt"

func main() {
    var result int

    if true {
        result := 42
        fmt.Println("inside:", result)
    }

    fmt.Println("result =", result)
}
```

<details>
<summary>Hint</summary>

Pay attention to the operator inside the `if` block — is it `:=` or `=`?

</details>

<details>
<summary>Solution</summary>

The problem is **shadowing**. Inside `if`, the `:=` operator creates a **new** local variable `result` that shadows the outer one. The fix — replace `:=` with `=`:

```go
package main

import "fmt"

func main() {
    var result int

    if true {
        result = 42 // = instead of :=
        fmt.Println("inside:", result)
    }

    fmt.Println("result =", result)
}
```

```
inside: 42
result = 42
```

</details>

### Exercise 4: Type Detective ⭐⭐

Without running the code, determine the types of variables `a`, `b`, `c`, `d`, `e`. Then check yourself using `fmt.Printf("%T")`.

```go
a := 100
b := 3.0
c := 'Z'
d := "Go"
e := a > 50
```

<details>
<summary>Solution</summary>

```go
package main

import "fmt"

func main() {
    a := 100
    b := 3.0
    c := 'Z'
    d := "Go"
    e := a > 50

    fmt.Printf("a: %T\n", a) // int
    fmt.Printf("b: %T\n", b) // float64
    fmt.Printf("c: %T\n", c) // int32 (rune)
    fmt.Printf("d: %T\n", d) // string
    fmt.Printf("e: %T\n", e) // bool
}
```

- `100` — integer → `int`
- `3.0` — decimal number → `float64` (not `float32`!)
- `'Z'` — character in single quotes → `int32` (a.k.a. `rune`)
- `"Go"` — string → `string`
- `a > 50` — comparison result → `bool`

</details>

---

## What's Next?

We know how to store values, but **what exactly** can we put in these variables? In the next lesson 2.1.2 "Basic Types" we'll break down numbers, strings, runes, and booleans down to the last bit. See you there!

---

## Sources

- [Go Spec: Variable declarations](https://go.dev/ref/spec#Variable_declarations) — formal `var` syntax
- [Go Spec: Short variable declarations](https://go.dev/ref/spec#Short_variable_declarations) — formal `:=` syntax
- [Go Spec: The zero value](https://go.dev/ref/spec#The_zero_value) — zero value guarantee
- [Go Spec: Assignment statements](https://go.dev/ref/spec#Assignment_statements) — assignment rules
- [Go Blog: Declaration Syntax](https://go.dev/blog/declaration-syntax) — Rob Pike on declaration syntax
- [Effective Go](https://go.dev/doc/effective_go) — idiomatic Go recommendations
- [Go FAQ](https://go.dev/doc/faq) — why unused variables are an error
- [Go Proverbs](https://go-proverbs.github.io/) — "Make the zero value useful"
- [Google Go Style Guide](https://google.github.io/styleguide/go/best-practices.html) — `var` vs `:=`
- [Uber Go Style Guide](https://github.com/uber-go/guide/blob/master/style.md) — declaration style
- [Dave Cheney: On Declaring Variables](https://dave.cheney.net/2014/05/24/on-declaring-variables) — when `var`, when `:=`
- [Go 1.22 Release Notes](https://go.dev/doc/go1.22) — loop variable scoping fix


---

<nav class="lesson-nav">
  <a href="/en/docs-and-resources/" class="lesson-nav-link">
    <span class="lesson-nav-label">← Previous</span>
    <span class="lesson-nav-title">Docs and Resources</span>
  </a>
  <div></div>
</nav>
