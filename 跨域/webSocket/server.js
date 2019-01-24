const express=require("express");
let app=express();
let webSocket=require("ws");
let wss=new webSocket.Server({port:3000});

wss.on("connection",function(ws){
    ws.on("message",function(data){
        console.log(data)
    })
    ws.send("我是3000端口传来的消息")
})