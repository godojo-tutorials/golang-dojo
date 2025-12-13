---
title: Installing Go
description: 'Go installation, versions, updates'
tableOfContents:
  minHeadingLevel: 2
  maxHeadingLevel: 3
author: godojo
authorName: Godojo Master
updatedAt: '2025-12-13'
readingTime: 4
---
> Step-by-step guide to installing Go on various operating systems

## Introduction

Go (or Golang) is a modern programming language developed at Google. Before you start working with Go, you need to install the compiler and set up the environment. In this lesson, we'll cover installing Go on Windows, macOS, and Linux.

## Checking Current Version

If Go is already installed on your system, you can check the version with:

```bash
go version
```

The output will look something like:

```
go version go1.25.5 linux/amd64
```

## Installing on Windows

### Method 1: Official Installer

1. Go to the official website [go.dev/dl](https://go.dev/dl/)
2. Download the MSI installer for Windows (e.g., `go1.25.5.windows-amd64.msi`)
3. Run the installer and follow the instructions
4. By default, Go is installed in `C:\Go`

### Method 2: Using winget

```bash
winget install GoLang.Go
```

### Method 3: Using Chocolatey

```bash
choco install golang
```

After installation, open a new terminal and verify:

```bash
go version
```

## Installing on macOS

### Method 1: Official Installer

1. Download the PKG file from [go.dev/dl](https://go.dev/dl/)
2. Open the downloaded file and follow the instructions
3. Go will be installed in `/usr/local/go`

### Method 2: Using Homebrew (recommended)

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
# Remove old version (if exists)
sudo rm -rf /usr/local/go

# Download and extract
wget https://go.dev/dl/go1.25.5.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.25.5.linux-amd64.tar.gz

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

Main variables:

| Variable | Description | Example Value |
|----------|-------------|---------------|
| `GOROOT` | Go installation path | `/usr/local/go` |
| `GOPATH` | Working directory | `~/go` |
| `GOBIN` | Binary files path | `~/go/bin` |

## First Program

Let's create a simple program to verify the installation:

```go
package main

import (
    "fmt"
    "runtime"
)

func main() {
    fmt.Println("Go successfully installed!")
    fmt.Printf("Version: %s\n", runtime.Version())
}
```

Save the code to a file called `hello.go` and run it:

```bash
go run hello.go
```

Output (version depends on your installation):

```
Go successfully installed!
Version: go1.25.5
```

## Updating Go

### Windows and macOS

Simply download and run the new installer — it will replace the previous version.

### Linux

```bash
# Remove old version
sudo rm -rf /usr/local/go

# Install new version (replace with current version)
wget https://go.dev/dl/go1.25.5.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.25.5.linux-amd64.tar.gz
```

## Version Management with gvm

To work with multiple Go versions, you can use Go Version Manager:

```bash
# Install gvm
bash < <(curl -s -S -L https://raw.githubusercontent.com/moovweb/gvm/master/binscripts/gvm-installer)

# Usage
gvm install go1.25.5
gvm use go1.25.5 --default
```

## Practice

### Exercise 1
Install Go on your system and run `go version`. What version is installed?

### Exercise 2
Run `go env` and find the values of `GOROOT` and `GOPATH` variables.

### Exercise 3
Create a file called `check.go` with the following content and run it:

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

- Go can be installed via the official installer, package manager, or manually
- After installation, `go version` shows the current version
- `go env` displays all Go environment variables
- Use gvm for working with multiple versions
- Updating Go is done by simple reinstallation

In the next lesson, we'll set up the workspace and project structure.
