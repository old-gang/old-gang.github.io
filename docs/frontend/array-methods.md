---
title: 数组的常用方法
abbrlink: aa760b4
date: 2022-07-12 14:32:07
tags: web前端
---

# 数组的常用方法

### at()

接收一个整数值并返回该索引的项目，允许正数和负数。

语法：`at(index)`

参数：`index`

描述：

​	要返回的数组元素的索引（位置）。当传递负数时，支持从数组末端开始的相对索引；也就是说，如果使用负数，返回的元素将从数组的末端开始倒数。

返回值：

​	匹配给定索引的数组中的元素。如果找不到指定的索引，则返回undefined

用法示例：

```js
// 数组及数组元素。
const colors = ['red', 'green', 'blue'];

// 使用长度属性。
const lengthWay = colors[colors.length-2];
console.log(lengthWay); // 'green'

// 使用 slice() 方法。注意会返回一个数组。
const sliceWay = colors.slice(-2, -1);
console.log(sliceWay[0]); // 'green'

// 使用 at() 方法。
const atWay = colors.at(-2);
console.log(atWay); // 'green'
```



### concat()

方法用于合并两个或多个数组。==此方法不会更改现有数组==，而是返回一个新数组。

语法：`concat(valueN)`

描述：

​	数组和/或值，将被合并到一个新的数组中。如果省略了所有 `valueN` 参数，则 `concat` 会返回调用此方法的现存数组的一个浅拷贝

返回值：

​	新的Array实例

用法示例:

```js
const num1 = [[1]];
const num2 = [2, [3]];

const numbers = num1.concat(num2);

console.log(numbers);
// results in [[1], 2, [3]]

// 修改 num1 的第一个元素
num1[0].push(4);

console.log(numbers);
// results in [[1, 4], 2, [3]]
```



### every()

- 测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。

- `every` 方法为数组中的每个元素执行一次 `callback` 函数，直到它找到一个会使 `callback` 返回 false 的元素。如果发现了一个这样的元素，`every` 方法将会立即返回 `false`。否则，`callback` 为每一个元素返回 `true`，`every` 就会返回 `true`。
- `callback` 只会为那些已经被赋值的索引调用。不会为那些被删除或从未被赋值的索引调用。

> 注意：若收到一个空数组，此方法在任何情况下都会返回 `true`。

语法：`every(callback)`

参数：

- `callback` 用来测试每个元素的函数，它可以接收三个参数
  - 数组中当前正在处理的元素
  - index
  - 数组本身

返回值：

​	如果回调函数的每一次返回都为 true 值，返回 **`true`**，否则返回 **`false`**。

用法示例：

```js
let arr = [1, 30, 39, 29, 10, 13]
let result = arr.every(item => item < 40)
console.log(result) //true
```



### some()

测试数组中是不是至少有 1 个元素通过了被提供的函数测试。它返回的是一个 Boolean 类型的值。

> 注意： 如果用一个空数组进行测试，在任何情况下它返回的都是`false`。

语法：`some(callback)`

参数：

- `callback` 用来测试每个元素的函数，它可以接收三个参数
  - 数组中当前正在处理的元素
  - index
  - 数组本身

返回值：有一个通过，返回true，所有的元素都没有通过，返回false

用法示例：

```js
const array = [1, 2, 3, 4, 5];

const even = (element) => element % 2 === 0;

console.log(array.some(even)) //true
```



### filter()

- `filter()` 为数组中的每个元素调用一次 `callbackFn` 函数，并利用所有使得 `callbackFn` 返回 true 或等价于 true 的值的元素创建一个新数组。
- `callbackFn` 只会在已经赋值的索引上被调用，对于那些已经被删除或者从未被赋值的索引不会被调用。

语法：`filter(callback)`

参数：

- `callback`用来测试数组中每个元素的函数。返回 `true` 表示该元素通过测试，保留该元素，`false` 则不保留。它可以接收三个参数
  - 数组中当前正在处理的元素
  - index
  - 原数组

返回值：

​	一个新的、由通过测试的元素组成的==数组==

用法示例：

```js
let arr = [1, 30, 39, 29, 10, 13]
let result = arr.filter(item => item > 10)
console.log(result) //[30, 39, 29, 13]
```



### find()

返回数组中满足提供的测试函数的第一个元素的值。否则返回undefined

语法：`find(callback)`

参数：

- callback：在数组每一项上执行的函数，接收 3 个参数：
  - 当前遍历到的元素
  - 当前遍历到的索引
  - 当前数组本身

