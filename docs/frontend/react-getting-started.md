# 邂逅react

## 认识React

- React 中文文档1(国内社区)：<https://react.docschina.org/>
- React 中文文档2(官方)：<https://zh-hans.reactjs.org>

### React 概述

React 是一个用于`构建(动态显示)用户界面`的 JavaScript 库。

> React 起源于 `Facebook` ,并于 2013 年 5 月开源
>
> React本身只关注界面, 其它如：前后台交互、路由管理、状态管理等都由其扩展插件或其它第三方插件搞定

### React 三个特点

- 1 声明式 ==> 命令式编程 arr.filter(item => item.price>80)
  - 利用JSX 语法来声明描述动态页面， ==数据更新界面自动更新==
  - 我们不用亲自操作DOM, 只需要更新数据, 界面就会自动更新
  - React.createElement() 是命令式
- 2 组件化
  - 将一个较大较复杂的界面拆分成几个可复用的部分封装成多个组件， 再组合使用
  - 组件可以被反复使用
- 3 一次学习，随处编写
  - 不仅可以开发 web 应用（react-dom），还可以开发原生安卓或ios应用（react-native）

### React 开发的网站

- MDN: <https://developer.mozilla.org/zh-CN/>
- 知乎: <https://www.zhihu.com/>
- 阿里云: <https://www.aliyun.com/>
- 美团: <https://bj.meituan.com/>
- 飞猪旅行: <https://www.fliggy.com/?spm=181.11358650.0.0.6718223eLhsSSU>
- ...

### 安装VSCode插件

- ES7+ React
- open in browser

## React基本使用

### 基本使用步骤

1.  引入两个JS文件（ 注意引入顺序 ）

    ```javascript
    <!-- react库, 提供React对象 -->
    <script src="../js/react.development.js"></script>
    <!-- react-dom库, 提供了ReactDOM对象 -->
    <script src="../js/react-dom.development.js"></script>
    ```

2.  在html定义一个根容器标签

    ```html
    <div id="root"></div>
    ```

3.  创建react元素(类似html元素)

    ```js
    // 返回值：React元素
    // 参数1：要创建的React元素名称 =》字符串
    // 参数2：元素的属性  =》对象 {id: 'box'} 没有属性时用 null或者{}
    // 后面参数：该React元素的所有子节点 =》文本或者其他react元素
    const element = React.createElement(
      "h1",
      { title: "你好, React!" },
      "Hello React!",
    );
    //当有多个子元素时，继续调用React.createElement
    ```

4.  渲染 react 元素

    > ReactDOM ==DOM是大写==

    ```js
    // 渲染React元素到页面容器div中
    ReactDOM.render(element, document.getElementById("root"));
    //第一个参数：react元素
    //第二个参数：放置容器元素
    ```

### 特殊属性

- class ==》 className

```js
const element = React.createElement(
  "h1",
  {
    title: "你好, React!",
    className: "active",
  },
  "Hello React!",
);
```

### 再来个复杂点的

```js
const title = "北京疫情";
const content = "北京这段时间疫情还在持续中...";

const vDom = React.createElement(
  "div",
  null,
  React.createElement("h2", { title }, "你关注的北京疫情"),
  React.createElement("p", null, content),
);
ReactDOM.render(vDom, document.getElementById("root2"));
```

### 理解 React 元素

1.  也称`虚拟 DOM` (virtual DOM) 或`虚拟节点`(virtual Node)

2.  它就是一个普通的 JS 对象, 它不是真实 DOM 元素对象

    虚拟 DOM: 属性比较少 ==> `较轻`的对象

    真实 DOM: 属性特别多 ==> `较重`的对象

3.  但它有一些自己的特点

    虚拟 DOM 可以转换为对应的真实 DOM => ReactDOM.render方法将虚拟DOM转换为真实DOM再插入页面

    虚拟 DOM 对象包含了对应的真实 DOM 的关键信息属性

    ​ 标签名 => type: "h1"

    ​ 标签属性 => props: {title: '你好, React!'}

    ​ 子节点 => props: {children: 'Hello React!'}

## JSX

### 基本理解和使用

> `问题`: React.createElement()写起来太复杂了
>
> `解决`: 推荐使用更加简洁的**JSX**
>
> **JSX** 是一种JS 的扩展语法, 用来快速创建 React 元素(虚拟DOM/虚拟节点)
>
> 形式上像HTML标签/任意其它标签, 且标签内部是可以套JS代码的

```jsx
const h1 = <h1 className="active">哈哈哈</h1>;
```

> 浏览器并不认识 JSX 所以需要引入babel将jsx 编译成React.createElement的形式
>
> babel编译 JSX 语法的包为：@babel/preset-react
>
> 运行时编译可以直接使用babel的完整包：babel.js
>
> 线上测试: <https://www.babeljs.cn/>

```html
<!-- 必须引入编译jsx的babel库 -->
<script src="../js/babel.min.js"></script>

<!-- 必须声明type为text/babel, 告诉babel对内部的代码进行jsx的编译 -->
<script type="text/babel">
  // 创建React元素 (也称为虚拟DOM 或 虚拟节点)
  const vDom = (
    <h1 title="你好, React2!" className="active">
      Hello React2!
    </h1>
  );
  // 渲染React元素到页面容器div中
  ReactDOM.render(vDom, document.getElementById("root"));
</script>
```

> 注意:
>
> ​ 必须有结束标签
> ​ 整个只能有一个根标签
> ​ 单标签必须自闭合

### JSX中使用 JS 表达式

- JSX中使用JS表达式的语法：`{js表达式}`
- 作用: `指定动态的属性值和标签体文本`

> 1.  可以是==js的表达式==, 不能是js的语句
> 2.  可以是任意基本类型数据值, 但null、undefined和布尔值没有任何显示
> 3.  可以是一个js数组, 但不能是js对象
>
> - 数组中的每一个元素会被循环遍历，渲染到页面中
>
> 1.  可以是react元素对象
> 2.  style属性值必须是一个包含样式的js对象 <span v-pre>`style={{color:red}}`</span>

```jsx
let title = "I Like You";
const vNode = (
  <div>
    <h3 name={title}>{title.toUpperCase()}</h3>
    <h3>{3}</h3>
    <h3>{null}</h3>
    <h3>{undefined}</h3>
    <h3>{true}</h3>
    <h3>{"true"}</h3>
    <h3>{React.createElement("div", null, "atguigu")}</h3>
    <h3>{[1, "abc", 3]}</h3>
    <h3 title={title} id="name" className="ative" style={{ color: "red" }}></h3>
    {/* <h3>{{a: 1}}</h3> */}
  </div>
);
```

注意：

<font color="red">JSX嵌入变量作为子元素</font>

- 情况一：当变量是Number、String、Array类型时，可以直接显示
- 情况二：当变量是null、undefined、Boolean类型时，内容为空；
  - 如果希望可以显示null、undefined、Boolean，那么需要转成字符串；
  - 转换的方式有很多，比如toString方法、和空字符串拼接，String(变量)等方式；
- 情况三：Object对象类型不能作为子元素（not valid as a React child）

## 条件渲染

### if...else

```js
let vDom;
if (isLoading) {
  vDom = <h2>正在加载中...</h2>;
} else {
  vDom = <div>加载完成啦!</div>;
}
ReactDOM.render(vDom, document.getElementById("root"));
```

### 三元表达式

```js
const vDom = isLoading ? <h2>正在加载中2...</h2> : <div>加载完成啦2!</div>;
ReactDOM.render(vDom, document.getElementById("root"));
```

### &&

```js
const vDom = isLoading && <h2>正在加载中3...</h2>;
ReactDOM.render(vDom, document.getElementById("root"));
// 注意: 只适用于只在一种情况下才有界面的情况
```

> 复习增强:
>
> 整个表达式的值 = 表达式1 && 表达式2
>
> ​ 如果表达式1对应的boolean为true, 结果就为表达式2的值
>
> ​ 如果表达式1对应的boolean为false, 结果就为表达式1的值
>
> 表达式1 || 表达式1
>
> ​ 如果表达式1对应的boolean为true, 结果就是表达式1的值
>
> ​ 如果表达式1对应的boolean为false, 结果就为表达式2的值

## 列表渲染

- react中可以将数组中的元素依次渲染到页面上
- 可以直接往数组中存储react元素
- 推荐使用数组的 map 方法
- 注意：必须给列表项添加唯一的 key 属性, 推荐使用id作为key, 尽量不要用index作为key

> 需求: 根据下面的数组显示列表
>
> const courses = \[
> <span v-pre>{id: 1, name: 'React'},</span>
> <span v-pre>{id: 3, name: 'Vue'},</span>
> <span v-pre>{id: 5, name: '小程序'}</span>
> ]

```jsx
const courses = [
  { id: 1, name: "React" },
  { id: 3, name: "Vue" },
  { id: 5, name: "小程序" },
];

const vDom = (
  <div>
    <h2>前端框架课程列表</h2>
    <ul>
      {courses.map((c) => (
        <li key={c.id}>{c.name}</li>
      ))}
    </ul>
  </div>
);

ReactDOM.render(vDom, document.getElementById("root"));
```

## 样式处理

### 行内样式

- 样式属性名使用小驼峰命名法
- 如果样式是数值，可以省略单位

```js
<h2 style={{ color: "red", fontSize: 30 }}>React style</h2>
```

### 类名

- 必须用className, 不能用class
- 推荐, 效率更高些

```js
<h2 className="title">React class</h2>
```

## 事件处理

### 绑定事件

React 元素的事件处理和 DOM 元素的很相似，但是有一点语法上的不同：

- React 事件的命名采用小驼峰式（camelCase），而不是纯小写。比如：onClick、onFocus 、onMouseEnter
- 使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串

```javascript
const div = <div onClick={事件处理函数}></div>;
```

### 事件对象

