# 软件开发原则

阅读以下代码：

```java
package com.jkweilai.oa.controller;

import com.jkweilai.oa.service.UserService;
import com.jkweilai.oa.service.impl.UserServiceImpl;

public class UserController {

    private UserService userService = new UserServiceImpl();

    public void login(){
        String username = "admin";
        String password = "123456";
        boolean success = userService.login(username, password);
        if (success) {
            // 登录成功
        } else {
            // 登录失败
        }
    }
}

```

```java
package com.jkweilai.oa.service.impl;

import com.jkweilai.oa.bean.User;
import com.jkweilai.oa.dao.UserDao;
import com.jkweilai.oa.dao.impl.UserDaoImplForMySQL;
import com.jkweilai.oa.service.UserService;

public class UserServiceImpl implements UserService {

    private UserDao userDao = new UserDaoImplForMySQL();

    public boolean login(String username, String password) {
        User user = userDao.selectByUsernameAndPassword(username, password);
        if (user != null) {
            return true;
        }
        return false;
    }
}

```

```java
package com.jkweilai.oa.dao.impl;

import com.jkweilai.oa.bean.User;
import com.jkweilai.oa.dao.UserDao;

public class UserDaoImplForMySQL implements UserDao {
    public User selectByUsernameAndPassword(String username, String password) {
        // 连接MySQL数据库，根据用户名和密码查询用户信息
        return null;
    }
}

```

可以看出，UserDaoImplForMySQL中主要是连接MySQL数据库进行操作。如果更换到Oracle数据库上，则需要再提供一个UserDaoImplForOracle，如下：

```java
package com.jkweilai.oa.dao.impl;

import com.jkweilai.oa.bean.User;
import com.jkweilai.oa.dao.UserDao;

public class UserDaoImplForOracle implements UserDao {
    public User selectByUsernameAndPassword(String username, String password) {
        // 连接Oracle数据库，根据用户名和密码查询用户信息
        return null;
    }
}

```

很明显，以上的操作正在进行功能的扩展，添加了一个新的类UserDaoImplForOracle来应付数据库的变化，这里的变化会引起连锁反应吗？当然会，如果想要切换到Oracle数据库上，UserServiceImpl类代码就需要修改，如下：

```java
package com.jkweilai.oa.service.impl;

import com.jkweilai.oa.bean.User;
import com.jkweilai.oa.dao.UserDao;
import com.jkweilai.oa.dao.impl.UserDaoImplForOracle;
import com.jkweilai.oa.service.UserService;

public class UserServiceImpl implements UserService {

    //private UserDao userDao = new UserDaoImplForMySQL();
    private UserDao userDao = new UserDaoImplForOracle();

    public boolean login(String username, String password) {
        User user = userDao.selectByUsernameAndPassword(username, password);
        if (user != null) {
            return true;
        }
        return false;
    }
}

```

## OCP开闭原则

这样一来就违背了开闭原则OCP。开闭原则是这样说的：在软件开发过程中应当对扩展开放，对修改关闭。也就是说，如果在进行功能扩展的时候，添加额外的类是没问题的，但因为功能扩展而修改之前运行正常的程序，这是忌讳的，不被允许的。因为一旦修改之前运行正常的程序，就会导致项目整体要进行全方位的重新测试。这是相当麻烦的过程。导致以上问题的主要原因是：代码和代码之间的耦合度太高。如下图所示：

<img src="/images/spring/1663658802926-4c783887-3bd3-4a35-b32a-b2cd57d0061c.png" width="628" height="477" title="" crop="0,0,1,1" id="u472be816" class="ne-image" style="font-size: 16px">

可以很明显的看出，**<font style="color:#E8323C;">上层</font>**是依赖**<font style="color:#E8323C;">下层</font>**的。UserController依赖UserServiceImpl，而UserServiceImpl依赖UserDaoImplForMySQL，这样就会导致**<font style="color:#E8323C;">下面只要改动</font>**，**<font style="color:#E8323C;">上面必然会受牵连（跟着也会改）</font>**，所谓牵一发而动全身。这样也就同时违背了另一个开发原则：依赖倒置原则。

## 依赖倒置原则DIP

依赖倒置原则(Dependence Inversion Principle)，简称DIP，主要倡导面向抽象编程，面向接口编程，不要面向具体编程，让**<font style="color:#E8323C;">上层</font>**不再依赖**<font style="color:#E8323C;">下层</font>**，下面改动了，上面的代码不会受到牵连。这样可以大大降低程序的耦合度，耦合度低了，扩展力就强了，同时代码复用性也会增强。

你可能会说，上面的代码已经面向接口编程了呀：

<img src="/images/spring/1663663167652-73de3acd-61de-4f32-8a78-6c7698e910d3.png" width="882" height="508" title="" crop="0,0,1,1" id="u843f1bd1" class="ne-image" style="font-size: 16px">

确实已经面向接口编程了，但对象的创建是：new UserDaoImplForOracle()显然并没有完全面向接口编程，还是使用到了具体的接口实现类。什么叫做完全面向接口编程？什么叫做完全符合依赖倒置原则呢？请看以下代码：

<img src="/images/spring/1663663356201-4e57a395-503b-41ec-b98a-c3cd38f9279a.png" width="918" height="541" title="" crop="0,0,1,1" id="u169a370a" class="ne-image" style="font-size: 16px">

如果代码是这样编写的，才算是完全面向接口编程，才符合依赖倒置原则。那你可能会问，这样userDao是null，在执行的时候就会出现空指针异常呀。你说的有道理，确实是这样的，所以我们要解决这个问题。解决空指针异常的问题，其实就是解决两个核心的问题：

- **第一个问题：谁来负责对象的创建。【也就是说谁来：new UserDaoImplForOracle()/new UserDaoImplForMySQL()】**
- **第二个问题：谁来负责把创建的对象赋到这个属性上。【也就是说谁来把上面创建的对象赋给userDao属性】**

如果我们把以上两个核心问题解决了，就可以做到既符合OCP开闭原则，又符合依赖倒置原则。

**很荣幸的通知你：Spring框架可以做到。**

在Spring框架中，它可以帮助我们new对象，并且它还可以将new出来的对象赋到属性上。换句话说，Spring框架可以帮助我们创建对象，并且可以帮助我们维护对象和对象之间的关系。比如：

<img src="/images/spring/1663664672011-b1f5c534-5c8b-412b-adb3-f7c60a3ab359.png" width="901" height="271" title="" crop="0,0,1,1" id="u9c3095f5" class="ne-image" style="font-size: 16px">

Spring可以new出来UserDaoImplForMySQL对象，也可以new出来UserDaoImplForOracle对象，并且还可以让new出来的dao对象和service对象产生关系（产生关系其实本质上就是给属性赋值）。

很显然，这种方式是将对象的创建权/管理权交出去了，不再使用硬编码的方式了。同时也把对象关系的管理权交出去了，也不再使用硬编码的方式了。像这种把对象的创建权交出去，把对象关系的管理权交出去，被称为控制反转。

## 控制反转IoC

控制反转（Inversion of Control，缩写为IoC），是面向对象编程中的一种设计思想，可以用来降低代码之间的耦合度，符合依赖倒置原则。

控制反转的核心是：**<font style="color:#E8323C;">将对象的创建权交出去，将对象和对象之间关系的管理权交出去，由第三方容器来负责创建与维护</font>**。

**控制反转常见的实现方式：依赖注入（Dependency Injection，简称DI）**

**通常，依赖注入的实现又包括三种方式：**

- **set方法注入**
- **构造方法注入 **
- **字段注入（直接给 Field 赋值：通过反射机制。） **

而Spring框架就是一个实现了IoC思想的框架。

IoC可以认为是一种**<font style="color:#E8323C;">全新的设计模式</font>**，但是理论和时间成熟相对较晚，并没有包含在GoF中。（GoF指的是23种设计模式）

## SOLID 原则

OOD 五大原则：

| **原则** | **全称**     | **核心思想**                                       |
| -------- | ------------ | -------------------------------------------------- |
| **SRP**  | 单一职责原则 | **一个类只干一件事**，不要变成"万能类"。           |
| **OCP**  | 开闭原则     | **加功能时尽量新增代码，而不是修改老代码**。       |
| **LSP**  | 里氏替换原则 | **子类要能当父类用**，换了也不出错。               |
| **ISP**  | 接口隔离原则 | **接口要专一**，不要强迫实现类去实现用不到的方法。 |
| **DIP**  | 依赖倒置原则 | **依赖抽象而不是具体实现**，面向接口编程。         |

**违反 LSP 的例子：**

```java
// 父类：鸟
class Bird {
    void fly() {
        System.out.println("我在飞");
    }
}

// 子类：鸵鸟 - 语法上没问题，但行为上出错了！
class Ostrich extends Bird {
    void fly() {
        throw new RuntimeException("鸵鸟不会飞！"); // 这里就"出错"了
    }
}

// 使用场景
void makeBirdFly(Bird bird) {
    bird.fly(); // 如果传入鸵鸟，程序就崩溃了！
}
```

# Spring概述

## Spring简介

<img src="/images/spring/1663722326376-02a67b9e-f80f-4717-ac33-1253723135f3.png" width="375" height="130" title="" crop="0,0,1,1" id="u5a20389f" class="ne-image" style="font-size: 16px">

来自百度百科

> Spring是一个由Rod Johnson创建的开源框架，其核心目标是简化复杂的企业级应用开发。通过提供<font style="color:#DF2A3F;">**简单性、可测试性与松耦合性**</font>这三大特性，它能让任何Java应用的开发都变得更加高效和优雅。
>
> **<font style="color:#E8323C;">Spring是一个轻量级的控制反转(IoC)和面向切面(AOP)的容器框架。</font>**
>
> **<font style="color:#E8323C;">Spring最初的出现是为了解决EJB臃肿的设计，以及难以测试等问题。</font>**
>
> **<font style="color:#E8323C;">Spring为简化开发而生，让程序员只需关注核心业务的实现，尽可能的不再关注非业务逻辑代码（事务控制，安全日志等）。</font>**

## Spring 的 7 个模块

<img src="/images/spring/1763643561157-765b31eb-9766-4a14-948b-315a09fec552.png" width="1055" height="651" title="" crop="0,0,1,1" id="u00bb4ccc" class="ne-image" style="font-size: 16px">

<img src="/images/spring/1763643650645-a4daae43-075d-4bc7-87dd-1e12c8edf581.png" width="1018" height="404" title="" crop="0,0,1,1" id="u1165bafd" class="ne-image" style="font-size: 16px">

<img src="/images/spring/1763643697234-10890100-6dd7-4c70-9d40-4132b2d641ed.png" width="1014" height="370" title="" crop="0,0,1,1" id="u114458cc" class="ne-image" style="font-size: 16px">

<img src="/images/spring/1763643800797-f4c8ef1b-3f81-448c-a403-0ee8f07b6e45.png" width="1015" height="375" title="" crop="0,0,1,1" id="ubdc0d47e" class="ne-image" style="font-size: 16px">

<img src="/images/spring/1763643838115-953e83de-1182-4e92-ad81-04d15a4b65cd.png" width="1011" height="385" title="" crop="0,0,1,1" id="u46d6b73e" class="ne-image" style="font-size: 16px">

<img src="/images/spring/1763643872341-82bca2fa-e2df-49a1-b2f8-8875bf1a9c3f.png" width="1008" height="360" title="" crop="0,0,1,1" id="u2ef45d0b" class="ne-image" style="font-size: 16px">

<img src="/images/spring/1763643893472-6532f10a-d928-4d4b-a72e-95fca870596d.png" width="1015" height="419" title="" crop="0,0,1,1" id="u179eac1e" class="ne-image" style="font-size: 16px">

<img src="/images/spring/1763643919695-920d67f8-1824-46ed-a266-a72a78f933af.png" width="1018" height="370" title="" crop="0,0,1,1" id="u2862b88e" class="ne-image" style="font-size: 16px">

**背压就是：当下游消费者处理速度跟不上上游生产者时，下游主动向上游喊"慢点发，我处理不过来"，上游收到信号后减慢发送速度的一种流量控制机制。**

**传统方式**：上游猛发，下游硬接，接不住就崩溃（OOM）

**响应式流+背压**：下游说"慢点"，上游乖乖减速

```java
// 传统 JDBC 方式（没有背压）一次性查出 100 万条数据
List<User> users = userMapper.selectAll();
// 内存直接爆了！这就是“上游猛发，下游硬接”
```

```java
// WebFlux（支持背压）数据一条一条流过来
Flux<User> users = userRepository.findAll();
users.subscribe(user -> {
    // 处理一条，再要下一条
    // 下游说“慢慢来，我能处理多少你给我多少”
});
```

## web 同步与 web 异步的区别

Spring Web MVC 是同步方案。Spring WebFlux 是异步方案。它们的区别是：

---

**想象一个异步文件下载：**

**1. 传统同步方式 (MVC):**

```java
// 线程会停在这里等待，直到文件下载完成
byte[] data = downloadFileFromNetwork("http://example.com/file");
// 下载完成后，才继续执行这里
return data;
```

**2. WebFlux方式 (基于回调):**

```java
// 立即返回，不等待
downloadFileFromNetwork("http://example.com/file", new Callback() {
    // 这是一个回调函数
    @Override
    public void onDataReceived(byte[] data) {
        // 当数据真正到达时，这个函数会被自动调用
        sendResponse(data);
    }

    @Override
    public void onError(Throwable error) {
        // 出错时的回调
        sendError(error);
    }
});
// 注意：代码执行到这里时，文件可能还没开始下载！
```

**核心要点：**

- **"你先去忙，好了call我"**：主线程不等待，立即返回
- **回调函数是"联系方式"**：告诉系统"数据到了之后，请调用我这个函数"
- **事件驱动**：当网络数据到达、数据库查询完成等事件发生时，自动触发相应的回调函数

## Spring特点

1. **控制反转/依赖注入**：对象不用自己找依赖，Spring容器自动"送货上门"，实现松耦合。
2. **面向切面编程**：像切洋葱一样把通用功能（日志、事务）横向抽取，让核心业务更纯净。
3. **数据访问支持**：用统一的方式操作各种数据库，告别繁琐的JDBC代码和不同数据库的兼容问题。
4. **声明式事务管理**：只需一个`@Transactional`注解，复杂的事务管理就像"开关"一样简单可控。
5. **高度模块化设计**：像乐高积木，需要什么拿什么，不必引入整个框架。
6. **强大测试支持**：专为测试而生，轻松模拟完整Spring环境进行单元测试和集成测试。

# Spring的入门程序

## Spring 的官方地址

官网地址：[https://spring.io/](https://spring.io/)，从这里你可以找到官方指南。

打开Spring官网后，可以看到Spring Framework，以及通过Spring Framework衍生的其它框架：

<img src="/images/spring/1663749081947-b895cb4e-b7f6-4120-a1fe-a14651044847.png" width="758" height="948" title="" crop="0,0,1,1" id="u1f2db9fb" class="ne-image" style="font-size: 16px">

## Spring的jar文件

<img src="/images/spring/1763645880150-75b14f50-e64f-4260-8267-12050cfb0de5.png" width="930" height="214" title="" crop="0,0,1,1" id="xX1Ll" class="ne-image" style="font-size: 16px">

以上是 Spring Framework 的 jar 包，可以看到有 20+个。以前的开发是需要下载这些 jar 包的，需要什么功能就下载对应的 jar 包，放到项目当中，现在有 Maven，方便多了，不需要下载 jar 包了。只需要引入 GAV 坐标即可。

**了解一下重点 jar 包：**

| **模块 JAR 包**    | **主要职责**         | **概括**                                          |
| ------------------ | -------------------- | ------------------------------------------------- |
| **spring-core**    | IoC 容器基础实现     | 框架的**心脏**，提供最基础的依赖注入功能          |
| **spring-beans**   | Bean 工厂与装配      | 负责**创建和管理**应用中的所有对象（Bean）        |
| **spring-context** | 应用上下文与企业服务 | 在核心容器之上，提供**事件、国际化**等企业级功能  |
| **spring-aop**     | 面向切面编程         | 将**事务、日志**等横切关注点从业务代码中分离出来  |
| **spring-jdbc**    | JDBC 抽象与简化      | **大幅简化**传统的 JDBC 冗长编码                  |
| **spring-tx**      | 事务管理             | 提供**声明式事务**控制，保证数据操作的原子性      |
| **spring-orm**     | ORM 框架集成         | 无缝集成 **Hibernate、JPA** 等主流持久层框架      |
| **spring-web**     | Web 开发基础         | 为 **Web MVC 和 WebFlux** 提供共用的底层支持      |
| **spring-webmvc**  | 同步 Web 框架        | **基于 Servlet API** 的传统 MVC 模式 Web 框架     |
| **spring-webflux** | 异步 Web 框架        | **响应式、非阻塞**的现代 Web 框架，适合高并发场景 |
| **spring-test**    | 测试框架支持         | 提供对 **Spring 环境集成测试**的强大支持          |

## 第一个Spring程序

**前期准备**：

- 打开IDEA创建Empty Project：spring
- 设置JDK 版本及编译器版本
- 设置IDEA的Maven：关联自己的maven
- 在空的工程spring中创建第一个模块（普通的 Java Maven 模块）：spring-001-first

### 添加spring context依赖

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <version>6.2.13</version>
</dependency>
```

**<font style="color:#E8323C;">注意：打包方式jar。</font>**

当加入spring context的依赖之后，会关联引入其他依赖：

<img src="/images/spring/1763649527180-d0d3dc0c-3b6a-428c-92a1-2c579820ba1c.png" width="382" height="154" title="" crop="0,0,1,1" id="u8ce9d9c8" class="ne-image" style="font-size: 16px">

### 添加junit5依赖

```xml
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter-api</artifactId>
    <version>5.11.0</version>
    <scope>test</scope>
</dependency>
```

### 定义bean

```java
package com.jkweilai.spring.bean;

public class User {
}
```

### 编写spring的配置文件

beans.xml。<font style="color:#E8323C;">该文件放在类的根路径下</font>。

<img src="/images/spring/1663816617460-ee35243c-fddc-4771-af28-0017f8af2ab5.png" width="539" height="513" title="" crop="0,0,1,1" id="u818294ea" class="ne-image" style="font-size: 16px">

配置文件中进行bean的配置。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

  <bean id="userBean" class="com.jkweilai.spring.bean.User"></bean>

</beans>
```

bean的id和class属性：

- **<font style="color:#E8323C;">id属性：代表对象的唯一标识。可以看做一个人的身份证号。</font>**
- **<font style="color:#E8323C;">class属性：用来指定要创建的java对象的类名，这个类名必须是全限定类名（带包名）。</font>**

### 编写测试程序

```java
package com.jkweilai.spring.test;

import org.junit.jupiter.api.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class SpringTest {

    @Test
    public void testFirst(){
        // 初始化Spring容器上下文（解析beans.xml文件，创建所有的bean对象）
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beans.xml");
        // 根据id获取bean对象
        Object userBean = applicationContext.getBean("userBean");
        System.out.println(userBean);
    }
}

```

运行结果：

<img src="/images/spring/1763650025240-e128f903-3ae4-4ee8-8b78-6b28565bf228.png" width="449" height="44" title="" crop="0,0,1,1" id="u5692ecb6" class="ne-image" style="font-size: 16px">

## 第一个Spring程序详细剖析

### bean标签的id属性可以重复吗？

```java
package com.jkweilai.spring.bean;

public class Vip {
}

```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="userBean" class="com.jkweilai.spring.bean.User"/>
    <bean id="userBean" class="com.jkweilai.spring.bean.Vip"/>
</beans>
```

**<font style="color:#E8323C;">通过测试得出：在spring的配置文件中id是不能重名。</font>**

### 底层是怎么创建对象的，是通过反射机制调用无参数构造方法吗？

```java
package com.jkweilai.spring.bean;

public class User {
    public User() {
        System.out.println("User的无参数构造方法执行");
    }
}

```

在User类中添加无参数构造方法。

**<font style="color:#E8323C;">通过测试得知：创建对象时确实调用了无参数构造方法。</font>**

如果提供一个有参数构造方法，不提供无参数构造方法会怎样呢？

```java
package com.jkweilai.spring.bean;

public class User {
    /*public User() {
        System.out.println("User的无参数构造方法执行");
    }*/

    public User(String name){
        System.out.println("User的有参数构造方法执行");
    }
}

```

**<font style="color:#E8323C;">通过测试得知：spring是通过调用类的无参数构造方法来创建对象的，所以要想让spring给你创建对象，必须保证无参数构造方法是存在的。</font>**

Spring是如何创建对象的呢？原理是什么？

```java
// dom4j解析beans.xml文件，从中获取class的全限定类名
// 通过反射机制调用无参数构造方法创建对象
Class clazz = Class.forName("com.jkweilai.spring.bean.User");
Object obj = clazz.newInstance();
```

**提示：set 注入的时候底层会调用无参数构造方法。构造注入的时候没有无参数构造方法也行。**

### 把创建好的对象存储到一个什么样的数据结构当中了呢？

<img src="/images/spring/1663829973365-59ca2f4c-4d81-471f-8e4c-aa272f8c2b81.png" width="455" height="520" title="" crop="0,0,1,1" id="ua2fc4b9b" class="ne-image" style="font-size: 16px">

### spring配置文件的名字必须叫做beans.xml吗？

```java
ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beans.xml");
```

通过以上的java代码可以看出，这个spring配置文件名字是我们负责提供的，显然spring配置文件的名字是随意的。

### 像这样的beans.xml文件可以有多个吗？

再创建一个spring配置文件，起名：spring.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <bean id="vipBean" class="com.jkweilai.spring.bean.Vip"/>
</beans>
```

```java
package com.jkweilai.spring.test;

import org.junit.jupiter.api.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class SpringTest {

    @Test
    public void testFirst(){
        // 初始化Spring容器上下文（解析beans.xml文件，创建所有的bean对象）
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beans.xml","spring.xml");

        // 根据id获取bean对象
        Object userBean = applicationContext.getBean("userBean");
        Object vipBean = applicationContext.getBean("vipBean");

        System.out.println(userBean);
        System.out.println(vipBean);
    }
}

```

通过测试得知，spring的配置文件可以有多个，在ClassPathXmlApplicationContext构造方法的参数上传递文件路径即可。这是为什么呢？通过源码可以看到：

<img src="/images/spring/1663830614508-d00ecc07-5b51-4d2d-bc1d-8f2cb4f0c785.png" width="1041" height="150" title="" crop="0,0,1,1" id="ubab0ac13" class="ne-image" style="font-size: 16px">

### 在配置文件中配置的类必须是自定义的吗，可以使用JDK中的类吗，例如：java.util.Date？

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="userBean" class="com.jkweilai.spring.bean.User"/>
    <!--<bean id="userBean" class="com.jkweilai.spring.bean.Vip"/>-->

    <bean id="dateBean" class="java.util.Date"/>
</beans>
```

通过测试得知，在spring配置文件中配置的bean可以任意类，只要这个类不是抽象的，并且提供了无参数构造方法。

### getBean()方法调用时，如果指定的id不存在会怎样？

<img src="/images/spring/1663831841228-eda809d8-3e51-4b08-913c-76ff78efae1f.png" width="1390" height="460" title="" crop="0,0,1,1" id="u86ce6204" class="ne-image" style="font-size: 16px">

运行测试程序：

<img src="/images/spring/1763650804850-03cc33c1-dcf0-40eb-b07a-d816d6dad4b8.png" width="481" height="133" title="" crop="0,0,1,1" id="u8fada62d" class="ne-image" style="font-size: 16px">

通过测试得知，当id不存在的时候，会出现异常。

### getBean()方法返回的类型是Object，如果访问子类的特有属性和方法时，还需要向下转型，有其它办法可以解决这个问题吗？

```java
User user = applicationContext.getBean("userBean", User.class);
```

### ClassPathXmlApplicationContext是从类路径中加载配置文件，如果没有在类路径当中，又应该如何加载配置文件呢？

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <bean id="vipBean2" class="com.jkweilai.spring.bean.Vip"/>
</beans>
```

```java
ApplicationContext applicationContext2 = new FileSystemXmlApplicationContext("d:/spring.xml");
Vip vip = applicationContext2.getBean("vipBean2", Vip.class);
System.out.println(vip);
```

没有在类路径中的话，需要使用FileSystemXmlApplicationContext类进行加载配置文件。

这种方式较少用。一般都是将配置文件放到类路径当中，这样可移植性更强。

### ApplicationContext的超级父接口BeanFactory。

```java
BeanFactory beanFactory = new ClassPathXmlApplicationContext("spring.xml");
Object vipBean = beanFactory.getBean("vipBean");
System.out.println(vipBean);
```

BeanFactory是Spring容器的超级接口。ApplicationContext是BeanFactory的子接口。

## Spring 集成 logback 日志框架

SpringBoot 框架默认集成的是 logback 日志框架。但单纯只用 Spring 框架的时候，它是没有集成任何日志框架的，只是集成了日志门面。因此我们需要手动提供日志门面的实现，我们这里选择 logback 。

第一步：引入 logback 依赖

```xml
<dependency>
    <groupId>ch.qos.logback</groupId>
    <artifactId>logback-classic</artifactId>
    <version>1.4.14</version>
</dependency>
```

第二步：在类的根路径下提供 logback.xml 配置文件（文件名固定为：logback.xml，文件必须放到类根路径下。）

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <!-- 定义日志输出格式 -->
    <property name="CONSOLE_LOG_PATTERN" value="%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n"/>
    <property name="FILE_LOG_PATTERN" value="%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n"/>

    <!-- 控制台输出 Appender -->
    <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>${CONSOLE_LOG_PATTERN}</pattern>
            <charset>UTF-8</charset>
        </encoder>
    </appender>

    <!-- 文件输出 Appender -->
    <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <!-- 日志文件路径 -->
        <file>logs/application.log</file>
        <encoder>
            <pattern>${FILE_LOG_PATTERN}</pattern>
            <charset>UTF-8</charset>
        </encoder>
        <!-- 滚动策略 -->
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <!-- 按天归档 -->
            <fileNamePattern>logs/application.%d{yyyy-MM-dd}.%i.log</fileNamePattern>
            <timeBasedFileNamingAndTriggeringPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
                <!-- 单个文件最大 100MB -->
                <maxFileSize>100MB</maxFileSize>
            </timeBasedFileNamingAndTriggeringPolicy>
            <!-- 保留 30 天的历史 -->
            <maxHistory>30</maxHistory>
        </rollingPolicy>
    </appender>

    <!-- 设置日志级别 -->
    <!-- Spring Framework 的日志级别 -->
    <logger name="org.springframework" level="INFO"/>
    <!-- 项目的包路径，设置为 DEBUG 以便调试 -->
    <logger name="com.jkweilai" level="DEBUG"/>

    <!-- 根日志配置 -->
    <root level="INFO">
        <appender-ref ref="CONSOLE"/>
        <appender-ref ref="FILE"/>
    </root>
</configuration>
```

日志级别

1. TRACE：最低级别，用于记录所有日志信息。
2. DEBUG：用于记录调试信息，便于开发人员进行调试，但不适用于生产环境。
3. INFO：用于记录生产环境下的信息，如启动信息、用户登录信息等。
4. WARN：用于记录警告信息，表示程序可能出现潜在问题。
5. ERROR：用于记录错误信息，表示程序已经出现错误，需要进行处理。
6. FATAL：最高级别，用于记录致命错误信息，表示程序已经无法继续执行，需要进行紧急处理。
7. OFF：关闭所有的日志记录。

第三步：使用日志框架

```java
Logger logger = LoggerFactory.getLogger(FirstSpringTest.class);
logger.info("我是一条日志消息");
```

# Spring对IoC的实现

## IoC 控制反转

- 控制反转是一种思想。
- 控制反转是为了降低程序耦合度，提高程序扩展力，达到OCP原则，达到DIP原则。
- 控制反转，反转的是什么？
  - 将对象的创建权利交出去，交给第三方容器负责。
  - 将对象和对象之间关系的维护权交出去，交给第三方容器负责。
- 控制反转这种思想如何实现呢？
  - DI（Dependency Injection）：依赖注入

## 依赖注入

依赖注入实现了控制反转的思想。

**<font style="color:#E8323C;">Spring通过依赖注入的方式来完成Bean管理的。</font>**

**<font style="color:#E8323C;">Bean管理说的是：Bean对象的创建，以及Bean对象中属性的赋值（或者叫做Bean对象之间关系的维护）。</font>**

依赖注入：

- **依赖**指的是对象和对象之间的关联关系。
- **注入**指的是一种数据传递行为，通过注入行为来让对象和对象产生关系。

依赖注入常见的实现方式包括两种：

- 第一种：set注入
- 第二种：构造注入

新建模块：spring-002-dependency-injection

### set注入

set注入，基于set方法实现的，底层会通过反射机制调用属性对应的set方法然后给属性赋值。这种方式要求属性必须对外提供set方法。

```java
package com.jkweilai.spring.dao;

public class UserDao {

    public void insert(){
        System.out.println("正在保存用户数据。");
    }
}

```

```java
package com.jkweilai.spring.service;

import com.jkweilai.spring.dao.UserDao;

public class UserService {

    private UserDao userDao;

    // 使用set方式注入，必须提供set方法。
    // 反射机制要调用这个方法给属性赋值的。
    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }

    public void save(){
        userDao.insert();
    }
}

```

像这样去配置他们的关系：

```xml
<bean id="userDaoBean" class="com.jkweilai.spring.dao.UserDao"/>

<bean id="userServiceBean" class="com.jkweilai.spring.service.UserService">
    <property name="userDao" ref="userDaoBean"/>
</bean>
```

```java
public class DITest {

    @Test
    public void testSetDI(){
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring.xml");
        UserService userService = applicationContext.getBean("userServiceBean", UserService.class);
        userService.save();
    }
}
```

运行结果：

<img src="/images/spring/1763703270197-41c911da-b886-43e5-9412-e31e91cdbb2b.png" width="451.2" height="43" title="" crop="0,0,1,1" id="u9de36406" class="ne-image" style="font-size: 16px">

重点内容是，什么原理：

```xml
<bean id="userDaoBean" class="com.jkweilai.spring.dao.UserDao"/>

