# JavaScript 语句

> Atom -> Expression -> Statement

## Grammar

### 简单语句

> 语句的最基本组成单位

- ExpressionStatement（`a = 1 + 2;`）
- EmptyStatement（`;`）
- DebuggerStatement（`debugger;`）
- ThrowStatement（`throw a;`）
- ContinueStatement（`continue label1;`）
- BreakStatement（`break label2;`）
- ReturnStatement（`return 1 + 2;`）

### 组合（复合）语句

> 可以嵌套其他语句

- BlockStatement

  ```
  // { 开头会被理解为语句块
  // 正常情况会依次执行里面的语句
  {
      // a: 会被理解 BlockStatemnt 中的 label
      a: 1;
      // 如果 block 内部产生了非 normal 类型的状态就会中断执行
      throw 1;
      let b = 2;
  }

  - [[type]]: normal
  - [[value]]: --
  - [[target]]: --
  ```

- IfStatement
- SwitchStatement
- WithStatement
- TryStatement
  - try

    ```
    // { 不能省略
    try {
      // 语句
    } catch (声明) {
      // 产生作用域
      // 语句
    } finally {
      // 语句
    }

    [[type]]: return
    [[value]]: --
    [[target]]: label
    ```

**标签、循环、break、continue**

    ```
    [[type]]: break continue
    [[value]]: --
    [[target]]: label
    ```

- LabelledStatement
- IterationStatement（可以消费 `label`）
  - Iteration
    ![](https://blog-1257793372.cos.ap-guangzhou.myqcloud.com/1588172132_20200429072006589_1511191139.png)
  - while()
    - 会根据语句中的返回值改变 `Completion Record`
    - 会消费 `continue`、`break`
  - do ... while ();
  - for(;;)
  - for(... in ...)
    - `for in` 循环中的表达式里不允许使用 `in`
  - for(... of ...)
    - 一般用在数组和 `generator` 中循环
  - for await( of )
- SwitchStatement（可以消费 `label`）
- ContinueStatement
- BreakStatement

### 声明

> 可能产生特殊的行为

- FunctionDeclaration `function`
  - 必须要有名字，可以出现在语句开头
- GeneratorDeclaration
  - 可以看成特殊的函数 `function* foo(){}`
- AsyncFunctionDeclaration `async function`
- AsyncGeneratorDeclaration `async function*`
- VariableDeclaration `var`
  - `var` 一定会提升到函数顶部（就算写在 `return` 后），所以 `var` 声明一定尽可能提前写
    ```
    var x = 0;
    function foo() {
      var o = { x: 1 };
      x = 2;
      with (o) {
        // 虽然这里的 x 作用于 o 的作用域，但是声明也会提升到函数顶部
        var x = 3;
        // 如果没有声明，不影响上面的 x 变量
        // x = 3;
      }
      console.log(x);
    }
    foo();
    console.log(x);
    ```
  - 最佳实践：减少使用转而用 `let/const` 代替
- ClassDeclaration `class`
  - BoundNames
- LexicalDeclaration `let/const`

## Runtime

> 规范类型（Reference、List、Completion、Property Descriptor、Property Identifier、Lexical Environment、and Environment Record），它们的作用是用来描述语言底层行为逻辑。

### Completion Record

> 语句执行完成的状态描述，`type` 可以控制语句的执行

- [[type]]: normal, break, continue, return, or throw（控制语句是否执行）
- [[value]]: Types（七种基本类型或者空）
- [[target]]: label（匹配作用，常用在循环语句进行消费）

### Lexical Environment

> 作用域

---

# Types 类型

- Number
- String
- Boolean
- Object
- Null
- Undefined
- Symbol

## Object

> 任何一个对象都是**唯一**的，这与它本身的状态无关。即使状态完全一致的两个对象也并不相等。
> 我们用**状态**来描述对象，状态的改变即是**行为**。

对象的特性：

- unique identifier 唯一性
- behavior 行为
- state 状态

### Object - Class

![](https://blog-1257793372.cos.ap-guangzhou.myqcloud.com/1588172133_20200429221331308_1901837478.png)

类是一种常见的描述对象的方式，而『归类』和『分类』则是两个主要的流派。

对于『归类』方法而言，多继承是非常自然的事情。比如 C++

对于『分类』而言，则是单继承结构。并且会有一个基类 Object。比如 Java

### Object - Prototype

![](https://blog-1257793372.cos.ap-guangzhou.myqcloud.com/1588172133_20200429221312230_300380104.png)

原型是一种更接近人类原始认知的描述对象的方法。

我们并不试图做严谨的分类，而是采用『相似』这样的方式去描述对象。

任何对象仅仅需要描述它自己与原型的区别即可。

**最佳实践**

Q：狗咬人，『咬』这个行为该如何使用对象抽象？

A：状态的改变即是**行为**，在设计对象的状态和行为时（不应该收到日常语言干扰），我们应该一直遵循**行为改变状态**的原则。

```
class Human {
  hurt(damage) {
    // ...
  }
}
```

### Object in JavaScript

> JavaScript 运行时的对象系统和其他 C 系语言有着很大区别

在 JavaScript 运行时，原生对象的描述方式非常简单，我们只需要关心原型和属性两个部分（对象里面有一堆属性和一个原型）。

![](https://blog-1257793372.cos.ap-guangzhou.myqcloud.com/1588172133_20200429222442654_1035890798.png)

JavaScript 中用属性（键值对关系）来统一抽象对象状态和行为：

- key
  - Symbol
  - String
- value
  - Data Property（数据属性，一般用于描述状态）
    - value
    - writable
    - enumerable
    - configurable
  - Accessor Property（访问器属性，一般用于描述行为）
    - get
    - set
    - enumerable
    - configurable

#### 原型链

当我们访问属性的时候，如果当前对象没有，就会沿着原型逐级往上找，这就有了『原型链』的说法。

这一算法保证了每个对象只要描述自己和原型的区别即可。

#### Object API/Grammar

- 基本用法
  - {} . [] Object.defineProperty
- 原型相关
  - Object.create / Object.setPrototypeOf / Object.getPrototypeOf
- 基于类
  - new / class / extends
- 模拟类（不推荐）
  - new / function / prototype

#### Function Object

JavaScript 中还有一些特殊的对象，比如函数对象。

函数对象除了一般对象的属性和原型，还有一个行为 `[[call]]`（通过 `function` 关键字、箭头运算符或者 `Function` 构造器创建的对象都会有这个行为）

我们用类似 `f()` 这样的语法把对象当作函数调用时，会访问到 `[[call]]` 这个行为，如果对应的对象没有 `[[call]]` 行为则会报错。

#### Special Object

JavaScript 还有一些其他的特殊对象，比如 `Array [[length]]`、`Object.prototype [[setPrototypeOf]]` 等。
