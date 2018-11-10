# Julia 介绍

欢迎阅读Julia 1.0 的文档。

请阅读已经发布的[博客文章](https://julialang.org/blog/2018/08/one-point-zero) ，从而了解该语言的总体概述和自Julia v0.6版 以来的许多变化。请注意，Version 0.7是与1.0一起发布的，为1.0版本之前的包和代码提供了升级路径。0.7和1.0之间唯一的区别是取消了弃用警告。有关0.6以来所有更改的完整列表，请参见[0.7版的发行说明](https://docs.julialang.org/en/v0.7.0/NEWS/)。

### 介绍

科学计算传统上要求最高的性能，然而相关领域中的专家在日常工作中大多转向速度较慢的动态语言。我们相信在这些应用程序中使用动态语言有很多很好的理由，而且我们也不认为它们会走下坡路。幸运的是，现代语言设计和编译器技术使我们有可能在很大程度上消除性能权衡，并提供一个具有足够生产力的环境来进行原型开发，以及为部署性能密集型应用程序提供足够高效的环境。Julia 编程语言填补了这一角色：它是一种灵活的动态语言，适合于科学计算和数值计算，其性能可与传统的静态类型语言相媲美。

因为Julia 的编译器不同于用于Python或R等语言的解释器，所以你可能会发现，Julia 的性能一开始是不直观的。如果你发现在做某些工作的时候很慢，我们强烈建议你在尝试进行其他工作任务之前先阅读 [PerformanceTips](https://docs.julialang.org/en/v1.0/manual/performance-tips/#man-performance-tips-1) 部分。一旦你理解了 Julia 是如何工作的，就很容易编写出与C一样快的代码。

Julia 的特点是可选类型、多分派和良好的性能，使用类型推断和[即时(JIT)编译](https://en.wikipedia.org/wiki/Just-in-time_compilation)实现，使用[LLVM](https://en.wikipedia.org/wiki/Low_Level_Virtual_Machine)实现。它是多范式的，结合了命令式、函数式和面向对象编程的特点。Julia为高级数值计算提供了易用性和表现力，其方式与R、MATLAB和Python等语言相同，但也支持通用编程。为了实现这一点，Julia建立在数学编程语言的世袭基础上，但也借鉴了许多流行的动态语言，包括[Lisp](https://en.wikipedia.org/wiki/Lisp_(programming_language)), [Perl](https://en.wikipedia.org/wiki/Perl_(programming_language)), [Python](https://en.wikipedia.org/wiki/Python_(programming_language)), [Lua](https://en.wikipedia.org/wiki/Lua_(programming_language)), 和 [Ruby](https://en.wikipedia.org/wiki/Ruby_(programming_language))。

Julia 与典型动态语言的最重要的不同之处在于：

  * 核心语言占少部分; Julia Base和标准库是用Julia编写的，包括整数运算等基本操作。
  * 用于构造和描述对象的丰富语言类型，也可以选择用于进行类型声明。
  * 通过[多分派](https://en.wikipedia.org/wiki/Multiple_dispatch)特性在多种参数类型组合中定义函数行为的能力。
  * 为不同的参数类型自动生成高效的专用代码
  * 良好的性能，接近像C这样的静态编译语言

虽然人们有时会说动态语言是“无类型的”，但其实并不是这样的：每个对象，无论是原始的还是用户定义的，都有一个类型。但是，大多数动态语言中缺少类型声明意味着无法向编译器指示值的类型，并且通常根本无法明确地讨论类型。另一方面，在静态语言中，虽然可以 - 通常必须 - 为编译器注释类型，但类型仅在编译时存在，并且不能在运行时进行操作或表达。在Julia中，类型本身就是运行时对象，也可以用于将信息传递给编译器。

虽然临时程序不需要显式声明类型或多分派，但它们是Julia的核心统一特性：函数在参数类型的不同组合上定义，并通过调度到最具体的匹配定义来应用。这个模型非常适合数学编程，对于第一个“拥有”操作的参数来说，这与传统的面向对象的调度一样不自然。运算符只是带有特殊符号的函数 - 为了扩展新的用户定义数据类型，你可以为`+`函数定义新的方法。然后，现有代码无缝地应用于新数据类型。

部分原因是运行时类型推断（由可选类型注释增强），部分原因是由于项目开始时对性能的强烈关注，Julia的计算效率超过了其他动态语言，甚至是静态编译的竞争对手语言。对于大规模的数值问题，速度始终是，持续的，并且可能始终是至关重要的：在过去的几十年中，处理的数据量很容易与摩尔定律保持同步。

Julia旨在以单一语言创建前所未有的易用性，功能和效率组合。除此之外，Julia系统性的一些优势包括：

  * 免费和开放源码 ([MIT licensed](https://github.com/JuliaLang/julia/blob/master/LICENSE.md))
  * 用户定义的类型和内置的类型一样快速和紧凑。
  * 不需要对代码进行向量化以获得性能；开发化的代码速度很快。
  * 面向并行和分布式计算的设计。
  * 轻量级“绿色”线程 ([coroutines](https://en.wikipedia.org/wiki/Coroutine))
  * 不显眼但功能强大的类型系统。
  * 针对数字和其他类型的优雅且可扩展的转换和升级。
  * 对[Unicode](https://en.wikipedia.org/wiki/Unicode)的有效支持，包括但不限于[UTF-8](https://en.wikipedia.org/wiki/UTF-8)。
  * 直接调用C函数(不需要包装器或特殊API)。
  * 强大的类shell功能，用于管理其他进程。
  * 类似lisp的宏和其他元编程工具。