React 根据 [W3C 规范](https://www.w3.org/TR/DOM-Level-3-Events/)来自定义的合成事件, 与原生事件不完全相同

- 处理好了浏览器的兼容性问题

- 阻止事件默认行为，不能使用return false, 必须要调用: event.preventDefault()

- 有自己特有的属性, 比如: nativeEvent --原生事件对象

- <input>的change监听在输入过程中触发， 而原生是在失去焦点才触发
  - 原理：内部绑定的是原生input事件

```javascript
function handleClick1(event) {
  console.log(event);
  alert(event.target.innerHTML);
}

const handleClick2 = (event) => {
  const isOdd = Date.now() % 2 === 1;
  alert(isOdd);
  if (!isOdd) {
    // return false // 不起作用
    event.preventDefault();
  }
};

const vDom = (
  <div>
    <button onClick={handleClick1}>点击提示按钮文本</button>
    <br />
    <br />
    <a href="http://www.baidu.com" onClick={handleClick2}>
      奇数才去百度
    </a>
  </div>
);

ReactDOM.render(vDom, document.getElementById("root"));
```

## 案例

- 需求：实现评论列表功能
  - 如果有评论数据，就展示列表结构 li（ 列表渲染 ）要包含a标签
    - name 表示评论人，渲染 h3
    - content 表示评论内容，渲染 p
  - 如果没有评论数据，就展示一个 h1 标签，内容为： 暂无评论！
  - 用户名的字体25px, 内容的字体20px
  - 点击内容区域提示它发表的时间

```js
const list = [
  { id: 1, name: "jack", content: "rose, you jump i jump", time: "03:21" },
  {
    id: 2,
    name: "rose",
    content: "jack, you see you, one day day",
    time: "03:22",
  },
  { id: 3, name: "tom", content: "jack,。。。。。", time: "03:23" },
];
```

## React的组件

组件允许你将 UI 拆分为独立可复用的代码片段，包括JS/CSS/IMG等。

组件从概念上类似于 JavaScript 函数。它接收参数（即 “**props**”），内部可以有自己的数据（即 “**state**”），并返回用于描述页面展示的 React 元素。

**一个React应用就是由一个个的React组件组成的**

## 快速创建React项目

### react脚手架使用

> 问题: JSX 转 JS 和 ES6 转 ES5 语法运行时编译太慢了
> 解决: 利用 Webpack 进行打包处理
>
> 问题: webpack打包环境搭建太麻烦, 且没有质量保证, 效率低
> 解决: 使用官方提供的`脚手架`工具
> 搭建好了webpack打包环境
> 项目的目录结构

### 创建React项目

使用 create-react-app:

1.  下载 npm i create-react-app -g
2.  创建项目命令: `create-react-app 项目名称`

> 用yarn创建react脚手架
>
> `yarn create react-app 项目名称`

也可以利用 npx 来下载 create-react-app 并创建项目

命令: `npx create-react-app 项目名称`

npx 做的事情:

1.  先全局下载 create-react-app
2.  执行 create-react-app 命令, 创建 react 项目
3.  自动将 create-react-app 从全局中删除掉

### 从V18降级到V17的版本

最新的脚手架默认使用的是最新的 React18 的版本, 而这个版本是最近才出稳定版, 企业项目还未开始使用

如何降级到V17的最新版呢?

1.  重新下载 react 和 react-dom, 并指定17的版本

    ```shell
    npm i react@17 react-dom@17
    ```

2.  修改入口JS的实现

    ```js
    import React from "react";
    import ReactDOM from "react-dom";

    import App from "./App";

    ReactDOM.render(<App />, document.getElementById("root"));
    ```

### 安装chrome调试工具

> 问题: 一旦开始进行组件化的应用开发, 我们需要查看应用中组件组成和各个组件的相关数据(props/state)
>
> 解决: 使用React的chrome调试工具, `React Developer Tools`

- 方式一: chrome应用商品搜索 `React`, 下载安装`React Developer Tools`
- 问题: 需要使用翻墙工具
- 方式二: 使用本地的安装包
  - 进入**扩展程序列表**
  - 打开 **开发者模式**
  - 将**安装包的文件夹**拖入扩展程序列表界面, 直接安装
- 测试
  - 访问react项目, 插件图标会亮
  - 多了调试选项: Components

## 创建组件的两种方式

### 函数组件

```javascript
function App() {
  // return null
  return <div>App</div>;
}

// 函数名就是组件名
ReactDom.render(<App />, document.getElementById("root"));
```

> 1.  组件名首字母必须大写. 因为react以此来区分组件元素/标签 和 一般元素/标签
> 2.  组件内部如果有多个标签,必须使用一个根标签包裹.只能有一个根标签
> 3.  必须有返回值.返回的内容就是组件呈现的结构, 如果返回值为 null，表示不渲染任何内容
> 4.  会在组件标签渲染时调用, 但不会产生实例对象, 不能有状态

> 注意: 后面我们会讲如何在函数组件中定义状态 ==> hooks语法

### 类组件

```javascript
import React from "react";

class App extends React.Component {
  render() {
    return <div>App Component</div>;
  }
}

ReactDom.render(<App />, document.getElementById("root"));
```

> 1.  组件名首字母必须大写.
> 2.  组件内部如果有多个标签,必须使用一个根标签包裹.只能有一个根标签
> 3.  类组件应该继承 React.Component 父类，从而可以使用父类中提供的方法或属性
> 4.  类组件中必须要声明一个render函数, reander返回组件代表组件界面的虚拟DOM元素
> 5.  会在组件标签渲染时调用, 产生实例对象, 可以有状态

## 类组件的状态 state

函数组件又叫做无状态组件(不产生实例)，类组件又叫做有状态组件(有实例)

状态（state）即数据

函数组件没有state, 只能根据外部传入的数据（props）动态渲染

类组件有自己的state数据，**一旦更新state数据， 界面就会自动更新**

### state的基本使用

- 状态（state）即数据，是组件内部的私有数据，只能在组件内部使用
- 组件对象的state属性
  - 属性值为对象, 可以在state对象中保存多个数据

  - 初始化state
    - 构造器中: this.state = {xxx: 2}

    - 类体中: `state = {}`

  - 读取state数据
    - `this.state.xxx`

  - 更新state数据
    - 不能直接更新state数据
    - 必须 this.setState({ 要修改的属性数据 })

> 类组件什么时候写constructor(){} ?
>
> - 子类继承父类时，有父类没有的属性需要写构造器，写了构造器，就必须在最开始写super
> - 初始化状态，(直接定义状态即可)
> - 为事件处理函数绑定实例 ，解决this丢失的问题 (使用赋值语句，加箭头函数的形式)
>
> 如果不在类的实例身上使用this.props时，写类组件都可以不写构造器 !!!

```javascript
class StateTest extends React.Component {
  /* constructor () {
    super() // 必须调用super()
    // 初始化state
    this.state = {
      count: 0,
      xxx: 'abc'
    }
  } */
  // 初始化状态(简洁语法)
  state = {
    count: 0,
    xxx: "abc",
  };

  render() {
    // 读取state数据
    const { count } = this.state;

    return (
      <div
        onClick={() => {
          // 直接更新状态数据 => 界面不会自动更新  不可用
          // this.state.count = count + 1

          // 通过setState()更新state => 界面会自动更新
          this.setState({
            count: count + 1,
          });
        }}
      >
        点击的次数: {count}
      </div>
    );
  }
}
```

### 事件回调this问题

为了提高代码的性能和阅读性,最好把事件处理函数定义在结构的外面.

但是这样就带来了this指向的问题:

> 问题: 类中定义的事件回调方法中this是undefined, 无法更新state
>
> 原因: 事件回调都不是组件对象调用的, 都是事件触发后,直接调用的,
> class中所有方法都使用严格模式, 所以方法中的this就是undefined

- 基础代码：组件的虚拟DOM

  ```jsx
  <div>
    <h3>当前count为: 0</h3>
    <button>点击报错, 有this问题</button>
    <br />
    <button>解决办法1 - 包裹箭头函数</button>
    <br />
    <button>解决办法2 - bind绑定this </button>
    <br />
    <button>解决办法3 - 箭头函数</button>
  </div>
  ```

> 解决办法1 - 包裹箭头函数(常用)
> 原因: render中的this是组件对象, 处理函数是我们通过组件对象来调用的
>
> 解决办法2 - bind绑定this
> 原因: 构造器中的this是组件对象, 将处理函数通过bind绑定为了组件对象
>
> 解决办法3 - 箭头函数
> 原理: 利用bind给事件回调绑定this为组件对象(render中的this)(常用)

```javascript
class EventThis extends React.Component {
  constructor() {
    // 构造器中的this是组件对象
    super();
    /* 
    this.handle4 = () =>  {
      console.log(this)
      this.setState({
        count: this.state.count + 3
      })
    } */
  }

  // 初始化state
  state = { count: 0 };

  /* 
  问题: 类中定义的事件回调方法中this是undefined, 无法更新state
  原因: babel编译jsx. 采用的是严格模式, 事件监听函数中this就指向undefined
  */
  handle1() {
    console.log(this); // this是undefined
    this.setState({
      // 报错
      count: this.state.count + 1,
    });
  }

  handle2() {
    console.log(this);
    this.setState({
      count: this.state.count + 2,
    });
  }

  handle3() {
    console.log(this);
    this.setState({
      count: this.state.count + 3,
    });
  }

  /* 
  解决办法3 - 箭头函数
  原因: 改为箭头函数后, 变为了给组件对象添加属性, 且是在构造器中执行的, 用的就是构造函数中的this
  */
  handle4 = () => {
    console.log(this);
    this.setState({
      count: this.state.count + 3,
    });
  };

  render() {
    // render中的this是组件对象
    console.log("render()", this.state.count);

    return (
      <div>
        <h3>当前count为: {this.state.count}</h3>
        <button onClick={this.handle1}>点击报错, 有this问题</button>
        {/* 
        解决办法1 - 包裹箭头函数
        原因: render中的this是组件对象, 处理函数是我们通过组件对象来调用的
        */}
        <button
          onClick={() => {
            this.handle2();
          }}
        >
          解决办法1 - 包裹箭头函数
        </button>
        <button onClick={this.handle3.bind(this)}>
          解决办法2 - bind绑定this{" "}
        </button>
        <button onClick={this.handle4}>解决办法3 - 箭头函数</button>
      </div>
    );
  }
}
```

> ==选择:==
>
> 1.  一般用`箭头函数`方式, 编码简洁
> 2.  如果要传递特定的数据, 一般选择用 `包裹箭头函数`方式

### 参数传递

情况一：获取event对象

- 很多时候我们需要拿到event对象来做一些事情（比如阻止默认行为）
- 那么默认情况下，event对象有被直接传入，函数就可以获取到event对象；

情况二：获取更多参数

有更多参数时，我们最好的方式就是<font color="red">传入一个箭头函数，主动执行的事件函数，并且传入相关的其他参数</font>

```jsx
  <script type="text/babel">
    const root = ReactDOM.createRoot(document.querySelector('#root'))

    class App extends React.Component {
      constructor() {
        super()
        this.state = {
          message: 'hello world',
          count: 100
        }
      }

      // 组件方法(实例方法)
      increment(e, name, age) {
        console.log(e);
        console.log(name, 'name');
        console.log(age, 'age');
      }

      render() {

        const { message, count } = this.state

        return (
          <div>
            <h2>{message}</h2>
            <h3>当前计数为：{count}</h3>
            {/*  event传参 */}
            <button onClick={this.increment.bind(this)}>按钮1</button>
            <button onClick={(event) => this.increment(event)}>按钮2</button>

            {/*  额外参数的传参 */}
            {/*  参数 name age 会被覆盖，因为事件对象 会出现错位，不推荐使用 */}
            <button onClick={this.increment.bind(this, 'kobe', '20')}>按钮3</button>
            <button onClick={(event) => this.increment(event, 'kobe', 40)}>按钮4</button>
          </div>
        )
      }
    }

    root.render(<App />)
  </script>
```

### render函数渲染时机

> This.props和this.state改变时

返回值：

React 元素：通常通过 JSX 创建。例如，&lt;div /> 会被 React 渲染为 DOM 节点，&lt;MyComponent /> 会被 React 渲染为自定义组件；无论是 &lt;div /> 还是 &lt;MyComponent /> 均为 React 元素。

数组或 fragments：使得 render 方法可以返回多个元素。

Portals：可以渲染子节点到不同的 DOM 子树中。字符串或数值类型：它们在 DOM 中会被渲染为文本节点布尔类型或 null：什么都不渲染。

## 组件的props

### 使用

组件是封闭的，要接收外部数据应该通过 props 来实现

props的作用：父组件向子组件传递数据

父向子传入数据：给组件标签添加属性

子读取父传入的数据：函数组件通过参数props接收数据，类组件通过 this.props 接收数据

**props的特点**

1.  可以给组件传递任意类型的数据
2.  props 是只读的对象，只能读取属性的值，不要修改props
3.  可以通过...运算符来将对象的多个属性分别传入子组件
4.  如果父组件传入的是动态的state数据, 那一旦父组件更新state数据, 子组件也会更新

- 子组件

  ```js
  // 函数组件
  export function FunProps(props) {
    return (
      <h2>
        FunProps-个人信息: 姓名: {props.name}, 年龄: {props.age}
      </h2>
    );
  }

  // 类组件
  export class ClassProps extends React.Component {
    render() {
      const { myName, age } = this.props;
      return (
        <h2>
          ClassProps-个人信息: 姓名: {myName}, 年龄: {age}
        </h2>
      );
    }
  }
  ```

- 父组件

  ```js
  class App extends React.Component {
    state = {
      person: {
        myName: "tom",
        age: 12,
      },
    };

    render() {
      const { myName, age } = this.state.person;
      return (
        <div>
          <p>人员信息: {myName + " : " + age}</p>
          <button
            onClick={() => {
              this.setState({
                person: { myName: myName + "--", age: age + 1 },
              });
            }}
          >
            更新人员信息
          </button>
          <br />

          <FunProps name={myName} age={age} />
          <hr />
          {/* <ClassProps myName={myName} age={age}/> */}
          <ClassProps {...this.state.person} />
        </div>
      );
    }
  }
  ```

### props校验与默认值

- props检验
  - 对于组件来说，props 是外来的，无法保证组件使用者传入什么格式的数据
  - 如果传入的数据格式不对，可能会导致组件内部报错
  - 关键问题：组件的使用者不知道明确的错误原因
  - 允许在创建组件的时候，就指定 props 的类型、格式等
  - 作用：捕获使用组件时因为props导致的错误，给出明确的错误提示，增加组件的健壮性
- props默认值
  - 给 props 设置默认值，在未传入 props 时生效

> props校验: 检查接收的prop的类型和必要性
> props默认值: 如果prop没有传入, 指定默认值是多少

> 需求:
>
> ​ name/myName属性: 字符串类型, 必须的
> ​ age属性: 数值类型, 不是必须的, 默认值为0

**实现方式:**

1.  导入 prop-types 包
2.  使用propTypes来给组件的props添加校验规则

组件属性传递参数，传递的都是字符串！如果想传数字用{} 包裹

静态成员==只能通过类来调用，不能在类的实例上调用；==

```javascript
import PropTypes from 'prop-types' // 引入属性检查的包

/* 函数组件函数体外 */
// 指定prop的类型和必要性
FunPropsCheck.propTypes = {
  myName: PropTypes.string.isRequired,
  age: PropTypes.number,
}

// 指定prop的默认值
FunPropsCheck.defaultProps = {
  age: 0
}

/* 类组件的类体中 */
// 指定prop的类型和必要性
static propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number,
}

// 指定prop的默认值
static defaultProps = {
  age: 0
}
```

案例：

```tsx
import React, { Component } from "react";
import PropTypes from "prop-types";
import "../../style/style.css";

export class MainBannerList extends Component {
  // 如果没有自己维护的数据，可以不写constructor
  // constructor(props) {
  //   super(props);
  // }

  // es2022以后的写法
  // static propTypes = {
  //   bannerList: PropTypes.array.isRequired,
  //   title: PropTypes.string,
  // };
  // static defaultProps = {
  //   title: "默认标题",
  //   bannerList: [],
  // };
  render() {
    const { bannerList, title } = this.props;
    return (
      <div className="banner">
        标题:{title}
        <ul>
          {bannerList.map((item, index) => {
            return <li key={index}>{item.title}</li>;
          })}
        </ul>
      </div>
    );
  }
}

MainBannerList.propTypes = {
  bannerList: PropTypes.array.isRequired,
  title: PropTypes.string,
};

MainBannerList.defaultProps = {
  title: "默认标题",
  bannerList: [],
};

export default MainBannerList;
```

## 插槽

### 基本插槽

React对于这种需要插槽的情况非常灵活，有两种方案可以实现

- 组件的children子元素
  - <font color="red">如果只传一个，则children接收的就是该元素，如果传递多个，则children接收的是一个数组</font>
- props属性传递React元素

方式一：

```tsx
import React, { Component } from "react";
import NavBar from "./NavBar";

export class App extends Component {
  render() {
    return (
      <div>
        <NavBar>
          <button>按钮</button>
          <h2>标题</h2>
          <i>斜体文字</i>
        </NavBar>
      </div>
    );
  }
}

export default App;

// 子组件
import React, { Component } from "react";
import "./style.css";

export class NavBar extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className="nav-bar">
        <div className="left">{children[0]}</div>
        <div className="center">{children[1]}</div>
        <div className="right">{children[2]}</div>
      </div>
    );
  }
}

NavBar.propTypes = {
  // children: PropTypes.array.isRequired,// 限制必须传多个
  children: PropTypes.element, // 限制必须传一个
};

export default NavBar;
```

方法二：

```tsx
import React, { Component } from "react";
import NavBar2 from "./NavBar2";

export class App extends Component {
  render() {
    return (
      <div>
        {/* 使用props */}
        <NavBar2
          leftSlot={<button>按钮2</button>}
          centerSlot={<h2>标题2</h2>}
          rightSlot={<i>斜体文字2</i>}
        />
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";

export class NavBar2 extends Component {
  render() {
    const { leftSlot, centerSlot, rightSlot } = this.props;
    return (
      <div className="nav-bar">
        <div className="left">{leftSlot}</div>
        <div className="center">{centerSlot}</div>
        <div className="right">{rightSlot}</div>
      </div>
    );
  }
}

export default NavBar2;
```

### 作用域插槽

定义：标签由父组件决定，数据有子组件渲染

```tsx
import React, { Component } from "react";
import TabControl from "./TabControl";

export class App extends Component {
  constructor() {
    super();
    this.state = {
      titles: ["流行", "新款", "精选"],
      tabIndex: 0,
    };
  }

  tabClick(tabIndex) {
    this.setState({
      tabIndex,
    });
  }

  getItemType(item) {
    if (item === "流行") {
      return <button>{item}</button>;
    } else if (item === "新款") {
      return <h2>{item}</h2>;
    } else {
      return <i>{item}</i>;
    }
  }
  render() {
    const { titles, tabIndex } = this.state;
    return (
      <div>
        <TabControl
          titles={titles}
          tabClick={(index) => {
            this.tabClick(index);
          }}
          tabType={(item) => this.getItemType(item)}
        />
        <h1>{titles[tabIndex]}</h1>
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import "./style.css";

export class TabControl extends Component {
  constructor() {
    super();
    this.state = {
      currentIndex: 0,
    };
  }

  itemClick(index) {
    this.setState({
      currentIndex: index,
    });
    this.props.tabClick(index);
  }

  render() {
    const { titles, tabType } = this.props;
    const { currentIndex } = this.state;

    return (
      <div className="tab-control">
        {titles.map((item, index) => {
          return (
            <div
              key={index}
              className={`item ${currentIndex === index ? "active" : ""}`}
              onClick={() => {
                this.itemClick(index);
              }}
            >
              {/* <span className="text">{item}</span> */}
              {tabType(item)}
            </div>
          );
        })}
      </div>
    );
  }
}

export default TabControl;
```

## 类组件的ref

### 理解

组件内的标签可以定义ref属性来标识自己；

注意：官方提示，==请勿过度使用ref== ，

- 有时可以省略ref：发生事件的事件源，和你要操作的元素是同一个，就可以省略
  - 可以用`event.target`代替

### 编码

- 字符串形式的ref (尽量不要使用，以后可能会被废弃)

  ```tsx
  <input ref="input1" type="text" />
  ```

- 回调形式的ref (推荐使用)

  ```tsx
  <input ref={(c) => (this.input2 = c)} type="text" />
  ```

  - 存在的问题：
    - 在调用时会调用两次，第一次是null，第二次才是真正的执行回调
    - 但是官网都说了，这是无关紧要的；

- createRef创建ref容器 (繁琐，不太推荐)

  ```tsx
  myRef = React.createRef()
  <input ref={this.myRef} type="text" />

  constructor() {
    super();
    this.h2Ref = createRef();
  }
  // 获取
  this.h2Ref.current
  ```

案例

```jsx
import React, { PureComponent, createRef, forwardRef } from "react";

// 函数式组件
const Home = forwardRef((props, ref) => {
  return (
    <div>
      <h1 ref={ref}>我是home组件</h1>
    </div>
  );
});

class HelloWorld extends PureComponent {
  test() {
    console.log("----------");
  }
  render() {
    return <h1>hello world</h1>;
  }
}

export default class App extends PureComponent {
  constructor() {
    super();
    this.h2Ref = createRef();
    this.hwRef = createRef();
    this.homeRef = createRef();
    this.titleEl = null;
  }
  getNativeDOM() {
    // 使用 refs 获取元素（即将被废弃）
    // console.log(this.refs.h2Ref);

    // 使用 createRef 获取元素
    // console.log(this.h2Ref.current);

    // 使用回调函数获取元素
    // console.log(this.titleEl);

    // 使用 ref 获取组件
    // this.hwRef.current.test();

    // 获取函数式组件中的某个DOM元素
    console.log(this.homeRef.current);
  }
  render() {
    return (
      <div>
        App
        <h2 ref="h2Ref">hello world</h2>
        <h2 ref={this.h2Ref}>你好，储锐</h2>
        <h2 ref={(e) => (this.titleEl = e)}>hello Mr.储</h2>
        {/* 获取组件 */}
        <HelloWorld ref={this.hwRef} />
        <Home ref={this.homeRef} />
        <button
          onClick={() => {
            this.getNativeDOM();
          }}
        >
          获取原生DOM
        </button>
      </div>
    );
  }
}
```

> 注意：
>
> 函数式组件是没有实例的，所以无法通过ref获取他们的实例：
>
> - 但是某些时候，我们可能想要获取函数式组件中的某个DOM元素；
> - 这个时候我们可以通过 `forwardRef` ，将函数组件身上的ref绑定到其组件内部的某个DOM元素上

### 事件处理

- 通过`onXxx`属性指定事件处理函数(注意大小写)
  - React使用的是自定义(合成)事件, 而不是使用的原生DOM事件 -- 为了更好的兼容性
  - React中的事件是通过**事件委托方式**处理的(委托给组件最外层的元素) -- 高效
- 通过event.target得到发生事件的DOM元素对象 -- 不要过度使用ref

## 类组件的生命周期

- 组件从创建到死亡它会经历一些特定的阶段
- React组件中包含一系列勾子函数(生命周期回调函数), 会在特定的时刻调用
- 我们在定义组件时，会在特定的生命周期回调函数中，做特定的工作
- 组件的生命周期函数的调用和其书写的位置无关；

生命周期图谱: <https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/>

### 生命周期三大阶段

#### 挂载阶段

> 流程: constructor ==> render ==> componentDidMount
>
> 触发: ReactDOM.render(): 渲染组件元素

#### 更新阶段

> 流程: render ==> componentDidUpdate
>
> 触发: setState() , forceUpdate(), 组件接收到新的props

#### 卸载阶段

> 流程: componentWillUnmount
>
> 触发: 不再渲染组件

### 生命周期钩子

- constructor:

  只执行一次: 创建组件对象挂载第一个调用

  用于初始化state属性或其它的实例属性或方法(可以简写到类体中)

- render:

  执行多次: 挂载一次 + 每次state/props更新都会调用

  用于返回要初始显示或更新显示的虚拟DOM界面

- `componentDidMount`:

  执行一次: 在第一次调用render且组件界面已显示之后调用

  用于初始执行一个异步操作: 发ajax请求/启动定时器等

- `componentDidUpdate`:

  执行多次: 组件界面更新(真实DOM更新)之后调用

  用于数据变化后, 就会要自动做一些相关的工作(比如: 存储数据/发请求)

  执行render方法 => 然后执行该生命周期

- `componentWillUnmount`:

  执行一次: 在组件卸载前调用

  用于做一些收尾工作, 如: 清除定时器

### 不常用生命周期钩子

- `shouldComponentUpdate`：

  决定数据更新之后，是否执行render函数，返回false则不执行render函数

  用于性能优化

- `getSnapshotBeforeUpdate`:

  在React更新DOM之前回调的一个函数，可以获取DOM更新前的一些信息（比如说滚动位置）

### 旧版react生命周期(纯了解)

> componentWillMount
>
> componentWillUpdate,
>
> componentWillReceiveProps
>
> 以上生命周期钩子函数在React v16.3后废弃

## 高阶组件

定义：高阶组件并不是React API的一部分，它是基于React的组合特性而形成的设计模式

接收一个组件作为参数，并且返回一个新的组件的<font color="red">函数</font>

### 应用

**props增强**

案例：

```js
import React, { PureComponent } from "react";

function enhancedUserInfo(OriginComponent) {
  class NewComponent extends PureComponent {
    constructor() {
      super();
      this.state = {
        userInfo: {
          name: "coderwhy",
          level: 99,
        },
      };
    }

    render() {
      return <OriginComponent {...this.props} {...this.state.userInfo} />;
    }
  }

  return NewComponent;
}

export default enhancedUserInfo;
```

```tsx
import React, { PureComponent } from "react";
import enhancedUserInfo from "./hoc/enhanced_props";

const Home = enhancedUserInfo(function (props) {
  return <h1>Home {props.name} </h1>;
});

const Profile = enhancedUserInfo(function (props) {
  return (
    <div>
      <h1>Profile</h1>
      <ul>
        {props.banners.map((item, index) => {
          return <li key={index}>{item.title}</li>;
        })}
      </ul>
    </div>
  );
});

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <Home />
        <Profile banners={[{ title: "首页" }, { title: "个人中心" }]} />
      </div>
    );
  }
}
```

## Hooks

> 问题:
> 相对于类组件, 函数组件的编码更简单, 效率也更高, 但函数组件不能有state (旧版)
>
> 解决:
> React 16.8版本设计了一套新的语法来让函数组件也可以有state

- _Hook_ 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性
- Hook也叫钩子，**本质就是函数**，能让你使用 React 组件的状态和生命周期函数...
- Hook 语法 基本已经代替了类组件的语法
- 后面的 React 项目就完全是用Hook语法了

### useState()

> 用来定义状态数据
>
> 可以多次调用, 产生多个状态数据
>
> `useState`(初始值): 返回包含内部管理的state数据和更新数据的函数的==数组==
>
> - 我们可以用解构的写法取出state数据和更新数据的函数
>   - ```js
>     const [count, setCount] = useState(0);
>     ```
>   - 参数1：相当于state中的数据
>   - 参数2：用来改变第一个元素的状态值，是一个函数，函数里的参数，就是要修改的状态值
>   - 第一次的useState的参数：count的初始值
> - `setCount` 里的参数就是修改的状态值，可以传入一个函数,==注意这是一个异步的函数==，修改后不会被立即改变
> - ```js
>   // 异步过程中，有可能取不到最新的值,通过传递一个回调函数进行获取
>   let [msg, setMsg] = useState("atguigu");
>   setMsg(msg + "_"); //正常设置
>   setMsg((msg) => msg + "_"); //异步设置,此处的msg是最新的msg
>   ```

```javascript
import React from "react";
import { useState } from "react";

function App() {
  /* 
  useState(初始值): 返回包含内部管理的state数据和更新数据的函数的数组
  我们可以用解构的写法取出state数据和更新数据的函数
  state数据变量根据数据意义取名: xxx  => 界面根据xxx来显示
  更新数据的函数一般取名: setXxx => 调用setXxx会重新执行组件函数 (也就是重新render组件)
  第一次调用useState
  重新redner调用useState
  */
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>App组件</h2>
      <p>state.count: {count}</p>
      <button onClick={() => setCount(count + 1)}>更新count</button>
    </div>
  );
}

export default App;
```

### useEffect()

> 可以在一个组件中多次使用
>
> 相当于`componentDidMount，componentDidUpdate 和 componentWillUnmount`的组合

#### 用法

> 引入useEffect
>
> ```js
> //1. didMount 第二个参数传一个空数组
> useEffect(() => {}, []);
> ```
>
> ```js
> // 2. didMount + didUpdate
> useEffect(() => {}, [state | props]);
> ```
>
> ```js
> // 3. didMount + 监听所有的state和所有的props
> useEffect(() => {}); // 不传第二个参数
> ```
>
> ```js
> // 4. willUnmount
> useEffect(() => {
>   //didMount
>   // 应用 ：设置定时器
>   return () => {
>     //willUnmount
>     // 清空定时器
>   };
> }, []);
> ```

```javascript
import { useState, useEffect, Component } from "react";

const style = {
  border: "1px solid gray",
  padding: 10,
  margin: "10px 0",
};

export default function HookTest({ count }) {
  const [msg, setMsg] = useState("abc");

  // 相当于 componentDidMount
  useEffect(() => {
    console.log("effect回调...");
    /* 
    第一次执行HookLifeTest() => msg=abc, setTimeout(() => {msg}, 5000)
    更新执行HookLifeTest => msg=abc+   effect回调不会再执行
    注意: effect的回调当前情况只执行一次
    在setInterval中看到的msg一直都是初始值
    */
    const timeoutId = setTimeout(() => {
      // setMsg(msg + '+')  // 在setInterval中看到的msg一直都是初始值 => 界面只会更新一次
      setMsg((msg) => msg + "+"); // setMsg的回调中的msg是react从内部取出的最新值 => 界面会多次更新
    }, 1000);

    // effect回调返回的函数 相当于 willUnmount
    return () => {
      // 清除定时器
      clearTimeout(timeoutId);
    };
  }, []); // 注意这里要传入空数组

  // componentDidMount + componentDidUpdate (所有state或props变化)
  useEffect(() => {
    console.log("effect回调2");
  });
  // 与上面的等价
  useEffect(() => {
    console.log("effect回调3");
  }, [count, msg]);

  // componentDidMount + componentDidUpdate (msg变化)
  useEffect(() => {
    console.log("effect回调3");
  }, [msg]);

  return (
    <div style={style}>
      <h2>LifeTest</h2>
      <h3>state.msg: {msg}</h3>
      <h3>props.count: {count}</h3>
      <button onClick={() => setMsg(msg + "+")}>更新msg</button>
    </div>
  );
}
```

### useRef

> - 用于得到组件中的某个DOM元素
> - **初始化的时候可以传递任何数据；并且可以被修改**
>   - 案例：**模拟didUpdate**
>
>   ```js
>   let [count, setCount] = useState(0);
>   let flag = useRef(true);
>   // console.log(flag);   {current:true}
>   //hooks第一次调用时初始值，第二次调用时就是最新的值
>   useEffect(() => {
>     if (flag.current) {
>       flag.current = false;
>       return;
>     }
>     console.log("我是更新的时候执行的吗？");
>   }, [count]);
>   ```

```jsx
import { useRef } from "react";

/* 
useRef: 用于得到组件中的某个DOM元素
1. 使用useRef创建用于存储input元素的容器对象(内部使用current属性存储)
2. 将ref容器通过ref属性交给表单项标签 => 渲染时内部会将对应的input元素保存到ref容器的current属性上
3. 点击提交按钮时, 通过ref容器的current属性得到input DOM元素 => 就可以读取其value了
*/
function HookTest2() {
  // 1. 使用useRef创建用于存储input元素的容器对象(内部使用current属性存储)
  const inputRef = useRef();
  console.log(inputRef); // {current: undefined}

  const handleClick = () => {
    // 3. 点击提交按钮时, 通过ref容器的current属性得到input DOM元素 => 就可以读取其value了
    const input = inputRef.current;
    alert(input.value);
  };

  return (
    <div>
      {/* 2. 将ref容器通过ref属性交给表单项标签 => 渲染时内部会将对应的input元素保存到ref容器的current属性上 */}
      <input type="text" ref={inputRef} />
      <button onClick={handleClick}>提示输入框的值</button>
    </div>
  );
}

export default HookTest2;
```

### useContext

> 在hook组件函数中读取context的Provide提供的数数据

```js
function Child() {
  const data = useContext(context);
  return <div>{data}</div>;
}
```

### Hook规则:

1.  react hook 只能在**函数组件**或其他 hook(别人写的 hook 和**自定义的 hook**)
2.  **在使用 hook 时,使用 hook 的代码,应该处于函数组件或自定义 hook 的顶级作用域**
3.  (Hook调用的次数要固定, 所以不要在循环或条件判断中调用)

### 官方 Hooks

- [基础 Hook](https://react.docschina.org/docs/hooks-reference.html#basic-hooks)
  - [`useState`](https://react.docschina.org/docs/hooks-reference.html#usestate)
  - [`useEffect`](https://react.docschina.org/docs/hooks-reference.html#useeffect)
  - [`useContext`](https://react.docschina.org/docs/hooks-reference.html#usecontext)
- [额外的 Hook](https://react.docschina.org/docs/hooks-reference.html#additional-hooks)
  - [`useReducer`](https://react.docschina.org/docs/hooks-reference.html#usereducer)
  - [`useCallback`](https://react.docschina.org/docs/hooks-reference.html#usecallback)
  - [`useMemo`](https://react.docschina.org/docs/hooks-reference.html#usememo)
  - [`useRef`](https://react.docschina.org/docs/hooks-reference.html#useref)
  - [`useImperativeHandle`](https://react.docschina.org/docs/hooks-reference.html#useimperativehandle)
  - [`useLayoutEffect`](https://react.docschina.org/docs/hooks-reference.html#uselayouteffect)
  - [`useDebugValue`](https://react.docschina.org/docs/hooks-reference.html#usedebugvalue)

## 收集表单数据

### 非受控组件

表单项不与state数据相向关联, 需要手动读取表单元素的值

借助于 useRef，使用原生 DOM 方式来获取表单元素值

useRef 的作用：用于获取 DOM元素

> ==注意：在form表单中的按钮，默认是提交到action中的地址==
>
> `e.preventDefault()` 阻止默认跳转行为

```jsx
<form>
  <h2>登陆页面</h2>
  用户名: <input type="text" /> <br />
  密 码: <input type="password" /> <br />
  <input type="submit" value="登 陆" />
</form>
```

```js
import React, { useRef } from "react";

/* 
非受控组件:
  包含表单组件
  在输入过程中, 不将输入数据收集到state数据中, 只是提交的回调中手动读取input中的输入值
  表单项输入数据不与state数据相关联
编码过程
  1. 使用useRef创建用于存储input元素的容器对象(内部使用current属性存储)
  2. 将ref容器通过ref属性交给表单项标签 => 渲染时内部会将对应的input元素保存到ref容器的current属性上
  3. 点击提交按钮时, 通过ref容器的current属性得到input DOM元素 => 就可以读取其value了
不足:
  不够自动 / 不方便进行实时的数据检验
*/
export default function FormTest() {
  const nameRef = useRef();
  const pwdRef = useRef();
  console.log(nameRef); // {current: undefined}

  // 点击登陆的回调
  const login = (event) => {
    console.log(nameRef);

    // 阻止事件的默认行为 => 不提交表单
    event.preventDefault();
    // 得到输入框
    const nameInput = nameRef.current;
    const pwdInput = pwdRef.current;

    // 得到输入框的值
    const name = nameInput.value;
    const pwd = pwdInput.value;

    // 发送登陆的请求
    alert(`发送登陆的请求 name=${name}, pwd=${pwd}`);
  };

  return (
    <form>
      <h2>登陆页面(非受控组件)</h2>
      用户名: <input ref={nameRef} type="text" /> <br />
      密 码: <input ref={pwdRef} type="password" /> <br />
      <input type="submit" value="登 陆" onClick={login} />
    </form>
  );
}
```

### 受控组件

组件中的表单项根据状态数据动态初始显示和更新显示, 当用户输入时实时同步到状态数据中

也就是实现了页面表单项与state数据的双向绑定

人话：表单中的value(checked)绑定了state中的数据

**实现方式**

1.  在 state 中添加一个状态，作为表单元素的value值（控制表单元素值的来源）
2.  给表单元素绑定 change 事件，将 表单元素的值 设置为 state 的值（控制表单元素值的变化）

```jsx
import React, { useState } from "react";

/* 
受控组件
  在输入过程, 实时收集到state数据中 / 界面也可以根据state数据进行显示
  表单项与state数据进行 双向同步 => 数据双向绑定  state <===> 页面的input
编码过程
  1. 使用useState定义一个state数据，作为表单元素的value值（界面根据state动态显示） 
  2. 给表单元素绑定 change 事件，将 表单元素的值 设置为 state 的值（界面输入变化时, 保存到state)
数据双向绑定
  state 到 页面 的绑定 => 将state数据指定为input的value
  页面 到 state 的绑定 => 给input绑定change事件, 在回调中将输入的最新值更新到state
好处:
  实时自动收集数据 => 需要数据时非常轻松
  方便进行实时的数据检验
*/
export default function FormTest2() {
  // 定义state
  const [name, setName] = useState("admin");
  const [pwd, setPwd] = useState("123");

  const handleSubmit = (e) => {
    // 点击提交按钮的默认行为就是提交表单, 但不想自动提交表单 => 阻止一下事件的默认行为
    e.preventDefault();
    alert(`准备提交登陆的ajax请求 name=${name}, pwd=${pwd}`);
  };

  // 当用户名输入发生改变的回调
  const handleNameChange = (e) => {
    // 将最新输入的值更新到name状态
    const name = e.target.value;
    setName(e.target.value);

    // 对name进行实时检验: 不能超过6位
    if (name.length > 6) {
      alert("用户名不能超过6位");
    }
  };

  // 当密码输入发生改变的回调
  const handlePwdChange = (event) => {
    // 将最新输入的值更新到pwd状态
    setPwd(event.target.value);
  };

  return (
    <div>
      <h3>登陆页面(受控组件)</h3>
      <form action="/xxx">
        {/* 2. 给表单元素绑定 change 事件，将 表单元素的值 设置为 state 的值 */}
        用户名: <input type="text" value={name} onChange={handleNameChange} />
        <br />
        密码: <input type="text" value={pwd} onChange={handlePwdChange} />
        <br />
        <input type="submit" value="登陆" onClick={handleSubmit} />
      </form>

      <button
        onClick={() => {
          // 更新state, 界面会自动更新
          setName(name + "--");
          setPwd(pwd + "--");
        }}
      >
        更新状态数据
      </button>
    </div>
  );
}
```

**优化: 使用同一个事件函数处理\*多个事件**

> 方式一: 柯里化函数
>
> 方式二: 包裹箭头函数

```js
import React, { useState } from "react";

/* 
优化: 将2个事件函数优化为1个
方式一: 柯里化函数
方式二: 包裹箭头函数
*/
export default function FormTest3() {
  // 定义state
  const [name, setName] = useState("admin");
  const [pwd, setPwd] = useState("123");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`准备提交登陆的ajax请求 name=${name}, pwd=${pwd}`);
  };

  /* 
  方式一: 使用柯里化函数(也是一个高阶函数)
  return 后面的函数才是change事件要调用的函数
  */
  const handleChange = (setFn) => {
    return (event) => {
      setFn(event.target.value);
    };
  };

  /* 
  方式二: 包裹箭头函数: 在外部包一个事件回调函数, 我们在其中调用传递特定参数
  */
  const handleChange2 = (event, setFn) => {
    setFn(event.target.value);
  };

  return (
    <div>
      <h3>登陆页面(受控组件)</h3>
      <form action="/xxx">
        用户名:{" "}
        <input type="text" value={name} onChange={handleChange(setName)} />
        <br />
        密码: <input type="text" value={pwd} onChange={handleChange(setPwd)} />
        <br />
        <input type="submit" value="登陆" onClick={handleSubmit} />
      </form>

      <form action="/xxx">
        用户名:{" "}
        <input
          type="text"
          value={name}
          onChange={(event) => handleChange2(event, setName)}
        />
        <br />
        密码:{" "}
        <input
          type="text"
          value={pwd}
          onChange={(event) => handleChange2(event, setPwd)}
        />
        <br />
        <input type="submit" value="登陆" onClick={handleSubmit} />
      </form>

      <button
        onClick={() => {
          // 更新state, 界面会自动更新
          setName(name + "--");
          setPwd(pwd + "--");
        }}
      >
        更新状态数据
      </button>
    </div>
  );
}
```

**类组件的优化**：

```tsx
import React, { PureComponent } from "react";

export default class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      userName: "",
      password: "",
    };
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const { userName, password } = this.state;
    return (
      <div>
        {/* 用户名 */}
        用户名：
        <input
          type="text"
          name="userName"
          value={userName}
          onChange={(event) => {
            this.handleChange(event);
          }}
        />
        <br />
        {/* 密码 */}
        密&nbsp; 码：{" "}
        <input
          type="password"
          name="password"
          value={password}
          onChange={(event) => {
            this.handleChange(event);
          }}
        />
        <br />
        <button
          onClick={() => {
            console.log(userName, password);
          }}
        >
          提交
        </button>
      </div>
    );
  }
}
```

**类组件复选框多选**

```tsx
import React, { PureComponent } from "react";

export default class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      hobbies: [
        { value: "sing", text: "唱", checked: false },
        { value: "dance", text: "跳", checked: false },
        { value: "rap", text: "rap", checked: false },
      ],
    };
  }

  handleHobby(e, index) {
    const hobbies = [...this.state.hobbies];
    hobbies[index].checked = e.target.checked;
    this.setState({
      hobbies,
    });
  }

  submit() {
    const hobbies = this.state.hobbies
      .filter((item) => item.checked)
      .map((i) => i.value);
    console.log(hobbies);
  }

  render() {
    const { userName, password, isAgree, hobbies } = this.state;
    return (
      <div>
        {/* 多个多选框 */}
        <div>
          你的爱好
          {hobbies.map((item, index) => {
            return (
              <label htmlFor={item.value} key={index}>
                <input
                  type="checkbox"
                  id={item.value}
                  checked={item.checked}
                  onChange={(event) => {
                    this.handleHobby(event, index);
                  }}
                />
                {item.text}
              </label>
            );
          })}
        </div>

        <div>
          <button
            onClick={() => {
              this.submit();
            }}
          >
            提交
          </button>
        </div>
      </div>
    );
  }
}
```

## 案例- TODO List 案例

\==注：public下引入样式，一定要用 **'/'** , 不能使用 './ ',不然打包到线上是会找不到路径==

解释：打包到线上时，public都会放到dist目录

整理：

> - 只有数据发生变化时，react才会重新渲染
>   - 因为数组、对象等引用类型里面的某个属性发生改变时，其地址值并不会发生改变，所以不会重新渲染
>   - 想要重新渲染，可以复制一个新的数组，执行setxxx方法
>     - 复制数组的方法：\[...arr]
>     - map 返回的是一个函数调用的返回值
>     - filter 返回的是一个true或者等价于true的 元素

> 功能描述
>
> 1.  动态显示初始列表
> 2.  添加一个 todo
> 3.  删除一个 todo
> 4.  反选一个 todo
> 5.  todo 的全部数量和完成数量
> 6.  全选/全不选 todo
> 7.  删除完成的 todo

## ajax

- 在 react 项目开发中，基本都是使用 axios 库来发送 ajax请求与后台通信

- 而发 ajax 请求的时机分下面三种情况
  - 初始化发一次请求： 在`componentDidMount`中发送

- 在`事件回调`函中发送请求

- 在某个state或props数据发生改变后发送请求： 在 `componentDidUpdate` 中发送

- 接口1: <https://api.github.com/search/repositories?q=re&sort=stars>

- 接口2: `http://localhost:4000/search/users?q=rc`

### 搭建后台接口

- server.js
- 使用 node + express + axios

```js
/* 
后台服务器应用模块: 使用express快速搭建后台路由
*/

const express = require("express");
const axios = require("axios");
const app = express();

// 能解析urlencode格式的post请求体参数
app.use(express.urlencoded());
// 能解析json格式的请求体参数
app.use(express.json());

// 根路径路由
app.get("/", (req, res) => {
  res.send({ status: 1, data: "我是测试数据" });
});

// 搜索用户的路由
app.get("/search/users", (req, res) => {
  // 得到query中的q参数
  const q = req.query.q;
  // 使用axios请求git的接口
  axios
    .get("https://api.github.com/search/users", {
      params: { q },
    })
    .then((response) => {
      // 得到成功的响应数据
      const result = response.data;
      // 返回给浏览
      res.send(result);
    })
    .catch((error) => {
      console.log(error.message);
    });
});

// 启动监听服务
app.listen("4000", () => {
  console.log("server listen on http://localhost:4000");
});
```

### react脚手架配置代理

> 在package.json中追加如下配置

```json
"proxy":"http://localhost:4000"
```

说明：

1.  优点：配置简单，前端请求资源时可以不加任何前缀。
2.  缺点：不能配置多个代理。=>` 后面项目中我们会讲解配置多个代理的方式`
3.  工作方式：上述方式配置代理，当请求的资源不存在时，那么该请求会转发给4000 （优先匹配前端资源）

## 组件通讯

> react组件通讯有三种方式.分别是props, context, pubsub

### props

> 单向数据流: 非函数属性通过标签属性, 由外层组件逐级传递给内层组件
>
> 父子间通信
> 祖孙间通信
> 兄弟间通信

### context (了解)

> 与任意后代直接通信
>
> 一般应用中不使用, 但一些插件库内部会使用context封装, 如: react-redux

- 调用 React. createContext() 创建 context 对象

  ```javascript
  const context = React.createContext();
  // 把context对象封装成一个模块。导入进行使用
  //新建src-conntext.js
  import React from "react";
  const context = React.createContext();
  export default context;
  ```

- 在`外部组件`中使用 context 上的 Provider 组件作为父节点, 使用value属性定义要传递的值，传递多个数据时，需要用对象包裹

  ```javascript
  // 提供数据
  <context.Provider value={要传递的值}>
    //value={{ name: "why", age: 18 }}
    <div className="App">
      <Child1 />
    </div>
  </context.Provider>
  ```

- 在`任意后代组件`中, 通过 React 的`useContext`读取数据
  - 类组件使用`组件名.contextType = context对象`

  ```js
  function Child() {
    const data = useContext(context);
    //data中就是祖先组件传过来的数据
    //如果传输的是一个对象，直接解构赋值即可
    //let {xxx,yyy} = useContext(context);
    return <div>{data}</div>;
  }

  // 类组件
  import homeContext from "./ctx/homeCtx";

  export class HomeItem extends Component {
    render() {
      return (
        <div>
          <h2>homeItem</h2>
          <div>
            {this.context.name} - {this.context.age}
          </div>
        </div>
      );
    }
  }

  HomeItem.contextType = homeContext;
  ```

#### 默认值的使用

组件不是context的子组件，并且想要使用context的值，此时使用默认值

> 应用: 利用 context 改造 todos 案例

### pubsub

> 兄弟/任意组件间直接通信
>
> 发布订阅机制: publish / subscribe
> pubsub-js是一个用JS编写的库。
> 利用订阅发布模式, 当一个组件的状态发生了变化，可以通知其他任意组件更新这些变化
>
> ==谁接收消息，谁订阅==

**实现:**

- 安装

  ```shell
  npm install pubsub-js / yarn add pubsub-js
  ```

- 导入

  ```javascript
  import PubSub from "pubsub-js"; // 导入的PubSub是一个对象.提供了发布/订阅的功能
  ```

- pubsub-js 提供的方法

  ```javascript
  // 订阅消息
  // 参数一: 消息名
  // 参数二: 用于接收数据的函数
  // token 订阅消息返回的令牌(用于取消订阅)
  const token = PubSub.subscribe("消息名", function (msg, data) {
    console.log(msg, data);
  });

  // 发布消息
  // 参数一: 消息名
  // 参数二: 要传递的数据
  PubSub.publish("消息名", "hello world!");

  // 取消指定的订阅
  PubSub.unsubscribe(token);

  // 取消某个话题的所有订阅
  PubSub.unsubscribe(消息名);

  /*
  div.addEventListener('click', (event) => {})
  我们点击div => 浏览器自动帮我分发事件: 事件名, 包含事件相关数据的事件对象
  div.removeEventListener('click')
  */
  ```

## Portals

某些情况下，我们希望渲染的内容独立于父组件，甚至是独立于当前挂载到的DOM元素中（默认都是挂载到id为root的DOM 元素上的）。

Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案：

- 第一个参数（child）是任何可渲染的 React 子元素，例如一个元素，字符串或 fragment；
- 第二个参数（container）是一个 DOM 元素；

案例

```jsx
// App
import React, { PureComponent } from "react";
import Model from "./pages/Model";

export class App extends PureComponent {
  render() {
    return (
      <div>
        App
        <Model>
          <h2>我是标题</h2>
          <p>我是内容</p>
        </Model>
      </div>
    );
  }
}

export default App;

// Model
import React, { PureComponent } from "react";
import { createPortal } from "react-dom";

export class Model extends PureComponent {
  render() {
    return (
      <div>
        {createPortal(this.props.children, document.querySelector("#model"))}
      </div>
    );
  }
}

export default Model;

```

## Fragment

> doucmentFragment: 是原生DOM中, 内存中可以用来保存多个DOM节点对象的容器
>
> 如果将这个fragment添加到页面中, 它本身不会进入页面, 它的所有子节点会进行页面
>
> react组件中只能有一个根组件.
>
> 之前使用div包裹的方式会给html结构增加很多无用的层级
>
> 为了解决这个问题,可以使用React.Fragment

注意：如果涉及渲染需要使用key时，**不可以使用简写**

### 测试DocumentFragment

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>测试DocumentFragment</title>
  </head>
  <body>
    <div id="test"></div>

    <script>
      const testDiv = document.getElementById("test");

      const h1 = document.createElement("h1");
      h1.innerHTML = "我是标题";
      const p = document.createElement("p");
      p.innerHTML = "我是内容";

      const fragment = document.createDocumentFragment();
      fragment.appendChild(h1);
      fragment.appendChild(p);

      testDiv.appendChild(fragment);
    </script>
  </body>
</html>
```

### 不使用React.Fragment

```jsx
function Hello() {
  return (
    // 渲染到页面之后,这个div就是一个多余的
    <div>
      <h1>fragment</h1>
      <p>hello react</p>
    </div>
  );
}
```

### 使用React.Fragment

```jsx
function Hello() {
  return (
    // 这样就只会渲染h1和p
    <React.Fragment>
      <h1>fragment</h1>
      <p>hello react</p>
    </React.Fragment>
  );
}
```

### 使用简写(无名标签 <>)

```jsx
function Hello() {
  return (
    // 这是React.Fragment的简写形式
    <>
      <h1>fragment</h1>
      <p>hello react</p>
    </>
  );
}
```

### DocumentFragment (了解)

> &lt;React.Fragment> 内部就是使用 DocumentFragment 实现的
>
> DocumentFragment 是也是一种 DOM 节点, 它有2个特点
>
>       1. 它只存在于内存中, 它本身是不会进入页面显示的
>       2. 它专门用来存放任意多个节点
>       3. 如果将它添加到页面标签中, 那进入页面的是它的所有子节点

```html
<div id="test"></div>

<script>
  // 得到页面的空div
  const testDiv = document.getElementById("test");

  // 创建h1标签, 并指定内容
  const h1 = document.createElement("h1");
  h1.innerHTML = "我是标题";
  // 创建p标签, 并指定内容
  const p = document.createElement("p");
  p.innerHTML = "我是内容";

  // 创建fragment容器, 将h1和p添加为它的子节点
  const fragment = document.createDocumentFragment();
  fragment.appendChild(h1);
  fragment.appendChild(p);

  // 将fragment添加为页面div的子节点 => 但fragment不会进入页面
  testDiv.appendChild(fragment);
</script>
```

## 严格模式

StrictMode 是一个用来突出显示应用程序中潜在问题的工具：

- 与 Fragment 一样，StrictMode 不会渲染任何可见的 UI；&#x20;
- 它为其后代元素触发额外的检查和警告；&#x20;
- 严格模式检查仅在开发模式下运行；它们不会影响生产构建；

使用方法：

```jsx
import React, { PureComponent, StrictMode } from "react";
import Home from "./Home";

export class App extends PureComponent {
  render() {
    return (
      <div>
        App
        <StrictMode>
          <Home />
        </StrictMode>
      </div>
    );
  }
}

export default App;
```

### 严格模式检查的是什么？

1.  识别不安全的生命周期：&#x20;
2.  使用过时的ref API&#x20;
3.  检查意外的副作用&#x20;
    - 这个组件的constructor会被调用两次；&#x20;
    - 这是严格模式下故意进行的操作，让你来查看在这里写的一些逻辑代码被调用多次时，是否会产生一些副作用；&#x20;
    - 在生产环境中，是不会被调用两次的；&#x20;

4.  使用废弃的findDOMNode方法&#x20;
    - 在之前的React API中，可以通过findDOMNode来获取DOM，不过已经不推荐使用了

5.  检测过时的context API&#x20;
    - 早期的Context是通过static属性声明Context对象属性，通过getChildContext返回Context对象等方式来使用Context的；&#x20;
    - 目前这种方式已经不推荐使用，大家可以自行学习了解一下它的用法；

## vue和react的异同

相同点

- 数据驱动视图

不同点

- 渲染逻辑不同
  - vue：template -> render函数 -> h函数 -> 渲染成真实dom
  - react：render函数 -> React.createElement() -> 渲染成真实dom
- 是否更新dom
  - vue：数据劫持，vue底层封装好了
  - react：shouldComponentUpdate自己决定是否执行render函数

## setState的更多用法

1.  常规使用
2.  setState可以传入一个回调函数
    1.  好处一：可以在回调函数中边写新的state的逻辑
    2.  好处二：当前的回调函数会将之前的state和props传递进来
3.  setState在React的事件处理中是一个异步调用，如果要获取最新的结果然后处理对应的逻辑，可以传入第二个参数(回调函数)

```tsx
import React, { Component } from "react";

export class App extends Component {
  constructor() {
    super();
    this.state = {
      message: "hello react",
    };
  }

  changeMessage() {
    // 常规用法
    // this.setState({ message: "你好，储锐" });

    // setState可以传入一个回调函数
    // this.setState((state, props) => {
    //   console.log("state", state);
    //   console.log("props", props);
    //   return { message: "你好，储锐" };
    // });

    // setState在react的事件处理中是异步的
    this.setState({ message: "你好，储锐" }, () => {
      console.log("+++++", this.state.message);
    });
    console.log("-----", this.state.message);
  }
  render() {
    const { message } = this.state;
    return (
      <div>
        <h2>{message}</h2>
        <button
          onClick={() => {
            this.changeMessage();
          }}
        >
          修改
        </button>
      </div>
    );
  }
}

export default App;
```

### 为什么设计成异步

- setState设计为异步，可以显著的提升性能；
  - 如果每次调用 setState都进行一次更新，那么意味着render函数会被频繁调用，界面重新渲染，这样效率是很低的；
  - 最好的办法应该是<font color="red">获取到多个更新，之后进行批量更新</font>；
- 如果同步更新了state，但是还没有执行render函数，那么state和props不能保持同步；
  - state和props不能保持一致性，会在开发中产生很多的问题；

```tsx
import React, { Component } from "react";

export class App extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
  }

  countChange() {
    // 调用三次，最终结果为1,说明会合并
    // this.setState({ count: this.state.count + 1 });
    // this.setState({ count: this.state.count + 1 });
    // this.setState({ count: this.state.count + 1 });

    // 调用三次
    this.setState((state) => {
      return { count: state.count + 1 };
    });
    this.setState((state) => {
      return { count: state.count + 1 };
    });
    this.setState((state) => {
      return { count: state.count + 1 };
    });
  }
  render() {
    console.log("render函数执行了");
    const { count } = this.state;
    return (
      <div>
        <h2>{count}</h2>
        <button
          onClick={() => {
            this.countChange();
          }}
        >
          修改
        </button>
      </div>
    );
  }
}

export default App;
```

### setState都是异步的吗

- react18之前：
  - react的事件处理都是异步的
  - 原生事件处理、Promise、setTimeout等中的事件处理是同步的
- react18之后都是异步的

<font color="red">如果希望代码可以同步拿到，则需要执行特殊的`flushSync`操作</font>

```tsx
import React, { Component } from "react";
import { flushSync } from "react-dom";

export class App extends Component {
  constructor() {
    super();
    this.state = { count: 0 };
  }

  countChange() {
    flushSync(() => {
      this.setState({ count: this.state.count + 1 });
    });
    console.log(this.state.count); // 1
  }
  render() {
    console.log("render函数执行了");
    const { count } = this.state;
    return (
      <div>
        <h2>{count}</h2>
        <button
          onClick={() => {
            this.countChange();
          }}
        >
          修改
        </button>
      </div>
    );
  }
}

export default App;
```

## 性能优化

### SCU

React给我们提供了一个生命周期方法 `shouldComponentUpdate`（很多时候，我们简称为<font color="red">SCU</font>），这个方法接受参数，并且需要有 返回值：

- 该方法有两个参数：
  - 参数一：nextProps 修改之后，最新的props属性
  - 参数二：nextState 修改之后，最新的state属性
- 该方法返回值是一个boolean类型：
  - 返回值为true，那么就需要调用render方法；
  - 返回值为false，那么久不需要调用render方法；
  - 默认返回的是true，也就是只要state发生改变，就会调用render方法
- 比如我们在App中增加一个message属性：
  - jsx中并没有依赖这个message，那么它的改变不应该引起重新渲染；
  - 但是因为render监听到state的改变，就会重新render，所以最后render方法还是被重新调用了

```tsx
import React, { Component } from "react";
import Home from "./Home";
import About from "./About";

export class App extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
      message: "hello world",
    };
  }

  // 组件是否更新
  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.state.message !== nextState.message ||
      this.state.count !== nextState.count
    ) {
      return true;
    }
    return false;
  }

  textChange() {
    // this.setState({ message: "你好，储锐" });
    this.setState({ message: "hello world" });
  }
  render() {
    const { count, message } = this.state;
    console.log("App render");
    return (
      <div>
        App - {count} - {message}
        <p>
          <button
            onClick={() => {
              this.textChange();
            }}
          >
            修改
          </button>
        </p>
        <Home />
        <About />
      </div>
    );
  }
}

export default App;
```

### PureComponent

如果所有的类，我们都需要手动来实现 shouldComponentUpdate，那么会给我们开发者增加非常多的工作量。

事实上React已经考虑到了这一点，所以React已经默认帮我们实现好了，如何实现呢？

- 将class继承自`PureComponent`

```jsx
import React, { PureComponent } from "react";

export class About extends PureComponent {
  render() {
    console.log("About render");
    return <div>About - {this.props.count} </div>;
  }
}

export default About;
```

### memo

函数组件使用`memo`

```jsx
import React, { memo } from "react";

const Home = memo((props) => {
  console.log("Home render");
  return <div>Home - {props.message} </div>;
});

export default Home;
```

### shallowEqual方法

问题：为什么不能直接修改state种引用类型的数据

使用了PureComponent，react底层会调用`shallowEqual`方法判断是否要执行`shouldComponentUpdate`钩子。

`shallowEqual`方法只比较state里的引用类型的地址是否相同，是浅层比较，如果直接修改state里的引用类型数据，react底层会认为原始数据没有被修改，从而不执行render方法

## 动画

```shell
npm install react-transition-group
```

[官网](https://reactcommunity.org/react-transition-group/transition)

react-transition-group主要包含四个组件：

- ransition
  - 该组件是一个和平台无关的组件（不一定要结合CSS）；
  - 在前端开发中，我们一般是结合CSS来完成样式，所以比较常用的是CSSTransition；
- CSSTransition
  - 在前端开发中，通常使用CSSTransition来完成过渡动画效果
- witchTransition
  - 两个组件显示和隐藏切换时，使用该组件
- TransitionGroup
  - 将多个动画组件包裹在其中，一般用于列表中元素的动画；

### CSSTransition

CSSTransition执行过程中，有三个状态：appear、enter、exit；

它们有三种状态，需要定义对应的CSS样式：

- 第一类，开始状态：对于的类是-appear、-enter、exit；
- 第二类：执行动画：对应的类是-appear-active、-enter-active、-exit-active；
- 第三类：执行结束：对应的类是-appear-done、-enter-done、-exit-done；

#### 常见属性

in：触发进入或者退出状态

- 如果添加了unmountOnExit={true}，那么该组件会在执行退出动画结束后被移除掉；
- 当in为true时，触发进入状态，会添加-enter、-enter-acitve的class开始执行动画，当动画执行结束后，会移除两个class，并且添加-enter-done的class；
- 当in为false时，触发退出状态，会添加-exit、-exit-active的class开始执行动画，当动画执行结束后，会移除两个class，并且添加-enter-done的class；

lassNames：动画class的名称

- 决定了在编写css时，对应的class名称：比如card-enter、card-enter-active、card-enter-done；

timeout：

- 过渡动画的时间

ppear：

- 是否在初次进入添加动画（需要和in同时为true）

unmountOnExit：退出后卸载组件

CSSTransition对应的钩子函数：主要为了检测动画的执行过程，来完成一些JavaScript的操作

- onEnter：在进入动画之前被触发；
- onEntering：在应用进入动画时被触发；
- onEntered：在应用进入动画结束后被触发；

```jsx
import React, { PureComponent } from "react";
import { CSSTransition } from "react-transition-group";
import "./style.css";

export class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      isShow: true,
    };
  }
  render() {
    const { isShow } = this.state;

    return (
      <div>
        <button onClick={() => this.setState({ isShow: !isShow })}>
          Toggle
        </button>
        <CSSTransition
          appear
          in={isShow}
          unmountOnExit={true}
          timeout={2000}
          classNames="test"
          onEnter={() => {
            console.log("开始进入动画");
          }}
          onEntering={() => {
            console.log("执行进入动画");
          }}
          onEntered={() => {
            console.log("进入结束");
          }}
          onExit={() => {
            console.log("开始退出动画");
          }}
          onExiting={() => {
            console.log("执行退出动画");
          }}
          onExited={() => {
            console.log("退出结束");
          }}
        >
          <h1>哈哈哈哈哈哈哈</h1>
        </CSSTransition>
      </div>
    );
  }
}

export default App;


// css
.test-appear {
  transform: translateX(-200px);
}
.test-appear-active {
  transform: translateX(0);
  transition: transform 2s ease;
}


.test-enter {
  opacity: 0;
}

.test-enter-active {
  opacity: 1;
  transition: all 2s ease;
}

.test-exit {
  opacity: 1;
}

.test-exit-active {
  opacity: 0;
  transition: all 2s ease;
}

```

### SwitchTransition

SwitchTransition可以完成两个组件之间切换的炫酷动画

SwitchTransition中主要有一个属性：mode，有两个值

- in-out：表示新组件先进入，旧组件再移除；
- out-in：表示就组件先移除，新组建再进入

使用：

- SwitchTransition组件里面要有CSSTransition或者Transition组件，不能直接包裹你想要切换的组件；
- SwitchTransition里面的CSSTransition或Transition组件不再像以前那样接受in属性来判断元素是何种状态，取而代之的是<font color="red">key属性</font>；

```jsx
import React, { PureComponent } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import './style.css'

export class App extends PureComponent {
 constructor() {
   super();
   this.state = {
     isShow: true,
   };
 }
 render() {
   const { isShow } = this.state;
   return (
     <div>
       <SwitchTransition mode="out-in">
         <CSSTransition
           key={isShow ? "exit" : "login"}
           classNames="login"
           timeout={1000}
         >
           <button onClick={() => this.setState({ isShow: !isShow })}>
             {isShow ? "退出" : "登录"}
           </button>
         </CSSTransition>
       </SwitchTransition>
     </div>
   );
 }
}

export default App;

// css
.login-enter {
 transform: translateX(100px);
 opacity: 0;
}

.login-enter-active {
 transform: translateX(0);
 opacity: 1;
 transition: all 1s ease;
}

.login-exit {
 transform: translateX(0);
 opacity: 1;
}

.login-exit-active {
 transform: translateX(-100px);
 opacity: 0;
 transition: all 1s ease;
}

```

### TransitionGroup

当我们有一组动画时，需要将这些CSSTransition放入到一个TransitionGroup中来完成动画

```jsx
import React, { PureComponent } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./style.css";

export class App extends PureComponent {
  constructor() {
    super();

    this.state = {
      books: [
        { id: 111, name: "你不知道JS", price: 99 },
        { id: 222, name: "JS高级程序设计", price: 88 },
        { id: 333, name: "Vuejs高级设计", price: 77 },
      ],
    };
  }

  addNewBook() {
    const books = [...this.state.books];
    books.push({
      id: new Date().getTime(),
      name: "React高级程序设计",
      price: 99,
    });
    this.setState({ books });
  }

  removeBook(index) {
    const books = [...this.state.books];
    books.splice(index, 1);
    this.setState({ books });
  }

  render() {
    const { books } = this.state;

    return (
      <div>
        <h2>书籍列表:</h2>
        <TransitionGroup component="ul">
          {books.map((item, index) => {
            return (
              <CSSTransition key={item.id} classNames="book" timeout={1000}>
                <li>
                  <span>
                    {item.name}-{item.price}
                  </span>
                  <button onClick={(e) => this.removeBook(index)}>删除</button>
                </li>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
        <button onClick={(e) => this.addNewBook()}>添加新书籍</button>
      </div>
    );
  }
}

export default App;
```

## React中的CSS

### 内联样式

- 使用小驼峰命名属性的JavaScript对象
- 可以使用state中的变量

**优点**

1.  样式间不会有冲突
2.  可以动态获取state中的样式

**缺点**
混乱、要是用驼峰、没有提示、某些样式无法编写（伪类/伪元素）

### 普通的css

通常是编写到单独的文件，然后引入

组件化开发，普通的css样式是全局样式，相互之间会有影响

### css modules

css modules并不是React特有的解决方案，而是所有使用了类似于<font color="red">webpack配置</font>的环境下都可以使用的。
如果在其他项目中使用它，那么我们需要自己来进行配置，比如配置<font color="red">webpack.config.js中的modules: true</font>等

React的脚手架已经内置了css modules的配置：

- <font color="red">.css/.less/.scss 等样式文件</font>都需要修改成<font color="red">.module.css/.module.less/.module.scss</font> 等；
- 之后就可以引用并且进行使用了；

**缺点**

- 引用的类名，不能使用连接符(.home-title)，在JavaScript中是不识别的；
- <font color="red">所有的className都必须使用{style.className} 的形式</font>来编写；
- 不方便动态来修改某些样式，依然需要使用内联样式的方式；

### css in js

目前比较流行的CSS-in-JS的库有哪些呢？

- styled-components
- emotion
- glamorous

```shell
npm i styled-components
```

#### ES6标签模板字符串

正常情况下，我们都是通过 函数名() 方式来进行调用的，其实函数还有另外一种调用方式：

```js
function foo(...args) {
  console.log(args);
}

foo("hello world");
const name = "zhangsan";
foo`hello ${name}`; // [['hello',""],'zhangsan']
```

如果我们在调用的时候插入其他的变量：

- 模板字符串被拆分了；
- 第一个元素是数组，是被模块字符串拆分的字符串组合；
- 后面的元素是一个个模块字符串传入的内容；

#### styled的基本使用

VSCode中安装插件：`vscode-styled-components`

```jsx
import React, { PureComponent } from "react";
import { HomeWrapper, FooterWrapper } from "./style";

export class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      size: 20,
      color: "orange",
    };
  }
  render() {
    const { size, color } = this.state;
    return (
      <div>
        <HomeWrapper>
          <h2 className="title">我是Home标题</h2>
          <ul>
            <li>我是列表1</li>
            <li>我是列表2</li>
            <li>我是列表3</li>
          </ul>

          <FooterWrapper size={size} color={color}>
            <div className="footer">
              <div>版权声明</div>
              <div>关于我们</div>
            </div>
            <button onClick={() => this.setState({ color: "skyblue" })}>
              修改颜色
            </button>
          </FooterWrapper>
        </HomeWrapper>
      </div>
    );
  }
}

export default App;

// css
import styled from "styled-components";
import * as varb from "./style/variables";

export const HomeWrapper = styled.div`
  .title {
    color: red;
    &:hover {
      color: red;
    }
  }
`;

// 子元素单独抽取到一个样式
// 可以接受外部传入的props
// 可以通过attrs给标签模板字符串中提供属性
// 从一个单独的文件中引入变量
export const FooterWrapper = styled.div.attrs((props) => ({
  color: props.color || "blue",
}))`
  .footer {
    color: ${varb.primaryColor};
    font-size: ${(props) => props.sizes}px;

    &:hover {
      color: ${(props) => props.color};
    }
  }
`;

//variables.js
export const primaryColor = "#ff0033";
export const secondaryColor = "#00bcd4";

export const smallSize = "12px";
export const middleSize = "14px";
```

### 动态添加class

1.  使用三元运算符
2.  使用数组
3.  使用第三方库`classnames`

```jsx
import React, { PureComponent } from "react";
import classNames from "classnames";

export class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      isBbb: true,
      isCcc: false,
    };
  }

  render() {
    const { isBbb, isCcc } = this.state;

    const classList = ["aaa"];
    if (isBbb) classList.push("bbb");
    if (isCcc) classList.push("ccc");
    return (
      <div>
        <h2 className={`aaa ${isBbb ? "bbb" : ""} ${isCcc ? "ccc" : ""}`}>
          哈哈哈
        </h2>

        <h2 className={classList.join(" ")}>呵呵呵</h2>

        <h2 className={classNames("aaa", { bbb: isBbb, ccc: isCcc })}>
          嘿嘿嘿
        </h2>
      </div>
    );
  }
}

export default App;
```

## Redux状态管理工具

Redux的使用过程

1.  创建一个对象，作为我们要保存的状态
2.  创建Store来储存这个对象
    - 创建store时必须创建reducer
    - 我们可以通过`store.getState`来获取当前的state
3.  通过action来修改state
    - 通过dispatch来派发action
    - 通常action中都会有type属性，也可以携带其他的数据
4.  修改reducer中的处理代码
    reducer是一个纯函数，不能直接修改state中的数据
5.  可以在派发action之前，监听store的变化

```js
// 监听store变化
  componentDidMount() {
    store.subscribe(() => {
      const counter = store.getState().counter;
      this.setState({
        counter,
      });
    });
  }

// 取消监听


```

### 在react中使用redux

安装：`npm i redux react-redux`

**创建仓库**

```jsx
// 创建仓库 store/index.js
import { createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer);
export default store;

// 定义reducer  store/reducer
import * as actionTypes from "./constants";

const initialState = {
  counter: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_NUMBER:
      return {
        ...state,
        counter: state.counter + action.num,
      };
    case actionTypes.SUB_NUMBER:
      return {
        ...state,
        counter: state.counter - action.num,
      };
    default:
      return state;
  }
};

