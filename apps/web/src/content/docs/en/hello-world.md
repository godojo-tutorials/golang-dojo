---
title: Hello World
description: Your first Go programme
tableOfContents:
  minHeadingLevel: 2
  maxHeadingLevel: 3
author: godojo
authorName: Godojo Master
updatedAt: '2025-12-15'
readingTime: 4
---
Go is installed — time to write some code.

Create a file called `main.go` and paste this in:

```go
package main

import "fmt"

func main() {
	fmt.Println("Hello, World!")
}
```

Run it:

```bash
go run main.go
```

Result:

```
Hello, World!
```

If you see that line, everything's working. What each line of code means — we'll cover in the next lesson. For now, let's just have a play.

---

## Changing the Text

Replace `"Hello, World!"` with anything you like:

```go
fmt.Println("Go is simple")
```

```
Go is simple
```

Quotes are required. Without them — an error:

```go
fmt.Println(Hello)  // won't work
```

---

## Multiple Lines

Add more calls to `fmt.Println`:

```go
package main

import "fmt"

func main() {
	fmt.Println("First line")
	fmt.Println("Second line")
	fmt.Println("Third line")
}
```

```
First line
Second line
Third line
```

Each `Println` outputs text and moves to a new line.

---

## Output Without a Newline

There's `Print` — without `ln` at the end:

```go
package main

import "fmt"

func main() {
	fmt.Print("One ")
	fmt.Print("two ")
	fmt.Print("three")
}
```

```
One two three
```

All on one line.

---

## Printing Numbers

Numbers work without quotes:

```go
package main

import "fmt"

func main() {
	fmt.Println(42)
	fmt.Println(3.14)
	fmt.Println(-10)
}
```

```
42
3.14
-10
```

You can combine text and numbers:

```go
fmt.Println("Answer:", 42)
```

```
Answer: 42
```

---

## Simple Arithmetic

```go
package main

import "fmt"

func main() {
	fmt.Println(2 + 2)
	fmt.Println(10 - 3)
	fmt.Println(6 * 7)
	fmt.Println(15 / 4)
}
```

```
4
7
42
3
```

`15 / 4` gives `3`, not `3.75` — integers divide to a whole number. There'll be a separate lesson on that.

---

## Comments

Text after `//` is ignored:

```go
package main

import "fmt"

func main() {
	// this is a comment, the programme doesn't see it
	fmt.Println("But this will print")

	fmt.Println("Code") // a comment at the end of a line works too
}
```

```
But this will print
Code
```

Comments are for leaving notes to yourself or others. Or to temporarily disable code:

```go
// fmt.Println("This line won't run")
fmt.Println("But this one will")
```

---

## Common Mistakes

### Forgot the quotes

```go
fmt.Println(hello)
```

```
undefined: hello
```

Text always needs quotes: `"hello"`.

### Fancy quotes

```go
fmt.Println(«Hello»)  // wrong
fmt.Println("Hello")  // right
```

Only straight double quotes `"`.

### Typo in Println

```go
fmt.Prinln("Hello")   // missing t
fmt.PrintLn("Hello")  // capital L
```

Case matters: `Println`, not `PrintLn` or `Prinln`.

---

## Exercises

### 1. Your Greeting

Print your name:

```
Hello, my name is [your name]!
```

<details>
<summary>Solution</summary>

```go
package main

import "fmt"

func main() {
	fmt.Println("Hello, my name is Alex!")
}
```

</details>

### 2. Multiple Lines

Print:

```
Line 1
Line 2
Line 3
```

<details>
<summary>Solution</summary>

```go
package main

import "fmt"

func main() {
	fmt.Println("Line 1")
	fmt.Println("Line 2")
	fmt.Println("Line 3")
}
```

</details>

### 3. All on One Line

Print `Go is brilliant` using three separate `Print` calls:

<details>
<summary>Solution</summary>

```go
package main

import "fmt"

func main() {
	fmt.Print("Go ")
	fmt.Print("is ")
	fmt.Print("brilliant")
}
```

</details>

### 4. Calculator

Print the result: `123 + 456 = ???`

The number after `=` should be calculated by the programme.

<details>
<summary>Solution</summary>

```go
package main

import "fmt"

func main() {
	fmt.Print("123 + 456 = ")
	fmt.Println(123 + 456)
}
```

Or on one line:

```go
fmt.Println("123 + 456 =", 123+456)
```

</details>

### 5. Age

Print:

```
I'm X years old
In 10 years I'll be Y years old
```

Where X is your age, Y is calculated by the programme.

<details>
<summary>Solution</summary>

```go
package main

import "fmt"

func main() {
	fmt.Println("I'm 25 years old")
	fmt.Println("In 10 years I'll be", 25+10, "years old")
}
```

</details>

---

## What's Next

You've run your first programme and experimented with output. But what do `package main`, `import "fmt"`, `func main()` mean? We'll cover that in the next lesson.

---

## Sources

- [A Tour of Go — Hello, World](https://go.dev/tour/welcome/1)
- [Go by Example — Hello World](https://gobyexample.com/hello-world)
- [Package fmt](https://pkg.go.dev/fmt)


---

<nav class="lesson-nav">
  <a href="/en/installation/" class="lesson-nav-link">
    <span class="lesson-nav-label">← Previous</span>
    <span class="lesson-nav-title">Installing Go</span>
  </a>
  <a href="/en/program-structure/" class="lesson-nav-link" style="text-align: right;">
    <span class="lesson-nav-label">Next →</span>
    <span class="lesson-nav-title">Program Structure</span>
  </a>
</nav>
