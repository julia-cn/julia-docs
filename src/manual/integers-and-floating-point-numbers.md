# Integers and Floating-Point Numbers

整数和浮点值是算术和计算的基础。这些数值的内置表示被称作原始数值类型（numeric primitive），且整数和浮点数在代码中作为立即数时称作数值字面量（numeric literal）。例如，``1`` 是个整型字面量，``1.0`` 是个浮点型字面量，它们在内存中作为对象的二进制表示就是原始数值类型。

Julia 提供了很丰富的原始数值类型，并基于它们定义了一整套算术操作，还提供按位运算符以及一些标准数学函数。这些函数能够直接映射到现代计算机原生支持的数值类型及运算上，因此 Julia 可以充分地利用运算资源。此外，Julia 还为[任意精度算术](#)，对于无法使用原生硬件表示的数值类型，Julia 也能够高效地处理其数值运算。当然，这需要相对的牺牲一些性能。

以下是 Julia 的原始数值类型：

  * **整数类型：**

| 类型              | 是否带符号? | 比特位数 | 最小值 | 最大值 |
|:----------------- |:------- |:-------------- |:-------------- |:------------- |
| [`Int8`](#)    | ✓       | 8              | -2^7           | 2^7 - 1       |
| [`UInt8`](#)   |         | 8              | 0              | 2^8 - 1       |
| [`Int16`](#)   | ✓       | 16             | -2^15          | 2^15 - 1      |
| [`UInt16`](#)  |         | 16             | 0              | 2^16 - 1      |
| [`Int32`](#)   | ✓       | 32             | -2^31          | 2^31 - 1      |
| [`UInt32`](#)  |         | 32             | 0              | 2^32 - 1      |
| [`Int64`](#)   | ✓       | 64             | -2^63          | 2^63 - 1      |
| [`UInt64`](#)  |         | 64             | 0              | 2^64 - 1      |
| [`Int128`](#)  | ✓       | 128            | -2^127         | 2^127 - 1     |
| [`UInt128`](#) |         | 128            | 0              | 2^128 - 1     |
| [`Bool`](#)    | N/A     | 8              | `false` (0)    | `true` (1)    |

  * **浮点类型：**

| 类型              | 精度                                                                      | 比特位数 |
|:----------------- |:------------------------------------------------------------------------------ |:-------------- |
| [`Float16`](#) | [half](https://en.wikipedia.org/wiki/Half-precision_floating-point_format)     | 16             |
| [`Float32`](#) | [single](https://en.wikipedia.org/wiki/Single_precision_floating-point_format) | 32             |
| [`Float64`](#) | [double](https://en.wikipedia.org/wiki/Double_precision_floating-point_format) | 64             |

此外，对[复数和分数](https://docs.julialang.org/en/v1/manual/complex-and-rational-numbers/#Complex-and-Rational-Numbers-1)的完整支持是在这些原始数据类型之上建立起来的。多亏了 Julia 有一个很灵活的、用户可扩展的[类型提升系统](https://docs.julialang.org/en/v1/manual/conversion-and-promotion/#conversion-and-promotion-1)，所有的数值类型都无需显式转换就可以很自然地相互进行运算。

## 整型

整数字面量以标准形式表示：

```
julia> 1
1

julia> 1234
1234
```

整数文字的默认类型取决于目标系统是32位架构还是64位架构：

```
# 32-bit system:
julia> typeof(1)
Int32

# 64-bit system:
julia> typeof(1)
Int64
```

Julia内部变量 [`Sys.WORD_SIZE`](#) 表示目标系统是32位还是64位：

```
# 32-bit system:
julia> Sys.WORD_SIZE
32

# 64-bit system:
julia> Sys.WORD_SIZE
64
```

Julia还定义了类型 ``Int`` 和 ``UInt``，它们分别是系统的有符号和无符号本机整数类型的别名：

```
# 32-bit system:
julia> Int
Int32
julia> UInt
UInt32

# 64-bit system:
julia> Int
Int64
julia> UInt
UInt64
```

无论系统类型如何，无法仅使用32位表示但可以64位表示的较大整数文字始终会创建64位整数：

```
# 32-bit or 64-bit system:
julia> typeof(3000000000)
Int64
```

无符号整数会通过 ``0x`` 前缀以及十六进制数 ``0-9a-f`` 来输入和输出（输入也可以使用大写的 ``A-F``）。无符号值的位数取决于十六进制数字使用的数量：

```
julia> 0x1
0x01

julia> typeof(ans)
UInt8

julia> 0x123
0x0123

julia> typeof(ans)
UInt16

julia> 0x1234567
0x01234567

julia> typeof(ans)
UInt32

julia> 0x123456789abcdef
0x0123456789abcdef

julia> typeof(ans)
UInt64

julia> 0x11112222333344445555666677778888
0x11112222333344445555666677778888

julia> typeof(ans)
UInt128
```

采用这种做法是因为，当人们使用无符号十六进制字面量表示整数值的时候，通常会用它们来表示一个固定的数值字节序列，而不仅仅是个整数值。

还记得这个 [`ans`](#) 变量吗？它存着交互式会话中上一个表达式的运算结果，但以其他方式运行的 Julia 代码中没有这个变量。

二进制和八进制字面量也是支持的：

```
julia> 0b10
0x02

julia> typeof(ans)
UInt8

julia> 0o010
0x08

julia> typeof(ans)
UInt8

julia> 0x00000000000000001111222233334444
0x00000000000000001111222233334444

julia> typeof(ans)
UInt128
```

二进制、八进制和十六进制的字面量都会产生无符号的整数类型。当字面量不是开头全是 ``0`` 时，它们二进制数据项的位数会是最少需要的位数。当开头都是 0 时，位数取决于一个字面量需要的最少位数，这里的字面量指的是一个有着同样长度但开头都为 ``1`` 的数。这样用户就可以控制位数了。那些无法使用 ``UInt128`` 类型存储下的值无法写成这样的字面量。

二进制、八进制和十六进制的字面量可以在前面紧接着加一个负号 ``-``，这样可以产生一个和原字面量有着同样位数而值为原数的补码的数（二补数）：

```
julia> -0x2
0xfe

julia> -0x0002
0xfffe
```

整型等原始数值类型的最小和最大可表示的值可用 [`typemin`](#) 和 [`typemax`](#) 函数得到：

```
julia> (typemin(Int32), typemax(Int32))
(-2147483648, 2147483647)

julia> for T in [Int8,Int16,Int32,Int64,Int128,UInt8,UInt16,UInt32,UInt64,UInt128]
           println("$(lpad(T,7)): [$(typemin(T)),$(typemax(T))]")
       end
   Int8: [-128,127]
  Int16: [-32768,32767]
  Int32: [-2147483648,2147483647]
  Int64: [-9223372036854775808,9223372036854775807]
 Int128: [-170141183460469231731687303715884105728,170141183460469231731687303715884105727]
  UInt8: [0,255]
 UInt16: [0,65535]
 UInt32: [0,4294967295]
 UInt64: [0,18446744073709551615]
UInt128: [0,340282366920938463463374607431768211455]
```

[`typemin`](#) 和 [`typemax`](#) 返回的值的类型总与所给参数的类型相同。（上面的表达式用了一些我们目前还没有介绍的功能，包括 [for 循环](#)、[字符串](#)和[插值](#)，但对于已有一些编程经验的用户应该是很容易理解的。）

### 溢出行为

在Julia中，超出给定类型的最大可表示值会导致环绕行为：

```
julia> x = typemax(Int64)
9223372036854775807

julia> x + 1
-9223372036854775808

julia> x + 1 == typemin(Int64)
true
```

因此，Julia 的整数算术实际上是[模算数](https://en.wikipedia.org/wiki/Modular_arithmetic)的一种形式，它反映了现代计算机实现底层算术的特点。在可能有溢出产生的程序中，对最值边界出现循环进行显式检查是必要的。否则，推荐使用[任意精度算术](#)中的 [``BigInt``](#) 类型作为替代。

### 语法错误

``div`` 函数的整数除法有两种异常情况：除以零，以及使用 -1 去除最小的负数（[typemin](#)）。这两种情况都会抛出一个 [``DivideError``](#) 错误。 ``rem`` 取余函数和 ``mod`` 取模函数在除零时抛出 [``DivideError``](#) 错误。

## 浮点数

Literal floating-point numbers are represented in the standard formats, using[E-notation](https://en.wikipedia.org/wiki/Scientific_notation#E-notation) when necessary:

```
julia> 1.0
1.0

julia> 1.
1.0

julia> 0.5
0.5

julia> .5
0.5

julia> -1.23
-1.23

julia> 1e10
1.0e10

julia> 2.5e-4
0.00025
```

The above results are all [`Float64`](#) values. Literal [`Float32`](#) values can be entered by writing an `f` in place of `e`:

```
julia> 0.5f0
0.5f0

julia> typeof(ans)
Float32

julia> 2.5f-4
0.00025f0
```

Values can be converted to [`Float32`](#) easily:

```
julia> Float32(-1.5)
-1.5f0

julia> typeof(ans)
Float32
```

Hexadecimal floating-point literals are also valid, but only as [`Float64`](#) values, with `p` preceding the base-2 exponent:

```
julia> 0x1p0
1.0

julia> 0x1.8p3
12.0

julia> 0x.4p-1
0.125

julia> typeof(ans)
Float64
```

Half-precision floating-point numbers are also supported ([`Float16`](#)), but they are implemented in software and use [`Float32`](#) for calculations.

```
julia> sizeof(Float16(4.))
2

julia> 2*Float16(4.)
Float16(8.0)
```

The underscore `_` can be used as digit separator:

```
julia> 10_000, 0.000_000_005, 0xdead_beef, 0b1011_0010
(10000, 5.0e-9, 0xdeadbeef, 0xb2)
```

### Floating-point zero

Floating-point numbers have [two zeros](https://en.wikipedia.org/wiki/Signed_zero), positive zero and negative zero. They are equal to each other but have different binary representations, as can be seen using the [`bitstring`](#) function:

```
julia> 0.0 == -0.0
true

julia> bitstring(0.0)
"0000000000000000000000000000000000000000000000000000000000000000"

julia> bitstring(-0.0)
"1000000000000000000000000000000000000000000000000000000000000000"
```

### Special floating-point values

There are three specified standard floating-point values that do not correspond to any point on the real number line:

| `Float16` | `Float32` | `Float64` | Name              | Description                                                     |
|:--------- |:--------- |:--------- |:----------------- |:--------------------------------------------------------------- |
| `Inf16`   | `Inf32`   | `Inf`     | positive infinity | a value greater than all finite floating-point values           |
| `-Inf16`  | `-Inf32`  | `-Inf`    | negative infinity | a value less than all finite floating-point values              |
| `NaN16`   | `NaN32`   | `NaN`     | not a number      | a value not `==` to any floating-point value (including itself) |

For further discussion of how these non-finite floating-point values are ordered with respect to each other and other floats, see [Numeric Comparisons](#). By the [IEEE 754 standard](https://en.wikipedia.org/wiki/IEEE_754-2008), these floating-point values are the results of certain arithmetic operations:

```
julia> 1/Inf
0.0

julia> 1/0
Inf

julia> -5/0
-Inf

julia> 0.000001/0
Inf

julia> 0/0
NaN

julia> 500 + Inf
Inf

julia> 500 - Inf
-Inf

julia> Inf + Inf
Inf

julia> Inf - Inf
NaN

julia> Inf * Inf
Inf

julia> Inf / Inf
NaN

julia> 0 * Inf
NaN
```

The [`typemin`](#) and [`typemax`](#) functions also apply to floating-point types:

```
julia> (typemin(Float16),typemax(Float16))
(-Inf16, Inf16)

julia> (typemin(Float32),typemax(Float32))
(-Inf32, Inf32)

julia> (typemin(Float64),typemax(Float64))
(-Inf, Inf)
```

### Machine epsilon

Most real numbers cannot be represented exactly with floating-point numbers, and so for many purposes it is important to know the distance between two adjacent representable floating-point numbers, which is often known as [machine epsilon](https://en.wikipedia.org/wiki/Machine_epsilon).

Julia provides [`eps`](#), which gives the distance between `1.0` and the next larger representable floating-point value:

```
julia> eps(Float32)
1.1920929f-7

julia> eps(Float64)
2.220446049250313e-16

julia> eps() # same as eps(Float64)
2.220446049250313e-16
```

These values are `2.0^-23` and `2.0^-52` as [`Float32`](#) and [`Float64`](#) values, respectively. The [`eps`](#) function can also take a floating-point value as an argument, and gives the absolute difference between that value and the next representable floating point value. That is, `eps(x)` yields a value of the same type as `x` such that `x + eps(x)` is the next representable floating-point value larger than `x`:

```
julia> eps(1.0)
2.220446049250313e-16

julia> eps(1000.)
1.1368683772161603e-13

julia> eps(1e-27)
1.793662034335766e-43

julia> eps(0.0)
5.0e-324
```

The distance between two adjacent representable floating-point numbers is not constant, but is smaller for smaller values and larger for larger values. In other words, the representable floating-point numbers are densest in the real number line near zero, and grow sparser exponentially as one moves farther away from zero. By definition, `eps(1.0)` is the same as `eps(Float64)` since `1.0` is a 64-bit floating-point value.

Julia also provides the [`nextfloat`](#) and [`prevfloat`](#) functions which return the next largest or smallest representable floating-point number to the argument respectively:

```
julia> x = 1.25f0
1.25f0

julia> nextfloat(x)
1.2500001f0

julia> prevfloat(x)
1.2499999f0

julia> bitstring(prevfloat(x))
"00111111100111111111111111111111"

julia> bitstring(x)
"00111111101000000000000000000000"

julia> bitstring(nextfloat(x))
"00111111101000000000000000000001"
```

This example highlights the general principle that the adjacent representable floating-point numbers also have adjacent binary integer representations.

### Rounding modes

If a number doesn't have an exact floating-point representation, it must be rounded to an appropriate representable value. However, the manner in which this rounding is done can be changed if required according to the rounding modes presented in the [IEEE 754 standard](https://en.wikipedia.org/wiki/IEEE_754-2008).

The default mode used is always [`RoundNearest`](#), which rounds to the nearest representable value, with ties rounded towards the nearest value with an even least significant bit.

### Background and References

Floating-point arithmetic entails many subtleties which can be surprising to users who are unfamiliar with the low-level implementation details. However, these subtleties are described in detail in most books on scientific computation, and also in the following references:

  * The definitive guide to floating point arithmetic is the [IEEE 754-2008 Standard](http://standards.ieee.org/findstds/standard/754-2008.html); however, it is not available for free online.
  * For a brief but lucid presentation of how floating-point numbers are represented, see John D. Cook's [article](https://www.johndcook.com/blog/2009/04/06/anatomy-of-a-floating-point-number/) on the subject as well as his [introduction](https://www.johndcook.com/blog/2009/04/06/numbers-are-a-leaky-abstraction/) to some of the issues arising from how this representation differs in behavior from the idealized abstraction of real numbers.
  * Also recommended is Bruce Dawson's [series of blog posts on floating-point numbers](https://randomascii.wordpress.com/2012/05/20/thats-not-normalthe-performance-of-odd-floats/).
  * For an excellent, in-depth discussion of floating-point numbers and issues of numerical accuracy encountered when computing with them, see David Goldberg's paper [What Every Computer Scientist Should Know About Floating-Point Arithmetic](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.22.6768&rep=rep1&type=pdf).
  * For even more extensive documentation of the history of, rationale for, and issues with floating-point numbers, as well as discussion of many other topics in numerical computing, see the [collected writings](https://people.eecs.berkeley.edu/~wkahan/) of [William Kahan](https://en.wikipedia.org/wiki/William_Kahan), commonly known as the "Father of Floating-Point". Of particular interest may be [An Interview with the Old Man of Floating-Point](https://people.eecs.berkeley.edu/~wkahan/ieee754status/754story.html).

## Arbitrary Precision Arithmetic

To allow computations with arbitrary-precision integers and floating point numbers, Julia wraps the [GNU Multiple Precision Arithmetic Library (GMP)](https://gmplib.org) and the [GNU MPFR Library](http://www.mpfr.org), respectively. The [`BigInt`](#) and [`BigFloat`](#) types are available in Julia for arbitrary precision integer and floating point numbers respectively.

Constructors exist to create these types from primitive numerical types, and [`parse`](#) can be used to construct them from `AbstractString`s.  Once created, they participate in arithmetic with all other numeric types thanks to Julia's [type promotion and conversion mechanism](# conversion-and-promotion):

```
julia> BigInt(typemax(Int64)) + 1
9223372036854775808

julia> parse(BigInt, "123456789012345678901234567890") + 1
123456789012345678901234567891

julia> parse(BigFloat, "1.23456789012345678901")
1.234567890123456789010000000000000000000000000000000000000000000000000000000004

julia> BigFloat(2.0^66) / 3
2.459565876494606882133333333333333333333333333333333333333333333333333333333344e+19

julia> factorial(BigInt(40))
815915283247897734345611269596115894272000000000
```

However, type promotion between the primitive types above and [`BigInt`](#)/[`BigFloat`](#) is not automatic and must be explicitly stated.

```
julia> x = typemin(Int64)
-9223372036854775808

julia> x = x - 1
9223372036854775807

julia> typeof(x)
Int64

julia> y = BigInt(typemin(Int64))
-9223372036854775808

julia> y = y - 1
-9223372036854775809

julia> typeof(y)
BigInt
```

The default precision (in number of bits of the significand) and rounding mode of [`BigFloat`](#) operations can be changed globally by calling [`setprecision`](#) and [`setrounding`](#), and all further calculations will take these changes in account.  Alternatively, the precision or the rounding can be changed only within the execution of a particular block of code by using the same functions with a `do` block:

```
julia> setrounding(BigFloat, RoundUp) do
           BigFloat(1) + parse(BigFloat, "0.1")
       end
1.100000000000000000000000000000000000000000000000000000000000000000000000000003

julia> setrounding(BigFloat, RoundDown) do
           BigFloat(1) + parse(BigFloat, "0.1")
       end
1.099999999999999999999999999999999999999999999999999999999999999999999999999986

julia> setprecision(40) do
           BigFloat(1) + parse(BigFloat, "0.1")
       end
1.1000000000004
```

## Numeric Literal Coefficients

To make common numeric formulae and expressions clearer, Julia allows variables to be immediately
preceded by a numeric literal, implying multiplication. This makes writing polynomial expressions
much cleaner:

``` numeric-coefficients
julia> x = 3
3

julia> 2x^2 - 3x + 1
10

julia> 1.5x^2 - .5x + 1
13.0
```

It also makes writing exponential functions more elegant:

``` numeric-coefficients
julia> 2^2x
64
```

The precedence of numeric literal coefficients is slightly lower than that of
unary operators such as negation.
So `-2x` is parsed as `(-2) * x` and `√2x` is parsed as `(√2) * x`.
However, numeric literal coefficients parse similarly to unary operators when
combined with exponentiation.
For example `2^3x` is parsed as `2^(3x)`, and `2x^3` is parsed as `2*(x^3)`.

Numeric literals also work as coefficients to parenthesized expressions:

``` numeric-coefficients
julia> 2(x-1)^2 - 3(x-1) + 1
3
```
!!! note
    The precedence of numeric literal coefficients used for implicit
    multiplication is higher than other binary operators such as multiplication
    (`*`), and division (`/`, `\`, and `//`).  This means, for example, that
    `1 / 2im` equals `-0.5im` and `6 // 2(2 + 1)` equals `1 // 1`.

Additionally, parenthesized expressions can be used as coefficients to variables, implying multiplication
of the expression by the variable:

``` numeric-coefficients
julia> (x-1)x
6
```

Neither juxtaposition of two parenthesized expressions, nor placing a variable before a parenthesized
expression, however, can be used to imply multiplication:

``` numeric-coefficients
julia> (x-1)(x+1)
ERROR: MethodError: objects of type Int64 are not callable

julia> x(x+1)
ERROR: MethodError: objects of type Int64 are not callable
```

Both expressions are interpreted as function application: any expression that is not a numeric
literal, when immediately followed by a parenthetical, is interpreted as a function applied to
the values in parentheses (see [Functions](#) for more about functions). Thus, in both of these
cases, an error occurs since the left-hand value is not a function.

The above syntactic enhancements significantly reduce the visual noise incurred when writing common
mathematical formulae. Note that no whitespace may come between a numeric literal coefficient
and the identifier or parenthesized expression which it multiplies.

### Syntax Conflicts

Juxtaposed literal coefficient syntax may conflict with two numeric literal syntaxes: hexadecimal
integer literals and engineering notation for floating-point literals. Here are some situations
where syntactic conflicts arise:

  * The hexadecimal integer literal expression `0xff` could be interpreted as the numeric literal
    `0` multiplied by the variable `xff`.
  * The floating-point literal expression `1e10` could be interpreted as the numeric literal `1` multiplied
    by the variable `e10`, and similarly with the equivalent `E` form.
  * The 32-bit floating-point literal expression `1.5f22` could be interpreted as the numeric literal
    `1.5` multiplied by the variable `f22`.

In all cases the ambiguity is resolved in favor of interpretation as numeric literals:

  * Expressions starting with `0x` are always hexadecimal literals.
  * Expressions starting with a numeric literal followed by `e` or `E` are always floating-point literals.
  * Expressions starting with a numeric literal followed by `f` are always 32-bit floating-point literals.

Unlike `E`, which is equivalent to `e` in numeric literals for historical reasons, `F` is just another
letter and does not behave like `f` in numeric literals. Hence, expressions starting with a numeric literal
followed by `F` are interpreted as the numerical literal multiplied by a variable, which means that, for
example, `1.5F22` is equal to `1.5 * F22`.

## Literal zero and one

Julia provides functions which return literal 0 and 1 corresponding to a specified type or the
type of a given variable.

| Function          | Description                                      |
|:----------------- |:------------------------------------------------ |
| [`zero(x)`](#) | Literal zero of type `x` or type of variable `x` |
| [`one(x)`](#)  | Literal one of type `x` or type of variable `x`  |

These functions are useful in [Numeric Comparisons](#) to avoid overhead from unnecessary
[type conversion](# conversion-and-promotion).

Examples:

```
julia> zero(Float32)
0.0f0

julia> zero(1.0)
0.0

julia> one(Int32)
1

julia> one(BigFloat)
1.0
```
