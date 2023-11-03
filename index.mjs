import express from "express";
import { dbApi } from "./db.mjs";



const app = express()
//创建服务器实例
const port = 10086

//自动将带有json请求头的数据转为json格式
app.use(express.json())

//日志
app.all('/api/*', (req, res, next) => {
  console.log(req.url)
  console.log("请求体:",req.body)
  next()
})
//静态文件服务
app.use(express.static('public'))

//--------博客信息查询-----------------
//通过id查询一篇博客  返回undefined 或者 一个对象
app.get('/api/blog/:id', (req, res, next) => {
  const blog = dbApi.getBlogById(req.params.id)
  req.data = blog
  next()
})

//获取所有博客
app.get('/api/blogs', (req, res, next) => {
  req.data = dbApi.getBlogs()
  next()
})

//增加一篇博客(传入一个博客对象)
app.post("/api/addBlog", (req, res, next) => {
  const blog = req.body
  req.data = dbApi.addBlog(blog)
  next()
})

//根据博客id删除博客
app.delete("/api/deleteBlog/:id", (req, res, next) => {
  req.data = dbApi.deleteBlog(req.params.id)
  next()
})


//修改博客
app.patch("/api/patchBlog",(req,res,next)=>{
  req.data = dbApi.patchBlog(req.body)
  next()
})


//通过标签名查找博客id---暂不支持


//------标签相关------------------
//获取所有的标签
app.get('/api/tags', (req, res, next) => {
  req.data = dbApi.getTags()
  next()
})
-
//添加标签
app.put('/api/tags', (req, res, next) => {
  req.data = dbApi.addTag(req.body)
  next()
})

//--用户相关---------------------------------------------
//注册用户
app.post("/api/register", (req, res, next) => {
  req.data = dbApi.register(req.body)
  next()
})

//登录
app.post("/api/login",(req, res, next) => {
  console.log("登录的信息为",req.body)
  req.data = dbApi.login(req.body)
  console.log("发送的数据为",req.data)
  next()
})

//最后处理的中间件
app.all('/api/*', (req, res, next) => {
  console.log("最后处理环节")
   if (req.data) {
    res.send(req.data)
  } else {
    res.status(404).send({code:-1,msg:"not found"})
  }

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