export default reducer;

// 定义action  store/actionCreators
import * as actonTypes from "./constants";

export const addNumberAction = (num) => {
  return {
    type: actonTypes.ADD_NUMBER,
    num,
  };
};

export const subNumberAction = (num) => {
  return {
    type: actonTypes.SUB_NUMBER,
    num,
  };
};

// 定义action类型常量  store/constants
export const ADD_NUMBER = 'add_number'
export const SUB_NUMBER = 'sub_number'

```

**在组件中使用store**

```jsx
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { addNumberAction, subNumberAction } from "../store/actionCreators";

export class About extends PureComponent {
  calcCountChange(num, isAdd) {
    if (isAdd) {
      this.props.addNumber(num);
    } else {
      this.props.subNumber(num);
    }
  }

  render() {
    return (
      <div>
        <h2>About page {this.props.counter} </h2>
        <button
          onClick={() => {
            this.calcCountChange(5, true);
          }}
        >
          +5
        </button>
        <button
          onClick={() => {
            this.calcCountChange(5, false);
          }}
        >
          -5
        </button>
      </div>
    );
  }
}

// 映射状态到属性
const mapStateToProps = (state) => ({ counter: state.counter });

// 映射派发到属性
const mapDispatchToProps = (dispatch) => ({
  addNumber: (num) => dispatch(addNumberAction(num)),
  subNumber: (num) => dispatch(subNumberAction(num)),
});

