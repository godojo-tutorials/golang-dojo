---
title: "Installing Go"
description: "Go installation, versions, updating"
slug: installation
published: true
author: godojo
updatedAt: "2025-12-15"
readingTime: 3
---

# Installing Go

> Step-by-step guide to installing Go on various operating systems

## Introduction

Go (or Golang) is a modern programming language developed at Google. Before you can start working with Go, you need to install the compiler and set up your environment. In this lesson, we'll cover installing Go on Windows, macOS, and Linux.

## Checking the Current Version

If Go is already installed on your system, you can check the version with:

```bash
go version
```

The output will look something like:

```
go version go1.23.4 linux/amd64
```

## Installing on Windows

### Option 1: Official Installer

1. Head to the official site [go.dev/dl](https://go.dev/dl/)
2. Download the MSI installer for Windows (e.g., `go1.23.4.windows-amd64.msi`)
3. Run the installer and follow the prompts
4. By default, Go installs to `C:\Go`

### Option 2: Via winget

```bash
winget install GoLang.Go
```

### Option 3: Via Chocolatey

```bash
choco install golang
```

After installation, open a new terminal and verify:

```bash
go version
```

## Installing on macOS

### Option 1: Official Installer

1. Download the PKG file from [go.dev/dl](https://go.dev/dl/)
2. Open the downloaded file and follow the prompts
3. Go will be installed to `/usr/local/go`

### Option 2: Via Homebrew (recommended)

```bash
brew install go
```

Verify the installation:

```bash
go version
```

## Installing on Linux

### Ubuntu/Debian

```bash
# Remove old version (if present)
sudo rm -rf /usr/local/go

# Download and extract
wget https://go.dev/dl/go1.23.4.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.23.4.linux-amd64.tar.gz

# Add to PATH (in ~/.bashrc or ~/.zshrc)
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc
source ~/.bashrc
```

### Fedora/RHEL

```bash
sudo dnf install golang
```

### Arch Linux

```bash
sudo pacman -S go
```

## Setting Up Environment Variables

After installation, Go automatically configures the main variables. You can check them with:

```bash
go env
```

Key variables:

| Variable | Description | Example Value |
|----------|-------------|---------------|
| `GOROOT` | Path to Go installation | `/usr/local/go` |
| `GOPATH` | Working directory | `~/go` |
| `GOBIN` | Path for binaries | `~/go/bin` |

## First Program

Let's create a simple programme to verify the installation:

```go
package main

import (
    "fmt"
    "runtime"
)

func main() {
    fmt.Println("Go installed successfully!")
    fmt.Printf("Version: %s\n", runtime.Version())
}
```

Save the code to a file called `hello.go` and run it:

```bash
go run hello.go
```

Output (version depends on what's installed):

```
Go installed successfully!
Version: go1.23.4
```

## Updating Go

### Windows and macOS

Simply download and run the new installer — it will replace the previous version.

### Linux

```bash
# Remove old version
sudo rm -rf /usr/local/go

# Install the new one (replace with the current version)
wget https://go.dev/dl/go1.23.4.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.23.4.linux-amd64.tar.gz
```

## Managing Versions with gvm

To work with multiple Go versions, you can use Go Version Manager:

```bash
# Install gvm
bash < <(curl -s -S -L https://raw.githubusercontent.com/moovweb/gvm/master/binscripts/gvm-installer)

# Usage
gvm install go1.23.4
gvm use go1.23.4 --default
```

## Exercises

### Exercise 1
Install Go on your system and run `go version`. What version is installed?

### Exercise 2
Run `go env` and find the values of `GOROOT` and `GOPATH`.

### Exercise 3
Create a file called `check.go` with the following contents and run it:

```go
package main

import (
    "fmt"
    "runtime"
)

func main() {
    fmt.Printf("OS: %s\n", runtime.GOOS)
    fmt.Printf("Arch: %s\n", runtime.GOARCH)
    fmt.Printf("Go version: %s\n", runtime.Version())
    fmt.Printf("Num CPU: %d\n", runtime.NumCPU())
}
```

## Summary

- Go can be installed via the official installer, a package manager, or manually
- After installation, `go version` shows the current version
- `go env` displays all Go environment variables
- For working with multiple versions, use gvm
- Updating Go is done by simply reinstalling

In the next lesson, we'll write our first programme.

---

## Sources

- [Go Downloads](https://go.dev/dl/)
- [Getting Started](https://go.dev/doc/install)
- [Managing Go installations](https://go.dev/doc/manage-install)
