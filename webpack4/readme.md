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

# 处理图片
+ npm install file-loader url-loader -D
+ npm install html-withimg-loader -D   //处理<img src="..">的

# 处理less
+ npm install less less-loader -D
# 处理sass
- npm install node-sass sass-loader -D


## 把css文件单独拉出来保存
+ npm install Extract-test-webpack-plugin@next    //目前4.x貌似不兼容

# 处理css3兼容性前缀问题
+ npm install postcss-loader autoprefixer -D
+ 配置loader 以及写postcss.config.js


# 编译es6 es7 以及react需要的包
+ npm install babel-loader babel-core babel-preset-env babel-preset-stage-0 babel-preset-react -D
+ 配置loader

# 压缩css
+ 在loader后面加“？minimize”
---
# webpack优化
+ 当你引入一个模块的时候，要进行解析.当你需要指定除node_modules之外的其他模块的话，用modules    resolve：{modules:[path.resolve(文件夹名)],alias:{},mainFields:[]}
## dll(dll为后缀的文件成为动态链接库，当需要导入的模块在动态链接库的时候，模块不能再次被打包，而是去动态连接库里去获取dll-plugin)
+ 需要的插件 DllPlugin(用于打包一个个动态连接库) DllReferencePlugin(在配置文件中引入DllPlugin打包好的动态连接库)。 
* 先单独给他配置一个webpack.config.js(比如：webpack.react.config.js)
* 然后在package.json里面配置一个命令打包称动态连接库（比如：“build-react”:webpack --config webpack.react.config.js --mode development）
* 打包好动态链接库之后，接着在webpack。config.js里面引入刚才打包好的动态连接库，在plugins里面new一下
## HappyPack（能让webpack把任务分解给多个子进程去并发的执行，子进程处理完后再把结果发送给主进程）
* 需要的插件 happypack
## parallelUglifyPlugin (把对js的串行压缩变为开启多个子进程并行执行)
* 需要的插件 -百度
## 区分环境
### 3种区分环境文案
+ 通过npm 命令区分（给环境配置不同的命令）
+ 通过环境变量区分（webpack-merge合并坏境变量）

## cdn（内容分发网络，通过把资源部署到世界各地，用户在访问时按照就近原则从离用户最近的服务器获取资源，从而加速资源的获取速度）
+ html文件不缓存，放在自己的服务器上，关闭自己的服务器缓存，静态资源的url变成指向cdn服务器的地址
+ 静态的js、css、图片等资源开启cdn和缓存，并且文件名带上hash值。
+ 为了并行加载不阻塞，把不同的静态资源分配到不同的cdn服务器上
## 热加载
+ 插件：HotModuleReplacementPlugin 及NameModulesPlugin 这两个插件都不需要单独下载，都市webpack里面的，只需new webpack.插件（）就行
## 提取公共代码
+ 基础类库，方便长期缓存
+ 页面之间的公用代码
+ 各个页面单独生产文件