// connect的返回值是一个 高阶函数
// 将store和组件关联起来
export default connect(mapStateToProps, mapDispatchToProps)(About);

// 在组件最外层包裹上provider，这样所有仓库都可以使用store
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";

import App from "./App";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
```

### redux中异步网络请求的操作

需要使用中间件 `npm i redux-thunk` 这样dispatch就可以派发函数了

```js
// store/index
import { createStore, applyMiddleware } from "redux";

// 增强中间件
import { thunk } from "redux-thunk";
import reducer from "./reducer";

const store = createStore(reducer, applyMiddleware(thunk));

export default store;

// store/actionCreators
export const changeBannersAction = (banners) => ({
  type: actonTypes.BANNER_LIST,
  banners,
});

export const fetchMuldataAction = () => {
  return (dispatch, getState) => {
    axios.get("http://123.207.32.32:8000/home/multidata").then((res) => {
      const banners = res.data.data.banner.list;
      dispatch(changeBannersAction(banners));
    });
  };
};
```

### redux调试工具

`react-devtoos 和 redux-devtool`

redux-devtool只在开发环境中开启，在生产环境中要关闭

```js
// store/index.js
import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducer";

// 使用中间件
import { thunk } from "redux-thunk";

// 配置 redux-devtools
const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true }) || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
```

### redux-toolkit

#### 认识redux-toolkit

Redux Toolkit 是官方推荐的编写 Redux 逻辑的方法。

- redux的编写逻辑过于的繁琐和麻烦。 并且代码通常分拆在多个文件中（虽然也可以放到一个文件管理，但是代码量过多，不利于管理）；
- Redux Toolkit包旨在成为编写Redux逻辑的标准方式，从而解决上面提到的问题；
- 在很多地方为了称呼方便，也将之称为“RTK”；
- 安装Redux Toolkit：

```shell
npm install @reduxjs/toolkit react-redux
```

- Redux Toolkit的核心API主要是如下几个：
  - <font color="red">configureStore</font>：包装createStore以提供简化的配置选项和良好的默认值。它可以自动组合你的 slice reducer，添加你提供 的任何 Redux 中间件，redux-thunk默认包含，并启用 Redux DevTools Extension。
  - <font color="red">createSlice</font>：接受reducer函数的对象、切片名称和初始状态值，并自动生成切片reducer，并带有相应的actions。
  - <font color="red">createAsyncThunk</font>: 接受一个动作类型字符串和一个返回承诺的函数，并生成一个pending/fulfilled/rejected基于该承诺分 派动作类型的 thunk

#### 使用

创建reducer

通过`createSlice`创建一个slice。

<font color="red">createSlice</font>主要包含如下几个参数：

- <font color="red">name</font>：用户标记slice的名词  在之后的redux-devtool中会显示对应的名词；
- <font color="red">initialState</font>：初始化值，第一次初始化时的值；
- <font color="red">reducers</font>：相当于之前的reducer函数
  - 对象类型，并且可以添加很多的函数；
  - 函数类似于redux原来reducer中的一个case语句；
  - 函数的参数：
    - 参数一：state
    - 参数二：调用这个action时，传递的action参数；
- createSlice返回值是一个对象，包含所有的actions；

创建store

**configureStore用于创建store对象**，常见参数如下：

- <font color="red">reducer</font>，将slice中的reducer可以组成一个对象传入此处；
- <font color="red">middleware</font>：可以使用参数，传入其他的中间件（自行了解）；
- <font color="red">devTools</font>：是否配置devTools工具，默认为true；

```js
// store/features/counter.js
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    counter: 888,
  },
  reducers: {
    addNumber(state, { payload }) {
      state.counter += payload;
    },
    subNumber(state, { payload }) {
      state.counter -= payload;
    },
  },
});
export const { addNumber, subNumber } = counterSlice.actions;

