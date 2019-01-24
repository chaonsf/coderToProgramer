const express=require("express");
let app=express();
let whiteList=["http://localhost:3000"];
app.use(function(req,res,next){
    let origin=req.headers.origin;
    if(whiteList.includes(origin)){
        //设置哪个源可以访问我
        res.setHeader("Access-Control-Allow-Origin",origin);
        res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");//允许携带哪个头访问我
        res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");//允许哪个方法访问
        res.setHeader("Access-Control-Allow-Credentials",true)  //允许携带cookie
        res.setHeader("Access-Control-Max-Age",6)  //用来指定本次预检请求的有效期，单位为秒
        if(req.method=="OPTIONS"){
            res.end()  //options的预检请求不做任何处理
        }
    }
    next()
})
app.get("/getData",function(req,res){
     res.end("我是4000端口数据")
})
app.use(express.static(__dirname))
app.listen(4000)