返回值：

​	返回数组中满足提供的测试函数的第一个元素的==值==。否则返回undefined

用法示例：

```js
let arr = [
  { name: 'apples', quantity: 2 },
  { name: 'bananas', quantity: 0 },
  { name: 'cherries', quantity: 5 },
]
let result = arr.find(item => {
  return item.name === 'cherries'
})
console.log(result) //{name: 'cherries', quantity: 5}
```



### findIndex()

返回数组中满足提供的测试函数的第一个元素的==索引==。若没有找到对应元素则返回-1。

> `find()` 返回的是数组中的值，而不是索引

语法：`findIndex(callback)`

参数：

- `callback` 针对数组中的每个元素，都会执行该回调函数，传入三个参数
  - 当前元素
  - 索引
  - 数组本身

返回值：

​	数组中通过提供测试函数的第一个元素的**索引**。否则，返回-1

用法示例：

```js
let arr = [4, 6, 7, 12]
let result = arr.findIndex(item => item % 2 !== 0)
console.log(result) //2
```



### includes()

用来判断一个数组是**否包含一个指定的值**，根据情况，如果包含则返回 `true`，否则返回 `false`。

语法：`includes(查找的值)`

参数：

- 参数1：查找的值
- 参数2：开始查找的索引(可选)
  - 支持负数,例如-2，则从倒数两个开始往后寻找

用法示例：

```js
let arr = [1, 2, 3]
console.log(arr.includes(2)) // true
console.log(arr.includes(4)) // false
console.log(arr.includes(3, 3)) // false
console.log(arr.includes(3, -1)) // true
```



### indexOf()

返回在数组中可以找到给定元素的**第一个索引**，如果不存在，则返回 -1。

语法：`indexOf(查找的值)`

> findIndex()，需要一个回调函数





### lastIndexOf()

方法返回指定元素（也即有效的 JavaScript 值或变量）在数组中的最后一个的索引，如果不存在则返回 -1。从数组的后面向前查找

语法：`lastIndexOf(查找的值，开始的索引)`

返回值：数组中该元素最后一次出现的索引，如未找到返回-1

用法示例：

```js
const animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo'];
console.log(animals.lastIndexOf('Dodo')) //3
```



#### 总结：

- find: 返回的是第一个复合要求的数组中的元素,没有则返回undefined
- findIndex：返回的是符合要求的第一个索引值，没有则返回-1
- includes：返回的是布尔值，没有则返回false
- indexOf：返回的是符合要求的第一个索引，没有则返回-1
- lastIndexOf: 返回的是指定元素的最后一个索引，没有则返回-1

> 查找数组中是否含有某个值：includes 或 indexOf
>
> 数组中的值是否符合某个条件：find 或 findIndex

### flat()

数组扁平化;移除数组中的空项

语法：`flat(depth)`

参数：

​	depth：(可选)指定要提取嵌套数组的结构深度，默认值为 1。使用 `Infinity`，可展开任意深度的嵌套数组

返回值：

​	一个包含将数组与子数组中所有元素的**新数组**。

用法示例：

```js
      var arr1 = [1, 2, [3, 4]]
      arr1.flat() // [1, 2, 3, 4]

      var arr2 = [1, 2, [3, 4, [5, 6]]]
      arr2.flat() // [1, 2, 3, 4, [5, 6]]

      var arr3 = [1, 2, [3, 4, [5, 6]]]
      arr3.flat(2) // [1, 2, 3, 4, 5, 6]

      //使用 Infinity，可展开任意深度的嵌套数组
      var arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]]
      arr4.flat(Infinity)
      // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

      var arr4 = [1, 2, , 4, 5]
      arr4.flat() // [1, 2, 4, 5]
```



### forEach()

对数组的每个元素执行一次给定的函数。

语法：`forEach(callback)`

参数：

- `callback` 数组中每个元素执行的函数,接收三个参数
  - 当前元素
  - 索引
  - 数组本身

返回值：`undefined` 

用法示例：

```js
const array1 = ['a', 'b', 'c']
array1.forEach(element => console.log(element)) //a b c
```



### Array.from()

对一个**类似数组**或**可迭代对象**创建一个新的，浅拷贝的数组实例。

语法：`Array.from(类数组，回调函数)`

参数：

​	参数1：想要转换成数组的伪数组对象或可迭代对象。

​	参数2(可选)：如果指定了该参数，新数组中的每个元素会执行该回调函数。

返回值：一个==新的数组==

用法示例：

