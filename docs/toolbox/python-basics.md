---
title: Python学习
tags: 加油站
abbrlink: e39e2a4e
date: 2024-01-05 13:41:27
---

# Python的学习

## 基础语法

### print函数

```python
print(*objects, sep=' ', end='\n', file=None, flush=False)
```

> set：多个内容的分隔符
>
> end：设置结束符，默认结束符是‘\n’



### 字符串

1、字符串的拼接

```python
name = '吴京'
message = '我是%s' % name
print(message)

# 多个变量拼接
class_name = 'python'
avg_score = 99.99
message1 = '我是%s,平均分是%s' % (class_name, avg_score)
print(message1)

name = '吴京'
age = 18
weight = 75.55
message2 = '我是%s,今年%d岁，体重%f' % (name, age, weight)
print(message2) # 我是吴京,今年18岁，体重75.550000


```

其中：

- % 我要占位
- s 表示将变量变成字符串放到占位的地方
- %s ：字符串
- %d：整数
- %f：浮点数

可以使用'm.n'来限制数据的宽度和精度

- ﻿m，控制宽度，要求是数字（很少使用），设置的宽度小于数字自身，不生效
- ﻿.n，控制小数点精度，要求是数字，会进行小数的四舍五入

示例：

- ﻿﻿%5d：表示将整数的完度控制在5位，如数字11，被设置为5d，就会变成：\[空格]\[空格][空格]11，用三个空格补足宽度。
- ﻿％5.2f：表示将宽度控制为5，将小数点精度设置为2小數点和小數部分也算入宽度计算。如，对11.345设置了%7.2f后，结果是：  11.35。2个空格补足宽度，小数部分限制2位精度后，四舍五入为.35

**最常用的**

```python
f'内容{变量}'
```

```python
name = '吴京'
age = 18
weight = 75.55
maeeage = f'我是{name},今年{age}岁，体重{weight}'
```

> 不理会类型，不做精度控制

### 数据输入语句

```input语句```

会将输入的类型转化为string类型

## 运算符

### 布尔类型

``True  、False``

True代表1，False代表0

> 数字0,空字符串""或者'',空列表[],空元组(),空字典{},空集合set(),None这些数据转换为bool类型 时是False.

### 比较运算符

```python
==  !=  >  <  >=  <= 
```

==:会比较类型



### 算数运算符

```python
+ - *【乘法】 /【除法】 %【求余或者取模】 **【求幂或者几次方】 //【取整】
```



### 逻辑运算符

```python
and(逻辑与)  or(逻辑或)  not(逻辑非)
```

```python
# and(逻辑与): 运算规则: 只要有一个表达式的结果是False,则整个表达式的结果为False.只有当
# 等号两边的两个表达式的结果全部为True的时候,则整个表达式的结果才是True.
# print(23 > 11 and 19 > 14) # True
# print(23 > 11 and 19 > 34) # False
# print(87 < 67 and 34 > 23) # False

# or(逻辑或): 运算规则:只要有一个表达式的结果是True,则整个表达式的结果是True.只有等号两边的两个表达式的结果全部是False的时候,则整个表达式的结果才是False.
# print(23 > 12 or 98 < 65) # True
# print(23 < 12 or 98 > 65) # True
# print(23 < 12 or 98 < 65) # False

# not(逻辑非) 运算规则: 对原来的结果取反,原来是True,取反后变为False.原来是False,取反后变为True.
# print(True)
# print(not True) # False
# print(False)
# print(not False) # True
```

Python 逻辑运算符可以用来操作任何类型的表达式，不管表达式是不是 bool 类型；同时，逻辑运算的 结果也不一定是 bool 类型，它也可以是任意类型。请看下面的例子：

```python
print(100 and 200)  # 200
print(45 and 0) # 0
print(False or 12) #12
```



### 成员运算符

成员运算符包含 in, not in 主要用于字符串、列表、元组等操作.



## 流程控制

### 条件判断

```python
if 判断条件:
  	条件成立时要做的事
```

- 条件后面要加：
- 条件体前面有**四个空格**

```python
if 判断条件:
  	条件成立时要做的事
else:
    不满足条件时做的事
```



多个条件判断

```python
if 判断条件1:
  	条件1成立时要做的事
elif 判断条件2:
    条件2成立时要做的事
    ......
else:
    所有条件都不满足条件时做的事
```



### match