<bean id="userServiceBean" class="com.jkweilai.spring.service.UserService">
  <property name="userDao" ref="userDaoBean"/>
</bean>
```

实现原理：

- 通过property标签获取到属性名：userDao
- 通过属性名推断出set方法名：setUserDao
- 通过反射机制调用setUserDao()方法给属性赋值
- property标签的name是属性名。
- property标签的ref是要注入的bean对象的id。**<font style="color:#E8323C;">(通过ref属性来完成bean的装配，这是bean最简单的一种装配方式。装配指的是：创建系统组件之间关联的动作)</font>**

**可以把set方法注释掉，再测试一下**：

<img src="/images/spring/1763718228299-478ab23d-ebde-4f03-867e-fe4a91bf8d3c.png" width="818.4" height="70" title="" crop="0,0,1,1" id="u98af24a1" class="ne-image" style="font-size: 16px">

通过测试得知，底层实际上调用了setUserDao()方法。所以需要确保这个方法的存在。

我们现在把属性名修改一下，但方法名还是setUserDao()，我们来测试一下：

```java
public class UserService {

    private UserDao aaa;

    // 使用set方式注入，必须提供set方法。
    // 反射机制要调用这个方法给属性赋值的。
    public void setUserDao(UserDao userDao) {
        this.aaa = userDao;
    }

    public void save(){
        aaa.insert();
    }
}

```

运行测试程序：

<img src="/images/spring/1763703431816-e00a0a7f-80e6-41c6-851a-484a6e0fc93a.png" width="336.8" height="40" title="" crop="0,0,1,1" id="uaa8c7016" class="ne-image" style="font-size: 16px">

通过测试看到程序仍然可以正常执行，说明property标签的name是：setUserDao()方法名演变得到的。演变的规律是：

- setUsername() 演变为 username
- setPassword() 演变为 password
- setUserDao() 演变为 userDao
- setUserService() 演变为 userService

另外，对于property标签来说，ref属性也可以采用标签的方式，但使用ref属性是多数的：

```xml
<bean id="userServiceBean" class="com.jkweilai.spring.service.UserService">
  <property name="userDao">
    <ref bean="userDaoBean"/>
  </property>
</bean>
```

**<font style="color:#E8323C;">总结：set注入的核心实现原理：通过反射机制调用set方法来给属性赋值，让两个对象之间产生关系。</font>**

### 构造注入

核心原理：通过调用构造方法来给属性赋值。

```java
public class OrderDao {
    public void deleteById(){
        System.out.println("正在删除订单。。。");
    }
}
```

```java
public class OrderService {
    private OrderDao orderDao;

    // 通过反射机制调用构造方法给属性赋值
    public OrderService(OrderDao orderDao) {
        this.orderDao = orderDao;
    }

    public void delete(){
        orderDao.deleteById();
    }
}
```

```xml
<bean id="orderDaoBean" class="com.jkweilai.spring.dao.OrderDao"/>
<bean id="orderServiceBean" class="com.jkweilai.spring.service.OrderService">
  <!--index="0"表示构造方法的第一个参数，将orderDaoBean对象传递给构造方法的第一个参数。-->
  <constructor-arg index="0" ref="orderDaoBean"/>
</bean>
```

```java
@Test
public void testConstructorDI(){
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring.xml");
    OrderService orderServiceBean = applicationContext.getBean("orderServiceBean", OrderService.class);
    orderServiceBean.delete();
}
```

运行结果如下：

<img src="/images/spring/1763703541233-f144603f-0a7c-4efc-be49-7e4cb31ee9f0.png" width="250.4" height="36" title="" crop="0,0,1,1" id="uf88a84b7" class="ne-image" style="font-size: 16px">

**<font style="color:#E8323C;">如果构造方法有两个参数：</font>**

```java
public class OrderService {
    private OrderDao orderDao;
    private UserDao userDao;

    // 通过反射机制调用构造方法给属性赋值
    public OrderService(OrderDao orderDao, UserDao userDao) {
        this.orderDao = orderDao;
        this.userDao = userDao;
    }

    public void delete(){
        orderDao.deleteById();
        userDao.insert();
    }
}

```

spring配置文件：

```xml
<bean id="orderDaoBean" class="com.jkweilai.spring.dao.OrderDao"/>

<bean id="orderServiceBean" class="com.jkweilai.spring.service.OrderService">
  <!--第一个参数下标是0-->
  <constructor-arg index="0" ref="orderDaoBean"/>
  <!--第二个参数下标是1-->
  <constructor-arg index="1" ref="userDaoBean"/>
</bean>

<bean id="userDaoBean" class="com.jkweilai.spring.dao.UserDao"/>
```

执行测试程序：

<img src="/images/spring/1763703565658-98132ed3-4e4c-4524-9633-89ecbb517c76.png" width="258.4" height="64" title="" crop="0,0,1,1" id="ue678b9e7" class="ne-image" style="font-size: 16px">

**<font style="color:#E8323C;">不使用参数下标，使用参数的名字可以吗？</font>**

```xml
<bean id="orderDaoBean" class="com.jkweilai.spring.dao.OrderDao"/>

<bean id="orderServiceBean" class="com.jkweilai.spring.service.OrderService">
  <!--这里使用了构造方法上参数的名字-->
  <constructor-arg name="orderDao" ref="orderDaoBean"/>
  <constructor-arg name="userDao" ref="userDaoBean"/>
</bean>

<bean id="userDaoBean" class="com.jkweilai.spring.dao.UserDao"/>
```

执行测试程序：

<img src="/images/spring/1763703580933-9558d7db-975e-4289-969b-d910c1b3d3ee.png" width="256" height="59" title="" crop="0,0,1,1" id="ud2395cbf" class="ne-image" style="font-size: 16px">

**<font style="color:#E8323C;">不指定参数下标，不指定参数名字，可以吗？</font>**

```xml
<bean id="orderDaoBean" class="com.jkweilai.spring.dao.OrderDao"/>
<bean id="orderServiceBean" class="com.jkweilai.spring.service.OrderService">
  <!--没有指定下标，也没有指定参数名字-->
  <constructor-arg ref="orderDaoBean"/>
  <constructor-arg ref="userDaoBean"/>
</bean>

<bean id="userDaoBean" class="com.jkweilai.spring.dao.UserDao"/>
```

执行测试程序：

<img src="/images/spring/1763703580933-9558d7db-975e-4289-969b-d910c1b3d3ee.png" width="256" height="59" title="" crop="0,0,1,1" id="SS6tZ" class="ne-image" style="font-size: 16px">

**<font style="color:#E8323C;">配置文件中构造方法参数的类型顺序和构造方法参数的类型顺序不一致呢？</font>**

```xml
<bean id="orderDaoBean" class="com.jkweilai.spring.dao.OrderDao"/>

<bean id="orderServiceBean" class="com.jkweilai.spring.service.OrderService">
  <!--顺序已经和构造方法的参数顺序不同了-->
  <constructor-arg ref="userDaoBean"/>
  <constructor-arg ref="orderDaoBean"/>
</bean>

<bean id="userDaoBean" class="com.jkweilai.spring.dao.UserDao"/>
```

执行测试程序：

<img src="/images/spring/1763703580933-9558d7db-975e-4289-969b-d910c1b3d3ee.png" width="256" height="59" title="" crop="0,0,1,1" id="awhBt" class="ne-image" style="font-size: 16px">

通过测试得知，通过构造方法注入的时候：

- 可以通过下标
- 可以通过参数名
- 也可以不指定下标和参数名，可以类型自动推断。

Spring在装配方面做的还是比较健壮的。

## set注入专题

### 注入外部Bean

在之前4.2.1中使用的案例就是注入外部Bean的方式。

```xml
<bean id="userDaoBean" class="com.jkweilai.spring.dao.UserDao"/>

<bean id="userServiceBean" class="com.jkweilai.spring.service.UserService">
    <property name="userDao" ref="userDaoBean"/>
</bean>
```

外部Bean的特点：bean定义到外面，在property标签中使用ref属性进行注入。通常这种方式是常用的。

### 注入内部Bean

内部Bean的方式：在bean标签中嵌套bean标签。

```xml
<bean id="userServiceBean" class="com.jkweilai.spring.service.UserService">
    <property name="userDao">
        <bean class="com.jkweilai.spring.dao.UserDao"/>
    </property>
</bean>
```

```java
@Test
public void testInnerBean(){
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring-inner-bean.xml");
    UserService userService = applicationContext.getBean("userServiceBean", UserService.class);
    userService.save();
}
```

执行测试程序：

<img src="/images/spring/1763703724923-3d6fe488-4cc4-464a-9fb4-46737d190786.png" width="202.4" height="42" title="" crop="0,0,1,1" id="u388f6ea7" class="ne-image" style="font-size: 16px">

这种方式作为了解。

### 注入简单类型

我们之前在进行注入的时候，对象的属性是另一个对象。

```java
public class UserService{

    private UserDao userDao;

    public void setUserDao(UserDao userDao){
        this.userDao = userDao;
    }

}
```

那如果对象的属性是int类型呢？

```java
public class User{

    private int age;

    public void setAge(int age){
        this.age = age;
    }

}
```

可以通过set注入的方式给该属性赋值吗？

- 当然可以。因为只要能够调用set方法就可以给属性赋值。

**编写程序给一个User对象的age属性赋值20：**

第一步：定义User类，提供age属性，提供age属性的setter方法。

```java
public class User {
    private int age;

    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "User{" +
                "age=" + age +
                '}';
    }
}

```

第二步：编写spring配置文件：spring-simple-type.xml

```xml
<bean id="userBean" class="com.jkweilai.spring.beans.User">
    <!--如果像这种int类型的属性，我们称为简单类型，这种简单类型在注入的时候要使用value属性，不能使用ref-->
    <!--<property name="age" value="20"/>-->
    <property name="age">
        <value>20</value>
    </property>
</bean>
```

第三步：编写测试程序

```java
@Test
public void testSimpleType(){
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring-simple-type.xml");
    User user = applicationContext.getBean("userBean", User.class);
    System.out.println(user);
}
```

第四步：运行测试程序

<img src="/images/spring/1763703886349-7e587def-2b4f-4abf-aff0-6c0f41011328.png" width="207.2" height="41" title="" crop="0,0,1,1" id="u3ba6a0d0" class="ne-image" style="font-size: 16px">

**<font style="color:#E8323C;">需要特别注意：如果给简单类型赋值，使用value属性或value标签。而不是ref。</font>**

简单类型包括哪些呢？可以通过Spring的源码来分析一下：BeanUtils类、ClassUtils类：

<img src="/images/spring/1726729479656-34799374-2f4a-4d05-a2ce-89defea2ad21.png" width="904" height="852" title="" crop="0,0,1,1" id="u9e603728" class="ne-image" style="font-size: 16px">

简单类型包括：

<img src="/images/spring/1726729370217-81b396a1-bf0b-4459-9b15-2c1e77c37093.png" width="715" height="99" title="" crop="0,0,1,1" id="ua81a2c38" class="ne-image" style="font-size: 16px">

**经典案例：给数据源的属性注入值：**

假设我们现在要自己手写一个数据源，我们都知道所有的数据源都要实现javax.sql.DataSource接口，并且数据源中应该有连接数据库的信息，例如：driver、url、username、password等。

```java
public class MyDataSource implements DataSource {
    private String driver;
    private String url;
    private String username;
    private String password;

    public void setDriver(String driver) {
        this.driver = driver;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "MyDataSource{" +
                "driver='" + driver + '\'' +
                ", url='" + url + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }

    @Override
    public Connection getConnection() throws SQLException {
        return null;
    }

    @Override
    public Connection getConnection(String username, String password) throws SQLException {
        return null;
    }

    @Override
    public PrintWriter getLogWriter() throws SQLException {
        return null;
    }

    @Override
    public void setLogWriter(PrintWriter out) throws SQLException {

    }

    @Override
    public void setLoginTimeout(int seconds) throws SQLException {

    }

    @Override
    public int getLoginTimeout() throws SQLException {
        return 0;
    }

    @Override
    public Logger getParentLogger() throws SQLFeatureNotSupportedException {
        return null;
    }

    @Override
    public <T> T unwrap(Class<T> iface) throws SQLException {
        return null;
    }

    @Override
    public boolean isWrapperFor(Class<?> iface) throws SQLException {
        return false;
    }
}

```

我们给driver、url、username、password四个属性分别提供了setter方法，我们可以使用spring的依赖注入完成数据源对象的创建和属性的赋值吗？看配置文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="dataSource" class="com.jkweilai.spring.beans.MyDataSource">
        <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
        <property name="url" value="jdbc:mysql://localhost:3306/spring"/>
        <property name="username" value="root"/>
        <property name="password" value="123456"/>
    </bean>

</beans>
```

测试程序：

```java
@Test
public void testDataSource(){
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring-datasource.xml");
    MyDataSource dataSource = applicationContext.getBean("dataSource", MyDataSource.class);
    System.out.println(dataSource);
}
```

执行测试程序：

<img src="/images/spring/1763703988968-74f61c13-64c3-4af9-aa3f-0124482b808d.png" width="1095.2" height="34" title="" crop="0,0,1,1" id="u55fe0f13" class="ne-image" style="font-size: 16px">

你学会了吗？

### 级联属性赋值（了解）

```java
public class Clazz {
    private String name;

    public Clazz() {
    }

    public Clazz(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Clazz{" +
                "name='" + name + '\'' +
                '}';
    }
}

```

```java
public class Student {
    private String name;
    private Clazz clazz;

    public Student() {
    }

    public Student(String name, Clazz clazz) {
        this.name = name;
        this.clazz = clazz;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setClazz(Clazz clazz) {
        this.clazz = clazz;
    }

    public Clazz getClazz() {
        return clazz;
    }

    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", clazz=" + clazz +
                '}';
    }
}

```

```xml
<bean id="clazzBean" class="com.jkweilai.spring.beans.Clazz"/>

<bean id="student" class="com.jkweilai.spring.beans.Student">
    <property name="name" value="张三"/>

    <!--要点1：以下两行配置的顺序不能颠倒-->
    <property name="clazz" ref="clazzBean"/>
    <!--要点2：clazz属性必须有getter方法-->
    <property name="clazz.name" value="高三一班"/>
</bean>
```

```java
@Test
public void testCascade(){
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring-cascade.xml");
    Student student = applicationContext.getBean("student", Student.class);
    System.out.println(student);
}
```

运行结果：

<img src="/images/spring/1763704075496-763dcaba-4244-4d90-8b1b-a2b6c8148730.png" width="540" height="34" title="" crop="0,0,1,1" id="u20b77a4b" class="ne-image" style="font-size: 16px">

**<font style="color:#E8323C;">要点：</font>**

- **<font style="color:#E8323C;">在spring配置文件中，如上，注意顺序。</font>**
- **<font style="color:#E8323C;">在spring配置文件中，clazz属性必须提供getter方法。</font>**

### 注入数组

**当数组中的元素是简单类型**：

```java
package com.jkweilai.spring.beans;

import java.util.Arrays;

public class Person {
    private String[] favoriteFoods;

    public void setFavoriteFoods(String[] favoriteFoods) {
        this.favoriteFoods = favoriteFoods;
    }

    @Override
    public String toString() {
        return "Person{" +
                "favoriteFoods=" + Arrays.toString(favoriteFoods) +
                '}';
    }
}

```

```xml
<bean id="person" class="com.jkweilai.spring.beans.Person">
    <property name="favoriteFoods">
        <array>
            <value>鸡排</value>
            <value>汉堡</value>
            <value>鹅肝</value>
        </array>
    </property>
</bean>
```

```java
@Test
public void testArraySimple(){
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring-array-simple.xml");
    Person person = applicationContext.getBean("person", Person.class);
    System.out.println(person);
}
```

**当数组中的元素是非简单类型：一个订单中包含多个商品。**

```java
public class Goods {
    private String name;

    public Goods() {
    }

    public Goods(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Goods{" +
                "name='" + name + '\'' +
                '}';
    }
}

```

```java
public class Order {
    // 一个订单中有多个商品
    private Goods[] goods;

    public Order() {
    }

    public Order(Goods[] goods) {
        this.goods = goods;
    }

    public void setGoods(Goods[] goods) {
        this.goods = goods;
    }

    @Override
    public String toString() {
        return "Order{" +
                "goods=" + Arrays.toString(goods) +
                '}';
    }
}

```

```xml
<bean id="goods1" class="com.jkweilai.spring.beans.Goods">
    <property name="name" value="西瓜"/>
</bean>

<bean id="goods2" class="com.jkweilai.spring.beans.Goods">
    <property name="name" value="苹果"/>
</bean>

<bean id="order" class="com.jkweilai.spring.beans.Order">
    <property name="goods">
        <array>
            <!--这里使用ref标签即可-->
            <ref bean="goods1"/>
            <ref bean="goods2"/>
        </array>
    </property>
</bean>
```

测试程序：

```java
@Test
public void testArray(){
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring-array.xml");
    Order order = applicationContext.getBean("order", Order.class);
    System.out.println(order);
}
```

执行结果：

<img src="/images/spring/1763717431738-ef375752-075c-43bd-bf25-d62f957e52f2.png" width="595.2" height="41" title="" crop="0,0,1,1" id="u17421ba5" class="ne-image" style="font-size: 16px">

**<font style="color:#E8323C;">要点：</font>**

- **<font style="color:#E8323C;">如果数组中是简单类型，使用value标签。</font>**
- **<font style="color:#E8323C;">如果数组中是非简单类型，使用ref标签。</font>**

### 注入List集合

List集合：有序可重复

```java
public class People {
    // 一个人有多个名字
    private List<String> names;

    public void setNames(List<String> names) {
        this.names = names;
    }

    @Override
    public String toString() {
        return "People{" +
                "names=" + names +
                '}';
    }
}

```

```xml
<bean id="peopleBean" class="com.jkweilai.spring.beans.People">
    <property name="names">
        <list>
            <value>铁锤</value>
            <value>张三</value>
            <value>张三</value>
            <value>张三</value>
            <value>狼</value>
        </list>
    </property>
</bean>
```

```java
@Test
public void testCollection(){
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring-collection.xml");
    People peopleBean = applicationContext.getBean("peopleBean", People.class);
    System.out.println(peopleBean);
}
```

执行结果：

<img src="/images/spring/1763717474219-f00a5de9-fe99-401d-8540-0dfb59671bb2.png" width="456.8" height="38" title="" crop="0,0,1,1" id="ubf825386" class="ne-image" style="font-size: 16px">

**<font style="color:#F5222D;">注意：注入List集合的时候使用list标签，如果List集合中是简单类型使用value标签，反之使用ref标签。</font>**

### 注入Set集合

Set集合：无序不可重复

```java
public class People {
    // 一个人有多个电话
    private Set<String> phones;

    public void setPhones(Set<String> phones) {
        this.phones = phones;
    }

    //......

    @Override
    public String toString() {
        return "People{" +
                "phones=" + phones +
                ", names=" + names +
                '}';
    }
}

```

```xml
<bean id="peopleBean" class="com.jkweilai.spring.beans.People">
    <property name="phones">
        <set>
            <!--非简单类型可以使用ref，简单类型使用value-->
            <value>110</value>
            <value>110</value>
            <value>120</value>
            <value>120</value>
            <value>119</value>
            <value>119</value>
        </set>
    </property>
</bean>
```

执行结果：

<img src="/images/spring/1763717525860-5898bf62-8e74-438d-afee-979fb446ff0f.png" width="718.4" height="38" title="" crop="0,0,1,1" id="u2c83b2b8" class="ne-image" style="font-size: 16px">

**<font style="color:#F5222D;">要点：</font>**

- **<font style="color:#F5222D;">使用 `<set>` 标签</font>**
- **<font style="color:#F5222D;">set集合中元素是简单类型的使用value标签，反之使用ref标签。</font>**

### 注入Map集合

```java
public class People {
    // 一个人有多个住址
    private Map<Integer, String> addrs;

    public void setAddrs(Map<Integer, String> addrs) {
        this.addrs = addrs;
    }

    //......

    @Override
    public String toString() {
        return "People{" +
                "addrs=" + addrs +
                ", phones=" + phones +
                ", names=" + names +
                '}';
    }

}

```

```xml
<bean id="peopleBean" class="com.jkweilai.spring.beans.People">
    <property name="addrs">
        <map>
            <!--如果key不是简单类型，使用 key-ref 属性-->
            <!--如果value不是简单类型，使用 value-ref 属性-->
            <entry key="1" value="北京海淀"/>
            <entry key="2" value="上海浦东"/>
            <entry key="3" value="天津南开"/>
        </map>
    </property>
</bean>
```

**<font style="color:#F5222D;">要点：</font>**

- **<font style="color:#F5222D;">使用 `<map>` 标签</font>**
- **<font style="color:#F5222D;">如果key是简单类型，使用 key 属性，反之使用 key-ref 属性。</font>**
- **<font style="color:#F5222D;">如果value是简单类型，使用 value 属性，反之使用 value-ref 属性。</font>**

### 注入Properties

java.util.Properties继承java.util.Hashtable，所以Properties也是一个Map集合。

```java
public class People {

    private Properties properties;

    public void setProperties(Properties properties) {
        this.properties = properties;
    }

    //......

    @Override
    public String toString() {
        return "People{" +
                "properties=" + properties +
                ", addrs=" + addrs +
                ", phones=" + phones +
                ", names=" + names +
                '}';
    }
}

```

```xml
<bean id="peopleBean" class="com.jkweilai.spring.beans.People">
    <property name="properties">
        <props>
            <prop key="driver">com.mysql.cj.jdbc.Driver</prop>
            <prop key="url">jdbc:mysql://localhost:3306/spring</prop>
            <prop key="username">root</prop>
            <prop key="password">123456</prop>
        </props>
    </property>
</bean>
```

执行测试程序：

<img src="/images/spring/1763717687274-17ec7c70-16b4-4a1a-b67b-d252ccfef797.png" width="1098.4" height="34" title="" crop="0,0,1,1" id="ud6a019ac" class="ne-image" style="font-size: 16px">

**<font style="color:#F5222D;">要点：</font>**

- **<font style="color:#F5222D;">使用 `<props>` 标签嵌套 `<prop>` 标签完成。</font>**

### 注入null和空字符串

注入空字符串使用：`<value/>` 或者 `value=""`

注入null使用：`<null/>` 或者 不为该属性赋值

- 我们先来看一下，怎么注入空字符串。

```java
public class Vip {
    private String email;

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "Vip{" +
                "email='" + email + '\'' +
                '}';
    }
}

```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="vipBean" class="com.jkweilai.spring.beans.Vip">
        <!--空串的第一种方式-->
        <!--<property name="email" value=""/>-->
        <!--空串的第二种方式-->
        <property name="email">
            <value/>
        </property>
    </bean>

</beans>
```

```java
@Test
public void testNull(){
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring-null.xml");
    Vip vipBean = applicationContext.getBean("vipBean", Vip.class);
    System.out.println(vipBean);
}
```

执行结果：

<img src="/images/spring/1763717731445-35c6fea4-2f21-4450-b29c-2111f2ce1d7a.png" width="216" height="34" title="" crop="0,0,1,1" id="u1b9d3298" class="ne-image" style="font-size: 16px">

- 怎么注入null呢？

第一种方式：不给属性赋值

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="vipBean" class="com.jkweilai.spring.beans.Vip" />

</beans>
```

执行结果：

<img src="/images/spring/1763717749034-ffa72b1d-fb17-4b6d-8f2c-d6b88208bae1.png" width="253.6" height="38" title="" crop="0,0,1,1" id="uc5cca1d4" class="ne-image" style="font-size: 16px">

第二种方式：使用 `<null/>`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="vipBean" class="com.jkweilai.spring.beans.Vip">
        <property name="email">
            <null/>
        </property>
    </bean>

</beans>
```

执行结果：

<img src="/images/spring/1763717759124-7724e7c6-92ba-4ae8-b3e1-d9cd847c712e.png" width="222.4" height="35" title="" crop="0,0,1,1" id="ued18a3f9" class="ne-image" style="font-size: 16px">

### 注入的值中含有特殊符号

XML中有5个特殊字符，分别是：`<``>``'``"``&`

以上5个特殊符号在XML中会被特殊对待，会被当做XML语法的一部分进行解析，如果这些特殊符号直接出现在注入的字符串当中，会报错。

<img src="/images/spring/1763718169577-c2150391-6ada-4ba4-8d78-ed66ce8db5f4.png" width="846.4" height="209" title="" crop="0,0,1,1" id="u0418a1a0" class="ne-image" style="font-size: 16px">

解决方案包括两种：

- 第一种：特殊符号使用转义字符代替。
- 第二种：将含有特殊符号的字符串放到 `<![CDATA[]]>` 当中。因为放在CDATA区中的数据不会被XML文件解析器解析。

5个特殊字符对应的转义字符分别是：

| **特殊字符** | **转义字符** |
| ------------ | ------------ |
| >            | &gt;         |
| <            | &lt;         |
| '            | &apos;       |
| "            | &quot;       |
| &            | &amp;        |

先使用转义字符来代替：

```java
public class Math {
    private String result;

    public void setResult(String result) {
        this.result = result;
    }

    @Override
    public String toString() {
        return "Math{" +
                "result='" + result + '\'' +
                '}';
    }
}

```

```xml
<bean id="mathBean" class="com.jkweilai.spring.beans.Math">
    <property name="result" value="2 &lt; 3"/>
</bean>
```

```java
@Test
public void testSpecial(){
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring-special.xml");
    Math mathBean = applicationContext.getBean("mathBean", Math.class);
    System.out.println(mathBean);
}
```

执行结果：

<img src="/images/spring/1763717850747-fe3fa73b-806c-4ae2-ab0f-06e5359075e6.png" width="275.2" height="37" title="" crop="0,0,1,1" id="uc57d065a" class="ne-image" style="font-size: 16px">

我们再来使用CDATA方式：

```xml
<bean id="mathBean" class="com.jkweilai.spring.beans.Math">
    <property name="result">
        <!--只能使用value标签-->
        <value><![CDATA[2 < 3]]></value>
    </property>
</bean>
```

**<font style="color:#F5222D;">注意：使用CDATA时，不能使用value属性，只能使用value标签。</font>**

执行结果：

<img src="/images/spring/1763717882333-4ff84443-b20b-499b-bf88-bc489e189fe1.png" width="263.2" height="38" title="" crop="0,0,1,1" id="ue64fc38b" class="ne-image" style="font-size: 16px">

## p命名空间注入

目的：简化配置。

使用p命名空间注入的前提条件包括两个：