export default counterSlice.reducer;

// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./features/counter";

const store = configureStore({
  reducer: {
    counter: counterSlice,
  },
});

export default store;

```

```jsx
// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
```

#### 异步操作

Redux Toolkit默认已经给我们继承了Thunk相关的功能：`createAsyncThunk`

当createAsyncThunk创建出来的action被dispatch时，会存在三种状态：

- <font color="red">pending</font>：action被发出，但是还没有最终的结果；
- <font color="red">fulfilled</font>：获取到最终的结果（有返回值的结果）；
- <font color="red">rejected</font>：执行过程中有错误或者抛出了异常；

我们可以在createSlice的entraReducer中监听这些结果

```js
// store/features/banner.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getHomeData = createAsyncThunk(
  "homeData",
  async (extraInfo, store) => {
    // extraInfo:调用这个方法时传入的参数，
    // store：当前的仓库
    const res = await axios.get("http://123.207.32.32:8000/home/multidata");
    return res.data;
  },
);

const bannerSlice = createSlice({
  name: "banner",
  initialState: {
    banners: [],
  },
  // 同步操作
  reducers: {},
  // 异步操作
  // 这种写法已被废弃
  // extraReducers: {
  //   [getHomeData.pending](state, action) {
  //     console.log("getHomeData pending", action);
  //   },
  //   [getHomeData.fulfilled](state, action) {
  //     console.log("getHomeData fulfilled", action);
  //   },
  //   [getHomeData.rejected](state, action) {
  //     console.log("getHomeData rejected", action);
  //   },
  // },
  extraReducers: (build) => {
    build
      .addCase(getHomeData.pending, (state, action) => {
        console.log("getHomeData pending", action);
      })
      .addCase(getHomeData.fulfilled, (state, action) => {
        console.log("getHomeData fulfilled", action);
        state.banners = action.payload.data.banner.list;
      });
  },
});

