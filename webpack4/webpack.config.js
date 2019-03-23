const path=require("path");
const htmlWebpackPlugin=require("html-webpack-plugin");
const webpack=require("webpack")
module.exports={
    entry:{
       "index":"./src/index.js",
       "vendor":"jquery"
    },
    output:{
        path:path.join(__dirname,"dist"),
        filename:"[name].js"
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    {loader:"style-loader"},
                    {loader:"css-loader"}
                ]
            }
        ]
    },
    plugins:[
        //用来自动向模块内注入变量,（以jq举例，不这样做其他模块就不能用$）
         new webpack.ProvidePlugin({
              $:"jquery"
         }),
        //此插件可以自动产生html文件
       new htmlWebpackPlugin({
         template:"./src/index.html",  //指定产出的html模板
         filename:"index.html",//产出的html 文件名，
         chunks:["vendor","index"],//在产出的html文件里引入哪些代码块(要跟entry里面的名字对应配置了这个说明entry里面有多个)
         hash:true,//会在引入的js里面加入查询字符串避免缓存
         title:"模板主页"
       })
    ],
    devServer:{
        contentBase:"./dist",
        host:"localhost",
        port:8080,
        compress:true, //服务器返回给浏览器的时候是否启动gzip压缩
    }
}