# 每周总结可以写在这里

## 组件化基础

### 对象与组件

#### 对象

- Properties
- Methods
- Inherit

#### 组件

- Properties
  - 强调从属关系
- Methods
- Inherit
- Attribute
  - 强调描述性
- Config & State
- Event
- Lifecycle
- Children

---

一个轮播组件的设计

- state
  - activeIndex
- property
  - loop
  - time
  - imgList
  - autoplay
  - color
  - forward
- attribute
  - startIndex
  - loop
  - time
  - imgList
  - autoplay
  - color
  - forward
- children
  - append
  - remove
  - Add
- event
  - change
  - clcik
  - hover
  - swipe
  - resize
  - dbclick
- method
  - stop()
  - play()
  - next()
  - prev()
  - goto()
- config
  - mode: "useRAF","useTimeout"
