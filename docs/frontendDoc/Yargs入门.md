---
title: yargs入门
editLink: true
---

# yargs 入门

yargs 可以用于开发脚手架（CLI 工具），一些著名的 CLI 工具就是由 yargs 开发的，例如 gulp-cli 等。

## 常用 api

- `usage`：设置命令行工具的基本用法和描述。
- `hideBin`：将命令行输入的参数前的" – "删除，因为只需要后面的参数。
- `process`：process 是一个全局对象，提供了有关当前 Node.js 进程的信息和控制的方法和属性。
- `demandCommand`：需要至少一个命令，否则将打印错误消息并展示所有可用命令和选项。
- `strict`：开启严格模式，在命令未定义时会抛出异常。
- `recommendCommands`：推荐下一个可执行命令，当命令未定义时。
- `fail`：命令解析失败时，调用处理程序，打印错误信息。
- `alias`：为 yargs 定义的命令行工具指定别名选项，该选项用于展示 CLI 的帮助页面。
- `wrap`：设置命令行工具的输出宽度，这样可以适应不同的终端宽度，以便在终端窗口的大小变化时具有一致的输出格式。
- `epilogue`：为 CLI 应用程序添加底部文本。这个底部文本通常是命令的摘要和基本用法示例。
- `options`：定义命令行参数和选项，将在命令行中作为可选择项出现，可以传入该选项的值，并在程序中使用该值。同时通过--help 选项，还可以自动生成帮助文档，具体参数可查阅文档。
- `group`：将命令行选项分为组，并指定组标题。
- `command`：用于定义命令，可以根据不同的 commands 提供不同的 options，接收四个参数
  - command: 要定义的命令名称
  - description: 命令的描述信息
  - builder: 命令行参数的构建器函数，它可以定义命令行参数和选项
  - handler: 命令的处理函数，当用户执行该命令时，yargs 将调用处理函数来处理命令。
- `argv`：解释命令行参数，返回解析后的结果。

## 代码示例

```js
#!/usr/bin/env node

// 引入yargs和hideBin函数
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

// 引入process模块
const process = require('process');

// 隐藏命令参数
const arg = hideBin(process.argv);

// 定义命令行解析器
const cli = yargs(arg);

// 设置CLI命令行的基本用法和描述
cli.usage('Usage: imooc-test [command] <options>');

// 需要至少一个命令，否则打印错误消息并展示所有可用命令和选项
cli.demandCommand(
  1,
  'A command is required. Pass --help to see all available commands an options.',
);

// 开启严格模式
cli.strict();

// 推荐命令提示
cli.recommendCommands();

// 命令解析失败时，调用处理程序
cli.fail((err, msg) => {
  console.log('err', err);
});

// 为CLI添加别名选项
cli.alias('h', 'help').alias('v', 'version');

// 设置CLI输出宽度，使其适应不同的终端宽度
cli.wrap(cli.terminalWidth());

// 添加CLI的底部注释
cli.epilogue('Your own footer description');

// 添加一个命令行选项对象
cli.options({
  debug: {
    type: 'boolean',
    describe: 'debug mode',
    alias: 'd',
  },
});

// 将命令行选项分组并指定组标题
cli.group(['debug'], 'Dev Options');

// 定义一个名为"init"的命令，它带有一个可选参数"name"，"[name]"是它的别名
cli.command(
  'init [name]',
  'Do init a project',
  (yargs) => {
    // builder 定义选项
    yargs.option('name', {
      type: 'string',
      describe: 'project name',
      alias: 'n',
    });
  },
  (argv) => {
    // handler 命令的处理函数
    console.log('argv', argv);
  },
);

// 以对象的形式定义名为“list”的命令
cli.command({
  command: 'list',
  describe: 'show list',
  aliases: ['ls', 'la', 'll'],
  builder: (yargs) => {},
  handler: (argv) => {
    console.log(argv);
  },
});

// 解析命令行参数并返回解析结果
cli.argv;
```