export default bannerSlice.reducer;
```

## 路由

### 安装

```shell
npm i react-router-dom
```

### 基本使用

react-router最主要的API是给我们提供的一些组件：

`BrowserRouter`或`HashRouter`

- <font color="red">BrowserRouter</font>使用history模式；
- <font color="red">HashRouter</font>使用hash模式；

### 路由映射配置

- `Routes`：包裹所有的Route，在其中匹配一个路由
  - Router5.x使用的是Switch组件
- `Route`：Route用于路径的匹配；
  - <font color="red">path</font>属性：用于设置匹配到的路径；
  - <font color="red">element</font>属性：设置匹配到路径后，渲染的组件；
    - Router5.x使用的是component属性
  - exact：精准匹配，只有精准匹配到完全一致的路径，才会渲染对应的组件；
    - Router6.x不再支持该属性

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/home" element={<Home />} />
  <Route path="/about" element={<About />} />
</Routes>
```

### 路由配置和跳转

Link和NavLink：

- 通常路径的跳转是使用Link组件，最终会被渲染成a元素；
- NavLink是在Link基础之上增加了一些样式属性（后续学习）；
- to属性：Link中最重要的属性，用于设置跳转到的路径；

### NavLink的使用

需求：路径选中时，对应的a元素变为红色

