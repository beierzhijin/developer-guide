---
title: TypeScript
titleTemplate: 语法
outline: deep
---

# TypeScript

## 为什么学新技术？
新技术的出现必然是解决了旧的技术的某些痛点！
另一方面，日新月异，证明这个行业还有前景，不是一潭死水！
而且也不必焦虑，TS 2014年发布，到现在8年，也没有人人普及，还在不断发展，并不是说你现在不会就迟了！

                                                            ———— to xuwei

## JavaScript

### JavaScript is loosely typed

```javascript
let amount = 10
amount = "Eight"
```

### modules

What type of modules does your project use? ...
- JavaScript modules (import/export)
- CommonJS (require/exports)

### data types

> JavaScript does have `string,` `number`, and `boolean` types, but there is no specific `date` type - instead, dates are of type `object`.

https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#objects

### null

> Notice that the type of a null variable is <strong style="color:green;">**object**</strong> and not null as we would expect. <strong style="color:#c04851;">**This is a bug in JavaScript!**</strong> [This link](https://2ality.com/2013/10/typeof-null.html) gives more details of this bug.

### || 逻辑或

由于 `||` 是一个布尔逻辑运算符，左侧的操作数会被强制转换成布尔值用于求值。任何假值（`0`， `''`， `NaN`， `null`， `undefined`）都不会被返回。这导致如果你使用`0`，`''`或`NaN`作为有效值，就会出现不可预料的后果

```javascript
let count = 0;
let text = "";

let qty = count || 42;
let message = text || "hi!";
console.log(qty);     // 42，而不是 0
console.log(message); // "hi!"，而不是 ""
```

### ?. 可选链（Optional Chaining）
> ES2020语法 https://juejin.cn/post/7021056632406687757

### ?? 空值合并运算符
https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing

空值合并运算符可以避免上述`||`陷阱，当左表达式不为 `null` 或 `undefined` 时，不会对右表达式进行求值，其只在第一个操作数为`null` 或 `undefined` 时（而不是其它假值）返回第二个操作数。

```javascript
let myText = ''; // An empty string (which is also a falsy value)

let notFalsyText = myText || 'Hello world';
console.log(notFalsyText); // Hello world

let preservingFalsy = myText ?? 'Hi neighborhood';
console.log(preservingFalsy); // '' (as myText is neither undefined nor null)
```

## Compare With Ts

### why TS
js的错误在运行时才会被发现，并且这个错误可能会影响后续代码的执行，而TS的错误在编译时就会被发现，这样就可以在开发阶段就发现错误，而不是等到运行时才发现错误，这样就可以及时的修复错误，提高开发效率，有效避免生产环境的bug。

🔱 e.g.

JS中不要求调用函数时传递所有已定义参数，但TS中默认要求参数全部传递，非必选参数用`?`标识[^1]，要注意非必选参数必须在参数列表末尾，<strong style="color:red;">注意以下情形：</strong>

  ```typescript
  
  function add(a: number, b?: number): number {
    return a + b; // Object is possibly 'undefined'.
  }
  
  add(1, undefined)
  
  // 处理
  function add(a: number, b?: number): number {
    return a + (b || 0);
  }
  
  // 推荐处理  nullish coalescing operator 空值合并运算符
  function add(a: number, b?: number): number {
    return a ?? b;
  }
  ```

  [^1]:In JavaScript, there is no type checking process requiring function callers to pass all the defined parameters.

js没有类型约束，当项目庞大起来，这种宽松的类型约束会带来非常多的安全隐患。
- 当我们实现一个核心类库时，如果没有类型约束，那么我们就无法保证调用者传递的参数类型是否正确，要对入参做各种验证，保证代码的健壮性。
- 当我们调用别人的函数，如果对方没有对函数进行类型约束，没有注释，我们只能去看其内部逻辑来明确需要传递什么参数，返回值类型是什么。

---

---


# [TypeScript](https://www.typescriptlang.org/zh/docs/handbook/typescript-in-5-minutes.html#defining-types)

## Start TS Journey

https://learntypescript.dev

> TypeScript brings many benefits when using it to develop apps, including:
> - Sophisticated type checking.
> - Accurate intellisense.
> - Accurate code refactoring.
> - Accurate code navigation.


## VS Code & ESLint

1. vscode上安装了`ESLint`插件，并在项目中或全局安装了`pnpm add -g eslint`包
2. `pnpm init` & `eslint --init`，按提示选择自己想要的配置
3. 一般情况下，你可能需要<strong style="color:green;">重启vscode</strong>才可以使eslint的校验生效


## Q&A

1. TypeScript type checks our code, but when can this type checking process take place?

   <strong style="color:green;">☑</strong> Whilst we write our code

   <strong style="color:green;">☑</strong> During the projects build process

   <strong style="color:red;">☒</strong> At runtime

   > Code editors can use TypeScript to type check our code whilst it is  being written. TypeScripts type checker can be invoked during the build  process. TypeScript doesn’t exist at runtime.

## 类型推断 type inference

TypeScript can automatically infer the type of a variable from the value it is assigned.

### Date

TypeScript has inferred the type to be `Date`. We know from earlier that `Date` is not a type in JavaScript, so this is a TypeScript specific type. TypeScript can infer types that don't exist in JavaScript.

```typescript
// TS会把dateOfBirth类型推断为Date，但是我们知道JS中并没有Date这个类型，Date在JS中是object
let dateOfBirth = new Date(1990, 4, 7);
```

### const 常量

鼠标放在firstName上，TS会提示`Bob`，而不是`string`

```typescript
const firstName = "Bob";
```

TypeScript infers the type of a `string` constant to the value of the constant rather than the wider `string` type. This is because a string constant can only be that value. This is called a **string literal type**.

---

---

## 类型

### 三种基本类型

```ts
// 布尔、数值、字符串
let isDone: boolean = false
let lines: number = 42
let name: string = 'Anders'
```

### any类型 vs unknown类型
> https://www.c-sharpcorner.com/article/typescript-any-vs-unknown https://zhuanlan.zhihu.com/p/104296850 https://www.jianshu.com/p/516fe7cbc9e8

```ts
// 不知道什么类型用 "any" 类型
let notSure: any = 4
notSure = '可以重新赋值，转换为字符串类型'
notSure = false // 亦可，重新赋值为布尔类型
```

### 类型断言[as语法 | <>语法]
> https://blog.csdn.net/s_y_w123/article/details/107633405

### type关键字
> https://juejin.cn/post/7063521133340917773

### Omit辅助类型
> https://zhuanlan.zhihu.com/p/397398407

### const关键字

```ts
// 使用 const 关键字将一个字面量修饰为常量
const count = 9
count = 10 // 常量不能重新被赋值，所以这里会报错
```

### collection类型

```ts
// Typescript 中的 collection 有两种表现形式，一种是有类型的数组，另一种是泛型数组
let list1: number[] = [1, 2, 3]
let list2: Array<number> = [1, 2, 3]
```

### 枚举

```ts
enum Color { Red, Green, Blue }
let c: Color = Color.Green
```

### void

```ts
// void，表明函数没有任何返回值的特殊情况
function bigHorribleAlert(): void {
  alert('我是个烦人的弹出框！')
}
```

## 函数

> 函数是 “一等公民”（ first class citizens ），支持使用 lambda 胖箭头表达式和类型推断

### 普通函数

```ts
// 一般的函数
let f1 = function (i: number): number { return i * i }
// 根据返回值推断函数返回类型
let f2 = function (i: number) { return i * i }
// 胖箭头表达式
let f3 = (i: number): number => { return i * i }
// 根据返回值推断返回类型的胖箭头表达式
let f4 = (i: number) => { return i * i }
// 根据返回值推断返回类型的胖箭头表达式, 省略花括号的同时，可以同时省去 return 关键字
let f5 = (i: number) => i * i
```

## 接口
构建类型有两种语法： [接口和类型](https://www.typescriptlang.org/play?e=83#example/types-vs-interfaces)。 你应该更喜欢 interface。当需要特定功能时使用 type 

```ts
// 接口是结构化的，任何具备接口中声明的全部属性的对象，都与该接口兼容
interface Person {
  name: string
  age?: number  // 使用 "?" 标识，表示该属性是一个非必须属性
  move(): void  // 函数
}
```

### 实现接口的对象

```ts
// 实现 "Person" 接口的对象，当它具备 "name" 属性和 "move" 方法之后可被视为一个 "Person"
let p: Person = {
  name: 'Anders',
  move: () => {}
}
```

### 带可选属性的对象

```ts
let validPerson: Person = {
  name: 'Bobby',
  age: 42, // 可选属性
  move: () => {}
}
```

::: warning
// 由于该对象 "age" 属性的类型不是 "number" ，所以这不是一个 "Person"

```ts
let invalidPerson: Person = {
  name: 'Bobby',
  age: true
}
```

:::

### 接口描述函数

```ts
// 接口同样可以描述一个函数的类型
interface SearchFunc {
  (source: string, subString: string): boolean
}

// 参数名并不重要，参数类型才是最重要的
let mySearch: SearchFunc
mySearch = function (src: string, sub: string) {
  return src.search(sub) !== -1
}
```

## 类

```ts
// 类成员访问权限默认都是公共的 (public)
class Point {
  // 成员属性，x!: number，表示强制解析（告诉typescript编译器，这里一定有值）
  x: number
  // 构造器 - 在构造器中使用 public/private 关键字修饰的变量，会被声明为类的成员属性
  // 下面这个例子中，y 会像 x 一样被声明定义为类成员属性，而不再需要额外代码
  // 声明时，同样支持指定默认值
  constructor(x: number, public y: number = 27) {
    this.x = x
  }
  // 成员函数
  dist() {
    // sqrt 返回数的平方根
    return Math.sqrt(this.y * this.y)
  }
  // 静态成员
  static origin = new Point(0, 0)
}

let p1 = new Point(10, 20)
let p2 = new Point(25) // y 为构造器中指定的默认值：27
console.log(p2.y) // 27
console.log(p2.dist()) // 27
```

### 继承

```ts
// derived classes 派生类
// Constructors for derived classes must contain a 'super' call
class Point3D extends Point {
  constructor(x: number, y: number, public z: number) {
    super(x, y) // 必须显式调用父类的构造器
  }
  // 重写父类中的 dist() 函数
  dist() {
    let d = super.dist()
    return Math.sqrt(d * d + this.z * this.z)
  }
}
```

## 模块

```ts
// "." 符号可以作为子模块的分隔符
module Geometry {
  export class Square {
    constructor(public sideLength: number = 0) { }
    // 面积
    area() {
      return Math.pow(this.sideLength, 2)
    }
  }
}
let s1 = new Geometry.Square(5)

// 为模块创建一个本地别名
import G = Geometry
let s2 = new G.Square(10)
console.log(s2.area()) // 100
```

## 泛型

### 类

```ts
class Tuple<T1, T2> {
  constructor(public item1: T1, public item2: T2) { }
}
```

### 接口

```ts
interface Pair<T> {
  item1: T
  item2: T
}
```

### 函数

```ts
let pairToTuple = function <T>(p: Pair<T>) {
  return new Tuple(p.item1, p.item2)
}
let tuple = pairToTuple({ item1: 'hello', item2: 'world' })
```

## 特殊符号
> https://www.jianshu.com/p/f522f0969956 https://blog.csdn.net/weixin_44682587/article/details/123212514 https://juejin.cn/post/6965786378680401956

### ?: 可选参数

### | 类型分割运算符
> 用于类型之中的或逻辑运算。联合类型：表示类型取值可以为多种类型中的一种

### & 类型合并运算符

### !. 非空断言操作符
> 和?.相反，!.表示对象后面的属性一定不是null或undefined


## 引用定义文件

```ts
<reference path='jquery.d.ts' />
```



