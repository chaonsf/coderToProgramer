# webpack4的功能
+ 代码转换：ts编译成js，scss编译成css等
+ 文件优化:压缩js，css，html代码，压缩合并图片等
+ 代码分割:提取多个页面的公共代码，提取首屏不需要执行部分的代码让其异步加载
+ 模块合并:在采取模块话的项目里，会有很多个模块和文件，需要构建功能把模块分类合并称一个文件。
+ 自动刷新:监听本地源代码的变化，自动重新构建，刷新浏览器
+ 代码校验：在代码被提交到仓库前，需要检验代码是否符合规范，以及单元测试是否通过
+ 自动发布：更新完代码后，自动构建出线上发布代码并传输给发布系统

# 下载webpack
- npm install webpack webpack-cli -D

# load
+ css-loader:用来解析处理css文件中的url路径,要把css文件变成一个模块
+ style-loader：可以把css文件变成style标签插入header中

# html 模板
+ npm  install html-webpack-plugin -D

# 引入全局变量
+ npm install expose-loader -D
+ 然后在module里面配置 （以jquery为例）
+ {
    test:require.resolve("jquery),   //得到一个模块的绝对路径
    use:{
        loader:”expose-loader“,
        options:"$”   //传参 也可以在loader后面通过？传参
    }
}