- 第一：在XML头部信息中添加p命名空间的配置信息：xmlns:p="[http://www.springframework.org/schema/p"](http://www.springframework.org/schema/p")
- 第二：p命名空间注入是基于setter方法的，所以需要对应的属性提供setter方法。

```java
public class Customer {
    private String name;
    private int age;

    public void setName(String name) {
        this.name = name;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "Customer{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}

```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:p="http://www.springframework.org/schema/p"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="customerBean" class="com.jkweilai.spring.beans.Customer" p:name="zhangsan" p:age="20"/>

</beans>
```

```java
@Test
public void testP(){
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring-p.xml");
    Customer customerBean = applicationContext.getBean("customerBean", Customer.class);
    System.out.println(customerBean);
}
```

执行结果：

<img src="/images/spring/1763718009839-ade48dfb-1431-4f10-a994-4ab8374ef367.png" width="404" height="45" title="" crop="0,0,1,1" id="u972f3061" class="ne-image" style="font-size: 16px">

把setter方法去掉：

<img src="/images/spring/1763718119042-3c78856d-6f8b-4b23-8559-51d174a399f9.png" width="777.6" height="66" title="" crop="0,0,1,1" id="u40af6bc4" class="ne-image" style="font-size: 16px">

所以p命名空间实际上是对set注入的简化。

## c命名空间注入

c命名空间是简化构造方法注入的。

使用c命名空间的两个前提条件：

第一：需要在xml配置文件头部添加信息：<font style="color:#bababa;">xmlns:</font><font style="color:#9876aa;">c</font><font style="color:#6a8759;">="http://www.springframework.org/schema/c"</font>

第二：需要提供构造方法。

```java
public class MyTime {
    private int year;
    private int month;
    private int day;

    public MyTime(int year, int month, int day) {
        this.year = year;
        this.month = month;
        this.day = day;
    }

    @Override
    public String toString() {
        return "MyTime{" +
                "year=" + year +
                ", month=" + month +
                ", day=" + day +
                '}';
    }
}

```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:c="http://www.springframework.org/schema/c"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="myTimeBean" class="com.jkweilai.spring.beans.MyTime" c:_0="2008" c:_1="8" c:_2="8"/>

</beans>
```

```java
@Test
public void testC(){
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring-c.xml");
    MyTime myTimeBean = applicationContext.getBean("myTimeBean", MyTime.class);
    System.out.println(myTimeBean);
}
```

执行结果：

<img src="/images/spring/1763718096636-e9af0497-bb5a-4341-bf38-eabde32ba060.png" width="404.8" height="36" title="" crop="0,0,1,1" id="u430b4313" class="ne-image" style="font-size: 16px">

把构造方法注释掉：

<img src="/images/spring/1763718138114-98841768-357f-4408-aef7-7c57107cdb3e.png" width="563.2" height="54" title="" crop="0,0,1,1" id="ueb28e77a" class="ne-image" style="font-size: 16px">

所以，c命名空间是依靠构造方法的。

**<font style="color:#F5222D;">注意：不管是p命名空间还是c命名空间，注入的时候都可以注入简单类型以及非简单类型。</font>**

## util命名空间

使用util命名空间可以让**<font style="color:#F5222D;">配置复用</font>**。

使用util命名空间的前提是：在spring配置文件头部添加配置信息。如下：

<img src="/images/spring/1665218059794-30411b76-a22c-4339-ab60-acad8f02ab28.png" width="1494" height="212" title="" crop="0,0,1,1" id="udeece73c" class="ne-image" style="font-size: 16px">

```java
public class MyDataSource1 {
    private Properties properties;

    public void setProperties(Properties properties) {
        this.properties = properties;
    }

    @Override
    public String toString() {
        return "MyDataSource1{" +
                "properties=" + properties +
                '}';
    }
}

```

```java
public class MyDataSource2 {
    private Properties properties;

    public void setProperties(Properties properties) {
        this.properties = properties;
    }

    @Override
    public String toString() {
        return "MyDataSource2{" +
                "properties=" + properties +
                '}';
    }
}

```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:util="http://www.springframework.org/schema/util"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/util http://www.springframework.org/schema/util/spring-util.xsd">

    <util:properties id="prop">
        <prop key="driver">com.mysql.cj.jdbc.Driver</prop>
        <prop key="url">jdbc:mysql://localhost:3306/spring</prop>
        <prop key="username">root</prop>
        <prop key="password">123456</prop>
    </util:properties>

    <bean id="dataSource1" class="com.jkweilai.spring.beans.MyDataSource1">
        <property name="properties" ref="prop"/>
    </bean>

    <bean id="dataSource2" class="com.jkweilai.spring.beans.MyDataSource2">
        <property name="properties" ref="prop"/>
    </bean>
</beans>
```

```java
@Test
public void testUtil(){
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring-util.xml");

    MyDataSource1 dataSource1 = applicationContext.getBean("dataSource1", MyDataSource1.class);
    System.out.println(dataSource1);

    MyDataSource2 dataSource2 = applicationContext.getBean("dataSource2", MyDataSource2.class);
    System.out.println(dataSource2);
}
```

执行结果：

<img src="/images/spring/1763718455643-7d9355ac-8556-47fe-ab67-1e2349d580e2.png" width="1078.4" height="50" title="" crop="0,0,1,1" id="u31499e48" class="ne-image" style="font-size: 16px">

## 基于XML的自动装配

Spring还可以完成自动化的注入，自动化注入又被称为自动装配。它可以根据**<font style="color:#E8323C;">名字</font>**进行自动装配，也可以根据**<font style="color:#E8323C;">类型</font>**进行自动装配。

**<font style="color:#DF2A3F;">基于 XML 的自动装配底层都是基于 </font>**`**<font style="color:#DF2A3F;">setter</font>**`**<font style="color:#DF2A3F;">方法，因此要求必须提供 </font>**`**<font style="color:#DF2A3F;">setter</font>**`**<font style="color:#DF2A3F;">方法。</font>**

### 根据名称自动装配

```java
public class UserDao {

    public void insert(){
        System.out.println("正在保存用户数据。");
    }
}

```

```java
public class UserService {

    private UserDao aaa;

    // 这个set方法非常关键
    public void setAaa(UserDao aaa) {
        this.aaa = aaa;
    }

    public void save(){
        aaa.insert();
    }
}

```

Spring的配置文件这样配置：

```xml
<bean id="userService" class="com.jkweilai.spring.service.UserService" autowire="byName"/>

<bean id="aaa" class="com.jkweilai.spring.dao.UserDao"/>
```

这个配置起到关键作用：

- UserService Bean中需要添加autowire="byName"，表示通过名称进行装配。
- UserService类中有一个UserDao属性，而UserDao属性的名字是aaa，**<font style="color:#E8323C;">对应的set方法是setAaa()</font>**，正好和UserDao Bean的id是一样的。这就是根据名称自动装配。

```java
@Test
public void testAutowireByName(){
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring-autowire.xml");
    UserService userService = applicationContext.getBean("userService", UserService.class);
    userService.save();
}
```

执行结果：

<img src="/images/spring/1763718549628-c1b58d51-d746-4d9e-aeb0-c8c5ee1f0a59.png" width="249.6" height="42" title="" crop="0,0,1,1" id="ua917e755" class="ne-image" style="font-size: 16px">

我们来测试一下，byName装配是和属性名有关还是和set方法名有关系：

```java
public class UserService {
    // 这里没修改
    private UserDao aaa;

    /*public void setAaa(UserDao aaa) {
        this.aaa = aaa;
    }*/

    // set方法名变化了
    public void setDao(UserDao aaa){
        this.aaa = aaa;
    }

    public void save(){
        aaa.insert();
    }
}

```

在执行测试程序：

<img src="/images/spring/1763718582395-53105c38-4844-412e-bcba-cc52e90013ab.png" width="291.2" height="62" title="" crop="0,0,1,1" id="u065754b6" class="ne-image" style="font-size: 16px">

通过测试得知，aaa属性并没有赋值成功。也就是并没有装配成功。

我们将spring配置文件修改以下：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

  <bean id="userService" class="com.jkweilai.spring.service.UserService" autowire="byName"/>
  <!--这个id修改了-->
  <bean id="dao" class="com.jkweilai.spring.dao.UserDao"/>

</beans>
```

执行测试程序：

<img src="/images/spring/1763718621703-01a7eaa0-f0cb-44c1-80f6-d113eb52eb86.png" width="200" height="37" title="" crop="0,0,1,1" id="u3837bc2a" class="ne-image" style="font-size: 16px">

这说明，如果根据名称装配(byName)，底层会调用set方法进行注入。

例如：setAge() 对应的名字是age，setPassword()对应的名字是password，setEmail()对应的名字是email。

### 根据类型自动装配

```java
public class AccountDao {
    public void insert(){
        System.out.println("正在保存账户信息");
    }
}

```

```java
public class AccountService {
    private AccountDao accountDao;

    public void setAccountDao(AccountDao accountDao) {
        this.accountDao = accountDao;
    }

    public void save(){
        accountDao.insert();
    }
}

```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!--byType表示根据类型自动装配-->
    <bean id="accountService" class="com.jkweilai.spring.service.AccountService" autowire="byType"/>

    <bean class="com.jkweilai.spring.dao.AccountDao"/>

</beans>
```

```java
@Test
public void testAutowireByType(){
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring-autowire.xml");
    AccountService accountService = applicationContext.getBean("accountService", AccountService.class);
    accountService.save();
}
```

执行结果：

<img src="/images/spring/1763718680599-8c83ff07-8541-4638-9607-6b2a2585c4c3.png" width="193.6" height="30" title="" crop="0,0,1,1" id="u80f9874a" class="ne-image" style="font-size: 16px">

我们把UserService中的set方法注释掉，再执行：

<img src="/images/spring/1763718687238-6eb11940-af46-4b9f-81cd-7715d0605040.png" width="312" height="50" title="" crop="0,0,1,1" id="u616a48ae" class="ne-image" style="font-size: 16px">

**<font style="color:#DF2A3F;">可以看到无论是byName还是byType，在装配的时候都是基于set方法的。所以set方法是必须要提供的。</font>**提供构造方法是不行的，大家可以测试一下。这里就不再赘述。

如果byType，根据类型装配时，如果配置文件中有两个类型一样的bean会出现什么问题呢？

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="accountService" class="com.jkweilai.spring.service.AccountService" autowire="byType"/>

    <bean id="x" class="com.jkweilai.spring.dao.AccountDao"/>
    <bean id="y" class="com.jkweilai.spring.dao.AccountDao"/>

</beans>
```

执行测试程序：

<img src="/images/spring/1763718715528-42fe5699-776e-4cd1-b4d2-6bc55d8590be.png" width="475.2" height="59" title="" crop="0,0,1,1" id="u8a6374ae" class="ne-image" style="font-size: 16px">

测试结果说明了，当byType进行自动装配的时候，配置文件中某种类型的Bean必须是唯一的，不能出现多个。

## Spring引入外部属性配置文件

我们都知道编写数据源的时候是需要连接数据库的信息的，例如：driver url username password等信息。这些信息可以单独写到一个属性配置文件中吗，这样用户修改起来会更加的方便。当然可以。

第一步：写一个数据源类，提供相关属性。

```java
public class MyDataSource implements DataSource {
    @Override
    public String toString() {
        return "MyDataSource{" +
                "driver='" + driver + '\'' +
                ", url='" + url + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }

    private String driver;
    private String url;
    private String username;
    private String password;

    public void setDriver(String driver) {
        this.driver = driver;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    //......
}

```

第二步：在类路径下新建jdbc.properties文件，并配置信息。

```properties
driver=com.mysql.cj.jdbc.Driver
url=jdbc:mysql://localhost:3306/spring
username=root
password=root123
```

第三步：在spring配置文件中引入context命名空间。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">

</beans>
```

第四步：在spring中配置使用jdbc.properties文件。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">

    <context:property-placeholder location="jdbc.properties"/>

    <bean id="dataSource" class="com.jkweilai.spring.beans.MyDataSource">
        <property name="driver" value="${driver}"/>
        <property name="url" value="${url}"/>
        <property name="username" value="${username}"/>
        <property name="password" value="${password}"/>
    </bean>
</beans>
```

测试程序：

```java
@Test
public void testProperties(){
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring-properties.xml");
    MyDataSource dataSource = applicationContext.getBean("dataSource", MyDataSource.class);
    System.out.println(dataSource);
}
```

执行结果：

<img src="/images/spring/1763718790927-1686291f-2da2-4f2b-a8b5-e22901e90044.png" width="1103.2" height="30" title="" crop="0,0,1,1" id="u2ccfd593" class="ne-image" style="font-size: 16px">

**<font style="color:#DF2A3F;">这里有一个坑</font>**。配置文件中用户名是 `root`，但是取出来的是 `Adminitrator`。什么原因？

这个问题很常见，是因为系统环境变量的优先级导致的。Spring在解析 `${}` 占位符时，会按照以下顺序查找：

1. **系统环境变量**（如 `USERNAME`）
2. **JVM 系统属性**（`System.getProperties()`）
3. **属性文件**中定义的值

在Windows系统中，`USERNAME` 是一个默认的环境变量，存储了当前登录用户的用户名，所以Spring会优先使用这个值而不是你属性文件中的值。

**<font style="color:#DF2A3F;">解决这个问题很简单：</font>**

```properties
jdbc.driver=com.mysql.cj.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/spring
jdbc.username=root
jdbc.password=root123
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">

    <context:property-placeholder location="jdbc.properties"/>

    <bean id="dataSource" class="com.jkweilai.spring.beans.MyDataSource">
        <property name="driver" value="${jdbc.driver}"/>
        <property name="url" value="${jdbc.url}"/>
        <property name="username" value="${jdbc.username}"/>
        <property name="password" value="${jdbc.password}"/>
    </bean>
</beans>
```

# Bean的作用域

## singleton

默认情况下，Spring的IoC容器创建的Bean对象是单例的。来测试一下：

```java
public class SpringBean {
}

```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="sb" class="com.jkweilai.spring.beans.SpringBean" />

</beans>
```

```java
@Test
public void testScope(){
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring-scope.xml");

    SpringBean sb1 = applicationContext.getBean("sb", SpringBean.class);
    System.out.println(sb1);

    SpringBean sb2 = applicationContext.getBean("sb", SpringBean.class);
    System.out.println(sb2);
}
```

执行结果：

<img src="/images/spring/1763718986453-86ca83e3-8bbf-4c45-8699-e2ae7bbcc988.png" width="326.4" height="65" title="" crop="0,0,1,1" id="u50321966" class="ne-image" style="font-size: 16px">

通过测试得知：Spring的IoC容器中，默认情况下，Bean对象是单例的。

这个对象在什么时候创建的呢？可以为SpringBean提供一个无参数构造方法，测试一下，如下：

```java
public class SpringBean {
    public SpringBean() {
        System.out.println("SpringBean的无参数构造方法执行。");
    }
}

```

将测试程序中getBean()所在行代码注释掉：

```java
@Test
public void testScope(){
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring-scope.xml");
}
```

执行测试程序：

<img src="/images/spring/1763719064958-d248764f-59d7-4d41-b509-1d18b2e5191b.png" width="353.6" height="38" title="" crop="0,0,1,1" id="ua75f9417" class="ne-image" style="font-size: 16px">

通过测试得知，默认情况下，Bean对象的创建是在初始化Spring上下文的时候就完成的。

## prototype

如果想让Spring的Bean对象以多例的形式存在，可以在bean标签中指定scope属性的值为：**<font style="color:#E8323C;">prototype</font>**，这样Spring会在每一次执行getBean()方法的时候创建Bean对象，调用几次则创建几次。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="sb" class="com.jkweilai.spring.beans.SpringBean" scope="prototype" />

</beans>
```

```java
@Test
public void testScope(){
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring-scope.xml");

    SpringBean sb1 = applicationContext.getBean("sb", SpringBean.class);
    System.out.println(sb1);

    SpringBean sb2 = applicationContext.getBean("sb", SpringBean.class);
    System.out.println(sb2);
}
```

执行结果：

<img src="/images/spring/1763719105263-11ce286c-1d5b-492c-8e36-fd21400b3b17.png" width="334.4" height="122" title="" crop="0,0,1,1" id="ude1e0ca9" class="ne-image" style="font-size: 16px">

我们可以把测试代码中的getBean()方法所在行代码注释掉：

```java
@Test
public void testScope(){
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring-scope.xml");
}
```

执行结果：

<img src="/images/spring/1763719118424-ee74b420-f5a9-40af-86b6-e095da0924e6.png" width="501.6" height="61" title="" crop="0,0,1,1" id="u2e1768b4" class="ne-image" style="font-size: 16px">

可以看到这一次在初始化Spring上下文的时候，并没有创建Bean对象。

那你可能会问：scope如果没有配置，它的默认值是什么呢？默认值是singleton，单例的。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="sb" class="com.jkweilai.spring.beans.SpringBean" />

</beans>
```

```java
@Test
public void testScope(){
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring-scope.xml");

    SpringBean sb1 = applicationContext.getBean("sb", SpringBean.class);
    System.out.println(sb1);

    SpringBean sb2 = applicationContext.getBean("sb", SpringBean.class);
    System.out.println(sb2);
}
```

执行结果：

<img src="/images/spring/1763719172933-83153245-ab36-4656-8fd4-4168e85edbd0.png" width="300" height="89" title="" crop="0,0,1,1" id="u6a7c5b32" class="ne-image" style="font-size: 16px">

通过测试得知，没有指定scope属性时，默认是singleton单例的。

## 其它scope

**scope属性的值不止两个，它一共包括8个选项：**

- singleton：默认的，单例。
- prototype：原型。每调用一次getBean()方法则获取一个新的Bean对象。或每次注入的时候都是新对象。
- request：一个请求对应一个Bean。**<font style="color:#E8323C;">仅限于在WEB应用中使用</font>**。
- session：一个会话对应一个Bean。**<font style="color:#E8323C;">仅限于在WEB应用中使用</font>**。
- application：一个应用对应一个Bean。**<font style="color:#E8323C;">仅限于在WEB应用中使用。</font>**
- websocket：一个websocket生命周期对应一个Bean。**<font style="color:#E8323C;">仅限于在WEB应用中使用。</font>**
- 自定义scope：几乎用不上，感兴趣的可以研究。

# GoF之工厂模式

- 设计模式：一种可以被重复利用的解决方案。
- GoF（Gang of Four），中文名——四人组。
- 《Design Patterns: Elements of Reusable Object-Oriented Software》（即《设计模式》一书），1995年由 Erich Gamma、Richard Helm、Ralph Johnson 和 John Vlissides 合著。这几位作者常被称为"四人组（Gang of Four）"。
- 该书中描述了23种设计模式。我们平常所说的设计模式就是指这23种设计模式。
- 不过除了GoF23种设计模式之外，还有其它的设计模式，比如：JavaEE的设计模式（DAO模式、MVC模式等）。
- GoF23种设计模式可分为三大类：
  - **<font style="color:#E8323C;">创建型</font>**（5个）：解决对象创建问题。
    - 单例模式
    - 工厂方法模式
    - 抽象工厂模式
    - 建造者模式
    - 原型模式
  - **<font style="color:#E8323C;">结构型</font>**（7个）：一些类或对象组合在一起的经典结构。
    - 代理模式
    - 装饰模式
    - 适配器模式
    - 组合模式
    - 享元模式
    - 外观模式
    - 桥接模式
  - **<font style="color:#E8323C;">行为型</font>**（11个）：解决类或对象之间的交互问题。
    - 策略模式
    - 模板方法模式
    - 责任链模式
    - 观察者模式
    - 迭代子模式
    - 命令模式
    - 备忘录模式
    - 状态模式
    - 访问者模式
    - 中介者模式
    - 解释器模式
- 工厂模式是解决对象创建问题的，所以工厂模式属于创建型设计模式。这里为什么学习工厂模式呢？这是因为Spring框架底层使用了大量的工厂模式。

## 工厂模式的三种形态

工厂模式通常有三种形态：

- 第一种：**<font style="color:#E8323C;">简单工厂模式（Simple Factory）：不属于23种设计模式之一。简单工厂模式又叫做：静态 工厂方法模式。简单工厂模式是工厂方法模式的一种特殊实现。</font>**
- 第二种：工厂方法模式（Factory Method）：是23种设计模式之一。
- 第三种：抽象工厂模式（Abstract Factory）：是23种设计模式之一。

## 简单工厂模式

简单工厂模式的角色包括三个：

- 抽象产品 角色
- 具体产品 角色
- 工厂类 角色

简单工厂模式的代码如下：

抽象产品角色：

```java
public abstract class Weapon {
    /**
     * 所有的武器都有攻击行为
     */
    public abstract void attack();
}
```

具体产品角色：

```java
// 坦克
public class Tank extends Weapon{
    @Override
    public void attack() {
        System.out.println("坦克开炮！");
    }
}

```

```java
// 战斗机
public class Fighter extends Weapon{
    @Override
    public void attack() {
        System.out.println("战斗机投下原子弹！");
    }
}

```

```java
// 匕首
public class Dagger extends Weapon{
    @Override
    public void attack() {
        System.out.println("砍他丫的！");
    }
}

```

工厂类角色：

```java
public class WeaponFactory {
    /**
     * 根据不同的武器类型生产武器
     * @param weaponType 武器类型
     * @return 武器对象
     */
    public static Weapon get(String weaponType){
        if (weaponType == null || weaponType.trim().length() == 0) {
            return null;
        }
        Weapon weapon = null;
        if ("TANK".equals(weaponType)) {
            weapon = new Tank();
        } else if ("FIGHTER".equals(weaponType)) {
            weapon = new Fighter();
        } else if ("DAGGER".equals(weaponType)) {
            weapon = new Dagger();
        } else {
            throw new RuntimeException("不支持该武器！");
        }
        return weapon;
    }
}

```

测试程序（客户端程序）：

```java
public class Client {
    public static void main(String[] args) {
        Weapon weapon1 = WeaponFactory.get("TANK");
        weapon1.attack();

        Weapon weapon2 = WeaponFactory.get("FIGHTER");
        weapon2.attack();

        Weapon weapon3 = WeaponFactory.get("DAGGER");
        weapon3.attack();
    }
}

```

执行结果：

<img src="/images/spring/1763719728644-ec17cbc9-9c3b-4b51-9e33-8b80cdf138fd.png" width="242.4" height="99" title="" crop="0,0,1,1" id="uc21001ab" class="ne-image" style="font-size: 16px">

**简单工厂模式的优点：**

- 客户端程序不需要关心对象的创建细节，需要哪个对象时，只需要向工厂索要即可，初步实现了责任的分离。客户端只负责“消费”，工厂负责“生产”。生产和消费分离。

**简单工厂模式的缺点：**

- 缺点1：工厂类集中了所有产品的创造逻辑，形成一个无所不知的全能类，有人把它叫做上帝类。显然工厂类非常关键，不能出问题，一旦出问题，整个系统瘫痪。
- 缺点2：不符合OCP开闭原则，在进行系统扩展时，需要修改工厂类。

**<font style="color:#E8323C;">Spring中的BeanFactory 是简单工厂模式吗？</font>**

**<font style="color:#E8323C;">从最表层的“根据名字拿对象”的功能来看，BeanFactory 的 getBean(String name) 方法扮演了类似简单工厂的角色。但从本质和实现上来看，BeanFactory 是一个功能极其丰富的 IoC容器，它包含并远远超越了简单工厂的功能。</font>**

## 工厂方法模式

工厂方法模式既保留了简单工厂模式的优点，同时又解决了简单工厂模式的缺点。

工厂方法模式的角色包括：

- **<font style="color:#E8323C;">抽象工厂角色</font>**
- **<font style="color:#E8323C;">具体工厂角色</font>**
- 抽象产品角色
- 具体产品角色

代码如下：

```java
public abstract class Weapon {
    /**
     * 所有武器都有攻击行为
     */
    public abstract void attack();
}

```

```java
public class Gun extends Weapon{
    @Override
    public void attack() {
        System.out.println("开枪射击！");
    }
}

```

```java
public class Fighter extends Weapon{
    @Override
    public void attack() {
        System.out.println("战斗机发射核弹！");
    }
}

```

```java
public interface WeaponFactory {
    Weapon get();
}

```

```java
public class GunFactory implements WeaponFactory{
    @Override
    public Weapon get() {
        return new Gun();
    }
}

```

```java
public class FighterFactory implements WeaponFactory{
    @Override
    public Weapon get() {
        return new Fighter();
    }
}

```

客户端程序：

```java
public class Client {
    public static void main(String[] args) {
        WeaponFactory factory = new GunFactory();
        Weapon weapon = factory.get();
        weapon.attack();

        WeaponFactory factory1 = new FighterFactory();
        Weapon weapon1 = factory1.get();
        weapon1.attack();
    }
}

```

执行客户端程序：

<img src="/images/spring/1763720058823-fc661399-c5fb-4d44-acb3-5f6102989891.png" width="189.6" height="69" title="" crop="0,0,1,1" id="u73e3b61c" class="ne-image" style="font-size: 16px">

如果想扩展一个新的产品，只要新增一个产品类，再新增一个该产品对应的工厂即可，例如新增：匕首

```java
public class Dagger extends Weapon{
    @Override
    public void attack() {
        System.out.println("砍丫的！");
    }
}

```

```java
public class DaggerFactory implements WeaponFactory{
    @Override
    public Weapon get() {
        return new Dagger();
    }
}

```

客户端程序：

```java
public class Client {
    public static void main(String[] args) {
        WeaponFactory factory = new GunFactory();
        Weapon weapon = factory.get();
        weapon.attack();

        WeaponFactory factory1 = new FighterFactory();
        Weapon weapon1 = factory1.get();
        weapon1.attack();

        WeaponFactory factory2 = new DaggerFactory();
        Weapon weapon2 = factory2.get();
        weapon2.attack();
    }
}

```

执行结果如下：

<img src="/images/spring/1763720094112-317c5f56-b197-4ea4-8138-e4a4af4e661a.png" width="222.4" height="95" title="" crop="0,0,1,1" id="ud2fae90d" class="ne-image" style="font-size: 16px">

我们可以看到在进行功能扩展的时候，不需要修改之前的源代码，显然工厂方法模式符合OCP原则。

**工厂方法模式的优点：**

- 扩展性高，如果想增加一个产品，只要扩展一个工厂类就可以。（符合 OCP 开闭原则）
- 屏蔽产品的具体实现，调用者只关心产品的接口。（客户端不需要关注对象的具体创建细节，客户端和对象创建细节进行了职责分离。）

**工厂方法模式的缺点：**

- 每次增加一个产品时，都需要增加一个工厂类，会导致类爆炸问题。

## 抽象工厂模式

**抽象工厂中也是包含4个角色：**

- 抽象工厂角色
- 具体工厂角色
- 抽象产品角色
- 具体产品角色

**工厂方法模式与抽象工厂模式的目的不同：**

- 工厂方法模式的目的：为**解决**“简单工厂模式违反开闭原则”的问题而存在，**工厂方法管“新增单一产品不修改老代码”。**
- 抽象工厂模式的目的：为**解决**“需要保证一系列配套产品一致，且便于整体切换”的问题而存在。**抽象工厂管“换就换一整套配套产品”。**

### 需求场景

我们要开发一个跨平台的 UI 组件库，支持两种风格：

- **Windows 风格**：蓝色按钮、方形复选框
- **Mac 风格**：灰色圆角按钮、圆形复选框

客户端只需要选择一次工厂，后续所有组件自动配套，**绝不会混搭**。

### 完整代码结构

```plain
com.jkweilai.product.button
    ├── Button (抽象产品)
    ├── WindowsButton (具体产品)
    └── MacButton (具体产品)

com.jkweilai.product.checkbox
    ├── Checkbox (抽象产品)
    ├── WindowsCheckbox (具体产品)
    └── MacCheckbox (具体产品)

com.jkweilai.factory
    ├── UIFactory (抽象工厂)
    ├── WindowsFactory (具体工厂)
    └── MacFactory (具体工厂)

com.jkweilai.client
    └── Client (客户端)
```

### 抽象产品

Button.java

```java
package com.jkweilai.product.button;

/**
 * 抽象产品：按钮
 */
public abstract class Button {
    public abstract void display();
}
```

Checkbox.java

```java
package com.jkweilai.product.checkbox;

/**
 * 抽象产品：复选框
 */
public abstract class Checkbox {
    public abstract void display();
}
```

### 具体产品（Windows 风格）

WindowsButton.java

```java
package com.jkweilai.product.button;

public class WindowsButton extends Button {
    @Override
    public void display() {
        System.out.println("【Windows 风格】蓝色方形按钮");
    }
}
```

WindowsCheckbox.java

```java
package com.jkweilai.product.checkbox;

public class WindowsCheckbox extends Checkbox {
    @Override
    public void display() {
        System.out.println("【Windows 风格】方形复选框 ☑");
    }
}
```

### 具体产品（Mac 风格）

MacButton.java

```java
package com.jkweilai.product.button;

public class MacButton extends Button {
    @Override
    public void display() {
        System.out.println("【Mac 风格】灰色圆角按钮");
    }
}
```

MacCheckbox.java

```java
package com.jkweilai.product.checkbox;

public class MacCheckbox extends Checkbox {
    @Override
    public void display() {
        System.out.println("【Mac 风格】圆形复选框 ◉");
    }
}
```

### 抽象工厂

UIFactory.java

```java
package com.jkweilai.factory;

import com.jkweilai.product.button.Button;
import com.jkweilai.product.checkbox.Checkbox;

/**
 * 抽象工厂：定义了一整套 UI 组件的创建方法
 */
public interface UIFactory {
    Button createButton();
    Checkbox createCheckbox();
}
```

### 具体工厂

WindowsFactory.java

```java
package com.jkweilai.factory;

import com.jkweilai.product.button.Button;
import com.jkweilai.product.button.WindowsButton;
import com.jkweilai.product.checkbox.Checkbox;
import com.jkweilai.product.checkbox.WindowsCheckbox;

/**
 * 具体工厂：生产 Windows 风格的全套组件
 */
public class WindowsFactory implements UIFactory {
    @Override
    public Button createButton() {
        return new WindowsButton();
    }

    @Override
    public Checkbox createCheckbox() {
        return new WindowsCheckbox();
    }
}
```

MacFactory.java

```java
package com.jkweilai.factory;

import com.jkweilai.product.button.Button;
import com.jkweilai.product.button.MacButton;
import com.jkweilai.product.checkbox.Checkbox;
import com.jkweilai.product.checkbox.MacCheckbox;

/**
 * 具体工厂：生产 Mac 风格的全套组件
 */
public class MacFactory implements UIFactory {
    @Override
    public Button createButton() {
        return new MacButton();
    }

    @Override
    public Checkbox createCheckbox() {
        return new MacCheckbox();
    }
}
```

### 客户端

Client.java

```java
package com.jkweilai.client;

import com.jkweilai.factory.UIFactory;
import com.jkweilai.factory.WindowsFactory;
import com.jkweilai.factory.MacFactory;
import com.jkweilai.product.button.Button;
import com.jkweilai.product.checkbox.Checkbox;

public class Client {
    public static void main(String[] args) {
        // 场景1：使用 Windows 风格
        System.out.println("=== 当前系统：Windows 风格 ===");
        UIFactory windowsFactory = new WindowsFactory(); // 这个位置可以继续使用简单工厂进行优化，隐藏对象的创建细节。
        Button winBtn = windowsFactory.createButton();
        Checkbox winCb = windowsFactory.createCheckbox();
        winBtn.display();
        winCb.display();

        System.out.println();

        // 场景2：使用 Mac 风格
        System.out.println("=== 当前系统：Mac 风格 ===");
        UIFactory macFactory = new MacFactory();
        Button macBtn = macFactory.createButton();
        Checkbox macCb = macFactory.createCheckbox();
        macBtn.display();
        macCb.display();

        // 关键验证：Windows 工厂绝不会生产 Mac 风格的组件
        // 下面的代码编译器就不让通过，因为类型不匹配
        // WindowsFactory f = new WindowsFactory();
        // MacButton btn = f.createButton();  //编译错误！
    }
}
```

### 抽象工厂的核心要点总结

| **特性**                 | \*\*\*\* | **说明**                                                                                                |
| ------------------------ | -------- | ------------------------------------------------------------------------------------------------------- |
| **产品族一致性**         | ✅       | `WindowsFactory` 保证所有组件都是 Windows 风格，绝不混搭                                                |
| **换工厂即换整套风格**   | ✅       | 只需把 `new WindowsFactory()` 换成 `new MacFactory()`，整套 UI 风格全变                                 |
| **开闭原则（横向扩展）** | ✅       | 新增一个 `LinuxFactory`，无需修改 `WindowsFactory` 和 `MacFactory`                                      |
| **开闭原则（纵向扩展）** | ❌       | 如果要新增一个 `Scrollbar` 产品，所有工厂类都要改 → 这是抽象工厂的固有缺点                              |
| **类爆炸**               | ⚠️       | 2 个产品等级 × 2 个产品族 = 4 个产品类 + 2 个工厂类，尚可接受；若产品等级和产品族都增多，类数量急剧膨胀 |

# Bean的实例化方式

Spring为Bean提供了多种实例化方式，通常包括4种方式。（也就是说在Spring中为Bean对象的创建准备了多种方案，目的是：更加灵活）

- 第一种：通过构造方法实例化
- 第二种：通过简单工厂模式实例化
- 第三种：通过factory-bean实例化
- 第四种：通过FactoryBean接口实例化

## 通过构造方法实例化

我们之前一直使用的就是这种方式。默认情况下，会调用Bean的无参数构造方法。

```java
package com.jkweilai.spring.bean;

public class User {
    public User() {
        System.out.println("User类的无参数构造方法执行。");
    }
}

```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="userBean" class="com.jkweilai.spring.bean.User"/>

</beans>
```

```java
package com.jkweilai.spring.test;

import com.jkweilai.spring.bean.User;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class SpringInstantiationTest {

    @Test
    public void testConstructor(){
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring.xml");
        User user = applicationContext.getBean("userBean", User.class);
        System.out.println(user);
    }
}

```

## 通过 factory-method 属性实例化

底层使用了简单工厂模式。

第一步：定义一个Bean

```java
package com.jkweilai.spring.bean;

public class Vip {
}

```

第二步：编写简单工厂模式当中的工厂类

```java
package com.jkweilai.spring.bean;

public class VipFactory {
    public static Vip get(){
        return new Vip();
    }
}

```

第三步：在Spring配置文件中指定创建该Bean的方法（使用factory-method属性指定）

```xml
<bean id="vipBean" class="com.jkweilai.spring.bean.VipFactory" factory-method="get"/>
```

第四步：编写测试程序

```java
@Test
public void testSimpleFactory(){
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring.xml");
    Vip vip = applicationContext.getBean("vipBean", Vip.class);
    System.out.println(vip);
}
```

执行结果：

<img src="/images/spring/1763720944420-97b46ad8-ca40-4071-90b3-7297a2664440.png" width="212.8" height="30" title="" crop="0,0,1,1" id="uc2fcca08" class="ne-image" style="font-size: 16px">

## 通过factory-bean实例化

这种方式本质上是：通过工厂方法模式进行实例化。

第一步：定义一个Bean

```java
package com.jkweilai.spring.bean;

public class Order {
}

```

第二步：定义具体工厂类，工厂类中定义实例方法

```java
package com.jkweilai.spring.bean;

public class OrderFactory {
    public Order get(){
        return new Order();
    }
}

```

第三步：在Spring配置文件中指定factory-bean以及factory-method

```xml
<bean id="orderFactory" class="com.jkweilai.spring.bean.OrderFactory"/>
<bean id="orderBean" factory-bean="orderFactory" factory-method="get"/>
```

第四步：编写测试程序

```java
@Test
public void testSelfFactoryBean(){
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring.xml");
    Order orderBean = applicationContext.getBean("orderBean", Order.class);
    System.out.println(orderBean);
}
```

执行结果：

<img src="/images/spring/1763722184748-17b7c7b6-3b55-455c-beaa-27e7fef64918.png" width="225.6" height="44" title="" crop="0,0,1,1" id="uc819e5c3" class="ne-image" style="font-size: 16px">

## 通过FactoryBean接口实例化

以上的第三种方式中，factory-bean是我们自定义的，factory-method也是我们自己定义的。

在Spring中，当你编写的类直接实现FactoryBean接口之后，factory-bean不需要指定了，factory-method也不需要指定了。

factory-bean会自动指向实现FactoryBean接口的类，factory-method会自动指向getObject()方法。

第一步：定义一个Bean

```java
public class Person {
}

```

第二步：编写一个类实现FactoryBean接口

```java
public class PersonFactoryBean implements FactoryBean<Person> {

    @Override
    public Person getObject() throws Exception {
        return new Person();
    }

    @Override
    public Class<?> getObjectType() {
        return null;
    }

    @Override
    public boolean isSingleton() {
        // true表示单例
        // false表示原型
        return true;
    }
}

```

第三步：在Spring配置文件中配置FactoryBean

```xml
<bean id="personBean" class="com.jkweilai.spring.bean.PersonFactoryBean"/>
```

测试程序：

```java
@Test
public void testFactoryBean(){
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring.xml");
    Person personBean = applicationContext.getBean("personBean", Person.class);
    System.out.println(personBean);

    Person personBean2 = applicationContext.getBean("personBean", Person.class);
    System.out.println(personBean2);
}
```

执行结果：

<img src="/images/spring/1763775964052-66cd25d3-f271-4f66-b4e7-459bc827bd2e.png" width="264" height="67" title="" crop="0,0,1,1" id="u78550c48" class="ne-image" style="font-size: 16px">

**<font style="color:#E8323C;">FactoryBean在Spring中是一个接口。被称为“工厂Bean”。“工厂Bean”是一种特殊的Bean。所有的“工厂Bean”都是用来</font>\*\***<font style="color:#117CEE;">协助Spring</font>\***\*<font style="color:#E8323C;">框架来创建其他Bean对象的。</font>**

## BeanFactory和FactoryBean的区别

### BeanFactory

Spring IoC容器的顶级对象，BeanFactory被翻译为“Bean工厂”，在Spring的IoC容器中，“Bean工厂”负责创建Bean对象。

BeanFactory是工厂。

### FactoryBean

FactoryBean：它是一个Bean，是一个能够**<font style="color:#E8323C;">辅助Spring</font>**实例化其它Bean对象的一个Bean。

在Spring中，Bean可以分为两类：

- 第一类：普通Bean
- 第二类：工厂Bean（记住：工厂Bean也是一种Bean，只不过这种Bean比较特殊，它可以辅助Spring实例化其它Bean对象。）

## 注入自定义Date

我们前面说过，java.util.Date在Spring中被当做简单类型，简单类型在注入的时候可以直接使用value属性或value标签来完成，对于Date类型来说，采用value属性或value标签赋值的时候，对日期字符串的格式要求非常严格，必须是这种格式的：Mon Oct 10 14:30:26 CST 2025。其他格式是不会被识别的。如以下代码：

```java
public class Student {
    private Date birth;

    public void setBirth(Date birth) {
        this.birth = birth;
    }

    @Override
    public String toString() {
        return "Student{" +
                "birth=" + birth +
                '}';
    }
}

```

```xml
<bean id="studentBean" class="com.jkweilai.spring.bean.Student">
  <property name="birth" value="Mon Oct 10 14:30:26 CST 2002"/>
</bean>
```

```java
@Test
public void testDate(){
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring.xml");
    Student studentBean = applicationContext.getBean("studentBean", Student.class);
    System.out.println(studentBean);
}
```

执行结果：

<img src="/images/spring/1763779641428-c59bda56-3e06-4b9e-9942-f5952880c7e9.png" width="497.6" height="34" title="" crop="0,0,1,1" id="u8bf72056" class="ne-image" style="font-size: 16px">

如果把日期格式修改一下：

```xml
<bean id="studentBean" class="com.jkweilai.spring.bean.Student">
  <property name="birth" value="2002-10-10"/>
</bean>
```

执行结果：

<img src="/images/spring/1665383871708-89cd2ac9-6d31-40fc-a4a8-27d27cd35ad2.png" width="1304" height="203" title="" crop="0,0,1,1" id="u2c539d66" class="ne-image" style="font-size: 16px">

这种情况下，我们就可以使用FactoryBean来完成这个骚操作。

编写DateFactoryBean实现FactoryBean接口：

```java
public class DateFactoryBean implements FactoryBean<Date> {

    // 定义属性接收日期字符串
    private String date;

    // 通过构造方法给日期字符串属性赋值
    public DateFactoryBean(String date) {
        this.date = date;
    }

    @Override
    public Date getObject() throws Exception {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        return sdf.parse(this.date);
    }

    @Override
    public Class<?> getObjectType() {
        return null;
    }
}

```

编写spring配置文件：

```xml
<bean id="dateBean" class="com.jkweilai.spring.bean.DateFactoryBean">
  <constructor-arg name="date" value="1999-10-11"/>
</bean>

<bean id="studentBean" class="com.jkweilai.spring.bean.Student">
  <property name="birth" ref="dateBean"/>
</bean>
```

执行测试程序：

<img src="/images/spring/1763779706597-06ce0ec2-17e5-4c8e-9e04-da407da067cc.png" width="504" height="30" title="" crop="0,0,1,1" id="uf4bd6559" class="ne-image" style="font-size: 16px">

# Bean的生命周期

## 什么是Bean的生命周期

Spring其实就是一个管理Bean对象的工厂。它负责对象的创建，对象的销毁等。

所谓的生命周期就是：对象从创建开始到最终销毁的整个过程。

什么时候创建Bean对象？

创建Bean对象的前后会调用什么方法？

Bean对象什么时候销毁？

Bean对象的销毁前后调用什么方法？

## 为什么要知道Bean的生命周期

其实生命周期的本质是：在哪个时间节点上调用了哪个类的哪个方法。

我们需要充分的了解在这个生命线上，都有哪些特殊的时间节点。

只有我们知道了特殊的时间节点都在哪，到时我们才可以确定代码写到哪。

我们可能需要在某个特殊的时间点上执行一段特定的代码，这段代码就可以放到这个节点上。当生命线走到这里的时候，自然会被调用。

任何一个生命周期都是基于回调机制的。（提前写好回调函数，到了这个时刻就会调用对应的回调函数。）

## Bean的生命周期之5步

Bean生命周期的管理，可以参考Spring的源码：**<font style="color:#F5222D;">AbstractAutowireCapableBeanFactory类的doCreateBean()方法</font>\*\***。\*\*

Bean生命周期可以粗略的划分为五大步：

- 第一步：实例化Bean
- 第二步：Bean属性赋值
- 第三步：初始化Bean
- 第四步：使用Bean
- 第五步：销毁Bean

<img src="/images/spring/1665388735200-444405f6-283d-4b3a-8cdf-8c3e01743618.png" width="851" height="142" title="" crop="0,0,1,1" id="u7c6b9a1a" class="ne-image" style="font-size: 16px">

编写测试程序：

定义一个Bean

```java
public class User {
    private String name;

    public User() {
        System.out.println("1.实例化Bean");
    }

    public void setName(String name) {
        this.name = name;
        System.out.println("2.Bean属性赋值");
    }

    public void initBean(){
        System.out.println("3.初始化Bean");
    }

    public void destroyBean(){
        System.out.println("5.销毁Bean");
    }

}

```

```xml
<!--
  init-method属性指定初始化方法。
  destroy-method属性指定销毁方法。
-->
<bean id="userBean" class="com.jkweilai.spring.bean.User" init-method="initBean" destroy-method="destroyBean">
    <property name="name" value="zhangsan"/>
</bean>
```

```java
public class BeanLifecycleTest {
    @Test
    public void testLifecycle(){
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring.xml");
        User userBean = applicationContext.getBean("userBean", User.class);
        System.out.println("4.使用Bean");
        // 只有正常关闭spring容器才会执行销毁方法
        ClassPathXmlApplicationContext context = (ClassPathXmlApplicationContext) applicationContext;
        context.close();
    }
}

```

执行结果：

<img src="/images/spring/1763779901212-2d884ee4-3595-431e-9069-52bd00213814.png" width="190.4" height="158" title="" crop="0,0,1,1" id="ua795e318" class="ne-image" style="font-size: 16px">

需要注意的：

- 第一：只有正常关闭spring容器，bean的销毁方法才会被调用。
- 第二：ClassPathXmlApplicationContext类才有close()方法。
- 第三：配置文件中的init-method指定初始化方法。destroy-method指定销毁方法。

## Bean生命周期之7步

在以上的5步中，第3步是初始化Bean，如果你还想在初始化前和初始化后添加代码，可以加入“Bean后处理器”。

编写一个类实现BeanPostProcessor类，并且重写before和after方法：

```java
public class LogBeanPostProcessor implements BeanPostProcessor {
    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
        System.out.println("Bean后处理器的before方法执行，即将开始初始化");
        return bean;
    }

    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        System.out.println("Bean后处理器的after方法执行，已完成初始化");
        return bean;
    }
}

```

在spring.xml文件中配置“Bean后处理器”：

```xml
<!--配置Bean后处理器。这个后处理器将作用于当前配置文件中所有的bean。-->
<bean class="com.jkweilai.spring.bean.LogBeanPostProcessor"/>
```

**<font style="color:#F5222D;">一定要注意：在spring.xml文件中配置的Bean后处理器将作用于当前配置文件中所有的Bean。</font>**

执行测试程序：

<img src="/images/spring/1763780009201-436ef7c3-8bc0-44ad-a368-fcfe4de77b54.png" width="452.8" height="214" title="" crop="0,0,1,1" id="ued886435" class="ne-image" style="font-size: 16px">

如果加上Bean后处理器的话，Bean的生命周期就是7步了：

<img src="/images/spring/1665393936765-0ea5dcdd-859a-4ac5-9407-f06022c498b9.png" width="1015" height="170" title="" crop="0,0,1,1" id="u040e6fe3" class="ne-image" style="font-size: 16px">

## Bean生命周期之10步

如果根据源码跟踪，可以划分更细粒度的步骤，10步：

<img src="/images/spring/1665394697870-15de433a-8d50-4b31-9b75-b2ca7090c1c6.png" width="432" height="884" title="" crop="0,0,1,1" id="ud2630984" class="ne-image" style="font-size: 16px">

上图中检查Bean是否实现了Aware的相关接口是什么意思？

Aware相关的接口包括：BeanNameAware、BeanClassLoaderAware、BeanFactoryAware

- 当Bean实现了BeanNameAware，Spring会将Bean的名字传递给Bean。
- 当Bean实现了BeanClassLoaderAware，Spring会将加载该Bean的类加载器传递给Bean。
- 当Bean实现了BeanFactoryAware，Spring会将Bean工厂对象传递给Bean。

测试以上10步，可以让User类实现5个接口，并实现所有方法：

- BeanNameAware
- BeanClassLoaderAware
- BeanFactoryAware
- InitializingBean
- DisposableBean

代码如下：

```java
public class User implements BeanNameAware, BeanClassLoaderAware, BeanFactoryAware, InitializingBean, DisposableBean {
    private String name;

    public User() {
        System.out.println("1.实例化Bean");
    }

    public void setName(String name) {
        this.name = name;
        System.out.println("2.Bean属性赋值");
    }

    public void initBean(){
        System.out.println("6.初始化Bean");
    }

    public void destroyBean(){
        System.out.println("10.销毁Bean");
    }

    @Override
    public void setBeanClassLoader(ClassLoader classLoader) {
        System.out.println("3.类加载器：" + classLoader);
    }

    @Override
    public void setBeanFactory(BeanFactory beanFactory) throws BeansException {
        System.out.println("3.Bean工厂：" + beanFactory);
    }

    @Override
    public void setBeanName(String name) {
        System.out.println("3.bean名字：" + name);
    }

    @Override
    public void destroy() throws Exception {
        System.out.println("9.DisposableBean destroy");
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        System.out.println("5.afterPropertiesSet执行");
    }
}

```

```java
public class LogBeanPostProcessor implements BeanPostProcessor {
    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
        System.out.println("4.Bean后处理器的before方法执行，即将开始初始化");
        return bean;
    }

    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        System.out.println("7.Bean后处理器的after方法执行，已完成初始化");
        return bean;
    }
}

```

执行结果：

<img src="/images/spring/1763780194137-98ac319c-369a-4fa1-a83f-4789887ccb22.png" width="984.8" height="370" title="" crop="0,0,1,1" id="u80b569c5" class="ne-image" style="font-size: 16px">

**<font style="color:#F5222D;">通过测试可以看出来：</font>**

- **<font style="color:#F5222D;">InitializingBean的方法早于init-method的执行。</font>**
- **<font style="color:#F5222D;">DisposableBean的方法早于destroy-method的执行。</font>**

对于SpringBean的生命周期，掌握之前的7步即可。够用。

**相关源码：**

```java
protected Object doCreateBean(String beanName, RootBeanDefinition mbd, @Nullable Object[] args)
        throws BeanCreationException {

    // 第1步：Bean实例化 - 创建Bean的原始对象
    BeanWrapper instanceWrapper = null;
    if (mbd.isSingleton()) {
        instanceWrapper = this.factoryBeanInstanceCache.remove(beanName);
    }
    if (instanceWrapper == null) {
        // 真正的实例化逻辑：通过构造函数、工厂方法等创建Bean实例
        instanceWrapper = createBeanInstance(beanName, mbd, args);
    }
    Object bean = instanceWrapper.getWrappedInstance();
    Class<?> beanType = instanceWrapper.getWrappedClass();
    if (beanType != NullBean.class) {
        mbd.resolvedTargetType = beanType;
    }

    synchronized (mbd.postProcessingLock) {
        if (!mbd.postProcessed) {
            try {
                applyMergedBeanDefinitionPostProcessors(mbd, beanType, beanName);
            }
            catch (Throwable ex) {
                throw new BeanCreationException(mbd.getResourceDescription(), beanName,
                        "Post-processing of merged bean definition failed", ex);
            }
            mbd.markAsPostProcessed();
        }
    }

    // 提前暴露单例Bean的引用，用于解决循环依赖问题
    boolean earlySingletonExposure = (mbd.isSingleton() && this.allowCircularReferences &&
            isSingletonCurrentlyInCreation(beanName));
    if (earlySingletonExposure) {
        if (logger.isTraceEnabled()) {
            logger.trace("Eagerly caching bean '" + beanName +
                    "' to allow for resolving potential circular references");
        }
        // 将Bean的早期引用（可能被代理包装）添加到单例工厂中（三级缓存）
        addSingletonFactory(beanName, () -> getEarlyBeanReference(beanName, mbd, bean));
    }

    // 这是Bean生命周期的核心部分
    Object exposedObject = bean; // 最终暴露给外部的Bean（可能是原始Bean也可能是代理后的Bean）
    try {
        // 第2步：属性赋值 - 依赖注入发生在这里
        // 包括@Autowired、@Value、@Resource等注解的注入
        populateBean(beanName, mbd, instanceWrapper);

        // 第3步：初始化Bean - 包含Aware接口、BeanPostProcessor、初始化方法等
        exposedObject = initializeBean(beanName, exposedObject, mbd);
    }
    catch (Throwable ex) {
        if (ex instanceof BeanCreationException bce && beanName.equals(bce.getBeanName())) {
            throw bce;
        }
        else {
            throw new BeanCreationException(mbd.getResourceDescription(), beanName, ex.getMessage(), ex);
        }
    }

    // 处理循环依赖的最终检查
    if (earlySingletonExposure) {
        Object earlySingletonReference = getSingleton(beanName, false);
        if (earlySingletonReference != null) {
            if (exposedObject == bean) {
                exposedObject = earlySingletonReference;
            }
            else if (!this.allowRawInjectionDespiteWrapping && hasDependentBean(beanName)) {
                String[] dependentBeans = getDependentBeans(beanName);
                Set<String> actualDependentBeans = CollectionUtils.newLinkedHashSet(dependentBeans.length);
                for (String dependentBean : dependentBeans) {
                    if (!removeSingletonIfCreatedForTypeCheckOnly(dependentBean)) {
                        actualDependentBeans.add(dependentBean);
                    }
                }
                if (!actualDependentBeans.isEmpty()) {
                    throw new BeanCurrentlyInCreationException(beanName,
                            "Bean with name '" + beanName + "' has been injected into other beans [" +
                            StringUtils.collectionToCommaDelimitedString(actualDependentBeans) +
                            "] in its raw version as part of a circular reference, but has eventually been " +
                            "wrapped. This means that said other beans do not use the final version of the " +
                            "bean. This is often the result of over-eager type matching - consider using " +
                            "'getBeanNamesForType' with the 'allowEagerInit' flag turned off, for example.");
                }
            }
        }
    }

    // 第5步：注册可销毁的Bean - 为Bean的销毁阶段做准备
    try {
        // 注册实现了DisposableBean接口或配置了destroy-method的Bean
        registerDisposableBeanIfNecessary(beanName, bean, mbd);
    }
    catch (BeanDefinitionValidationException ex) {
        throw new BeanCreationException(
                mbd.getResourceDescription(), beanName, "Invalid destruction signature", ex);
    }

    // 返回最终处理完成的Bean（可能是原始对象，也可能是代理对象）
    return exposedObject;
}
```

## Bean的作用域不同，管理方式不同

Spring 根据Bean的作用域来选择管理方式。

- 对于singleton作用域的Bean，Spring 能够精确地知道该Bean何时被创建，何时初始化完成，以及何时被销毁；
- 而对于 prototype 作用域的 Bean，Spring 只负责创建，当容器创建了 Bean 的实例后，Bean 的实例就交给客户端代码管理，Spring 容器将不再跟踪其生命周期。

我们把之前User类的spring.xml文件中的配置scope设置为prototype：

```xml
<!--
  init-method属性指定初始化方法。
  destroy-method属性指定销毁方法。
-->
<bean id="userBean" class="com.jkweilai.spring.bean.User" init-method="initBean" destroy-method="destroyBean" scope="prototype">
    <property name="name" value="zhangsan"/>
</bean>

<!--配置Bean后处理器。这个后处理器将作用于当前配置文件中所有的bean。-->
<bean class="com.jkweilai.spring.bean.LogBeanPostProcessor"/>
```

执行测试程序：

<img src="/images/spring/1763780370388-000f1c5f-eb90-4d6c-be76-ac5e39231729.png" width="968.8" height="364" title="" crop="0,0,1,1" id="u89517cdd" class="ne-image" style="font-size: 16px">

通过测试一目了然。只执行了前8步，第9和10都没有执行。

## 自己new的对象如何让Spring管理

有些时候可能会遇到这样的需求，某个java对象是我们自己new的，然后我们希望这个对象被Spring容器管理，怎么实现？

```java
public class User {
}

```

```java
public class RegisterBeanTest {

    @Test
    public void testBeanRegister(){
        // 自己new的对象
        User user = new User();
        System.out.println(user);

        // 创建 默认可列表BeanFactory 对象
        DefaultListableBeanFactory factory = new DefaultListableBeanFactory();
        // 注册Bean
        factory.registerSingleton("userBean", user);
        // 从spring容器中获取bean
        User userBean = factory.getBean("userBean", User.class);
        System.out.println(userBean);
    }
}

```

执行结果：

<img src="/images/spring/1763780413264-6a23ba14-d5ea-493f-a3da-1c458c62ecbb.png" width="348" height="62" title="" crop="0,0,1,1" id="u7d7e4c82" class="ne-image" style="font-size: 16px">

# Spring IoC注解式开发

## 声明Bean的注解

负责声明Bean的注解，常见的包括四个：

- @Component
- @Controller
- @Service
- @Repository

源码如下：

```java
@Target(value = {ElementType.TYPE})
@Retention(value = RetentionPolicy.RUNTIME)
public @interface Component {
    String value();
}

```

```java
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Component
public @interface Controller {
    @AliasFor(
        annotation = Component.class
    )
    String value() default "";
}

```

```java
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Component
public @interface Service {
    @AliasFor(
        annotation = Component.class
    )
    String value() default "";
}

```

```java
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Component
public @interface Repository {
    @AliasFor(
        annotation = Component.class
    )
    String value() default "";
}

```

通过源码可以看到，@Controller、@Service、@Repository这三个注解都是@Component注解的别名。

也就是说：这四个注解的功能都一样。用哪个都可以。

只是为了增强程序的可读性，建议：

- 控制器类上使用：Controller
- service类上使用：Service
- dao类上使用：Repository

他们都是只有一个value属性。value属性用来指定bean的id，也就是bean的名字。

## Spring注解的使用

如何使用以上的注解呢？

- 第一步：加入aop的依赖
- 第二步：在配置文件中添加context命名空间
- 第三步：在配置文件中指定扫描的包
- 第四步：在Bean类上使用注解

**第一步：加入aop的依赖**

当加入spring-context依赖之后，会关联加入aop的依赖。所以这一步不用做。

**第二步：在配置文件中添加context命名空间**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">

</beans>
```

**第三步：在配置文件中指定要扫描的包**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">
    <context:component-scan base-package="com.jkweilai.spring.bean"/>
</beans>
```

**第四步：在Bean类上使用注解**

```java
package com.jkweilai.spring.bean;

import org.springframework.stereotype.Component;

@Component(value = "userBean")
public class User {
}

```

编写测试程序：

```java
public class AnnotationTest {
    @Test
    public void testBean(){
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring.xml");
        User userBean = applicationContext.getBean("userBean", User.class);
        System.out.println(userBean);
    }
}

```

执行结果：

<img src="/images/spring/1763804203105-01de403b-0c38-49b2-b97a-539b080ff2ce.png" width="270.4" height="50" title="" crop="0,0,1,1" id="u1d79104b" class="ne-image" style="font-size: 16px">

**<font style="color:#E8323C;">如果注解的属性名是value，那么value是可以省略的。</font>**

```java
@Component("vipBean")
public class Vip {
}

```

```java
public class AnnotationTest {
    @Test
    public void testBean(){
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring.xml");
        Vip vipBean = applicationContext.getBean("vipBean", Vip.class);
        System.out.println(vipBean);
    }
}

```

执行结果：

<img src="/images/spring/1763804235969-ee73d66b-b32a-45e1-bd5a-14be1d80c299.png" width="236" height="38" title="" crop="0,0,1,1" id="u7984b231" class="ne-image" style="font-size: 16px">

**<font style="color:#E8323C;">如果把value属性彻底去掉，spring会为 Bean自动取名吗？会的。并且默认名字的规律是：Bean类名首字母小写。</font>**

```java
@Component
public class BankDao {
}
```

也就是说，这个BankDao的bean的名字为：bankDao

测试一下

```java
public class AnnotationTest {
    @Test
    public void testBean(){
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring.xml");
        BankDao bankDao = applicationContext.getBean("bankDao", BankDao.class);
        System.out.println(bankDao);
    }
}

```

执行结果：

<img src="/images/spring/1763804278652-8433e88b-d875-44b4-b035-8088bc3849a3.png" width="258.4" height="35" title="" crop="0,0,1,1" id="u7a4e5a3b" class="ne-image" style="font-size: 16px">

我们将Component注解换成其它三个注解，看看是否可以用：

```java
@Controller
public class BankDao {
}

```

执行结果：

<img src="/images/spring/1763804296741-fd026e58-9034-448f-8c7f-29d26316ba8d.png" width="196" height="37" title="" crop="0,0,1,1" id="u62c08638" class="ne-image" style="font-size: 16px">

剩下的两个注解大家可以测试一下。

**<font style="color:#E8323C;">如果是多个包怎么办？有两种解决方案：</font>**

- **<font style="color:#E8323C;">第一种：在配置文件中指定多个包，用逗号隔开。</font>**
- **<font style="color:#E8323C;">第二种：指定多个包的共同父包。</font>**

先来测试一下逗号（英文）的方式：

创建一个新的包：bean2，定义一个Bean类。

```java
@Service
public class Order {
}

```

配置文件修改：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">
    <context:component-scan base-package="com.jkweilai.spring.bean,com.jkweilai.spring.bean2"/>
</beans>
```

测试程序：

```java
public class AnnotationTest {
    @Test
    public void testBean(){
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring.xml");
        BankDao bankDao = applicationContext.getBean("bankDao", BankDao.class);
        System.out.println(bankDao);
        Order order = applicationContext.getBean("order", Order.class);
        System.out.println(order);
    }
}

```

执行结果：

<img src="/images/spring/1763804341646-5c51361e-bd26-4f3b-b86e-af784a6051f5.png" width="255.2" height="58" title="" crop="0,0,1,1" id="u2b8b043c" class="ne-image" style="font-size: 16px">

我们再来看看，指定共同的父包行不行：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">
    <context:component-scan base-package="com.jkweilai.spring"/>
</beans>
```

执行测试程序：

<img src="/images/spring/1763804354597-61388add-ec5c-4121-88b2-273cfafd7a12.png" width="243.2" height="64" title="" crop="0,0,1,1" id="u7f3de0b9" class="ne-image" style="font-size: 16px">

## 选择性实例化Bean

假设在某个包下有很多Bean，有的Bean上标注了Component，有的标注了Controller，有的标注了Service，有的标注了Repository，现在由于某种特殊业务的需要，只允许其中所有的Controller参与Bean管理，其他的都不实例化。这应该怎么办呢？

```java
@Component
public class A {
    public A() {
        System.out.println("A的无参数构造方法执行");
    }
}

@Controller
class B {
    public B() {
        System.out.println("B的无参数构造方法执行");
    }
}

@Service
class C {
    public C() {
        System.out.println("C的无参数构造方法执行");
    }
}

@Repository
class D {
    public D() {
        System.out.println("D的无参数构造方法执行");
    }
}

@Controller
class E {
    public E() {
        System.out.println("E的无参数构造方法执行");
    }
}

@Controller
class F {
    public F() {
        System.out.println("F的无参数构造方法执行");
    }
}

```

我只想实例化bean3包下的Controller。配置文件这样写：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">

    <context:component-scan base-package="com.jkweilai.spring.bean3" use-default-filters="false">
        <context:include-filter type="annotation" expression="org.springframework.stereotype.Controller"/>
    </context:component-scan>

</beans>
```

use-default-filters="true" 表示：使用spring默认的规则，只要有Component、Controller、Service、Repository中的任意一个注解标注，则进行实例化。

**<font style="color:#E8323C;">use-default-filters="false"</font>** 表示：不再spring默认实例化规则，即使有Component、Controller、Service、Repository这些注解标注，也不再实例化。

<context:include-filter type="annotation" expression="org.springframework.stereotype.Controller"/> 表示只有Controller进行实例化。

```java
@Test
public void testChoose(){
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring-choose.xml");
}
```

执行结果：

<img src="/images/spring/1763804449496-e4d1f7c3-436d-4f66-baff-b698715d56bf.png" width="300" height="92" title="" crop="0,0,1,1" id="u747b636b" class="ne-image" style="font-size: 16px">

也可以将use-default-filters设置为true（不写就是true），并且采用exclude-filter方式排除哪些注解标注的Bean不参与实例化：

```xml
<context:component-scan base-package="com.jkweilai.spring.bean3">
  <context:exclude-filter type="annotation" expression="org.springframework.stereotype.Repository"/>
  <context:exclude-filter type="annotation" expression="org.springframework.stereotype.Service"/>
  <context:exclude-filter type="annotation" expression="org.springframework.stereotype.Controller"/>
</context:component-scan>
```

执行测试程序：

<img src="/images/spring/1763804479326-d90316fa-ca13-4a1e-b50d-f69afe8bd63e.png" width="213.6" height="38" title="" crop="0,0,1,1" id="u388b7128" class="ne-image" style="font-size: 16px">

## 负责注入的注解

@Component @Controller @Service @Repository 这四个注解是用来声明Bean的，声明后这些Bean将被实例化。接下来我们看一下，如何给Bean的属性赋值。给Bean属性赋值需要用到这些注解：

- @Value
- @Autowired
- @Qualifier
- @Resource

### @Value

当属性的类型是简单类型时，可以使用@Value注解进行注入。

```java
@Component
public class User {
    @Value(value = "zhangsan")
    private String name;
    @Value("20")
    private int age;

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}

```

开启包扫描：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">
    <context:component-scan base-package="com.jkweilai.spring.bean4"/>
</beans>
```

```java
@Test
public void testValue(){
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring-injection.xml");
    Object user = applicationContext.getBean("user");
    System.out.println(user);
}
```

执行结果：

<img src="/images/spring/1763804917630-cc7f0031-f604-4fc9-aab3-80642ab35aa9.png" width="359.2" height="37" title="" crop="0,0,1,1" id="u7fb97fa9" class="ne-image" style="font-size: 16px">

通过以上代码可以发现，我们并没有给属性提供setter方法，但仍然可以完成属性赋值。

如果提供setter方法，并且在setter方法上添加@Value注解，可以完成注入吗？尝试一下：

```java
@Component
public class User {

    private String name;

    private int age;

    @Value("李四")
    public void setName(String name) {
        this.name = name;
    }

    @Value("30")
    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}

```

执行结果：

<img src="/images/spring/1763804943343-e101a0a8-fbce-4e33-be2f-05a95c64f7a6.png" width="310.4" height="36" title="" crop="0,0,1,1" id="u0952b4ba" class="ne-image" style="font-size: 16px">

通过测试可以得知，@Value注解可以直接使用在属性上，也可以使用在setter方法上。都是可以的。都可以完成属性的赋值。

为了简化代码，以后我们一般不提供setter方法，直接在属性上使用@Value注解完成属性赋值。

出于好奇，我们再来测试一下，是否能够通过构造方法完成注入：

```java
@Component
public class User {

    private String name;

    private int age;

    public User(@Value("隔壁老王") String name, @Value("33") int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}

```

执行结果：

<img src="/images/spring/1763804995156-d949008f-37c3-4c67-8e6c-691963c4dca5.png" width="318.4" height="42" title="" crop="0,0,1,1" id="u8f7cade5" class="ne-image" style="font-size: 16px">

通过测试得知：@Value注解可以出现在属性上、setter方法上、以及构造方法的形参上。可见Spring给我们提供了多样化的注入。太灵活了。

### @Autowired与@Qualifier

@Autowired注解可以用来注入**<font style="color:#F5222D;">非简单类型</font>**。被翻译为：自动连线的，或者自动装配。

单独使用@Autowired注解，**<font style="color:#F5222D;">默认根据类型装配</font>**。【默认是byType】

看一下它的源码：

```java
@Target({ElementType.CONSTRUCTOR, ElementType.METHOD, ElementType.PARAMETER, ElementType.FIELD, ElementType.ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Autowired {
	boolean required() default true;
}
```

源码中有两处需要注意：

- 第一处：该注解可以标注在哪里？
  - 构造方法上
  - 方法上
  - 形参上
  - 属性上
  - 注解上
- 第二处：该注解有一个required属性，默认值是true，表示在注入的时候要求被注入的Bean必须是存在的，如果不存在则报错。如果required属性设置为false，表示注入的Bean存在或者不存在都没关系，存在的话就注入，不存在的话，也不报错。

**<font style="color:#722ED1;">我们先在属性上使用@Autowired注解：</font>**

```java
public interface UserDao {
    void insert();
}

```

```java
@Repository //纳入bean管理
public class UserDaoForMySQL implements UserDao{
    @Override
    public void insert() {
        System.out.println("正在向mysql数据库插入User数据");
    }
}

```

```java
package com.jkweilai.spring.service;

import com.jkweilai.spring.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service // 纳入bean管理
public class UserService {

    @Autowired // 在属性上注入
    private UserDao userDao;

    // 没有提供构造方法和setter方法。

    public void save(){
        userDao.insert();
    }
}
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">
    <context:component-scan base-package="com.jkweilai.spring.dao,com.jkweilai.spring.service"/>
</beans>
```

```java
@Test
public void testAutowired(){
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring-injection.xml");
    UserService userService = applicationContext.getBean("userService", UserService.class);
    userService.save();
}
```

执行结果：

<img src="/images/spring/1763805114065-6361a6f4-61c9-474b-9ae9-ef0ed63f6865.png" width="339.2" height="30" title="" crop="0,0,1,1" id="ua00e7364" class="ne-image" style="font-size: 16px">

以上构造方法和setter方法都没有提供，经过测试，仍然可以注入成功。

**<font style="color:#722ED1;">接下来，再来测试一下@Autowired注解出现在setter方法上：</font>**

```java
@Service
public class UserService {

    private UserDao userDao;

    @Autowired
    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }

    public void save(){
        userDao.insert();
    }
}

```

执行结果：

<img src="/images/spring/1763805143555-f1d1626f-416f-4812-87b2-c347277c2399.png" width="326.4" height="32" title="" crop="0,0,1,1" id="uad27d6bf" class="ne-image" style="font-size: 16px">

**<font style="color:#722ED1;">我们再来看看能不能出现在构造方法上：</font>**

```java
@Service
public class UserService {

    private UserDao userDao;

    @Autowired
    public UserService(UserDao userDao) {
        this.userDao = userDao;
    }

    public void save(){
        userDao.insert();
    }
}

```

执行结果：

<img src="/images/spring/1763805158158-1864aedd-717b-4cbc-a174-1b8cf56b0907.png" width="308.8" height="41" title="" crop="0,0,1,1" id="uf3d5b950" class="ne-image" style="font-size: 16px">

**<font style="color:#722ED1;">再来看看，这个注解能不能只标注在构造方法的形参上：</font>**

```java
@Service
public class UserService {

    private UserDao userDao;

    public UserService(@Autowired UserDao userDao) {
        this.userDao = userDao;
    }

    public void save(){
        userDao.insert();
    }
}

```

执行结果：

<img src="/images/spring/1763805183577-c0a54642-14c1-45aa-98a7-2353dc7c0dc9.png" width="309.6" height="40" title="" crop="0,0,1,1" id="u4f1d9a0b" class="ne-image" style="font-size: 16px">

**<font style="color:#722ED1;">还有更劲爆的，当有参数的构造方法只有一个时，@Autowired注解可以省略。</font>**

```java
@Service
public class UserService {

    private UserDao userDao;

    public UserService(UserDao userDao) {
        this.userDao = userDao;
    }

    public void save(){
        userDao.insert();
    }
}

```

执行结果：

<img src="/images/spring/1763805219740-0dd5b10c-b852-4a76-9d3d-72913af93ffc.png" width="301.6" height="34" title="" crop="0,0,1,1" id="u317a483d" class="ne-image" style="font-size: 16px">

**<font style="color:#722ED1;">当然，如果有多个构造方法，@Autowired肯定是不能省略的。</font>**

```java
@Service
public class UserService {

    private UserDao userDao;

    public UserService(UserDao userDao) {
        this.userDao = userDao;
    }

    public UserService(){

    }

    public void save(){
        userDao.insert();
    }
}

```

执行结果：

<img src="/images/spring/1763805250282-dae28d2e-04b3-450c-bfb9-c3cd14458593.png" width="484" height="100" title="" crop="0,0,1,1" id="u4d959771" class="ne-image" style="font-size: 16px">

到此为止，我们已经清楚@Autowired注解可以出现在哪些位置了。

@Autowired注解默认是byType进行注入的，也就是说根据类型注入的，如果以上程序中，UserDao接口还有另外一个实现类，会出现问题吗？

```java
@Repository //纳入bean管理
public class UserDaoForOracle implements UserDao{
    @Override
    public void insert() {
        System.out.println("正在向Oracle数据库插入User数据");
    }
}

```

当你写完这个新的实现类之后，此时IDEA工具已经提示错误信息了：

<img src="/images/spring/1763805295378-ca25b98c-bab2-4d28-b7bb-190ea894aa40.png" width="918.4" height="319" title="" crop="0,0,1,1" id="u7f55ebac" class="ne-image" style="font-size: 16px">

错误信息中说：不能装配，UserDao这个Bean的数量大于1.

怎么解决这个问题呢？**<font style="color:#F5222D;">当然要byName，根据名称进行装配了。</font>**

@Autowired注解和@Qualifier注解联合起来才可以根据名称进行装配，在@Qualifier注解中指定Bean名称。

```java
@Repository // 这里没有给bean起名，默认名字是：userDaoForOracle
public class UserDaoForOracle implements UserDao{
    @Override
    public void insert() {
        System.out.println("正在向Oracle数据库插入User数据");
    }
}

```

```java
@Service
public class UserService {

    private UserDao userDao;

    @Autowired
    @Qualifier("userDaoForOracle") // 这个是bean的名字。
    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }

    public void save(){
        userDao.insert();
    }
}
```

执行结果：

<img src="/images/spring/1763805339010-607a6347-00c3-40f2-8e95-826b07e2641f.png" width="337.6" height="30" title="" crop="0,0,1,1" id="u678279c7" class="ne-image" style="font-size: 16px">

总结：

- @Autowired注解可以出现在：属性上、构造方法上、构造方法的参数上、setter方法上。
- 当带参数的构造方法只有一个，@Autowired注解可以省略。
- @Autowired注解默认根据类型注入。如果要根据名称注入的话，需要配合@Qualifier注解一起使用。

### @Resource

@Resource注解也可以完成**<font style="color:#DF2A3F;">非简单类型</font>**注入。那它和@Autowired注解有什么区别？

- @Resource注解是JDK扩展包中的，也就是说属于JDK的一部分。所以该注解是标准注解，更加具有通用性。(JSR-250标准中制定的注解类型。JSR是Java规范提案。)
- @Autowired注解是Spring框架自己的。
- **<font style="color:#E8323C;">@Resource注解默认根据名称装配byName，未指定name时，使用属性名作为name。通过name找不到的话会自动启动通过类型byType装配。</font>**
- **<font style="color:#E8323C;">@Autowired注解默认根据类型装配byType，如果想根据名称装配，需要配合@Qualifier注解一起用。</font>**
- @Resource注解用在属性上、setter方法上。
- @Autowired注解用在属性上、setter方法上、构造方法上、构造方法参数上。

@Resource注解属于JDK扩展包，所以不在JDK当中，需要额外引入以下依赖：【**<font style="color:#F5222D;">如果是JDK8的话不需要额外引入依赖。高于JDK11或低于JDK8需要引入以下依赖。</font>**】

```xml
<dependency>
  <groupId>jakarta.annotation</groupId>
  <artifactId>jakarta.annotation-api</artifactId>
  <version>2.1.1</version>
</dependency>
```

一定要注意：**<font style="color:#E8323C;">如果你用Spring6+，要知道它不再支持JavaEE，它支持的是JakartaEE9。</font>**

@Resource注解的源码如下：

<img src="/images/spring/1665565515435-2ad5614a-8572-4c6f-80c1-efa236dbe35f.png" width="1066" height="426" title="" crop="0,0,1,1" id="u6038d063" class="ne-image" style="font-size: 16px">

测试一下：

```java
@Repository("xyz")
public class UserDaoForOracle implements UserDao{
    @Override
    public void insert() {
        System.out.println("正在向Oracle数据库插入User数据");
    }
}
```

```java
@Service
public class UserService {

    @Resource(name = "xyz")
    private UserDao userDao;

    public void save(){
        userDao.insert();
    }
}
```

执行测试程序：

<img src="/images/spring/1763805703043-58f861ec-79ca-409e-bc92-b731277c6dd3.png" width="345.6" height="38" title="" crop="0,0,1,1" id="udf369b12" class="ne-image" style="font-size: 16px">

**我们把UserDaoForOracle的名字xyz修改为userDao，让这个Bean的名字和UserService类中的UserDao属性名一致：**

```java
@Repository("userDao")
public class UserDaoForOracle implements UserDao{
    @Override
    public void insert() {
        System.out.println("正在向Oracle数据库插入User数据");
    }
}

```

```java
@Service
public class UserService {

    @Resource
    private UserDao userDao;

    public void save(){
        userDao.insert();
    }
}

```

执行测试程序：

<img src="/images/spring/1763805728365-2326f7c4-ecf6-440e-a6f7-e6dd40eb914b.png" width="317.6" height="40" title="" crop="0,0,1,1" id="uec3c7657" class="ne-image" style="font-size: 16px">

通过测试得知，当@Resource注解使用时没有指定name的时候，还是根据name进行查找，这个name是属性名。

接下来把UserService类中的属性名修改一下：

```java
@Service
public class UserService {

    @Resource
    private UserDao userDao2;

    public void save(){
        userDao2.insert();
    }
}

```

执行结果：

<img src="/images/spring/1763805768831-da788b4d-49b5-4dd0-a444-e2b0bed95b37.png" width="620.8" height="60" title="" crop="0,0,1,1" id="u6b227d05" class="ne-image" style="font-size: 16px">

根据异常信息得知：显然当通过name找不到的时候，自然会启动byType进行注入。以上的错误是因为UserDao接口下有两个实现类导致的。所以根据类型注入就会报错。

我们再来看@Resource注解使用在setter方法上可以吗？

```java
@Service
public class UserService {

    private UserDao userDao;

    @Resource
    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }

    public void save(){
        userDao.insert();
    }
}

```

注意这个setter方法的方法名，setUserDao去掉set之后，将首字母变小写userDao，userDao就是name

执行结果：

<img src="/images/spring/1763805795181-a8d504f6-ae7f-4ed0-af53-d42600cc3a52.png" width="327.2" height="37" title="" crop="0,0,1,1" id="u645d4058" class="ne-image" style="font-size: 16px">

当然，也可以指定name：

```java
@Service
public class UserService {

    private UserDao userDao;

    @Resource(name = "userDaoForMySQL")
    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }

    public void save(){
        userDao.insert();
    }
}

```

执行结果：

<img src="/images/spring/1763805810622-0e5e2cb0-7aa9-45b6-bf56-f35c991e7ed4.png" width="335.2" height="37" title="" crop="0,0,1,1" id="u21908e5b" class="ne-image" style="font-size: 16px">

一句话总结@Resource注解：默认byName注入，没有指定name时把属性名当做name，根据name找不到时，才会byType注入。byType注入时，某种类型的Bean只能有一个。

## 全注解式开发

所谓的全注解开发就是不再使用spring配置文件了。写一个配置类来代替配置文件。

```java
package com.jkweilai.spring;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan({"com.jkweilai.spring.dao", "com.jkweilai.spring.service"})
public class SpringConfiguration {

    // 将自己new的对象纳入IoC容器的管理
    @Bean("myUserService")
    public UserService getUserService() {
        // 虽然是自己 new 的对象。如果对象中属性需要注入，Spring IoC容器会自动注入。不需要担心null。
        return new UserService();
    }
}

```

编写测试程序：不再new ClassPathXmlApplicationContext()对象了。

```java
@Test
public void testNoXml(){
    ApplicationContext applicationContext = new AnnotationConfigApplicationContext(SpringConfiguration.class);
    UserService userService = applicationContext.getBean("userService", UserService.class);
    userService.save();
    UserService myUserService = applicationContext.getBean("myUserService", UserService.class);
    myUserService.save();
}
```

以上内容主要掌握的注解有三个：

1. `@Configuration`
2. `@ComponentScan`
3. `@Bean`

# GoF之代理模式

## 对代理模式的理解

**生活场景1**：牛村的牛二看上了隔壁村小花，牛二不好意思直接找小花，于是牛二找来了媒婆王妈妈。这里面就有一个非常典型的代理模式。牛二不能和小花直接对接，只能找一个中间人。其中王妈妈是代理类，牛二是目标类。王妈妈代替牛二和小花先见个面。（现实生活中的婚介所）【<font style="color:#DF2A3F;">在程序中，对象A和对象B无法直接交互时。</font>】

**生活场景2**：你刚到北京，要租房子，可以自己找，也可以找链家帮你找。其中链家是代理类，你是目标类。你们两个都有共同的行为：找房子。不过链家除了满足你找房子，另外会收取一些费用的。(现实生活中的房产中介)【<font style="color:#DF2A3F;">在程序中，功能需要增强时。</font>】

**西游记场景**：八戒和高小姐的故事。八戒要强抢民女高翠兰。悟空得知此事之后怎么做的？悟空幻化成高小姐的模样。代替高小姐与八戒会面。其中八戒是客户端程序。悟空是代理类。高小姐是目标类。那天夜里，在八戒眼里，眼前的就是高小姐，对于八戒来说，他是不知道眼前的高小姐是悟空幻化的，在他内心里这就是高小姐。所以悟空代替高小姐和八戒亲了嘴儿。这是非常典型的代理模式实现的保护机制。**<font style="color:#E8323C;">代理模式中有一个非常重要的特点：对于客户端程序来说，使用代理对象时就像在使用目标对象一样。</font>\*\***【在程序中，目标需要被保护时】\*\*

**业务场景**：系统中有A、B、C三个模块，使用这些模块的前提是需要用户登录，也就是说在A模块中要编写判断登录的代码，B模块中也要编写，C模块中还要编写，这些判断登录的代码反复出现，显然代码没有得到复用，可以为A、B、C三个模块提供一个代理，在代理当中写一次登录判断即可。代理的逻辑是：请求来了之后，判断用户是否登录了，如果已经登录了，则执行对应的目标，如果没有登录则跳转到登录页面。【在程序中，目标不但受到保护，并且代码也得到了复用。】

代理模式是GoF23种设计模式之一。属于结构型设计模式。

代理模式的作用是：为其他对象提供一种代理以控制对这个对象的访问。在某些情况下，一个客户不想或者不能直接引用一个对象，此时可以通过一个称之为“代理”的第三者来实现间接引用。代理对象可以在客户端和目标对象之间起到中介的作用，并且可以通过代理对象去掉客户不应该看到的内容和服务或者添加客户需要的额外服务。 通过引入一个新的对象来实现对真实对象的操作或者将新的对象作为真实对象的一个替身，这种实现机制即为代理模式，通过引入代理对象来间接访问一个对象，这就是代理模式的模式动机。

代理模式中的角色：

- 代理类（代理主题）
- 目标类（真实主题）
- 代理类和目标类的公共接口（抽象主题）：客户端在使用代理类时就像在使用目标类，不被客户端所察觉，所以代理类和目标类要有共同的行为，也就是实现共同的接口。

代理模式的类图：

<img src="/images/spring/1665651817094-af9ecbad-24ae-4c11-9fa2-efe46653df25.png" width="517" height="345" title="" crop="0,0,1,1" id="u718151a5" class="ne-image" style="font-size: 16px">

代理模式在代码实现上，包括两种形式：

- 静态代理
- 动态代理

## 静态代理

现在有这样一个接口和实现类：

```java
package com.jkweilai.mall.service;

/**
 * 订单接口
 */
public interface OrderService {
    /**
     * 生成订单
     */
    void generate();

    /**
     * 查看订单详情
     */
    void detail();

    /**
     * 修改订单
     */
    void modify();
}

```

```java
package com.jkweilai.mall.service.impl;

import com.jkweilai.mall.service.OrderService;

public class OrderServiceImpl implements OrderService {
    @Override
    public void generate() {
        try {
            Thread.sleep(1234);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("订单已生成");
    }

    @Override
    public void detail() {
        try {
            Thread.sleep(2541);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("订单信息如下：******");
    }

    @Override
    public void modify() {
        try {
            Thread.sleep(1010);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("订单已修改");
    }
}

```

其中Thread.sleep()方法的调用是为了模拟操作耗时。

项目已上线，并且运行正常，只是客户反馈系统有一些地方运行较慢，要求项目组对系统进行优化。于是项目负责人就下达了这个需求。首先需要搞清楚是哪些业务方法耗时较长，于是让我们统计每个业务方法所耗费的时长。如果是你，你该怎么做呢？

第一种方案：直接修改Java源代码，在每个业务方法中添加统计逻辑，如下：

```java
package com.jkweilai.mall.service.impl;

import com.jkweilai.mall.service.OrderService;

public class OrderServiceImpl implements OrderService {
    @Override
    public void generate() {
        long begin = System.currentTimeMillis();
        try {
            Thread.sleep(1234);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("订单已生成");
        long end = System.currentTimeMillis();
        System.out.println("耗费时长"+(end - begin)+"毫秒");
    }

    @Override
    public void detail() {
        long begin = System.currentTimeMillis();
        try {
            Thread.sleep(2541);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("订单信息如下：******");
        long end = System.currentTimeMillis();
        System.out.println("耗费时长"+(end - begin)+"毫秒");
    }

    @Override
    public void modify() {
        long begin = System.currentTimeMillis();
        try {
            Thread.sleep(1010);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("订单已修改");
        long end = System.currentTimeMillis();
        System.out.println("耗费时长"+(end - begin)+"毫秒");
    }
}
```

需求可以满足，但显然是违背了OCP开闭原则。这种方案不可取。

第二种方案：编写一个子类继承OrderServiceImpl，在子类中重写每个方法，代码如下：

```java
package com.jkweilai.mall.service.impl;

public class OrderServiceImplSub extends OrderServiceImpl{
    @Override
    public void generate() {
        long begin = System.currentTimeMillis();
        super.generate();
        long end = System.currentTimeMillis();
        System.out.println("耗时"+(end - begin)+"毫秒");
    }

    @Override
    public void detail() {
        long begin = System.currentTimeMillis();
        super.detail();
        long end = System.currentTimeMillis();
        System.out.println("耗时"+(end - begin)+"毫秒");
    }

    @Override
    public void modify() {
        long begin = System.currentTimeMillis();
        super.modify();
        long end = System.currentTimeMillis();
        System.out.println("耗时"+(end - begin)+"毫秒");
    }
}
```

这种方式可以解决，但是存在两个问题：

- 第一个问题：假设系统中有100个这样的业务类，需要提供100个子类，并且之前写好的创建Service对象的代码，都要修改为创建子类对象。
- 第二个问题：由于采用了继承的方式，导致代码之间的耦合度较高。

这种方案也不可取。

第三种方案：使用代理模式（这里采用静态代理）

可以为OrderService接口提供一个代理类。

```java
package com.jkweilai.mall.service;

public class OrderServiceProxy implements OrderService{ // 代理对象

    // 目标对象
    private OrderService orderService;

    // 通过构造方法将目标对象传递给代理对象
    public OrderServiceProxy(OrderService orderService) {
        this.orderService = orderService;
    }

    @Override
    public void generate() {
        long begin = System.currentTimeMillis();
        // 执行目标对象的目标方法
        orderService.generate();
        long end = System.currentTimeMillis();
        System.out.println("耗时"+(end - begin)+"毫秒");
    }

    @Override
    public void detail() {
        long begin = System.currentTimeMillis();
        // 执行目标对象的目标方法
        orderService.detail();
        long end = System.currentTimeMillis();
        System.out.println("耗时"+(end - begin)+"毫秒");
    }

    @Override
    public void modify() {
        long begin = System.currentTimeMillis();
        // 执行目标对象的目标方法
        orderService.modify();
        long end = System.currentTimeMillis();
        System.out.println("耗时"+(end - begin)+"毫秒");
    }
}

```

这种方式的优点：符合OCP开闭原则，同时采用的是关联关系，所以程序的耦合度较低。所以这种方案是被推荐的。

编写客户端程序：

```java
package com.jkweilai.mall;

import com.jkweilai.mall.service.OrderService;
import com.jkweilai.mall.service.OrderServiceProxy;
import com.jkweilai.mall.service.impl.OrderServiceImpl;

public class Client {
    public static void main(String[] args) {
        // 创建目标对象
        OrderService target = new OrderServiceImpl();
        // 创建代理对象
        OrderService proxy = new OrderServiceProxy(target);
        // 调用代理对象的代理方法
        proxy.generate();
        proxy.modify();
        proxy.detail();
    }
}

```

运行结果：

<img src="/images/spring/1763899986560-1ffb9314-4127-4514-9e6e-b8427fc725b5.png" width="284.8" height="194" title="" crop="0,0,1,1" id="u3fb32b6c" class="ne-image" style="font-size: 16px">

以上就是代理模式中的静态代理，其中OrderService接口是代理类和目标类的共同接口。OrderServiceImpl是目标类。OrderServiceProxy是代理类。

大家思考一下：如果系统中业务接口很多，一个接口对应一个代理类，显然也是不合理的，会导致类爆炸。怎么解决这个问题？动态代理可以解决。因为在动态代理中可以在内存中动态的为我们生成代理类的字节码。代理类不需要我们写了。类爆炸解决了，而且代码只需要写一次，代码也会得到复用。

## 动态代理

在程序运行阶段，在内存中动态生成代理类，被称为动态代理，目的是为了减少代理类的数量。解决代码复用的问题。

在内存当中动态生成类的技术常见的包括：

- JDK动态代理技术：只能代理接口。
- CGLIB动态代理技术：CGLIB(Code Generation Library)是一个开源项目。是一个强大的，高性能，高质量的Code生成类库，它可以在运行期扩展Java类与实现Java接口。它既可以代理接口，又可以代理类，**<font style="color:#F5222D;">底层是通过继承的方式实现的</font>**。性能比JDK动态代理要好。**<font style="color:#F5222D;">（底层有一个小而快的字节码处理框架ASM。）</font>**
- Javassist动态代理技术：Javassist是一个开源的分析、编辑和创建Java字节码的类库。是由东京工业大学的数学和计算机科学系的 Shigeru Chiba （千叶 滋）所创建的。它已加入了开放源代码JBoss 应用服务器项目，通过使用Javassist对字节码操作为JBoss实现动态"AOP"框架。

**<font style="color:#DF2A3F;">注意：</font>**

1. **纯 Spring 框架，默认规则**：AOP代理默认使用标准的**JDK动态代理**。它要求目标对象必须实现至少一个接口，代理才能正常工作
2. **纯 Spring 框架何时使用CGLIB**：仅当被代理的类**没有实现任何接口**时，Spring才会自动降级，选择**CGLIB**来创建代理
3. Spring Boot 2.x+：默认改为CGLIB。Spring Boot 2.x版本通过`AopAutoConfiguration`自动配置，将`spring.aop.proxy-target-class`属性的默认值设为了`true`，从而强制**默认使用CGLIB代理**
4. **<font style="color:#DF2A3F;">动态代理只能代理 public 的方法，非 public 的方法不能代理。</font>**

### JDK动态代理

我们还是使用静态代理中的例子：一个接口和一个实现类。

```java
package com.jkweilai.mall.service;

public interface OrderService {
    /**
     * 生成订单
     */
    void generate();

    /**
     * 查看订单详情
     */
    void detail();

    /**
     * 修改订单
     */
    void modify();
}

```

```java
package com.jkweilai.mall.service.impl;

import com.jkweilai.mall.service.OrderService;

public class OrderServiceImpl implements OrderService {
    @Override
    public void generate() {
        try {
            Thread.sleep(1234);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("订单已生成");
    }

    @Override
    public void detail() {
        try {
            Thread.sleep(2541);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("订单信息如下：******");
    }

    @Override
    public void modify() {
        try {
            Thread.sleep(1010);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("订单已修改");
    }
}

```

我们在静态代理的时候，除了以上一个接口和一个实现类之外，是不是要写一个代理类UserServiceProxy呀！在动态代理中UserServiceProxy代理类是可以动态生成的。这个类不需要写。我们直接写客户端程序即可：

```java
package com.jkweilai.mall;

import com.jkweilai.mall.service.OrderService;
import com.jkweilai.mall.service.impl.OrderServiceImpl;

import java.lang.reflect.Proxy;

public class Client {
    public static void main(String[] args) {
        // 第一步：创建目标对象
        OrderService target = new OrderServiceImpl();
        // 第二步：创建代理对象
        OrderService orderServiceProxy = Proxy.newProxyInstance(target.getClass().getClassLoader(), target.getClass().getInterfaces(), 调用处理器对象);
        // 第三步：调用代理对象的代理方法
        orderServiceProxy.detail();
        orderServiceProxy.modify();
        orderServiceProxy.generate();
    }
}
```

以上第二步创建代理对象是需要大家理解的：

OrderService orderServiceProxy = Proxy.newProxyInstance(target.getClass().getClassLoader(), target.getClass().getInterfaces(), 调用处理器对象);

这行代码做了两件事：

- 第一件事：在内存中生成了代理类的字节码
- 第二件事：创建代理对象

Proxy类全名：java.lang.reflect.Proxy。这是JDK提供的一个类（所以称为JDK动态代理）。主要是通过这个类在内存中生成代理类的字节码。

其中newProxyInstance()方法有三个参数：

- 第一个参数：类加载器。在内存中生成了字节码，要想执行这个字节码，也是需要先把这个字节码加载到内存当中的。所以要指定使用哪个类加载器加载。
- 第二个参数：接口类型。代理类和目标类实现相同的接口，所以要通过这个参数告诉JDK动态代理生成的类要实现哪些接口。
- 第三个参数：调用处理器。这是一个JDK动态代理规定的接口，接口全名：java.lang.reflect.InvocationHandler。显然这是一个回调接口，也就是说调用这个接口中方法的程序已经写好了，就差这个接口的实现类了。

所以接下来我们要写一下java.lang.reflect.InvocationHandler接口的实现类，并且实现接口中的方法，代码如下：

```java
package com.jkweilai.mall.service;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;

public class TimerInvocationHandler implements InvocationHandler {
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        return null;
    }
}
```

InvocationHandler接口中有一个方法invoke，这个invoke方法上有三个参数：

- 第一个参数：Object proxy。代理对象。设计这个参数只是为了后期的方便，如果想在invoke方法中使用代理对象的话，尽管通过这个参数来使用。
- 第二个参数：Method method。目标方法。
- 第三个参数：Object[] args。目标方法调用时要传的参数。

我们将来肯定是要调用“目标方法”的，但要调用目标方法的话，需要“目标对象”的存在，“目标对象”从哪儿来呢？我们可以给TimerInvocationHandler提供一个构造方法，可以通过这个构造方法传过来“目标对象”，代码如下：

```java
package com.jkweilai.mall.service;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;

public class TimerInvocationHandler implements InvocationHandler {
    // 目标对象
    private Object target;

    // 通过构造方法来传目标对象
    public TimerInvocationHandler(Object target) {
        this.target = target;
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        return null;
    }
}

```

有了目标对象我们就可以在invoke()方法中调用目标方法了。代码如下：

```java
package com.jkweilai.mall.service;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;

public class TimerInvocationHandler implements InvocationHandler {
    // 目标对象
    private Object target;

    // 通过构造方法来传目标对象
    public TimerInvocationHandler(Object target) {
        this.target = target;
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        // 目标执行之前增强。
        long begin = System.currentTimeMillis();
        // 调用目标对象的目标方法
        Object retValue = method.invoke(target, args);
        // 目标执行之后增强。
        long end = System.currentTimeMillis();
        System.out.println("耗时"+(end - begin)+"毫秒");
        // 一定要记得返回哦。
        return retValue;
    }
}

```

到此为止，调用处理器就完成了。接下来，应该继续完善Client程序：

```java
package com.jkweilai.mall;

import com.jkweilai.mall.service.OrderService;
import com.jkweilai.mall.service.TimerInvocationHandler;
import com.jkweilai.mall.service.impl.OrderServiceImpl;

import java.lang.reflect.Proxy;

public class Client {
    public static void main(String[] args) {
        // 创建目标对象
        OrderService target = new OrderServiceImpl();
        // 创建代理对象
        OrderService orderServiceProxy = (OrderService) Proxy.newProxyInstance(target.getClass().getClassLoader(),
                                                                                target.getClass().getInterfaces(),
                                                                                new TimerInvocationHandler(target));
        // 调用代理对象的代理方法
        orderServiceProxy.detail();
        orderServiceProxy.modify();
        orderServiceProxy.generate();
    }
}

```

大家可能会比较好奇：那个InvocationHandler接口中的invoke()方法没看见在哪里调用呀？

注意：当你调用代理对象的代理方法的时候，注册在InvocationHandler接口中的invoke()方法会被调用。也就是上面代码第24 25 26行，这三行代码中任意一行代码执行，注册在InvocationHandler接口中的invoke()方法都会被调用。

执行结果：

<img src="/images/spring/1763900041906-2f1f20aa-9f0a-4a22-8fb8-8c92a5cb4063.png" width="285.6" height="186" title="" crop="0,0,1,1" id="ua70cfc7b" class="ne-image" style="font-size: 16px">

学到这里可能会感觉有点懵，折腾半天，到最后这不是还得写一个接口的实现类吗？没省劲儿呀？

你要这样想就错了!!!!

我们可以看到，不管你有多少个Service接口，多少个业务类，这个TimerInvocationHandler接口是不是只需要写一次就行了，代码是不是得到复用了！！！！

而且最重要的是，以后程序员只需要关注核心业务的编写了，像这种统计时间的代码根本不需要关注。因为这种统计时间的代码只需要在调用处理器中编写一次即可。

到这里，JDK动态代理的原理就结束了。

不过我们看以下这个代码确实有点繁琐，对于客户端来说，用起来不方便：

<img src="/images/spring/1665716434406-4e092df4-b1a7-4d16-bbc1-1f134b8f51f7.png" width="1314" height="296" title="" crop="0,0,1,1" id="u40396b71" class="ne-image" style="font-size: 16px">

我们可以提供一个工具类：ProxyUtil，封装一个方法：

```java
package com.jkweilai.mall.util;

import com.jkweilai.mall.service.TimerInvocationHandler;

import java.lang.reflect.Proxy;

public class ProxyUtil {
    public static Object newProxyInstance(Object target) {
        return Proxy.newProxyInstance(target.getClass().getClassLoader(),
                target.getClass().getInterfaces(),
                new TimerInvocationHandler(target));
    }
}
```

这样客户端代码就不需要写那么繁琐了：

```java
package com.jkweilai.mall;

import com.jkweilai.mall.service.OrderService;
import com.jkweilai.mall.service.TimerInvocationHandler;
import com.jkweilai.mall.service.impl.OrderServiceImpl;
import com.jkweilai.mall.util.ProxyUtil;

import java.lang.reflect.Proxy;

public class Client {
    public static void main(String[] args) {
        // 创建目标对象
        OrderService target = new OrderServiceImpl();
        // 创建代理对象
        OrderService orderServiceProxy = (OrderService) ProxyUtil.newProxyInstance(target);
        // 调用代理对象的代理方法
        orderServiceProxy.detail();
        orderServiceProxy.modify();
        orderServiceProxy.generate();
    }
}

```

执行结果：

<img src="/images/spring/1763900073143-1738ce13-7f3d-4452-92bb-1d89797c4637.png" width="257.6" height="185" title="" crop="0,0,1,1" id="ucd4ccf77" class="ne-image" style="font-size: 16px">

### CGLIB动态代理

CGLIB既可以代理接口，又可以代理类。底层采用继承的方式实现。所以被代理的目标类不能使用final修饰。

使用CGLIB，需要引入它的依赖：

```xml
<dependency>
  <groupId>cglib</groupId>
  <artifactId>cglib</artifactId>
  <version>3.3.0</version>
</dependency>
```

我们准备一个没有实现接口的类，如下：

```java
package com.jkweilai.mall.service;

public class UserService {

    public void login(){
        System.out.println("用户正在登录系统....");
    }

    public void logout(){
        System.out.println("用户正在退出系统....");
    }
}
```

使用CGLIB在内存中为UserService类生成代理类，并创建对象：

```java
package com.jkweilai.mall;

import com.jkweilai.mall.service.UserService;
import net.sf.cglib.proxy.Enhancer;

public class Client {
    public static void main(String[] args) {
        // 创建字节码增强器
        Enhancer enhancer = new Enhancer();

        // 告诉cglib要继承哪个类
        enhancer.setSuperclass(UserService.class);

        // 告诉cglib要代理哪个接口（如果要使用cglib进行接口的代理，这样写。）
        //enhancer.setInterfaces(UserServiceImpl.class.getInterfaces());

        // 设置回调接口
        enhancer.setCallback(方法拦截器对象);
        // 生成源码，编译class，加载到JVM，并创建代理对象
        UserService userServiceProxy = (UserService)enhancer.create();

        userServiceProxy.login();
        userServiceProxy.logout();

    }
}
```

和JDK动态代理原理差不多，在CGLIB中需要提供的不是InvocationHandler，而是：net.sf.cglib.proxy.MethodInterceptor

编写MethodInterceptor接口实现类：

```java
package com.jkweilai.mall.service;

import net.sf.cglib.proxy.MethodInterceptor;
import net.sf.cglib.proxy.MethodProxy;

import java.lang.reflect.Method;

public class TimerMethodInterceptor implements MethodInterceptor {
    @Override
    public Object intercept(Object proxy, Method method, Object[] objects, MethodProxy methodProxy) throws Throwable {
        return null;
    }
}
```

MethodInterceptor接口中有一个方法intercept()，该方法有4个参数：

**第一个参数**：代理对象

**第二个参数**：目标方法

**第三个参数**：目标方法调用时的实参

**第四个参数**：用于调用目标方法或其超类方法的代理工具，性能更优。（**直接字节码调用，性能更高**：避免了反射开销）

在MethodInterceptor的intercept()方法中调用目标以及添加增强：

```java
package com.jkweilai.mall.service;

import net.sf.cglib.proxy.MethodInterceptor;
import net.sf.cglib.proxy.MethodProxy;

import java.lang.reflect.Method;

public class TimerMethodInterceptor implements MethodInterceptor {
    @Override
    public Object intercept(Object proxy, Method method, Object[] objects, MethodProxy methodProxy) throws Throwable {
        // 前增强
        long begin = System.currentTimeMillis();

        // 调用目标（更高效的调用方式）
        Object retValue = methodProxy.invokeSuper(proxy, objects);

        // 如果不使用以上的方式调用，使用原始的反射机制调用，代码需要这样写。
        // Object retValue = method.invoke(从外部将目标对象传过来, objects);

        // 后增强
        long end = System.currentTimeMillis();
        System.out.println("耗时" + (end - begin) + "毫秒");

        // 一定要返回
        return retValue;
    }
}

```

回调已经写完了，可以修改客户端程序了：

```java
package com.jkweilai.mall;

import com.jkweilai.mall.service.TimerMethodInterceptor;
import com.jkweilai.mall.service.UserService;
import net.sf.cglib.proxy.Enhancer;

public class Client {
    public static void main(String[] args) {
        // 创建字节码增强器
        Enhancer enhancer = new Enhancer();
        // 告诉cglib要继承哪个类
        enhancer.setSuperclass(UserService.class);
        // 设置回调接口
        enhancer.setCallback(new TimerMethodInterceptor());
        // 生成源码，编译class，加载到JVM，并创建代理对象
        UserService userServiceProxy = (UserService)enhancer.create();

        userServiceProxy.login();
        userServiceProxy.logout();

    }
}
```

对于高版本的JDK，如果使用CGLIB，需要在启动项中添加两个启动参数：**<font style="color:#DF2A3F;">（下图第一个红色框需要点击 Modify options来 Add vm options才能显示）</font>**

<img src="/images/spring/1764241276991-95dffe8b-56b2-49e6-85c3-4a0568d4016a.png" width="556" height="166" title="" crop="0,0,1,1" id="u98d3b939" class="ne-image" style="font-size: 16px">

- `--add-opens java.base/java.lang=ALL-UNNAMED`
- `--add-opens java.base/sun.net.util=ALL-UNNAMED`

**执行结果：**

<img src="/images/spring/1763900217070-16caaae5-163f-49f4-97dc-74b9f02338cf.png" width="250.4" height="126" title="" crop="0,0,1,1" id="u6e185c24" class="ne-image" style="font-size: 16px">

# 面向切面编程AOP

IoC使软件组件松耦合。AOP让你能够捕捉系统中经常使用的功能，把它转化成组件。

AOP（Aspect Oriented Programming）：面向切面编程，面向方面编程。（AOP是一种编程技术）

AOP是对OOP的补充延伸。

AOP底层使用的就是动态代理来实现的。

Spring的AOP使用的动态代理是：JDK动态代理 + CGLIB动态代理技术。Spring在这两种动态代理中灵活切换，如果是代理接口，会默认使用JDK动态代理，如果要代理某个类，这个类没有实现接口，就会切换使用CGLIB。当然，你也可以强制通过一些配置让Spring只使用CGLIB。

## AOP介绍

一般一个系统当中都会有一些系统服务，例如：日志、事务管理、安全等。这些系统服务被称为：**<font style="color:#E8323C;">交叉业务</font>**

这些**<font style="color:#E8323C;">交叉业务</font>**几乎是通用的，不管你是做银行账户转账，还是删除用户数据。日志、事务管理、安全，这些都是需要做的。

如果在每一个业务处理过程当中，都掺杂这些交叉业务代码进去的话，存在两方面问题：

- 第一：交叉业务代码在多个业务流程中反复出现，显然这个交叉业务代码没有得到复用。并且修改这些交叉业务代码的话，需要修改多处。
- 第二：程序员无法专注核心业务代码的编写，在编写核心业务代码的同时还需要处理这些交叉业务。

使用AOP可以很轻松的解决以上问题。

请看下图，可以帮助你快速理解AOP的思想：

<img src="/images/spring/1665732609757-d8ae52ba-915e-49cf-9ef4-c7bcada0d601.png" width="872" height="472" title="" crop="0,0,1,1" id="uef8a4f68" class="ne-image" style="font-size: 16px">

**<font style="color:#E8323C;">用一句话总结AOP：将与核心业务无关的代码独立的抽取出来，形成一个独立的组件，然后以横向交叉的方式应用到业务流程当中的过程被称为AOP。</font>**

**<font style="color:#E8323C;">AOP的优点：</font>**

- **<font style="color:#E8323C;">第一：代码复用性增强。</font>**
- **<font style="color:#E8323C;">第二：代码易维护。</font>**
- **<font style="color:#E8323C;">第三：使开发者更关注业务逻辑。</font>**

## AOP的七大术语

```java
public class UserService{
    public void do1(){
        System.out.println("do 1");
    }
    public void do2(){
        System.out.println("do 2");
    }
    public void do3(){
        System.out.println("do 3");
    }
    public void do4(){
        System.out.println("do 4");
    }
    public void do5(){
        System.out.println("do 5");
    }
    // 核心业务方法
    public void service(){
        do1();
        do2();
        do3();
        do5();
    }
}
```

- **连接点 Joinpoint**：程序执行过程中可以插入切面的具体位置（如方法执行前、方法正常返回后、方法抛出异常时、方法最终结束时等）
- **切点 Pointcut**：**切点本质上就是一个"位置表达式"**，用来精确指定在哪些连接点织入切面
- **通知 Advice**：在切点处执行的增强逻辑代码
- **切面 Aspect**：切点 + 通知
- **织入 Weaving**：将切面应用到目标对象的过程
- **代理对象 Proxy**：被增强后产生的对象
- **目标对象 Target**：原始的需要被增强的对象

## 切点表达式

切点表达式用来定义通知（Advice）往哪些方法上切入。

切入点表达式语法格式：

```plain
execution([访问控制权限修饰符] 返回值类型 [全限定类名]方法名(形式参数列表) [异常])
```

**访问控制权限修饰符：**

- 可选项。
- 没写时会匹配**所有访问权限**的方法。
- 写public就表示只包括公开的方法。

**返回值类型：**

- 必填项。
- `*` 表示返回值类型任意。

**全限定类名：**

- 可选项。
- 在类路径中，`..` 表示**当前包及其所有子包**
- 省略时表示所有的类。

**方法名：**

- 必填项。
- `*` 表示所有方法。
- `set*` 表示所有的set方法。

**形式参数列表：**

- 必填项
- `()` - 无参数方法
- `(..)` - 任意参数（0个或多个）
- `(*)` - 恰好一个参数，类型任意
- `(String)` - 恰好一个String类型参数
- `(String, *)` - 恰好两个参数，第一个是String，第二个任意
- `(*, String)` - 恰好两个参数，第二个是String，第一个任意

**异常：**

- 可选项。
- 省略时表示任意异常类型。

**理解以下的切点表达式：**

```java
execution(public * com.jkweilai.mall.service.*.delete*(..))
```

- `public`：只匹配public方法
- `*`：返回值类型任意
- `com.jkweilai.mall.service.*`：`com.jkweilai.mall.service`包下的**直接子类**（不包含子包）
- `delete*`：方法名以`delete`开头
- `(..)`：参数任意（0个或多个）

```java
execution(* com.jkweilai.mall..*(..))
```

- `*`：返回值类型任意
- `com.jkweilai.mall..`：`com.jkweilai.mall`包及其**所有子包**下的所有类（**没有指定类名时代表所有的类**）
- `*`：所有方法
- `(..)`：参数任意（0个或多个）

```java
execution(* *(..))
```

- `*`：返回值类型任意
- `*`：所有类
- `*`：所有方法
- `(..)`：参数任意（0个或多个）

## 使用Spring的AOP

Spring对AOP的实现包括以下3种方式：

- **<font style="color:#E8323C;">第一种方式：Spring框架结合AspectJ框架实现的AOP，基于注解方式。（只需要掌握这种）</font>**
- 第二种方式：Spring框架结合AspectJ框架实现的AOP，基于XML方式。
- 第三种方式：Spring框架自己实现的AOP，基于XML配置方式。

什么是AspectJ？（Eclipse组织的一个支持AOP的框架。AspectJ框架是独立于Spring框架之外的一个框架，Spring框架用了AspectJ）

AspectJ项目起源于帕洛阿尔托（Palo Alto）研究中心（缩写为PARC）。该中心由Xerox集团资助，Gregor Kiczales领导，从1997年开始致力于AspectJ的开发，1998年第一次发布给外部用户，2001年发布1.0 release。为了推动AspectJ技术和社团的发展，PARC在2003年3月正式将AspectJ项目移交给了Eclipse组织，因为AspectJ的发展和受关注程度大大超出了PARC的预期，他们已经无力继续维持它的发展。

### 准备工作

使用Spring+AspectJ的AOP需要引入的依赖如下：

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <version>6.2.13</version>
</dependency>
<!--spring aspects-->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-aspects</artifactId>
    <version>6.2.13</version>
</dependency>
```

Spring配置文件中添加context命名空间和aop命名空间

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd
                           http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd">

</beans>
```

### 基于AspectJ的AOP注解式开发

**第一步：**定义目标类以及目标方法

```java
package com.jkweilai.spring.service;

// 目标类
public class OrderService {
    // 目标方法
    public void generate(){
        System.out.println("订单已生成！");
    }
}
```

**第二步：**定义切面类

```java
package com.jkweilai.spring.service;

import org.aspectj.lang.annotation.Aspect;

// 切面类
@Aspect
public class MyAspect {
}
```

**第三步：**目标类和切面类都纳入spring bean管理

在目标类OrderService上添加**<font style="color:#E8323C;">@Component</font>**注解。

在切面类MyAspect类上添加**<font style="color:#E8323C;">@Component</font>**注解。

**第四步：**在spring配置文件中添加组建扫描

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd
                           http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd">
    <!--开启组件扫描-->
    <context:component-scan base-package="com.jkweilai.spring.service"/>
</beans>
```

**第五步：**在切面类中添加通知

```java
package com.jkweilai.spring.service;

import org.springframework.stereotype.Component;
import org.aspectj.lang.annotation.Aspect;

// 切面类
@Aspect
@Component
public class MyAspect {
    // 这就是需要增强的代码（通知）
    public void advice(){
        System.out.println("我是一个通知");
    }
}

```

**第六步：**在通知上添加切点表达式

```java
package com.jkweilai.spring.service;

import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;
import org.aspectj.lang.annotation.Aspect;

// 切面类
@Aspect
@Component
public class MyAspect {

    // 切点表达式
    @Before("execution(* com.jkweilai.spring.service.OrderService.*(..))")
    // 这就是需要增强的代码（通知）
    public void advice(){
        System.out.println("我是一个通知");
    }
}
```

**<font style="color:#E8323C;">注解@Before表示前置通知。</font>**

**第七步：**在spring配置文件中启用自动代理

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd
                           http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd">
    <!--开启组件扫描-->
    <context:component-scan base-package="com.jkweilai.spring.service"/>
    <!--开启自动代理-->
    <aop:aspectj-autoproxy proxy-target-class="true"/>
</beans>
```

`**<font style="color:#E8323C;"><aop:aspectj-autoproxy proxy-target-class="true"/></font>**`**<font style="color:#E8323C;"> 开启自动代理之后，凡是带有@Aspect注解的bean都会生成代理对象。</font>**

`**<font style="color:#E8323C;">proxy-target-class="true"</font>**`**<font style="color:#E8323C;"> 表示采用cglib动态代理。</font>**

`**<font style="color:#E8323C;">proxy-target-class="false"</font>**`**<font style="color:#E8323C;"> 表示采用jdk动态代理。默认值是false。即使写成false，当没有接口的时候，也会自动选择cglib生成代理类。</font>**

测试程序：

```java
package com.jkweilai.spring.test;

import com.jkweilai.spring.service.OrderService;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class AOPTest {
    @Test
    public void testAOP(){
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring-aspectj-aop-annotation.xml");
        OrderService orderService = applicationContext.getBean("orderService", OrderService.class);
        orderService.generate();
    }
}

```

运行结果：

<img src="/images/spring/1665843923087-e1116f09-2470-46cb-b21a-1526f62cab50.png" width="276" height="109" title="" crop="0,0,1,1" id="u792f21b4" class="ne-image" style="font-size: 16px">

### 全注解式开发AOP

就是编写一个类，在这个类上面使用大量注解来代替spring的配置文件，spring配置文件消失了，如下：

```java
package com.jkweilai.spring.service;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@Configuration
@ComponentScan("com.jkweilai.spring.service")
@EnableAspectJAutoProxy(proxyTargetClass = true)
public class SpringConfiguration {
}
```

测试程序也变化了：

```java
@Test
public void testAOPWithAllAnnotation(){
    ApplicationContext applicationContext = new AnnotationConfigApplicationContext(SpringConfiguration.class);
    OrderService orderService = applicationContext.getBean("orderService", OrderService.class);
    orderService.generate();
}
```

### 通知类型

通知类型包括：

- **前置通知：@Before** 目标方法执行之前的通知
- **后置通知：@After** 目标方法不管是否成功结束，后置通知都会执行（即使有未捕获的异常）
- **返回通知：@AfterReturning** 目标方法成功执行返回后执行的通知（目标方法出现未捕获的异常时，不会执行）
- **异常通知：@AfterThrowing** 目标方法发生异常后执行的通知
- **环绕通知：@Around** 目标方法执行之前和之后都可添加通知，**可以控制目标方法是否执行**

**执行顺序：**

- **正常执行：**@Around前半 → @Before → 目标方法 → @AfterReturning → @After → @Around后半
- **异常执行：**@Around前半 → @Before → 目标方法 → @AfterThrowing → @After → @Around后半
- **注意**：目标方法出现异常，并且最终异常没有捕获的话，@Around后半 不会执行。

接下来，编写程序来测试这几个通知的执行顺序：

```java
package com.jkweilai.spring.service;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;

// 切面类
@Component
@Aspect
public class MyAspect {

    @Around("execution(* com.jkweilai.spring.service.OrderService.*(..))")
    public Object aroundAdvice(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        System.out.println("环绕通知开始");
        // 执行目标方法。
        Object retValue = proceedingJoinPoint.proceed();
        System.out.println("环绕通知结束");
        return retValue;
    }

    @Before("execution(* com.jkweilai.spring.service.OrderService.*(..))")
    public void beforeAdvice(){
        System.out.println("前置通知");
    }

    @AfterReturning("execution(* com.jkweilai.spring.service.OrderService.*(..))")
    public void afterReturningAdvice(){
        System.out.println("返回通知");
    }

    @AfterThrowing("execution(* com.jkweilai.spring.service.OrderService.*(..))")
    public void afterThrowingAdvice(){
        System.out.println("异常通知");
    }

    @After("execution(* com.jkweilai.spring.service.OrderService.*(..))")
    public void afterAdvice(){
        System.out.println("后置通知");
    }

}
```

```java
package com.jkweilai.spring.service;

import org.springframework.stereotype.Component;

// 目标类
@Component
public class OrderService {
    // 目标方法
    public void generate(){
        System.out.println("订单已生成！");
    }
}

```

```java
package com.jkweilai.spring.test;

import com.jkweilai.spring.service.OrderService;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class AOPTest {
    @Test
    public void testAOP(){
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring-aspectj-aop-annotation.xml");
        OrderService orderService = applicationContext.getBean("orderService", OrderService.class);
        orderService.generate();
    }
}
```

执行结果：

<img src="/images/spring/1727354763970-e62d8306-982e-4d23-881d-802a4213f2d3.png" width="200" height="217" title="" crop="0,0,1,1" id="ud779c18f" class="ne-image" style="font-size: 16px">

通过上面的执行结果就可以判断他们的执行顺序了，这里不再赘述。

结果中没有异常通知，这是因为目标程序执行过程中没有发生异常。我们尝试让目标方法发生异常：

```java
package com.jkweilai.spring.service;

import org.springframework.stereotype.Component;

// 目标类
@Component
public class OrderService {
    // 目标方法
    public void generate(){
        System.out.println("订单已生成！");
        if (1 == 1) {
            throw new RuntimeException("模拟异常发生");
        }
    }
}
```

再次执行测试程序，结果如下：

<img src="/images/spring/1727354892988-43f912b5-9d3d-4ae4-b5ee-640a69d7359c.png" width="518" height="253" title="" crop="0,0,1,1" id="ucadccb55" class="ne-image" style="font-size: 16px">

通过测试得知，当发生异常之后，后置通知也会执行。

出现异常之后，如果**未捕获该异常**，**<font style="color:#E8323C;">返回通知</font>**和**<font style="color:#E8323C;">环绕通知的结束部分</font>**不会执行。

出现异常之后，如果**捕获了该异常**，**<font style="color:#E8323C;">返回通知</font>**不会执行，但**<font style="color:#DF2A3F;">环绕通知的结束部分</font>**会执行。（可以自行测试一下）

### 切面的先后顺序

我们知道，业务流程当中不一定只有一个切面，可能有的切面控制事务，有的记录日志，有的进行安全控制，如果多个切面的话，顺序如何控制：**<font style="color:#E8323C;">可以使用@Order注解来标识切面类，为@Order注解的value指定一个整数型的数字，数字越小，优先级越高</font>**。

再定义一个切面类，如下：

```java
package com.jkweilai.spring.service;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Order(1) //设置优先级
public class YourAspect {

    @Around("execution(* com.jkweilai.spring.service.OrderService.*(..))")
    public Object aroundAdvice(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        System.out.println("YourAspect环绕通知开始");
        // 执行目标方法。
        Object retValue = proceedingJoinPoint.proceed();
        System.out.println("YourAspect环绕通知结束");
        return retValue;
    }

    @Before("execution(* com.jkweilai.spring.service.OrderService.*(..))")
    public void beforeAdvice(){
        System.out.println("YourAspect前置通知");
    }

    @AfterReturning("execution(* com.jkweilai.spring.service.OrderService.*(..))")
    public void afterReturningAdvice(){
        System.out.println("YourAspect返回通知");
    }

    @AfterThrowing("execution(* com.jkweilai.spring.service.OrderService.*(..))")
    public void afterThrowingAdvice(){
        System.out.println("YourAspect异常通知");
    }

    @After("execution(* com.jkweilai.spring.service.OrderService.*(..))")
    public void afterAdvice(){
        System.out.println("YourAspect后置通知");
    }
}

```

```java
package com.jkweilai.spring.service;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

// 切面类
@Component
@Aspect
@Order(2) //设置优先级
public class MyAspect {

    @Around("execution(* com.jkweilai.spring.service.OrderService.*(..))")
    public Object aroundAdvice(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        System.out.println("环绕通知开始");
        // 执行目标方法。
        Object retValue = proceedingJoinPoint.proceed();
        System.out.println("环绕通知结束");
        return retValue;
    }

    @Before("execution(* com.jkweilai.spring.service.OrderService.*(..))")
    public void beforeAdvice(){
        System.out.println("前置通知");
    }

    @AfterReturning("execution(* com.jkweilai.spring.service.OrderService.*(..))")
    public void afterReturningAdvice(){
        System.out.println("返回通知");
    }

    @AfterThrowing("execution(* com.jkweilai.spring.service.OrderService.*(..))")
    public void afterThrowingAdvice(){
        System.out.println("异常通知");
    }

    @After("execution(* com.jkweilai.spring.service.OrderService.*(..))")
    public void afterAdvice(){
        System.out.println("后置通知");
    }

}
```

执行测试程序：

<img src="/images/spring/1727355165649-0a4443b6-5ac5-4f38-a23f-756af6585dbc.png" width="333" height="397" title="" crop="0,0,1,1" id="uee20a7f9" class="ne-image" style="font-size: 16px">

通过修改@Order注解的整数值来切换顺序，执行测试程序：

<img src="/images/spring/1727355225994-ecb4fbe1-2611-477b-a319-d64a5a897153.png" width="302" height="402" title="" crop="0,0,1,1" id="ua74a2d8b" class="ne-image" style="font-size: 16px">

### 优化使用切点表达式

观看以下代码中的切点表达式：

```java
package com.jkweilai.spring.service;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

// 切面类
@Component
@Aspect
@Order(2)
public class MyAspect {

    @Around("execution(* com.jkweilai.spring.service.OrderService.*(..))")
    public Object aroundAdvice(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        System.out.println("环绕通知开始");
        // 执行目标方法。
        Object retValue = proceedingJoinPoint.proceed();
        System.out.println("环绕通知结束");
        return retValue;
    }

    @Before("execution(* com.jkweilai.spring.service.OrderService.*(..))")
    public void beforeAdvice(){
        System.out.println("前置通知");
    }

    @AfterReturning("execution(* com.jkweilai.spring.service.OrderService.*(..))")
    public void afterReturningAdvice(){
        System.out.println("返回通知");
    }

    @AfterThrowing("execution(* com.jkweilai.spring.service.OrderService.*(..))")
    public void afterThrowingAdvice(){
        System.out.println("异常通知");
    }

    @After("execution(* com.jkweilai.spring.service.OrderService.*(..))")
    public void afterAdvice(){
        System.out.println("后置通知");
    }

}

```

缺点是：

- 第一：切点表达式重复写了多次，没有得到复用。
- 第二：如果要修改切点表达式，需要修改多处，难维护。

可以这样做：将切点表达式单独的定义出来，在需要的位置引入即可。如下：

```java
package com.jkweilai.spring.service;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

// 切面类
@Component
@Aspect
@Order(2)
public class MyAspect {

    @Pointcut("execution(* com.jkweilai.spring.service.OrderService.*(..))")
    public void pointcut(){}

    @Around("pointcut()")
    public Object aroundAdvice(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        System.out.println("环绕通知开始");
        // 执行目标方法。
        Object retValue = proceedingJoinPoint.proceed();
        System.out.println("环绕通知结束");
        return retValue;
    }

    @Before("pointcut()")
    public void beforeAdvice(){
        System.out.println("前置通知");
    }

    @AfterReturning("pointcut()")
    public void afterReturningAdvice(){
        System.out.println("返回通知");
    }

    @AfterThrowing("pointcut()")
    public void afterThrowingAdvice(){
        System.out.println("异常通知");
    }

    @After("pointcut()")
    public void afterAdvice(){
        System.out.println("后置通知");
    }

}

```

使用@Pointcut注解来定义独立的切点表达式。

注意这个@Pointcut注解标注的方法随意，只是起到一个能够让@Pointcut注解编写的位置。

## AOP的实际案例：事务处理

项目中的事务控制是在所难免的。在一个业务流程当中，可能需要多条DML语句共同完成，为了保证数据的安全，这多条DML语句要么同时成功，要么同时失败。这就需要添加事务控制的代码。例如以下伪代码：

```java
class 业务类1{
    public void 业务方法1(){
        try{
            // 开启事务
            startTransaction();

            // 执行核心业务逻辑
            step1();
            step2();
            step3();
            ....

            // 提交事务
            commitTransaction();
        }catch(Exception e){
            // 回滚事务
            rollbackTransaction();
        }
    }
    public void 业务方法2(){
        try{
            // 开启事务
            startTransaction();

            // 执行核心业务逻辑
            step1();
            step2();
            step3();
            ....

            // 提交事务
            commitTransaction();
        }catch(Exception e){
            // 回滚事务
            rollbackTransaction();
        }
    }
    public void 业务方法3(){
        try{
            // 开启事务
            startTransaction();

            // 执行核心业务逻辑
            step1();
            step2();
            step3();
            ....

            // 提交事务
            commitTransaction();
        }catch(Exception e){
            // 回滚事务
            rollbackTransaction();
        }
    }
}

class 业务类2{
    public void 业务方法1(){
        try{
            // 开启事务
            startTransaction();

            // 执行核心业务逻辑
            step1();
            step2();
            step3();
            ....

            // 提交事务
            commitTransaction();
        }catch(Exception e){
            // 回滚事务
            rollbackTransaction();
        }
    }
    public void 业务方法2(){
        try{
            // 开启事务
            startTransaction();

            // 执行核心业务逻辑
            step1();
            step2();
            step3();
            ....

            // 提交事务
            commitTransaction();
        }catch(Exception e){
            // 回滚事务
            rollbackTransaction();
        }
    }
    public void 业务方法3(){
        try{
            // 开启事务
            startTransaction();

            // 执行核心业务逻辑
            step1();
            step2();
            step3();
            ....

            // 提交事务
            commitTransaction();
        }catch(Exception e){
            // 回滚事务
            rollbackTransaction();
        }
    }
}
//......
```

可以看到，这些业务类中的每一个业务方法都是需要控制事务的，而控制事务的代码又是固定的格式，都是：

```java
try{
    // 开启事务
    startTransaction();

    // 执行核心业务逻辑
    //......

    // 提交事务
    commitTransaction();
}catch(Exception e){
    // 回滚事务
    rollbackTransaction();
}
```

这个控制事务的代码就是和业务逻辑没有关系的“**<font style="color:#E8323C;">交叉业务</font>**”。以上伪代码当中可以看到这些交叉业务的代码没有得到复用，并且如果这些交叉业务代码需要修改，那必然需要修改多处，难维护，怎么解决？可以采用AOP思想解决。可以把以上控制事务的代码作为环绕通知，切入到目标类的方法当中。接下来我们做一下这件事，有两个业务类，如下：

```java
package com.jkweilai.spring.biz;

import org.springframework.stereotype.Component;

@Component
// 业务类
public class AccountService {
    // 转账业务方法
    public void transfer(){
        System.out.println("正在进行银行账户转账");
    }
    // 取款业务方法
    public void withdraw(){
        System.out.println("正在进行取款操作");
    }
}

```

```java
package com.jkweilai.spring.biz;

import org.springframework.stereotype.Component;

@Component
// 业务类
public class OrderService {
    // 生成订单
    public void generate(){
        System.out.println("正在生成订单");
    }
    // 取消订单
    public void cancel(){
        System.out.println("正在取消订单");
    }
}
```

注意，以上两个业务类已经纳入spring bean的管理，因为都添加了@Component注解。

接下来我们给以上两个业务类的4个方法添加事务控制代码，使用AOP来完成：

```java
package com.jkweilai.spring.biz;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Aspect
@Component
// 事务切面类
public class TransactionAspect {

    @Around("execution(* com.jkweilai.spring.biz..*(..))")
    public Object aroundAdvice(ProceedingJoinPoint proceedingJoinPoint){
        Object retValue = null;
        try {
            System.out.println("开启事务");
            // 执行目标
            retValue = proceedingJoinPoint.proceed();
            System.out.println("提交事务");
        } catch (Throwable e) {
            System.out.println("回滚事务");
        }
        return retValue;
    }
}

```

你看，这个事务控制代码是不是只需要写一次就行了，并且修改起来也没有成本。编写测试程序：

```java
package com.jkweilai.spring.test;

import com.jkweilai.spring.biz.AccountService;
import com.jkweilai.spring.biz.OrderService;
import com.jkweilai.spring.service.SpringConfiguration;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class AOPTest2 {
    @Test
    public void testTransaction(){
        ApplicationContext applicationContext = new AnnotationConfigApplicationContext(SpringConfiguration.class);
        OrderService orderService = applicationContext.getBean("orderService", OrderService.class);
        AccountService accountService = applicationContext.getBean("accountService", AccountService.class);
        // 生成订单
        orderService.generate();
        // 取消订单
        orderService.cancel();
        // 转账
        accountService.transfer();
        // 取款
        accountService.withdraw();
    }
}
```

执行结果：

<img src="/images/spring/1763900978755-59d9c5ec-850c-40b3-8d90-98163a7d2429.png" width="214.4" height="289" title="" crop="0,0,1,1" id="u126a710a" class="ne-image" style="font-size: 16px">

通过测试可以看到，所有的业务方法都添加了事务控制的代码。

## AOP的实际案例：安全日志

需求是这样的：项目开发结束了，已经上线了。运行正常。客户提出了新的需求：凡是在系统中进行修改操作的，删除操作的，新增操作的，都要把这个人记录下来。因为这几个操作是属于危险行为。例如有业务类和业务方法：

```java
package com.jkweilai.spring.biz;

import org.springframework.stereotype.Component;

@Component
//用户业务
public class UserService {
    public void getUser(){
        System.out.println("获取用户信息");
    }
    public void saveUser(){
        System.out.println("保存用户");
    }
    public void deleteUser(){
        System.out.println("删除用户");
    }
    public void modifyUser(){
        System.out.println("修改用户");
    }
}
```

```java
package com.jkweilai.spring.biz;

import org.springframework.stereotype.Component;

// 商品业务类
@Component
public class ProductService {
    public void getProduct(){
        System.out.println("获取商品信息");
    }
    public void saveProduct(){
        System.out.println("保存商品");
    }
    public void deleteProduct(){
        System.out.println("删除商品");
    }
    public void modifyProduct(){
        System.out.println("修改商品");
    }
}

```

注意：已经添加了@Component注解。

接下来我们使用aop来解决上面的需求：编写一个负责安全的切面类

```java
package com.jkweilai.spring.biz;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

@Component
@Aspect
public class SecurityAspect {

    @Pointcut("execution(* com.jkweilai.spring.biz..save*(..))")
    public void savePointcut(){}

    @Pointcut("execution(* com.jkweilai.spring.biz..delete*(..))")
    public void deletePointcut(){}

    @Pointcut("execution(* com.jkweilai.spring.biz..modify*(..))")
    public void modifyPointcut(){}

    @Before("savePointcut() || deletePointcut() || modifyPointcut()")
    public void beforeAdivce(JoinPoint joinpoint){
        System.out.println("XXX操作员正在操作"+joinpoint.getSignature().getName()+"方法");
    }
}

```

```java
@Test
public void testSecurity(){
    ApplicationContext applicationContext = new AnnotationConfigApplicationContext(SpringConfiguration.class);
    UserService userService = applicationContext.getBean("userService", UserService.class);
    ProductService productService = applicationContext.getBean("productService", ProductService.class);
    userService.getUser();
    userService.saveUser();
    userService.deleteUser();
    userService.modifyUser();
    productService.getProduct();
    productService.saveProduct();
    productService.deleteProduct();
    productService.modifyProduct();
}
```

执行结果：

<img src="/images/spring/1763901002972-6212a72e-2316-44ba-80a2-9c2817a277df.png" width="344.8" height="314" title="" crop="0,0,1,1" id="u59518a9d" class="ne-image" style="font-size: 16px">

# Spring集成MyBatis

## 实现步骤

- 第一步：准备数据库表
  - 使用t_act表（账户表）
- 第二步：IDEA中创建一个模块，并引入依赖
  - spring-context
  - spring-jdbc
  - mysql驱动
  - mybatis
  - mybatis-spring：**<font style="color:#E8323C;">mybatis提供的与spring框架集成的依赖</font>**
  - HikariCP（连接池）
  - Lombok
  - junit5
- 第三步：基于三层架构实现，所以提前创建好所有的包
  - com.jkweilai.bank.mapper
  - com.jkweilai.bank.service
  - com.jkweilai.bank.service.impl
  - com.jkweilai.bank.entity
- 第四步：编写entity
  - Account，提供属性，使用 lombok 注解标注。
- 第五步：编写mapper接口
  - AccountMapper接口，定义方法
- 第六步：编写mapper配置文件
  - 在配置文件中配置命名空间，以及每一个方法对应的sql。
- 第七步：编写service接口和service接口实现类
  - AccountService
  - AccountServiceImpl
- 第八步：编写jdbc.properties配置文件
  - 数据库连接池相关信息
- 第九步：编写spring.xml配置文件（**当然：配置文件也可以采用配置类完成**）
  - 组件扫描
  - 引入外部的属性文件
  - 数据源
  - SqlSessionFactoryBean配置
    - 注入数据源
    - 指定别名包
    - mybatis 配置（settings）：下划线转驼峰、开启日志打印器等
  - Mapper扫描配置器
    - 指定扫描的包
  - 事务管理器DataSourceTransactionManager
    - 注入数据源
  - 启用事务注解
    - 注入事务管理器
- 第十步：编写测试程序，并添加事务，进行测试

## 具体实现

### 第一步：准备数据库表

```sql
DROP TABLE IF EXISTS `t_act`;
CREATE TABLE `t_act`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `act_no` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `balance` decimal(10, 2) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

INSERT INTO `t_act` VALUES (1, 'act-001', 50000.00);
INSERT INTO `t_act` VALUES (2, 'act-002', 0.00);
```

### 第二步：IDEA中创建一个模块，并引入依赖

```xml
<dependencies>
    <!--spring context-->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context</artifactId>
        <version>6.2.13</version>
    </dependency>
    <!--spring jdbc-->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-jdbc</artifactId>
        <version>6.2.13</version>
    </dependency>
    <!--mysql驱动-->
    <dependency>
        <groupId>com.mysql</groupId>
        <artifactId>mysql-connector-j</artifactId>
        <version>8.4.0</version>
    </dependency>
    <!--mybatis依赖-->
    <dependency>
        <groupId>org.mybatis</groupId>
        <artifactId>mybatis</artifactId>
        <version>3.5.16</version>
    </dependency>
    <!--mybatis和spring集成的依赖-->
    <dependency>
        <groupId>org.mybatis</groupId>
        <artifactId>mybatis-spring</artifactId>
        <version>3.0.4</version>
    </dependency>
    <!--HikariCP连接池的依赖-->
    <dependency>
        <groupId>com.zaxxer</groupId>
        <artifactId>HikariCP</artifactId>
        <version>7.0.2</version>
    </dependency>
    <!--junit的依赖-->
    <dependency>
        <groupId>org.junit.jupiter</groupId>
        <artifactId>junit-jupiter-api</artifactId>
        <version>5.11.0</version>
        <scope>test</scope>
    </dependency>
</dependencies>
```

### 第三步：基于三层架构实现，所以提前创建好所有的包

`com.jkweilai.bank.mapper`

`com.jkweilai.bank.entity`

`com.jkweilai.bank.service.impl`

### 第四步：编写 entity

```java
package com.jkweilai.bank.entity;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class Account {
    private Long id;
    private String actNo;
    private BigDecimal balance;
}

```

### 第五步：编写mapper接口

```java
package com.jkweilai.bank.mapper;

import com.jkweilai.bank.entity.Account;

import java.util.List;

public interface AccountMapper {

    /**
     * 修改账户
     * @param account
     * @return
     */
    int update(Account account);

    /**
     * 根据账号查询账户
     * @param actno
     * @return
     */
    Account selectByActno(String actno);
}

```

### 第六步：编写mapper配置文件

一定要注意，在 `resources`目录下新建 `com/jkweilai/bank/mapper`目录时，是斜杠不是点儿。在resources目录下新建。并且要和Mapper接口包对应上。

如果接口叫做AccountMapper，配置文件必须是AccountMapper.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.jkweilai.bank.mapper.AccountMapper">
    <update id="update">
        update t_act set balance = #{balance} where actno = #{actno}
    </update>
    <select id="selectByActno" resultType="Account">
        select * from t_act where actno = #{actno}
    </select>
</mapper>
```

### 第七步：编写service接口和service接口实现类

注意编写的service实现类纳入IoC容器管理：

```java
package com.jkweilai.bank.service;

public interface AccountService {
    /**
     * 转账
     * @param fromActno
     * @param toActno
     * @param money
     */
    void transfer(String fromActno, String toActno, double money);
}

```

```java
package com.jkweilai.bank.service.impl;

import com.jkweilai.bank.mapper.AccountMapper;
import com.jkweilai.bank.entity.Account;
import com.jkweilai.bank.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("accountService")
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountMapper accountMapper;

    @Override
    @Transactional
    public void transfer(String fromActno, String toActno, double money) {
        Account fromAct = accountMapper.selectByActno(fromActno);
        if (fromAct.getBalance() < money) {
            throw new RuntimeException("余额不足");
        }
        Account toAct = accountMapper.selectByActno(toActno);
        fromAct.setBalance(fromAct.getBalance() - money);
        toAct.setBalance(toAct.getBalance() + money);
        int count = accountMapper.update(fromAct);
        count += accountMapper.update(toAct);
        if (count != 2) {
            throw new RuntimeException("转账失败");
        }
    }
}

