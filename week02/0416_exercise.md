# BNF 定义四则运算符 

```
// demo - 用 BNF 定义一个只有 a/b 字符串的语言
<Program> ::= "a"+ | "b"+
// 可递归
<Program> ::= <Program> "a"+ | <Program> "b"+
```

--------

1. 定义数字

```
<Number> ::= "0" | "1" | "2" | ... | "9"
```

2. 定义十进制整数

```
<DecimalNumber> ::= "0" | (("1" | "2" | ... | "9") <Number>* )
```

```
// 使用正则定义十进制整数，这样就可以不用 <Number> 的定义，所以大部分语言都用正则进行词法分析
<DecimalNumber> ::= "0" | /0|[1-9][0-9]*/
```

3. 定义加法

```
// 连加
<AdditiveExpression> ::= <DecimalNumber> "+" <DecimalNumber>
// 支持连加的加法
<AdditiveExpression> ::= <AdditiveExpression> "+" <DecimalNumber>

// 最终整合
<AdditiveExpression> ::= <DecimalNumber> | 
  <AdditiveExpression> "+" <DecimalNumber>
```

4. 四则运算-乘法 & 除法（考虑运算符优先级）

```
<MultiplicativeExpression> ::= <DecimalNumber> | 
  <MultiplicativeExpression> "*" <DecimalNumber> | 
  <MultiplicativeExpression> "/" <DecimalNumber>
```

5. 四则运算-加法 & 减法（考虑运算符优先级）

```
<AdditiveExpression> ::= <MultiplicativeExpression> | 
  <AdditiveExpression> "+" <MultiplicativeExpression> |
  <AdditiveExpression> "-" <MultiplicativeExpression>
```

6. 逻辑表达式

```
<LogicalExpression> ::= <AdditiveExpression> | 
  <LogicalExpression> "||" <AdditiveExpression> | 
  <LogicalExpression> "&&" <AdditiveExpression> 
```

7. 带括号优先级的表达式

```
<PrimaryExpression> ::= <DecimalNumber> | 
  "(" <LogicalExpression> ")"
```



