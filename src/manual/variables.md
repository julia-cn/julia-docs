# Julia 变量

在Julia中，变量是与值关联(或绑定)的名称。当您想要存储一个值(例如，在经过某种数学运算后得到的值)以供以后使用时，它是很有用的。例如：

```
# Assign the value 10 to the variable x
julia> x = 10
10

# Doing math with x's value
julia> x + 1
11

# Reassign x's value
julia> x = 1 + 1
2

# You can assign values of other types, like strings of text
julia> x = "Hello World!"
"Hello World!"
```

Julia为命名变量提供了一个非常灵活的系统。变量名称区分大小写，并且没有语义含义（也就是说，语言不会根据名称对变量进行不同的处理）。

```
julia> x = 1.0
1.0

julia> y = -3
-3

julia> Z = "My string"
"My string"

julia> customary_phrase = "Hello world!"
"Hello world!"

julia> UniversalDeclarationOfHumanRightsStart = "人人生而自由，在尊严和权利上一律平等。"
"人人生而自由，在尊严和权利上一律平等。"
```

允许使用Unicode名称（采用UTF-8编码）：

```
julia> δ = 0.00001
1.0e-5

julia> 안녕하세요 = "Hello"
"Hello"
```

在 Julia REPL 和一些其它的 Julia 编辑环境中，很多 Unicode 数学符号可以使用反斜杠加 LaTeX 符号名再按 tab 健打出。 例如：变量名 ``δ`` 可以通过 ``\delta`` - *tab* 来输入，甚至可以用 ``\alpha`` - *tab* - ``\hat`` - *tab* - ``\_2`` - *tab* 来输入 ``α̂₂`` 这种复杂的变量名。如果你在某个地方（比如别人的代码里）看到了一个不知道怎么输入的符号，你可以在REPL中输入 ``?``，然后粘贴那个符号，帮助文档会告诉你输入方法。

如果需要的话，朱莉娅甚至允许您重新定义内置的常量和函数(尽管不建议这样做以避免潜在的混乱)：

```
julia> pi = 3
3

julia> pi
3

julia> sqrt = 4
4
```

但是，如果您试图重新定义已在使用的内建常量或函数，Julia 是会不爽的，她会抛出一个错误：

```
julia> pi
π = 3.1415926535897...

julia> pi = 3
ERROR: cannot assign variable MathConstants.pi from module Main

julia> sqrt(100)
10.0

julia> sqrt = 4
ERROR: cannot assign variable Base.sqrt from module Main
```

## 合法的变量名

变量名字必须以英文字母（A-Z 或 a-z）、下划线或编码大于 00A0 的 Unicode 字符的一个子集开头。 具体来说指的是，[Unicode字符分类](http://www.fileformat.info/info/unicode/category/index.htm)中的 Lu/Ll/Lt/Lm/Lo/Nl（字母）、Sc/So（货币和其他符号）以及一些其它像字母的符号（例如 Sm 类别数学符号中的一部分）。 变量名的非首字符还允许使用惊叹号 !、数字（包括 0-9 和其他 Nd/No 类别中的 Unicode 字符）以及其它 Unicode 字符：变音符号和其他修改标记（Mn/Mc/Me/Sk 类别）、标点和连接符（Pc 类别）、引号和少许其他字符。

像 ``+`` 这样的运算符也是合法的标识符，但是它们会被特别地解析。在一些语境中，运算符可以像变量一样使用，比如 ``(+)`` 表示加函数，语句 ``(+) = f`` 会把它重新赋值。大部分 Sm 类别中的 Unicode 中缀运算符，像 ``⊕``，则会被解析成真正的中缀运算符，并且支持用户自定义方法（举个例子，你可以使用语句 ``const ⊗ = kron`` 将 ``⊗`` 定义为中缀的 Kronecker 积）。运算符也可以使用修改标记、引号和上标/下标进行加缀，例如 ``+̂ₐ″`` 被解析成一个与 ``+`` 具有相同优先级的中缀运算符。

变量的唯一显式不允许的名称是内置语句的名称：

```
julia> else = false
ERROR: syntax: unexpected "else"

julia> try = "No"
ERROR: syntax: unexpected "="
```

某些Unicode字符在标识符中被认为是等效的。不同的输入Unicode组合字符的方式(例如，重音)被视为等效的(特别是，Julia标识符是NFC规范化的)。统一码字符 ``ɛ`` (U+025 B：拉丁文小写字母OPEN e)和 ``µ`` (U+00B5：微记号)被视为与相应的希腊字母等效，因为前者可通过某些输入法方便的输入。

## 命名规范

虽然 Julia 语言对合法名字的限制非常少，但是遵循以下这些命名规范还是非常有必要的：

  * 变量的名称是小写的。
  * 单词分隔可以用下划线(``'_'``)表示，但不鼓励使用下划线，除非名称很难以其他方式阅读。
  * ``Types``和``Module``的名称以大写字母开头，单词分隔显示为大写字母，而不是下划线。
  * ``function`` 和 ``macro`` 的名称为小写，没有下划线。
  * 会对输入参数进行更改的函数要使用 ``!`` 结尾。这些函数有时叫做 “mutating” 或 “in-place” 函数，因为它们在被调用后，不仅仅会返回一些值 还会更改输入参数的内容。

关于命名规范的更多信息，可查看[代码风格指南](https://docs.julialang.org/en/v1/manual/style-guide/#Style-Guide-1).