Python中的match语句是Python 3.10及以后版本中引入的新特性，用于模式匹配

```python
a = 10
match a:
    case 1:
        print('a是1')

    case 2:
        print('a是2')

    case _:
        print(f'a是{a}')
 
# a是10
```

> \_:表示匹配其他所有值



### 循环语句

#### while循环

```python
i = 0											# 操作
while i < 10							# 条件
	print('123')						# 循环体
  i ++
```

在print语句中，加上 end=’’ 即可输出不换行了

案例：99乘法表

```python
i = 1
while i <= 9:
    j = 1
    while j <= i:
        print(f'{j}*{i}={i * j}\t', end=' ')
        j += 1
    print()
    i += 1
```

### for循环

```python
for 临时变量 in 待处理数据集(可迭代对象): 
    循环满足条件时执行的代码
```

> 注：
>
> 同while循环不同，for循环是无法定义循环条件的。只能从被处理的数据集中，依次取出内容进行处理。
>
> 可迭代对象：字符串、数组、元组等

`range`：获得一个数字序列

```python
# 语法1
range(num) 					 # 从0开始，到num结束（不含num）

# 语法2
range(num1,num2)     # 从num1开始，到num2结束（不含num2）

# 语法3
range(num1,num2,step)# 从num1开始，到num2结束（不含num2），步长为step
```

### continue和break

- `continue`

continue关键字用于：<font color=red>中断本次</font>循环，<font color=red>直接进入下一次</font>循环

continue可以用于：    <font color=red>for循环和while循环，效果一致</font>

continue关键字只可以控制：<font color=red>它所在的循环临时中断</font>

- `break`

break关键字用于：<font color=red>直接结束所在循环</font>

> 只能跳出距离最近的for或者while循环

- else的下级代码：没有通过 break 退出循环，循环结束后，会执行的代码

```python
a = 5
num = 1
while a < 5:
    num += 1
    break
else:
    print('没有经过break')
```





## 函数

### 函数的定义

```python
def 函数名(参数):
	函数体
  return 返回值
```

注：

- 定义时有`:`
- 参数如不需要，可以省略
-  返回值如不需要，可以省略，没有return，则返回None
- 函数必须先定义后使用

#### none的使用场景

1、函数无返回值

2、用于if判断，等同于False

3、**定义变量，但暂时不需要变量有具体值，可以用None来代替**

#### 函数的说明

对函数的说明写在函数体之前，通常使用多行注释，调用时，鼠标悬停可以看见函数说明

```python
def add(x, y):
    """
		This function adds two numbers
    :param x: 参数1
    :param y: 参数2
    :return: 返回值
    """
    return x + y


r = add(3, 4)
print(r)
```



### 全局变量

`global`



### 可变参数

\*args：传入的值是列表

\**kwargs：传入的值是字典

args、kwargs都是约定俗称的，不强制

```python
# 可变参数
def total(*args):
    res = 0
    for i in args:
        res += i
    return res


result = total(1, 2, 3, 4, 5, 6)
print(result)

arr = [1, 2, 3, 4]
result = total(*arr) # 传列表时，需要用*

def f(**kwargs):
    for k, v in kwargs.items():
        print(k, v)


d = {'name': 'cr', 'age': 18}
f(**d)

```

> \*args ：会将args变成元组



### 匿名函数

lambda函数，一种简便写法

```python
a = [1, 2, 3, 4, 5]

# map函数：映射
result = map(lambda x: x ** 2, a)
print(list(result))

# 过滤
result = filter(lambda x: x > 2, a)
print(list(result))

# reduce:累加
from functools import reduce

result = reduce(lambda x, y: x + y, a)
print(result)
```





## 列表

### 定义

列表内的每一个数据，称之为<font color=red>元素</font>

- 以[]作为标识
- 列表内每一个元素之间用, 逗号隔开

```python
# 字面量
[1, 2, 3, 4, 5]

# 定义变量
list1 = [1, 2, 3, 4, 5]

# 定义空列表
list2 = []
list3 = list()
```

> 注意：
>
> 列表可以一次存储多个数据，且**可以为不同的数据类型，支持嵌套**

### 索引

取出特定位置的数据

```python
list1 = [1, 2, 3, 4, 5]
print(list1[1])  # 2
print(list1[-1]) # 5
```

### 列表的常用方法

- **查询**

功能：查找某元素的下标，如果找不到，报错ValueError

