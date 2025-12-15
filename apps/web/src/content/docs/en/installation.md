---
title: Установка Go
description: 'Go установка, версии, обновление'
tableOfContents:
  minHeadingLevel: 2
  maxHeadingLevel: 3
author: godojo
authorName: Godojo Master
updatedAt: '2025-12-13'
readingTime: 3
---
> Пошаговое руководство по установке Go на различные операционные системы

## Введение

Go (или Golang) — это современный язык программирования, разработанный в Google. Перед началом работы с Go необходимо установить компилятор и настроить окружение. В этом уроке мы рассмотрим установку Go на Windows, macOS и Linux.

## Проверка текущей версии

Если Go уже установлен в вашей системе, вы можете проверить версию командой:

```bash
go version
```

Вывод будет примерно таким:

```
go version go1.25.5 linux/amd64
```

## Установка на Windows

### Способ 1: Официальный установщик

1. Перейдите на официальный сайт [go.dev/dl](https://go.dev/dl/)
2. Скачайте MSI-установщик для Windows (например, `go1.25.5.windows-amd64.msi`)
3. Запустите установщик и следуйте инструкциям
4. По умолчанию Go устанавливается в `C:\Go`

### Способ 2: Через winget

```bash
winget install GoLang.Go
```

### Способ 3: Через Chocolatey

```bash
choco install golang
```

После установки откройте новый терминал и проверьте:

```bash
go version
```

## Установка на macOS

### Способ 1: Официальный установщик

1. Скачайте PKG-файл с [go.dev/dl](https://go.dev/dl/)
2. Откройте скачанный файл и следуйте инструкциям
3. Go будет установлен в `/usr/local/go`

### Способ 2: Через Homebrew (рекомендуется)

```bash
brew install go
```

Проверка установки:

```bash
go version
```

## Установка на Linux

### Ubuntu/Debian

```bash
# Удаляем старую версию (если есть)
sudo rm -rf /usr/local/go

# Скачиваем и распаковываем
wget https://go.dev/dl/go1.25.5.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.25.5.linux-amd64.tar.gz

# Добавляем в PATH (в ~/.bashrc или ~/.zshrc)
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

## Настройка переменных окружения

После установки Go автоматически настраивает основные переменные. Проверить их можно командой:

```bash
go env
```

Основные переменные:

| Переменная | Описание | Пример значения |
|------------|----------|-----------------|
| `GOROOT` | Путь к установке Go | `/usr/local/go` |
| `GOPATH` | Рабочая директория | `~/go` |
| `GOBIN` | Путь для бинарных файлов | `~/go/bin` |

## Первая программа

Создадим простую программу для проверки установки:

```go
package main

import (
    "fmt"
    "runtime"
)

func main() {
    fmt.Println("Go успешно установлен!")
    fmt.Printf("Версия: %s\n", runtime.Version())
}
```

Сохраните код в файл `hello.go` и запустите:

```bash
go run hello.go
```

Вывод (версия зависит от установленной):

```
Go успешно установлен!
Версия: go1.25.5
```

## Обновление Go

### Windows и macOS

Просто скачайте и запустите новый установщик — он заменит предыдущую версию.

### Linux

```bash
# Удаляем старую версию
sudo rm -rf /usr/local/go

# Устанавливаем новую (замените версию на актуальную)
wget https://go.dev/dl/go1.25.5.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.25.5.linux-amd64.tar.gz
```

## Управление версиями с помощью gvm

Для работы с несколькими версиями Go можно использовать Go Version Manager:

```bash
# Установка gvm
bash < <(curl -s -S -L https://raw.githubusercontent.com/moovweb/gvm/master/binscripts/gvm-installer)

# Использование
gvm install go1.25.5
gvm use go1.25.5 --default
```

## Практика

### Задание 1
Установите Go на вашу систему и выполните команду `go version`. Какая версия установлена?

### Задание 2
Выполните команду `go env` и найдите значения переменных `GOROOT` и `GOPATH`.

### Задание 3
Создайте файл `check.go` со следующим содержимым и запустите его:

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

## Итоги

- Go можно установить через официальный установщик, пакетный менеджер или вручную
- После установки команда `go version` показывает текущую версию
- `go env` выводит все переменные окружения Go
- Для работы с несколькими версиями используйте gvm
- Обновление Go выполняется простой переустановкой

В следующем уроке мы настроим рабочее пространство и структуру проекта.


---

<nav class="lesson-nav">
  <a href="/en/ide-setup/" class="lesson-nav-link">
    <span class="lesson-nav-label">← Previous</span>
    <span class="lesson-nav-title">Code Editor</span>
  </a>
  <a href="/en/hello-world/" class="lesson-nav-link" style="text-align: right;">
    <span class="lesson-nav-label">Next →</span>
    <span class="lesson-nav-title">Hello World</span>
  </a>
</nav>
