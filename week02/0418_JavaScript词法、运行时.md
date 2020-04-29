## JavaScript 词法

> 本节课先从最基本的原子 Atom，也就是 JavaScript 中的词法说起

先介绍一个最基本的[字符集](https://zh.wikipedia.org/zh/字符编码)， [ASCII](https://zh.wikipedia.org/wiki/ASCII) 字符（由电报码发展而来，共 128 个）。

当今的字符集，都兼容了 ASCII 字符，并且码点都是一致的。所以从兼容性考虑，代码中使用到的字符要最好限制在 ASCII 范围内，最多也要在基本平面（BMP）范围。

Javascript 中使用的是 [Unicode](https://home.unicode.org/) 编码。

--------

**分析 JS 中的词法（输入）**

- InputElement
  - WhiteSpace（空格）
    - <TAB> *CHARACTER TABULATION* - 制表符
    - <VT> *LINE TABULATION* - 垂直制表符
    - <FF> *FORM FEED* - 换页
    - <SP> *SPACE* - 空格
    - <NBSP> *NO-BREAK SPACE* - 不断行空格
    - <ZWNBSP> *ZERO WIDTH NO-BREAK SPACE* - 零宽空格
    - <USP> Any other Unicode “Space_Separator” code point
  - LineTerminator（换行符）
    - <LF> *LINE FEED* - `/n`（建议使用）
    - <CR> *CARRIAGE RETURN* - `/r`
    - <LS> *LINE SEPARATOR* - `/u2028`分行符
    - <PS> *PARAGRAPH SEPARATOR* - `/u2029`分段符
  - Comment（注释）
    - *MultiLineComment* 多行注释
    - *SingleLineComment* 单行注释
  - Token（JS 中有效的输入元素）
    - *Punctuator* 操作符
    - *IdentifierName* 标识符
      - *Keywords*
      - *Identifier*
      - *Future reserved Keywords*
    - *Literal* 直接量
      - Number
        - IEEE 754 Double Float
          - Sign（1）- 符号位
          - Exponent（11）- 科学记数法部分
          - Fraction（52）- 精度部分
        - 语法
          - 十进制
            - `0`
            - `x`
            - `.x`
            - `1e3`
          - 二进制
            - `0bxx`
          - 八进制
            - `0o`
          - 十六进制
            - `0x`
        - 最佳实践
          - Safe Integer
            - `Number.MAX_SAFE_INTEGER`
          - Float Compare
            - `Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON`
      - String
        - Character
          - ASCII
          - Unicode
          - UCS
          - GB
            - GB2312
            - GBK（GB13000）
            - GB18030
          - ISO-8859
          - BIG5
        - Code Point
        - Encoding
          - UTF
        - Grammar 语法
          - `"abc"`
          - `'abc'`
          - ``` `abc` ```
      - Boolean
        - true
        - false
      - Null
      - Undefined



**名词解释**

1. 字符集：字符编码（英语：Character encoding）、字集码是把字符集中的字符编码为指定集合中某一对象（例如：比特模式、自然数序列、8 位组或者电脉冲），以便文本在计算机中存储和通过通信网络的传递。常见的例子包括将拉丁字母表编码成摩斯电码和 ASCII。其中，ASCII 将字母、数字和其它符号编号，并用 7 比特的二进制来表示这个整数。通常会额外使用一个扩充的比特，以便于以 1 个字节的方式存储。在计算机技术发展的早期，如 ASCII（1963 年）和 EBCDIC（1964 年）这样的字符集逐渐成为标准。但这些字符集的局限很快就变得明显，于是人们开发了许多方法来扩展它们。对于支持包括东亚 CJK 字符家族在内的写作系统的要求能支持更大量的字符，并且需要一种系统而不是临时的方法实现这些字符的编码。

2. Unicode：中文：万国码、国际码、统一码、单一码。是计算机科学领域里的一项业界标准。它对世界上大部分的文字系统进行了整理、编码，使得电脑可以用更为简单的方式来呈现和处理文字。

3. ASCII：（American Standard Code for Information Interchange，美国信息交换标准代码）是基于拉丁字母的一套电脑编码系统。它主要用于显示现代英语，而其扩展版本延伸美国标准信息交换码则可以部分支持其他西欧语言，并等同于国际标准 ISO/IEC 646。美国信息交换标准代码是这套编码系统的传统命名，互联网号码分配局现在更倾向于使用它的新名字 US-ASCII[2]。美国信息交换标准代码是美国电气和电子工程师协会里程碑之一。

4. NBSP ：不换行空格（英语：no-break space，NBSP）是空格字符，用途是禁止自动换行。HTML 页面显示时会自动合并多个连续的空白字符（whitespace character），但该字符是禁止合并的，因此该字符也称作“硬空格”（hard space、fixed space）。Unicode 码点为：U+00A0 no-break space。

5. 零宽空格：（zero-width space, ZWSP）是一种不可打印的 Unicode 字符，用于可能需要换行处。在 HTML 页面中，零宽空格可以替代。但是在一些网页浏览器（例如 Internet Explorer 的版本 6 或以下）不支持零宽空格的功能。

    

**参考资料**

1. [FileFormat Info](https://www.fileformat.info/info/unicode/)
2. [Unicode 与 JavaScript 详解](https://www.ruanyifeng.com/blog/2014/12/unicode.html)
3. [字符编码笔记：ASCII，Unicode 和 UTF-8](http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html)
4. [JavaScript特殊字符转义字符对照表](http://tools.jb51.net/table/javascript_escape)
5. [浮点数工具](https://github.com/camsong/blog/issues/9)