```

### 第八步：编写jdbc.properties配置文件

放在类的根路径下

```properties
jdbc.driver=com.mysql.cj.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/spring
jdbc.username=root
jdbc.password=123456
```

### 第九步：编写spring.xml配置文件

**<font style="color:#E8323C;">注意：当你在spring.xml文件中直接写标签内容时，IDEA会自动给你添加命名空间</font>**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context" xmlns:tx="http://www.springframework.org/schema/tx"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx.xsd">

    <!--组件扫描-->
    <context:component-scan base-package="com.jkweilai.bank"/>

    <!--外部属性配置文件-->
    <context:property-placeholder location="jdbc.properties"/>

    <!--数据源-->
    <bean id="dataSource" class="com.zaxxer.hikari.HikariDataSource">
        <property name="driverClassName" value="${jdbc.driver}"/>
        <property name="jdbcUrl" value="${jdbc.url}"/>
        <property name="username" value="${jdbc.username}"/>
        <property name="password" value="${jdbc.password}"/>
    </bean>

    <!--SqlSessionFactoryBean：spring启动时它负责解析配置，创建全局唯一的SqlSessionFactory对象。-->
    <bean class="org.mybatis.spring.SqlSessionFactoryBean">
        <!--注入数据源-->
        <property name="dataSource" ref="dataSource"/>
        <!--起别名-->
        <property name="typeAliasesPackage" value="com.jkweilai.bank.entity"/>
        <!--mybatis的settings配置-->
        <property name="configuration">
            <bean class="org.apache.ibatis.session.Configuration">
                <!--下划线转驼峰-->
                <property name="mapUnderscoreToCamelCase" value="true"></property>
                <!--开始日志打印器-->
                <property name="logImpl" value="org.apache.ibatis.logging.stdout.StdOutImpl"></property>
            </bean>
        </property>
    </bean>

    <!--Mapper扫描器：注意SqlMapper.xml文件的位置和名字必须与Mapper接口相同-->
    <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
        <property name="basePackage" value="com.jkweilai.bank.mapper"/>
    </bean>

    <!--事务管理器-->
    <bean id="txManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <property name="dataSource" ref="dataSource"/>
    </bean>

    <!--开启事务注解-->
    <tx:annotation-driven transaction-manager="txManager"/>

</beans>
```