1. 语法：``列表.index(元素)``

```python
list1 = ['abc', 'cba', 'nba', 'mba', 1, True, 'abc']
print(list1.index(1))  # 4
print(list1.index(2))  # ValueError: 2 is not in list
```

2. ``len(列表)``：统计列表内，有多少元素

- **修改**

1. 语法：``列表[下标] = 值``

   ​    正向、反向下标均可

2. 插入元素：``列表.insert(下标,元素)``

      在指定的下标位置，插入指定的元素

3. 追加元素：``列表.append(元素)``

   ​	将指定元素，追加到列表的尾部

4. 追加元素方式2：``列表.extend(其它数据容器)``

   ​	将其它数据容器的内容取出，依次追加到列表尾部

```python
list1 = ['abc', 'cba', 'nba', 'mba', 1, True, 'abc']
list1.extend([1, 2, 3])
print(list1)  # ['abc', 'cba', 'nba', 'mba', 1, True, 'abc', 1, 2, 3]
```

- **删除**

1. ``del 列表[下标]``
2. ``列表.pop(下标)``
3. ``列表.remove(元素)`` ：删除某元素在列表中的<font color=red>第一个匹配项</font>
4. ``列表.clear()``：清空列表内容
5. ``列表.count(元素)`` ：统计某元素在列表内的数量

### 列表的遍历

使用``for``或者`while`

案例：

```python
# 1到10的列表,取出所有的偶数
list1 = list(range(1, 11))

# 使用while循环
i = 1
arr = []
while i <= len(list1):
    if list1[i - 1] % 2 == 0:
        arr.append(list1[i - 1])
    i += 1
print(arr)

# 使用for循环
arr = []
for i in list1:
    if i % 2 == 0:
        arr.append(i)
print(arr)
```

## 元组

### 定义

元组定义：定义元组使用<font color=red>小括号</font>，且使用逗号隔开各个数据，<font color=red>数据可以是不同的数据类型</font>。

<font color=red>**注：**元组只有一个数据，这个数据后面要添加逗号</font>

### 相关操作

- 根据下标（索引）取出数据
- 根据`index()`,查找特定元素的第一个匹配项
- 统计某个数据在元组内出现的次数
- 统计元组内的元素个数

### 注意事项

- 不可以修改元组的内容，否则会直接报错
- 可以修改元组内的list的内容（修改元素、增加、删除、反转等）
- 不可以替换list为其它list或其它类型

### 元组的遍历

可以使用while循环和for循环遍历它

## 字符串

### 常用操作

- 字符串的分割

​	语法：`字符串.split(分隔符字符串）`

​	功能：按照指定的分隔符字符串，将字符串划分为多个字符串，并存入列表对象中

​	注意：<font color=red>字符串本身不变，而是得到了一个列表对象</font>

- 去前后空格

​	语法：``字符串.strip()``

- 去前后指定字符串

​	语法：``字符串.strip(字符串)``

```python
str1 = '123churui112233'
print(str1.strip('12'))  # 3churui112233
print(str1.strip('123'))  # churui
```

- 统计字符串中某字符串的出现次数

  语法：``字符串.count(字符串)``

- 统计字符串的长度

​	语法：`len(字符串)`



## 序列

序列是指：内容连续、有序，可使用下标索引的一类数据容器

### 常用操作

- 从一个序列中，取出一个子序列

语法：`序列[起始下标:结束下标:步长]`

表示从序列中，从指定位置开始，依次取出元素，到指定位置结束，得到一个新序列

> 注意：
>
> 1. 此操作<font color=red>不会影响序列本身，而是会得到一个新的序列（列表、元组、字符串）</font>
> 2. 中间用``：``隔开

```python
# 切片
my_list = [1, 2, 3, 4, 5, 6, 7, 8, 9]
print(my_list[0:3])  # [1, 2, 3]

my_tuple = (1, 2, 3, 4, 5, 6, 7, 8, 9)
# 从头开始，到最后结束，步长1
print(my_tuple[:])  # (1, 2, 3, 4, 5, 6, 7, 8, 9)

my_list = [1, 2, 3, 4, 5, 6, 7, 8, 9]
# 从头开始，到最后结束，步长2
print(my_list[::2])  # [1, 3, 5, 7, 9]

my_str = '123456789'
# 从头（最后）开始，到尾结束，步长-1（倒序）
print(my_str[::-1])  # 987654321
```



