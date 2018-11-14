# Julia 入门

无论你是使用预编译的二进制文件还是直接从源代码编译，Julia 的安装都很简单。只要按 [https://julialang.org/downloads/](https://julialang.org/downloads/) 给出的说明下载并安装即可。

学习和试验Julia最简单的方法是通过双击Julia可执行文件或从命令行运行 ``julia`` 来启动交互式会话（也称为read-eval-print循环或“REPL”）：

```@eval
$ julia

               _
   _       _ _(_)_     |  Documentation: https://docs.julialang.org
  (_)     | (_) (_)    |
   _ _   _| |_  __ _   |  Type "?" for help, "]?" for Pkg help.
  | | | | | | |/ _` |  |
  | | |_| | | | (_| |  |  Version 1.0.2 (2018-11-08)
 _/ |\__'_|_|_|\__'_|  |  
|__/                   |


julia> 1 + 2
3

julia> ans
3
```

要退出交互式会话，请键入 ``CTRL-D``（按Ctrl/^键和d键），或输入 `exit()`。 在交互模式下运行时，julia会显示一个横幅并提示用户输入。一旦用户输入完整的表达式（例如 ``1 + 2``）并点击输入，交互式会话会执行该表达式并显示其值。如果将表达式输入到带有分号分号的交互式会话中，则不会显示其值。无论是否显示，变量 ``ans`` 都绑定到最后一个已计算表达式的值。``ans`` 变量仅在交互式会话中绑定，而不是在以其他方式运行Julia代码时。

如果要运行 ``file.jl`` 中的代码，只需要像这样引入 ``include("file.jl")``。

要以非交互方式在文件中运行代码，可以将其作为 ``julia`` 命令的第一个参数：

```
$ julia script.jl arg1 arg2...
```

如示例所示，``julia`` 的以下命令行参数被解释为程序 ``script.jl`` 的命令行参数，在全局常量`ARGS`中传递。脚本本身的名称作为全局 ``PROGRAM_FILE`` 传入。注意，当使用命令行上的 ``-e`` 选项给出Julia表达式时，也会设置`ARGS`（参见下面的`julia` 帮助），但 ``PROGRAM_FILE`` 将为空。例如，要打印给脚本的参数，您可以这样做：

```
$ julia -e 'println(PROGRAM_FILE); for x in ARGS; println(x); end' foo bar

foo
bar
```

或者，您可以将该代码放入脚本并运行它：

```
$ echo 'println(PROGRAM_FILE); for x in ARGS; println(x); end' > script.jl
$ julia script.jl foo bar
script.jl
foo
bar
```

``-`` 分隔符可用于将用于脚本文件的命令行参数与用于Julia的参数分离：

```
$ julia --color=yes -O -- foo.jl arg1 arg2..
```

使用选项 ``-p`` 或者 ``--machine-file`` 可以在并行模式下启动 Julia。``-p n`` 会启动额外的 ``n`` 个 worker，使用 ``--machine-file file`` 会为 ``file`` 文件中的每一行启动一个 worker。 定义在 ``file`` 中的机器必须能够通过一个不需要密码的 ``ssh`` 登陆访问到，且 Julia 的安装位置需要和当前主机相同。 定义机器的格式为 ``[count*][user@]host[:port] [bind_addr[:port]]``。 ``user`` 默认值是当前用户； ``port`` 默认值是标准 ssh 端口； ``count`` 是在这个节点上的 worker 的数量，默认是 1； 可选的 bind-to bind_addr[:port] 指定了其它 worker 访问当前 worker 应当使用的 IP 地址与端口。

要让 Julia 每次启动都自动执行一些代码，你可以把它们放在 ``~/.julia/config/startup.jl`` 中：

```
$ echo 'println("Greetings! 你好! 안녕하세요?")' > ~/.julia/config/startup.jl
$ julia
Greetings! 你好! 안녕하세요?

...
```

有多种方法可以运行Julia的代码并提供选项，类似于``Perl``和``ruby``程序的方法：

```
julia [switches] -- [programfile] [args...]
```

|Switch                                 |Description|
|:---                                   |:---|
|`-v`, `--version`                      |显示版本信息|
|`-h`, `--help`                         |打印帮助信息|
|`--project[={<dir>\|@.}]`              |设置``<dir>`` 作为项目的home或者主要环境。默认是@。选项将会搜索父目录，直到找到Project.toml或JuliaProject.toml文件。|
|`-J`, `--sysimage <file>`              |启动给定的系统映像文件|
|`-H`, `--home <dir>`                   |设置``julia ``可执行文件的位置|
|`--startup-file={yes\|no}`             |加载 `~/.julia/config/startup.jl`|
|`--handle-signals={yes\|no}`           |启用或禁用Julia的默认信号处理程序|
|`--sysimage-native-code={yes\|no}`     |如果可用，请使用系统映像中的本机代码|
|`--compiled-modules={yes\|no}`         |启用或禁用模块的增量预编译|
|`-e`, `--eval <expr>`                  |执行 `<expr>`|
|`-E`, `--print <expr>`                 |执行 `<expr>` 并显示结果|
|`-L`, `--load <file>`                  |立即在所有的进程中加载 `<file>` |
|`-p`, `--procs {N\|auto`}              |这里的整数 N 表示启动 N 个额外的工作进程；``auto`` 表示启动与 CPU 线程数目（logical cores）一样多的进程|
|`--machine-file <file>`                |在 ``<file>`` 中列出的主机上运行进程|
|`-i`                                   |非交互式模式；REPL 运行且 ``isinteractive()`` 为 true|
|`-q`, `--quiet`                        |安静的启动：没有横幅，抑制REPL警告|
|`--banner={yes\|no\|auto}`             |开启或关闭 REPL 横幅|
|`--color={yes\|no\|auto}`              |开启或关闭文字颜色|
|`--history-file={yes\|no}`             |载入或导出历史记录|
|`--depwarn={yes\|no\|error}`           |启用或禁用语法和方法弃用警告(``error`` 表示将弃用警告转换为错误。)|
|`--warn-overwrite={yes\|no}`           |开启或关闭“method overwrite”警告|
|`-C`, `--cpu-target <target>`          |设置 ``<target>`` 来限制使用 CPU 的某些特性；设置为 help 可以查看可用的选项|
|`-O`, `--optimize={0,1,2,3}`           |设置编译器优化级别(若未配置此选项，则默认等级为2；若配置了此选项却没指定具体级别，则默认级别为3)。|
|`-g`, `-g <level>`                     |开启或设置 debug 信息的生成等级。若未配置此选项，则默认 debug 信息的级别为 1；若配置了此选项却没指定具体级别，则默认级别为 2。|
|`--inline={yes\|no}`                   |控制是否允许函数内联，此选项会覆盖源文件中的 @inline 声明|
|`--check-bounds={yes\|no}`             |设置边界检查状态：始终检查或永不检查。永不检查时会忽略源文件中的相应声明|
|`--math-mode={ieee,fast}`              |开启或关闭非安全的浮点数代数计算优化，此选项会覆盖源文件中的 @fastmath 声明|
|`--code-coverage={none\|user\|all}`    |对源文件中每行代码执行的次数计数|
|`--code-coverage`                      |等价于 ``--code-coverage=user`` |
|`--track-allocation={none\|user\|all}` |对源文件中每行代码的内存分配计数，单位 byte|
|`--track-allocation`                   |等价于 ``--track-allocation=user`` |

## 资源

除了本手册以外，官方网站还提供了一个有用的[学习资源列表](https://julialangcn.org/learning/)来帮助新用户学习 Julia。