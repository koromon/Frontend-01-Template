## 一、Numeric Literals

### 1. 答案

先上答案，用的是比较笨的方法一个个拼上来 😂：

`/(^0[xX][0-9a-fA-F]+$)|(^0[oO][0-7]+$)|(^0[bB][01]+$)|((^0$|^[1-9]\d*)(.\d+)?([eE][+-]?\d+)?$)|(^(.\d+)([eE][+-]?\d+)?$)/`



### 2. 逐步分析

JS 标准中的数字直接量定义如下：

_NumericLiteral_ **::**

​	_DecimalLiteral_

​	_BinaryIntegerLiteral_

​	_OctalIntegerLiteral_

​	_HexIntegerLiteral_



**十六进制**

_HexIntegerLiteral_ **::**

​	**0x** _HexDigits_

​	**0X** _HexDigits_

_HexDigits_ **::**

​	_HexDigit_

​	_HexDigits HexDigit_

_HexDigit_ **:: one of**

​	**0 1 2 3 4 5 6 7 8 9 a b c d e f A B C D E F**

按照标准十六进制是由 `0x/0X` 开头，至少出现一个 `[0-9a-fA-F]` 结尾的字面量，所以答案是：

`/^0[xX][0-9a-fA-F]+$/`



**八进制**

_OctalIntegerLiteral_ **::**

​	**0o** _OctalDigits_

​	**0O** _OctalDigits_

_OctalDigits_ **::**

​	_OctalDigit_

​	_OctalDigits OctalDigit_

_OctalDigit_ **:: one of**

​	**0 1 2 3 4 5 6 7**

同理得到匹配八进制的正则为：

`/^0[oO][0-7]+$/`



**二进制**

_BinaryIntegerLiteral_ **::**

​	**0b** _BinaryDigits_

​	**0B** _BinaryDigits_

_BinaryDigits_ **::**

​	_BinaryDigit_

​	_BinaryDigits BinaryDigit_

_BinaryDigit_ **:: one of**

​	**0 1**

同理得到匹配二进制的正则为：

`/^0[bB][01]+$/`



**十进制**

_DecimalLiteral_ **::**

​	_DecimalIntegerLiteral_ **.** _DecimalDigits(opt)_ _ExponentPart(opt)_

​	**.** _DecimalDigits ExponentPart(opt)_

​	_DecimalIntegerLiteral ExponentPart(opt)_

_DecimalIntegerLiteral_ **::**

​	**0**

​	_NonZeroDigit DecimalDigits(opt)_

_DecimalDigits_ **::**

​	_DecimalDigit_

​	_DecimalDigits DecimalDigit_

_DecimalDigit_ **:: one of**

​	**0 1 2 3 4 5 6 7 8 9**

_NonZeroDigit_ **:: one of**

​	**1 2 3 4 5 6 7 8 9**

_ExponentPart_ **::**

​	_ExponentIndicator SignedInteger_

_ExponentIndicator_ **:: one of**

​	**e E**

_SignedInteger_ **::**

​	_DecimalDigits_

​	**+** _DecimalDigits_

​	**-** _DecimalDigits_

**DecimalIntegerLiteral**：`/^0$|^[1-9]\d*$/`

**DecimalIntegerLiteral . DecimalDigits(opt)**：`/(^0|^[1-9]\d*).\d+$/`

**DecimalIntegerLiteral . DecimalDigits(opt) ExponentPart(opt)**：`/(^0|^[1-9]\d*).\d+[eE][+-]?\d+$/`

**DecimalIntegerLiteral ExponentPart(opt)**: `/(^0$|^[1-9]\d*)[eE][+-]?\d+$/`

**综合上面四个**：`(^0$|^[1-9]\d*)(.\d+)?([eE][+-]?\d+)?$`



**. DecimalDigits**: `/^.\d+$/`

**. DecimalDigits ExponentPart(opt)**: `/^.\d+[eE][+-]?\d+$/`

**综合上面两个**：`/^(.\d+)([eE][+-]?\d+)?$/`



### 3. 参考资料