### 字典

#### 特点

- 字典用 {} 定义字典使用
-  键值对 存储数据，键值对之间使用 , 分隔  
- 键 key 是索引  值 value 是数据  
- 键 和 值 之间使用 : 分隔  
- 键必须是唯一的  值 可以取任何数据类型，但 键 只能使用 字符串、数字或 元组

#### 遍历

```python	
d = {
    'name': 'mia',
    'age': '18'
}
print(d)

# 遍历
for i in d:
    print(i, d[i])

for k, v in d.items():
    print(k, v)

# 遍历键
for i in d.keys():
    print(i)

# 遍历值
for i in d.values():
    print(i)
```



## 集合

### 特点

**不支持元素的重复（自带去重功能）、并且内容无序**

> 与dict类似，是一组key的集合(不存储value)

语法：`变量名称 = {元素,元素,……,元素}`

空集合：`变量名称 = set()`

### 常用操作

- 添加
  - 语法：``集合.add(元素)``。将指定元素，添加到集合内
  - 结果：集合本身被修改，添加了新元素
- 移除
  - 语法：``集合.remove(元素)``，将指定元素，从集合内移除
  - 结果：集合本身被修改，移除了元素
- 从集合中随机取出元素
  - 语法：``集合.pop()，功能``，从集合中随机取出一个元素
  - 结果：会得到一个元素的结果。同时集合本身被修改，元素被移除
- 清空集合
  - 语法：集合.clear()，功能，清空集合
  - 结果：集合本身被清空

```python
my_set = {'hello', 'world', 'hello', 'python'}
my_set.clear()
print(my_set)  # set()
```

- 交集
  - 语法：`集合1 & 集合2`
  - 结果：集合1和集合2公有的元素
- 并集
  - 语法：`集合1 | 集合2`
  - 结果：集合1和集合2所有的元素

案例：

获取得分人数

```python
s = [80, 80, 80, 50, 60, 60, 80, 80, 50, 40]
d = {}
for i in set(s):
    t = s.count(i)
    d[i] = t
for k, v in d.items():
    print(f'得分为{k}的有{v}个')

```

```python
# 并集
arr1 = {1, 2, 3, 4}
arr2 = {4, 5, 6, 7, 8}
t = arr1 | arr2
print(t)  # {1, 2, 3, 4, 5, 6, 7, 8}
```





## 异常处理

### 常见的错误类型

| 报错类型          | 描述                                             |
| ----------------- | ------------------------------------------------ |
| AssertionError    | 当assert断言条件为假的时候抛出的异常。           |
| AttributeError    | 当访问的对象属性不存在的时候抛出的异常           |
| IndexError        | 超出对象索引的范围时抛出的异常。                 |
| KeyError          | 在字典中查找一个不存在的key抛出的异常            |
| NameError         | 访问一个不存在的变量时抛出的异常。               |
| OSError           | 操作系统产生的异常。                             |
| SyntaxError       | 语法错误时会抛出此异常。                         |
| TypeError         | 类型错误，通常是不同类型之间的操作会出现此异常。 |
| ZeroDivisionError | 进行数学运算时除数为0时会出现此异常。            |

```python
try:
    print('可能会出现错误的代码')
    n = int(input('请输入一个数字：'))
    n = 5 / n
    print(n)
except ZeroDivisionError:
    print('错误的代码来了')
except ValueError:
    print('请输入数字')
finally:
    print('终于等到你')
```



### raise关键字

<font color=red>手动抛出一个指定类型的异常</font>，无论是哪种异常类都可以带一个字符串参数，对异常进行描述。

raise不带参数会把错误原样抛出

```python
try:
    pwd = input('请输入你的密码：')
    if len(pwd) < 8:
        raise Exception('密码长度不够，请输入8位以上')
except Exception as e:
    print(e)
```





## 模块

- 模块 就好比是 工具包，要想使用这个工具包中的工具，就需要 导入 import 这个模块

- 每一个以扩展名 py 结尾的 python 源代码文件都是一个 模块

- 在模块中定义的 全局变量 、 函数 都是模块能够提供给外界直接使用的工具

用法：

```python
# 导入
import my_module  # 导入my_module这个模块（全部导入）

from my_module import add, total  # 从my_module模块中导出add,total这个方法（部分导入）

from my_module import *    #全部导入（使用时，不需要模块名.xxx）

from my_module import add as f	# 导入add，重命名为f

# 使用
my_module.add(1,2)

add(1,2)
add(1,2)
f(1,2)
```