```js
//从 String 生成数组
Array.from('foo');   // [ "f", "o", "o" ]

//从 Set 生成数组
const set = new Set(['foo', 'bar', 'baz', 'foo']);
Array.from(set);    // [ "foo", "bar", "baz" ]

//从类数组对象（arguments）生成数组
function f() {
  return Array.from(arguments)
}
console.log(f(1, 2, 3))  // [ 1, 2, 3 ]

//在 Array.from 中使用箭头函数
Array.from([1, 2, 3], x => x + x);
// [2, 4, 6]
```



### Array.isArray()

用于确定传递的值是否是一个数组

语法：`Array.isArray(value)`

参数：需要检测的值

返回值：如果值是数组，则为 `true`；否则为 `false`。

用法示例：

```js
console.log(Array.isArray([1, 2, 3])) // true
console.log(Array.isArray({ foo: 123 })) // false
console.log(Array.isArray('foobar')) // false
console.log(Array.isArray(undefined)) // false
```



### join()

将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个**字符串**。如果数组只有一个项目，那么将返回该项目而不使用分隔符。

语法：`join(分隔符)`

参数：

- 不传：默认用`,`分割
- 传空串`''` ，所有元素连在一起

用法示例：

```js
const elements = ['Fire', 'Air', 'Water']
console.log(elements.join())
// expected output: "Fire,Air,Water"

console.log(elements.join(''))
// expected output: "FireAirWater"

console.log(elements.join('-'))
// expected output: "Fire-Air-Water"
```

> join(): 将数组转化为字符串
>
> split(): 将字符串转化为数组

### map()

创建一个新数组，这个新数组由原数组中的每个元素都调用一次提供的函数后的返回值组成。

> 不改变原数组

语法：`map(callback)`

参数：

- 回调函数：生成新数组元素的函数，使用三个参数：
  - 当前元素
  - 当前元素的索引
  - 数组本身

返回值：

​	一个新数组，每个元素都是==回调函数的返回值==。

用法示例：

```js
let arr = [1, 2, 3, 4, 5]
let result = arr.map(item => item ** 2)
console.log(result) // [1, 4, 9, 16, 25]
```



### Array.of()

创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型

语法：`Array.of(elementN)` 

参数：elementN 任意个参数，将按顺序成为返回数组中的元素

返回值：返回一个新数组

用法示例：

```js
console.log(Array.of(1)) // [1]

console.log(Array.of(1, 2, 3)) // [1, 2, 3]

console.log(Array.of(undefined)) // [undefined]

console.log(Array(3)) //[empty × 3]
```



