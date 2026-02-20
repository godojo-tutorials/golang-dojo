---
title: Code Editor
description: 'Setting up VS Code, GoLand and other editors for Go'
tableOfContents:
  minHeadingLevel: 2
  maxHeadingLevel: 3
author: godojo
authorName: Godojo Master
updatedAt: '2025-12-15'
readingTime: 4
---
## Where to Write Code

A programme is text. Technically, you can write it anywhere — even in Notepad. But that's awkward: Notepad doesn't understand code; to it, it's just letters.

A **code editor** is a programme designed for writing code. It:
- Highlights different parts of the code in different colours — easier to read
- Suggests function names as you type
- Shows errors before you run the programme
- Automatically fixes indentation

An **IDE** (Integrated Development Environment) is a code editor on steroids. Besides editing, it includes a debugger, tools for running and testing, database management — all in one window. Examples: GoLand for Go, PyCharm for Python, IntelliJ for Java.

The line is blurry. Modern editors with extensions can do nearly everything an IDE can. For starters, an editor will do.

## Why VS Code

We'll use Visual Studio Code (VS Code):
- Free
- Simple — not cluttered with extras
- Extensions add support for any language
- Works on Windows, macOS, Linux
- Popular — easy to Google solutions to problems

Alternatives exist: GoLand (paid, more powerful), Vim (for those who like a challenge), Sublime Text. But VS Code is the best starting point.

---

## Installing VS Code

Download the installer from the official site:

👉 [code.visualstudio.com](https://code.visualstudio.com/)

Choose the version for your system, download, install. Nothing special — a standard installation like any other programme.

Once installed, launch VS Code.

---

## Installing the Go Extension

VS Code doesn't know about Go on its own. You need to install an extension.

1. Open VS Code
2. On the left, find the icon with little squares (Extensions) or press `Ctrl+Shift+X` (on Mac — `Cmd+Shift+X`)
3. In the search box, type `Go`
4. Find the extension by **Go Team at Google** (it'll have a verification tick)
5. Click **Install**

After installation, VS Code will offer to install additional Go tools. Agree — click **Install All**. These are needed for suggestions, formatting, and error checking.

---

## Checking Everything Works

Create a folder for your project. For example, `go-learning` on your desktop.

In VS Code:
1. **File → Open Folder** (or `Ctrl+K Ctrl+O`)
2. Select the folder you created

Now create a file:
1. **File → New File** (or `Ctrl+N`)
2. Save as `main.go` (`Ctrl+S`)

Write:

```go
package main

import "fmt"

func main() {
	fmt.Println("VS Code is working!")
}
```

If everything is set up correctly, you'll see:
- Syntax highlighting — different parts of the code in different colours
- On save, the code is automatically formatted
- If you make a mistake, the editor underlines it in red

---

## Running Code from the Editor

Open the terminal in VS Code:
- **View → Terminal** or `` Ctrl+` `` (the key below Esc)

In the terminal, type:

```bash
go run main.go
```

You should see:

```
VS Code is working!
```

---

## Useful Keyboard Shortcuts

| Action | Windows/Linux | Mac |
|--------|---------------|-----|
| Save file | `Ctrl+S` | `Cmd+S` |
| Open terminal | `` Ctrl+` `` | `` Cmd+` `` |
| Search in file | `Ctrl+F` | `Cmd+F` |
| Search in all files | `Ctrl+Shift+F` | `Cmd+Shift+F` |
| Go to file | `Ctrl+P` | `Cmd+P` |
| Extensions panel | `Ctrl+Shift+X` | `Cmd+Shift+X` |

No need to memorise them all at once. Start with `Ctrl+S` to save and `` Ctrl+` `` for the terminal — that'll do.

---

## Possible Problems

### "go" not found

If you see an error like `'go' is not recognized` or `command not found` when running `go run main.go`:

- Go isn't installed or isn't added to PATH
- Go back to the lesson on installing Go
- After installation, restart VS Code

### Extension doesn't see Go

If VS Code doesn't highlight code or show suggestions:

1. Check Go is installed: open the terminal, type `go version`
2. Reinstall the Go extension
3. Restart VS Code

### Errors installing tools

If something went wrong when installing additional tools:

1. Open the command palette: `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`)
2. Type `Go: Install/Update Tools`
3. Select all tools, click OK

---

## Summary

- VS Code is an editor for writing code
- The Go extension adds language support: highlighting, suggestions, formatting
- The built-in terminal is for running programmes
- Save: `Ctrl+S`; terminal: `` Ctrl+` ``

The editor is ready. In the next lesson, we'll install Go itself.

---

## Sources

- [VS Code Download](https://code.visualstudio.com/)
- [Go Extension for VS Code](https://marketplace.visualstudio.com/items?itemName=golang.Go)
- [VS Code Keyboard Shortcuts](https://code.visualstudio.com/docs/getstarted/keybindings)


---

<nav class="lesson-nav">
  <a href="/en/what-is-go/" class="lesson-nav-link">
    <span class="lesson-nav-label">← Previous</span>
    <span class="lesson-nav-title">What is Go</span>
  </a>
  <a href="/en/installation/" class="lesson-nav-link" style="text-align: right;">
    <span class="lesson-nav-label">Next →</span>
    <span class="lesson-nav-title">Installing Go</span>
  </a>
</nav>