### 常见的标准库

#### 1、random

获取随机数

| 函数名                     | 函数说明                                                     |
| -------------------------- | ------------------------------------------------------------ |
| randrange(start,stop,step) | start 指定范围的起始值 包含本身，默认是0；stop 指定范围的结束值 不包含本身； step 步长，默认步长是1。该函数返回一个整数 |
| randint(start,end)         | 返回[start end]之间的一个随机整数，start必须小于end          |
| random()                   | 返回一个[0.0,1.0)之间的随机小数                              |
| choice(seq)                | 返回一个序列（列表、元组，字符串）中返回一个随机元素         |
| shuffle(seq)               | 将序列元素随机排列（打乱顺序）                               |

#### 2、re

正则表达式处理



#### 3、time

获取时间

```python
def get_time():
    t = time.localtime()
    s = time.strftime('%Y-%m-%d %H:%M:%S', t) # 格式化时间
    return s
```



#### 4、turtle

入门级的图形绘制函数库

| 方法                                    | 说明                                         |
| --------------------------------------- | -------------------------------------------- |
| forward(d)/fd(d)                        | 向当前画笔方向移动d像素长度                  |
| backward(d)/back(d)/bk(d)               | 向当前画笔相反方向移动d像素长度              |
| goto(x,y)/setpos(x,y)/setposition(x,y)  | 将画笔移动到坐标为x,y的位置                  |
| setx(x)                                 | 设置海龟的横坐标为 x，纵坐标保持不变         |
| sety(y)                                 | 设置海龟的纵坐标为 y，横坐标保持不变         |
| penup()/up()                            | 提起笔移动，不绘制图形，用于另起一个地方绘制 |
| pendown()/down()                        | 放下笔，移动时绘制图形，缺省时也为绘制       |
| right(degree)/rt(degree)                | 顺时针移动degree°                            |
| left(degree)/lt(degree)                 | 逆时针移动degree°                            |
| setheading(angle)/seth(angle)           | 设置海龟的朝向为 angle                       |
| circle(radius, extent=None, steps=None) | 绘制圆弧                                     |
| dot(radius,colorstr)                    | 绘制一个指定直径和颜色的圆点                 |
| home()                                  | 设置当前画笔位置为原点，朝向东               |

### 第三方库

下载方法

```sh
pip 包名
```

pip换源

```sh
# 升级 pip 到最新的版本 (>=10.0.0) 后进行配置
pip install --upgrade pip 

# 更换成清华大学的源
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

## 文件及操作

### 文件操作

读取文件的步骤：

1. 打开文件
2. 读取文件内容
3. 关闭文件

打开文件的模式：

| mode | 解释                                                         |
| ---- | ------------------------------------------------------------ |
| r    | 只读【默认模式，文件必须存在，不存在则抛出异常】             |
| w    | 只写，写之前会清空文件的内容，如果文件不存在，会创建新文件   |
| a    | 追加的方式，在原本内容中继续写，如果文件不存在，则会创建新文件 |
| r+   | 可读可写                                                     |
| w+   | 打开一个文件用于读写。如果该文件已存在则将其覆盖。如果该文件不存在，创建新文件。 |
| a+   | 打开一个文件用于读写。如果该文件已存在，文件指针将会放在文件的结尾。文件打开时会是追加模式。如果该文件不存在，创建新文件用于读写。 |
| b    | rb、wb、ab、rb+、wb+、ab+意义和上面一样，用于二进制文件操作  |

### with

> 使用with，会自动帮我们关闭文件

```python
with open('test.txt', mode='r', encoding='utf8') as f:  # 打开文件，并赋值给f
    context = f.read()
    print(context)

```

### next

python的内置函数，用于获取迭代器的下一个元素

语法：

```python
next(iterator[,default])
```

- `iterator`是一个迭代器对象
- `default`是可选参数，用于指定在迭代器耗尽时返回的默认值，默认为`None`

当迭代器还有下一个元素时，`next()` 函数返回下一个元素；当迭代器已经耗尽时，如果指定了 `default` 参数，则返回默认值，否则会触发 `StopIteration` 异常。

### csv文件

```python
import csv
```

1、读文件

```python
with open('table.csv', mode='r', encoding='utf8') as f:
    # context = f.read() 
    context = csv.reader(f) # 会将数据以列表的形式读取出来
    head = next(context)
    print(context)
    sources = []
    for i in context:
        sources.append(int(i[2]))
    print(sum(sources) / len(sources))
