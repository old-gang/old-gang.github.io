---
title: 邂逅鸿蒙
tags: 加油站
abbrlink: 45acc878
date: 2024-01-05 17:52:36
---

# 邂逅鸿蒙

>**DevEco-Studio快捷键**
>
>`alt + shift`：多选
>
>`ctrl + shift + ->`：同时移动
>
>`ctrl + alt + L`：格式化代码
>
>`shift + Enter`：快速跳转到下一行
>
>`ctrl + Y`：删除当前行

## 1、自定义组件

### 自定义组件的基本结构

- struct：自定义组件基于struct实现，`struct `+ `自定义`组件名 + `{...}`的组合构成自定义组件，不能有继承关系。对于struct的实例化，可以省略new。

> 说明：自定义组件名、类名、函数名不能和系统组件名相同。

- @Component：@Component装饰器仅能装饰struct关键字声明的数据结构。struct被@Component装饰后具备组件化的能力，需要实现build方法描述UI，一个struct只能被一个@Component装饰。

```js
@Component
struct MyComponent {
}
```

- build()函数：build()函数用于定义自定义组件的声明式UI描述，自定义组件必须定义build()函数。

```javascript
@Component
struct MyComponent {
  build() {
  }
}
```

- @Entry：@Entry装饰的自定义组件将作为UI页面的入口。在单个UI页面中，最多可以使用@Entry装饰一个自定义组件。@Entry可以接受一个可选的[LocalStorage](https://developer.harmonyos.com/cn/docs/documentation/doc-guides-V3/arkts-localstorage-0000001524537149-V3)的参数。

```js
@Entry
@Component
struct MyComponent {
}
```

### build()函数

所有声明在`build()`函数的语言，我们统称为UI描述，UI描述需要遵循以下规则：

- @Entry装饰的自定义组件，其==build()函数下的根节点唯一且必要，且必须为容器组件，其中ForEach禁止作为根节点。==

   @Component装饰的自定义组件，==其build()函数下的根节点唯一且必要，可以为非容器组件，其中ForEach禁止作为根节点。==

- 不允许声明本地变量，反例如下。

```js
build() {
  // 反例：不允许声明本地变量
  let a: number = 1;
}
```

- 不允许在UI描述里直接使用console.info，但允许在方法或者函数里使用，反例如下。

```js
build() {
  // 反例：不允许console.info
  console.info('print debug log');
}
```

- 不允许创建本地的作用域，反例如下。

```js
build() {
  // 反例：不允许本地作用域
  {
    ...
  }
}
```

- 不允许调用没有用@Builder装饰的方法，允许系统组件的参数是TS方法的返回值。

```js
@Component
struct ParentComponent {
  doSomeCalculations() {
  }

  calcTextValue(): string {
    return 'Hello World';
  }

  @Builder doSomeRender() {
    Text(Hello World)
  }

  build() {
    Column() {
      // 反例：不能调用没有用@Builder装饰的方法
      this.doSomeCalculations();
      // 正例：可以调用
      this.doSomeRender();
      // 正例：参数可以为调用TS方法的返回值
      Text(this.calcTextValue())
    }
  }
}
```

- ==不允许switch语法，如果需要使用条件判断，请使用if。==反例如下。

```js
build() {
  Column() {
    // 反例：不允许使用switch语法
    switch (expression) {
      case 1:
        Text('...')
        break;
      case 2:
        Image('...')
        break;
      default:
        Text('...')
        break;
    }
  }
}
```

- 不允许使用表达式，反例如下。

```js
build() {
  Column() {
    // 反例：不允许使用表达式
    (this.aVar > 10) ? Text('...') : Image('...')
  }
}
```

## @Builder装饰器：自定义组件构建函数

### 自定义组件内自定义构建函数

定义的语法：

```js
@Builder MyBuilderFunction({ ... })
```

使用方法：

```js
this.MyBuilderFunction({ ... })
```

- 允许在自定义组件内定义一个或多个`@Builder`方法，该方法被认为是该组件的私有、特殊类型的成员函数。
- 自定义构建函数可以在所属组件的`build方`法和其他自定义构建函数中调用，但不允许在组件外调用。
- 在自定义函数体中，this指代当前所属组件，组件的状态变量可以在自定义构建函数内访问。建议通过this访问自定义组件的状态变量而不是参数传递。

### 全局自定义构建函数

定义的语法：

```js
@Builder function MyGlobalBuilderFunction({ ... })
```

使用方法：

```js
MyGlobalBuilderFunction()
```

- 全局的自定义构建函数可以被整个应用获取，不允许使用`this`和`bind`方法。
- 如果不涉及组件状态变化，建议使用全局的自定义构建方法。

## @Styles装饰器：定义组件重用样式

@Styles装饰器可以将多条样式设置提炼成一个方法，直接在组件声明的位置调用。通过@Styles装饰器可以快速定义并复用自定义样式。用于快速定义并复用自定义样式。

#### 装饰器使用说明

- 当前@Styles仅支持通用属性和通用事件。
- <font color='red'>@Styles方法不支持参数</font>，反例如下。


```js
// 反例： @Styles不支持参数
@Styles function globalFancy (value: number) {
  .width(value)
}
```

- @Styles可以定义在组件内或全局，在全局定义时需在方法名前面添加function关键字，组件内定义时则不需要添加function关键字。

```js
// 全局
@Styles function functionName() { ... }

// 在组件内
@Component
struct FancyUse {
  @Styles fancy() {
    .height(100)
  }
}
```

- 定义在组件内的@Styles可以通过this访问组件的常量和状态变量，并可以在@Styles里通过事件来改变状态变量的值，示例如下：

```js
@Component
struct FancyUse {
  @State heightValue: number = 100
  @Styles fancy() {
    .height(this.heightValue)
    .backgroundColor(Color.Yellow)
    .onClick(() => {
      this.heightValue = 200
    })
  }
}
```

- 组件内@Styles的优先级高于全局@Styles。
- 框架优先找当前组件内的@Styles，如果找不到，则会全局查找。

## @Extend装饰器：定义扩展组件样式

在@Styles的基础上，我们提供了@Extend，用于扩展原生组件样式。

### 语法

```js
@Extend(UIComponentName) function functionName { ... }
```

### 使用规则

- 和@Styles不同，<font color='red'>@Extend仅支持定义在全局，不支持在组件内部定义。</font>
- 和@Styles不同，@Extend支持封装指定的组件的私有属性和私有事件和预定义相同组件的@Extend的方法。

```js
// @Extend(Text)可以支持Text的私有属性fontColor
@Extend(Text) function fancy () {
  .fontColor(Color.Red)
}
// superFancyText可以调用预定义的fancy
@Extend(Text) function superFancyText(size:number) {
    .fontSize(size)
    .fancy()
}
```

- 和@Styles不同，<font color='red'>@Extend装饰的方法支持参数</font>，开发者可以在调用时传递参数，调用遵循TS方法传值调用。

```js
// xxx.ets
@Extend(Text) function fancy (fontSize: number) {
  .fontColor(Color.Red)
  .fontSize(fontSize)
}

@Entry
@Component
struct FancyUse {
  build() {
    Row({ space: 10 }) {
      Text('Fancy')
        .fancy(16)
      Text('Fancy')
        .fancy(24)
    }
  }
}
```

- @Extend装饰的方法的<font color='red'>参数可以为function，作为Event事件的句柄。</font>

```js
@Extend(Text) function makeMeClick(onClick: () => void) {
  .backgroundColor(Color.Blue)
  .onClick(onClick)
}

@Entry
@Component
struct FancyUse {
  @State label: string = 'Hello World';

  onClickHandler() {
    this.label = 'Hello ArkUI';
  }

  build() {
    Row({ space: 10 }) {
      Text(${this.label})
        .makeMeClick(this.onClickHandler.bind(this))
    }
  }
}
```

- @Extend的参数可以为状态变量，当状态变量改变时，UI可以正常的被刷新渲染。

```js
@Extend(Text) function fancy (fontSize: number) {
  .fontColor(Color.Red)
  .fontSize(fontSize)
}

@Entry
@Component
struct FancyUse {
  @State fontSizeValue: number = 20
  build() {
    Row({ space: 10 }) {
      Text('Fancy')
        .fancy(this.fontSizeValue)
        .onClick(() => {
          this.fontSizeValue = 30
        })
    }
  }
}
```

## stateStyles：多态样式

@Styles和@Extend仅仅应用于静态页面的样式复用，stateStyles可以依据组件的内部状态的不同，快速设置不同样式。这就是我们本章要介绍的内容stateStyles（又称为：多态样式）。

### 概述

stateStyles是属性方法，可以根据UI内部状态来设置样式，类似于css伪类，但语法不同。ArkUI提供以下四种状态：

- focused：获焦态。
- normal：正常态。
- pressed：按压态。
- disabled：不可用态。

> 按钮、输入框放在第一个时，会默认获取焦点

```js
/*
 * stateStyles()其实是一个属性方法。属性为一个对象（多个状态为键，状态样式为对应的值）
 * 第一个元素默认获焦
 * - focused：获焦态。
  - normal：正常态。
  - pressed：按压态。
  - disabled：不可用态。
 * */
@Entry
@Component
struct StateStylesFun {
  @State message: string = 'stateStyles属性方法'

  build() {
    Row() {
      Column() {
        // Button('哥们，我先来的。焦点在我这呢。')
        // 临时加个输入框，获焦效果更明显
        TextInput()
          .border({ color: Color.Orange, width: 2 })
          .margin(20)
        Button(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .stateStyles({
            focused: {
              .backgroundColor(Color.Red)
            },
            normal: {
              .backgroundColor(Color.Green)
            },
            pressed: {
              .backgroundColor(Color.Blue)
            }
          })
      }
      .width('100%')
    }
    .height('100%')
  }
}
```

## 状态管理

- @State：@State装饰的变量拥有其所属组件的状态，可以作为其子组件单向和双向同步的数据源。当其数值改变时，会引起相关组件的渲染刷新。
- @Prop：@Prop装饰的变量可以和父组件建立单向同步关系，@Prop装饰的变量是可变的，但修改不会同步回父组件。
- @Link：@Link装饰的变量和父组件构建双向同步关系的状态变量，父组件会接受来自@Link装饰的变量的修改的同步，父组件的更新也会同步给@Link装饰的变量。
- @Provide/@Consume：@Provide/@Consume装饰的变量用于跨组件层级（多层组件）同步状态变量，可以不需要通过参数命名机制传递，通过alias（别名）或者属性名绑定。
- @Observed：@Observed装饰class，需要观察多层嵌套场景的class需要被@Observed装饰。单独使用@Observed没有任何作用，需要和@ObjectLink、@Prop连用。
- @ObjectLink：@ObjectLink装饰的变量接收@Observed装饰的class的实例，应用于观察多层嵌套场景，和父组件的数据源构建双向同步。

### @State----->@Prop 和 @State  <-----> @Link

- 驱动build()更新
- @State  ---> @Prop (`this.`进行传参)，单向
- @State  <--> @Link(传参使用$)，<font color='red'>双向</font>

```typescript
@Entry
@Component
struct StateMgn {
  // @State 必须初始化
  @State name: string = '小储'

  build() {
    Row() {
      Column() {
        Text(this.name).StateMgn_TextSty()
        Button('点我')
          .StateMgn_BtnSty(() => {
            this.name = this.name === '小储' ? '大储' : '小储'
          })
        Divider()

      //   prop组件
        StateMgn_prop({content:this.name})
      //   link
        Divider()
        StateMgn_link({content_link:$name})
      }
      .width('100%')
    }
    .height('100%')
  }
}

// prop单向数据流
@Component
struct StateMgn_prop {
 //  prop修饰的数据，不能初始化
 @Prop content: string
  build() {
    Column() {
      Text(this.content).StateMgn_TextSty()
      Button('修改prop').StateMgn_BtnSty(() => {
        this.content = 'HarmonyOS 4.0'
      })
    }
  }
}

// link双向数据流
@Component
struct StateMgn_link {
  @Link content_link:string
  build() {
    Column(){
      Text(this.content_link).StateMgn_TextSty()
      Button('修改：' + 'link').StateMgn_BtnSty(() => {
        this.content_link = 'arkTs'
      })
    }
  }
}

//封装公共样式
@Extend(Text) function StateMgn_TextSty() {
  .fontSize(30)
  .fontWeight(FontWeight.Bold)
  .fontColor(Color.Green)
}

@Extend(Button) function StateMgn_BtnSty(click:Function){
  .fontSize(30)
  .onClick(() => {
    click()
  })
}
```

### @Provide装饰器和@Consume装饰器：与后代组件双向同步

@Provide和@Consume，应用于与后代组件的双向数据同步，应用于状态数据在多个层级之间传递的场景。不同于上文提到的父子组件之间通过命名参数机制传递，@Provide和@Consume摆脱参数传递机制的束缚，==实现跨层级传递。==

其中@Provide装饰的变量是在祖先节点中，可以理解为被“提供”给后代的状态变量。@Consume装饰的变量是在后代组件中，去“消费（绑定）”祖先节点提供的变量。

@Provide/@Consume装饰的状态变量有以下特性：

- @Provide装饰的状态变量自动对其所有后代组件可用，即该变量被“provide”给他的后代组件。由此可见，@Provide的方便之处在于，开发者不需要多次在组件之间传递变量。
- 后代通过使用@Consume去获取@Provide提供的变量，建立在@Provide和@Consume之间的双向数据同步，与@State/@Link不同的是，前者可以在多层级的父子组件之间传递。
- @Provide和@Consume可以通过==相同的变量名==或者==相同的变量别名==绑定，变量类型必须相同。

@Provide和@Consume通过相同的变量名或者相同的变量别名绑定时，@Provide修饰的变量和@Consume修饰的变量是一对多的关系。不允许在同一个自定义组件内，包括其子组件中声明**多个同名或者同别名的**@Provide装饰的变量。

```javascript
@Entry
@Component
struct ProvideConsume {
  @Provide('theshy') wechat: string = '微信公众号'

  build() {
    Row() {
      Column({ space: 20 }) {
        Text(this.wechat).ProvideConsume_textStyle()
          .onClick(() => {
            this.wechat = '不多讲故事'
          })
        Divider()
        // 父调用子。
        ProvideConsume_son()
      }.width('100%')
    }.height('100%')
  }
}

@Component
struct ProvideConsume_son {
  build() {
    Column({ space: 20 }) {
      Text('子组件的布局内容:').ProvideConsume_textStyle()
      Divider()
      // 调用孙组件
      ProvideConsume_sun()
    }
  }
}

@Component
struct ProvideConsume_sun {
  @Consume('theshy') study: string

  build() {
    Column() {
      Text('孙:' + this.study).ProvideConsume_textStyle()
        .onClick(() => {
          this.study = 'HarmonyOS4.0'
        })
    }
  }
}

@Extend(Text) function ProvideConsume_textStyle() {
  .fontSize(30)
  .fontWeight(700)
}
```

### @Watch装饰器：状态变量更改通知

@Watch应用于对状态变量的监听。如果开发者需要关注某个状态变量的值是否改变，可以使用@Watch为状态变量设置回调函数。

@Watch用于监听状态变量的变化，当状态变量变化时，@Watch的回调方法将被调用。@Watch在ArkUI框架内部判断数值有无更新使用的是严格相等（===），遵循严格相等规范。当在严格相等为false的情况下，就会触发@Watch的回调。

#### 装饰器说明

| **@Watch补充变量装饰器** | **说明**                                                     |
| ------------------------ | ------------------------------------------------------------ |
| 装饰器参数               | 必填。常量字符串，字符串需要有引号。是(string) => void自定义成员函数的方法的引用。 |
| 可装饰的自定义组件变量   | 可监听所有装饰器装饰的状态变量。不允许监听常规变量。         |
| 装饰器的顺序             | 建议@State、@Prop、@Link等装饰器在@Watch装饰器之前。         |

### 语法说明

| **类型**                                | **说明**                                                     |
| --------------------------------------- | ------------------------------------------------------------ |
| (changedPropertyName? : string) => void | 该函数是自定义组件的成员函数，changedPropertyName是被watch的属性名。在多个状态变量绑定同一个@Watch的回调方法的时候，可以通过changedPropertyName进行不同的逻辑处理将属性名作为字符串输入参数，不返回任何内容。 |

### 观察变化和行为表现

1. 当观察到状态变量的变化（包括双向绑定的AppStorage和LocalStorage中对应的key发生的变化）的时候，对应的@Watch的回调方法将被触发；
2. @Watch方法在自定义组件的属性变更之后同步执行；
3. <font color='red'>如果在@Watch的方法里改变了其他的状态变量，也会引起状态变更和@Watch的执行；</font>
4. <font color='red'>在第一次初始化的时候，@Watch装饰的方法不会被调用，即认为初始化不是状态变量的改变。</font>只有在后续状态改变时，才会调用@Watch回调方法。

### 限制条件

- 建议开发者避免无限循环。循环可能是因为在@Watch的回调方法里直接或者间接地修改了同一个状态变量引起的。为了避免循环的产生，建议<font color='red'>不要在@Watch的回调方法里修改当前装饰的状态变量；</font>
- 开发者应关注性能，属性值更新函数会延迟组件的重新渲染（具体请见上面的行为表现），因此，回调函数应仅执行快速运算；
- <font color=red>不建议在@Watch函数中调用async await，因为@Watch设计的用途是为了快速的计算，异步行为可能会导致重新渲染速度的性能问题。</font>

```js
/*
 * @Watch 修饰  状态数据
 *  函数中，不要不要不要修改被监视的状态变量。 我们要操作的是其他的业务逻辑
 * */
@Entry
@Component
struct WatchDct {
  @State @Watch('change') count: number = 1
  @State @Watch('change') pow: number = 2
  @State res: number = 1

  change() {
    // this.count = this.count + 2  无限循环
    this.res = Math.pow(this.count, this.pow)
  }

  build() {
    Row() {
      Column() {
        Text('基数：' + this.count)
          .fontSize(50)
          .onClick(() => {
            this.count++
          })

        Divider()
        Text(`次幂：${this.pow}`)
          .fontSize(50)
          .onClick(() => {
            this.pow++
          })

        Divider()
        Text("结果：" + this.res)
          .fontSize(50)
      }
      .width('100%')
    }
    .height('100%')
  }
}
```

## 渲染控制

### 条件渲染

- 支持if、else和else if语句。
- if、else if后跟随的条件语句可以使用状态变量。
- 允许在容器组件内使用，通过条件渲染语句构建不同的子组件。
- 当if、else if后跟随的状态判断中使用的状态变量值变化时，条件渲染语句会进行更新
- 条件可以包括Typescript表达式。

```js
if(条件表达式){
  组件内容1
}else{
  组件内容2
}
```

案例

> 可选参数的写法

```js
/*
 * 分支渲染
 * */
@Entry
@Component
struct Branch {
  @State isStudy: boolean = false

  build() {
    Row() {
      Column() {
        Button('toggle').fontSize(50).margin({ top: 20 })
          .onClick(() => {
            this.isStudy = !this.isStudy
          })
        if (this.isStudy) {
          Branch_Comp({ content: '学习鸿蒙之前', src: $r("app.media.beforeDixin") })
        } else {
          Branch_Comp({ content: '学习鸿蒙之后', src: $r("app.media.afterDixin") })
        }
      }
      .width('100%')
    }
    .height('100%')
  }
}

@Component
struct Branch_Comp {
  content: string
  src: Resource

  build() {
    Column() {
      Text(this.content)
        .fontSize(50)
        .margin({ top: 30 })
      Image(this.src)
        .objectFit(ImageFit.Auto)
    }
  }
}
```

### ForEach：循环渲染

ForEach接口基于数组类型数据来进行循环渲染，需要与容器组件配合使用，且接口返回的组件应当是允许包含在ForEach父容器组件中的子组件。

#### 接口描述

```js
ForEach(
  arr: Array,
  itemGenerator: (item: Array, index?: number) => void,
  keyGenerator?: (item: Array, index?: number): string => string
)
```

| **参数名**    | **参数类型**                          | **必填** | **参数描述**                                                 |
| ------------- | ------------------------------------- | -------- | ------------------------------------------------------------ |
| arr           | Array                                 | 是       | 数据源，为Array类型的数组。<br />**说明**：<br />- 可以设置为空数组，此时不会创建子组件。<br />- 可以设置返回值为数组类型的函数，例如arr.slice(1, 3)，但设置的函数不应改变包括数组本身在内的任何状态变量，例如不应使用Array.splice(),Array.sort()或Array.reverse()这些会改变原数组的函数。 |
| itemGenerator | (item: any, index?: number) => void   | 是       | 组件生成函数。<br />- 为数组中的每个元素创建对应的组件。<br />- item参数：arr数组中的数据项。<br />- index参数（可选）：arr数组中的数据项索引。<br />**说明**：<br />- 组件的类型必须是ForEach的父容器所允许的。例如，ListItem组件要求ForEach的父容器组件必须为List组件。 |
| keyGenerator  | (item: any, index?: number) => string | 否       | 键值生成函数。<br />- 为数据源arr的每个数组项生成唯一且持久的键值。函数返回值为开发者自定义的键值生成规则。<br />- item参数：arr数组中的数据项。<br />- index参数（可选）：arr数组中的数据项索引。<br />**说明**：<br />- 如果函数缺省，框架默认的键值生成函数为<br />``` (item: T, index: number) => { return index + '__' + JSON.stringify(index); }```<br />- 键值生成函数不应改变任何组件状态。 |

<font color=red>**键值生成函数。返回值要确保唯一！！！很重要。**</font>

> 如果不唯一，则相同的组件不会渲染出来

## 生命周期

### 应用生命周期

> src/main/ets/entryability/EntryAbility.ts 在这个页面中

```js
// Create状态，在UIAbility实例创建时触发，系统会调用onCreate回调。可以在onCreate回调中进行相关初始化操作。
onCreate(want, launchParam) {
  //例如用户打开电池管理应用，在应用加载过程中，在UI页面可见之前，可以在onCreate回调中读取当前系统的电量情况，用于后续的UI页面展示。
}

// 可以在onWindowStageCreate回调中，设置UI页面加载、设置WindowStage的事件订阅。
onWindowStageCreate(windowStage: window.WindowStage) {
  // 在onWindowStageCreate(windowStage)中通过loadContent接口设置应用要加载的页面
  windowStage.loadContent('pages/Index', (err, data) => {
  });
}
// onBackground回调，在UIAbility的UI页面完全不可见之后，即UIAbility切换至后台时候触发。
// 可以在onBackground回调中释放UI页面不可见时无用的资源，或者在此回调中执行较为耗时的操作，例如状态保存等。
onBackground() {
  // 当地图应用切换到后台状态，可以在onBackground回调中停止定位功能，以节省系统的资源消耗。
}
// onForeground回调，在UIAbility的UI页面可见之前，即UIAbility切换至前台时触发。
// 可以在onForeground回调中申请系统需要的资源，或者重新申请在onBackground中释放的资源。
onForeground() {
}
// 在UIAbility实例销毁之前，则会先进入onWindowStageDestroy回调，我们可以在该回调中释放UI页面资源。
onWindowStageDestroy() {
}
// 在UIAbility销毁时触发。可以在onDestroy回调中进行系统资源的释放、数据的保存等操作。
onDestroy() {
}
```

### 页面和自定义组件生命周期

页面生命周期，即被@Entry装饰的组件生命周期，提供以下生命周期接口：

- [onPageShow](https://developer.harmonyos.com/cn/docs/documentation/doc-references-V3/arkts-custom-component-lifecycle-0000001482395076-V3#ZH-CN_TOPIC_0000001523488850__onpageshow)：页面每次显示时触发。
- [onPageHide](https://developer.harmonyos.com/cn/docs/documentation/doc-references-V3/arkts-custom-component-lifecycle-0000001482395076-V3#ZH-CN_TOPIC_0000001523488850__onpagehide)：页面每次隐藏时触发一次。
- [onBackPress](https://developer.harmonyos.com/cn/docs/documentation/doc-references-V3/arkts-custom-component-lifecycle-0000001482395076-V3#ZH-CN_TOPIC_0000001523488850__onbackpress)：当用户点击返回按钮时触发。<font color=red>（是手机下方的返回按钮，不是页面的路由返回）</font>

组件生命周期，即一般用@Component装饰的自定义组件的生命周期，提供以下生命周期接口：

- [aboutToAppear](https://developer.harmonyos.com/cn/docs/documentation/doc-references-V3/arkts-custom-component-lifecycle-0000001482395076-V3#ZH-CN_TOPIC_0000001523488850__abouttoappear)：组件即将出现时回调该接口，具体时机为在创建自定义组件的新实例后，在执行其build()函数之前执行。
- [aboutToDisappear](https://developer.harmonyos.com/cn/docs/documentation/doc-references-V3/arkts-custom-component-lifecycle-0000001482395076-V3#ZH-CN_TOPIC_0000001523488850__abouttodisappear)：在自定义组件即将析构销毁时执行。

### 数据传递

- 页面跳转，使用路由传递。

```js
//pages/LifeCycle1
router.pushUrl({
  url: 'pages/LifeCycle2',
  params: {
    name : 'HarmonyOS4.0',
    age : 20
  }
})
//pages/LifeCycle2
let name = router.getParams()['name']
```

- 应用间数据数据共享：<font color=red>**预览器不行**</font>

```js
// 应用下 ets/entryability/Enterability.ts
AppStorage.SetOrCreate('appName','诗词学习')
// 应用下某个需要用到的页面
let appName =  AppStorage.Get('appName') as string
```

## 组件

### 组件通用信息

#### 通用事件

- 点击事件

组件被点击时触发的事件。

```js
// 点击动作触发该回调
onClick(event: (event?: ClickEvent) => void)
```

- 触摸事件

当手指在组件上按下、滑动、抬起时触发。

```js
// 手指触摸动作触发该回调
onTouch(event: (event?: TouchEvent) => void)
```

- 按键事件

按键事件指组件与键盘、遥控器等按键设备交互时触发的事件（仅适用于所有可获焦组件，例如 Button）。

```js
// 绑定该方法的组件获焦后，按键动作触发该回调
onKeyEvent(event: (event?: KeyEvent) => void)
```

#### 通用属性

- 尺寸设置

用于设置组件的宽高、边距。

`margin  padding  border`

- 位置设置

设置组件的对齐方式、布局方向和显示位置。

align: 设置元素内容在元素绘制区域内的对齐方式。

direction: 设置元素水平方向的布局。

position：设置子组件左上角相对于父组件左上角的偏移位置

markAnchor：相对于起点偏移，其中x为最终定位点距离起点水平方向间距，x>0往左，反之向右。y为最终定位点距离起点垂直方向间距，y>0向上，反之向下（要写在`Stack`里）

offset：相对定位，x>0向右偏移，反之向左，y>0向下偏移，反之向上

<img src="http://clx-dev.oss-cn-beijing.aliyuncs.com/msl/common/test/png/20240113/pdRGehSW4EHtvEs4.png" style="zoom:50%;" />

```js
@Entry
@Component
struct PositionExample {
  build() {
    Column({ space: 10 }) {
      // 元素内容<元素宽高，设置内容在元素内的对齐方式
      Text("align:").fontSize(26).fontColor(0x3E3E3E).width('90%')
      Stack() {
        Text('First').height('65%').backgroundColor(0xD2B48C)
        Text('Second').backgroundColor(0xF5DEB3).opacity(0.9)
      }
      .width('90%')
      .height(50)
      .margin({ top: 5 })
      .backgroundColor(0xFFE4C4)
      .align(Alignment.TopStart)

      // 父容器设置direction为Direction.Ltr，子元素从左到右排列
      Text('direction').fontSize(26).fontColor(0x3E3E3E).width('90%')
      Row() {
        Text('1').height(50).width('25%').fontSize(16).backgroundColor(0xF5DEB3)
        Text('2').height(50).width('25%').fontSize(16).backgroundColor(0xD2B48C)
        Text('3').height(50).width('25%').fontSize(16).backgroundColor(0xF5DEB3)
        Text('4').height(50).width('25%').fontSize(16).backgroundColor(0xD2B48C)
      }
      .width('90%')
      .direction(Direction.Ltr)

      // 设置子组件左上角相对于父组件左上角的偏移位置
      Text('position').fontSize(26).fontColor(0x3E3E3E).width('90%')
      Row() {
        Text('1').size({ width: '30%', height: '50' }).backgroundColor(0xdeb887).border({ width: 1 }).fontSize(16)
        Text('2 position(30, 10)')
          .size({ width: '60%', height: '30' })
          .backgroundColor(0xbbb2cb)
          .border({ width: 1 })
          .fontSize(16)
          .align(Alignment.Start)
          .position({ x: 30, y: 10 })
        Text('3').size({ width: '45%', height: '50' }).backgroundColor(0xdeb887).border({ width: 1 }).fontSize(16)
        Text('4 position(50%, 70%)')
          .size({ width: '50%', height: '50' })
          .backgroundColor(0xbbb2cb)
          .border({ width: 1 })
          .fontSize(16)
          .position({ x: '50%', y: '70%' })
      }.width('90%').height(100).border({ width: 1, style: BorderStyle.Dashed })

      // 相对于起点偏移，其中x为最终定位点距离起点水平方向间距，x>0往左，反之向右。
      // y为最终定位点距离起点垂直方向间距，y>0向上，反之向下
      Text('markAnchor').fontSize(26).fontColor(0x3E3E3E).width('90%')
      Stack({ alignContent: Alignment.TopStart }) {
        Row()
          .size({ width: '100', height: '100' })
          .backgroundColor(0xdeb887)
        Text('1')
          .size({ width: 25, height: 25 })
          .backgroundColor(Color.Green)
          .markAnchor({ x: 25, y: 25 })
        Text('2')
          .size({ width: 25, height: 25 })
          .backgroundColor(Color.Yellow)
          .markAnchor({ x: -100, y: -25 })
        Text('3')
          .size({ width: 25, height: 25 })
          .backgroundColor(Color.Gray)
          .markAnchor({ x: 25, y: -25 })
      }.margin({ top: 25 }).border({ width: 1, style: BorderStyle.Dashed })

      // 相对定位，x>0向右偏移，反之向左，y>0向下偏移，反之向上
      Text('offset').fontSize(26).fontColor(0x3E3E3E).width('90%')
      Row() {
        Text('1').size({ width: '15%', height: '50' }).backgroundColor(0xdeb887).border({ width: 1 }).fontSize(16)
        Text('2  offset(15, 30)')
          .size({ width: 120, height: '50' })
          .backgroundColor(0xbbb2cb)
          .border({ width: 1 })
          .fontSize(16)
          .align(Alignment.Start)
          .offset({ x: 15, y: 30 })
        Text('3').size({ width: '15%', height: '50' }).backgroundColor(0xdeb887).border({ width: 1 }).fontSize(16)
        Text('4 offset(-10%, 20%)')
          .size({ width: 100, height: '50' })
          .backgroundColor(0xbbb2cb)
          .border({ width: 1 })
          .fontSize(16)
          .offset({ x: '-5%', y: '20%' })
      }.width('90%').height(100).border({ width: 1, style: BorderStyle.Dashed })
    }
    .width('100%').margin({ top: 5 })
  }
}
```

### 基础组件

- 按钮组件

```js
// 方法1： stateEffect：按下是否有动画
Button(options?: {type?: ButtonType, stateEffect?: boolean})
// 方法2： 
Button(label?: ResourceStr, options?: { type?: ButtonType, stateEffect?: boolean })
```

实例

```js
// 方法1：
Button('OK', { type: ButtonType.Normal, stateEffect: true })

// 方法2：
Button({ type: ButtonType.Capsule }) {
  Row() {
    LoadingProgress()
      .width(20)
      .height(20)
      .color(Color.White)
    Text('储锐')
      .fontColor(Color.White)
      .fontSize(20)
      .margin({left:10})
  }
}.width(150).height(50)
```



- checkbox

提供多选框组件，通常用于某选项的打开或关闭。

```js
Checkbox(options?: {name?: string, group?: string })
```

[官网](https://developer.harmonyos.com/cn/docs/documentation/doc-references-V3/ts-basic-components-checkbox-0000001427744808-V3)
