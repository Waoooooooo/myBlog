const express = require('express')
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


//首页
app.get('/', (req, res) => {
  res.send('Hello World!')
})


//如果找不到对应的接口
app.get('/*', (req, res,next) => {
  res.send("404 not found")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