```

2、写文件

```python
with open('table.csv', mode='a', encoding='utf8') as f:
    cf = csv.writer(f)
    cf.writerow(['king', 'java', '60']) # 写单行
    cf.writerow(['bob', 'java', '60'])	
    lista = [['king', 'c', '10'], ['king', 'vb', '30']]
    cf.writerows(lista)	# 写多行
```

## 面向对象

### 类和对象

基于类创建对象的语法：`对象名 = 类名称()`

> 面向过程编程：需要实现一个功能的时候，着重的是过程，分析出一个个步骤，并把一个个步骤用一个个函数实现，在依次去调用一个个函数即可
>
> 面向对象编程：需要实现一个功能的时候，着重的是谁去帮我做这件事情（找别人帮忙）



<font color=red>类</font>：对一系列具有相同属性和行为的事务的统称，是一个抽象的概念，不是真实存在的事物(需要遵循大驼峰命名法)

<font color=red>对象</font>：类的具体实现



属性和方法：

```python
class Student:
  name = None		# 类属性
  
  def say_hi(self): # 方法
    print('hi')
```

注：

- `self` 指的是实例对象



属性（成员变量）的赋值

```python
stu1 = Student()
stu1.name = 'bob'
```



### `__new__()`

`__new__()`：object基类提供的内置的静态方法

作用：

- 在内存中为对象分配空间
- 返回对象的引用



**对象实例化的执行过程**：首先执行`__new__()`这个静态方法，如果没有重写`__new__()`，默认调用`object`基类里面的`__new__()`，返回一个实例对象，然后再去调用`__init__()`，对对象进行初始化



### 构造方法

`__init(self)__`

可以实现：

- 在创建类对象（构造类）的时候，<font color=red>会自动执行</font>
- 在创建类对象（构造类）的时候，<font color=red>将传入的参数自动传递给`__init()__`方法使用</font>

注意事项：

1. 构造方法也是成员方法，不要忘记在参数列表中提供：self
2. 在构造方法内定义成员变量，需要<font color=red>使用self</font>关键字

```python
class Student:
    def __init__(self, name, age, tel):
        self.name = name  # 实例属性
        self.age = age
        self.tel = tel


stu1 = Student('bob', 18, '123123')
print(stu1.name)
```



### 静态方法

定义方法：

- 变量和方法的命名均以`__`开头即可
- 需要使用`@staticmethod`装饰器



**总结：**

1. 实例方法：方法内部访问实例属性，方法内部可以通过`类名.类属性`来访问类属性，也可以使用`self.实例属性`访问实例属性
2. 静态方法：`@staticmethod`，方法内部不需要访问实例属性和类属性，此时可以使用静态方法，
   	- 如果要访问类属性，通过`类名.类属性`访问，不能访问实例属性
3. 类方法`@classmethod`：方法内部可以通过`cls.类属性名`访问类属性，不能访问实例属性
   1. cls：类本身

类属性是公共的，所有方法内部都能够访问到，实例属性是私有的，只有实例方法内部能访问到



### 魔术方法

内置的类方法，各自有各自的特殊的功能，这些内置方法我们称之为：魔术方法

`__str__(self)`魔术方法

默认是内存地址

```python
class Student:

    # 构造对象
    def __init__(self, name, age, tel):
        self.name = name
        self.age = age
        self.tel = tel

    def __str__(self):
        return f"Student的name是{self.name},age是{self.age}"


stu1 = Student('bob', 18, '123123')
print(stu1)  # Student的name是bob,age是18
```

`__add__(self,other)` 、 `__eq__(self,other)`

等等



### 封装

注意：

- 类对象无法访问私有成员
- 类中的其他成员可以访问私有成员
- 我的理解：静态方法不依靠类对象和实例对象，一般用于验证是否合理等



提供一种安全的修改变量的方法

```python
class Person(object):
    def __init__(self, name, age):
        self._name = name  # _ :表示受保护的变量
        self.__age = age  # __: 表示私有变量，外界不可访问

    @property
    def age(self):
        return self.__age

    @age.setter
    def age(self, val):
        if isinstance(val, int):
            self.__age = val
        else:
            print('年龄只能是整数')

    @age.deleter
    def age(self):
        print('别想删除我~')


