---
title: 学习TypeScript
tags: web前端
abbrlink: 3a1358b6
date: 2023-03-23 17:06:41
---

# TypeScript

### TypeScript 介绍

- [TypeScript 官方文档](https://www.typescriptlang.org/)

- **TypeScript 简称：TS，是 JavaScript 的超集**，简单来说就是：JavaScript 有的 TypeScript 都有

![ts](https://chu-image-host.oss-cn-beijing.aliyuncs.com/typora/ts.png)

TypeScript 实际上就是 **JavaScript(弱类型) + Type (类型)** , 即为 JS 添加类型支持，如图

```typescript
// 为username声明明确的变量类型 字符串类型
let username: string = "John";
```

### TypeScript 为什么要为 JS 添加类型支持

> Javascript 类型系统存在先天缺陷，我们在写代码时经常遇到类型错误（Uncaught TypeError）

![image-20211026153734187](data:image/png;base64,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)

这类错误的出现导致项目开发完成上线之后，要投入大量的精力和时间去测试，找 bug，改 bug，对于开发效率是一种降低。

## 问题

为什么 JS 在开发时不能提前**预知，预防**这些错误呢？

- 因为 Javascript 属于**动态类型**的编程语言，动态类型最大的特点就是它只能在**代码执行期间**做类型的相关检查，所以往往你发现问题的时候，已经晚了。

TS 能提前预防这些错误吗？

- **可以**。 TypeScript 属于**静态类型**的编程语言。也就是代码会先通过**编译**，然后运行，编译不通过的，自然暴露了我们代码中的问题。

## 优势

- 更早的发现错误，减少找 Bug，改 Bug，提升开发效率。
- 程序中随时出现代码提示，随时随地的安全感，增强的开发体验。
- 强大的类型系统提高代码可维护性，重构代码更容易。
- 支持最新的 ECMAScript 语法，优先体验最新的语法，让你走上前端技术最前沿。
- TS 的类型推断机制，不需要在每个地方都标注类型，降低学习负担，除此之外，Vue3 源码使用 TS 重写，Angular 默认支持 TS，React 于 TS 完美配合。

**当下最主流的开发技术栈**

Vue3 + TS

Reack Hooks + TS

# 快速上手

- 安装编译 TS 的工具包
- 编译运行 TS 代码
- 简化运行 TS 的步骤

### 安装编译 TS 的依赖

为什么要安装依赖？

- Nodejs/浏览器 只认识 JavaScript 代码，不识 TS 代码，需要先将 TS 代码转化为 JS 代码，才可以运行。

安装命令

```json
$ npm i -g typescript
```

验证是否安装成功

```json
$ tsc -v
```

> tsc 为关键字

运行流程图

![运行流程图](https://chu-image-host.oss-cn-beijing.aliyuncs.com/typora/%E8%BF%90%E8%A1%8C%E6%B5%81%E7%A8%8B%E5%9B%BE.png)

### 编译运行 ts 代码

1. 创建一个 hello.ts 文件 （TS 的文件的后缀名为.ts）
2. 将 TS 编译为 JS，在终端编译命令 **tsc hello.ts** （此时，同级目录会出现一个同名 JS 文件）
3. 执行 JS 代码，在终端输入命令 **node hello.js**，使用node运行代码

![image-20211027122824443.2014ed6b](https://chu-image-host.oss-cn-beijing.aliyuncs.com/typora/image-20211027122824443.2014ed6b.png)

### 使用 ts-node 简化运行 TS 的步骤

通过上面的描述，我们发现运行 TS 代码需要连续的执行两个命令，有些繁琐，可以使用**`ts-node`**进行简化

安装命令

```typescript
$ npm i -g ts-node
```

**`ts-node`**包提供了 ts-node 命令，相当于前面两个命令的合并， 接下来就可以直接采用 命令执行运行 ts 文件

```typescript
$ ts-node hello.ts
```

OK， 接下来我们就可以愉快的来学习 TypeScript 了

注意： 我们在运行过程中，可能会遇到如图的问题

![ts-node异常](https://chu-image-host.oss-cn-beijing.aliyuncs.com/typora/ts-node%E5%BC%82%E5%B8%B8.png)

这个问题是因为当前的语法中 es6 的配置没有，需要我们用一个命令来进行设置

```typescript
$ tsc --init # 初始化一个配置 此配置会给我们加一个es6的指向，错误就不再有了
```

### 解决两个 ts 文件之间的变量名冲突

问题：在非模块化环境下，TS 会把 .ts 文件中声明的变量当做全局变量

所以，当两个 .ts 文件中声明的变量名称相同，并且在 VSCode 中同时打开这两个文件时，VSCode 会提示报错

虽然，不会影响代码的运行。但看到报错会让人感觉不舒服，所以，只要让 .ts 文件中的代 码变为模块化环境即可

操作方式：**在 .ts 文件中添加 export {}**

解释 1：当 TS 看到 export 这样的模块化语法后，就会将该文件当做模块来解析，此时，再声明的变量就是该模块中的局部变量了

解释 2：export 不需要导出任何内容，该代码的作用仅仅是为了让 TS 知道这是模块化环境

# TypeScript 常用类型

TypeScript 是 JS 的超集，TS 提供了 JS 的所有功能，并且额外的增加了：**类型系统**

**JS 有类型**（比如，number/string 等），但是 **JS 不会检查变量的类型是否发生变化**，而 TS 会检查

TypeScript 类型系统的主要优势：**可以显示标记出代码中的意外行为，从而降低了发生错误的可能性**

## 类型注解

示例代码

```typescript
let age: number = 18;
```

> 说明：代码中`:number`就是类型注解

**类型注解约束了只能给该变量赋值该类型的值**

错误演示

```typescript
// 错误原因：将 string 类型的值赋值给了 number 类型的变量，类型不一致
let age: number = "18";
```

## 常用基础类型

可以将 TS 中的常用基础类型分为两类

1. JavaScript 已有类型

- 原始类型： **number/string/boolean/null/undefined/symbol**
- 对象类型：**object**(数组、对象、函数等)

2. TypeScript 新增类型

- 联合类型、自定义类型（类型别名）、接口、元祖、字面量类型、枚举、void、any 等

> 注意：原始类型在 TS 和 JS 中写法一致， 对象类型在 TS 中更加细化，每个具体对象都有自己的类型语法

### 原始类型

**number/string/boolean/null/undefined/symbol**

> 特点：可完全按照 JavaScript 中的名称来书写

```typescript
let age: number = 18;
let username: string = "张三";
let isMerry: boolean = false;
let unique: symbol = Symbol("shuiruohanyu");

// null 和 undefined类型的值，值能为 null 和 undefined
let nullType: null = null;
let undefinedType: undefined = undefined;
```

### 数组类型

数组两种写法

1. `类型[]`写法， 如

```typescript
let userList: string[] = ["John", "Bob", "Tony"];
let peopleList: object[] = [{ name: "张三", age: 18 }];
```

1. Array<类型>写法， 如

```typescript
let user2List: Array<string> = ["John", "Bob", "Tony"];
let people2List: Array<object> = [{ name: "张三", age: 18 }];
```

### 联合类型

> 组中既有 number 类型，又有 string 类型，这个数组的类型应该如何写?

可以用`|`(竖线)分割多个类型， 如

```typescript
let str: string | number = 1;
str = "张三";
```

如果数组中可以是字符串或者数字，则可以这么写

```typescript
let arr1: Array<number | string> = [1, 2, "张三"];
let arr2: (number | string)[] = [1, 2, "张三"];
```

### 交叉类型

> 既满足a类型也满足b类型

可以用`&`(竖线)分割多个类型，通常是多个对象的交叉， 如

```typescript
interface Ikun {
  name: string;
  age: number;
}
interface Icoder {
  coder: () => void;
}
const info: Ikun & Icoder = {
  name: "why",
  age: 18,
  coder: () => {
    console.log(1);
  },
};
```

### 类型别名

> 当一个复杂类型或者联合类型过多或者被频繁使用时，可以通过类型别名来简化该类型的使用

用法：`type` 名称 = 具体类型

```typescript
type CustomArray = Array<number | string>;
let arr1: CustomArray = [1, 2, "张三"];
```

以上代码中，`type`作为创建自定义类型的关键字

- 类型别名可以使任意合法的变量名称
- 推荐大驼峰的命名写法

### never类型

**目标**：能够知道 TS 中 never 类型的含义

**内容**：一般用于封装框架或工具库时使用

- `never` 类型：永远不会出现的值的类型（或永远不会发生的类型）
- `never ` 类型：处理 TS 类型系统的最底层
  - 可以将 never 类型的数据，赋值给任意其他的类型；无法将任何类型（除了 never 类型自己）来分配给 never 类型
  - 当遇到never类型时，表示此类型不能用，不能通过该类型来解释当下的运行环境，必须指明类型

```tsx
// 函数抛出错误，就会结束函数的指向，函数不会有返回值的，这种函数的返回值就是never类型 (不存在的类型)
let fn1 = () => {
  // 手动通过 throw 抛出一个异常（错误）
  throw new Error("err...");
};
let n = fn1(); // n => never，表示fn1函数的返回值是一个never类型

// fn2函数里面写一个死循环，不可能有返回的，永远没有结果的函数，返回值就是一个never类型的
let fn2 = () => {
  while (true) {}
};
let n = fn2(); // n => never

// const定义一个常量，num值永远等于123，所以不可能进入if判断，n就是never类型
const num = 123;
if (num !== 123) {
  let n = num; // n => never
}

// 封装框架/工具库的时候可以使用一下never
// 其他同时在扩展工具的时候, 对于一些没有处理的case, 可以直接报错，如果只添加了类型，没写case，会报错
function handleMessage(message: string | number | boolean) {
  switch (typeof message) {
    case "string":
      console.log(message.length);
      break;
    case "number":
      console.log(message);
      break;
    case "boolean":
      console.log(Number(message));
      break;
    default:
      const check: never = message;
  }
}
```

### unknown类型

**目标**：能够知道 TS 中的 unknown 类型

**内容**：

- `unknown` 类型是类型安全的 any
- 可以把任何类型的值赋值给 unknown 类型的变量（别的类型可以赋值给unknown类型）
- 注意：不可以把unknown类型的变量 赋值给 任意类型的值 (除去unknown类型),自己可以是任意值，但是不可以给别人；
- 在使用 unknown 类型前，必须先将其设置为一个具体的类型(可以使用`typeof`进行类型校验/缩小)，否则，无法对其进行任何操作

```js
let e: unknown
e = 10
e = 'hello'

let s: string
s = 'hello'

s = e //Type 'unknown' is not assignable to type 'string'.
//解决办法
if (typeof e === 'string') {
  s = e
}
```

### any类型

- 一旦设置为any类型，ts就失去了类型约束的作用
- 任何值可以赋值给any，any也可以赋值给任何值，且原有的类型也会变成any

对比 any 和 unknown 类型：

1. 对于 any 类型来说，TS 不会对其进行类型检查

```tsx
// 可以进行任意操作，没有安全可言
let value: any;
value = true;
value = 1;
value.length;
```

2. unknown 类型

```tsx
let value: unknown;
value = "abc"(
  // 先转化为具体类型再使用
  value as string,
).length;

// 先判断是 string 类型，再使用
if (typeof value === "string") {
  value.length;
}
```

### never类型和unknown类型

- never 处理 TS 类型系统的最底层
  - 无法将任意类型的数据赋值给 never 类型
  - 可以将 never 类型赋值给任意其他类型
  - 理解：never 表示啥也不是，所以，无法给 never 设置任何内容
  - 理解：never 处于最底层，相当于任何类型的子类型，所以，可以赋值给其他任何类型
    - 比如，'a' 字面量就是 string 的子类型 `let s: string = 'a'`
- unknown 处于 TS 类型系统的最顶层
  - 可以将任意类型的数据赋值给 unknown 类型
  - 无法将 unknown 类型赋值给任意其他类型
  - 简单来说：unknown 类型可以接受任意类型，但是无法赋值给其他类型
  - 理解：unknown 表示不确定，不确定就可以表示任意类型，既然可以是任意类型，所以可以接受任意类型的数据
  - 理解：unknown 表示不确定，不确定就可以表示任意类型，既然可以是任意类型，所以就无法赋值给一个特点的类型

```typescript
// 头部 底部 unknown -> ... -> ...-> never
// unknown 可以按照 “万物皆对象” 的方式来理解：“万物皆 unknown”
```

```typescript
let u: unknown;

// 可以将任意类型的数据赋值给 unknown 类型
u = 1;
u = "a";

// 错误演示：不能将 unknown 类型赋值给其它类型的变量
// let a: number = u
```

### 函数类型

> 除了变量，我们常见的类型指定还有针对函数的类型声明

函数类型需要指的是 `函数参数`和`返回值`的类型，这里分为两种写法

- 第一种： 单独指定参数，返回值类型

```typescript
// 单独指定函数返回值和函数参数
function add(num1: number, num2: number): number {
  return num1 + num2;
}

// 指定变量形式的
const add2 = (num1: number, num2: number): number => {
  return num1 + num2;
};
```

- 第二种， 同时指定参数和返回值

```typescript
// 同时指定参数和返回值
type CustomFunc = (num1: number, num2: number) => number;

const add3: CustomFunc = (num1, num2) => {
  return num1 + num2;
};
```

注意： 当函数作为表达式时，可以通过类似箭头函数形式的语法来为函数添加类型，这种形式`只适用于函数表达式`

#### void 类型

当我们的函数定义为没有返回值的类型时，可用关键字`void`表示

```typescript
// 没有返回值的函数
type CustomFunc1 = (num1: string, num2: number) => void;

const combinStr: CustomFunc1 = () => {};
```

如果一个函数没有返回值，此时，在 TS 的类型中，应该使用 `void` 类型

```typescript
// 如果什么都不写 表示add4函数的类型为void
const add4 = () => {};

// 这种写法明确指定返回值为void与上方的类型相同
const add5 = (): void => {};

// 如果指定返回值为undefined  return undefined
const add6 = (): undefined => {
  return undefined;
};
```

#### 函数可选参数

当我们定义函数时，有的参数可传可不传，这种情况下，可以使用 TS 的可选参数来指定类型

比如，在使用数组的`slice`方法时，我们可以直接使用`slice()` 也可以传入参数 `slice(1)` 也可以`slice(1,3)`

```typescript
const slice = (start?: number, end?: number): void => {};
```

`?` 表示该参数或者变量可传可不传

注意：**可选参数只能出现在参数列表的最后**， 即必须参数必须在可选参数之前

#### 调用签名

> 如果我们想描述一个带有属性的函数，我们可以在一个对象类型中写一个调用签名（call signature）

```typescript
interface ICalcFn {
  name: string;
  (num1: number, num2: number): void; // 使用：不是=>
}
function calc(calcFn: ICalcFn) {
  console.log(calcFn.name);
  calcFn(10, 20);
}
```

注意：**在参数列表和返回的类型之间用的是 : 而不是 =>**

#### 构造签名

```typescript
class Person {}
interface IPerson {
  new (): Person; // 前面加上new
}
function factory(fn: IPerson) {
  const f = new fn();
  return f;
}
factory(Person);
```

#### 函数的重载

> 需求： 在TypeScript中，如果我们编写了一个add函数，希望可以对字符串和数字类型进行相加，应该如何编写呢？

- 在TypeScript中，我们可以去编写不同的重载签名（_overload signatures_）来表示函数可以以不同的方式进行调用；

- 一般是编写两个或者以上的重载签名，再去编写一个通用的函数以及实现；

```typescript
// ts中函数的重载写法
// 1、先编写重载签名
function add(arg1: number, arg2: number): number;
function add(arg1: string, arg2: string): string;
// 2、编写通用的函数实现,通用函数不能被调用
function add(arg1: any, arg2: any): any {
  return arg1 + arg2;
}
add(1, 2);
```

#### this的内置工具使用

```typescript
function foo(this: { name: string }, info: { name: string }) {
  console.log(this, info);
}

type FooType = typeof foo;

// 1.ThisParameterType: 获取FooType类型中this的类型
type FooThisType = ThisParameterType<FooType>;

// 2.OmitOmitThisParameter: 删除this参数类型, 剩余的函数类型
type PureFooType = OmitThisParameter<FooType>;

// 3.ThisType: 用于绑定一个上下文的this
interface IState {
  name: string;
  age: number;
}

interface IStore {
  state: IState;
  eating: () => void;
  running: () => void;
}

const store: IStore & ThisType<IState> = {
  state: {
    name: "why",
    age: 18,
  },
  eating: function () {
    console.log(this.name);
  },
  running: function () {
    console.log(this.name);
  },
};

store.eating.call(store.state);
```

### 对象类型

JS 中的对象是由属性和方法组成的，TS 的对象类型是**对象中属性和方法的描述**

> {} 用来指定对象中可以包含那些属性；
>
> 语法：`{属性名：属性值，属性名：属性值}`

```typescript
// 如果有多个属性 可以换行 去掉间隔符号
let person3: {
  name: string;
  sayHello1: Function;
  sayHello2(): void;
  sayHello3: () => void;
} = {
  name: "王五",
  sayHello1() {},
  sayHello2() {},
  sayHello3() {},
};
```

**总结**：

- 可是使用`{}`来描述对象结构
  - { } 里的属性必须有，不能多也不能少
  - 使用`?` 表示可选属性，可写可不写
  - `[propName:string]:any` ,表示任意类型的属性(propName是变量名，可以随便写)
- 属性采用`属性名：类型`形式
- 函数可以采用 `方法名(): 返回值类型` 或者 `函数名: Function`（不指定返回值）的形式

#### 使用类型别名

直接使用`{}`会降低代码可读性，不具有辨识度，更推荐使用类型别名`type`添加对象类型

```typescript
type PersonObj = {
  name: string;
  sayHello(): string;
};

const p1: PersonObj = {
  name: "高大大",
  sayHello() {
    return this.name;
  },
};
```

#### 带有参数的方法的类型

如果对象中的函数带有参数，可以在函数中指定参数类型

```typescript
// 带参数的函数方法
type PersonObj2 = {
  name: string;
  sayHello(start: number): string;
};

const p2: PersonObj2 = {
  name: "高大大",
  sayHello(start) {
    return this.name;
  },
};
```

#### 箭头形式的方法类型

> 语法：(形参:类型,形参:类型,...) => 返回值

```typescript
// 箭头函数形式定义类型
type People = {
  sayHello: (start: number) => string;
};

const p3: People = {
  sayHello() {
    return "";
  },
};
```

#### 对象可选属性

对象中的若干属性，有时也是可选的，此时我们依然可以使用`?`来表示

```typescript
type Config = {
  method?: string;
  url: string;
};

const func = (config: Config) => {};
func({ url: "/a" });
```

### 接口 interface

当一个对象类型被多次使用时，一般使用接口（interface）描述对象的类型，达到复用的目的

- 我们使用`interface`关键字来声明接口
- 接口名称推荐以`I`为开头
- 声明接口之后，直接使用接口名称作为变量的类型

> 接口后不需要分号

```typescript
// 接口：接口后面的分号(;)可以不写、接口也可以使用?定义可选属性
interface IPeople {
  name: string;
  age: number;
  sayHello1(): void;
  sayHello2: () => void;
}

let p: IPeople = {
  name: "老高",
  age: 18,
  sayHello1() {},
  sayHello2() {},
};
```

#### 接口和自定义类型的区别

相同点：都可以给对象指定类型

不同点： 接口只能为**对象**指定类型， 类型别名可以为**任意类型**指定别名

- 推荐用 type 来定义

#### 接口继承

- 如果两个接口之间有相同的属性和方法，可以讲**公共的属性和方法抽离出来，通过继承来实现复用**

比如，这两个接口都有 x、y 两个属性，重复写两次，可以，但很繁琐

```typescript
interface Point2D {
  x: number;
  y: number;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}
```

- 更好的方式

```typescript
interface Point2D { x: number; y: number }
interface Point3D extends {
    z: number
}
```

我们使用`extends`关键字实现了 Point3D 继承了 Point2D 的所有属性的定义， 同时拥有继承的属性和自身自定义的属性

### 元组

> 元组中每个元素都有自己特性的类型，根据索引值获取到的值可以确定对应的类型

语法：[类型，类型...] , 一般不会特别长

当我们想定义一个数组中具体索引位置的类型时，可以使用元祖。

> 原有的数组模式只能宽泛的定义数组中的普遍类型，无法精确到位置

元组是另一种类型的数组，它确切知道包含多少个元素，以及特定索引对应的类型

```typescript
let position: [number, number] = [39.5427, 116.2317];
```

```typescript
// 所用于定义函数的返回值
function useState(initialState: number): [number, (newValue: number) => void] {
  let stateValue = initialState;
  function setValue(newValue: number) {
    stateValue = newValue;
  }
  return [stateValue, setValue];
}
const [count, setCount] = useState(10);
```

### 类型推论

在 TS 中，某些没有明确指出类型的地方，**TS 的类型推论机制会帮助提供类型**

也就是说，由于类型推论的存在，在某些地址类型注解可以省略不写。

- 发生类型推论的常见场景

1. 声明变量并初始化时
2. 决定函数返回值时

```typescript
// 变量creater_name自动被推断为 string
let creater_name = "gaoly";

// 函数返回值的类型被自动推断为 number
function addCount(num1: number, num2: number) {
  return num1 + num2;
}
```

推荐：**能省略类型注解的地方就省略**（~~偷懒~~，充分利用 TS 类型推论的能力，提升开发效率）

技巧：如果不知道类型，可以通过鼠标放在变量名称上，利用 VSCode 的提示来查看类型

### 字面量类型

> 下面的代码类型分别是什么？

```typescript
// 字面量类型
let str1 = "张三";
const str2 = "张三";
```

通过 TS 的类型推导可以得到答案

1. 变量 str1 的变量类型为： string

2. 变量 str2 的变量类型为： '张三'

解释：str1 是一个变量(let)，它的值可以是任意字符串，所以类型为：string

str2 是一个常量(const)，它的值不能变化只能是 '张三'，所以，它的类型为："张三"

此时，"张三" 就是一个**字面量类型**，即某个特殊的字符串也可以作为 TS 中的类型

任意的 JS 字面量（对象，数组，数字）都可以作为类型使用

#### 使用场景和模式

- 使用模式：**字面量类型配合联合类型一起使用**
- 使用场景：用来表示一组明确的可选值列表
- 比如，在贪吃蛇游戏中，游戏的方向的可选值只能是上、下、左、右中的任意一个

```typescript
type Direction = "left" | "right" | "up" | "down";

// 使用自定义类型:
function changeDirection(direction: Direction) {
  console.log(direction);
}

// 调用函数时，会有类型提示：
changeDirection("up");
```

- 解释：参数 direction 的值只能是 up/down/left/right 中的任意一个
- 优势：相比于 string 类型，使用字面量类型更加精确、严谨

### 枚举

- 枚举的功能类似于**字面量类型+联合类型组合**的功能，也可以表示一组明确的可选值
- 枚举：定义一组命名常量。它描述一个值，该值可以是这些命名常量中的一个

```typescript
// 枚举
// 创建枚举
enum Direction2 {
  Up,
  Down,
  Left,
  Right,
}

// 使用枚举类型
function changeDirection2(direction: Direction2) {
  console.log(direction);
}

// 调用函数时，需要应该传入：枚举 Direction 成员的任意一个
// 类似于 JS 中的对象，直接通过 点（.）语法 访问枚举的成员
changeDirection2(Direction2.Up);
```

#### 数字枚举

- 问题：我们把枚举成员作为了函数的实参，它的值是什么呢?
- 解释：通过将鼠标移入 Direction.Up，可以看到枚举成员 Up 的值为 0
- 注意：枚举成员是有值的，<font color='cornflowerblue'>**不赋值时默认为：从 0 开始自增的数值**</font>
- 我们把枚举成员的值为数字的枚举，称为：`数字枚举`
- 当然，也可以给枚举中的成员初始化值

```typescript
// Down -> 11、Left -> 12、Right -> 13
enum Direction {
  Up = 10,
  Down,
  Left,
  Right,
}

enum Direction {
  Up = 2,
  Down = 4,
  Left = 8,
  Right = 16,
}

enum Operation {
  Read = 1 << 0, // << 位移运算，实质是二进制的运算，使用程序员计算器查看结果
  Write = 1 << 1, // 0001 -> 0010  => 结果为2
  foo = 1 << 2, // 0001 -> 0100 => 4
}
```

#### 字符串枚举

- 字符串枚举：枚举成员的值是字符串
- 注意：字符串枚举没有自增长行为，因此，**字符串枚举的每个成员必须有初始值**

```typescript
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}
```

#### 枚举实现原理

- 枚举是 TS 为数不多的非 JavaScript 类型级扩展(不仅仅是类型)的特性之一
- 因为：其他类型仅仅被当做类型，而枚举不仅用作类型，还提供值(枚举成员都是有值的)
- 也就是说，其他的类型会在编译为 JS 代码时自动移除。但是，**枚举类型会被编译为 JS 代码**

```typescript
enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT'
}

// 会被编译为以下 JS 代码：
var Direction;
(function (Direction) {
  Direction['Up'] = 'UP'
  Direction['Down'] = 'DOWN'
  Direction['Left'] = 'LEFT'
  Direction['Right'] = 'RIGHT'
})(Direction || Direction = {})
```

- 说明：枚举与前面讲到的字面量类型+联合类型组合的功能类似，都用来表示一组明确的可选值列表
- 一般情况下，**推荐使用字面量类型+联合类型组合的方式**，因为相比枚举，这种方式更加直观、简洁、高效

### any 类型

- **原则:不推荐使用 any**!这会让 TypeScript 变为 “AnyScript”(失去 TS 类型保护的优势)
- 因为当值的类型为 any 时，可以对该值进行任意操作，并且不会有代码提示

```typescript
let obj: any = { x: 0 };

obj.bar = 100;
obj();
const n: number = obj;
```

- 解释:以上操作都不会有任何类型错误提示，即使可能存在错误
- 尽可能的避免使用 any 类型，除非临时使用 any 来“避免”书写很长、很复杂的类型
- 其他隐式具有 any 类型的情况
  1. 声明变量不提供类型也不提供默认值
  2. 函数参数不加类型
- 注意：因为不推荐使用 any，所以，这两种情况下都应该提供类型

在项目开发中，尽量少用 any 类型

### 类型断言

有时候你会比 TS 更加明确一个值的类型，此时，可以使用类型断言来指定更具体的类型。 比如，

```typescript
// 页面中一个a标签，a标签的id是link，获取这个a标签的dom元素
const aLink = document.getElementById("link");
```

- 注意：该方法返回值的类型是 HTMLElement，该类型只包含所有标签公共的属性或方法，不包含 a 标签特有的 href 等属性
- 因此，这个**类型太宽泛(不具体)**，无法操作 href 等 a 标签特有的属性或方法
- 解决方式：这种情况下就需要**使用类型断言指定更加具体的类型**
- 使用类型断言：

```typescript
const aLink = document.getElementById("link") as HTMLAnchorElement;
```

- 解释:
  1. 使用 `as` 关键字实现类型断言
  2. 关键字 as 后面的类型是一个更加具体的类型（HTMLAnchorElement 是 HTMLElement 的子类型）
  3. 通过类型断言，aLink 的类型变得更加具体，这样就可以访问 a 标签特有的属性或方法了
  4. 类型断言是主观判断，断言开发者主观认为它一定是一种确定的类型 (主观行为，会屏蔽ts的错误提示)
- 另一种断言语法，使用 `<类型>变量` 语法，这种语法形式不常用知道即可:

```typescript
// 该语法，知道即可：在react的jsx中使用会报错
const aLink = <HTMLAnchorElement>document.getElementById("link");
```

### 断言总结

- 类型断言：变量 as 类型 (强制转化类型)

```typescript
type CustomObj1 = {
  name: string;
  age: number;
};
type CustomObj2 = {
  name: string;
  age: number;
  sex: string;
};

// people初始指定为CustomObj1类型，但实际是CustomObj2类型
// 可以使用类型断言，不然这样赋值会报错的
let people: CustomObj1 = {
  name: "kobe",
  age: 42,
  sex: "男",
} as CustomObj2;
```

- 非空断言：变量! (变量后面跟一个感叹号!，表示主观认为变量不为空)
- 常量断言：变量 as const (表示变量是一个常量或者字面量)

### 类型缩小

#### 1、typeof

- 众所周知，JS 中提供了 typeof 操作符，用来在 JS 中获取数据的类型

```typescript
console.log(typeof "hello world"); // .js文件 和 .ts文件里面都会输出：string

let obj = {
  name: "kobe",
  age: 42,
};
console.log(typeof obj); // .js文件 和 .ts文件里面都会输出：object

// 区别：如果使用了ts特有的语法，typeof会根据ts类型上下文推断出对象的具体类型
// typeof使用的时候，需要注意typeof是处于js环境上下文，还是处于ts环境上下文
// typeof定义类型的时候，出现在冒号(:)后面，获取使用type定义变量类型，此时typeof都处于ts环境上下文
// sayHello函数的参数：
// (parameter) info: {
//   name: string;
//   age: number;
// }
function sayHello(info: typeof obj) {}

// info的类型：
// type info = {
//   name: string;
//   age: number;
// }
type info = typeof obj;
```

- 实际上，TS 也提供了 typeof 操作符：可以在类型上下文中引用变量或属性的类型（类型查询）
- 使用场景:根据已有变量的值，获取该值的类型，来简化类型书写

```typescript
let p = { x: 1, y: 2 };
function formatPoint(point: { x: number; y: number }) {}
formatPoint(p);

// 下面a1 和 a2两种定义类型的方式是等价的
type a1 = {
  x: number;
  y: number;
};
// js里面typeof一个对象，返回字符串"object"；
// 使用了ts特有的语法，使用type定义类型，这时候typeof一个对象，返回该对象的具体类型
// type a2 = { x: number, y: number }
type a2 = typeof p;
function formatPoint(point: typeof p) {}

// 字符串类型
let str = "hello world";
type a = typeof str; // 相当于定义：type a = string
```

- 解释:
  1. 使用 `typeof` 操作符来获取变量 p 的类型，结果与第一种（对象字面量形式的类型）相同
  2. typeof 出现在**类型注解的位置（参数名称的冒号后面）所处的环境就在类型上下文**(区别于 JS 代码)
  3. 注意：typeof 只能用来查询变量或属性的类型，无法查询其他形式的类型（比如，函数调用的类型）

#### 2、平等缩小

我们可以使用Switch或者相等的一些运算符来表达相等性（比如=\==, !==, ==, and != ）

```typescript
type Direction = "left" | "right" | "up" | "down";
function switchDirection(direction: Direction) {
  if (direction === "left") {
    console.log("左:", "角色向左移动");
  } else if (direction === "right") {
    console.log("右:", "角色向右移动");
  } else if (direction === "up") {
    console.log("上:", "角色向上移动");
  } else if (direction === "down") {
    console.log("下:", "角色向下移动");
  }
}
```

#### 3、instanceof

```typescript
function printDate(date: string | Date) {
  if (date instanceof Date) {
    console.log(date.getTime());
  } else {
    console.log(date);
  }
}
```

#### 4、in操作符 (索引类型)

```typescript
// 使用索引类型
// 什么时候使用索引类型？当对象中有什么属性，无法提前确定下来，此时，就可以使用索引类型了
type T = {
  // [key in number] 表示索引类型
  // key in number 表示：约束对象的键只能是数值类型
  // key 仅仅是个占位符，可以是任何名称
  [key in number]: Articles
  [key: number]: Articles

  // 如果对象中可以出现任意 string 类型的键，可以这样实现：
  // [key in string]
  // [key: string]
}
```

# TypeScript 高级类型

## TypeScript面向对象

TypeScript作为JavaScript的超集，也是支持使用class关键字的，并且还可以对类的属性和方法等进行静态类型检测

### 类的定义

使用class关键字来定义一个类

**我们可以声明类的属性：在类的内部声明类的属性以及对应的类型**

- 如果类型没有声明，那么它们默认是any的
- 我们也可以给属性设置初始化值
- 在默认的strictPropertyInitialization模式下面我们的属性是必须初始化的，如果没有初始化，那么编译时就会报错
  - 如果我们在strictPropertyInitialization模式下确实不希望给属性初始化，可以使用 `name!: string`语法

```typescript
class Person {
  name!: string;
  age: number;
  constructor(name: string, age: number) {
    this.age = age;
    this.name = name;
  }
}
const p1 = new Person("小储", 18);
```

### 类的继承

我们使用extends关键字来实现继承，子类中使用super来访问父类。

```typescript
class Student extends Person {
  sno: number;
  constructor(name: string, age: number, sno: number) {
    super(name, age);
    this.sno = sno;
  }
  running(): void {
    super.running();
    console.log("student running");
  }
}
```

### 类的成员修饰符

`public` 修饰的是在任何地方可见、公有的属性或方法，默认编写的属性就是public的；
`private` 修饰的是仅在同一类中可见、私有的属性或方法；
`protected` 修饰的是仅在类自身及子类中可见、受保护的属性或方法；

`readonly` 只读属性，外接无法修改

```typescript
class Person {
  age: number;
  private name: string;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  protected running() {
    console.log(this.name + "running");
  }
}
```

### getters/setters

私有属性我们是不能直接访问的，或者某些属性我们想要监听它的获取(getter)和设置(setter)的过程，这个时候我们可以使用存取器，多用于对属性的访问进行拦截操作

```typescript
class Person {
  private _age: number;
  name: string;
  constructor(name: string, age: number) {
    this.name = name;
    this._age = age;
  }
  set age(newVal: number) {
    if (newVal >= 0 && newVal < 200) {
      this._age = newVal;
    }
  }
  get age() {
    return this._age;
  }
}
const p1 = new Person("小储", 100);
p1.age = -1;
console.log(p1.age); // 100
```

### 参数属性

TypeScript 提供了特殊的语法，可以把一个构造函数参数转成一个同名同值的类属性

- 你可以通过在构造函数参数前添加一个可见性修饰符 public private protected 或者 readonly 来创建参数属性，最后这些类属性字段也会得到这些修饰符

> 当类中有多个属性时，可以使用参数属性进行简写

```typescript
class Person {
  constructor(
    public name: string,
    private _age: number,
  ) {}
}
const p1 = new Person("小储", 18);
console.log(p1.name);
```

### 抽象类abstract

- 我们知道，继承是多态使用的前提
  - 所以在定义很多通用的调用接口时, 我们通常会让调用者传入父类，通过多态来实现更加灵活的调用方式（多态：父类引用指向子类对象）
  - 但是，父类本身可能<font color='cornflowerblue'>**并不需要对某些方法进行具体的实现**</font>，所以父类中定义的方法,，我们可以定义为抽象方法
- 什么是 抽象方法? **在TypeScript中没有具体实现的方法(没有方法体)，就是抽象方法**
  - 抽象方法，必须存在于抽象类中
  - 抽象类是使用abstract声明的类
- 抽象类有如下的<font color='red'>**特点**</font>
  - 抽象类是不能被实例的话（也就是不能通过new创建）
  - 抽象方法必须被子类实现

演练：封装一个通用的获取面积的方法

```typescript
abstract class Shape {
  // getArea方法只有声明没有实现体
  // 实现让子类自己实现
  // 可以将getArea方法定义为抽象方法: 在方法的前面加abstract
  // 抽象方法必须出现在抽象类中, 类前面也需要加abstract
  abstract getArea();
}

class Rectangle extends Shape {
  constructor(
    public width: number,
    public height: number,
  ) {
    super();
  }

  getArea() {
    return this.width * this.height;
  }
}

class Circle extends Shape {
  constructor(public radius: number) {
    super();
  }

  getArea() {
    return this.radius ** 2 * Math.PI;
  }
}

class Triangle extends Shape {
  getArea() {
    return 100;
  }
}

// 通用的函数
function calcArea(shape: Shape) {
  return shape.getArea();
}
// const shape1: Shape = new Rectangle(10, 20);将具体的子类赋值给了父类， 父类引用指向子类对象
calcArea(new Rectangle(10, 20));
calcArea(new Circle(5));
calcArea(new Triangle());

// 在Java中会报错: 不允许
calcArea({ getArea: function () {} });

// 抽象类不能被实例化
// calcArea(new Shape())
// calcArea(100)
// calcArea("abc")
```

### 类的作用

1、可以创建类对应的实例对象

2、类本身可以作为这个实例的类型

3、类也可以当做有一个构造签名的函数

### 索引签名

- 定义：有的时候，你不能提前知道一个类型里的所有属性的名字，但是你知道这些值的特征，这种情况，你就可以用一个索引签名 (index signature) 来描述可能的值的类型；

- 一个索引签名的属性类型必须是 string 或者是 number。
  - 虽然 TypeScript 可以同时支持 string 和 number 类型，但数字索引的返回类型一定要是字符索引返回类型的子类型

```typescript
interface ICollection {
  [index: number]: string | number;
  length: number;
}
function logCollection(collection: ICollection) {
  for (let i = 0; i < collection.length; i++) {
    console.log(collection[i]);
  }
}
const tuple: [string, number, number] = ["cr", 18, 1.88];
const arr: string[] = ["aaa", "bbb"];
logCollection(tuple);
console.log(arr);
```

### 接口继承

可以从其他的接口中继承过来属性

1. 减少了相代码的重复编写
2. 如果使用第三库，给我们定义了一些属性，如果我们自定义一个接口，同时你希望自定义接口拥有第三方某一个类型中所有的属性，可以使用继承来完成

> 接口支持多继承，类不支持多继承

```typescript
interface Person {
  name: string;
  age: number;
}
interface Animal {
  running: () => void;
}
interface Student extends Person, Animal {
  son: number;
}
const stu: Student = {
  son: 110,
  name: "cr",
  age: 18,
  running() {},
};
```

### 接口的实现

使用关键字`implements`

```typescript
interface IKun {
  name: string;
  age: number;
  slogan: string;
  playBasketball: () => void;
}

interface IRun {
  running: () => void;
}

const ikun: IKun = {
  name: "why",
  age: 18,
  slogan: "你干嘛!",
  playBasketball: function () {},
};

// 作用: 接口被类实现
class Person implements IKun, IRun {
  name: string;
  age: number;
  slogan: string;
  playBasketball() {}
  running() {}
}

const ikun2 = new Person();
const ikun3 = new Person();
console.log(ikun2.name, ikun2.age, ikun2.slogan);
ikun2.playBasketball();
ikun2.running();
```

### 严格字面量赋值检测

```typescript
interface IPerson {
  name: string;
  age: number;
}

// 1.奇怪的现象一:
// 定义info, 类型是IPerson类型
const obj = {
  name: "why",
  age: 18,

  // 多了一个height属性
  height: 1.88,
};
const info: IPerson = obj; // 不会报错

// 2.奇怪的现象二:
function printPerson(person: IPerson) {}
const kobe = { name: "kobe", age: 30, height: 1.98 };
printPerson(kobe);

// 解释现象
// 第一次创建的对象字面量, 称之为fresh(新鲜的)
// 对于新鲜的字面量, 会进行严格的类型检测. 必须完全满足类型的要求(不能有多余的属性)
const obj2 = {
  name: "why",
  age: 18,
  height: 1.88,
};

const p: IPerson = obj2;
```

![image-20230402155844564](https://chu-image-host.oss-cn-beijing.aliyuncs.com/typora/image-20230402155844564.png)

## TS 中的类型兼容性

**目标**：能够理解 TS 中的类型兼容性

**内容**：

[TS 类型兼容性参考文档](https://www.typescriptlang.org/docs/handbook/type-compatibility.html)

两种类型系统：1. **Structural Type System(结构化类型系统)** 2. Nominal Type System(标明类型系统)

**TS 采用的是结构化类型系统，也叫做 duck typing(鸭子类型)，类型检查关注的是值所具有的形状**

也就是说，在结构类型系统中，如果两个对象具有相同的形状，则认为它们属于同一类型。比如：

```typescript
interface Point {
  x: number;
  y: number;
}
interface Point2D {
  x: number;
  y: number;
}

let p2: Point2D = {
  x: 1,
  y: 2,
};

// 结构类型系统中，如果两个对象具有相同的形状，则认为它们属于同一类型
// 接口Point 和 接口Point2D，具有相同的结构，是可以相互赋值，两者是相互兼容的
// p2是Point2D类型，p是Point类型，将Point2D类型变量赋值给Point类型，这样做没有报错 (不报错，正确的)
let p: Point = p2;
```

**对于对象类型来说**，y 的成员至少与 x 相同，则 x 兼容 y（**成员多的可以赋值给成员少的**，或者说：只要满足必须的类型就行，多了也没事）

```typescript
interface Point2D {
  x: number;
  y: number;
}
interface Point3D {
  x: number;
  y: number;
  z: number;
}

let p3: Point3D = {
  x: 1,
  y: 2,
  z: 3,
};
// 不会报错：对象成员多的可以赋值给成员少的，成员多的类型属性只要满足成员少的类型的属性就ok了
let p2: Point2D = p3;
```

**对于函数类型来说**，类型兼容性比较复杂，需要考虑：1.参数个数、2.返回值类型 等等

1. 参数个数：参数多的兼容参数少的 (或者说，参数少的可以赋值给多的)
   - **在 JS 中省略用不到的函数参数实际上是很常见的，这样的使用方式，促成了 TS 中函数类型之间的兼容性**

```typescript
const arr = ["a", "b", "c"];
// arr.forEach 第一个参数的类型为： (value: string, index: number, array: string[]) => void
arr.forEach(() => {});
arr.forEach((item) => {});
arr.forEach((item, index) => {});

// ---

type F1 = (a: number) => void;
type F2 = (a: number, b: number) => void;

let func1: F1 = () => {};
let func2: F1 = (a: number) => {};
// 报错：不能将类型“(a: number, b: number) => void”分配给类型“F1”
// 参数多的函数类型，不能赋值给参数少的函数类型
let func3: F1 = (a: number, b: number) => {};

// 正确：参数少的函数可以赋值给参数多的函数 (参数多的函数兼容参数少的)
let f1: F1 = (a) => {};
let f2: F2 = f1;
```

2. 返回值类型：只要满足必须的类型要求就行，多了也没事

```typescript
// 这种情况不会报错
// 类型F1明确指出了返回void类型(无返回值的类型)，但是声明函数的时候，是可以返回其它值的
// 原因：f1函数返回了一个number类型的值，返回的值对F1定义的无返回值类型函数没有任何影响，所以不会报错
type F1 = () => void;
const f1: F1 = () => {
  return 123; // 这里返回不会对类型系统造成任何影响，不影响就可以进行兼容处理
};

// 下面这种情况会报错
// 类型F1明确指出了返回string类型，但是f1函数返回的却是number类型，所以就会报错
type F1 = () => string;
// 不能将类型“() => number”分配给类型“F1”，不能将类型“number”分配给类型“string”
const f1: F1 = () => {
  return 123; // 这里返回会对类型系统造成任何影响，造成影响就不可以进行兼容处理
};
```

## 泛型

### 类型参数化

**内容**：

- **泛型（Generics）可以在保证类型安全前提下，让函数等与多种类型一起工作，从而实现复用**，常用于：函数、接口、class 中
- 需求：创建一个 id 函数，传入什么数据就返回该数据本身（也就是说，参数和返回值类型相同）

```typescript
// 比如，该函数传入什么数值，就返回什么数值
function id1(value: number): number {
  return value;
}
function id2(value: string): string {
  return value;
}

// res1 => 10
const res1 = id1(10);
// res2 => 'hello'
const res2 = id2("hello");
```

- 比如，id(10) 调用以上函数就会直接返回 10 本身。但是，该函数只接收数值类型，无法用于其他类型
- 为了能让函数能够接受任意类型的参数，可以将参数类型修改为 any。但是，这样就失去了 TS 的类型保护，类型不安全

```typescript
function id(value: any): any {
  return value;
}
```

- 这时候，就可以使用**泛型**来实现了
- **泛型在保证类型安全(不丢失类型信息)的同时，可以让函数等与多种不同的类型一起工作，灵活可复用**
- 实际上，在 C# 和 Java 等编程语言中，泛型都是用来实现可复用组件功能的主要工具之一

```typescript
// 定义数组的两种方式，下面的这种方式就是使用泛型来定义的数组的
let arr: Array<number | string> = [1, 2, "3", "4"];
```

### 泛型函数

**内容**：

创建泛型函数：

```typescript
// 注意：<Type>泛型是写在函数(value: Type)这个括号的前面的 (而不是之前的理解的写在函数名id后面的)
function id<Type>(value: Type): Type {
  return value;
}

// 也可以仅使用一个字母来作为类型变量的名称
function id<T>(value: T): T {
  return value;
}
// 从箭头函数的定义来看，泛型就是写在函数的()括号前面
const id = <P>(value: P): P => {
  return value;
};
```

解释：

- 语法：在函数名称的后面添加 `<>`（尖括号），**尖括号中添加类型变量**，比如此处的 Type
- **类型变量 Type，是一种特殊类型的变量，它处理类型而不是值**
- **类型变量相当于一个类型容器**，能够捕获用户提供的类型（具体是什么类型由用户调用该函数时指定）
- 因为 Type 是类型，因此可以将其作为函数参数和返回值的类型，表示参数和返回值具有相同的类型
- 类型变量 Type，可以是任意合法的变量名称

调用泛型函数：

```typescript
// 调用上面使用了泛型创建的id函数
// 函数参数和返回值类型都为：number
const num = id<number>(10);

// 函数参数和返回值类型都为：string
const str = id<string>("a");
```

解释：

- 语法：在函数名称的后面添加 `<>`（尖括号），**尖括号中指定具体的类型**，比如，此处的 number
- 当传入类型 number 后，这个类型就会被函数声明时指定的类型变量 Type 捕获到
- 此时，Type 的类型就是 number，所以，函数 id 参数和返回值的类型也都是 number
- 这样，通过泛型就做到了让 id 函数与多种不同的类型一起工作，**实现了复用的同时保证了类型安全**

### 简化泛型函数调用

**内容**：

在调用泛型函数时，**可以省略 <类型> 来简化泛型函数的调用**

```typescript
// 省略 <number>、<string>泛型，直接调用函数，可以进行类型推断出具体类型
let num = id(10);
let str = id('a');
const msg = id('aaa') => // 使用const会推断为'aaa'
```

解释:

- 此时，TS 内部会采用一种叫做**类型参数推断**的机制，来根据传入的实参自动推断出类型变量 Type 的类型
- 比如，传入实参 10，TS 会自动推断出变量 num 的类型 number，并作为 Type 的类型
- 推荐：使用这种简化的方式调用泛型函数，使代码更短，更易于阅读
- 说明：**当编译器无法推断类型或者推断的类型不准确时，就需要显式地传入类型参数**

```typescript
// 数组的一些类型推断
// 直接写一个数组，不指定类型，会通过类型推断，得出数组的具体类型 (其它类型也会有类型推断的)
// let arr1: number[]
let arr1 = [1, 2, 3, 4];

// let arr2: string[]
let arr2 = ["1", "2", "3", "4"];

// let arr3: (string | number)[]
let arr3 = [1, 2, "3", "4"];

let arr = [1, 2, 3];
// 会自动推断出数组forEach方法的item参数的类型；(parameter) item: number
// forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;
arr.forEach((item) => {});

// 泛型函数语法
type CustomFunc = <T, P>(value1: T, value2: P) => T | P;
let fn1: CustomFunc = (a, b) => a;
let fn2: CustomFunc = (a, b) => b;

// let res1: string | number
let res1 = fn1<number, string>(10, "hello");

// 类型推断
// let res2: number[] | {
//   name: string;
//   age: number;
// }
let res2 = fn2([1, 2], { name: "kobe", age: 42 });
```

### 泛型接口

泛型接口：接口也可以配合泛型来使用，以增加其灵活性，增强其复用性

```typescript
interface IdFunc<Type> {
  id: (value: Type) => Type;
  ids(): Type[];
}

let obj: IdFunc<number> = {
  id(value) {
    return value;
  },
  ids() {
    return [1, 3, 5];
  },
};
```

解释：

1. 在接口名称的后面添加 `<类型变量>`，那么，这个接口就变成了泛型接口。
2. 接口的类型变量，对接口中所有其他成员可见，也就是**接口中所有成员都可以使用类型变量**。
3. 使用泛型接口时，**需要显式指定具体的类型**(比如，此处的 IdFunc)。
4. 此时，id 方法的参数和返回值类型都是 number;ids 方法的返回值类型是 number[]。

实际上，JS 中的数组在 TS 中就是一个泛型接口

```typescript
// 数组的forEach方法，使用泛型定义的，如果知道数组的类型，就可以根据类型推断，推断出参数的具体类型
// forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;

const strs = ["a", "b", "c"];
// 鼠标放在 forEach 上查看类型
// (method) Array<string>.forEach(callbackfn: (value: string, index: number, array: string[]) => void, thisArg?: any): void
strs.forEach;

const nums = [1, 3, 5];
// 鼠标放在 forEach 上查看类型
// (method) Array<number>.forEach(callbackfn: (value: number, index: number, array: number[]) => void, thisArg?: any): void
nums.forEach;
```

- 解释:当我们在使用数组时，TS 会根据数组的不同类型，来自动将类型变量设置为相应的类型
- 技巧:可以通过 Ctrl + 鼠标左键(Mac：Command + 鼠标左键)来查看具体的类型信息

### 泛型约束

**目标**：能够知道为什么要为泛型添加约束

**内容**：

有时候我们希望传入的类型有某些共性，但是这些共性可能不是在同一种类型中：

- 比如string和array都是有length的，或者某些对象也是会有length属性的；
- 那么只要是拥有length的属性都可以作为我们的参数类型，那么应该如何操作呢？

比如，以下示例代码中想要获取参数的长度：

- 因为 Type 可以代表任意类型，无法保证一定存在 length 属性，比如 number 类型就没有 length。因此，无法访问 length 属性

```typescript
function id<Type>(value: Type): Type {
  // 注意：此处会报错，类型“Type”上不存在属性“length”
  console.log(value.length);
  return value;
}

id("a");
```

此时，就需要**为泛型添加约束来收缩类型（缩窄类型取值范围）**

添加泛型约束收缩类型，主要有以下两种方式：1.指定更加具体的类型 2.添加约束

首先，我们先来看第一种情况，如何指定更加具体的类型：

比如，将类型修改为 `Type[]`(Type 类型的数组)，因为只要是数组就一定存在 length 属性，因此就可以访问了

```typescript
function id<Type>(value: Type[]): Type[] {
  // 可以正确访问
  console.log(value.length);
  return value;
}
```

### 添加泛型约束

**目标**：能够使用 `extends` 关键字来为泛型函数添加类型约束

**内容**：

```typescript
// 创建一个自定义类型
interface ILength {
  length: number;
}

// Type extends ILength 添加泛型约束
// 解释：表示传入的类型必须满足 ILength 接口的要求才行，也就是得有一个 number 类型的 length 属性
function id<Type extends ILength>(value: Type): Type {
  console.log(value.length);
  return value;
}
```

解释:

- 创建描述约束的接口 ILength，该接口要求提供 length 属性
- 通过 `extends` 关键字来为泛型（类型变量）添加约束
- 该约束表示：**传入的类型必须具有 length 属性**
- 注意：传入的实参（比如，数组/字符串）只要有 length 属性即可，除了length可以有别的属性（类型兼容性)

### 多个类型变量的泛型 (keyof)

**目标**：能够知道泛型可以有多个类型变量

**内容**：

泛型的类型变量可以有多个，并且**类型变量之间还可以约束**(比如，第二个类型变量受第一个类型变量约束) 比如，创建一个函数来获取对象中属性的值：

```typescript
function getProp<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}

let person = { name: "jack", age: 18 };
getProp(person, "name");
```

解释:

1. 添加了第二个类型变量 Key，两个类型变量之间使用 `,` 逗号分隔。
2. **keyof 关键字接收一个对象类型，生成其键名称(可能是字符串或数字)的联合类型**。
3. 本示例中 `keyof person` 实际上获取的是 person 对象所有键的联合类型，也就是：`'name' | 'age'`
4. 类型变量 Key 受 Type 约束，可以理解为：Key 只能是 Type 所有键中的任意一个，或者说只能访问对象中存在的属性

```typescript
// Type extends object 表示：Type 应该是一个对象类型，如果不是 对象 类型，就会报错
// 如果要用到 对象 类型，应该用 object ，而不是 Object
function getProperty<Type extends object, Key extends keyof Type>(
  obj: Type,
  key: Key,
) {
  return obj[key];
}
```

```typescript
// Redux 整个应用，状态的类型
// 目前，Redux 中已经有两个状态：login（登录时的状态）和 profile（我的 - 个人信息）
// RootState => { login: Token; profile: ProfileState; }
type RootState = ReturnType<typeof store.getState>

// 希望，在使用 useInitialState 自定义 hook 的时候，只应该获取到 Redux 中已有的状态，但是，获取哪一个状态时不确定的，只有在调用时才能确定
// 因为 stateName 只能是 Redux 已有状态中的任何一个，所以，stateName 的取值范围：'login' | 'profile'
// 而此处不能直接写死一个联合类型，因为 Redux 中的状态将来是会变化（将来还要继续往 redux 中添加状态）
// 既然不能写死，就得动态获取，也就是 Redux 状态类型 RootState 中有哪些状态，就拿到这些状态的名字即可
// 那也就是要获取到 RootState 对象类型中，所有键的集合：	keyof RootState => 'login' | 'profile'
const useInitialState = (action: () => void, stateName: keyof RootState) {}

// 使用泛型：
// S extends keyof RootState 表示：创建了一个泛型的类型变量叫做：S
// 通过 extends 关键字来给 类型变量S 添加了泛型约束
// 约束：S 的类型应该是 keyof RootState 中的任意一个，也就是：'login' | 'profile'
// const useInitialState = <S extends keyof RootState>(action: () => void, stateName: S) {}
const useInitialState = <StateName extends keyof RootState>(action: () => void, stateName: StateName) {}

// -- 对比以上两种方式的区别 --
// 1 这种方式：在调用该函数时，最终得到的返回值类型：Token | ProfileState 也就是将所有可能出现的情况都列举出来了
const useInitialState = (action: () => void, stateName: keyof RootState) {}

// 2 这种方式：在调用该函数时，最终得到的返回值类型：是某一个状态的类型，这个类型由我们传入的 stateName 类决定
// useInitialState(getUser, 'profile') 返回值类型，就是 profile 这个键对应的类型：ProfileState
// useInitialState(getUser, 'login') 返回值类型，就是 login 这个键对应的类型：Token
const useInitialState = <StateName extends keyof RootState>(action: () => void, stateName: StateName) {}

// ---------------------------------------------------------------------------
// 完整函数
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/types/store';

// 创建 useInitialState 函数（自定义 hook）
const useInitialState = <StateName extends keyof RootState>(
  action: () => void,
  stateName: StateName,
) => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state[stateName]);
  // const state = useSelector<RootState, RootState[StateName]>(
  //   state => state[stateName]
  // )

  useEffect(() => {
    dispatch(action());
  }, [dispatch, action]);

  return state;
}
// ---------------------------------------------------------------------------

// 调用：
useInitialState(getUser, 'login')
useInitialState(getUser, 'profile')

// 原来讲过的泛型基础：
function id<Type>(value: Type): Type {
  return value
}
id<number>(10)
id(10)    // 省略类型不写
```

## 泛型工具类型

泛型工具类型：TS 内置了一些常用的工具类型，来简化 TS 中的一些常见操作

说明：它们都是基于泛型实现的(泛型适用于多种类型，更加通用)，并且是内置的，可以直接在代码中使用。 这些工具类型有很多，主要学习以下几个:

1. `Partial<Type>`
2. `Readonly<Type>`
3. `Pick<Type, Keys>`
4. `Record<Keys, Type>`
5. `Required<Type>`
6. `ReturnType<Type>`
7. `Omit<Type, Keys>`
8. `Parameters<Type>`
9. `NonNullable<Type>`
10. `Exclude<UnionType, ExcludedMembers>`
11. `Extract<Type, Union>`
12. `InstanceType<Type>`
13. `ConstructorParameters<Type>`

- [TS 所有内置的泛型工具类型文档](https://www.typescriptlang.org/docs/handbook/utility-types.html)

### Partial

- Partial 用来构造(创建)一个类型，将 Type 的所有属性都变成为可选属性。

```typescript
type Props = {
  id: string;
  children: number[];
};

type PartialProps = Partial<Props>;
// type PartialProps = {
//     id?: string | undefined;
//     children?: number[] | undefined;
// }
```

- 解释:构造出来的新类型 PartialProps 结构和 Props 相同，但所有属性都变为可选的。

### Readonly

- Readonly 用来构造一个类型，将 Type 的所有属性都设置为 readonly(只读)。

```typescript
type Props = {
  id: string;
  children: number[];
};

type ReadonlyProps = Readonly<Props>;
```

- 解释:构造出来的新类型 ReadonlyProps 结构和 Props 相同，但所有属性都变为只读的。

```typescript
let props: ReadonlyProps = { id: "1", children: [] };
// 错误演示
props.id = "2";
```

- 当我们想重新给 id 属性赋值时，就会报错:无法分配到 "id" ，因为它是只读属性。

### Pick

- Pick&lt;Type, Keys> 从 Type 中选择一组属性来构造新类型。

```typescript
interface Props {
  id: string;
  title: string;
  children: number[];
}

// 从 Props 类型里面选出 id 和 title属性，创建一个新的类型，赋值给 PickProps 类型
type PickProps = Pick<Props, "id" | "title">;
// type PickProps = {
//     title: string;
//     id: string;
// }
```

- 解释:
  1.  Pick 工具类型有两个类型变量：1. 表示选择谁的属性 2. 表示选择哪几个属性。
  2.  其中第二个类型变量，如果只选择一个则只传入该属性名即可，如果有多个使用联合类型即可。
  3.  第二个类型变量传入的属性只能是第一个类型变量中存在的属性。
  4.  构造出来的新类型 PickProps，只有 id 和 title 两个属性类型。

### Record

```typescript
// 使用场景：如果已经知道对象中键的集合，可以直接通过 Record 来快速创建一个对象类型

// Record 内置泛型工具类型，用来创建一个对象类型
// Record 类型的作用：根据 联合类型 来得到一个对象类型。
// 	第一个泛型参数是联合类型，用来指定对象中有什么键
//  第二个泛型参数表示对象中值的类型

// 比如，
type A = Record<"a" | "b", string>; // => { a: string; b: string }

// 该代码的作用：
type PullStatus = "pulling" | "canRelease" | "refreshing" | "complete";
const statusRecord: Record<PullStatus, string> = {
  pulling: "用力拉",
  canRelease: "松开吧",
  refreshing: "玩命加载中...",
  complete: "好啦",
};

// 可以手动创建对象类型，但是，没有 Record 方便
type Obj = {
  pulling: string;
  canRelease: string;
  refreshing: string;
  complete: string;
};
```

### Required

```typescript
// 把传入的类型变为必填状态
interface IPerson {
  name?: string;
  age?: number;
}

// type p = {
//    name: string;
//    age: number;
// }
type p = Required<IPerson>;
```

### ReturnType

```typescript
// 该类型能够获取函数类型 T 的返回值类型
const f1 = () => "hello world";
// type t1 = string
type t1 = ReturnType<typeof f1>;

const f2 = () => ({ name: "kobe", age: 18 });
// type t2 = {
//   name: string;
//   age: number;
// }
type t2 = ReturnType<typeof f2>;
```

### Omit

- `Omit <T, K>`在 T 类型中删除对应 K 属性

```typescript
type IPerson = {
  name: string;
  age?: number;
  address: string;
};

// type p = {
//   name: string;
//   age?: number | undefined;
// }
type p = Omit<IPerson, "address">;

interface Person {
  name: string;
  age: number;
  sex: string;
  favor: Array<string>;
}
// type P = {
//   sex: string;
//   favor: Array<string>;
// }
type P = Omit<Person, "name" | "age">;
```

### Parameters

```typescript
// 返回的是函数类型 fn 的形参元组

function fn1(str: string, num: number, message?: []) {}
// type p1 = [str: string, num: number, message?: [] | undefined]
type p1 = Parameters<typeof fn1>;

type A = { name: string };
type B = { age: number };
type C = Array<{ address: string; favor?: string }>;
const fn2 = (a: A, b: B, c: C) => "hello";
// type p2 = [a: A, b: B, c: C]
type p2 = Parameters<typeof fn2>;
```

### NonNullable

```typescript
// 从T中剔除null和undefined：去除掉联合类型中的 null 和 undefined 类型
// type p = string | number
type p = NonNullable<null | undefined | number | string>;
```

### Exclude

- `Exclude<T, U>` 最常用的还是结合两个联合类型来使用的，我们能通过 `Exclude` 取出 `T` 联合类型在 `U` 联合类型中没有的子类型 --- 从T中排除可分配给U的类型

```typescript
interface Person {
  name: string;
  age: number;
  sex: string;
  address: string;
}
interface Alien {
  name: string;
  age: number;
  favor: string;
}
// keyof Person：就是获取 Person 类型所有 key 集合的联合类型 -> "name" | "age" | "sex" | "address"
// keyof Alien：就是获取 Alien 类型所有 key 集合的联合类型   -> "name" | "age" | "favor"
// type p = "address" | "sex"
type p = Exclude<keyof Person, keyof Alien>;

type T = string | number | string[] | Array<number> | (() => void);
type U = string | number | "red";
// type P = string[] | number[] | (() => void)
type P = Exclude<T, U>;
```

### Extract

- `Extract<T, U>` 和 `Exclude<T, U>` 是相反的，最常用的还是结合两个联合类型来使用的，我们能通过 `Extract` 取出 `T` 联合类型在 `U` 联合类型中所有重复的子类型 --- 从T中提取可分配给U的类型

```typescript
interface Person {
  name: string;
  age: number;
  sex: string;
  address: string;
}
interface Alien {
  name: string;
  age: number;
  favor: string;
}
// keyof Person：就是获取 Person 类型所有 key 集合的联合类型 -> "name" | "age" | "sex" | "address"
// keyof Alien：就是获取 Alien 类型所有 key 集合的联合类型   -> "name" | "age" | "favor"
// type p = "name" | "age"
type p = Extract<keyof Person, keyof Alien>;

type T = string | number | string[] | Array<number> | (() => void);
type U = string | number | "red";
// type P = string | number
type P = Extract<T, U>;
```

### InstanceType

- 获取 class 构造函数的返回类型

```typescript
class Person {
  name: string;
  age: number;
  gender: "man" | "women";
  constructor(name: string, age: number, gender: "man" | "women") {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }
}

// type P = Person
type P = InstanceType<typeof Person>;

// params里面只能有：name age gender这三个属性
const params: P = {
  name: "kobe",
  age: 18,
  gender: "man",
  // favor: 'aa'   // 写这个就会报错
};
```

### ConstructorParameters

```typescript
// 获取构造函数中参数类型 元组 形式
class Person {
  name: string;
  age: number;
  gender: "man" | "women";
  constructor(name: string, age: number, gender: "man" | "women") {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }
}

// type P = [name: string, age: number, gender: "man" | "women"]
type P = ConstructorParameters<typeof Person>;
```

## 映射类型

**内容**：

有的时候，一个类型需要基于另外一个类型，但是你又不想拷贝一份，这个时候可以考虑使用映射类型

- 大部分内置的工具都是通过映射类型来实现的；
- 大多数类型体操的题目也是通过映射类型完成的；

> 说明：映射类型只能使用type定义

映射类型建立在索引签名的语法上：

- 映射类型，就是使用了 PropertyKeys 联合类型的泛型
- 其中 PropertyKeys 多是通过 keyof 创建，然后循环遍历键名创建一个类型；

```typescript
interface Iperson {
  name: string;
  age: number;
}
type MapType<Type> = {
  [property in keyof Type]: Type[property];
  // 本质就是遍历类型所有的key，获取到类型，然后使用
};
// 拷贝一份IPerson
type NewPerson = MapType<Iperson>;
```

![image-20230405151550006](https://chu-image-host.oss-cn-beijing.aliyuncs.com/typora/image-20230405151550006.png)

### 映射修饰符

在使用映射类型时，有两个额外的修饰符可能会用到：

- 一个是 readonly，用于设置属性只读；
- 一个是 ? ，用于设置属性可选；

> **你可以通过前缀 - 或者 + 删除或者添加这些修饰符，如果没有写前缀，相当于使用了 + 前缀。**

解释：

- 默认是`+`，使用了映射修饰符，拷贝出来的类型所有的属性都会添加上对应的修饰符

- 原始类型中可能有？或 readonly，使用了`-`，在拷贝出来的类型中？或 readonly会被去掉

```typescript
type MapPerson<Type> = {
  -readonly [Property in keyof Type]-?: Type[Property];
};

interface IPerson {
  name: string;
  age?: number;
  readonly height: number;
  address?: string;
}

type IPersonRequired = MapPerson<IPerson>;

const p: IPersonRequired = {
  name: "cr",
  age: 18,
  height: 1.88,
  address: "北京市",
};
```

![image-20230405152828428](https://chu-image-host.oss-cn-beijing.aliyuncs.com/typora/image-20230405152828428.png)

# TypeScript知识扩展

## TypeScript模块化

- 我们需要先理解 TypeScript 认为什么是一个模块。
  - JavaScript 规范声明任何没有 export 的 JavaScript 文件都应该被认为是一个脚本，而非一个模块
  - 在一个脚本文件中，变量和类型会被声明在共享的全局作用域，将多个输入文件合并成一个输出文件，或者在 HTML使用多
    个 &lt;script> 标签加载这些文件。

- 如果你有一个文件，现在没有任何 import 或者 export，但是你希望它被作为模块处理，添加这行代码

  ```js
  export {};
  ```

- 这会把文件改成一个没有导出任何内容的模块，这个语法可以生效，无论你的模块目标是什么

## 内置类型声明

- 内置类型声明是typescript自带的、帮助我们内置了JavaScript运行时的一些标准化API的声明文件
  - 包括比如Function、String、Math、Date等内置类型
  - 也包括运行环境中的DOM API，比如Window、Document等；
- TypeScript 使用模式命名这些声明文件lib.[something].d.ts。

![image-20230408114831943](https://chu-image-host.oss-cn-beijing.aliyuncs.com/typora/image-20230408114831943.png)

- 内置类型声明通常在我们安装typescript的环境中会带有的 `npm i typescript -g`

## 内置声明的环境

- 我们可以通过target和lib来决定哪些内置类型声明是可以使用的
  - 例如，startsWith字符串方法只能从称为ECMAScript 6的 JavaScript 版本开始使用；
- 我们可以通过target的编译选项来配置：TypeScript通过lib根据您的target设置更改默认包含的文件来帮助解决此问题
  - https://www.typescriptlang.org/tsconfig#lib

## 外部定义类型声明

### 第三方库

- 外部类型声明通常是我们使用一些库（比如第三方库）时，需要的一些类型声明。
  - 有些库下载完成后就带有类型声明(.d.ts文件)，比如axios
  - 有些库在安装时没有带类型声明，在ts环境下使用，就会报错，此时就需要我们自己编写
- 通常<font color='red'>通过社区的一个公有库DefinitelyTyped存放类型声明文件</font>
  - 该库查找声明安装方式的地址：https://www.typescriptlang.org/dt/search?search=
  - 比如我们安装react的类型声明： `npm i @types/react --save-dev`

### 自定义声明

什么情况下需要自己来定义声明文件呢？

- 我们使用的第三方库是一个纯的JavaScript库，没有对应的声明文件；比如lodash
  - 现在的库基本上都有类型声明文件，不需要我们自己编写

- 我们给自己的代码中声明一些类型，方便在其他地方直接进行使用
  - 例如，在index.html中定义了一些全局变量，想要在别的文件中使用，此时可以使用类型声明

    ```typescript
    // index.html
    <script>
      const whyName = "why";
      const whyAge = 18;
      const whyHeight = 1.88;
    </script>

    // types/why.d.ts 自定义类型声明
    declare const whyName: string; // 注意，此时不能赋值
    declare const whyAge: number;
    declare const whyHeight: number;

    // index.ts 使用
    console.log(whyName, whyAge, whyHeight); // 不声明时，找不到该变量，会报错
    ```

## declare 声明模块

声明模块的语法: `declare module '模块名' {}`

- 在声明模块的内部，我们可以通过 export 导出对应库的类、函数等；

> <font color='red'>开发中，我们引入一些文件，ts不能识别，此时就需要声明一个模块</font>

```typescript
import testImg from "./img/test.png";
```

![](https://chu-image-host.oss-cn-beijing.aliyuncs.com/typora/image-20230409143815592.png)

```typescript
// 声明文件模块
declare module "*.png";
// 说明，如果模块里面内容很多，可以直接用一个{}
declare module xxx别名 {}
```

> 开发中，如果我们引入了cdn相关文件，例如jQuery，我们不能直接使用`$`，此时需要声明命名空间

```typescript
// 声明命名空间
declare namespace $ {
  export function ajax(setting: any): any;
}
```

## 认识tsconfig.json文件

1、tsconfig.json文件有两个作用：

- <font color='orange'>作用一（主要的作用）</font>：让TypeScript Compiler在编译的时候，知道如何去编译TypeScript代码和进行类型检测；
  - 比如是否允许不明确的this选项，是否允许隐式的any类型；
  - 将TypeScript代码编译成什么版本的JavaScript代码；
- <font color='orange'>作用二</font>：让编辑器（比如VSCode）可以按照正确的方式识别TypeScript代码；
  - 对于哪些语法进行提示、类型错误检测等等；

> JavaScript 项目可以使用 jsconfig.json 文件，它的作用与 tsconfig.json 基本相同，只是默认启用了一些 JavaScript 相关的编译选项。

2、tsconfig.json在编译时如何被使用呢?

[官方文档](https://www.typescriptlang.org/tsconfig)

- 在调用 tsc 命令并且没有其它输入文件参数时，编译器将由当前目录开始向父级目录寻找包含 tsconfig 文件的目录。
- 调用 tsc 命令并且没有其他输入文件参数，可以使用 --project （或者只是 -p）的命令行选项来指定包含了 tsconfig.json 的目录；
- 当命令行中指定了输入文件参数， tsconfig.json 文件会被忽略；
- **webpack中使用ts-loader进行打包时，也会自动读取tsconfig文件，根据配置编译TypeScript代码。**

### 3、常见配置

![image-20230409171934119](https://chu-image-host.oss-cn-beijing.aliyuncs.com/typora/image-20230409171934119.png)

![image-20230409171955895](https://chu-image-host.oss-cn-beijing.aliyuncs.com/typora/image-20230409171955895.png)

# TS与React项目

## 创建基于 TS 的 React 项目

**目标**：能够使用 create-react-app 创建基于 TS 的项目

**内容**：

创建基于 TS 的 React 项目命令：`npx create-react-app react-ts --template typescript`

说明：在命令行中，添加 `--template typescript` 表示创建支持 TS 的项目

相比 JS 的 React 项目，目录的变化：

1. 在项目根目录中多了一个文件：`tsconfig.json`（TS 的配置文件）
2. 在 src 目录中，文件的后缀有变化，由原来的 `.js` 变为`.ts`或`.tsx`
   - `.ts` ts 文件的后缀名
   - `.tsx` 是在 TS 中使用 React 组件时的后缀。只要代码中出现 JSX 结构，就得使用该后缀
3. 在 src 目录中，多了`react-app-env.d.ts`文件
   - `.d.ts` 类型声明文件，用来指定类型
   - 注意：不要动 src/react-app-env.d.ts 文件！！！

```typescript
// TS 中的 三斜线指令，作用类似于 import 用于指定对其他类型声明文件的依赖关系

// 此处，通过 types 来声明依赖于 react-scripts 包
// https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html#-reference-types-
/// <reference types="react-scripts" />
```

## tsconfig 的介绍

**目标**：能够知道 tsconfig 的作用

**内容**：

- tsconfig.json 是 TS 项目的配置文件，可以用来指定如何编译 TS 代码等
- 手动创建 tsconfig.json 配置文件的命令：`tsc --init`

- 说明：所有的配置项都可以通过鼠标移入的方式，来查看配置项的解释说明
- [tsconfig 文档链接](https://www.typescriptlang.org/tsconfig)

```json
{
  // 编译选项
  "compilerOptions": {
    // 生成代码的语言版本：将我们写的 TS 代码编译成哪个版本的 JS 代码
    "target": "es5",
    // 指定要包含在编译中的 library
    // https://github.com/microsoft/TypeScript/blob/90e83adb44/lib/lib.dom.iterable.d.ts
    "lib": ["dom", "dom.iterable", "esnext"],
    //outDir 用来指定编译后文件所在的文件
     "outDir":"./dist"
    // 允许 ts 编译器编译 js 文件
    "allowJs": true,
    // 跳过类型声明文件的类型检查
    "skipLibCheck": true,
    // es 模块 互操作，屏蔽 ESModule 和 CommonJS 之间的差异
    "esModuleInterop": true,
    // 允许通过 import x from 'y' 即使模块没有显式指定 default 导出
    "allowSyntheticDefaultImports": true,
    // 开启严格模式
    "strict": true,
    // 对文件名称强制区分大小写
    "forceConsistentCasingInFileNames": true,
    // 为 switch 语句启用错误报告
    "noFallthroughCasesInSwitch": true,
    // 生成代码的模块化标准
    "module": "esnext",
    // 模块解析（查找）策略
    "moduleResolution": "node",
    // 允许导入扩展名为.json的模块
    "resolveJsonModule": true,
    // 是否将没有 import/export 的文件视为旧（全局而非模块化）脚本文件
    "isolatedModules": true,
    // 编译时不生成任何JS文件（只进行类型检查）
    "noEmit": true,
    // 指定将 JSX 编译成什么形式
    "jsx": "react-jsx"
  },
  // 指定允许 ts 处理的目录
    ** 表示任意目录
    *  表示任意文件
  "include": ["src"],
  //"exclude":"./**/*" //有默认值，一般不需要我们自己写
}
```

## 类型声明文件介绍

今天几乎所有的 JavaScript 应用都会引入许多第三方库来完成任务需求。

这些第三方库不管是否是用 TS 编写的，最终都要编译成 JS 代码，才能发布给开发者使用。

我们知道是 TS 提供了类型，才有了代码提示和类型保护等机制。

但在项目开发中使用第三方库时，你会发现它们几乎都有相应的 TS 类型，这些类型是怎么来的呢? `类型声明文件`

- **类型声明文件：用来为已存在的 JS 提供类型信息**

这样在 TS 项目中使用这些库时，就像用 TS 一样，都会有代码提示、类型保护等机制了。

## TS 的两种文件类型

**目标**：能够说出 TS 中的两种文件类型

**内容**：

- TS 中有两种文件类型：1 `.ts` 文件 2 `.d.ts` 文件
- `.ts`文件:
  1. ` 既包含类型信息又包含可执行代码`
  2. 可以被编译为 .js 文件，然后，执行代码
  3. 用途：编写程序代码的地方
- `.d.ts`文件:
  1. `只包含类型信息`的类型声明文件
  2. **不会生成 .js 文件，仅用于提供类型信息，在.d.ts 文件中不允许出现可执行的代码，只用于提供类型**
  3. 用途：为 JS 提供类型信息

**总结**：

- .ts 是 implementation（代码实现文件）
- **.d.ts 是 declaration（类型声明文件）**
- 如果要为 JS 提供类型信息，要使用 `.d.ts` 文件

## 类型声明文件-内置

**目标**：能够知道数组的类型提示是由内置类型声明文件提供的类型

**内容**：

TS 为 JS 运行时可用的所有标准化内置 API 都提供了声明文件

比如，在使用数组时，数组所有方法都会有相应的代码提示以及类型信息：

```typescript
const strs = ["a", "b", "c"];
// 鼠标放在 forEach 上查看类型
// (method) Array<string>.forEach(callbackfn: (value: string, index: number, array: string[]) => void, thisArg?: any): void
strs.forEach;
```

可以通过 Ctrl + 鼠标左键（Mac：Command + 鼠标左键）来查看内置类型声明文件内容

实际上，这就是 TS 提供的内置类型声明文件提供的类型信息

- 比如，查看 forEach 方法的类型声明，在 VSCode 中会自动跳转到 `lib.es5.d.ts` 类型声明文件中
- 当然，像 window、document 等 BOM、DOM API 也都有相应的类型声明（`lib.dom.d.ts`）

## 类型声明文件-第三方库

**目标**：能够安装第三方库的类型声明文件

**内容**：

目前，几乎所有常用的第三方库都有相应的类型声明文件

第三方库的类型声明文件有两种存在形式：1. 库自带类型声明文件 2. 由 DefinitelyTyped 提供

1. 库自带类型声明文件：比如，axios
   - 查看 `node_modules/axios` 目录
   - 解释：这种情况下，正常导入该库，**TS 就会自动加载库自己的类型声明文件**，以提供该库的类型声明
   - VSCode 中如何找到它的类型声明文件？就是在 import 导入包的时候，会读取 axios 的 package.json 中的 types 字段，来加载指定的类型声明文件
2. 由 DefinitelyTyped 提供
   - DefinitelyTyped 是一个 github 仓库，用来提供高质量 TypeScript 类型声明，[DefinitelyTyped 链接](https://github.com/DefinitelyTyped/DefinitelyTyped/)
   - 可以通过 npm/yarn 来下载该仓库提供的 TS 类型声明包，这些包的名称格式为：`@types/*`，比如，@types/react、@types/lodash 等
   - 在实际项目开发时，如果你使用的第三方库没有自带的声明文件，VSCode 会给出明确的提示

```typescript
// 在 VSCode 中，鼠标移上去，查看 'lodash' 前面的提示
import _ from "lodash";
```

- 解释：当安装 `@types/*` 类型声明包后，**TS 也会自动加载该类声明包**，以提供该库的类型声明
- 补充：TS 官方文档提供了一个页面，可以来查询 @types/_ 库，[@types/_ 库](https://www.typescriptlang.org/dt)

## 类型声明文件-自定义

**目标**：能够手动创建一个类型声明文件来提供类型

**内容**：

在项目开发中，有两种常见情况，需要自己手动创建类型声明文件：1. 项目内共享类型 2. 为已有 JS 文件提供类型声明

1. 项目内共享类型
   - 如果多个 .ts 文件中都用到同一个类型，此时可以创建 .d.ts 文件提供该类型，实现类型共享
   - 操作步骤:
     1. 创建 index.d.ts 类型声明文件
     2. 创建需要共享的类型，并使用 export 导出（TS 中的类型也可以使用 import/export 实现模块化功能）
     3. 在需要使用共享类型的 .ts 文件中，通过 import 导入即可（.d.ts 后缀导入时，直接省略）
2. 为已有 JS 文件提供类型声明
   1. 在将 JS 项目迁移到 TS 项目时，为了让已有的 .js 文件有类型声明
   2. 成为库作者，创建库给其他人使用

## 类型声明文件的使用说明

- 说明 1：TS 项目中也可以使用 .js 文件
- 说明 2：在导入 .js 文件时，TS 会自动加载与 .js 同名的 .d.ts 文件，以提供类型声明
  - 比如，在 导入 index.js 时，会自动加载 index.d.ts 类型声明文件
- `declare`关键字：用于类型声明，为其他地方（比如，.js 文件）已存在的变量声明类型，而不是创建一个新的变量
  1. 对于 type、interface 等这些明确就是 TS 类型的（只能在 TS 中使用的)，可以省略 declare 关键字
  2. 对于 let、function 等具有双重含义（在 JS、TS 中都能用），应该使用 declare 关键字，明确指定此处用于类型声明

假设有以下 .js 文件需要在 TS 代码中使用：

```typescript
// utils.js 文件：
let count = 10;
let songName = "痴心绝对";
let position = {
  x: 0,
  y: 0,
};

function add(x, y) {
  return x + y;
}

function changeDirection(direction) {
  console.log(direction);
}

const fomartPoint = (point) => {
  console.log("当前坐标：", point);
};

export { count, songName, position, add, changeDirection, fomartPoint };
```

创建上面 .js 文件的类型声明文件：

```typescript
// utils.d.ts 文件：
declare let count: number;
declare let songName: string;

// position 变量
interface Position {
  x: number;
  y: number;
}
declare let position: Position;

// add 函数
declare function add(x: number, y: number): number;

// changeDirection 函数
type Direction = "left" | "right" | "top" | "bottom";
declare function changeDirection(direction: Direction): void;

// fomartPoint 函数
type FomartPoint = (point: Position) => void;
declare const fomartPoint: FomartPoint;

export {
  count,
  songName,
  position,
  add,
  changeDirection,
  FomartPoint,
  fomartPoint,
};
```

在文件中导入上述 .js 文件，查看是否有类型提示：

```typescript
import {
  count,
  songName,
  position,
  add,
  changeDirection,
  FomartPoint,
  fomartPoint,
} from "./utils";
```

## 类型声明文件的总结

类型声明文件出现目的：为 JS 文件提供类型声明

类型声明文件的后缀：`.d.ts`

类型声明文件中只应该出现类型，不要有任何的实现（区别于 .ts 文件）

使用类型声明文件：只需要关注一种情况，没有自带类型声明文件的第三方库，VSCode 在发现没有类型声明文件时，会给出提示，我们只需要按照提示来安装类型声明文件即可： `yarn add @types/*` 来安装即可。