> 注意：Array.of() 和 Array() 的区别
>
> Array.of(7) 指的是创建一个具有一个元素7的数组
>
> Array(7) 值的是创建一个长度为7的空数组
>
> (**注意**：这是指一个有 7 个空位 (empty) 的数组，而不是由 7 个`undefined`组成的数组）



### pop()

从数组中删除最后一个元素，并返回该元素的值。此方法**会更改数组的长度**。

返回值：删除的元素

用法示例：

```js
const plants = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato'];

console.log(plants.pop()); //tomato

console.log(plants);
// Array ["broccoli", "cauliflower", "cabbage", "kale"]
```



### push()

将一个或多个元素添加到数组的末尾，并==返回该数组的新长度==

语法：`push(el)`

参数：添加的元素

返回值：新数组的长度

用法示例：

```js
var vegetables = ['parsnip', 'potato']
var moreVegs = ['celery', 'beetroot']

//合并两个数组
console.log(vegetables.push(...moreVegs)) //4

console.log(vegetables) //['parsnip', 'potato', 'celery', 
'beetroot']
```



### shift()

从数组中删除**第一个**元素，并返回该元素的值。此方法更改数组的长度。

**返回值**：从数组中删除的元素; 如果数组为空则返回undefined

用法示例：

shift() 方法经常用于 while loop 的环境中.。下例中每个循环将要从一个数组中移除下一项元素，直至它成为空数组。

```js
let names = ['Andrew', 'Edward', 'Paul', 'Chris', 'John']
while ((i = names.shift()) !== undefined) {
  console.log(i)
}
// Andrew, Edward, Paul, Chris, John
```



### unshift()

将一个或多个元素添加到数组的**开头**，并返回该数组的**新长度**

语法：`unshift(添加的元素)`

返回值：返回该数组的新长度

用法示例：

```js
let arr = [4, 5, 6];
arr.unshift(1, 2, 3);
console.log(arr);
// [1, 2, 3, 4, 5, 6]
```



### reduce()

对数组的每个元素执行一个回调函数，每一次运行回调函数之前会将先前元素的计算结果作为参数传入，最后将其结果汇总为单个返回值。

语法：`reduce(callback，初始值)`

参数：

- 参数1：`callback` 一个reducer函数，接收四个参数
  - preValue: 上一次的返回值
  - curValue: 正在处理的元素
  - curIndex: 正在处理的元素的索引
  - 数组本身
- 参数2：初始值

返回值：使用“reducer”回调函数遍历整个数组后的结果。

用法示例：

```js
// 数组去重
let arr = ['a', 'b', 'a', 'b', 'c', 'e', 'e', 'c', 'd', 
'd', 'd', 'd']
let newArr = arr.reduce((prev, curV) => {
    //判断上一次计算结果是否包含这次的元素，如果包含，返回上一次的结果
  	if (prev.includes(curV)) return prev
  	prev.push(curV)
  	return prev
}, [])
console.log(newArr); // ['a', 'b', 'c', 'e', 'd']
```

> 此方法非常强大！！！



### reverse()

方法将数组中元素的位置颠倒，并返回该数组。数组的第一个元素会变成最后一个，数组的最后一个元素变成第一个。该方法会**改变原数组**。

返回值：颠倒后的数组。

用法示例:

```js
      const a = [1, 2, 3]

      console.log(a) // [1, 2, 3]

      a.reverse()

      console.log(a) // [3, 2, 1]
```



### slice()

分割字符串，返回一个新的数组对象，**不影响原数组**

语法：`slice(start,end)`

参数：

- 不写：默认从数组第一位开始，一直到数组最后一位
- 1个参数：从该参数，一直到结束
- 两个参数：包含开始，不包含结束

返回值：新数组

用法示例：

```js
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(animals.slice(2));
// expected output: Array ["camel", "duck", "elephant"]

console.log(animals.slice(2, 4));
// expected output: Array ["camel", "duck"]

console.log(animals.slice(1, 5));
// expected output: Array ["bison", "camel", "duck", "elephant"]

console.log(animals.slice(-2));
// expected output: Array ["duck", "elephant"]

console.log(animals.slice(2, -1));
// expected output: Array ["camel", "duck"]

console.log(animals.slice());
// expected output: Array ["ant", "bison", "camel", "duck", "elephant"]
```



### sort()

对数组的元素进行排序，并返回数组，默认排序顺序是在将元素转换为字符串，然后比较它们的 UTF-16 代码单元值序列时构建的,**改变元素组**

语法：`sort(比较函数)`

参数：

- 传入一个函数，接收两个值 a,b
  - 返回a - b : 升序排列
  - 返回b - a : 降序排列

用法示例：

```js
let arr = [1, 3, 4, 55, 2, 0]
arr.sort((a, b) => a - b)
console.log(arr) //[0, 1, 2, 3, 4, 55]

let arr = [1, 3, 4, 55, 2, 0]
arr.sort((a, b) => b - a)
console.log(arr) //[55, 4, 3, 2, 1, 0]
```



### splice()

通过删除或替换现有元素或者原地添加新的元素来修改数组，并以数组形式返回被修改的内容。此方法会**改变原数组**。

语法：`splice(start,delCount,itemN)`

参数：

- 第一个参数：指定修改的开始位置（从 0 计数）。
  - 如果超出了数组的长度，则从数组末尾开始添加内容；
  - 如果是负值，则表示从数组末位开始的第几位，
  - 如果负数的绝对值大于数组的长度，则表示开始位置为第 0 位。
- 第二个参数(可选)：表示要移除的数组元素的个数。
  - 如果 `deleteCount` 大于 `start` 之后的元素的总数，则从 `start` 后面的元素都将被删除（含第 `start` 位）。
  - 如果 `deleteCount` 被省略了，或者它的值大于等于`array.length - start`(也就是说，如果它大于或者等于`start`之后的所有元素的数量)，那么`start`之后数组的所有元素都会被删除。
  - 如果 `deleteCount` 是 0 或者负数，则不移除元素。这种情况下，至少应添加一个新元素。

- 第三个参数(可选)：要添加的元素

用法示例：

```js
let myFish = ["angel", "clown", "mandarin", "sturgeon"];
let removed = myFish.splice(2, 0, "drum");
console.log(myFish) 
//['angel', 'clown', 'drum','mandarin', 'sturgeon']
```



### 总结

要注意数组方法的参数、返回值、是否对数组本身产生影响！！！😁
