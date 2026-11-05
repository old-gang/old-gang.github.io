# 第一章 Java 语言概述

## 常用 dos 命令

- `操作1：进入和回退`

| 操作                  | 说明                                |
| --------------------- | ----------------------------------- |
| 盘符名称:             | 盘符切换。E:回车，表示切换到 E 盘。 |
| dir                   | 列出当前目录下的文件以及文件夹      |
| cd 目录               | 进入指定单级目录。                  |
| cd 目录 1\目录 2\\... | 进入指定多级目录。cd atguigu\JavaSE |
| cd ..                 | 回退到上一级目录。                  |
| cd \ 或 cd /          | 回退到盘符目录。                    |

- `操作2：增、删`

| 操作          | 说明                                               |
| ------------- | -------------------------------------------------- |
| md 文件目录名 | 创建指定的文件目录。                               |
| rd 文件目录名 | 删除指定的文件目录（如文件目录内有数据，删除失败） |

- `操作3：其它`

| 操作                | 说明                            |
| ------------------- | ------------------------------- |
| cls                 | 清屏。                          |
| exit                | 退出命令提示符窗口。            |
| ← →                 | 移动光标                        |
| ↑ ↓                 | 调阅历史操作命令                |
| Delete 和 Backspace | del 文件名.后缀名 del \*.后缀名 |

## jvm 和跨平台

### JVM 功能说明

**JVM**（`J`ava `V`irtual `M`achine ，Java 虚拟机）：是一个虚拟的计算机，是 Java 程序的运行环境。JVM 具有指令集并使用不同的存储区域，负责执行指令，管理数据、内存、寄存器。

#### 功能 1：实现 Java 程序的跨平台性

我们编写的 Java 代码，都运行在**JVM** 之上。正是因为有了 JVM，才使得 Java 程序具备了跨平台性。

#### 功能 2：自动内存管理(内存分配、内存回收)

- Java 程序在运行过程中，涉及到运算的`数据的分配`、`存储`等都由 JVM 来完成
- Java 消除了程序员回收无用内存空间的职责。提供了一种系统级线程跟踪存储空间的分配情况，在内存空间达到相应阈值时，检查并释放可被释放的存储器空间。
- GC 的自动回收，提高了内存空间的利用效率，也提高了编程人员的效率，很大程度上`减少了`因为没有释放空间而导致的`内存泄漏`。

## JDK 和 JRE

- **JDK** (`J`ava `D`evelopment `K`it)：是 Java 程序开发工具包，包含`JRE` 和开发人员使用的工具。
- **JRE ** (`J`ava `R`untime `E`nvironment) ：是 Java 程序的运行时环境，包含`JVM` 和运行时所需要的`核心类库`。

> 小结：
>
> JDK = JRE + 开发工具集（例如 Javac 编译工具等）
>
> JRE = JVM + Java SE 标准类库

## 注释

- Java 中的注释类型：
  - 单行注释

    ```java
    //注释文字
    ```

  - 多行注释

    ```java
    /*
    注释文字1
    注释文字2
    注释文字3
    */
    ```

  - 文档注释 (Java 特有)

    ```java
    /**
      @author  指定java程序的作者
      @version  指定源文件的版本
    */
    ```

> 小结:
>
> 1.一个 java 文件只写一个 class,而且带 public
>
> 2.类名和 java 文件名保持一致
>
> 3.main 方法写在带 public 的类中

## println 和 print 区别

> 相同点:都是输出语句
> 不同点:
> a.println:输出之后自带换行效果
> b.print:输出之后不带换行效果

## 快捷键

> 1.  复制当前行 ctrl+d
> 2.  一次操作多行:
>
> &#x9;a.预留出足够的空间
>
> &#x9;b.按住 alt 不放,鼠标往下拉,此时发现光标变长了
>
> 1.  `sout`: 打印

## 开发体验：HelloWorld（掌握）

JDK 安装完毕，我们就可以开发第一个 Java 程序了，习惯性的称为：HelloWorld。

### 开发步骤

Java 程序开发三步骤：**编写**、**编译**、**运行**。

- 将 Java 代码**编写**到扩展名为 .java 的源文件中
- 通过 javac.exe 命令对该 java 文件进行**编译**，生成一个或多个字节码文件
- 通过 java.exe 命令对生成的 class 文件进行**运行**

### 编写

（1）在目录下新建文本文件，完整的文件名修改为`HelloWorld.java`，其中文件名为`HelloWorld`，后缀名必须为`.java`。

（2）用记事本或 editplus 等文本编辑器打开（虽然记事本也可以，但是没有关键字颜色标识，不利于初学者学习）

（3）在文件中输入如下代码，并且保存：

```java
class HelloChina {
  	public static void main(String[] args) {
    	System.out.println("HelloWorld!!");
  	}
}
```

- **友情提示 1：每个字母和符号必须与示例代码一模一样，包括大小写在内。**

第一个`HelloWord` 源程序就编写完成了，但是这个文件是程序员编写的，JVM 是看不懂的，也就不能运行，因此我们必须将编写好的`Java源文件` 编译成 JVM 可以看懂的`字节码文件` ，也就是`.class`文件。

### 编译

命令：

```java
javac Java源文件名.后缀名java
```

举例：

```java
javac HelloWorld.java
```

编译成功后，命令行没有任何提示。打开`D:\JavaSE\chapter01`目录，发现产生了一个新的文件 `HelloChina.class`，该文件就是编译后的文件，是 Java 的可运行文件，称为**字节码文件**，有了字节码文件，就可以运行程序了。

### 运行

在 DOS 命令行中，在字节码文件目录下，使用`java` 命令进行运行。

命令：

```java
java 主类名字
```

主类是指包含 main 方法的类，main 方法是 Java 程序的入口：

```java
public static void main(String[] args){

}
```

举例：

```
java HelloChina
```

> 错误演示：
>
> java HelloChina.class

### 字符编码问题

当 cmd 命令行窗口的字符编码与.java 源文件的字符编码不一致，如何解决？

    在使用javac命令式，可以指定源文件的字符编码

```cmd
javac -encoding utf-8 Review01.java
```

# 第二章 变量\_数据类型转换

## 常量

```java
1.概述:在代码的运行过程中,值不会发生改变的数据
2.分类:
  整数常量:所有整数
  小数常量:所有带小数点的
          2.5  1.5  2.0
  字符常量:带单引号的 ''  单引号中必须有且只能有一个内容
          '1'(算)   '11'(不算)   ''(不算)  'a1'(不算)
          ' '(算)   '  '(两个空格不算)
          '写一个tab键'(算)

  字符串常量:带双引号的 ""  双引号中内容随意
            ""   "helloworld"

  布尔常量:true(真) false(假) -> 这两个单词不要加双引号
          "true"(这样写属于字符串,不属于布尔常量)

  空常量:null  代表的是数据不存在
```

## 变量

| 数据类型     | 关键字         | 内存占用 | 取值范围                                                                    |
| :----------- | :------------- | :------- | :-------------------------------------------------------------------------- |
| 字节型       | byte           | 1 个字节 | -128 至 127 定义 byte 变量时超出范围,废了                                   |
| 短整型       | short          | 2 个字节 | -32768 至 32767                                                             |
| 整型         | int（默认）    | 4 个字节 | -2^31^ 至 2^31^-1 正负 21 个亿\<br>-2147483648——2147483647                  |
| 长整型       | long           | 8 个字节 | -2^63^ 至 2^63^-1 19 位数字\<br>-9223372036854775808 到 9223372036854775807 |
| 单精度浮点数 | float          | 4 个字节 | 1.4013E-45 至 3.4028E+38                                                    |
| 双精度浮点数 | double（默认） | 8 个字节 | 4.9E-324 至 1.7977E+308                                                     |
| 字符型       | char           | 2 个字节 | 0 至 2^16^-1                                                                |
| 布尔类型     | boolean        | 1 个字节 | true，false(可以做判断条件使用)                                             |

## 变量的介绍以及使用

```java
1.变量的数据类型:
  基本数据类型:4类8种
      整型:byte short int long
      浮点型:float double
      字符型:char
      布尔型:boolean

  引用数据类型: 类 数组 接口 枚举 注解

2.概述:在代码的运行过程中,值会随着不同的情况而随时发生改变的数据

3.作用:一次接收一个数据
       将来定义一个变量,接收一个值,后续可能会根据不同的情况对此值进行修改,此时可以用变量

4.定义:
  a.数据类型 变量名 = 值;

  b.数据类型 变量名;
    变量名 = 值;

  c.连续定义三个相同类型的变量
    数据类型 变量名1,变量名2,变量名3;
    变量名1 = 值;
    变量名2 = 值;
    变量名3 = 值;

    比如:int i,j,k;
         i = 10;
         j = 20;
         k = 30;


    数据类型 变量名1 = 值,变量名2 = 值,变量名3 = 值;
    比如: int i = 10,j = 20,k = 30;

    正确读法:先看等号右边的,再看等号左边的 -> 将等号右边的数据赋值给等号左边的变量
            哪怕等号右边有运算,我们都得先将等号右边的运算算出一个值来,最后赋值给等号左边的变量

5.注意:
  a.字符串不属于基本数据类型,属于引用数据类型,用String表示
    String是一个类,只不过字符串在定义的时候可以和基本数据类型格式一样

6.float和double的区别:
  a.float的小数位只有23位二进制,能表示的最大十进制为2的23次方(8388608),是7位数,所以float型代表的小数,小数位能表示7位

  b.double的小数位只有52位二进制,能表示的最大十进制为(4 503 599 627 370 496),是16位数,所以double型代表的小数,小数位能表示出16位


7.切记:将来开发不要用float或者double直接参与运算,因为直接参与运算会有精度损失问题
```

```java
public class Demo03Var{
	public static void main(String[] args){
		//byte
		byte num1 = 100;
		System.out.println(num1);

		//short
		short num2 = 1000;
		num2 = 1001;
		System.out.println(num2);

		//int  整数的默认类型
		int num3 = 10000;
		num3 = 1;
		System.out.println(num3);

		//long -> 定义long型的变量后面加个L
		long num4 = 10L;
		System.out.println(num4);

		//float -> 定义float型变量的时候后面加个F
		float num5 = 2.5F;
		System.out.println(num5);

		//double -> 小数的默认类型
		double num6 = 2.5;
		System.out.println(num6);

		//char
		char num7 = 'A';
		System.out.println(num7);

		//boolean
		boolean num8 = true;
		boolean num9 = false;

		/*
		   num9 = false
		   num8 = num9 -> 将num9的值赋值给num8 -> 相当于num8 = false
		*/
		num8 = num9;
		System.out.println(num8);

		//String -> 是一个引用数据类型,属于类的一种,但是定义和基本类型一致
		String name = "金莲";
		System.out.println(name);
	}
}
```

## 变量使用时的注意事项

> 1 .变量不初始化(第一次赋值)不能直接使用
>
> 2.在同一个作用域(一对大括号就是一个作用域)中不能定义重名的变量
>
> 3.不同作用域中的数据尽量不要随意互相访问&#x20;
>
> &#x9; 在小作用域中能直接访问大作用域中的变量&#x20;
>
> &#x9; 在大作用域中不能直接访问小作用域中的变量

## 标识符

1.概述:咱们给类,方法,变量取的名字 2.注意:
&#x9;a.硬性规定(必须遵守)
&#x9; 标识符可以包含"英文字母","数字","\$和\_"
&#x9; 标识符不能以数字开头 int i1 = 100(正确) int 1i = 100(错误)
&#x9; 标识符不能是关键字 int static = 100(错误) int public = 100(错误)

&#x9;b.软性建议(可遵守可不遵守,但是建议遵守)
&#x9; 给类取名字:遵循大驼峰式 -> 每个单词首字母大写
&#x9; 给方法和变量取名字:遵循小驼峰式 -> 从第二个单词开始往后首字母大写

## 数据类型转换

```java
1.什么时候发生类型转换:
  a.等号左右两边类型不一致
  b.不同类型的数据做运算

2.分类:
  a.自动类型转换
    将取值范围小的数据类型赋值给取值范围大的数据类型 -> 小自动转大
    取值范围小的数据类型和取值范围大的数据类型数据做运算 -> 小自动转大

  b.强制类型转换
    当将取值范围大的数据类型赋值给取值范围小的数据类型 -> 需要强转

3.基本类型中按照取值范围从小到大排序:
  byte,short,char -> int -> long -> float -> double
```

### 自动类型转换

```java
public class Demo09DataType{
	public static void main(String[] args){
		/*
		  等号右边是整数,整数默认类型为int
		  等号左边是long型的变量

		  将取值范围小的数据类型赋值给取值范围大的数据类型,发生了自动类型转换
		*/
		long num1 = 100;
		System.out.println(num1);


		int i = 10;
		double b = 2.5;

		/*
		   double = int+double
		   double  = double+double
		   int自动提升为了double,发生了自动类型转换
		*/
		double sum = i+b;
		System.out.println(sum);
	}
}
```

### 强制类型转换

如何强转？

> 取值范围小的数据类型 变量名 = (取值范围小的数据类型)取值范围大的数据类型

```java
public class Demo10DataType{
	public static void main(String[] args){
		/*
		  等号右边的数据是小数,小数默认类型为double
		  等号左边的变量是float型

		  将取值范围大的赋值给取值范围小 -> 报错,需要强转
		*/
		//float num1 = 2.5;
		//float num1 = (float)2.5;
		float num1 = 2.5F;
		System.out.println(num1);

	}
}
```

### 强转的注意事项

```java
1.不要随意写成强转的格式,因为会有精度损失问题以及数据溢出现象,除非没有办法
2.byte,short定义的时候如果等号右边是整数常量,如果不超出byte和short的范围,不需要我们自己强转,jvm自动转型

  byte,short如果等号右边有变量参与,byte和short自动提升为int,然后结果再次赋值给byte或者short的变量,需要我们自己手动强转


3.char类型数据如果参与运算,会自动提升为int型,如果char类型的字符提升为int型会去ASCII码表(美国标准交换代码)范围内去查询字符对应的int值,如果在ASCII码表范围内没有对应的int值,回去unicode码表(万国码)中找
```

```java
public class Demo11DataType{
	public static void main(String[] args){
		//精度损失
		int i = (int)2.9;
		System.out.println(i);

		/*
		  数据溢出
		  int型占内存4个字节,4个字节变成二进制是32位

		  100个亿: 10 0101 0100 0000 1011 1110 0100 0000 0000 -> 34位二进制

		  100个亿的二进制位比int型的二进制位多出来2位,此时干掉最前面的2位

		  101 0100 0000 1011 1110 0100 0000 0000

		  101 0100 0000 1011 1110 0100 0000 0000->1410065408
		*/
		int j = (int)10000000000L;
		System.out.println(j);//1410065408

	    System.out.println("=========================");

		byte b = 10;
		System.out.println(b);

		b = (byte)(b+1);
		System.out.println(b);

		System.out.println("=========================");

		char c = '中';
		System.out.println(c+0);//20013
	}
}
```

## 进制的转换

### 十进制转二进制

> 辗转相除法 -> 循环除以 2,取余数

