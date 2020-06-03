## CSS 普通规则的结构

`qualified rule` 主要由选择器和声明区块构成，声明区块由属性和值构成。

- Selector（选择器）
- Declaration（声明 `属性: 值`）
  - Key（[属性](https://www.w3.org/TR/css-variables/)）
  - Value（[值](https://www.w3.org/TR/css-values-4/)）
    - property（值的类型）
    - variable（函数）

## 选择器语法

- 简单选择器
  - \*
  - tagSelector 或 svg|a（`namespace`）
  - .cls
  - #id
  - [attr=v]
  - :
  - ::
- 复合选择器
  - <简单选择器><简单选择器><简单选择器>
  - \* 或 tagSelector 必须写在前面
  - 伪类和伪元素写在最后面
- 复杂选择器
  - <复合选择器>\<space\><复合选择器>
  - <复合选择器>">"<复合选择器> CSS3
  - <复合选择器>"~"<复合选择器> CSS3
  - <复合选择器>"+"<复合选择器> CSS3
  - <复合选择器>"||"<复合选择器> CSS4
- 选择器列表
  - 用逗号分隔的多个选择器

## 选择器优先级

**权重判断是没有顺序的，而且复杂选择器中的连接符不会影响权重**

- 简单选择器计数
  - 找出复合选择器中每类标签出现的次数，比如 `#id div.a#id` 可以得到 `[0, 2, 1 ,1]（分别对应 inline style/id/cls&attr&:/tagSelector&::）`，然后取一个足够大的 `N（1000000）` 进制，计算可得 `S = 0 * N^3 + 2 * N^2 + 1 * N^1 + + 1 * N^0 === 2000001000001`。
  - `!important` 不是一个好的解决方案，因为它会覆盖所有的样式规则，并且没有结构与上下文可言，所以尽量不要使用。

**练习题**

> `:not`、`*`、`body`、`attr`、`type`、`pseudo` 不参与权重计算

![](https://blog-1257793372.cos.ap-guangzhou.myqcloud.com/1591197364_20200601002353605_636043609.png)

### 参考文章

1. [CSS 权重介绍](https://www.w3cplus.com/css/css-specificity-things-you-should-know.html)
2. [MDN Specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity)

## 伪类

- 链接/行为
  - :any-link
  - :link :visited
  - :hover
  - :active
  - :focus
  - :target
- 树结构
  - :empty
  - :nth-child()
  - :nth-last-child()
  - :first-child :last-child :only-child
- 逻辑型
  - :not 伪类
  - :where :has

## 伪元素

- 伪元素
  - ::before
  - ::after
  - ::first-line（页面中渲染出来的第一行，不是代码中的第一行）
  - ::first-letter

**`first-line` 和 `first-letter` 的可用属性**

![](https://blog-1257793372.cos.ap-guangzhou.myqcloud.com/1591197366_20200601212142147_1958825344.png)

Q：为什么 `first-letter` 可以设置 `display:block` 之类的，而 `first-line` 不行呢?

A：因为设置了 `float` 属性后元素会脱离文档流（这样的话就和定义矛盾了），那么 `first-line` 就不会断的指向第一行（原本的第一行被脱离文档，这样就无法明确的知道第一行到底包含多少文字）造成无限循环。但是 `first-letter` 会找到第一个文字，所以可以做任何操作。

`first-line` 在排版的时候是直接把属性添加到文字上，而不是等渲染完再取第一行文字添加属性（否则的话不断改变 `first-line` 的字体大小，也会导致每次第一行的文字内容不一样）。换句话说，`first-line` 是作用于文字而不是盒。

而 `first-letter` 只会作用于第一个文字，是固定的，所以可以设置各种属性。
