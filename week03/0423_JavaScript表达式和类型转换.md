# JavaScript 表达式和类型转换

> Atom -> Expression

## Expression 表达式

### Grammar 语法部分

#### Grammar Tree vs Priority

我们通常都是利用运算符优先级去理解表达式的优先级，而优先级又是利用表达式生成树的方式实现的：

- `+ -`
- `* /`
- `( )`

![运算符优先级vs树的结构](https://blog-1257793372.cos.ap-guangzhou.myqcloud.com/1588172011_20200425165753947_725661740.png)

---

**常见优先级高的运算符**

> 文档定义参考 ECMA-262：12.3 Left-Hand-Side Expressions

- Member
  - a.b
  - a[b]（赋予动态赋值 `b` 效果）
  - foo\`string\`（这种写法要求 `foo` 是函数，会执行 `foo` 函数，然后把普通字符串当成一个数组传入，再依次把其他变量当成参数传入函数）![](https://blog-1257793372.cos.ap-guangzhou.myqcloud.com/1588172012_20200428001008029_785263056.png)
  - super.b（`super` 只能在构造函数使用）
  - super['b']
  - new.target（`new.target` 只能在函数使用，判断是否被 `new` 调用）
  - new Foo()（`Foo()` 优先级比 `new Foo` 高）

Member Expression 返回的值属于 `Reference` 类型（只有 Member 运算会保持引用特性）

**Reference**

- 组成：
  - Object
  - Key

非 `Reference` 类型的值可以被具有『读』『写』能力的运算符操作，但是只有 `Reference` 类型的值可以被具有『写』能力的运算符操作。

- 具有『写』能力的运算符：
  - delete
  - assign

---

- New
  - new Foo

---

- Call
  - foo()
  - super()
  - foo()['b']（执行函数调用时，`Member` 访问的优先级会降低 ）
  - foo().b
  - foo()\`abc\`

#### Left hand side & Right hand side

一个场景的的表达式比如 `a.b = c;a + b = c;`

其中 `Member`、`New` 和 `Call` 三层合起来称为 **`Left Handside`** Expression（等号左边，必须产生 `Reference`）。

而 **`Right Handside`** Expression（等号右边）包含下面的运算符：

- Update
  - a ++
  - a --
  - -- a
  - ++ a
- Unary（单目）
  - delete a.b
  - void foo()（建议使用 `void xx` 代替 `undefined`）
  - typeof a
  - \+ a
  - \- a
  - ~ a
  - ! a
  - await a
- Exponential
  - \*\*（右结合）
- Multiplicative
  - \* / %
- Additive
  - \+ -
- Shift
  - << >> >>>
- Relationship
  - < > <= >= instanceof in
- Equality
  - ==
  - !=
  - ===
  - !==
- Bitwise
  - &
  - ^
  - |
- Logic（有短路逻辑，不会发生类型转换）
  - &&
  - ||
- Conditional（有短路逻辑，不会发生类型转换）
  - `? :`
- Comma（不会发生类型转换）
  - ,

### Runtime 运行时部分

#### Type Convertion（类型转换规则）

大部分运算符都会发生对应的类型转换，类型转换的规则如下：

![](https://blog-1257793372.cos.ap-guangzhou.myqcloud.com/1588172012_20200428224004358_491797260.png)

#### Boxing && Unboxing

**Boxing 装箱**

> 把基本类型（只有这四种可以）转换为对象就称为装箱

`Number`、`String`、`Boolean`，需要用 `new` 或者 `Object` 装箱

`Symbol` 只能用 `Object` 进行装箱

**Unboxing 拆箱**

> 把一个对象转换为基本类型就称为拆箱

```
var a = {
  valueOf() {
    return 1;
  },
  toString() {
    return "2";
  },
  // 如果加上这个，就会返回4
  // [Symbol.toPrimitive]() {
  //   return 3;
  // },
};
console.log(1 + a); // 2
```

- toPrimitive
  - 优先级最高，如果重写了这个方法，就只会用这个进行拆箱
- toString vs valueOf
  - 如果没有重写 `toPrimitive`，大部分情况优先调用 `valueOf`，再调用 `toString`（具体的优先规则需要查阅规范）

## 参考资料

1. [JavaScript 深入之从 ECMAScript 规范解读 this](https://github.com/mqyqingfeng/Blog/issues/7)
2. [运算符优先级](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)