### 第十步：编写测试程序，并添加事务，进行测试

```java
package com.jkweilai.spring.test;

import com.jkweilai.bank.service.AccountService;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class SMTest {

    @Test
    public void testSM(){
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring.xml");
        AccountService accountService = applicationContext.getBean("accountService", AccountService.class);
        try {
            accountService.transfer("act-001", "act-002", 10000.0);
            System.out.println("转账成功");
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("转账失败");
        }
    }

}
```

**<font style="color:#E8323C;">最后大家别忘了测试事务！！！！</font>**

## 配置类方式

以上的程序如果换成配置类的方式，代码如下：

```java
package com.jkweilai.bank.config;

import com.zaxxer.hikari.HikariDataSource;
import org.apache.ibatis.logging.stdout.StdOutImpl;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;

@Configuration
@ComponentScan("com.jkweilai.bank")
@PropertySource("classpath:application.properties")
@EnableTransactionManagement
@MapperScan("com.jkweilai.bank.dao")
public class SpringConfiguration {

    @Value("${spring.datasource.driver-class-name}")
    private String driverClassName;
    @Value("${spring.datasource.url}")
    private String jdbcUrl;
    @Value("${spring.datasource.username}")
    private String username;
    @Value("${spring.datasource.password}")
    private String password;
    @Value("${mybatis.type-aliases-package}")
    private String typeAliasesPackage;

    @Bean
    public DataSource dataSource() {
        HikariDataSource dataSource = new HikariDataSource();
        dataSource.setDriverClassName(driverClassName);
        dataSource.setJdbcUrl(jdbcUrl);
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        return dataSource;
    }

    @Bean
    public SqlSessionFactoryBean sqlSessionFactoryBean(DataSource dataSource) {
        SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
        sqlSessionFactoryBean.setDataSource(dataSource);
        sqlSessionFactoryBean.setTypeAliasesPackage(typeAliasesPackage);
        org.apache.ibatis.session.Configuration configuration = new org.apache.ibatis.session.Configuration();
        configuration.setMapUnderscoreToCamelCase(true);
        configuration.setLogImpl(StdOutImpl.class);
        sqlSessionFactoryBean.setConfiguration(configuration);
        return sqlSessionFactoryBean;
    }

    @Bean
    public DataSourceTransactionManager transactionManager(DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }
}
```

