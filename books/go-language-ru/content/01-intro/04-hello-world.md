---
title: "Hello World"
description: "Your first Go programme"
slug: hello-world
published: true
author: godojo
updatedAt: "2025-12-15"
readingTime: 3
---

# Первая программа

Go установлен, пора писать код.

Создайте файл `main.go` и скопируйте в него:

```go
package main

import "fmt"

func main() {
	fmt.Println("Привет, мир!")
}
```

Запустите:

```bash
go run main.go
```

Результат:

```
Привет, мир!
```

Если увидели эту строку — всё работает. Что означает каждая строчка кода — разберём в следующем уроке. Сейчас просто поиграемся.

---

## Меняем текст

Замените `"Привет, мир!"` на что угодно:

```go
fmt.Println("Go — это просто")
```

```
Go — это просто
```

Кавычки обязательны. Без них — ошибка:

```go
fmt.Println(Привет)  // не сработает
```

---

## Несколько строк

Добавьте ещё вызовов `fmt.Println`:

```go
package main

import "fmt"

func main() {
	fmt.Println("Первая строка")
	fmt.Println("Вторая строка")
	fmt.Println("Третья строка")
}
```

```
Первая строка
Вторая строка
Третья строка
```

Каждый `Println` выводит текст и переходит на новую строку.

---

## Вывод без перехода на новую строку

Есть `Print` — без `ln` на конце:

```go
package main

import "fmt"

func main() {
	fmt.Print("Раз ")
	fmt.Print("два ")
	fmt.Print("три")
}
```

```
Раз два три
```

Всё в одной строке.

---

## Вывод чисел

Числа работают без кавычек:

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

Можно комбинировать текст и числа:

```go
fmt.Println("Ответ:", 42)
```

```
Ответ: 42
```

---

## Простая арифметика

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

`15 / 4` дало `3`, а не `3.75` — целые числа делятся нацело. Про это будет отдельный урок.

---

## Комментарии

Текст после `//` игнорируется:

```go
package main

import "fmt"

func main() {
	// это комментарий, программа его не видит
	fmt.Println("А это выведется")
	
	fmt.Println("Код") // комментарий в конце строки тоже работает
}
```

```
А это выведется
Код
```

Комментарии нужны чтобы оставлять заметки себе или другим. Или временно отключать код:

```go
// fmt.Println("Эта строка не выполнится")
fmt.Println("А эта — да")
```

---

## Частые ошибки

### Забыли кавычки

```go
fmt.Println(привет)
```

```
undefined: привет
```

Текст всегда в кавычках: `"привет"`.

### Русские кавычки

```go
fmt.Println(«Привет»)  // неправильно
fmt.Println("Привет")  // правильно
```

Только английские двойные кавычки `"`.

### Опечатка в Println

```go
fmt.Prinln("Привет")   // нет t
fmt.PrintLn("Привет")  // большая L
```

Регистр важен: `Println`, не `PrintLn` и не `Prinln`.

---

## Задачи

### 1. Своё приветствие

Выведите своё имя:

```
Привет, меня зовут [ваше имя]!
```

<details>
<summary>Решение</summary>

```go
package main

import "fmt"

func main() {
	fmt.Println("Привет, меня зовут Вася!")
}
```

</details>

### 2. Несколько строк

Выведите:

```
Строка 1
Строка 2
Строка 3
```

<details>
<summary>Решение</summary>

```go
package main

import "fmt"

func main() {
	fmt.Println("Строка 1")
	fmt.Println("Строка 2")
	fmt.Println("Строка 3")
}
```

</details>

### 3. Всё в одну строку

Выведите `Go это круто` используя три отдельных `Print`:

<details>
<summary>Решение</summary>

```go
package main

import "fmt"

func main() {
	fmt.Print("Go ")
	fmt.Print("это ")
	fmt.Print("круто")
}
```

</details>

### 4. Калькулятор

Выведите результат: `123 + 456 = ???`

Число после `=` должна посчитать программа.

<details>
<summary>Решение</summary>

```go
package main

import "fmt"

func main() {
	fmt.Print("123 + 456 = ")
	fmt.Println(123 + 456)
}
```

Или в одну строку:

```go
fmt.Println("123 + 456 =", 123+456)
```

</details>

### 5. Возраст

Выведите:

```
Мне X лет
Через 10 лет мне будет Y лет
```

Где X — ваш возраст, Y — программа считает сама.

<details>
<summary>Решение</summary>

```go
package main

import "fmt"

func main() {
	fmt.Println("Мне 25 лет")
	fmt.Println("Через 10 лет мне будет", 25+10, "лет")
}
```

</details>

---

## Что дальше

Вы запустили первую программу и поэкспериментировали с выводом. Но что значат `package main`, `import "fmt"`, `func main()`? Разберём в следующем уроке.

---

## Источники

- [A Tour of Go — Hello, World](https://go.dev/tour/welcome/1)
- [Go by Example — Hello World](https://gobyexample.com/hello-world)
- [Package fmt](https://pkg.go.dev/fmt)