这个时候，我们要使用NavLink组件来替代Link组件：

- <font color="red">style</font>：传入函数，函数接受一个对象，包含isActive属性
- <font color="red">className</font>：传入函数，函数接受一个对象，包含isActive属性

默认的activeClassName：

事实上在默认匹配成功时，NavLink就会添加上一个动态的active class；

当然，如果你担心这个class在其他地方被使用了，出现样式的层叠，也可以自定义class

```jsx
import React, { PureComponent } from "react";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import "./app.css";

export class App extends PureComponent {
  render() {
    return (
      <div>
        <div className="header">
          <span>Header</span>
          <div className="nav">
            {/* 使用Link */}
            <Link to={"/home"}>Home</Link>
            <Link to={"/about"}>About</Link>

            {/* 默认active类名 */}
            <NavLink to={"/home"}>Home</NavLink>
            <NavLink to={"/about"}>About</NavLink>

            {/* 动态style */}
            <NavLink
              to="/home"
              style={({ isActive }) => ({ color: isActive ? "red" : "" })}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              style={({ isActive }) => ({ color: isActive ? "red" : "" })}
            >
              About
            </NavLink>

            {/* 动态className */}
            <NavLink
              to="/home"
              className={({ isActive }) => (isActive ? "link-active" : "")}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? "link-active" : "")}
            >
              About
            </NavLink>
          </div>
          <hr />
        </div>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>

        <div className="footer">
          <hr />
          Footer
        </div>
      </div>
    );
  }
}

export default App;
```

### Navigate导航

<font color="red">Navigate</font>用于路由的重定向，当这个组件出现时，就会执行跳转到对应的to路径中

我们可以在匹配到/的时候，直接跳转到/home页面

```jsx
<Route path="/" element={<Navigate to="/home" />} />
```

### Not Found页面配置

- 开发一个Not Found页面；
- 配置对应的Route，并且设置path为\*即可；

放在路由配置的最后一行

```jsx
<Route path="*" element={<NotFound />} />
```

### 路由的嵌套

`<Outlet />`组件用于在父路由元素中作为子路由的占位元素。

```jsx
<Route path="/home" element={<Home />}>
  <Route path="/home" element={<Navigate to="/home/recommend" />} />
  <Route path="/home/recommend" element={<HomeRecommend />} />
</Route>;

// Home.jsx
export class Home extends PureComponent {
  render() {
    return (
      <div>
        <h1>Home Page</h1>
        <Link to="/home/recommend">推荐</Link>
        <Outlet />
      </div>
    );
  }
}
```

### 手动路由的跳转

> 在Router6.x版本之后，代码类的API都迁移到了hooks的写法

如果我们希望进行代码跳转，需要通过`useNavigate`的Hook获取到<font color="red">navigate对象</font>进行操作；

函数式组件直接使用hook即可

```jsx
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  function navigateTo(path) {
    navigate(path);
  }

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={() => navigateTo("/home/songMenu")}>歌单</button>

      <Outlet />
    </div>
  );
}
```