1. [《JS 正则迷你书》](https://github.com/qdlaoyao/js-regex-mini-book)



## 二、UTF-8 Encoding

### 1. 代码

[在线预览](https://koromon.github.io/FEStudy/JavaScript/Token/decoder.html)

```javascript
function utf8Encoder(words) {
  let map = {}; // 缓存
  let encodedStr = ""; // 返回值

  for (const word of words) {
    const codePointDecimal = word.codePointAt(); // 取得码点

    if (map[word]) {
      encodedStr += map[word];
      continue;
    }

    // 判断码点范围
    let type; // 用于判断字节长度的变量
    if (codePointDecimal <= +"0x007F") {
      type = 1;
    } else if (codePointDecimal >= +"0x0080" && codePointDecimal <= +"0x07FF") {
      type = 2;
    } else if (codePointDecimal >= +"0x0800" && codePointDecimal <= +"0xFFFF") {
      type = 3;
    } else if (
      codePointDecimal >= +"0x10000" &&
      codePointDecimal <= +"0x10FFFF"
    ) {
      type = 4;
    }

    // 创建数组集合存储字节
    let arrs = [];
    for (let i = 0; i < type; i++) {
      let arr = [];
      if (i === 0) {
        if (type === 1) {
          arr.push("0");
        } else {
          arr.push("1".repeat(type) + "0");
        }
      } else {
        arr.push("10");
      }
      arrs.push(arr);
    }

    // 获取码点的二进制表达
    let binaryStr = Number(codePointDecimal).toString(2);

    // 从后向前填入二进制字符串
    for (let i = arrs.length - 1; i >= 0; i--) {
      let arr = arrs[i]; // 当前字节数组
      let gap = 8 - arr[0].length;
      arr[0] = arr[0] + binaryStr.slice(-gap).padStart(gap, 0); // 每个数组补足八位，不足填 0
      binaryStr = binaryStr.slice(0, binaryStr.length - gap);
    }

    // 每个字节转换为16进制后拼接
    let encodedWord = arrs
      .map((item) => {
        return (
          "\\x" +
          Number("0b" + item[0])
            .toString(16)
            .toUpperCase()
        );
      })
      .join("");

    encodedStr += encodedWord;

    if (!map[word]) {
      map[word] = encodedWord;
    }
  }
  return encodedStr;
}
```



## 三、String Literals

### 1. 答案

这个太复杂了还没整合起来。。先把定义中简单的部分用正则表达了



### 2. 逐步分析

JS 标准中字符直接量的定义



*StringLiteral* **::**

​	**"** *DoubleStringCharacters*(opt) **" **

​	**'** *SingleStringCharacters*(opt) **'**



*DoubleStringCharacters* **::** 

​	*DoubleStringCharacter DoubleStringCharacters*(opt)



*SingleStringCharacters* **::** 

​	*SingleStringCharacter SingleStringCharacters*(opt)



*DoubleStringCharacter* **::** 

​	*SourceCharacter* but not one of **"** or **\\** or *LineTerminator* `/[^\\\n\r\u2028\u2029]/`

​	<LS>

​	<PS>

​	**\\** *EscapeSequence*

​	*LineContinuation*



*SingleStringCharacter* **::**

​	*SourceCharacter* but not one of **'** or **\\** or *LineTerminator*

​	<LS>

​	<PS>

​	**\\** *EscapeSequence*

​	*LineContinuation*



*LineContinuation* **::**

​	**\\** *LineTerminatorSequence*



*EscapeSequence* **::**

​	*CharacterEscapeSequence*

​	**0** [lookahead ∉ *DecimalDigit*]  `/0[(?=\d)/]`

​	*HexEscapeSequence* 

​	*UnicodeEscapeSequence*



*CharacterEscapeSequence* **::**

​	*SingleEscapeCharacter*

​	*NonEscapeCharacter*



*SingleEscapeCharacter* **:: one of**

​	**' " \ b f n r t v**

`/['"\\bfnrtv]{1}/`



*NonEscapeCharacter* **::**

​	*SourceCharacter* but not one of *EscapeCharacter* or *LineTerminator*

`/[^'"\\bfnrtv\dxu]/`



*EscapeCharacter* **::**

​	*SingleEscapeCharacter*

​	*DecimalDigit*

​	**x**

​	**u**

`/['"\\bfnrtv]|\d|x|u/`



*HexEscapeSequence* **::**

​	**x** *HexDigit HexDigit*

`/x[0-9a-fA-F]{2}/`



*UnicodeEscapeSequence* **::**

​	**u** *Hex4Digits*

​	**u{** *CodePoint* **}**

`/u[0-9a-fA-F]{4}|u\{(10|0?[0-9a-fA-F])[0-9a-fA-F]{4}\}/`



*Hex4Digits* **::**

​	*HexDigit HexDigit HexDigit HexDigit*

`/[0-9a-fA-F]{4}/`



*LineTerminator* **::** 
	<LF> `/\n/`

​	<CR> `/\r/`

​	<LS> `/\u2028/`

​	<PS> `/\u2029/`



*LineTerminatorSequence* **::** 

​	<LF>

​	<CR>[lookahead ≠ <LF>] `/\r(?!\n)/`

​	<LS>

​	<PS>

​	<CR><LF> `/\n\t/`

### 3. 参考资料

1. [《JS 正则迷你书》](https://github.com/qdlaoyao/js-regex-mini-book)
2. [JavaScript特殊字符转义字符对照表](http://tools.jb51.net/table/javascript_escape)

