## 什么是优秀的工程师

我们都希望做一个优秀的工程师，那么优秀的工程师应该怎么定义呢？我们可以从三个方面来思考这个问题：

- 领域知识
  - 对知识能够形成体系，在某些方面深入
- 能力&潜力
  - 编程能力（解决做不做得出来的问题）
  - 架构能力（解决做多大规模的问题）
  - 工程能力（解决多少人一起做的问题）
  - 潜力 - 基础（实践、分析、算法等）打的越好，越容易走的越高
- 职业规划（要有目标计划、时刻准备好、不断的寻找机会）
  - 工程师
  - 资深工程师
  - 专家
  - 经理

上面三点总结起来就是你的**成就**，**成就**越大，在专业的角度看来你就越优秀。

**领域知识和能力**

那么如何体现自己的优势（知识和能力）呢，毕竟 `Talk is cheap. Show me the code`。

最好的方法就是展示自己获得的成就（优秀的项目、社区分享等），所以我们在平时也要多注意分享、展示自己的能力。这点很重要，如果自己闷头学习，一来缺少和别人的交流，不知道这个走的方向对不对；二来就算你是大牛，别人也不知道。

**职业规划**

我们很多人都没仔细做过自己的职业规划，其实好的职业规划可以说是一个正向循环：

首先，为了朝着目标前进，必然会努力去学习成长；进而获得更多的成就；最后才有可能获得晋升机会；

最终获得晋升机会后，又会提升自己的视野和见解，从而又促使自己去成长。

![](https://blog-1257793372.cos.ap-guangzhou.myqcloud.com/1586921880_20200414220221869_1202591944.png)

## 工程师的成就分类

上面提到我们要尽可能的提高自己的成就，而专业方面的成就分为下面三种：

### 业务型成就

对于公司来说，还是很重视业务型人才的，毕竟公司是要赚钱的。所以要求我们精通业务、善于思考，有自己的思考体系和流程（如何提高公司盈利）。

- 业务目标
  - 理解公司业务的核心目标（如何挣钱）
  - 目标转化指标
- 技术方案
  - 业务指标到技术指标的转化
  - 形成纸面方案、完成小规模试验
- 实施方案
  - 确定实施目标、参与人
  - 管理实施进度
- 结果评估
  - 数据采集、数据报表
  - 向上级汇报

上面这点在工作中还是比较少考虑的，一般只是去完成产品的需求，后续应该多关注一下这些点。

### 技术难题

这个没有什么好说，只要是某个领域内的专家，肯定会被重视的。

- 目标
  - 公认的技术难点（公司/行业）
- 方案与实施
  - 依靠扎实的编程能力、架构能力形成解决方案
- 结果
  - 问题解决

### 工程型成就

不断提高项目的质量与效率（大部分工程师都是解决这类问题）。

- 目标
  - （有效的提升）质量、效率
- 方案与实施
  - 规章制度
  - 库
  - 工具
  - 系统
- 结果
  - 线上监控

## 前端技能模型

![](https://blog-1257793372.cos.ap-guangzhou.myqcloud.com/1586921883_20200414224033282_757096308.png)

领域知识、前端知识、编程能力这些都要靠自己多练多学多总结。但是架构能力和工程能力目前已经有一些比较好的方向可以参考。

### 架构能力

> 解决做多大规模的问题

架构能力主要就是**组件化**。

**技术架构**

客户端架构：解决软件需求规模带来的复杂性
服务端架构：解决大量用户访问带来的复杂性
前端架构：解决大量页面需求带来的重复劳动问题（**复用**）

对于前端架构来说，目的主要就是解决重复劳动，所以我们可以通过下面三个方向来设计技术架构：

- 库：有复用价值的代码
  - URL([标准](https://tools.ietf.org/))
  - AJAX
  - ENV（判断环境）
- 组件：UI 上多次出现的元素
  - 轮播
  - Tab
- 模块：经常被使用的业务区块
  - 登录

组件的定义和基础设施，就是**组件化方案**。

### 工程能力

> 解决多少人一起做的问题

工程能力包含**工具链**和**持续集成**。

**工具链**

- 工具链的作用
- 工具的分类
  - 脚手架（init）
  - 本地调试（run）
  - 单元测试（test）
  - 发布（publish）
- 工具链体系的涉及
  - 版本问题
  - 数据统计

**持续集成**

- 客户端软件持续集成
  - Daily build（日常 build）
  - BVT（版本验证测试）
- 前端持续继承
  - Check-in build（每次提交都 build）
  - Lint + Rule Check

## 解决问题的思考方式

工程师的一般思路都是：发现问题 -> 解决问题，但其实这不是一个很完善的思考方式。

我们应该使用**数据驱动**的思考方式。

1. 目标（解决问题第一步都应该是分析）
   - 分析业务目标、定数据指标（如：日活/月活）
2. 现状（要有当前数据，最后才有对比）
   - 采集数据、建立数据展示系统
3. 方案（要有预估值，才能说服别人配合）
   - 设计技术方案、预估数据
4. 实施
   - 小规模实验、推广全公司落地形成制度
5. 结果（很重要，不汇报相当于没做）
   - 统计最终效果汇报

因为绝大部分公司最关心的是还是业务（如何赚更多钱），所以我们要围绕着这些数据/指标进行思考，你做了什么导致这些指标有了明显提升（了解公司想要什么，才能取得晋升）。

我们作为一个工程师，千万不能只是满足于单单解决自己眼前的问题，不要自己设限（多点了解别人想要的），这样才能得到大家认可（晋升）。

![](https://blog-1257793372.cos.ap-guangzhou.myqcloud.com/1586921882_20200414222917606_1994200891.png)

## 两种学习方式

### 整理法

整理知识体系，可以从完备性的纬度去思考，包含以下几种关系：

- 顺序关系（如编译顺序）
- 组合关系（如：CSS 规则组合关系）
- 纬度关系（如：JavaScript 不同纬度，文法/语义/运行时）
- 分类关系（如：CSS 简单选择器）

**一个完整的体系，父子节点之间，不会再有其他节点。**

### 追溯法

世界上的知识千千万万，很多知识不一定有用，但他们的意义在于提供一个『线索』，有了这个线索，我们就可以了进一步了解相关知识，进而整合到自己的知识体系。

- 源头
  - 最早出现的论文、杂志
  - 最初的实现案例
- 标准和文档
  - w3.org
  - developer.mozilla.org
  - msdn.microsoft.com
  - 等
- 大师（查看他们发表的论文、相关书籍）
  - Tim Berners-Lee
  - Brendan Eich
  - Bjarne Stroustrup
  - 等

## 小结

本周的学习没有涉及技术方面，主要还是从一个更高的角度去认知：

首先，是了解了建立自己知识体系的重要性，可以通过**整理法**和**追溯法**不断完善自己的知识体系，形成了自己的体系后方便自己查漏补缺、快速定位问题。

其次，是了解作为一名优秀的工程师应该必备的能力，给自己后面的学习提供了一个方向。

最后，是改变自己的思维方式。关于职业规划、关于如何去思考解决问题。
