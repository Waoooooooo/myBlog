import express from "express";
import { dbApi } from "./db.mjs";



const app = express()
//创建服务器实例
const port = 10086

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
app.get('/api/tags', (req, res, next) => {
  req.data = dbApi.addTag(req.body)
  next()
})

//用户相关
//注册用户
app.post("/api/register", (req, res, next) => {
  req.data = dbApi.register(req.body)
  next()
})

//登录
app.post("/api/login",(req, res, next) => {
  req.data = dbApi.login(req.body)
  next()
})

//最后处理的中间件
app.get('/api/*', (req, res, next) => {
  let result = {
    success: true,
    code: 200,
    message: "ok",
    data: {}
  };
  if (req.data === false) {
    result.code = 400
    result.success = false
    result.message = "请求有误,未成功"
  } else if (req.data) {
    result.data = req.data
  } else {
    result.success = false
    result.code = 404
    result.message = "not found"
  }
  res.send(result)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


