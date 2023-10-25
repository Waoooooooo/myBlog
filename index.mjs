import express from "express";
import {dbApi} from "./db.mjs";



const app = express()
//app是一个服务器实例
const port = 10086

//日志
app.get('/*', (req, res,next) => {
  console.log(req.url)
  next()
})


//静态文件服务
app.use(express.static('public'))


//通过id查询一篇博客  返回undefined 或者 一个对象
app.get('/blog/:id', (req, res,next) => {
  console.log("id的值",req.params.id)
  console.log(dbApi.getBlogById(req.params.id))
  res.send(dbApi.getBlogById(req.params.id))
})


//获取所有博客
app.get('/blogs', (req, res,next) => {
  res.send(dbApi.getBlogs())
})





//如果找不到对应的接口
app.get('/*', (req, res,next) => {
  res.send("404 not found")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