bob = Person('cr', 18)
print(bob.age) # 18
bob.age = 20
print(bob.age) # 20
del bob.age  # 别想删除我~

```

> 解释：
>
> 1. `@property`: 装饰器是将被装饰的方法转化为一个同名的只读的特征属性，被装饰方法的文档字符串就是装饰后同名属性的文档字符串
>
> 2. `@property` 装饰的方法对应着 getter 方法，`@age.setter` 装饰的方法对应着 setter 方法，`@age.deleter `装饰的方法对应着 deleter 方法
>
> 3. 装饰的方法的方法名都要相同

#### 装饰器

含义：装饰器本质上就是一个闭包函数，他的好处就是在不修改原有代码的基础上增加额外的功能

<font color=red>多个装饰器装饰的过程，离函数最近的先装饰，然后外面的装饰器再进行装饰，由内到外</font>

```python
def outer(fn):
    def inner():
        print('登录……')
        fn()

    return inner


@outer
def send():
    print('发送消息：哈哈哈~')


@outer
def send2():
    print('发送消息：嘿嘿嘿~')


send()		# 登录……  发送消息：哈哈哈~
send2()		# 登录……  发送消息：嘿嘿嘿~

```

解释：

1. 执行send函数时，会将send作为参数传入到outer中
2. 闭包三要素：
   1. 函数有嵌套关系
   2. 内层函数引用外层函数的变量
   3. 内层函数作为外层函数的返回值



### 继承

1. 继承父类，需要将父类传入
2. 使用`super`调用父类的构造函数
3. 可以重写父类的属性和方法



```python
# 父类
class Person(object):
    count = 1

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def say_hi(self):
        print('hi~')


# 子类
class Student(Person):
    def __init__(self, name, age, address):
        # 调用父类的构造函数
        super().__init__(name, age)  # 父类有什么参数，这里就要写什么
        self.address = address

    # 重写父类方法
    def say_hi(self):
        print('hello,我被修改了')


stu1 = Student('cr', 18, 'tc')
stu1.say_hi()  # hello,我被修改了
print(stu1.count)
```



### 多态

多态的字面意思就是多种状态，<font color=red>同一操作作用于不同的对象上，可以产生不同的解释和不同的执行结果</font>。比方说，我养了一只猫和一只狗，我对它们发出同一个指令 "叫一下"，猫会喵喵喵，而狗会汪汪汪，所以让它们叫一下就是同一操作，而叫声不同则是不同的执行结果。

> 其实多态性最根本的作用就是通过把过程化的条件语句转化为对象的多态性，从而消除这些条件分支语句。
>
> 它背后的思想通俗点来说就是把“做什么”和“谁去做以及怎么做”分离开。你也可以认为是把“不变的事物”和“可能改变的事物”分离开。

例如：

```python
len('hello')  # 5
len([1,2,3,4,5])  # 5
```

实现多态：

```python
class Animal(object):
    def speak(self):
        print('叫一下')


class Cat(Animal):
    def speak(self):
        print('喵喵')


class Dog(Animal):
    def speak(self):
        print('汪汪')


# 实现多态
def speak(class_name):
    class_name.speak()


animal = Animal()
kitty = Cat()
puppy = Dog()
speak(kitty)
speak(puppy)

```



## 设计模式

### 单例模式

定义：实例化出来的对象都是同一个内存地址

实现方法：

- 通过重写`__new__()`方法实现单例模式

```python
class Singleton(object):
    obj = None  # 记录第一个被创建的对象的引用

    def __new__(cls, *args, **kwargs):
        if cls.obj is None:
            cls.obj = super().__new__(cls)
        return cls.obj

    def __init__(self):
        print('我是init')


s1 = Singleton()
s2 = Singleton()

print(s1)  # <__main__.Singleton object at 0x10073d430>
print(s2)  # <__main__.Singleton object at 0x10073d430>

```

- 通过引入模块

```python
from single_test import te as t2
from single_test import te as t1

print(t1, id(t1))
print(t1, id(t2))
```

应用场景：

1. 回收站对象
2. 音乐播放器，一个音乐播放软件负责音乐播放的对象只有一个
3. 开发游戏软件  
4. 数据库配置、数据库连接池的设计