![image](https://chu-image-host.oss-cn-beijing.aliyuncs.com/typora/1698489992624.png)

### 二进制转十进制

> 8421 规则

![image](https://chu-image-host.oss-cn-beijing.aliyuncs.com/typora/1698490196480.png)

### 二进制转八进制

> 将二进制数分开 (3 位为一组)，不够的前面补 0

![image](https://chu-image-host.oss-cn-beijing.aliyuncs.com/typora/1698490532286.png)

### 二进制转换为十六进制

> 将二进制数分组-> 4 位为一组

![image](https://chu-image-host.oss-cn-beijing.aliyuncs.com/typora/1698490908576.png)

## 位运算符

> & | ^：
>
> 1、这三个符号既可以在位运算中也可以在逻辑运算中
>
> 2、区别：左右两侧是数字，则是位运算；两侧是 boolean，则是逻辑运算

| 符号 | 说明                                                                                                                           |
| :--- | :----------------------------------------------------------------------------------------------------------------------------- |
| &    | 1.单与,如果前后都是布尔型,有假则假,但是如果符号前为 false,符号后的判断会继续执行<br /> 2.如果该符号前后都是数字,看做是位运算符 |
| &&   | 1.双与,有假则假,但是有短路效果,如果符号前为 false,符号后的判断就不会执行了                                                     |
| \|   | 1.单或,如果前后都是布尔型,有真则真,但是如果符号前为 true,符号后的判断会继续执行<br />2.如果该符号前后都是数字,看做是位运算符   |
| \|\| | 1.双或,有真则真,但是有短路效果,如果符号前为 true,符号后的判断就不会执行了                                                      |

| 位运算符 | 符号解释                               |
| :------- | :------------------------------------- |
| &        | 有假则假                               |
| \|       | 有真则真                               |
| \~       | 取反                                   |
| ^        | 符号前后结果一样为 false,不一样为 true |
| <<       | 左移运算符                             |
| >>       | 右移运算符                             |
| >>>      | 无符号右移运算符                       |

```java
1.符号的介绍:
  a. &(与) -> 有假则假
  b. |(或) -> 有真则真
  c. ~(非) -> 取反
  d. ^(异或) -> 符号前后结果一样为false,不一样为true
     true ^ true -> false
     false ^ false -> false
     true ^ false -> true
     false ^ true -> true

2.   1代表true   0代表false

3.我们要知道计算机在存储数据的时候都是存储的数据的补码,计算也是用的数据的补码
  但是我们最终看到的结果是原码换算出来的

  原码   反码   补码

4.正数二进制最高位为0;  负数二进制最高位为1

5.如果是正数  原码 反码 补码 一致
  比如:5的原码  反码  补码一致:
      0000 0000 0000 0000 0000 0000 0000 0101 -> 因为是正数,二进制最高位为0

  如果是负数,原码 反码 补码不一样了
       反码是原码的基础上最高位不变,剩下的0和1互换
       补码是在反码的基础上+1

  比如:-9  (补成32个数字)
       原码: 1000 0000 0000 0000 0000 0000 0000 1001
       反码: 1111 1111 1111 1111 1111 1111 1111 0110
       补码: 1111 1111 1111 1111 1111 1111 1111 0111
```

注意：以数据的==补码==进行计算

### 左移：<<

**运算规则**：左移几位就相当于乘以 2 的几次方

**注意：** 当左移的位数 n 超过该数据类型的总位数时，相当于左移（n-总位数）位

```java
2<<2   结果等于8
快速算法:  2*(2的2次方)

-2<<2  等于-8
快速算法: -2*(2的2次方)
```

### 右移：>>

快速运算：类似于除以 2 的 n 次，如果不能整除，**向下取整**

```java
9>>2  等于2
快速算法: 9除以(2的2次方)

-9>>2   等于-3
快速算法: -9除以(2的2次方)
```

**==注意：负数右移，左边补 1==**

![image](https://chu-image-host.oss-cn-beijing.aliyuncs.com/typora/1698493979532.png)

### 无符号右移：>>>

运算规则：往右移动后，左边空出来的位直接补 0，不管最高位是 0 还是 1 空出来的都拿 0 补

正数：和右移一样

```java
9>>>2 等于2
```

负数：右边移出去几位，左边补几个 0，结果变为正数

```java
-9>>>2
结果为:1073741821
```

> 笔试题: 8>>>32 位 -> 相当于没有移动还是 8
>
> 8>>>34 位 -> 相当于往右移动 2 位

### 按位与：&

小技巧:将 0 看成为 false 将 1 看成 true

运算规则：对应位都是 1 才为 1,相当于符号左右两边都为 true,结果才为 true

```java
5&3 结果1
```

![image](https://chu-image-host.oss-cn-beijing.aliyuncs.com/typora/1698494481587.png)

### 按位或：|

运算规则：对应位只要有 1 即为 1,相当于符号前后只要有一个为 true,结果就是 true

1|1 结果 1

1|0 结果 1

0|1 结果 1

0|0 结果 0

```java
5|3    结果为7
```

![image](https://chu-image-host.oss-cn-beijing.aliyuncs.com/typora/1698494610146.png)

### 按位异或：^

1^1 结果为 0 false

1^0 结果为 1 true

0^1 结果为 1 true

0^0 结果 0 false

```java
5^3   结果为6
```

![image](https://chu-image-host.oss-cn-beijing.aliyuncs.com/typora/1698494755473.png)

### 按位取反：\~

运算规则：\~0 就是 1

\~1 就是 0

```java
~10   结果为-11
```

![image](https://chu-image-host.oss-cn-beijing.aliyuncs.com/typora/1698494969654.png)

# 第三章 运算符

## IDEA 的使用

> 1.生成 main 方法:输入 main -> 回车
>
> 2.生成输出语句\:sout -> 回车
>
> 3.将变量名放到输出语句中:
>
> a.变量名.sout
>
> b.变量名.soutv -> 带字符串平拼接格式的输出方式-> 输出格式好看

## 快捷键

| 快捷键               | 功能                                   |
| :------------------- | :------------------------------------- |
| `Alt+Enter`          | 导入包，自动修正代码(重中之重)         |
| `Ctrl+Y`             | 删除光标所在行                         |
| `Ctrl+D`             | 复制光标所在行的内容，插入光标位置下面 |
| `Ctrl+Alt+L`         | 格式化代码                             |
| `Ctrl+/`             | 单行注释                               |
| `Ctrl+Shift+/`       | 选中代码注释，多行注释，再按取消注释   |
| `Alt+Shift+上下箭头` | 移动当前代码行                         |

## 出现的问题

```java
1.在运行代码时会出现"找不到对应的发行源"或者"不支持发行版本"或者"无效的发行源版本",证明本地jdk版本和idea中的language level不匹配
  所以要匹配版本
  file->project Structure->点击project->引入本地jdk->project level选择对应的版本
2.没有out路径的问题
  out路径是专门存放idea自动编译生成的.class文件的
  所以需要指明out路径

3.src是灰色的,对着src,右键,选项中没有java class或者package

4.刚使用,jdk没有配置
```

## 1.算数运算符

| 符号 | 说明                                                                                     |
| ---- | ---------------------------------------------------------------------------------------- |
| +    | 加法                                                                                     |
| -    | 减法                                                                                     |
| \*   | 乘法                                                                                     |
| /    | 除法<br>如果符号前后都是整数,结果取整数部分<br>如果符号前后有一个为小数,结果就是正常小数 |
| %    | 模,取余数部分                                                                            |

### 1.2.自增自减运算符(也算算数运算符的一种)

```java
1.格式:
  变量++ -> 后自加
  ++变量 -> 前自加
  变量-- -> 后自减
  --变量 -> 前自减

  自增和自减只变化1

2.使用:
  a.单独使用: ++ -- 单独为一句,没有和其他的语句掺和使用
    i++;

    符号前在在后都是先运算

  b.混合使用: ++ -- 和其他的语句掺和使用了(比如:输出语句,赋值语句)
    符号在前:先运算,在使用运算后的值
    符号在后:先使用原值,使用完毕之后,自身再运算

```

```java
package com.msl.calc;

public class demo01 {
    public static void main(String[] args) {
//        单独使用
        int a = 1;
//        a++;
        ++a;
        System.out.println("a = " + a);
        System.out.println("===========================");

//        混合使用
        int i = 10;
        int result01 = i++;
        System.out.println("result01 = " + result01); // 10
        System.out.println("i = " + i); // 11

        System.out.println("===========================");
        int j = 10;
        int result02 = ++j;
        System.out.println("result02 = " + result02); // 11
        System.out.println("j = " + j); // 11
    }
}

```

## 2.赋值运算符

```java
1.基本赋值运算符:
  =  -> 先看等号右边的,再将右边的数据赋值给等号左边的变量

2.复合赋值运算符:
  +=:
    int i = 10;
    i+=2 -> i = i+2


  -=
  *=
  /=  : 取整数部分
  %=  : 取余数部分

3.注意:byte short 遇到复合赋值运算符,jvm会自动转型
```

## 3.关系运算符(比较运算符)

```java
1.结果:boolean型 -> 要么是true,要么是false
2.作用:做条件判断使用
```

| 符号 | 说明                                                         |
| ---- | ------------------------------------------------------------ |
| ==   | 如果符号前后相等为 true;否则为 false                         |
| >    | 如果符号前的数据大于符号后的数据为 true,否则为 false         |
| <    | 如果符号前的数据小于符号后的数据为 true,否则为 false         |
| >=   | 如果符号前的数据大于或者等于符号后的数据为 true,否则为 false |
| <=   | 如果符号前的数据小于或者等于符号后的数据为 true,否则为 false |
| !=   | 如果符号前后不相等为 true;否则为 false                       |

## 4.逻辑运算符

```java
 1.作用:连接多个boolean结果的
 2.结果:boolean型结果
```

| 符号        | 说明                                                                                                                             |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------- |
| &&(与,并且) | 有假则假,符号前后有一个结果为 false,整体就是 false                                                                               |
| \|\|(或者)  | 有真则真,符号前后有一个结果为 true,整体就是 true                                                                                 |
| !(非,取反)  | 不是 true,就是 false;不是 false,就是 true                                                                                        |
| ^(异或)     | 符号前后结果一样为 false;不一样为 true<br>true^true -> false<br>true^false -> true<br>false^true -> true<br>false^false -> false |

> | 符号 | 说明                                                                                                                        |
> | ---- | --------------------------------------------------------------------------------------------------------------------------- |
> | &    | 1.单与,如果前后都是布尔型,有假则假,但是如果符号前为 false,符号后的判断会继续执行<br>2.如果该符号前后都是数字,看做是位运算符 |
> | &&   | 1.双与,有假则假,但是有短路效果,如果符号前为 false,符号后的判断就不会执行了                                                  |
> | \|   | 1.单或,如果前后都是布尔型,有真则真,但是如果符号前为 true,符号后的判断会继续执行<br>2.如果该符号前后都是数字,看做是位运算符  |
> | \|\| | 1.双或,有真则真,但是有短路效果,如果符号前为 true,符号后的判断就不会执行了                                                   |
>
> ```java
> public class Demo02Logic {
>  public static void main(String[] args) {
>      int a = 10;
>      int b = 20;
>      //boolean result01 = (++a>100)&(++b>10);
>      //boolean result01 = (++a > 100) && (++b > 10);
>
>      //boolean result01 = (++a<100)|(++b>10);
>      boolean result01 = (++a<100)||(++b>10);
>      System.out.println("result01 = " + result01);
>      System.out.println("a = " + a);
>      System.out.println("b = " + b);
>  }
> }
> ```
>
> 问题:定义一个变量(a),随意给一个值,判断这个变量接收的值是否在 1-100 之间
>
> 1<=a<=100 -> 错误,这是数学写法
>
> i>=1 && i<=100 -> java 写法,用逻辑运算符拼接多个判断

## 5.三元运算符

```java
1.格式:
  boolean表达式?表达式1:表达式2

2.执行流程:
  先判断,如果是true,就走?后面的表达式1,否则就走:后面的表达式2
```

# 流程控制

## 键盘录入

```java
1.概述:是java定义好的一个类
2.作用:将数据通过键盘录入的形式放到代码中参与运行
3.位置:java.util
4.使用:
  a.导包:通过导包找到要使用的类 -> 导包位置:类上
    import java.util.Scanner -> 导入的是哪个包下的哪个类

  b.创建对象
    Scanner 变量名 = new Scanner(System.in);

  c.调用方法,实现键盘录入
    变量名.nextInt() 输入整数int型的
    变量名.next() 输入字符串  String型的
```

```java
package com.msl.scnner;

import java.util.Scanner;

public class Demo01 {
    public static void main(String[] args) {
//        创建对象
        Scanner sc = new Scanner(System.in);

//        输入一个int数据
        int data1 = sc.nextInt();
        System.out.println("data1 = " + data1);

//        输入一个string数据
        String data2 = sc.next();
        System.out.println("data2 = " + data2);
    }
}

```

**注意：**

> 变量名.next():录入字符串 -> 遇到空格和回车就结束录入了
> 变量名.nextLine():录入字符串 -> 遇到回车就结束录入了

> ```java
> Exception in thread "main" java.util.InputMismatchException -> 输入类型不匹配异常
> 	at java.base/java.util.Scanner.throwFor(Scanner.java:939)
> 	at java.base/java.util.Scanner.next(Scanner.java:1594)
> 	at java.base/java.util.Scanner.nextInt(Scanner.java:2258)
> 	at java.base/java.util.Scanner.nextInt(Scanner.java:2212)
> 	at com.atguigu.a_scanner.Demo04Scanner.main(Demo04Scanner.java:8)
>
> 原因:录入的数据和要求的数据类型不一致
> ```

## Random 随机数

> 学习 Random 和学习 Scanner 方式方法一样

```java
1.概述:java自带的一个类
2.作用:可以在指定的范围内随机一个整数
3.位置:java.util
4.使用:
  a.导包:import java.util.Random
  b.创建对象:
    Random 变量名 = new Random()
  c.调用方法,生成随机数:
    变量名.nextInt() -> 在int的取值范围内随机一个整数
```

```java
package com.msl.random;

import java.util.Random;

public class Demo01 {
    public static void main(String[] args) {
//        创建实例对象
        Random rd = new Random();
//       在1-100间随机
        int data1 = rd.nextInt(100) + 1;
        System.out.println("data1 = " + data1);
    }
}

```

```java
在指定范围内随机一个数:
nextInt(int bound) -> 在0-(bound-1)

a.nextInt(10) -> 0-9
b.在1-10之间随机一个数: nextInt(10)+1 -> (0-9)+1 -> 1-10
c.在1-100之间随机一个数:nextInt(100)+1 -> (0-99)+1 -> 1-100
d.在100-999之间随机一个数: nextInt(900)+100 -> (0-899)+100 -> 100-999
```

## switch(选择语句)

### 1.switch 基本使用

```java
1.格式:
  switch(变量){
      case 常量值1:
          执行语句1;
          break;

      case 常量值2:
          执行语句2;
          break;

      case 常量值3:
          执行语句3;
          break;

      case 常量值4:
          执行语句4;
          break;
          ...
      default:
          执行语句n;
          break;
  }

2.执行流程:
  用变量接收的值和下面case后面的常量值匹配,匹配上哪个case就执行哪个case对应的执行语句
  如果以上所有case都没有匹配上,就走default对应的执行语句n

3.break关键字:代表的是结束switch语句

4.注意:switch能匹配什么类型的数据:
  byte short int char 枚举类型 String类型


```

### 2.case 的穿透性

```java
1.如果没有break,就会出现case的穿透性,程序就一直往下穿透执行,直到遇到了break或者switch代码执行完毕了,就停止了
```

````java
```java
public class Demo03Switch {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int month = sc.nextInt();
        switch(month){
            case 12:
            case 1:
            case 2:
                System.out.println("冬季");
                break;

            case 3:
            case 4:
            case 5:
                System.out.println("春季");
                break;

            case 6:
            case 7:
            case 8:
                System.out.println("夏季");
                break;

            case 9:
            case 10:
            case 11:
                System.out.println("秋季");
                break;
            default:
                System.out.println("什么情况,你家有这个月份?");
        }
    }
}

```
````

## 分支语句

### if 的三种格式

```java
1.格式:
  if(boolean表达式){
      执行语句;
  }

2.执行流程:
  先走if后面的boolean表达式,如果是true,就走if后面大括号中的执行语句,否则就不走

3.注意:
  if后面跟的是boolean表达式,只要是结果为boolean型的,都可以放在小括号中,哪怕直接写一个true或者false
```

```java
1.格式:
  if(boolean表达式){
      执行语句1;
  }else{
      执行语句2;
  }
2.执行流程:
  a.先走if后面的boolean表达式,如果是true,就走if后面的执行语句1
  b.否则就走else后面的执行语句2
```

```java
1.格式:
  if(boolean表达式){
      执行语句1
  }else if(boolean表达式){
      执行语句2
  }else if(boolean表达式){
      执行语句3
  }...else{
      执行语句n
  }

2.执行流程:
  从if开始往下挨个判断,哪个if判断结果为true,就走哪个if对应的执行语句,如果以上所有的判断都是false,就走else对应的执行语句n

3.使用场景:2种情况以上的判断
```

### if 和 switch 区别

> switch 和 if 的区别:debug
>
> 1.switch:会直接跳到相匹配的 case
>
> 2.if:从上到下挨个判断 -> 实际开发主要用 if 做判断,灵活

## 循环语句

> 什么时候使用循环语句:
> 当我们发现一件事或者一段代码在反复执行,我们就可以考虑使用循环语句了

### for 循环

```java
1.格式:
  for(初始化变量;比较;步进表达式){
      循环语句 -> 哪段代码循环执行,就将哪段代码放到此处
  }

2.执行流程:
  a.先走初始化变量
  b.比较,如果是true,走循环语句,走步进表达式(初始化的变量的值进行变化)
  c.再比较,如果还是true,继续走循环语句,走步进表达式
  d.再比较,直到比较为false,循环结束了
```

> 快捷键: 次数.fori

### while 循环

```java
1.格式:
  初始化变量;
  while(比较){
      循环语句;
      步进表达式
  }

2.执行流程:
  a.初始化变量
  b.比较,如果是true,就走循环语句,走步进表达式
  c.再比较,如果还是true,继续走循环语句,继续走步进表达式
  d.再比较,直到比较为false,循环结束
```

### do…while 循环

```java
1.格式:
  初始化变量;
  do{
      循环语句;
      步进表达式
  }while(比较);

2.执行流程:
  a.初始化变量
  b.走循环语句
  c.走步进表达式
  d.判断,如果是true,继续循环,直到比较为false,循环结束

3.特点:
  至少循环一次
```

### 循环控制关键字

```java
1.break:
  a.在switch中代表结束switch语句
  b.在循环中代表结束循环

2.continue:
  结束当前本次循环,直接进入下一次循环,直到条件为false为止
```

### 死循环

```java
1.概述:
  一直循环
2.什么条件下一直循环:
  比较条件一直是true

```

### 嵌套循环

```java
1.概述:循环中还有循环
2.执行流程:
  先执行外层循环,再进入内层循环,内层循环就一直循环,直到内层循环结束,外层循环进入下一次循环,直到外层循环都结束了,整体结束
```

# 数组

## 数组的定义

```java
1.问题:想将一个数据保存起来,我们可以使用变量,但是变量一次只能存储一个数据,所以我们想能不能一次存多个数据

2.数组概述:是一个容器,数组本身属于引用数据类型

3.作用:一次存储多个数据

4.特点:
  a.既可以存储基本类型的数据,还能存储引用类型的数据
  b.定长(定义数组时长度为多长,最多就能存多少个数据)

5.定义:
  a.动态初始化:
    数据类型[] 数组名 = new 数据类型[长度]
    数据类型 数组名[] = new 数据类型[长度]

    各部分解释:
      等号左边的数据类型:规定了数组中只能存储什么类型的元素
      []:代表的是数组,一个[]代表一维数组,两个[][]代表二维数组
      数组名:自己取的名字,遵循小驼峰
      new:代表的是创建数组
      等号右边的数据类型:要和等号左边的数据类型一致
      [长度]:指定数组长度,规定了数组最多能存多少个数据

  b.静态初始化
    数据类型[] 数组名 = new 数据类型[]{元素1,元素2...}  -> 不推荐使用
    数据类型 数组名[] = new 数据类型[]{元素1,元素2...}  -> 不推荐使用

  c.简化的静态初始化:
    数据类型[] 数组名 = {元素1,元素2...}-> 推荐使用


6.区别:
  a.动态初始化:定义的时候只指定了长度,没有存具体的数据
             当只知道长度,但不知道具体存啥数据时可以使用动态初始化


  b.静态初始化:定义的时候就直接知道存啥了
```

### 索引

```java
1.概述:元素在数组中存储的位置

2.特点:
  a.索引唯一
  b.索引都是从0开始的,最大索引是数组长度-1

3.注意:
  我们将来操作元素,必须通过索引来操作
  存数据,要指定索引
  取数据,要指定索引
  查数据,要指定索引
```

## 数组的操作

### 存储元素

```java
1.格式:
  数组名[索引值] = 值 -> 将等号右边的值放到数组指定的索引位置上
```

### 获取元素

```java
1.地址值:
  数组在内存中的身份证号,唯一标识,我们可以通过这个唯一标识到内存中准确找到这个数,从而操作这个数组中的数据

2.注意:
  a.直接输出数组名,会直接输出数组在内存中的地址值
  b.如果数组中没有存元素,那么直接获取索引上对应的元素也是有值的,只不过不是我们存储的数据,而是数组中的元素默认值
    整数: 0
    小数: 0.0
    字符: '\u0000' -> 空白字符 -> 对应的int值是0
    布尔: false
    引用: null
```

### 遍历数组

```java
1.遍历:将元素从数组中一个一个的获取出来
```

> ```java
> 快速遍历快捷键: 数组名.fori
> ```

```java
for (int i : arr) {
	System.out.println(arr[i]);
}
```

```java
// 老式写法
for (int i = 0; i < arr.length; i++) {
  System.out.println(arr[i]);
}
```

### 异常操作

1. 数组索引越界异常\_ArrayIndexOutOfBoundsException

```java
public class Demo09Array {
    public static void main(String[] args) {
        int[] arr = new int[3];
        arr[0] = 100;
        arr[1] = 200;
        arr[2] = 300;
        //arr[3] = 400;//索引3超出了arr的索引范围

        //arr[-1] = 1000;//索引3超出了arr的索引范围

        for (int i = 0; i <= arr.length; i++) {
            System.out.println(arr[i]);//索引3超出了arr的索引范围
        }
    }
}
```

2. 空指针异常\_NullPointerException

```java
public class Demo10Array {
    public static void main(String[] args) {

        int[] arr = new int[3];
        System.out.println(arr.length);//3
        arr = null;
        System.out.println(arr.length);//NullPointerException
    }
}
```

# 内存图

```java
1.内存:可以理解"内存条",任何程序,软件运行起来都会在内存中运行,占用内存,在java的世界中,将内存分为了5大块

2.分为哪5大块
  栈(重点)(Stack)
    主要运行方法,方法的运行都会去栈内存中运行,运行完毕之后,需要"弹栈",腾空间

  堆(重点):(Heap)
    每new一次,都会在堆内存中开辟空间,并为此空间自动分配一个地址值
    堆中的数据都是有默认值的
    整数:0
    小数:0.0
    字符: '\u0000'
    布尔:false
    引用:null

  方法区(重点)(Method Area)
    代码的"预备区",记录了类的信息以及方法的信息

  本地方法栈(了解):专门运行native方法(本地方法)
    本地方法可以理解为对java功能的扩充
    有很多功能java语言实现不了,所以就需要依靠本地方法完成

  寄存器(了解) -> 跟CPU有关
```

# 二维数组

## 二维数组的定义格式

```java
1.概述:数组中的套多个数组
2.定义格式
  a.动态初始化
    数据类型[][] 数组名 = new 数据类型[m][n] -> 推荐
    数据类型 数组名[][] = new 数据类型[m][n]
    数据类型[] 数组名[] = new 数据类型[m][n]

    m:代表的是二维数组的长度
    n:代表的是二维数组中每一个一维数组的长度

    数据类型[][] 数组名 = new 数据类型[m][] -> 二维数组中的一维数组没有被创建

  b.静态初始化
    数据类型[][] 数组名 = new 数据类型[][]{{元素1,元素2...},{元素1,元素2...},{元素1,元素2...}}
    数据类型 数组名[][] = new 数据类型[][]{{元素1,元素2...},{元素1,元素2...},{元素1,元素2...}}
    数据类型[] 数组名[] = new 数据类型[][]{{元素1,元素2...},{元素1,元素2...},{元素1,元素2...}}

  c.简化静态初始化:
    数据类型[][] 数组名 = {{元素1,元素2...},{元素1,元素2...},{元素1,元素2...}}
    数据类型 数组名[][] = {{元素1,元素2...},{元素1,元素2...},{元素1,元素2...}}
    数据类型[] 数组名[] = {{元素1,元素2...},{元素1,元素2...},{元素1,元素2...}}
```

> 动态初始化的二维数组，二维数组里面的一维数组长度是固定的
>
> 静态初始化的二维数组，二维数组里面的一维数组长度可以不固定

```java
public class Demo01Array {
    public static void main(String[] args) {
    //     二维数组
        int[][] arr = new int[3][4];
        int[][] arr2 = new int[3][];

        System.out.println("===========================");

        int [][] arr3 = {{1,2,3},{4,5},{6,7,8,9}};
    }
}
```

## 获取二维数组长度

```java
1.格式:
  数组名.length

2.获取每一个一维数组长度,需要先遍历二维数组,将每一个一维数组从二维数组中拿出来
```

## 获取二维数组中的元素

```java
1.格式:
  数组名[i][j]

  i:代表的是一维数组在二维数组中的索引位置
  j:代表的是元素在一维数组中的索引位置
```

```java
public class Demo03Array {
    public static void main(String[] args) {
        String[][] arr = {{"张三","李四"},{"王五","赵六","田七"},{"猪八","牛九"}};
        System.out.println(arr[0][0]);
        System.out.println(arr[2][0]);
        System.out.println(arr[1][1]);
    }
}
```

## 二维数组中存储元素

```java
1.格式:
  数组名[i][j] = 值

  i:代表的是一维数组在二维数组中的索引位置
  j:代表的是元素在一维数组中的索引位置
```

## 二维数组的遍历

```java
1.先遍历二维数组,将每一个一维数组遍历出来
2.再遍历每一个一维数组,将元素获取出来
```

# 方法

```java
1.方法:
  拥有功能性代码的代码块
  将不同的功能放在不同的方法中,给每个方法取个名字,直接调用方法名,对应的方法就执行起来了,好维护

2.通用定义格式:
  修饰符 返回值类型 方法名(参数){
      方法体
      return 结果
  }

3.通过通用格式,分成四种方法来学习:
  a.无参无返回值方法
  b.有参无返回值方法
  c.无参有返回值方法
  d.有参有返回值方法
```

## 无参无返回值

```java
1.无参无返回值方法定义:
  public static void 方法名(){
      方法体 -> 实现此方法的具体代码

  }

2.调用:直接调用
  在其他方法中: 方法名()

3.注意事项:
  a.void关键字代表无返回值,写了void,就不要在方法中写return 结果
  b.方法不调用不执行, main方法是jvm调用的
  c.方法之间不能互相嵌套,方法之间是平级关系
  d.方法的执行顺序只和调用顺序有关
```

## 有参数无返回值

```java
1.格式:
  public static void 方法名(数据类型 变量名){
      方法体
  }

2.调用:
  直接调用:方法名(具体的值) -> 调用的时候要给参数赋值
```

## 无参有返回值

```java
1.格式:
  public static 返回值类型 方法名(){
      方法体
      return 结果
  }

2.调用: 返回值返回给了谁? 哪里调用返回给哪里
  a.打印调用:sout(方法名()) -> 不推荐使用
  b.赋值调用:调用完之后用一个变量接收返回值结果 -> 极力推荐
    数据类型 变量名 = 方法名()
```

## 有参有返回值

```java
1.格式:
  public static 返回值类型 方法名(参数){
      方法体
      return 结果
  }

2.调用:
  a.打印调用:
    sout(方法名(具体的值))

  b.赋值调用(极力推荐)
    数据类型 变量名 = 方法名(具体的值)
```

## 重载(overload)

```java
1.概述:方法名相同,参数列表不同的方法
2.什么叫参数列表不同:
  a.参数个数不同
  b.参数类型不同
  c.参数类型顺序不同

3.判断两个方法是否为重载方法,和什么无关:
  a.和参数名无关
  b.和返回值无关
```

# 七、面向对象

## 1.面向对象的介绍

```java
1.面向过程:自己的事情自己干,代表语言C语言
          洗衣服:每一步自己要亲力亲为 -> 找个盆,放点水,找个搓衣板,搓搓搓
2.面向对象:自己的事情别人帮忙去干,代表语言Java语言
          洗衣服:自己的事情别人干 -> 全自动洗衣机

3.为啥要使用面向对象思想编程:懒
  很多功能别人都给我们实现好了,我们只需要直接拿过来使用即可,简化了我们自己的编写过程,减少了我们的代码量

4.什么时候使用面向对象思想编程:
  调用别人的功能时
  在一个类中想使用别的类中的成员时,就使用面向对象思想编程
  至于我们使用的功能人家怎么实现的,我们不需要关心,我们只需要知道怎么使用即可

5.怎么使用面向对象思想编程:
  a.new呀,new完点呀-> 点代表的是调用
  b.特殊:如果调用的成员带static关键字,我们不需要new,我们直接类名点即可
```

## 2.类和对象

### 2.1类(实体类)\_class

```java
1.测试类:带main方法的类,主要是运行代码的
2.实体类:是一类事物的抽象表示形式
        世间万物的分类:比如: 人类   狗类   猫类   鼠标类
```

```java
组成部分:
  1.属性(成员变量):这一类事物有啥
    a.定义位置:类中方法外
    b.作用范围:作用于当前类
    c.定义格式: 数据类型 变量名
    d.默认值:
      整数:0
      小数:0.0
      字符:'\u0000'
      布尔:false
      引用:null

  2.行为(成员方法):这一类事物都能干啥
    只需要将模块六所学的方法中的static干掉,其他的都一样
```

```java
public class Person {
    //属性-> 成员变量
    String name;
    int age;

    //行为 -> 成员方法
    public void eat(){
        System.out.println("人要干饭");
    }

    public void drink(){
        System.out.println("人要喝水");
    }
}

```

### 2.2对象

```java
1.概述:一类事物的具体体现
2.使用:
  a.导包: import 包名.类名
    如果两个类在同一个包下,想要使用对方的成员不需要导包
    如果两个类不在同一个包下,想要使用对方的成员需要导包

    特殊包:java.lang -> 使用lang包下的类不需要导包 -> String

    友情提示:在学四种权限修饰符之前,尽量让两个类在同一个包下

  b.创建对象:想要使用哪个类中的成员,就new哪个类的对象
    类名 对象名 = new 类名() -> 比如: Person person = new Person()

  c.调用成员(成员变量,成员方法) -> 想要使用哪个类中的成员,就用哪个类的对象去点哪个成员
    对象名.成员变量名 = 值
    对象名.方法名() -> 调用的是无参无返回值方法
    对象名.方法名(实参) -> 调用的是有参无返回值方法
    数据类型 变量名 = 对象名.方法名() -> 调用的是无参有返回值方法
    数据类型 变量名 = 对象名.方法名(实参) -> 调用的是有参有返回值方法
```

```java
public class Person {
    //属性-> 成员变量
    String name;
    int age;

    //行为 -> 成员方法
    public void eat(){
        System.out.println("人要干饭");
    }

    public void drink(){
        System.out.println("人要喝水");
    }
}

```

```java
public class Demo01Person {
    public static void main(String[] args) {
        Person person = new Person();
        System.out.println(person.name);
        System.out.println(person.age);
        person.name = "金莲";
        person.age = 26;
        System.out.println(person.name);
        System.out.println(person.age);

        person.eat();
        person.drink();

    }
}

```

## 3.匿名对象的使用

> ```java
> 1.int i = 10
>   a.int:是数据类型
>   b.i:变量名
>   c.等号右边的10:真正的数据
>
> 2.Person p = new Person()
>   a.等号左边的Person:对象的类型,好比是int
>   b.p:对象名
>   c.等号右边的new Person():真正的数据,是一个Person对象,将这个对象真正创建出来了
> ```

```java
1.所谓的匿名对象:其实就是没有等号左边的部分,只有等号右边的部分(对象)
2.使用:
  new 对象().成员

3.注意:
  a.如果我们只想单纯的调用一个方法,让方法执行,我们可以考虑使用匿名对象
  b.但是如果涉及到赋值,千万不要用匿名对象
```

```java
public class Person {
    String name;
    public void eat(){
        System.out.println("人要吃饭");
    }
}
```

```java
public class Demo01Person {
    public static void main(String[] args) {
        //原始方式
        Person p = new Person();
        p.name = "金莲";
        System.out.println(p.name);
        p.eat();

        System.out.println("=================");

        //匿名对象
        new Person().eat();

        new Person().name = "大郎";
        System.out.println(new Person().name);//null
    }
}

```

## 成员变量和局部变量

```java
1.定义位置不同(重点)
  a.成员变量:类中方法外
  b.局部变量:定义在方法之中或者参数位置

2.初始化值不同(重点)
  a.成员变量:有默认值的,所以不用先手动赋值,就可以直接使用
  b.局部变量:是没有默认值的,所以需要先手动赋值,再使用

3.作用范围不同(重点)
  a.成员变量:作用于整个类
  b.局部变量:只作用于自己所在的方法,其他方法使用不了

4.内存位置不同(了解)
  a.成员变量:在堆中,跟着对象走
  b.局部变量:在栈中,跟着方法走

5.生命周期不同(了解)
  a.成员变量:随着对象的创建而产生,随着对象的消失而消失
  b.局部变量:随着方法的调用而产生,随着方法的调用完毕而消失
```

## 封装

### private

```java
1.问题:
  定义成员变量,只要是new出来对象,就可以随便调用,随便赋值,哪怕是不合理的值我们也挡不住,怎么办?
  将属性封装起来(隐藏细节)

  a.关键字:private(私有化的) -> 被private修饰的成员只能在本类中使用,在别的类中使用不了

  b.注意:
    将代码放到一个方法中,也是封装的体现
    一个成员被private修饰也是封装的体现,只不过private最具代表性

  c.private的使用:
    修饰成员变量:private 数据类型 变量名
    修饰方法:将public改成private,其他的都一样

2.问题:属性被私有化了,外界直接调用不了了,那么此时属性就不能直接赋值取值了,所以需要提供公共的接口
       get/set方法

      set方法:为属性赋值
      get方法:获取属性值
```

### this

```java
1.如果成员变量和局部变量重名时,我们遵循"就近原则",先访问局部变量
2.this概述:代表的是当前对象
3.作用:this可以区分重名的成员变量和局部变量
      this点出来的一定是成员的变量

4.this代表当前对象,那么具体代表哪个对象呢?
  哪个对象调用的this所在的方法,this就代表哪个对象
```

### 构造方法

```java
1.概述:方法名和类名一致并且能初始化对象的方法
2.分类:
  a.无参构造:没有参数
  b.有参构造:有参数,参数是为指定的属性赋值
  c.满参构造:给所有属性赋值

  以上构造咱们不用记那么详细,我们就记有参和无参构造就可以了

3.特点:
  a.方法名和类名一致
  b.没有返回值,连void都没有
```

示例：

```java
public class Person {
    private String name;
    private int age;

    //无参构造
    public Person(){
        System.out.println("我是无参构造");
    }

    //有参构造
    public Person(String name,int age){
        this.name = name;
        this.age = age;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getAge() {
        return age;
    }
}
```

### 标准javabean

JavaBean` 是 Java语言编写类的一种标准规范。符合`JavaBean\` 的类，要求：

（1）类必须是具体的(非抽象 abstract)和公共的，public class 类名

（2）并且具有无参数的构造方法，有参构造

（3）成员变量私有化，并提供用来操作成员变量的`set` 和`get` 方法。

```java
com.atguigu.controller -> 专门放和页面打交道的类(表现层)
com.atguigu.service -> 专门放业务处理的类 (业务层)
com.atguigu.dao -> 专门放和数据库打交道的类(持久层)
com.atguigu.pojo -> 专门放javabean类
com.atguigu.utils -> 专门放工具类
```

> 快捷键
> Windows电脑：alt + insert
> Mac电脑： command + n

### JavaBean怎么来的

```java
1.将来的javabean都是和数据库的表相关联
  a.类名 -> 表名
  b.属性名 -> 列名
  c.对象 -> 表中每一行数据
  d.属性值 -> 表中单元格中的数据
```

## static

```java
1.概述:static是一个静态关键字
2.使用:
   a.修饰一个成员变量:
     static 数据类型 变量名

   b.修饰一个方法:
      修饰符 static 返回值类型 方法名(形参){
             方法体
             return 结果
      }

3.调用静态成员:
   类名直接调用(不用new对象)

4.静态成员特点:
   a.静态成员属于类成员,不属于对象成员(非静态的成员属于对象成员)
   b.静态成员会随着类的加载而加载
   c.静态成员优先于非静态成员存在在内存中
   d.凡是根据静态成员所在的类创建出来的对象,都可以共享这个静态成员
```

# 继承

## 1.什么是继承

```java
1.父类怎么形成的:我们的定义了多个类,发现这些类中有很多重复性的代码,我们就定义了一个父类,将相同的代码抽取出来放到父类中,其他的类直接继承这个父类,就可以直接使用父类中的内容了

2.怎么去继承: extends
   子类 extends 父类

3.注意:
  a.子类可以继承父类中私有和非私有成员,但是不能使用父类中私有成员

  b.构造方法不能继承
```

## 2.继承如何使用

```java
1.定义一个父类,在其中定义重复性的代码
2.定义一个子类继承父类 -> extends
  子类 extends 父类
3.创建子类对象,直接使用父类中非私有成员
```

## 3.继承中,成员变量和成员方法的访问特点

### 3.1 成员变量

> 总结:继承前提下,成员变量访问特点口诀:
>
> 看等号左边是谁,就是先调用谁中的成员,子类没有,找父类

### 2.2 成员方法

> 成员方法:看new的是谁,先调用谁中的方法,子类没有,找父类
>
> 成员方法访问特点:看new的是谁,先调用谁中的方法

```java
public class Fu {
    int numFu = 100;
    int num = 10000;
    public void methodFu(){
        System.out.println("我是父类中的methodFu");
    }

    public void method(){
        System.out.println("我是父类中的method方法");
    }
}
```

```java
public class Zi extends Fu{
    int numZi = 10;
    int num = 1000;
    public void methodZi(){
        System.out.println("我是子类中的methodZi方法");
    }

    public void method(){
        System.out.println("我是子类中的method方法");
    }
}
```

```java
public class Test01 {
    public static void main(String[] args) {
        Fu fu = new Fu();
        fu.methodFu();
       // fu.methodZi(); 不能直接调用子类特有的方法
        fu.method();//父类中的method方法

        System.out.println("=====================");
        Zi zi = new Zi();
        zi.methodZi();
        zi.methodFu();//继承父类之后,能调用父类非私有成员
        zi.method();//子类中的method方法

        System.out.println("===================");

        Fu fu1 = new Zi();
        fu1.method();//调用的是子类中的method方法
    }
}

```

## 4.方法的重写

```java
1.概述:子类中有一个和父类方法名以及参数列表相同的方法
2.前提:继承
3.访问:看new的是谁,先调用谁中的,如果new的是子类,调用子类重写的方法,子类没有,找父类
4.检测是否为重写方法:在该方法上写
  @Override
```

### 4.1.注意事项

```java
1.子类重写父类方法之后,权限必须要保证大于等于父类权限(权限指的是访问权限)
  public -> protected -> 默认 -> private
2.子类方法重写父类方法,方法名和参数列表要一样
3.私有方法不能被重写,构造方法不能被重写,静态方法不能被重写
4.子类重写父类方法之后,返回值类型应该是父类方法返回值类型的子类类型
```

### 4.2.使用场景

```java
1.使用场景:功能升级改造,子类需要对父类中已经实现好的功能进行重新改造
```

# super和this

## 1.继承中构造方法的特点

```java
1.注意:new子类对象时,会先初始化父类(先走父类无参构造方法)
2.原因:
  每个构造方法的第一行,默认都会有一个super(),不写jvm自动提供一个
  super()代表的是父类无参构造
```

## 2.super和this的具体使用

### 2.1 super的具体使用

```java
1.概述:代表的是父类引用
2.作用:可以调用父类中的成员
3.使用:
  a.调用父类构造方法-> 在子类中的构造中写
    super() -> 调用父类无参构造
    super(实参)  -> 调用父类有参构造

  b.调用父类成员变量:
    super.成员变量名

  c.调用父类成员方法:
    super.成员方法名(实参)
```

### 2.2 this的具体使用

```java
1.this概述:代表的是当前对象(哪个对象调用的this所在的方法,this就代表哪个对象)
2.作用:
  a.区分重名的成员变量和局部变量
  b.调用当前对象中的成员
3.使用:
  a.调用当前对象的构造:在构造中写
    this():调用当前对象的无参构造
    this(实参):调用当前对象的有参构造
  b.调用当前对象的成员变量:
    this.成员变量名
  c.调用当前对象的成员方法:
    this.成员方法名(实参)
4.注意:
  不管是super还是this,只要在构造中使用,都必须在第一行,所以二者不能同时手写出来
```

## 3.继承的特点

```java
1.继承只支持单继承,不能多继承
  public class A extends B,C{}  -> 错误
2.继承支持多层继承
  public class A extends B{}
  public class B extends C{}
3.一个父类可以有多个子类
  public class A extends C{}
  public class B extends C{}

4.构造方法不能继承,也不能重写
  私有方法可以继承,但是不能被重写
  静态方法可以继承,但是不能被重写
```

## 4.问题:如何为父类中private的成员变量赋值(经验值)

### 4.1.利用set赋值

```java
public class Employee {
    private String name;
    private int age;

    public Employee() {
    }

    public Employee(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void work(){
        System.out.println("工作");
    }
}

```

```java
public class Teacher extends Employee{
}
```

```java
        Teacher teacher = new Teacher();
        teacher.setName("涛哥");
        teacher.setAge(18);
        System.out.println(teacher.getName()+"..."+teacher.getAge());
```

### 4.2.利用构造方法赋值

```java
public class Employee {
    private String name;
    private int age;

    public Employee() {
    }

    public Employee(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void work(){
        System.out.println("工作");
    }
}

```

```java
public class Manager extends Employee{
    public Manager() {
    }

    public Manager(String name, int age) {
        super(name, age);
    }
}
```

```java
        Manager manager = new Manager("金莲", 24);
        System.out.println(manager.getName()+"..."+manager.getAge());
```

# 抽象

## 1.抽象的介绍

```java
   1.抽象类怎么来的？
     抽取共性方法,放到父类中,发现方法没法实现,因为每个子类对此方法的实现方式细节不一样
此时方法体说不清道不明,可以定义成抽象方法
    抽象方法所在的类一定是抽象类


   2.关键字: abstract

   3.抽象方法:
      修饰符 abstract 返回值类型 方法名(参数);

   4.抽象类:
       public  abstract class 类名{}

   5.注意:
       a.抽象方法所在的类一定是抽象类
       b.抽象类中不一定非得有抽象方法
       c.子类继承父类之后,需要重写父类
          中所有的抽象方法,不然编译报错
       d.抽象类不能new对象,只能通过new子类对象调动重写方法

   6.可以将抽象类看成是一类事物的标准,要求只要是属于这一类的,都必须要拥有抽象类中的方法,必须要给我实现,怎么证明拥有了,怎么证明实现了呢?-> 重写
     至于这个方法怎么实现,就看子类重写之后怎么写方法体了
```

## 2.抽象的注意事项

```java
1.抽象类不能直接new对象,只能创建非抽象子类的对象
2.抽象类中不一定非得有抽象方法,但是抽象方法所在的类一定抽象类
3.抽象类的子类,必须重写父类中的所有抽象方法,否则,编译报错,除非该子类也是抽象类
4.抽象类中可以有成员变量,构造,成员方法
5.抽象类中可以有构造方法,是供子类创建对象时,初始化父类属性使用的
```

# 接口

## 1.接口的定义以及使用

```java
1.接口:是一个引用数据类型,是一种标准,规则
2.关键字:
   a.interface 接口
      public interface 接口名{}

  b.implements 实现
      实现类 implements 接口名{}

3.接口中可以定义的成员:

   a.jdk7以及之前:
     抽象方法: public abstract  -> 即使不写public abstract,默认也有
     成员变量:public static final 数据类型 变量名 = 值-> 即使不写public static final,默认也有
                    final是最终的,被final修饰的变量不能二次赋值,所以我们一般将final修饰的变量视为常量

   b.jdk8:
      默认方法:public default 返回值类型 方法名(形参){}
      静态方法:public static 返回值类型 方法名(形参){}

   c.jdk9开始:
     私有方法:
        private的方法
```

```java
1.定义接口:
  public interface 接口名{}
2.实现:
  public class 实现类类名 implements 接口名{}
3.使用:
  a.实现类实现接口
  b.重写接口中的抽象方法
  c.创建实现类对象(接口不能直接new对象)
  d.调用重写的方法
```

```java
public interface USB {
    public abstract void open();
    public abstract void close();
}

```

```java
public class Mouse implements USB{
    @Override
    public void open() {
        System.out.println("鼠标打开");
    }

    @Override
    public void close() {
        System.out.println("鼠标关闭");
    }
}

```

```java
public class Test01 {
    public static void main(String[] args) {
        Mouse mouse = new Mouse();
        mouse.open();
        mouse.close();
    }
}

```

## 3.接口中的成员

### 3.1抽象方法

```java
1.定义格式:
  public abstract 返回值类型 方法名(形参);
2.注意:
  不写public abstract 默认也有
3.使用:
  a.定义实现类,实现接口
  b.重写抽象方法
  c.创建实现类对象,调用重写的方法
```

```java
public interface USB {
    public abstract void open();
    String close();
}
```

```java
public class Mouse implements USB{
    @Override
    public void open() {
        System.out.println("鼠标打开");
    }

    @Override
    public String close() {
        return "鼠标关闭";
    }
}
```

```java
public class Test01 {
    public static void main(String[] args) {
        Mouse mouse = new Mouse();
        mouse.open();
        String result = mouse.close();
        System.out.println("result = " + result);
    }
}

```

### 3.2默认方法

```java
1.格式:
  public default 返回值类型 方法名(形参){
      方法体
      return 结果
  }
2.使用:
  a.定义实现类,实现接口
  b.默认方法可重写,可不重写
  c.创建实现类对象,调用默认方法
```

```java
public interface USB {
   //默认方法
    public default void methodDef(){
        System.out.println("我是默认方法");
    }
}

```

```java
public class Mouse implements USB {
    @Override
    public void methodDef(){
        System.out.println("我是重写接口中的默认方法");
    }
}

```

```java
public class Test01 {
    public static void main(String[] args) {
        Mouse mouse = new Mouse();
        mouse.methodDef();
    }
}
```

### 3.3静态方法

```java
1.定义格式:
  public static 返回值类型 方法名(形参){
      方法体
      return 结果
  }

2.使用:
  接口名直接调用

```

```java
public interface USB {
   //默认方法
    public default void methodDef(){
        System.out.println("我是默认方法");
    }

    //静态方法
    public static void methodSta(){
        System.out.println("我是接口中的静态方法");
    }
}
```

```java
public class Test01 {
    public static void main(String[] args) {
        Mouse mouse = new Mouse();
        mouse.methodDef();

        System.out.println("=============");

        USB.methodSta();
    }
}

```

### 3.4成员变量

```java
1.格式:
  public static final 数据类型 变量名 = 值
2.相关知识点:final
  final代表最终的,被它修饰的变量,不能二次赋值,可以视为常量
3.特点:
  不写public static final 默认也有
4.使用:
  接口名直接调用
5.注意:
  a.被static final修饰的成员变量需要手动赋值
  b.习惯上我们会将static final修饰的成员变量名大写
```

```java
public interface USB {
    public static final int NUM1 = 100;
    int NUM2 = 200;//不写public static final 默认也有
}
```

```java
public class Test01 {
    public static void main(String[] args) {
        System.out.println(USB.NUM1);
        System.out.println(USB.NUM2);
    }
}
```

## 4.接口的特点

```java
1.接口可以多继承 -> 一个接口可以继承多个接口
  public interface InterfaceA extends InterfaceB,InterfaceC{}
2.接口可以多实现 -> 一个实现类可以实现一个或者多个接口
  public class InterfaceImpl implements InterfaceA,InterfaceB{}
3.一个子类可以继承一个父类的同时实现一个或者多个接口
  public class Zi extends Fu implements  InterfaceA,InterfaceB{}

4.注意:
  继承也好,实现接口也罢,只要是父类中或者接口的抽象方法,子类或者实现类都要重写
```

> 当一个类实现多个接口时,如果接口中的抽象方法有重名且参数一样的,只需要重写一次
>
> ```java
> public interface InterfaceA {
>     public abstract void method();
> }
>
> public interface InterfaceB {
>     public abstract void method();
> }
>
> public class InterfaceImpl implements InterfaceA,InterfaceB{
>     @Override
>     public void method() {
>         System.out.println("重写的method方法");
>     }
> }
> ```
>
> 当一个类实现多个接口时,如果多个接口中默认方法有重名的,且参数一样的,必须重写一次默认方法
>
> ```java
> public interface InterfaceA {
>     public abstract void method();
>
>     public default void methodDef(){
>         System.out.println("我是接口A中的默认方法");
>     }
> }
>
> public interface InterfaceB {
>     public abstract void method();
>
>     /*    public default void methodDef(){
>             System.out.println("我是接口B中的默认方法");
>         }*/
>     public default void methodDef(int a) {
>         System.out.println("我是接口B中的默认方法");
>     }
> }
>
> public class InterfaceImpl implements InterfaceA,InterfaceB{
>     @Override
>     public void method() {
>         System.out.println("重写的method方法");
>     }
>
> /*    @Override
>     public void methodDef() {
>         System.out.println("重写后的默认方法");
>     }*/
> }
>
>
> public class Test01 {
>     public static void main(String[] args) {
>         InterfaceImpl anInterface = new InterfaceImpl();
>         anInterface.methodDef();
>         anInterface.methodDef(10);
>     }
> }
>
> ```

## 5.接口和抽象类的区别

```java
相同点:
  a.都位于继承体系的顶端,用于被其他类实现或者继承
  b.都不能new
  c.都包含抽象方法,其子类或者实现类都必须重写这些抽象方法

不同点:
  a.抽象类:一般作为父类使用,可以有成员变量,构造,成员方法,抽象方法等
  b.接口:成员单一,一般抽取接口,抽取的都是方法,视为功能的大集合
  c.类不能多继承,但是接口可以
```

# 多态

```java
1.面向对象三大特征:封装   继承   多态
2.怎么学:
  a.不要从字面意思上理解多态这两个字,要从使用形式上掌握
  b.要知道多态的好处
  c.要知道多态的前提
```

## 1.多态的介绍

```java
1.前提:
  a.必须有子父类继承或者接口实现关系
  b.必须有方法的重写(没有重写,多态没有意义),多态主要玩儿的是重写方法
  c.new对象:父类引用指向子类对象
    Fu fu = new Zi() -> 理解为大类型接收了一个小类型的数据 ->比如  double b = 10
2.注意:
  多态下不能直接调用子类特有功能
```

## 2.多态的基本使用

```java
public abstract class Animal {
    public abstract void eat();
}

```

```java
public class Dog extends Animal{
    @Override
    public void eat() {
        System.out.println("狗啃骨头");
    }

    //特有方法
    public void lookDoor(){
        System.out.println("狗会看门");
    }
}
```

```java
public class Cat extends Animal{
    @Override
    public void eat() {
        System.out.println("猫吃鱼");
    }

    //特有方法
    public void catchMouse(){
        System.out.println("猫会捉老鼠");
    }
}
```

```java
public class Test01 {
    public static void main(String[] args) {
        //原始方式
        Dog dog = new Dog();
        dog.eat();//重写的
        dog.lookDoor();//特有的

        Cat cat = new Cat();
        cat.eat();//重写的
        cat.catchMouse();//特有的

        System.out.println("==================");
        //多态形式new对象
        Animal animal = new Dog();//相当于double b = 10
        animal.eat();//重写的 animal接收的是dog对象,所以调用的是dog中的eat
//      animal.lookDoor();   多态前提下,不能直接调用子类特有成员

        Animal animal1 = new Cat();
        animal1.eat();//cat重写的


    }
}

```

## 3.多态的条件下成员的访问特点

### 3.1成员变量

```java
public class Fu {
    int num = 1000;
}
```

```java
public class Zi extends Fu{
    int num = 100;
}
```

```java
public class Test01 {
    public static void main(String[] args) {
        Fu fu = new Zi();
        System.out.println(fu.num);
    }
}
```

```java
看等号左边是谁,先调用谁中的成员变量
```

### 3.2成员方法

```java
public class Fu {
    int num = 1000;
    public void method(){
        System.out.println("我是父类中的method方法");
    }
}

```

```java
public class Zi extends Fu{
    int num = 100;

    public void method(){
        System.out.println("我是子类中的method方法");
    }
}

```

```java
public class Test01 {
    public static void main(String[] args) {
        Fu fu = new Zi();
        System.out.println(fu.num);//父类中的num
        fu.method();//子类中重写的method方法
    }
}

```

```java
看new的是谁,先调用谁中的成员方法,子类没有,找父类
```

## 4.多态的好处(为什么学多态)

```java
1.问题描述:
  如果使用原始方式new对象(等号左右两边一样),既能调用重写的,还能调用继承的,还能调用自己特有的成员
  但是多态方式new对象,只能调用重写的,不能直接调用子类特有的成员,那为啥还要用多态呢?

2.多态方式和原始方式new对象的优缺点:
  原始方式:
    a.优点:既能调用重写的,还能调用父类非私有的,还能调用自己特有的
    b.缺点:扩展性差

  多态方式:
    a.优点:扩展性强
    b.缺点:不能直接调用子类特有功能

      Fu fu = new Zi()
      double b = 10;
      b = 100L;

```

> 形参传递父类类型,调用此方法父类类型可以接收任意它的子类对象
> 传递哪个子类对象,就指向哪个子类对象,就调用哪个子类对象重写的方法

## 5.多态中的转型

### 5.1向上转型

```java
1.父类引用指向子类对象
  好比是: double b = 1;
```

### 5.2向下转型

```java
1.向下转型:好比强转,将大类型强制转成小类型
2.表现方式:
  父类类型 对象名1 = new 子类对象() -> 向上转型 -> double b = 1
  子类类型 对象名2 = (子类类型)对象名1 -> 向下转型 -> int i = (int)b

3.想要调用子类特有功能,我们就需要向下转型
```

```java
public abstract class Animal {
    public abstract void eat();
}
```

```java
public class Cat extends Animal {
    @Override
    public void eat() {
        System.out.println("猫吃鱼");
    }

    //特有方法
    public void catchMouse(){
        System.out.println("猫会捉老鼠");
    }
}
```

```java
public class Dog extends Animal {
    @Override
    public void eat() {
        System.out.println("狗啃骨头");
    }

    //特有方法
    public void lookDoor(){
        System.out.println("狗会看门");
    }
}

```

```java
public class Test01 {
    public static void main(String[] args) {
        //多态new对象  向上转型
        Animal animal = new Dog();
        animal.eat();//dog重写的
        //animal.lookDoor();//多态不能调用子类特有功能

        //向下转型
        Dog dog = (Dog) animal;
        dog.eat();
        dog.lookDoor();
    }
}
```

## 6.转型可能会出现的问题

```java
1.如果等号左右两边类型不一致,会出现类型转换异常(ClassCastException)
2.解决:
  在向下转型之前,先判断类型
3.怎么判断类型: instanceof
  判断结果是boolean型

4.使用:
  对象名 instanceof 类型 -> 判断的是关键字前面的对象是否符合关键字后面的类型
```

# 权限修饰符

## 1 概述

在Java中提供了四种访问权限，使用不同的访问权限修饰符修饰时，被修饰的内容会有不同的访问权限，

- public：公共的,最高权限,被public修饰的成员,在哪里都能访问

- protected：受保护的

- default：:默认的 注意 不写权限修饰符就是默认权限,不能直接把default写出来

- private：私有的,只能在自己的类中直接访问

  我们只需要知道一个成员被这四个权限修饰符修饰在4种情况下能不能访问就行了

## 2 不同权限的访问能力

|                | public | protected | default（空的） | private |
| -------------- | ------ | --------- | --------------- | ------- |
| 同类           | yes    | yes       | yes             | yes     |
| 同包不同类     | yes    | yes       | yes             | no      |
| 不同包子父类   | yes    | yes       | no              | no      |
| 不同包非子父类 | yes    | no        | no              | no      |

public具有最大权限,private有最小权限

编写代码时,如果没有特殊的考虑,建议这样使用权限:

```java
1.属性:用private -> 封装思想
2.成员方法public -> 便于调用
3.构造public -> 便于new对象
```

# final关键字

```java
1.概述:最终的
2.使用:
  a.修饰一个类
  b.修饰一个方法
  c.修饰一个局部变量
  d.修饰一个成员变量
  e.修饰一个对象

3.怎么学final:只需要知道被final修饰之后特点是啥即可
```

## 1.final修饰类

```java
1.格式:
  public final class 类名{}
2.特点:
  被final修饰的类不能被继承
```

```java
public final class Animal {
}
```

```java
public class Dog /*extends Animal*/{
}
```

## 2.final修饰方法

```java
1.格式:
  修饰符 final 返回值类型 方法名(形参){
      方法体
      return 结果
  }
2.特点:
  被final修饰的方法,不能被重写

3.注意:
  final和abstract不能同时修饰一个方法
```

## 3.final修饰局部变量

```java
1.格式:
  final 数据类型 变量名 = 值
2.特点:
  被final修饰的变量不能二次赋值
```

## 4.final修饰对象

```java
1.格式:
  final 数据类型 对象名 = new 对象();
2.特点:
  被final修饰的对象,地址值不能改变,但是对象中的属性值可以改变
```

## 5.final修饰成员变量

```java
1.格式:
  final 数据类型 变量名 = 值
2.特点:
  a.需要手动赋值
  b.不能二次赋值
```

# 代码块

### 1.构造代码块

```java
1.格式:
  {
      代码
  }

2.执行特点:优先于构造方法执行,每new一次,就会执行一次
```

### 2.静态代码块

```java
1.格式:
  static{
      代码
  }

2.执行特点:
  静态代码块优先于构造代码块和构造方法执行的,而且只执行一次
```

### 3.静态代码块使用场景

```java
如果想让一些数据最先初始化,而且只需要初始化一次,就可以将这些数据放到静态代码块中
```

# 内部类

```java
1.什么时候使用内部类:
  当一个事物的内部,还有一个部分需要完整的结构去描述,而这个内部的完整结构又只为外部事物提供服务,那么整个内部的完成结构最好使用内部类

  比如:人类都有心脏,人类本身需要用属性,行为去描述,那么人类内部的心脏也需要心脏特殊的属性和行为去描述,此时心脏就可以定义成内部类,人类中的一个心脏类

2.在java中允许一个类的定义位于另外一个类内部,前者就称之为内部类,后者称之为外部类
  class A{
      class B{

      }
  }

  类A就是类B的外部类
  类B就是类A的内部类

3.分类:
  成员内部类(静态,非静态)
  局部内部类
  匿名内部类(重点)
```

## 1 静态成员内部类

```java
1.格式:直接在定义内部类的时候加上static关键字
  public class A{
      static class B{

      }
  }

2.注意:
  a.内部类可以定义属性,方法,构造等
  b.静态内部类可以被final或者abstract修饰
    被final修饰之后,不能被继承
    被abstract修饰之后,不能new
  c.静态内部类不能调用外部的非静态成员
  d.内部类还可以被四种权限修饰符修饰

3.调用静态内部类成员:
  外部类.内部类 对象名 = new 外部类.内部类()
```

```java
public class Person {
    public void eat(){
        System.out.println("人要干饭");
    }

    static class Heart{
        public void jump(){
            System.out.println("心脏哐哐哐跳");
        }
    }
}
```

```java
public class Test01 {
    public static void main(String[] args) {
       // 外部类.内部类 对象名 = new 外部类.内部类()
        Person.Heart heart = new Person.Heart();
        heart.jump();
    }
}

```

## 2 非静态成员内部类

```java
1.格式:直接在定义内部类的时候加上static关键字
  public class A{
      class B{

      }
  }

2.注意:
  a.内部类可以定义属性,方法,构造等
  b.静态内部类可以被final或者abstract修饰
    被final修饰之后,不能被继承
    被abstract修饰之后,不能new
  c.静态内部类不能调用外部的非静态成员
  d.内部类还可以被四种权限修饰符修饰

3.调用非静态内部类成员:
  外部类.内部类 对象名 = new 外部类().new 内部类()
```

## 3.局部内部类

### 3.1.局部内部类基本操作

```java
1.可以定义在方法中,代码块中,构造中
```

### 3.2.局部内部类实际操作

#### 3.2.1.接口类型作为方法参数传递和返回

> 1.接口作为方法参数,传递实参时,传递的是实现类对象
>
> 2.接口作为返回值类型返回,实际返回的是实现类对象

#### 3.2.2.抽象类作为方法参数和返回值

> 1.抽象类作为方法参数传递,传递实参时,传递的是其子类对象
>
> 2.抽象类作为方法返回值类型返回时,实际返回的是其子类对象

#### 3.2.3.普通类做方法参数和返回值

> 普通类作为方法参数传递,传递的是对象
>
> 普通类作为方法返回值返回,返回的是对象

## 4.匿名内部类(重点)

> 所谓的匿名内部类,可以理解为没有显式声明出类名的内部类

```java
1.问题描述:我们如果想实现接口,简单使用一次抽象方法,我们就需要创建一个实现类,实现这个接口,重写抽象方法,还要new实现类对象,所以我们在想如果就单纯的想使用一次接口中的方法,我们能不能不这么麻烦呢?可以
  a.创建实现类,实现接口
  b.重写方法
  c.创建实现类对象
  d.调用方法

2.如果就想单纯的使用一下接口中的方法,我们就没必要经过以上四步了,我们可以四合一

3.匿名内部类怎么学:就按照一种格式来学,这一种格式就代表了实现类对象或者子类对象

4.格式:
  new 接口/抽象类(){
      重写方法
  }.重写的方法();

  =================================

  类名 对象名 = new 接口/抽象类(){
      重写方法
  }
  对象名.重写的方法();
```

> 1.什么时候使用匿名内部类:
>
> ​ 当简单调用一次接口中的方法,我们就可以使用匿名内部类
>
> 2.将一种格式代表实现类对象或者子类对象来看待,来学习
>
> 3.匿名内部类会编译生成的,咱们不要管,我们只需要利用咱们讲的格式去new对象,调用重写的方法即可

# 异常

## 1.异常介绍

```java
1.概述:代码出现了不正常的现象;在java中,异常都是一个一个的类
```

## 2.创建异常对象(了解)

> 创建异常对象,只是为了后面学习如何处理异常,其他的暂时没有啥意义

```java
1.关键字:throw
2.格式: throw new 异常
```

## 4.异常处理方式(重点)

### 4.1 异常处理方式一\_throws

```java
1.格式:在方法参数和方法体之间位置上写
  throws 异常
2.意义:处理异常
  将异常往上抛
```

```java
public class Demo04Exception {
    public static void main(String[] args)throws FileNotFoundException {
        String s = "a.txt1";
        add(s);//添加功能
        delete();//删除功能
        update();//修改功能
        find();//查询功能
    }


    private static void add(String s)throws FileNotFoundException {
        if (!s.endsWith(".txt")) {
            //故意创建异常
            throw new FileNotFoundException("文件找不到");
        }
        System.out.println("我要执行了");
    }

    private static void find() {
        System.out.println("查询功能");
    }

    private static void update() {
        System.out.println("修改功能");
    }

    private static void delete() {
        System.out.println("删除功能");
    }
}
```

### 4.2 异常处理方式一\_throws多个异常

```java
1.格式:throws 异常1,异常2

2.注意:
  如果throws的多个异常之间有子父类继承关系,我们可以直接throws父类异常
  如果不知道多个异常之间是否有子父类继承关系,我们可以直接throws Exception
```

### 4.3 异常处理方式二\_try...catch

```java
1.格式:
  try{
      可能出现异常的代码
  }catch(异常 对象名){
      处理异常的代码-> 将来开发会将异常信息保存到日志文件中
  }
```

### 4.4.异常处理方式二\_多个catch

```java
1.格式:
  try{
      可能出现异常的代码
  }catch(异常 对象名){
      处理异常的代码-> 将来开发会将异常信息保存到日志文件中
  }catch(异常 对象名){
      处理异常的代码-> 将来开发会将异常信息保存到日志文件中
  }catch(异常 对象名){
      处理异常的代码-> 将来开发会将异常信息保存到日志文件中
  }catch(异常 对象名){
      处理异常的代码-> 将来开发会将异常信息保存到日志文件中
  }...

2.注意:
  如果catch的多个异常之间有子父类继承关系,我们可以直接catch父类异常
  如果不知道多个异常之间是否有子父类继承关系,我们也可以直接catch Exception
```

## 5.finally关键字

```java
1.概述:代表的是不管是否触发了异常,都会执行的代码块
  特殊情况:如果之前执行了System.exit(0)终止当前正在执行的java虚拟机
2.使用:都是配合try...catch使用
  try{
      可能出现异常的代码
  }catch(异常 对象名){
      处理异常的代码-> 将来开发会将异常信息保存到日志文件中
  }finally{
      不管是否有异常,都会执行的代码
  }
```

> finally的使用场景:
>
> 1.关闭资源
>
> 2.原因:对象如果没有用了,GC(垃圾回收器)回收,用来回收堆内存中的垃圾,释放内存,但是有一些对象GC回收不了,比如:连接对象(Connection),IO流对象,Socket对象,这些对象GC回收不了,就需要我们自己手动回收,手动关闭
>
> ​ 将来不能回收的对象new完之后,后续操作不管是否操作成功,是否有异常,我们都需要手动关闭,此时我们就可以将关闭资源的代码放到finally中
>
> ```java
> public class Test {
>  public static void main(String[] args) {
>      FileWriter fw = null;
>      try {
>          fw = new FileWriter("day13_exception_object\\1.txt");
>          fw.write("哈哈哈");//假如这里写失败或者写成功了
>      } catch (IOException e) {
>          throw new RuntimeException(e);
>      }finally {
>          if (fw!=null){
>              try {
>                  fw.close();
>              } catch (IOException e) {
>                  throw new RuntimeException(e);
>              }
>          }
>
>      }
>  }
> }
> ```

## 6.抛异常时注意的事项

1.  如果父类中的方法抛了异常,那么子类重写之后要不要抛?
    可抛可不抛
2.  如果父类中的方法没有抛异常,那么子类重写之后要不要抛?\
    ==不要抛==

## 7.try_catch和throws的使用时机

```java
1.如果处理异常之后,还想让后续的代码正常执行,我们使用try...catch
2.如果方法之间是递进关系(调用),我们可以先throws,但是到了最后需要用try...catch做一个统一的异常处理
```

## 8.自定义异常

```java
1.需求:键盘录入一个用户名,实现登录功能,如果登录失败,抛出LoginUserException
```

```java
public class LoginUserException extends Exception{
    public LoginUserException() {
    }

    public LoginUserException(String message) {
        super(message);
    }
}

```

```java
public class Demo11Exception {
    public static void main(String[] args) throws LoginUserException {
        //1.定义一个用户名,代表已经注册的用户
        String username = "root";
        //2.创建Scanner对象,录入用户名
        Scanner sc = new Scanner(System.in);
        System.out.println("请您输入要登录的用户名:");
        String name = sc.next();
        //3.判断用户名是否和已经存在的用户名一致
        if (name.equals(username)){
            System.out.println("登录成功了");
        }else{
            throw new LoginUserException("登录失败了,用户名或者密码有问题");
        }
    }
}

```

> 1.定义一个类
>
> 2.如果继承Exception 就是编译时期异常
>
> 3.如果继承RuntimeException,就是运行时期异常

## 9.打印异常信息的三个方法

```java
Throwable类中的方法:
  String toString()  :输出异常类型和设置的异常信息
  String getMessage(): 输出设置的异常信息
  void printStackTrace():打印异常信息是最全的:包括异常类型,信息,以及出现的行数等
```

# Object类

```java
1.概述:所有类的根类(父类),所有的类都会直接或者间接继承Object类
```

## 1.Object中的toString

```java
1.Object中的toString方法:返回该对象的字符串表示形式
    public String toString() {
        return getClass().getName() + "@" + Integer.toHexString(hashCode());
    }

2.注意:
  a.如果没有重写Object中的toString方法,直接输出对象名会默认调用Object中的toString方法,直接输出地址值
  b.如果重写了Object中的toString方法,再输出地址值,重写没有意义,所以重写完toString之后,应该返回对象的内容

3.总结:
  如果直接输出对象名不想输出地址值,就重写Object中的toString方法
```

> 快速生成toString
>
> alt+insert -> 选择toString -> 直接下一步
> command + m

## 2.Object中的equals

```java
1.概述:比较两个对象的地址值是否相等
    public boolean equals(Object obj) {
        return (this == obj);
    }

    == 针对于基本数据类型来说,比较的是值
    == 针对于引用数据类型来说,比较的是地址值

2.注意:
  a.如果没有重写Object中的equals方法,那么就会调用Object中的equals方法,比较对象的地址值
  b.如果重写了Object中的equals方法,那么就会调用重写后的equals方法,应该比较对象的内容
```

> 小结:
>
> 1.如果直接输出对象名不想输出地址值,重写toString方法
>
> 2.如果想比较两个对象的内容,就重写一下equals方法
>
> 3.怎么重写\:alt+insert -> 选toString 或者equals and hashcode -> 啥也不要管 -> 一路下一步即可

## 3.Object中的clone方法

```java
1.作用:复制一个属性值一样的新对象
2.使用:
  需要被克隆的对象实现Cloneable
  重写clone方法
```

# 经典接口

## 1.java.lang.Comparable

我们知道基本数据类型的数据（除boolean类型外）需要比较大小的话，之间使用比较运算符即可，但是引用数据类型是不能直接使用比较运算符来比较大小的。那么，如何解决这个问题呢？

Java给所有引用数据类型的大小比较，指定了一个标准接口，就是java.lang.Comparable接口：

```java
package java.lang;

public interface Comparable{
    int compareTo(Object obj);
}
```

那么我们想要使得我们某个类的对象可以比较大小，怎么做呢？步骤：

第一步：哪个类的对象要比较大小，哪个类就实现java.lang.Comparable接口，并重写方法

- 方法体就是你要如何比较当前对象和指定的另一个对象的大小

第二步：对象比较大小时，通过对象调用compareTo方法，根据方法的返回值决定谁大谁小。

- this对象（调用compareTo方法的对象）减 指定对象（传入compareTo()的参数对象）大于0,返回正整数
- this对象（调用compareTo方法的对象）减 指定对象（传入compareTo()的参数对象）小于0 返回负整数
- this对象（调用compareTo方法的对象）减 指定对象（传入compareTo()的参数对象）等于0 返回零

## 2.java.util.Comparator

思考：

（1）如果一个类，没有实现Comparable接口，而这个类你又不方便修改（例如：一些第三方的类，你只有.class文件，没有源文件），那么这样类的对象也要比较大小怎么办？

（2）如果一个类，实现了Comparable接口，也指定了两个对象的比较大小的规则，但是此时此刻我不想按照它预定义的方法比较大小，但是我又不能随意修改，因为会影响其他地方的使用，怎么办？

JDK在设计类库之初，也考虑到这种情况了，所以又增加了一个java.util.Comparator接口。

```java
package java.util;

public interface Comparator{
    int compare(Object o1,Object o2);
}
```

那么我们想要比较某个类的两个对象的大小，怎么做呢？步骤：

第一步：编写一个类，我们称之为比较器类型，实现java.util.Comparator接口，并重写方法

- 方法体就是你要如何指定的两个对象的大小

第二步：比较大小时，通过比较器类型的对象调用compare()方法，将要比较大小的两个对象作为compare方法的实参传入，根据方法的返回值决定谁大谁小。

- o1对象减o2大于0返回正整数
- o1对象减o2小于0返回负整数
- o1对象减o2等于0返回零

# String

## 1.String介绍

```java
1.概述:String 类代表字符串
2.特点:
  a.Java 程序中的所有字符串字面值（如 "abc" ）都作为此类的实例(对象)实现
    凡是带双引号的,都是String的对象
    String s = "abc"
    "abc"就是对象;String就是对象的数据类型;s就是对象名

  b.字符串是常量,它们的值在创建之后不能更改
    String s = "hello"
    s+="world" -> 会产生新对象

  c.String 对象是不可变的，所以可以共享
    String s1 = "abc"
    String s2 = "abc"
```

## 2.String的实现原理

```java
1.jdk8的时候:String底层是一个被final修饰的char数组-> private final char[] value;
2.jdk9开始到之后:底层是一个被final修饰的byte数组-> private final byte[] value;

  一个char类型占2个字节
  一个byte类型占1个字节 -> 省内存空间
```

```java
字符串定义完之后,数组就创建好了,被final一修饰,数组的地址值直接定死
```

## 3.String的创建

```java
1.String()  -> 利用String的无参构造创建String对象
2.String(String original) -> 根据字符串创建String对象
3.String(char[] value) -> 根据char数组创建String对象
4.String(byte[] bytes) -> 通过使用平台的默认字符集解码指定的 byte 数组，构造一个新的 String
                          a.平台:操作系统
                          b.操作系统默认字符集:GBK
                            GBK:一个中文占2个字节
                            UTF-8:一个中文占3个字节
                            而且,中文对应的字节一般都是负数

                            代码在idea中写的,idea启动的时候,会自动加一个启动参数,此启动参数为UTF-8
                            -Dfile.encoding=UTF-8

5.简化形式:
  String 变量名 = ""
```

```java
1.String(char[] value, int offset, int count)->将char数组的一部分转成String对象
         value:要转String的char数组
         offset:从数组的哪个索引开始转
         count:转多少个
2.String(byte[] bytes, int offset, int length)->将byte数组的一部分转成String对象
         bytes:要转String的byte数组
         offset:从数组的哪个索引开始转
         length:转多少个
```

# String的方法

## 1.判断方法

```java
boolean equals(String s) -> 比较字符串内容
boolean equalsIgnoreCase(String s) -> 比较字符串内容,忽略大小写
```

## 2.获取功能

```java
int length() -> 获取字符串长度
String concat(String s)-> 字符串拼接,返回新串儿
char charAt(int index) -> 根据索引获取对应的字符
int indexOf(String s) -> 获取指定字符串在大字符串中第一次出现的索引位置
String subString(int beginIndex) -> 截取字符串,从指定索引开始截取到最后,返回新串儿
String subString(int beginIndex,int endIndex) -> 截取字符串,从beginIndex开始到endIndex结束
                                                 含头不含尾,返回新串儿
```

## 3.练习2

```java
遍历字符串
```

```java
public class Demo05String {
    public static void main(String[] args) {
        String s = "abcdefg";
        for (int i = 0; i < s.length(); i++) {
            System.out.println(s.charAt(i));
        }
    }
}

```

## 4.转换功能

```java
1.char[] toCharArray() -> 将字符串转成char数组
2.byte[] getBytes() -> 将字符串转成byte数组
3.String replace(CharSequence c1,CharSequence c2)-> 替换字符
                 CharSequence->String的接口

4.byte[] getBytes(String charsetName) -> 按照指定的编码将字符串转成byte数组
```

## 5.分割功能

```java
1.String[] split(String regex)->按照指定的规则分割字符串
  注意:regex写的是正则表达式 -> . 在正则表达式中代表任意一个字符
```

## 6.其他方法

```java
1.boolean contains(String s) -> 判断老串儿中是否包含指定的串儿
2.boolean endsWith(String s) -> 判断老串儿是否以指定的串儿结尾
3.boolean startsWith(String s) -> 判断老串儿是否以指定的串儿开头
4.String toLowerCase()-> 将字母转成小写
5.String toUpperCase() -> 将字母转成大写
6.String trim() -> 去掉字符串两端空格
```

# StringBuilder类

## 1.StringBuilder的介绍

```java
1.概述:一个可变的字符序列,此类提供了一个与StringBuffer兼容的一套API,但是不保证同步(线程不安全,效率高)
2.作用:主要是字符串拼接
3.问题:
  a.刚讲完String,String也能做字符串拼接,直接用+即可,但是为啥还要用StringBuilder去拼接呢?
  b.原因:
    String每拼接一次,就会产生新的字符串对象,就会在堆内存中开辟新的空间,如果拼接次数多了,会占用内存,效率比较底

    StringBuilder,底层自带一个缓冲区(没有被final修饰的byte数组)拼接字符串之后都会在此缓冲区中保存,在拼接的过程中,不会随意产生新对象,节省内存

4.StringBuilder的特点:
  a.底层自带缓冲区,此缓冲区是没有被final修饰的byte数组,默认长度为16
  b.如果超出了数组长度,数组会自动扩容
    创建一个新长度的新数组,将老数组的元素复制到新数组中,然后将新数组的地址值重新赋值给老数组
  c.默认每次扩容老数组的2倍+2
    如果一次性添加的数据超出了默认的扩容数组长度(2倍+2),比如存了36个字符,超出了第一次扩容的34,就按照实际数据个数为准,就是以36扩容
```

## 2.StringBuilder的使用

```java
1.构造:
  StringBuilder()
  StringBuilder(String str)
```

```java
public class Demo01StringBuilder {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder();
        System.out.println(sb);

        StringBuilder sb1 = new StringBuilder("abc");
        System.out.println(sb1);

    }
}
```

```java
常用方法:
  StringBuilder append(任意类型数据) -> 字符串拼接,返回的是StringBuilder自己
  StringBuilder reverse()-> 字符串翻转,返回的是StringBuilder自己
  String toString() -> 将StringBuilder转成String-> 用StringBuilder拼接字符串是为了效率,为了不占内存,那么拼完之后我们后续可能会对拼接好的字符串进行处理,就需要调用String中的方法,所以需要将StringBuilder转成String
```

> String:拼接字符串效率低,每拼接一次,都会产生一个新的字符串对象,耗费内存资源
>
> StringBuilder和StringBuffer区别:
>
> a.相同点:
>
> 用法一样,作用一样
>
> b.不同点:
>
> StringBuilder:拼接效率比StringBuffer高
>
> ​ 线程不安全
>
> StringBuffer:效率比较底,线程安全
>
> 拼接效率\:StringBuilder>StringBuffer>String

# Math类

## 1.Math类介绍

```java
1.概述:数学工具类
2.作用:主要用于数学运算
3.特点:
  a.构造方法私有了
  b.方法都是静态的
4.使用:
  类名直接调用
```

## 2.Math类方法

```java
static int abs(int a) -> 求参数的绝对值
static double ceil(double a) -> 向上取整
static double floor(double a) ->向下取整
static long round(double a)  -> 四舍五入
static int max(int a, int b) ->求两个数之间的较大值
static int min(int a, int b) ->求两个数之间的较小值
```

# BigInteger

## 1.BigInteger介绍

```java
1.问题描述:我们操作数据,将来的数据有可能非常大,大到比long还要大,这种数据我们一般称之为"对象"
2.作用:
  处理超大整数
3.构造:
  BigInteger(String val) -> 参数的格式必须是数字形式
4.方法:
  BigInteger add(BigInteger val)  返回其值为 (this + val) 的 BigInteger
  BigInteger subtract(BigInteger val) 返回其值为 (this - val) 的 BigInteger
  BigInteger multiply(BigInteger val)  返回其值为 (this * val) 的 BigInteger
  BigInteger divide(BigInteger val)    返回其值为 (this / val) 的 BigInteger
```

> int intValue() 将BigInteger转成int
>
> long longValue() 将BigInteger 转成 long
>
> BigInteger上限:42亿的21亿次方,内存根本扛不住,所以我们可以认为BigInteger无上限

# BigDecimal类

## 1.BigDecimal介绍

```java
1.问题描述:我们知道直接用float或者double做运算会出现精度损失的问题,所以将来设计到钱,我们就不能用float或者double直接做运算

2.作用:主要是解决float和double直接做运算出现的精度损失问题

3.构造方法:
  BigDecimal(String val)  -> val必须要是数字形式

4.常用方法:
  static BigDecimal valueOf(double val)  -> 此方法初始化小数时可以传入double型数据
  BigDecimal add(BigDecimal val)  返回其值为 (this + val) 的 BigDecimal
  BigDecimal subtract(BigDecimal val) 返回其值为 (this - val) 的 BigDecimal
  BigDecimal multiply(BigDecimal val)  返回其值为 (this * val) 的 BigDecimal
  BigDecimal divide(BigDecimal val)    返回其值为 (this / val) 的 BigDecimal
  BigDecimal divide(BigDecimal divisor, int scale, int roundingMode)
                    divisor:除号后面的那个数
                    scale:指定保留几位小数
                    roundingMode:取舍方式
                                 static int ROUND_UP -> 向上加1
                                 static int ROUND_DOWN -> 直接舍去
                                 static int ROUND_HALF_UP -> 四舍五入

5.注意:
  如果除不尽,会报错,出现运算异常
```

> double doubleValue() 将此BigDecimal转成double

## BigDecimal除法过时方法解决

```java
1.注意:如果调用的成员上面有一个横线,证明此成员过时了,底层会有一个注解@Deprecated修饰,但是过时的成员还能使用,只不过被新的成员代替了,不推荐使用了

2.方法:
  divide(BigDecimal divisor, int scale, RoundingMode roundingMode)
         divisor:代表除号后面的数据
         scale:保留几位小数
         roundingMode:取舍方式-> RoundingMode是一个枚举,里面的成员可以类名直接调用
                                UP:向上加1
                                DOWN:直接舍去
                                HALF_UP:四舍五入
```

# 第四章.Date日期类

## 1.Date类的使用

```java
1.构造:
  Date() -> 获取当前系统时间
  Date(long time) -> 获取指定时间,传递毫秒值 -> 从时间原点开始算
```

## 2.Date类的常用方法

```java
1.void setTime(long time) -> 设置时间,传递毫秒值-> 从时间原点开始算
2.long getTime()->获取时间,返回毫秒值
```

```java
        private static void date02() {
            Date date = new Date();
            //1.void setTime(long time) -> 设置时间,传递毫秒值-> 从时间原点开始算
            date.setTime(1000L);
            //2.long getTime()->获取时间,返回毫秒值
            System.out.println(date.getTime());
        }
```

# Calendar日历类

## 1.Calendar介绍

```java
1.概述:日历类,抽象类
2.获取:Calendar中的方法:
      static Calendar getInstance()
3.月份对比:
  国外: 0 1 2 3 4 5 6 7 8 9  10 11
  国内: 1 2 3 4 5 6 7 8 9 10 11 12
```

```java
常用方法:
  int get(int field) ->返回给定日历字段的值
  void set(int field, int value)  :将给定的日历字段设置为指定的值
  void add(int field, int amount) :根据日历的规则,为给定的日历字段添加或者减去指定的时间量
  Date getTime():将Calendar转成Date对象

field:代表的是日历字段-> 年 月 日 星期等,都是静态的
```

# SimpleDateFormat日期格式化类

## 1.SimpleDateFormat介绍

```java
1.概述:日期格式化类
2.构造:
  SimpleDateFormat(String pattern)
3.pattern代表啥:代表的是我们自己指定的日期格式
  字母不能改变,但是中间的连接符我们可以改变

  yyyy-MM-dd HH:mm:ss

```

| 时间字母表示 | 说明 |
| ------------ | ---- |
| y            | 年   |
| M            | 月   |
| d            | 日   |
| H            | 时   |
| m            | 分   |
| s            | 秒   |

## 2.SimpleDateFormat常用方法

```java
1.String format(Date date) -> 将Date对象按照指定的格式转成String
2.Date parse(String source)-> 将符合日期格式的字符串转成Date对象
```

# 第七章.JDK8新日期类

## 1. LocalDate 本地日期

### 1.1.获取LocalDate对象

```java
1.概述:LocalDate是一个不可变的日期时间对象，表示日期，通常被视为年月日
2.获取:
  static LocalDate now()  -> 创建LocalDate对象
  static LocalDate of(int year, int month, int dayOfMonth)  -> 创建LocalDate对象,设置年月日
```

```java
public class Demo04LocalDate {
    public static void main(String[] args) {
        //static LocalDate now()  -> 创建LocalDate对象
        LocalDate localDate = LocalDate.now();
        System.out.println("localDate = " + localDate);
        //static LocalDate of(int year, int month, int dayOfMonth)  -> 创建LocalDate对象,设置年月日
        LocalDate localDate1 = LocalDate.of(2000, 10, 10);
        System.out.println("localDate1 = " + localDate1);
    }
}
```

### 1.2.LocalDateTime对象

```java
1.LocalDateTime概述:LocalDateTime是一个不可变的日期时间对象，代表日期时间，通常被视为年 - 月 - 日 - 时 - 分 - 秒。

2.获取:
static LocalDateTime now()  创建LocalDateTime对象
static LocalDateTime of(int year, Month month, int dayOfMonth, int hour, int minute, int second) 创建LocalDateTime对象,设置年月日时分秒
```

### 1.3.获取日期字段的方法 : 名字是get开头

```java
int getYear()->获取年份
int getMonthValue()->获取月份
int getDayOfMonth()->获取月中的第几天
```

### 1.4.设置日期字段的方法 : 名字是with开头

```java
LocalDate withYear(int year):设置年份
LocalDate withMonth(int month):设置月份
LocalDate withDayOfMonth(int day):设置月中的天数
```

### 1.5.日期字段偏移

```java
设置日期字段的偏移量,方法名plus开头,向后偏移
设置日期字段的偏移量,方法名minus开头,向前偏移
```

## 2.Period和Duration类

### 2.1 Period 计算日期之间的偏差

```java
方法:
  static Period between(LocalDate d1,LocalDate d2):计算两个日期之间的差值

  getYears()->获取相差的年
  getMonths()->获取相差的月
  getDays()->获取相差的天
```

### 2.2 Duration计算时间之间的偏差

```java
1.static Duration between(Temporal startInclusive, Temporal endExclusive)  -> 计算时间差
2.Temporal : 是一个接口
  实现类:LocalDate LocalDateTime

3.参数需要传递 Temporal 的实现类对象, 注意要传递LocalDateTime
  因为Duration计算精确时间偏差,所以需要传递能操作精确时间的 LocalDateTime


4.利用Dutation获取相差的时分秒 -> to开头
  toDays() :获取相差天数
  toHours(): 获取相差小时
  toMinutes():获取相差分钟
  toMillis():获取相差秒(毫秒)
```

> 如果计算年月日 ,就用Period
>
> 如果计算时分秒,就用Duration

## 3.DateTimeFormatter日期格式化类

```java
1.获取:
  static DateTimeFormatter ofPattern(String pattern)   -> 获取对象,指定格式
2.方法:
  String format(TemporalAccessor temporal)-> 将日期对象按照指定的规则转成String
                TemporalAccessor:接口,子接口有Temporal
                Temporal的实现类:LocalDate LocalDateTime

  TemporalAccessor parse(CharSequence text)-> 将符合规则的字符串转成日期对象
                   如果想将TemporalAccessor转成我们常见的LocalDateTime日期对象,就需要用到LocalDateTime中的静态方法:
                   static LocalDateTime from(TemporalAccessor temporal)
```

# System类

```java
1.概述:系统相关类,是一个工具类
2.特点:
  a.构造私有,不能利用构造方法new对象
  b.方法都是静态的
3.使用:
 类名直接调用
```

| 方法                                                                               | 说明                                                                                                                                         |
| ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| static long currentTimeMillis()                                                    | 返回以毫秒为单位的当前时间,可以测效率                                                                                                        |
| static void exit(int status)                                                       | 终止当前正在运行的 Java 虚拟机                                                                                                               |
| static void arraycopy(Object src, int srcPos, Object dest, int destPos, int length | 数组复制<br>src:源数组<br>srcPos:从源数组的哪个索引开始复制<br>dest:目标数组<br>ldestPos:从目标数组哪个索引开始粘贴<br>length:复制多少个元素 |

# Arrays数组工具类

```java
1.概述:数组工具类
2.特点:
  a.构造私有
  b.方法静态
3.使用:类名直接调用
```

| 方法                                                 | 说明                                         |
| ---------------------------------------------------- | -------------------------------------------- |
| static String toString(int\[] a)                     | 按照格式打印数组元素<br>\[元素1, 元素2, ...] |
| static void sort(int\[] a)                           | 升序排序                                     |
| static int binarySearch(int\[] a, int key)           | 二分查找(前提是升序)                         |
| static int\[] copyOf(int\[] original, int newLength) | 数组扩容                                     |

# 包装类

## 1.基本数据类型对应的引用数据类型(包装类)

```java
1.概述:就是基本类型对应的类(包装类),我们需要将基本类型转成包装类,从而让基本类型拥有类的特性(说白了,将基本类型转成包装类之后,就可以使用包装类中的方法操作数据)

2.为啥要学包装类:
  a.将来有一些特定场景,特定操作,比如调用方法传递包装类
    比如:ArrayList集合,里面有一个方法add(Integer i),此时我们不能调用add方法之后直接传递基本类型,因为引用类型不能直接接收基本类型的值,就需要先将基本类型转成包装类,传递到add方法中
  b.将来我们还可以将包装类转成基本类型:
    包装类不能直接使用+ - * /,所以需要将包装类转成基本类型,才能使用+ - * /
```

| 基本类型 | 包装类    |
| -------- | --------- |
| byte     | Byte      |
| short    | Short     |
| int      | Integer   |
| long     | Long      |
| float    | Float     |
| double   | Double    |
| char     | Charactor |
| boolean  | Boolean   |

## 2.Integer的介绍以及使用

### 2.1.Integer基本使用

```java
1.概述:Integer是int的包装类
2.构造:  不推荐使用了,但是还能用
  Integer(int value)
  Integer(String s) s必须是数字形式
```

```java
1.装箱:将基本类型转成对应的包装类
2.方法:
  static Integer valueOf(int i)
  static Integer valueOf(String s)
```

```java
1.拆箱:将包装类转成基本类型
2.方法:
  int intValue();
```

### 2.2.自动拆箱装箱

```java
1.拆箱和装箱很多时候都是自动完成的
```

```java
public class Demo04Integer {
    public static void main(String[] args) {
        Integer i = 10;//发生了自动装箱了
        Integer sum = i+10;//发生了自动拆箱装箱
        System.out.println("sum = " + sum);
    }
}
```

## 3.基本类型和String之间的转换

### 3.1 基本类型往String转

```java
1.方式1:
  + 拼接
2.方式2:String中的静态方法
  static String valueOf(int i)
```

### 3.2 String转成基本数据类型

```java
每个包装类中都有一个类似的方法:  parseXXX
```

| 位置    | 方法                                  | 说明                    |
| ------- | ------------------------------------- | ----------------------- |
| Byte    | static byte parseByte(String s)       | 将String转byte类型      |
| Short   | static short parseShort(String s)     | 将String转成short类型   |
| Integer | static int parseInt(String s)         | 将String转成int类型     |
| Long    | static long parseLong(String s)       | 将String转成long类型    |
| Float   | static float parseFloat(String s)     | 将String转成float类型   |
| Double  | static double parseDouble(String s)   | 将String转成double类型  |
| Boolean | static boolean parseBoolean(String s) | 将String转成boolean类型 |

```java
    private static void method02() {
        int number = Integer.parseInt("1111");
        System.out.println(number+1);
    }
```

> ```java
> 1.在实际开发过程中如何定义一个标准javabean
>   定义javabean的时候一般会将基本类型的属性定义成包装类型的属性
> ```
>
> ```java
> public class User {
>     //private int uid;//用户id
>     private Integer uid;//用户id
>     private String username;//用户名
>     private String password;//密码
>
>     public User() {
>     }
>
>     public User(Integer uid, String username, String password) {
>         this.uid = uid;
>         this.username = username;
>         this.password = password;
>     }
>
>     public Integer getUid() {
>         return uid;
>     }
>
>     public void setUid(Integer uid) {
>         this.uid = uid;
>     }
>
>     public String getUsername() {
>         return username;
>     }
>
>     public void setUsername(String username) {
>         this.username = username;
>     }
>
>     public String getPassword() {
>         return password;
>     }
>
>     public void setPassword(String password) {
>         this.password = password;
>     }
> }
> ```

> ```java
> 1.举例:如果uid为Integer型,默认值是null
> 2.将来javabean中的数据都是和数据库表联系起来的,我们可以将javabean中的数据添加到表中
>   如果表中的uid为主键自增的,此时添加语句时uid中的数据不用我们单独维护赋值了,添加语句的sql语句就可以这样写:
>   insert into user(uid,username,password) values (NULL,'金莲','36666');
>
> 3.到时候,我们需要将javabean中封装的数据获取出来放到sql语句中,如果uid为主键自增,而且javabean中的uid为包装类型,默认值为NULL,这样就不用单独维护uid的值了,也不用先给javabean中的uid赋值,然后在保存到数据库中了,咱们就可以直接使用uid的默认值,将默认值放到sql语句的uid列中
>
> 4.而且将javabean中的属性变成包装类,还可以使用包装类中的方法去操作此属性值
> ```

# 多线程基本了解

## 1.多线程\_线程和进程

```java
进程:在内存中执行的应用程序
```

```java
线程:是进程中最小的执行单元
线程作用:负责当前进程中程序的运行.一个进程中至少有一个线程,一个进程还可以有多个线程,这样的应用程序就称之为多线程程序

简单理解:一个功能就需要一条线程取去执行
```

> 1.使用场景: 软件中的耗时操作 -> 拷贝大文件, 加载大量的资源
>
> ​ 所有的聊天软件
>
> ​ 所有的后台服务器
>
> ​ 一个线程可以干一件事,我们就可以同时做多件事了,提高了CPU的利用率

## 2.并发和并行

```java
并行:在同一个时刻,有多个执行在多个CPU上(同时)执行(好比是多个人做不同的事儿)
    比如:多个厨师在炒多个菜
```

```java
并发:在同一个时刻,有多个指令在单个CPU上(交替)执行
    比如:一个厨师在炒多个菜
```

```java
细节:
  1.之前CPU是单核,但是在执行多个程序的时候好像是在同时执行,原因是CPU在多个线程之间做高速切换
  2.现在咱们的CPU都是多核多线程的了,比如2核4线程,那么CPU可以同时运行4个线程,此时不同切换,但是如果多了,CPU就要切换了,所以现在CPU在执行程序的时候并发和并行都存在
```

## 3.CPU调度

```java
1.分时调度:值的是让所有的线程轮流获取CPU使用权,并且平均分配每个线程占用CPU的时间片
2.抢占式调度:多个线程轮流抢占CPU使用权,哪个线程先抢到了,哪个线程先执行,一般都是优先级高的先抢到CPU使用权的几率大,我们java程序就是抢占式调度
```

## 4.主线程介绍

```java
主线程:CPU和内存之间开辟的转门为main方法服务的线程
```

# 创建线程的方式(重点)

## 1.第一种方式\_extends Thread

```java
1.定义一个类,继承Thread
2.重写run方法,在run方法中设置线程任务(所谓的线程任务指的是此线程要干的具体的事儿,具体执行的代码)
3.创建自定义线程类的对象
4.调用Thread中的start方法,开启线程,jvm自动调用run方法
```

```java
public class Test01 {
    public static void main(String[] args) {
        //创建线程对象
        MyThread t1 = new MyThread();
        //调用start方法,开启线程,jvm自动调用run方法
        t1.start();

        for (int i = 0; i < 10; i++) {
            System.out.println("main线程..........执行了"+i);
        }
    }
}
```

```java
public class MyThread extends Thread{
    @Override
    public void run() {
        for (int i = 0; i < 10; i++) {
            System.out.println("MyThread...执行了"+i);
        }
    }
}
```

```java
注意:同一个线程对象不能连续调用多次start,如果想要再次调用start,那么咱们就new一个新的线程对象
```

## 3.Thread类中的方法

```java
void start() -> 开启线程,jvm自动调用run方法
void run()  -> 设置线程任务,这个run方法是Thread重写的接口Runnable中的run方法
String getName()  -> 获取线程名字
void setName(String name) -> 给线程设置名字
static Thread currentThread() -> 获取正在执行的线程对象(此方法在哪个线程中使用,获取的就是哪个线程对象)
static void sleep(long millis)->线程睡眠,超时后自动醒来继续执行,传递的是毫秒值
```

> 问题:为啥在重写的run方法中有异常只能try,不能throws
>
> 原因:继承的Thread中的run方法没有抛异常,所以在子类中重写完run方法之后就不能抛,只能try

## 4.Thread中其他的方法

```java
void setPriority(int newPriority)   -> 设置线程优先级,优先级越高的线程,抢到CPU使用权的几率越大,但是不是每次都先抢到

int getPriority()  -> 获取线程优先级

void setDaemon(boolean on)  -> 设置为守护线程,当非守护线程执行完毕,守护线程就要结束,但是守护线程也不是立马结束,当非守护线程结束之后,系统会告诉守护线程人家结束了,你也结束吧,在告知的过程中,守护线程会执行,只不过执行到半路就结束了

static void yield() -> 礼让线程,让当前线程让出CPU使用权

void join() -> 插入线程或者叫做插队线程
```

## 5.第二种方式\_实现Runnable接口

```java
1.创建类,实现Runnable接口
2.重写run方法,设置线程任务
3.利用Thread类的构造方法:Thread(Runnable target),创建Thread对象(线程对象),将自定义的类当参数传递到Thread构造中 -> 这一步是让我们自己定义的类成为一个真正的线程类对象
4.调用Thread中的start方法,开启线程,jvm自动调用run方法
```

```java
public class Test01 {
    public static void main(String[] args) {
        MyRunnable myRunnable = new MyRunnable();

        /*
           Thread(Runnable target)
         */
        Thread t1 = new Thread(myRunnable);
        //调用Thread中的start方法,开启线程
        t1.start();

        for (int i = 0; i < 10; i++) {
            System.out.println(Thread.currentThread().getName()+"...执行了"+i);
        }
    }
}
```

```java
public class MyRunnable implements Runnable{
    @Override
    public void run() {
        for (int i = 0; i < 10; i++) {
            System.out.println(Thread.currentThread().getName()+"...执行了"+i);
        }
    }
}
```

## 6.两种实现多线程的方式区别

```java
1.继承Thread:继承只支持单继承,有继承的局限性
2.实现Runnable:没有继承的局限性, MyThread extends Fu implements Runnable
```

## 7.第三种方式\_匿名内部类创建多线程

> 严格意义上来说,匿名内部类方式不属于创建多线程方式其中之一,因为匿名内部类形式建立在实现Runnable接口的基础上完成的

```java
public class Test02 {
    public static void main(String[] args) {
        /*
          Thread(Runnable r)
          Thread(Runnable target, String name) :name指的是给线程设置名字
         */

        new Thread(new Runnable() {
            @Override
            public void run() {
                for (int i = 0; i < 10; i++) {
                    System.out.println(Thread.currentThread().getName()+"...执行了"+i);
                }
            }
        },"阿庆").start();

        new Thread(new Runnable() {
            @Override
            public void run() {
                for (int i = 0; i < 10; i++) {
                    System.out.println(Thread.currentThread().getName()+"...执行了"+i);
                }
            }
        },"金莲").start();
    }
}

```

# 线程安全

```java
1.什么时候发生:当多个线程访问同一个资源时,导致了数据有问题
```

```java
原因:CPU在多个线程之间做高速切换导致的
```

## 2.解决线程安全问题的第一种方式(使用同步代码块)

```java
1.格式:
  synchronized(任意对象){
      线程可能出现不安全的代码
  }
2.任意对象:就是我们的锁对象
3.执行:
  一个线程拿到锁之后,会进入到同步代码块中执行,在此期间,其他线程拿不到锁,就进不去同步代码块,需要在同步代码块外面等待排队,需要等着执行的线程执行完毕,出了同步代码块,相当于释放锁了,等待的线程才能抢到锁,才能进入到同步代码块中执行
```

```java
public class MyTicket implements Runnable{
    //定义100张票
    int ticket = 100;

    //任意new一个对象
    Object obj = new Object();

    @Override
    public void run() {
        while(true){
            try {
                Thread.sleep(100L);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            synchronized (obj){
                if (ticket>0){
                    System.out.println(Thread.currentThread().getName()+"买了第"+ticket+"张票");
                    ticket--;
                }
            }

        }
    }
}
```

```java
public class Test01 {
    public static void main(String[] args) {
        MyTicket myTicket = new MyTicket();

        Thread t1 = new Thread(myTicket, "赵四");
        Thread t2 = new Thread(myTicket, "刘能");
        Thread t3 = new Thread(myTicket, "广坤");

        t1.start();
        t2.start();
        t3.start();
    }
}
```

## 3.解决线程安全问题的第二种方式:同步方法

### 3.1.普通同步方法\_非静态

```java
1.格式:
  修饰符 synchronized 返回值类型 方法名(参数){
      方法体
      return 结果
  }
2.默认锁:this
```

```java
public class MyTicket implements Runnable{
    //定义100张票
    int ticket = 100;

    @Override
    public void run() {
        while(true){
            try {
                Thread.sleep(100L);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
           //method01();
            method02();
        }
    }

   /* public synchronized void method01(){
        if (ticket>0){
            System.out.println(Thread.currentThread().getName()+"买了第"+ticket+"张票");
            ticket--;
        }
    }*/
   public void method02(){
       synchronized(this){
           System.out.println(this+"..........");
           if (ticket>0){
               System.out.println(Thread.currentThread().getName()+"买了第"+ticket+"张票");
               ticket--;
           }
       }

   }

}

```

```java
public class Test01 {
    public static void main(String[] args) {
        MyTicket myTicket = new MyTicket();
        System.out.println(myTicket);

        Thread t1 = new Thread(myTicket, "赵四");
        Thread t2 = new Thread(myTicket, "刘能");
        Thread t3 = new Thread(myTicket, "广坤");

        t1.start();
        t2.start();
        t3.start();
    }
}

```

### 3.2.静态同步方法

```java
1.格式:
  修饰符 static synchronized 返回值类型 方法名(参数){
      方法体
      return 结果
  }
2.默认锁:class对象
```

```java
public class MyTicket implements Runnable{
    //定义100张票
    static int ticket = 100;

    @Override
    public void run() {
        while(true){
            try {
                Thread.sleep(100L);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
           //method01();
            method02();
        }
    }

    /*public static synchronized void method01(){
        if (ticket>0){
            System.out.println(Thread.currentThread().getName()+"买了第"+ticket+"张票");
            ticket--;
        }
    }*/
   public static void method02(){
       synchronized(MyTicket.class){
           if (ticket>0){
               System.out.println(Thread.currentThread().getName()+"买了第"+ticket+"张票");
               ticket--;
           }
       }

   }
}
```

```java
public class Test01 {
    public static void main(String[] args) {
        MyTicket myTicket = new MyTicket();

        Thread t1 = new Thread(myTicket, "赵四");
        Thread t2 = new Thread(myTicket, "刘能");
        Thread t3 = new Thread(myTicket, "广坤");

        t1.start();
        t2.start();
        t3.start();
    }
}

```

# 第四章.死锁(了解)

## 1.死锁介绍(锁嵌套就有可能产生死锁)

```java
指的是两个或者两个以上的线程在执行的过程中由于竞争同步锁而产生的一种阻塞现象;如果没有外力的作用,他们将无法继续执行下去,这种情况称之为死锁
```

> 只需要知道死锁出现的原因即可(锁嵌套),以后尽量避免锁嵌套

# 线程状态

## 1.线程状态介绍

```java
  当线程被创建并启动以后，它既不是一启动就进入了执行状态，也不是一直处于执行状态。在线程的生命周期中，有几种状态呢？在API中java.lang.Thread.State这个枚举中给出了六种线程状态：
  这里先列出各个线程状态发生的条件，下面将会对每种状态进行详细解析。
```

| 线程状态                | 导致状态发生条件                                                                                                                                                           |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NEW(新建)               | 线程刚被创建，但是并未启动。还没调用start方法。                                                                                                                            |
| Runnable(可运行)        | 线程可以在java虚拟机中运行的状态，可能正在运行自己代码，也可能没有，这取决于操作系统处理器。                                                                               |
| Blocked(锁阻塞)         | 当一个线程试图获取一个对象锁，而该对象锁被其他的线程持有，则该线程进入Blocked状态；当该线程持有锁时，该线程将变成Runnable状态。                                            |
| Waiting(无限等待)       | 一个线程在等待另一个线程执行一个（唤醒）动作时，该线程进入Waiting状态。进入这个状态后是不能自动唤醒的，必须等待另一个线程调用notify或者notifyAll方法才能够唤醒。           |
| Timed Waiting(计时等待) | 同waiting状态，有几个方法有超时参数，调用他们将进入Timed Waiting状态。这一状态将一直保持到超时期满或者接收到唤醒通知。带有超时参数的常用方法有Thread.sleep 、Object.wait。 |
| Terminated(被终止)      | 因为run方法正常退出而死亡，或者因为没有捕获的异常终止了run方法而死亡。或者调用过时方法stop()                                                                               |

# 等待唤醒机制

## 1.等待唤醒案例分析(线程之间的通信)

```java
要求:一个线程生产,一个线程消费,不能连续生产,不能连续消费 -> 等待唤醒机制(生产者,消费者)(线程之间的通信)
```

| 方法             | 说明                                                                                |
| ---------------- | ----------------------------------------------------------------------------------- |
| void wait()      | 线程等待,等待的过程中线程会释放锁,需要被其他线程调用notify方法将其唤醒,重新抢锁执行 |
| void notify()    | 线程唤醒,一次唤醒一个等待线程;如果有多条线程等待,则随机唤醒一条等待线程             |
| void notifyAll() | 唤醒所有等待线程                                                                    |

> wait和notify方法需要锁对象调用,所以需要用到同步代码块中,而且必须是同一个锁对象

# Lock锁

## 1.Lock对象的介绍和基本使用

```java
1.概述:Lock是一个接口
2.实现类:ReentrantLock
3.方法:
  lock() 获取锁
  unlock() 释放锁
```

```java
public class MyTicket implements Runnable {
    //定义100张票
    int ticket = 100;

    //创建Lock对象
    Lock lock = new ReentrantLock();

    @Override
    public void run() {
        while (true) {
            try {
                Thread.sleep(100L);

                //获取锁
                lock.lock();
                if (ticket > 0) {
                    System.out.println(Thread.currentThread().getName() + "买了第" + ticket + "张票");
                    ticket--;
                }
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }finally {
                //释放锁
                lock.unlock();
            }

        }
    }
}

```

```java
public class Test01 {
    public static void main(String[] args) {
        MyTicket myTicket = new MyTicket();

        Thread t1 = new Thread(myTicket, "赵四");
        Thread t2 = new Thread(myTicket, "刘能");
        Thread t3 = new Thread(myTicket, "广坤");

        t1.start();
        t2.start();
        t3.start();
    }
}

```

> ```java
> synchronized:不管是同步代码块还是同步方法,都需要在结束一对{}之后,释放锁对象
> Lock:是通过两个方法控制需要被同步的代码,更灵活
> ``
> ```

# Callable接口\_实现多线程方式三

```java
1.概述:Callable<V>是一个接口,类似于Runnable
2.方法:
  V call()  -> 设置线程任务的,类似于run方法
3.call方法和run方法的区别:
  a.相同点:都是设置线程任务的
  b.不同点:
    call方法有返回值,而且有异常可以throws
    run方法没有返回值,而且有异常不可以throws

4.<V>
  a.<V>叫做泛型
  b.泛型:用于指定我们操作什么类型的数据,<>中只能写引用数据类型,如果泛型不写,默认是Object类型数据
  c.实现Callable接口时,指定泛型是什么类型的,重写的call方法返回值就是什么类型的

5.获取call方法返回值: FutureTask<V>
  a. FutureTask<V> 实现了一个接口: Future <V>
  b. FutureTask<V>中有一个方法:
     V get() -> 获取call方法的返回值
```

```java
public class MyCallable implements Callable<String> {

    @Override
    public String call() throws Exception {
        return "涛哥和金莲...的故事";
    }
}
```

```java
public class Test {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        MyCallable myCallable = new MyCallable();
        /*
           FutureTask(Callable<V> callable)
         */
        FutureTask<String> futureTask = new FutureTask<>(myCallable);

        //创建Thread对象-> Thread(Runnable target)
        Thread t1 = new Thread(futureTask);
        t1.start();

        //调用get方法获取call方法返回值
        System.out.println(futureTask.get());
    }
}

```

# 线程池\_实现多线程方式四

```java
1.问题:之前来一个线程任务,就需要创建一个线程对象去执行,用完还要销毁线程对象,如果线程任务多了,就需要频繁创建线程对象和销毁线程对象,这样会耗费内存资源,所以我们就想线程对象能不能循环利用,用的时候直接拿线程对象,用完还回去
```

```java
1.如何创建线程池对象:用具类-> Executors
2.获取线程池对象:Executors中的静态方法:
  static ExecutorService newFixedThreadPool(int nThreads)
  a.参数:指定线程池中最多创建的线程对象条数
  b.返回值ExecutorService 是线程池,用来管理线程对象

3.执行线程任务: ExecutorService中的方法
  Future<?> submit(Runnable task) 提交一个Runnable任务用于执行
  Future<T> submit(Callable<T> task) 提交一个Callable任务用于执行

4.submit方法的返回值:Future接口
  用于接收run方法或者call方法返回值的,但是run方法没有返回值,所以可以不用Future接收,执行call方法需要用Future接收

  Future中有一个方法:V get()  用于获取call方法返回值

5. ExecutorService中的方法:
   void shutdown()  启动有序关闭，其中先前提交的任务将被执行，但不会接受任何新任务
```

# 定时器\_Timer

```java
1.概述:定时器
2.构造:
  Timer()
3.方法:
  void schedule(TimerTask task, Date firstTime, long period)
                task:抽象类,是Runnable的实现类
                firstTime:从什么时间开始执行
                period: 每隔多长时间执行一次,设置的是毫秒值
```

# 集合框架(单列集合)

```java
1.之前我们学了保存数据的有:变量,数组,但是数组定长,所以如果添加一个数据或者删除一个数据,数组并不好使,需要创建新数组,所以接下来我们学一个长度可变的容器,集合

2.集合的特点
  a.只能存储引用数据类型的数据
  b.长度可变
  c.集合中有大量的方法,方便我们操作

3.分类:
  a.单列集合:一个元素就一个组成部分:
    list.add("张三")
  b.双列集合:一个元素有两部分构成:  key 和 value
    map.put("涛哥","金莲") -> key,value叫做键值对

```

# Collection接口

```java
1.概述:单列集合的顶级接口
2.使用:
  a.创建:
    Collection<E> 对象名 = new 实现类对象<E>()
  b.<E>:泛型,决定了集合中能存储什么类型的数据,可以统一元素类型
        泛型中只能写引用数据类型,如果不写,默认Object类型,此时什么类型的数据都可以存储了
        <int> 不行
        <Integer> 行
        <Person> 行

  c.泛型细节:
    我们等号前面的泛型必须写,等号后面的泛型可以不写,jvm会根据前面的泛型推导出后面的泛型是啥

3.常用方法:
  boolean add(E e) : 将给定的元素添加到当前集合中(我们一般调add时,不用boolean接收,因为add一定会成功)
  boolean addAll(Collection<? extends E> c) :将另一个集合元素添加到当前集合中 (集合合并)
  void clear():清除集合中所有的元素
  boolean contains(Object o)  :判断当前集合中是否包含指定的元素
  boolean isEmpty() : 判断当前集合中是否有元素->判断集合是否为空
  boolean remove(Object o):将指定的元素从集合中删除
  int size() :返回集合中的元素个数。
  Object[] toArray(): 把集合中的元素,存储到数组中
```

```java
public class Demo01Collection {
    public static void main(String[] args) {
        Collection<String> collection = new ArrayList<>();
        //boolean add(E e) : 将给定的元素添加到当前集合中(我们一般调add时,不用boolean接收,因为add一定会成功)
        collection.add("萧炎");
        collection.add("萧薰儿");
        collection.add("彩鳞");
        collection.add("小医仙");
        collection.add("云韵");
        collection.add("涛哥");
        System.out.println(collection);
        //boolean addAll(Collection<? extends E> c) :将另一个集合元素添加到当前集合中 (集合合并)
        Collection<String> collection1 = new ArrayList<>();
        collection1.add("张无忌");
        collection1.add("小昭");
        collection1.add("赵敏");
        collection1.add("周芷若");
        collection1.addAll(collection);
        System.out.println(collection1);

        //void clear():清除集合中所有的元素
        collection1.clear();
        System.out.println(collection1);
        //boolean contains(Object o)  :判断当前集合中是否包含指定的元素
        boolean result01 = collection.contains("涛哥");
        System.out.println("result01 = " + result01);
        //boolean isEmpty() : 判断当前集合中是否有元素->判断集合是否为空
        System.out.println(collection1.isEmpty());
        //boolean remove(Object o):将指定的元素从集合中删除
        collection.remove("涛哥");
        System.out.println(collection);
        //int size() :返回集合中的元素个数。
        System.out.println(collection.size());
        //Object[] toArray(): 把集合中的元素,存储到数组中
        Object[] arr = collection.toArray();
        System.out.println(Arrays.toString(arr));
    }
}
```

# 迭代器

## 1.迭代器基本使用

```java
1.概述:Iterator接口
2.主要作用:遍历集合
3.获取:Collection中的方法:
  Iterator<E> iterator()
4.方法:
  boolean hasNext()  -> 判断集合中有没有下一个元素
  E next()  ->获取下一个元素
```

```java
public class Demo01Iterator {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>();
        list.add("楚雨荨");
        list.add("慕容云海");
        list.add("端木磊");
        list.add("上官瑞谦");
        list.add("叶烁");
        //获取迭代器对象
        Iterator<String> iterator = list.iterator();
        while(iterator.hasNext()){
            String element = iterator.next();
            System.out.println(element);
        }
    }
}

```

## 2.迭代器迭代过程

```java
int cursor; //下一个元素索引位置
int lastRet = -1;//上一个元素索引位置
```

## 3.迭代器底层原理

```java
1.获取Iterator的时候怎么获取的:
  Iterator iterator = list.iterator()
  我们知道Iterator是一个接口,等号右边一定是它的实现类对象
  问题:Iterator接收的到底是哪个实现类对象呢? -> ArrayList中的内部类Itr对象
```

> 注意:只有ArrayList使用迭代器的时候Iterator接口才会指向Itr,其他的集合使用迭代器Iterator就指向的不是Itr了
>
> ```java
> HashSet<String> set = new HashSet<>();
> Iterator<String> iterator1 = set.iterator();
> ```

## 4.并发修改异常

> 遍历一个集合时，改变了集合的长度，会导致并发修改异常
> `ConcurrentModificationException`

```java
public class Demo03Iterator {
    public static void main(String[] args) {
        //需求:定义一个集合,存储 唐僧,孙悟空,猪八戒,沙僧,遍历集合,如果遍历到猪八戒,往集合中添加一个白龙马
        ArrayList<String> list = new ArrayList<>();
        list.add("唐僧");
        list.add("孙悟空");
        list.add("猪八戒");
        list.add("沙僧");

        Iterator<String> iterator = list.iterator();
        while(iterator.hasNext()){
            String element = iterator.next();
            if ("猪八戒".equals(element)){
                list.add("白龙马");
            }
        }
        System.out.println(list);
    }
}
```

# List接口

```java
1.概述:是Collection接口的子接口
2.常见的实现类:
  ArrayList LinkedList Vector
```

# List集合下的实现类

## 1.ArrayList集合

```java
1.概述:ArrayList是List接口的实现类
2.特点:
  a.元素有序-> 按照什么顺序存的,就按照什么顺序取
  b.元素可重复
  c.有索引-> 可以利用索引去操作元素
  d.线程不安全

3.数据结构:数组
4.常用方法:
  boolean add(E e)  -> 将元素添加到集合中->尾部(add方法一定能添加成功的,所以我们不用boolean接收返回值)
  void add(int index, E element) ->在指定索引位置上添加元素
  boolean remove(Object o) ->删除指定的元素,删除成功为true,失败为false
  E remove(int index) -> 删除指定索引位置上的元素,返回的是被删除的那个元素
  E set(int index, E element) -> 将指定索引位置上的元素,修改成后面的element元素
  E get(int index) -> 根据索引获取元素
  int size()  -> 获取集合元素个数
```

### 1.2.底层源码分析

```java
1.ArrayList构造方法:
  a.ArrayList() 构造一个初始容量为十的空列表
  b.ArrayList(int initialCapacity) 构造具有指定初始容量的空列表

2.ArrayList源码总结:
  a.不是一new底层就会创建初始容量为10的空列表,而是第一次add的时候才会创建初始化容量为10的空列表
  b.ArrayList底层是数组,那么为啥还说集合长度可变呢?
    ArrayList底层会自动扩容-> Arrays.copyOf
  c.扩容多少倍?
    1.5倍
```

> ArrayList&lt;String&gt; list = new ArrayList&lt;String&gt;() -> 现在我们想用都是new
>
> 但是将来开发不会想使用就new集合,都是调用一个方法,查询出很多数据来,此方法返回一个集合,自动将查询出来的数据放到集合中,我们想在页面上展示数据,遍历集合
>
> 而且将来调用方法,返回的集合类型,一般都是接口类型
>
> List<泛型> list = 对象.查询方法()

# LinkedList集合

```java
1.概述:LinkedList是List接口的实现类
2.特点:
  a.元素有序
  b.元素可重复
  c.有索引 -> 这里说的有索引仅仅指的是有操作索引的方法,不代表本质上具有索引
  d.线程不安全

3.数据结构:双向链表

4.方法:有大量直接操作首尾元素的方法
  - public void addFirst(E e):将指定元素插入此列表的开头。
  - public void addLast(E e):将指定元素添加到此列表的结尾。
  - public E getFirst():返回此列表的第一个元素。
  - public E getLast():返回此列表的最后一个元素。
  - public E removeFirst():移除并返回此列表的第一个元素。
  - public E removeLast():移除并返回此列表的最后一个元素。
  - public E pop():从此列表所表示的堆栈处弹出一个元素。
  - public void push(E e):将元素推入此列表所表示的堆栈。
  - public boolean isEmpty()：如果列表没有元素，则返回true。
```

```java
public E pop():从此列表所表示的堆栈处弹出一个元素。
public void push(E e):将元素推入此列表所表示的堆栈。
```

## 1.1 LinkedList底层成员解释说明

```java
1.LinkedList底层成员
  transient int size = 0;  元素个数
  transient Node<E> first; 第一个节点对象
  transient Node<E> last;  最后一个节点对象

2.Node代表的是节点对象
   private static class Node<E> {
        E item;//节点上的元素
        Node<E> next;//记录着下一个节点地址
        Node<E> prev;//记录着上一个节点地址

        Node(Node<E> prev, E element, Node<E> next) {
            this.item = element;
            this.next = next;
            this.prev = prev;
        }
    }
```

```java
index < (size >> 1)采用二分思想，先将index与长度size的一半比较，如果index<size/2，就只从位置0往后遍历到位置index处，而如果index>size/2，就只从位置size往前遍历到位置index处。这样可以减少一部分不必要的遍历
```

# 增强for

## 1.基本使用

```java
1.作用:
  遍历集合或者数组
2.格式:
  for(元素类型 变量名:要遍历的集合名或者数组名){
      变量名就是代表的每一个元素
  }

3.快捷键:集合名或者数组名.for
```

```java
public class Demo01ForEach {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>();
        list.add("张三");
        list.add("李四");
        list.add("王五");
        list.add("赵六");
        for (String s : list) {
            System.out.println(s);
        }

        System.out.println("=====================");

        int[] arr = {1,2,3,4,5};
        for (int i : arr) {
            System.out.println(i);
        }
    }
}

```

## 2.注意

```java
1.增强for遍历集合时,底层实现原理为迭代器
2.增强for遍历数组时,底层实现原理为普通for
```