测试程序如下：

```java
package com.jkweilai.bank.test;

import com.jkweilai.bank.config.SpringMyBatisConfig;
import com.jkweilai.bank.service.AccountService;
import org.junit.jupiter.api.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import java.math.BigDecimal;

public class BankTest {
    @Test
    public void test(){
        ApplicationContext context = new AnnotationConfigApplicationContext(SpringMyBatisConfig.class);
        AccountService accountService = context.getBean(AccountService.class);
        accountService.transfer("act-001", "act-002", new BigDecimal(10000.0));
    }
}

```

配置文件 `application.properties`如下：

```properties
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/spring
spring.datasource.username=root
spring.datasource.password=123456
mybatis.type-aliases-package=com.jkweilai.bank.entity
```

## Spring配置文件的import

spring配置文件有多个，并且可以在spring的核心配置文件中使用import进行引入，我们可以将组件扫描单独定义到一个配置文件中，如下：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">

    <!--组件扫描-->
    <context:component-scan base-package="com.jkweilai.bank"/>

</beans>
```

然后在核心配置文件中引入：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context" xmlns:tx="http://www.springframework.org/schema/tx"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx.xsd">

    <!--引入其他的spring配置文件-->
    <import resource="common.xml"/>

</beans>
```

**<font style="color:#F5222D;">注意：在实际开发中，service单独配置到一个文件中，dao单独配置到一个文件中，然后在核心配置文件中引入，养成好习惯。</font>**

