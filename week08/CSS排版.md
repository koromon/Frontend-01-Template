## 排版

### 盒（Box）

标签（Tag）、元素（Element）和盒（Box）的关系：

- HTML 代码中可以书写开始**标签**，结束**标签**，和自封闭**标签**
- 一对起止**标签**，表示一个**元素**
- DOM 树中存储的是**元素**和其它类型的节点（Node）
- CSS 选择器选中的是**元素**
- CSS 择器选中的**元素**，在排版时可能产生多个**盒**
- 排版和渲染的基本单位是**盒**

#### 盒模型

有两种盒模型、可以通过 `box-sizing` 设置。

- box-sizing
  - content-box
  - border-box

### 正常流（normal flow）

#### 正常流排版

排版计算过程：

- 收集盒进行
- 计算盒在行中的排布
- 计算行的排布

#### 正常流的行模型

相关名词：

- **IFC**：inline formatting context
- **BFC**：block formatting context
- **block-level** 表示可以被放入 bfc
- **block-container** 表示可以容纳 bfc
- `block-box = block-level + block-container`
- **block-box** 如果 overflow 是 visible， 那么就跟父 BFC 合并

关键概念：

- baseline
- float 与 clear
- margin 与折叠

### 相关文章

1.  [如何解决外边距叠加的问题？](https://www.zhihu.com/question/19823139)

### Flex

#### Flex 排版

排版计算过程：

- 收集盒进行
- 计算盒在主轴方向的排布
- 计算盒在交叉轴方向的排布