那么如果是一个函数式组件，我们可以直接调用，但是如果是一个类组件呢？

**封装高阶组件，实现类组件的路由跳转**

```jsx
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

// 自定义高阶组件实现路由跳转
function withRouter(WrapperComponent) {
  return function (props) {
    // 导航
    const navigate = useNavigate();

    // 动态路由参数
    const params = useParams();

    // 查询字符串参数
    const location = useLocation(); // 不推荐得到的结果是/name=xxx&age=xxx

    const [searchParams] = useSearchParams();
    const query = Object.fromEntries(searchParams);

    const router = { navigate, params, location, query };
    return <WrapperComponent {...props} router={router} />;
  };
}

export default withRouter;
```

### 路由参数跳转

1.  动态路由的方式；
2.  search传递参数

#### 动态路由

`/:id` ：类似这种写法

```jsx
<Route path="/home/songMenu/detail/:id" element={<Detail />} />
```

获取参数

```jsx
import { useNavigate, useParams } from "react-router-dom";
const params = useParams();
```

#### search传参

`/user?name=why&age=18`

```jsx
// 查询字符串参数
const location = useLocation(); // 不推荐得到的结果是/name=xxx&age=xxx
const [searchParams] = useSearchParams();
const query = Object.fromEntries(searchParams);
```

### 路由的配置文件

```js
// router/index.js
import { Navigate } from "react-router-dom";
import Home from "../pages/Home";
import HomeRecommend from "../pages/HomeRecommend";
import NotFound from "../pages/NotFound";

const routes = [
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
  {
    path: "/home",
    element: <Home />,
    children: [
      {
        path: "/home",
        element: <Navigate to="/home/recommend" />,
      },
      {
        path: "/home/recommend",
        element: <HomeRecommend />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
```

使用

```jsx

```

## react-hooks

### 为什么要使用hooks

类组件优点：

- class组件可以定义自己的state，用来保存组件自己内部的状态
- class组件有自己的生命周期，我们可以在对应的生命周期中完成自己的逻辑；
- class组件可以在状态改变时只重新执行render函数以及我们希望重新调用的生命周期函数componentDidUpdate等

类组件的缺点：

- 复杂组件变得难以理解
- 难以理解的class
- 组件复用状态很难

### useState

useState<font color="red">接受唯一一个参数</font>，在第一次组件被调用时使用来作为初始化值。（如果没有传递参数，那么初始化值为undefined）。

useState的<font color="red">返回值是一个数组</font>，我们可以通过数组的解构，来完成赋值会非常方便。

```jsx
import React, { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  function changeCount(num) {
    setCount(count + num);
  }
  return (
    <div>
      <h1>计数器：{count}</h1>
      <button onClick={() => changeCount(10)}>+10</button>
    </div>
  );
}

export default App;
```

### useEffect

Effect Hook 可以让你来完成一些类似于class中生命周期的功能；

useEffect<font color="red">要求我们传入一个回调函数</font>，在React<font color="red">执行完更新DOM操作之后，就会回调这个函数</font>；

默认情况下，无论是<font color="red">第一次渲染之后</font>，还是<font color="red">每次更新之后</font>，都会<font color="red">执行这个 回调函数</font>；

#### 清除副作用

在class组件的编写过程中，某些副作用的代码，我们需要在componentWillUnmount中进行清除：

- 比如我们之前的事件总线或Redux中手动调用subscribe；

- 都需要在componentWillUnmount有对应的取消订阅；

useEffect传入的回调函数A本身可以有一个返回值，这个<font color="red">返回值是另外一个回调函数B</font>：

React 何时清除 effect？

- React 会在组件更新和卸载的时候执行清除操作；

- 正如之前学到的，effect 在每次渲染的时候都会执行；

#### 用法

> 引入useEffect
>
> ```js
> //1. didMount 第二个参数传一个空数组
> useEffect(() => {}, []);
> ```
>
> ```js
> // 2. didMount + didUpdate
> useEffect(() => {}, [state | props]);
> ```
>
> ```js
> // 3. didMount + 监听所有的state和所有的props
> useEffect(() => {}); // 不传第二个参数
> ```
>
> ```js
> // 4. willUnmount
> useEffect(() => {
>   //didMount
>   // 应用 ：设置定时器
>   return () => {
>     //willUnmount
>     // 清空定时器
>   };
> }, []);
> ```

```jsx
import React, { memo, useEffect, useState } from "react";

const App = memo(() => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = count;
    console.log("监听redux");
    return () => {
      console.log("取消监听");
    };
  });
  return (
    <div>
      <h1>当前计数：{count} </h1>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
});

export default App;
```

#### 多次使用effect

Hook 允许我们按照代码的用途分离它们， 而不是像生命周期函数那样：

- React 将按照 effect 声明的顺序依次调用组件中的每一个 effect；

#### effect性能优化

默认情况下，useEffect的回调函数会在每次渲染时都重新执行，但是这会导致两个问题：

- 某些代码我们只是希望执行一次即可，类似于componentDidMount和componentWillUnmount中完成的事情；（比如网 络请求、订阅和取消订阅）；
- 另外，多次执行也会导致一定的性能问题；

我们如何决定useEffect在什么时候应该执行和什么时候不应该执行呢？

useEffect实际上有两个参数：

参数一：执行的<font color="red">回调函数</font>；

参数二：该useEffect<font color="red">在哪些state发生变化时，才重新执行</font>；（受谁的影响）

但是，如果一个函数我们不希望依赖任何的内容时，也可以<font color="red">传入一个空的数组 \[]</font>：

- 那么这里的两个回调函数分别对应的就是componentDidMount和componentWillUnmount生命周期函数了；

### useContext

用于数据共享

使用：

```jsx
// context/index
import { createContext } from "react";

const UserContext = createContext();

const ThemeContext = createContext();

export { UserContext, ThemeContext };

// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { UserContext, ThemeContext } from "./03.useContext的使用/context/index";
import App from "./03.useContext的使用/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserContext.Provider value={{ name: "cr", age: 22 }}>
    <ThemeContext.Provider value={{ color: "red", fontSize: 30 }}>
      <App />
    </ThemeContext.Provider>
  </UserContext.Provider>,
);

// App.jsx
import React, { memo, useContext } from "react";
import { UserContext, ThemeContext } from "./context/index";

const App = memo(() => {
  const user = useContext(UserContext);
  const theme = useContext(ThemeContext);
  return (
    <div>
      <h2>
        {" "}
        {user.name} - {user.age}{" "}
      </h2>
      <h3 style={{ color: theme.color, fontSize: theme.fontSize }}>theme</h3>
    </div>
  );
});

export default App;
```

### useCallback

用于性能优化

如何进行性能的优化呢？

- useCallback会<font color="red">返回一个函数的 memoized（记忆的） 值</font>；
- 在<font color="red">依赖不变的情况下，多次定义的时候，返回的值是相同的</font>；

通常使用useCallback的目的是<font color="red">不希望子组件进行多次渲染</font>，并不是为了函数进行缓存；

> 理解：
>
> 当需要将一个函数传递给子组件时，最好使用useCallback进行优化，将优化之后的函数传递给子组件

```jsx
import React, { memo, useCallback, useRef, useState } from "react";
// Home组件
const Home = memo((props) => {
  const { increament } = props;

  console.log("Home重新渲染");

  return (
    <div>
      <button onClick={increament}>home+1</button>
    </div>
  );
});

const App = memo(() => {
  const [couter, setCouter] = useState(0);

  const [msg, setMsg] = useState("hello");

  // 优化1: 注意要监听couter，否则会出现闭包陷阱，increament函数会失效
  // const increament = useCallback(() => {
  //   setCouter(couter + 1)
  //   console.log('increament');
  // }, [couter])

  // 优化2：使用useRef，在组件多次渲染时，返回的是同一个值
  const couterRef = useRef();
  couterRef.current = couter;
  const increament = useCallback(() => {
    setCouter(couterRef.current + 1);
    console.log("increament");
  }, []);

  return (
    <div>
      <h1>计数: {couter} </h1>
      <button onClick={increament}>+1</button>
      <Home increament={increament}></Home>

      <h2>msg:{msg}</h2>
      <div>
        <button onClick={() => setMsg(Math.random())}>修改msg</button>
      </div>
    </div>
  );
});

export default App;
```

### useMemo

性能优化

和useCallback的区别：

- useCallback是对传入的函数进行优化，useMemo是对函数的返回值进行优化的

```js
useCallback(fn,depc)  => useMemo(()=>fn,depc)
```

使用时机：

1.  进行大量的计算操作，是否有必须要每次渲染时都重新计算；
2.  对子组件传递相同内容的对象时，使用useMemo进行性能的优化

```jsx
import React, { memo, useMemo, useState } from "react";

const totalCount = (num) => {
  let total = 0;
  for (let i = 0; i <= num; i++) {
    total += i;
  }
  console.log("执行了");
  return total;
};

const App = memo(() => {
  const [couter, setCouter] = useState(0);
  // 不使用useMemo的话，会导致totalCount执行多次
  const resultNum = useMemo(() => {
    return totalCount(50);
  }, []);

  return (
    <div>
      <h1>计算总数：{resultNum} </h1>

      <h2>{couter}</h2>
      <button onClick={() => setCouter(couter + 1)}>+1</button>
    </div>
  );
});
export default App;
```

### useRef

useRef返回一个ref对象，返回的ref对象再组件的整个生命周期保持不变

最常用的ref是两种用法

- 引入DOM（或者组件，但是需要是class组件）元素；
- 保存一个数据，这个对象在整个生命周期中可以保存不变

```jsx
useRef: 用于得到组件中的某个DOM元素
1. 使用useRef创建用于存储input元素的容器对象(内部使用current属性存储)
2. 将ref容器通过ref属性交给表单项标签 => 渲染时内部会将对应的input元素保存到ref容器的current属性上
3. 点击提交按钮时, 通过ref容器的current属性得到input DOM元素 => 就可以读取其value了
```

```jsx
// 函数组件使用ref：forwardRef
import React, { forwardRef, memo, useRef } from "react";

const Home = memo(
  forwardRef((props, ref) => {
    return (
      <div>
        <input type="text" ref={ref} />
      </div>
    );
  }),
);

const App = memo(() => {
  const inputRef = useRef();
  const homeRef = useRef();

  const onFocus = () => {
    console.log(homeRef.current);
    homeRef.current.focus();
  };

  return (
    <div>
      <Home ref={homeRef} />
      <button onClick={onFocus}>获取焦点</button>
    </div>
  );
});

export default App;
```

### useImperativeHandle

类比vue中的defineExpose，useRef作用在子组件上后，可以拿到子组件中的所有数据，为了安全考虑使用`useImperativeHandle`

forwardRef的做法本身没有什么问题，但是我们是将子组件的DOM直接暴露给了父组件：

- 直接暴露给父组件带来的问题是某些情况的不可控；
- 父组件可以拿到DOM后进行任意的操作；
- 但是，我们只是希望父组件可以操作特定属性，其他并不希望它随意操作；

通过`useImperativeHandle`可以值暴露固定的操作

```jsx
import React, { forwardRef, memo, useImperativeHandle, useRef } from "react";

const Home = memo(
  forwardRef((props, ref) => {
    const inputRef = useRef();
    useImperativeHandle(ref, () => {
      return {
        focus() {
          inputRef.current.focus();
        },
      };
    });
    return (
      <div>
        <input type="text" ref={inputRef} />
      </div>
    );
  }),
);

const App = memo(() => {
  const homeRef = useRef();

  const onFocus = () => {
    console.log(homeRef.current);
    homeRef.current.focus();
  };

  return (
    <div>
      <Home ref={homeRef} />
      <button onClick={onFocus}>获取焦点</button>
    </div>
  );
});

export default App;
```

### useLayoutEffect

useLayoutEffect看起来和useEffect非常的相似，事实上他们也只有一点区别而已：

- useEffect会在渲染的内容更新到DOM上后执行，不会阻塞DOM的更新；

- useLayoutEffect会在渲染的内容更新到DOM上之前执行，会阻塞DOM的更新；

如果我们希望在某些操作发生之后再更新DOM，那么应该将这个操作放到useLayoutEffect。

> 官方更推荐useEffect

```jsx
import React, { memo, useEffect, useLayoutEffect, useState } from "react";

const App = memo(() => {
  const [count, setCount] = useState(100);

  // 使用useEffect修改值 会闪烁
  // useEffect(() => {
  //   if (count === 0) {
  //     setCount(Math.random() + 99)
  //   }
  // })

  useLayoutEffect(() => {
    if (count === 0) {
      setCount(Math.random() + 99);
    }
  });

  return (
    <div>
      <h2>{count}</h2>
      <button onClick={() => setCount(0)}>修改</button>
    </div>
  );
});

export default App;
```

### 自定义hook

自定义Hook本质上只是一种函数代码逻辑的抽取，严格意义上来说，它本身并不算React的特性

<font color="red">注意：使用use开头</font>

案例：获取滚动的位置

```js
import { useEffect } from "react";

const useScrollPosition = () => {
  const scrollFn = () => {
    console.log(window.scrollX, window.scrollY);
  };
  useEffect(() => {
    window.addEventListener("scroll", scrollFn);

    // 销毁时取消监听
    return () => {
      window.removeEventListener("scroll", scrollFn);
    };
  }, []);
};

export default useScrollPosition;
```