# Spring对事务的支持

## 事务概述

- 什么是事务
  - 在一个业务流程当中，通常需要多条DML（insert delete update）语句共同联合才能完成，这多条DML语句必须同时成功，或者同时失败，这样才能保证数据的安全。
  - 多条DML要么同时成功，要么同时失败，这叫做事务。
  - 事务：Transaction（tx）
- 事务的四个处理过程：
  - 第一步：开启事务 (start transaction)
  - 第二步：执行核心业务代码
  - 第三步：提交事务（如果核心业务处理过程中没有出现异常）(commit transaction)
  - 第四步：回滚事务（如果核心业务处理过程中出现异常）(rollback transaction)
- 事务的四个特性：
  - A 原子性：事务是最小的工作单元，不可再分。
  - C 一致性：事务要求要么同时成功，要么同时失败。事务前和事务后的总量不变。
  - I 隔离性：事务和事务之间因为有隔离性，才可以保证互不干扰。
  - D 持久性：持久性是事务结束的标志。

## 引入事务场景

以银行账户转账为例学习事务。两个账户act-001和act-002。act-001账户向act-002账户转账10000，必须同时成功，或者同时失败。（一个减成功，一个加成功， 这两条update语句必须同时成功，或同时失败。）

采用三层架构搭建：

<img src="/images/spring/1749727730298-3fbf26a7-40a4-4ee2-bd8b-6ed01adec552.png" width="692" height="548" title="" crop="0,0,1,1" id="u9aae96fe" class="ne-image" style="font-size: 16px">

### 没有异常时

模块名：spring-013-tx-bank（将之前spring和mybatis集成的代码完全拷贝到当前模块中。）

执行结果：

<img src="/images/spring/1763901498342-1c544b5d-7f7c-4d3e-8b80-3fab3d9d7824.png" width="380.8" height="38" title="" crop="0,0,1,1" id="ub4b9a0e5" class="ne-image" style="font-size: 16px">

数据变化：

<img src="/images/spring/1666497727323-b2ca34c9-99c6-4b23-8d3b-8dbe3009d3e9.png" width="366" height="146" title="" crop="0,0,1,1" id="u349bac3e" class="ne-image" style="font-size: 16px">

### 模拟异常后

执行结果：

<img src="/images/spring/1763901514771-99a5964c-e344-4ed6-b879-649b329fffd4.png" width="587.2" height="94" title="" crop="0,0,1,1" id="u17a17747" class="ne-image" style="font-size: 16px">

数据库表中数据：

<img src="/images/spring/1666497824308-bdd8f11f-8f99-4195-81c4-c37721627f4c.png" width="298" height="136" title="" crop="0,0,1,1" id="u953308f7" class="ne-image" style="font-size: 16px">

**<font style="color:#E8323C;">丢了1万。</font>**

## Spring对事务的支持

### Spring实现事务的两种方式

- 编程式事务
  - 通过编写代码的方式来实现事务的管理。
- 声明式事务
  - **基于注解方式（\*\***<font style="color:#DF2A3F;">掌握这种方式</font>\***\*）**
  - 基于XML配置方式

### Spring事务管理API

Spring对事务的管理底层实现方式是基于AOP实现的。采用AOP的方式进行了封装。所以Spring专门针对事务开发了一套API，API的核心接口如下：

<img src="/images/spring/1666504216275-1b6a9ac4-6958-4cdf-9323-7a79a08d059d.png" width="573" height="200" title="" crop="0,0,1,1" id="ue4d38259" class="ne-image" style="font-size: 16px">

PlatformTransactionManager接口：spring事务管理器的核心接口。在**<font style="color:#E8323C;">Spring</font>**中它有两个实现：

- DataSourceTransactionManager：支持JdbcTemplate、MyBatis、Hibernate等事务管理。
- JtaTransactionManager：支持分布式事务管理。

如果要在Spring中使用JdbcTemplate、MyBatis、Hibernate，就要使用DataSourceTransactionManager来管理事务。（Spring内置写好了，可以直接用。）

### 声明式事务之注解实现方式

- 第一步：在spring配置文件中配置事务管理器。

```xml
<bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
  <property name="dataSource" ref="dataSource"/>
</bean>
```

- 第二步：在spring配置文件中引入tx命名空间。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:tx="http://www.springframework.org/schema/tx"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd
                           http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx.xsd">
```

- 第三步：在spring配置文件中配置“事务注解驱动器”，开启注解的方式控制事务。

```xml
<tx:annotation-driven transaction-manager="transactionManager"/>
```

- 第四步：在service类上或方法上添加@Transactional注解

在类上添加该注解，该类中所有的方法都有事务。在某个方法上添加该注解，表示只有这个方法使用事务。

```java
package com.jkweilai.bank.service.impl;

import com.jkweilai.bank.mapper.AccountMapper;
import com.jkweilai.bank.entity.Account;
import com.jkweilai.bank.service.AccountService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("accountService")
@Transactional
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountMapper accountMapper;

    @Override
    public void transfer(String fromActno, String toActno, double money) {
        // 查询账户余额是否充足
        Account fromAct = accountMapper.selectByActno(fromActno);
        if (fromAct.getBalance() < money) {
            throw new RuntimeException("账户余额不足");
        }
        // 余额充足，开始转账
        Account toAct = accountMapper.selectByActno(toActno);
        fromAct.setBalance(fromAct.getBalance() - money);
        toAct.setBalance(toAct.getBalance() + money);
        int count = accountMapper.update(fromAct);

        // 模拟异常
        String s = null;
        s.toString();

        count += accountMapper.update(toAct);
        if (count != 2) {
            throw new RuntimeException("转账失败，请联系银行");
        }
    }
}

```

当前数据库表中的数据：

<img src="/images/spring/1666505321919-85dd9adb-bceb-49ef-826f-5a3ddf7699a0.png" width="362" height="130" title="" crop="0,0,1,1" id="ub41a6cea" class="ne-image" style="font-size: 16px">

执行测试程序：

<img src="/images/spring/1763901573349-937ac896-28c4-41a6-b719-d2f1c0f6a8d9.png" width="520" height="114" title="" crop="0,0,1,1" id="u7064538b" class="ne-image" style="font-size: 16px">

虽然出现异常了，再次查看数据库表中数据：

<img src="/images/spring/1666505321919-85dd9adb-bceb-49ef-826f-5a3ddf7699a0.png" width="362" height="130" title="" crop="0,0,1,1" id="F4ohV" class="ne-image" style="font-size: 16px">

通过测试，发现数据没有变化，事务起作用了。

### 事务属性

#### 事务属性包括哪些

<img src="/images/spring/1666506552984-8a4f9d42-73ba-4ded-853d-564d27340db5.png" width="849" height="838" title="" crop="0,0,1,1" id="u30f642cf" class="ne-image" style="font-size: 16px">

事务中的重点属性：

- 事务传播行为
- 事务隔离级别
- 事务超时
- 只读事务
- 设置出现哪些异常回滚事务
- 设置出现哪些异常不回滚事务

#### 事务传播行为

什么是事务的传播行为？

在 `service1` 类中有 `a()` 方法，在 `service2` 类中有 `b()` 方法，`a()` 方法上有事务，`b()` 方法上也有事务，当 `a()` 方法执行过程中调用了 `b()` 方法，事务是如何传递的？合并到一个事务里？还是开启一个新的事务？这就是事务传播行为。

事务传播行为在spring框架中被定义为枚举类型：

<img src="/images/spring/1666505960049-06173489-15fc-4d16-94f3-1a9025f85d8c.png" width="694" height="324" title="" crop="0,0,1,1" id="u26bc5c0e" class="ne-image" style="font-size: 16px">

一共有七种传播行为：

- REQUIRED：支持当前事务，如果不存在就新建一个(默认)**<font style="color:#E8323C;">【有就加入，没有就新建】</font>**
- SUPPORTS：支持当前事务，如果当前没有事务，就以非事务方式执行**<font style="color:#E8323C;">【有就加入，没有就不管了】</font>**
- MANDATORY：<font style="color:rgb(77, 77, 77);">必须运行在一个事务中，如果当前没有事务正在发生，将抛出一个异常</font>**<font style="color:#E8323C;">【有就加入，没有就抛异常】</font>**
- REQUIRES_NEW：<font style="color:#E8323C;">【不管有没有，直接开启一个新事务，开启的新事务和之前的事务不存在嵌套关系，之前事务被挂起，**挂起就是把当前事务暂停，等新事务完成后，再恢复继续执行，两者是完全独立的（回滚互不影响）**】</font>
- NOT_SUPPORTED：<font style="color:rgb(77, 77, 77);">以非事务方式运行，如果有事务存在，挂起当前事务</font>**<font style="color:#E8323C;">【不支持事务，存在就挂起】</font>**
- NEVER：<font style="color:rgb(77, 77, 77);">以非事务方式运行，如果有事务存在，抛出异常</font>**<font style="color:#E8323C;">【不支持事务，存在就抛异常】</font>**
- NESTED：<font style="color:rgb(77, 77, 77);">如果当前正有一个事务在进行中，则该方法应当运行在一个嵌套式事务中。被嵌套的事务可以独立于外层事务进行提交或回滚。如果外层事务不存在，行为就像REQUIRED一样。</font>**<font style="color:#E8323C;">【当前有事务的话，就在这个事务里再嵌套一个基于保存点的依赖子事务，嵌套的事务可以独立的提交和回滚。当前没有事务就和REQUIRED一样。嵌套事务的特点是：外层回滚会导致内层回滚】</font>**

<font style="color:rgb(77, 77, 77);">在代码中设置事务的传播行为：</font>

```java
@Transactional(propagation = Propagation.REQUIRED)
```

可以编写程序测试一下传播行为：**<font style="color:#DF2A3F;">需要分成两个类来进行测试，在一个类中测不出来，主要原因是Spring的事务管理是基于AOP代理的，而在同一个类内部的方法调用不会经过事务拦截器（不会经过代理）。</font>\*\***<font style="color:#117CEE;">本类中的 A 调用 B，一切以 A 的事务状态为准</font>\***\*<font style="color:#DF2A3F;">（或者说：B 的事务注解在本类内部调用时完全失效）。可以在上面银行账户转账的 </font>**`**<font style="color:#DF2A3F;">AccountService</font>**`**<font style="color:#DF2A3F;">中添加一个方法 </font>**`**<font style="color:#DF2A3F;">transfer2()</font>**`**<font style="color:#DF2A3F;">，该方法上不添加 </font>**`**<font style="color:#DF2A3F;">@Transactional</font>**`**<font style="color:#DF2A3F;">注解，让它调用 </font>**`**<font style="color:#DF2A3F;">transfer()</font>**`**<font style="color:#DF2A3F;">方法，然后再测试类中调用 </font>**`**<font style="color:#DF2A3F;">transfer2()</font>**`**<font style="color:#DF2A3F;">方法，你会发现即使</font>**`**<font style="color:#DF2A3F;">transfer()</font>**`**<font style="color:#DF2A3F;">方法上有 </font>**`**<font style="color:#DF2A3F;">@Transactional</font>**`**<font style="color:#DF2A3F;">注解，事务也是无效的，因为 </font>**`**<font style="color:#DF2A3F;">transfer2()</font>**`**<font style="color:#DF2A3F;">上没有事务。</font>**

```java
@Transactional(propagation = Propagation.REQUIRED)
public void save(Account act) {

    // 这里调用dao的insert方法。
    accountDao.insert(act); // 保存act-003账户

    // 创建账户对象
    Account act2 = new Account("act-004", 1000.0);
    try {
        accountService.save(act2); // 保存act-004账户
    } catch (Exception e) {

    }
    // 继续往后进行我当前1号事务自己的事儿。
}
```

```java
@Override
//@Transactional(propagation = Propagation.REQUIRED)
@Transactional(propagation = Propagation.REQUIRES_NEW)
public void save(Account act) {
    accountDao.insert(act);
    // 模拟异常
    String s = null;
    s.toString();

    // 事儿没有处理完，这个大括号当中的后续也许还有其他的DML语句。
}
```

#### <font style="color:rgb(77, 77, 77);">事务隔离级别</font>

在Spring代码中如何设置隔离级别？

隔离级别在spring中以枚举类型存在：

<img src="/images/spring/1666508609641-2c838566-7334-4cf1-b452-0fed9aaebf3d.png" width="390" height="217" title="" crop="0,0,1,1" id="u9ea08dc2" class="ne-image" style="font-size: 16px">

```java
@Transactional(isolation = Isolation.READ_COMMITTED)
```

测试事务隔离级别：READ_UNCOMMITTED 和 READ_COMMITTED

怎么测试：一个service负责插入，一个service负责查询。负责插入的service要模拟延迟。

```java
package com.jkweilai.bank.service.impl;

import com.jkweilai.bank.mapper.AccountMapper;
import com.jkweilai.bank.entity.Account;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

@Service("i1")
public class IsolationService1 {

    @Autowired
    private AccountMapper accountMapper;

    // 1号
    // 负责查询
    // 当前事务可以读取到别的事务没有提交的数据。
    //@Transactional(isolation = Isolation.READ_UNCOMMITTED)
    // 对方事务提交之后的数据我才能读取到。
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public void getByActno(String actno) {
        Account account = accountMapper.selectByActno(actno);
        System.out.println("查询到的账户信息：" + account);
    }

}

```

```java
package com.jkweilai.bank.service.impl;

import com.jkweilai.bank.mapper.AccountMapper;
import com.jkweilai.bank.entity.Account;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("i2")
public class IsolationService2 {

    @Autowired
    private AccountMapper accountMapper;

    // 2号
    // 负责insert
    @Transactional
    public void save(Account act) {
        accountMapper.insert(act);
        // 睡眠一会
        try {
            Thread.sleep(1000 * 20);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

}

```

测试程序

```java
@Test
public void testIsolation1(){
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring.xml");
    IsolationService1 i1 = applicationContext.getBean("i1", IsolationService1.class);
    i1.getByActno("act-004");
}

@Test
public void testIsolation2(){
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring.xml");
    IsolationService2 i2 = applicationContext.getBean("i2", IsolationService2.class);
    Account act = new Account("act-004", 1000.0);
    i2.save(act);
}
```

通过执行结果可以清晰的看出隔离级别不同，执行效果不同。

#### 事务超时

代码如下：

```java
@Transactional(timeout = 10)
```

以上代码表示设置事务的超时时间为10秒。

**<font style="color:#E8323C;">表示超过10秒如果该事务中所有的DML语句还没有执行完毕的话，最终结果会选择回滚。</font>**

默认值-1，表示没有时间限制。

```java
@Service("i2")
public class IsolationService2 {

    @Autowired
    private AccountMapper accountMapper;

    @Transactional(timeout = 10)
    public void save(Account account) {
        accountMapper.insert(account);
        try {
            Thread.sleep(1000 * 20);
            // 注意，数据库操作会触发事务的超时检查，而纯Java代码不会触发超时检查。
            // 因此在事务结束之前需要执行一个数据库的操作,CRUD都行。
            accountMapper.selectByActNo("act-001");
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
}

```

#### 只读事务

```java
@Transactional(readOnly = true)
```

**面试题：Spring 的事务如果设置为 `readOnly=true` 有什么用？**

**核心答案**

“设置 `readOnly=true` 主要有两个核心作用：第一是为了**性能优化**，第二是为了**声明代码意图**。”

**分点阐述**

1. **性能优化（最主要）**。 “它是一个给数据库和 ORM 框架的**优化提示**。特别是对于 Hibernate/JPA，它可以**跳过事务提交时的脏检查**，因为框架知道不会有数据更新，这能节省大量 CPU 资源。”
2. **声明意图与规范**。 “它在代码层面清晰地标明了这是一个**只读查询方法**，增强了可读性。同时，它也能在数据库读写分离的架构中，作为路由信号，**将查询操作自动指向从库**，减轻主库压力。”

**如果被追问“写了数据会怎样”**

“需要特别注意的是，它通常是一个**提示而非强制约束**。在大多数情况下，误操作写数据依然会成功。但有些平台，比如 Hibernate，可能会在提交时抛出异常。所以，我们不能依赖它来防止写操作，而应把它当作一种性能和规范上的最佳实践。”

**总结（一句话收尾）**

“所以，在我的项目中，我们会强制要求所有纯查询方法都加上 `@Transactional(readOnly = true)`，这既是为了性能，也是为了代码的清晰和规范。”

#### 设置事务的异常回滚规则

**核心机制：**  
在Spring框架的`@Transactional`注解中，事务回滚的默认行为是：

- **默认回滚**：遇到**运行时异常**（`RuntimeException`及其子类）和**错误**（`Error`及其子类）时，事务会自动回滚。
- **默认不回滚**：遇到**受检异常**（Checked Exception，即编译时异常），事务默认不会回滚。

**1. 设置特定异常触发回滚**

可以通过`rollbackFor`属性来覆盖默认规则，指定哪些异常（包括原本默认不回滚的受检异常）发生时也触发回滚。

```java
// 示例1：任何异常（包括所有运行时异常和受检异常）发生都回滚
@Transactional(rollbackFor = Exception.class)

// 示例2：发生IOException（受检异常）或任何运行时异常时，都触发回滚
@Transactional(rollbackFor = IOException.class)
```

**2. 设置特定异常不触发回滚**

可以通过`noRollbackFor`属性来指定即使发生了某些默认会回滚的异常（如运行时异常），事务也不回滚。

```java
// 示例：发生NullPointerException（运行时异常）时不回滚，但发生其他运行时异常或已配置的受检异常时仍会回滚。
@Transactional(noRollbackFor = NullPointerException.class)
```

**关键提醒：**

- `rollbackFor` 用于 **扩展** 回滚的异常范围。
- `noRollbackFor` 用于 **缩小** 回滚的异常范围。

# **<font style="color:#F5222D;">Bean的循环依赖问题</font>**

## **<font style="color:#F5222D;">什么是Bean的循环依赖</font>**

A对象中有B属性。B对象中有A属性。这就是循环依赖。我依赖你，你也依赖我。

比如：丈夫类Husband，妻子类Wife。Husband中有Wife的引用。Wife中有Husband的引用。

<img src="/images/spring/1665452274046-82594b87-2974-4e08-a6ab-2218d001d14f.png" width="347" height="162" title="" crop="0,0,1,1" id="E5pXI" class="ne-image">

```java
public class Husband {
    private String name;
    private Wife wife;
}

```

```java
public class Wife {
    private String name;
    private Husband husband;
}

```

## Spring 的重要策略

- **Singleton**：创建实例（`new`）出来之后，**会立即**把这个“半成品”对象放到公共缓存中，供其他 Bean 提前引用。
- **Prototype**：创建实例之后，**不会放到任何公共缓存中**，每次获取都是重新创建，创建完就交付，用完就销毁。

## **<font style="color:#F5222D;">singleton下的set注入的循环依赖没问题</font>**

我们来编写程序，测试一下在singleton+setter的模式下产生的循环依赖，Spring是否能够解决？

```java
public class Husband {
    private String name;
    private Wife wife;

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setWife(Wife wife) {
        this.wife = wife;
    }

    // toString()方法重写时需要注意：不能直接输出wife，输出wife.getName()。要不然会出现递归导致的栈内存溢出错误。
    @Override
    public String toString() {
        return "Husband{" +
                "name='" + name + '\'' +
                ", wife=" + wife.getName() +
                '}';
    }
}

```

```java
public class Wife {
    private String name;
    private Husband husband;

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setHusband(Husband husband) {
        this.husband = husband;
    }

    // toString()方法重写时需要注意：不能直接输出husband，输出husband.getName()。要不然会出现递归导致的栈内存溢出错误。
    @Override
    public String toString() {
        return "Wife{" +
                "name='" + name + '\'' +
                ", husband=" + husband.getName() +
                '}';
    }
}

```

```xml
<bean id="husbandBean" class="com.jkweilai.spring.bean.Husband" scope="singleton">
    <property name="name" value="张三"/>
    <property name="wife" ref="wifeBean"/>
</bean>
<bean id="wifeBean" class="com.jkweilai.spring.bean.Wife" scope="singleton">
    <property name="name" value="小花"/>
    <property name="husband" ref="husbandBean"/>
</bean>
```

```java
public class CircularDependencyTest {

    @Test
    public void testSingletonAndSet(){
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring.xml");
        Husband husbandBean = applicationContext.getBean("husbandBean", Husband.class);
        Wife wifeBean = applicationContext.getBean("wifeBean", Wife.class);
        System.out.println(husbandBean);
        System.out.println(wifeBean);
    }
}

```

执行结果：

<img src="/images/spring/1763786197531-47f4054d-19e8-4364-93e8-f7d366cdd880.png" width="358.4" height="67" title="" crop="0,0,1,1" id="Y4ovB" class="ne-image">

**<font style="color:#E8323C;">通过测试得知：在singleton + set注入的情况下，循环依赖是没有问题的。Spring可以解决这个问题。</font>**

## **<font style="color:#F5222D;">prototype下的set注入的循环依赖有问题</font>**

我们再来测试一下：prototype+set注入的方式下，循环依赖会不会出现问题？

```xml
<bean id="husbandBean" class="com.jkweilai.spring.bean.Husband" scope="prototype">
    <property name="name" value="张三"/>
    <property name="wife" ref="wifeBean"/>
</bean>
<bean id="wifeBean" class="com.jkweilai.spring.bean.Wife" scope="prototype">
    <property name="name" value="小花"/>
    <property name="husband" ref="husbandBean"/>
</bean>
```

执行测试程序：发生了异常，异常信息如下：

Caused by: org.springframework.beans.factory.**<font style="color:#E8323C;">BeanCurrentlyInCreationException</font>**: Error creating bean with name 'husbandBean': Requested bean is currently in creation: Is there an unresolvable circular reference?

    at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:265)

    at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:199)

    at org.springframework.beans.factory.support.BeanDefinitionValueResolver.resolveReference(BeanDefinitionValueResolver.java:325)

    ... 44 more

翻译为：创建名为“husbandBean”的bean时出错：请求的bean当前正在创建中：是否存在无法解析的循环引用？

通过测试得知，当循环依赖的**<font style="color:#F5222D;">所有Bean</font>**的scope="prototype"的时候，产生的循环依赖，Spring是无法解决的，会出现**<font style="color:#E8323C;">BeanCurrentlyInCreationException</font>**异常。

**<font style="color:#DF2A3F;">大家可以测试一下，以上两个Bean，如果其中一个是singleton，另一个是prototype，是没有问题的。</font>**

- 当一个是 `singleton`，另一个是 `prototype`。如果先实例化的是`prototype`的对象，同样有问题。
- 但实际情况是，`prototype`的对象是懒加载的，容器启动的时候会先创建 `singleton`的对象。因此就没有问题了。

为什么两个Bean都是prototype时会出错呢？由于是 prototype，因此会注入一个新的对象，新对象注入时又需要关联注入一个新对象。

## **<font style="color:#F5222D;">singleton下的构造注入产生的循环依赖</font>**

我们再来测试一下singleton + 构造注入的方式下，spring是否能够解决这种循环依赖。

```java
public class Husband {
    private String name;
    private Wife wife;

    public Husband(String name, Wife wife) {
        this.name = name;
        this.wife = wife;
    }

    // -----------------------分割线--------------------------------
    public String getName() {
        return name;
    }

    @Override
    public String toString() {
        return "Husband{" +
                "name='" + name + '\'' +
                ", wife=" + wife.getName() +
                '}';
    }
}

```

```java
public class Wife {
    private String name;
    private Husband husband;

    public Wife(String name, Husband husband) {
        this.name = name;
        this.husband = husband;
    }

    // -------------------------分割线--------------------------------
    public String getName() {
        return name;
    }

    @Override
    public String toString() {
        return "Wife{" +
                "name='" + name + '\'' +
                ", husband=" + husband.getName() +
                '}';
    }
}

```

```xml
<bean id="hBean" class="com.jkweilai.spring.bean2.Husband" scope="singleton">
    <constructor-arg name="name" value="张三"/>
    <constructor-arg name="wife" ref="wBean"/>
</bean>

<bean id="wBean" class="com.jkweilai.spring.bean2.Wife" scope="singleton">
    <constructor-arg name="name" value="小花"/>
    <constructor-arg name="husband" ref="hBean"/>
</bean>
```

```java
@Test
public void testSingletonAndConstructor(){
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring2.xml");
    Husband hBean = applicationContext.getBean("hBean", Husband.class);
    Wife wBean = applicationContext.getBean("wBean", Wife.class);
    System.out.println(hBean);
    System.out.println(wBean);
}
```

执行结果：发生了异常，信息如下：

Caused by: org.springframework.beans.factory.**<font style="color:#F5222D;">BeanCurrentlyInCreationException</font>**: Error creating bean with name 'hBean': Requested bean is currently in creation: Is there an unresolvable circular reference?

    at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.beforeSingletonCreation(DefaultSingletonBeanRegistry.java:355)

    at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.getSingleton(DefaultSingletonBeanRegistry.java:227)

    at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:324)

    at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:199)

    at org.springframework.beans.factory.support.BeanDefinitionValueResolver.resolveReference(BeanDefinitionValueResolver.java:325)

    ... 56 more

和上一个测试结果相同，都是提示产生了循环依赖，并且Spring是无法解决这种循环依赖的。

为什么呢？

**<font style="color:#F5222D;">主要原因是因为通过构造方法注入导致的：因为构造方法注入会导致</font>\*\***<font style="color:#722ED1;">实例化对象的过程</font>\***\*<font style="color:#F5222D;">和</font>\*\***<font style="color:#722ED1;">对象属性赋值的过程</font>\***\*<font style="color:#F5222D;">没有分离开，必须在一起完成导致的。</font>**

**<font style="color:#2F8EF4;">为什么 Spring 建议使用构造器注入？因为它在启动时可以快速发现循环依赖。</font>**

## **<font style="color:#F5222D;">Spring解决循环依赖的机理</font>**

面试题：Spring 是如何解决单例 Setter/字段注入的循环依赖的？

**<font style="color:#DF2A3F;">Spring通过 三级缓存+提前曝光 来解决单例 Setter/字段注入的循环依赖。</font>**

### **<font style="color:#F5222D;">三个缓存</font>**

<img src="/images/spring/1665456331018-18c45ae3-fa4c-4cd8-aabf-d9bace567693.png" width="1433" height="666" title="" crop="0,0,1,1" id="nHDhl" class="ne-image">

| **缓存级别** | **名称**                | **存储内容**          | **作用**                               |
| ------------ | ----------------------- | --------------------- | -------------------------------------- |
| **第一级**   | `singletonObjects`      | 完整的、成熟的Bean    | 对外提供最终可用的Bean                 |
| **第二级**   | `earlySingletonObjects` | 提前暴露的半成品 Bean | 解决循环依赖，存放早期引用             |
| **第三级**   | `singletonFactories`    | `ObjectFactory`       | **负责生成 bean 的早期引用或代理对象** |

### 只给一个缓存<font style="color:#DF2A3F;">既</font>存放成品<font style="color:#DF2A3F;">又</font>存放半成品不行吗

**不行**，因为一级缓存是全局共享的，如果放入半成品，其他线程在 Bean 创建完成前就可能获取到不完整的 Bean，导致**并发环境下属性为 null 或状态不一致**；而区分一级（成品）和二级（半成品）正是为了**隔离可见性**——只有当前创建链中的 Bean 能访问半成品，外部线程无法拿到未完成的对象。

### 三级缓存实现步骤

假设有两个类：

```java
@Component
public class A {
    private B b;
    @Autowired public void setB(B b) { this.b = b; }
}

@Component
public class B {
    private A a;
    @Autowired public void setA(A a) { this.a = a; }
}
```

第 1 步：创建 A

```latex
开始创建 A
  ├── 实例化 A（调用构造函数，A 变成"半成品"）
  ├── 将 A 的 ObjectFactory 放入三级缓存（提前暴露）
  │   singletonFactories.put("a", objectFactory)
  ├── 填充 A 的属性
  │   └── 发现需要 B → 去容器获取 B
  │       ├── 一级缓存有 B 吗？ ❌
  │       ├── 二级缓存有 B 吗？ ❌
  │       └── 三级缓存有 B 吗？ ❌
  │           └── 开始创建 B ⬇️
```

第 2 步：创建 B（此时 A 还在创建中）

```latex
开始创建 B
  ├── 实例化 B（B 变成"半成品"）
  ├── 将 B 的 ObjectFactory 放入三级缓存
  │   singletonFactories.put("b", objectFactory)
  ├── 填充 B 的属性
  │   └── 发现需要 A → 去容器获取 A
  │       ├── 一级缓存有 A 吗？ ❌（A 还没创建完）
  │       ├── 二级缓存有 A 吗？ ❌
  │       ├── 三级缓存有 A 吗？ ✅ 有！
  │       │   └── 通过 ObjectFactory 获取 A 的早期引用
  │       │       ├── 将 A 从三级缓存移到二级缓存
  │       │       │   earlySingletonObjects.put("a", aRef)
  │       │       │   singletonFactories.remove("a")
  │       │       └── 返回 A 的引用给 B
  │       └── B 的属性注入完成（拿到了 A 的半成品引用）
  ├── 执行 B 的初始化方法（@PostConstruct 等）
  └── 将完整的 B 放入一级缓存
      singletonObjects.put("b", b)
      earlySingletonObjects.remove("b")
      singletonFactories.remove("b")
```

第 3 步：回到 A，继续完成创建

```latex
回到 A 的创建（此时 B 已经创建完成）
  ├── A 的属性注入完成（拿到了完整的 B）
  ├── 执行 A 的初始化方法
  └── 将完整的 A 放入一级缓存
      singletonObjects.put("a", a)
      earlySingletonObjects.remove("a")
      singletonFactories.remove("a")
```

### 两个缓存不能解决吗？

**从“解决循环依赖”这个功能本身来说，两个缓存（一级+二级）确实“完全可以”**。  
**Spring 之所以非要三个缓存，不是为了解决“循环依赖”，而是为了解决“循环依赖 + AOP（动态代理）”这个复合问题。**

如果只有 **一级（成品）+ 二级（半成品）**，流程是这样的：

1. A 实例化 → 放入二级缓存（半成品）
2. A 填充属性，发现需要 B → 创建 B
3. B 实例化 → 放入二级缓存
4. B 填充属性，发现需要 A → 从二级缓存拿到 A（半成品）
5. B 完成创建 → 放入一级缓存
6. A 拿到完整的 B，完成创建 → 放入一级缓存

**对于普通 Bean（没有 AOP），这完全没问题，完美运行。**

**为什么偏要添加一个三级缓存？**

**因为 Spring 要支持 AOP（比如 `@Transactional`）。**

在 Spring 中，**<font style="color:#DF2A3F;">代理对象不是在实例化时生成的，而是在“初始化后”才能生成代理对象的</font>**<font style="color:#DF2A3F;">。</font>

**问题**：

- A 被 `@Transactional` 修饰，需要生成代理对象。
- 在步骤 4 中，B 需要注入 A。
- 但此时 A 还在“填充属性”阶段，**还没走到“初始化后”生成代理的那一步**。
- 如果二级缓存里存的是**原始对象 A**，B 拿到的就是原始对象，不是代理对象。
- 等 A 初始化完生成开始生成代理对象，**B 手里的 A 还是原始的，导致事务失效（<font style="color:#DF2A3F;">B 手里应该持久 A 的代理对象就没事了</font>）**。

**三级缓存如何完美解决？**

三级缓存不存“对象”，存的是 **“能生成对象的工厂”**。

- 当 B 需要 A 时，不是直接拿对象，而是**执行 A 的工厂**。
- 这个工厂会判断：**“A 需不需要代理？”**
  - 如果需要 → **现在就提前生成代理对象**，给 B 用。
  - 如果不需要 → 返回原始对象。
- 工厂生成的代理对象，会**存入二级缓存**（`earlySingletonObjects`）。
- 等 A 自己初始化完成后，Spring 发现 A 已经有一个代理对象了（在二级缓存里），**就不再重新生成**，直接用这个。

**不能把工厂也放到二级缓存吗？**

二级缓存（`earlySingletonObjects`）的类型是 `Map<String, Object>`，它存储的是“最终要使用的 Bean 实例（原始对象或代理对象）”。而工厂（`ObjectFactory`）是一个“生产者”，你不能把一个生产者当作产品塞进产品仓库里，否则后续消费者拿到的是一个工厂，而不是 Bean，调用方法时就会报 `ClassCastException`。

## 循环依赖的面试题

### Spring 是如何解决循环依赖的?

解决办法是：三级缓存+提前曝光。

接下来可以描述一个实际的步骤：

- 假设 A 中有 B，B 中有 A。
- 一上来会先实例化 A，此时 A 是一个半成品，会将 A 对应的 ObjectFactory 放到三级缓存中。
- 给 A 的属性 B 赋值，从一级二级三级中查找，都没有 B。
- 实例化 B，此时 B 也是一个半成品，会将 B 对应的 ObjectFactory 放到三级缓存中。
- **<font style="color:#DF2A3F;">给 B 的属性 A 赋值，从一级二级三级中查找，结果在三级缓存中找到 A 对应的 ObjectFactory 对象。</font>**
- **<font style="color:#DF2A3F;">ObjectFactory 会进行判断，如果 A 需要创建代理对象，ObjectFactory 会立即创建 A 对应的代理对象。将代理对象赋值给 B 的属性 A。如果不需要创建代理，则将原始 A 赋值给B 的属性 A。</font>**
- B 完成初始化（B 现在成熟了。是成品了。），将 B 的成品存放到一级缓存中。
- 继续给 A 的属性 B 赋值，将一级缓存中的成品 B 赋值给 A 的属性 B。
- A 完成初始化，将 A 的成品存放到一级缓存中。

### 两级缓存不行吗？为什么需要三个缓存？

两级缓存完全可以解决循环依赖，但是无法解决 AOP 代理问题。

主要原因是因为代理对象的创建时机是在“初始化”之后。

假设 A 中有 B，B 中有 A， 如果只有两级缓存，又正好 A 需要创建代理对象时，底层会导致 B 对象持有的 A 是原始对象而非代理对象。最终导致代理失效。引入三级缓存，三级缓存中存储的是 ObjectFactory 工厂对象，工厂对象创建 A 时，会判断 A 是否需要创建代理，不需要等到初始化之后，这样最终 B 对象持有是 A 对象的代理对象，代理不会失效。

# Spring中的八大模式

## 简单工厂模式

获取 bean 的时候可以通过简单工厂模式（静态工厂模式）来获取；

## 工厂方法模式

FactoryBean是典型的工厂方法模式。在配置文件中通过factory-method属性来指定工厂方法，该方法是一个实例方法。

## 单例模式

Spring用的是双重判断加锁的单例模式。请看下面代码，我们之前讲解Bean的循环依赖的时候见过：

<img src="/images/spring/1666663352271-4ba8d737-1e32-4f0e-b01a-aa305ad3abea.png" width="1190" height="839" title="" crop="0,0,1,1" id="u96f97bc2" class="ne-image" style="font-size: 16px">

## 代理模式

Spring的AOP就是使用了动态代理实现的。

## 装饰器模式

JavaSE中的IO流是非常典型的装饰器模式。

**IoC 容器中的 Bean 包装：**

```java
// Bean 的装饰器模式应用
BeanWrapper wrapper = new BeanWrapperImpl(targetObject);
```

Spring 使用装饰器来增强 Bean 的功能，如属性访问、类型转换等。

**<font style="color:#F5222D;">Spring中类名中带有：Decorator和Wrapper单词的类，都是装饰器模式。</font>**

## 观察者模式

### 什么是观察者模式

**观察者模式（Observer Pattern）** 定义了一种 **一对多** 的依赖关系：当一个 **被观察者** 的状态发生变化时，所有 **观察者** 都会收到通知并自动更新。

通俗理解：**"你订阅了我（被观察者）的动态，我一发消息，所有订阅的人（观察者）都能收到。"**

**观察者模式就是让被观察者持有所有观察者的引用，状态变化时遍历列表调用每个观察者的更新方法，实现"一对多"的自动通知。**

**代码示例：**

```java
import java.util.ArrayList;
import java.util.List;

// 被观察者：状态变化时会通知所有观察者
class Subject {
    private List<Runnable> observers = new ArrayList<>();  // 观察者列表

    public void addObserver(Runnable observer) {  // 注册观察者
        observers.add(observer);
    }

    public void notifyObservers() {  // 通知所有观察者
        observers.forEach(Runnable::run);
    }
}

// 使用
public class Main {
    public static void main(String[] args) {
        Subject subject = new Subject();  // 被观察者

        // 观察者1：用 Lambda 表达式实现 Runnable
        subject.addObserver(() -> System.out.println("观察者1收到通知"));

        // 观察者2：用 Lambda 表达式实现 Runnable
        subject.addObserver(() -> System.out.println("观察者2收到通知"));

        // 这里可能是 被观察者 的状态发生变化了...
        // 当被观察者发生状态变化时，通过这个方法来通知所有的观察者。
        subject.notifyObservers();
    }
}
```

### Spring 容器生命周期管理

在 `AbstractApplicationContext` 的 `refresh()` 方法中：

```java
public abstract class AbstractApplicationContext {

    private ApplicationEventMulticaster applicationEventMulticaster;  // 事件广播器（被观察者）
    private Set<ApplicationListener<?>> applicationListeners;        // 所有监听器（观察者）

    // Spring 容器启动的核心方法
    public void refresh() {
        // 1. 创建事件广播器
        initApplicationEventMulticaster();

        // 2. 把观察者注册到广播器
        registerListeners();

        // 3. 创建所有单例 Bean
        finishBeanFactoryInitialization();

        // 4. 容器启动完成，通知所有观察者
        publishEvent(new ContextRefreshedEvent(this));
    }

    // 发布事件：广播器通知所有观察者
    protected void publishEvent(ApplicationEvent event) {
        applicationEventMulticaster.multicastEvent(event);  // 遍历观察者列表，逐个执行
    }
}
```

**以上程序第四步，Spring 会通知所有的监听器：“容器已经启动完成了”，监听器（监听器是程序员自定义的）收到后可以执行一些初始化后的业务逻辑**，比如缓存预热、启动后的日志记录、或者启动一个定时任务等。

## 策略模式

**策略模式就是面向接口编程，用不同的实现类封装不同的算法，运行时通过切换实现类来改变行为，实现"开闭原则"（对扩展开放，对修改关闭）。**

**Resource 资源加载策略**

```java
// 策略接口
org.springframework.core.io.ResourceLoader

// 具体策略实现
ClassPathResourceLoader     // 类路径加载
FileSystemResourceLoader    // 文件系统加载
UrlResourceLoader          // 网络资源加载
ServletContextResourceLoader // Web应用加载
```

Spring 根据资源路径的前缀（`classpath:`、`file:`、`http:`）自动选择不同的加载策略。

**事务管理策略**

```java
// 策略接口
org.springframework.transaction.PlatformTransactionManager

// 具体策略
DataSourceTransactionManager    // JDBC事务
JpaTransactionManager          // JPA事务
HibernateTransactionManager    // Hibernate事务
JtaTransactionManager          // 分布式事务
```

根据不同的数据访问技术，选择对应的事务管理实现。

**特点：**

- 都有统一的策略接口
- 多个具体实现类
- 根据运行时条件动态选择策略

## 模板方法模式

Spring中的JdbcTemplate类就是一个模板类。它就是一个模板方法设计模式的体现。在模板类的模板方法execute中编写核心算法，具体的实现步骤在子类中完成。
