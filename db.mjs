import Database from "better-sqlite3";
const db = new Database('blogDB.sqlite3');
var a = db.prepare("select * from users where id = 1").get()






export const dbApi = {

  //获取所有的博客文章
  getBlogs() {
    return db.prepare("select * from blogs").all();
  },

  getBlogById(id) {
    return db.prepare("select * from blogs where id = ?").get(id);
  },


  //获取所有的标签
  getTags() {
    return db.prepare("select * from tags").all();
  },

  //通过标签名查找博客id
  getBlogsByTag: function (tagName) {
    return db.prepare("select * from tagsAndBlogs where tagName = ? ").all(tagName);
  },


  //增加一篇博客(传入一个博客对象)
  addBlog: function (blog) {
    return db.prepare("insert into blogs (title,content,coverImage,tags)values(@title,@content,@coverImage,@tags)").run(blog);
  },

  //根据博客id删除博客
  deleteBlog: function (blogId) {
    return db.prepare("delete  from blogs where id = ? ").run(blogId);
  },

  //修改博客
  patchBlog: function (blog) {
    try {
     var result  =   db.prepare("update blogs set title=@title,content=@content,coverImage=@coverImage,tags=@tags where id = @id").run(blog);
    } catch (error) {
      return false
    }
    return Boolean(result.changes)
  },

  //创建标签  创建成功返回true  否则返回false
  addTag: function (tagName) {
    try {
      db.prepare("insert into tags values(?)").run(tagName);
    } catch (error) {
      return false
    }
    return true
  },



  //注册用户 返回{ changes: 1, lastInsertRowid: 3 }
  register: function (user) {
    try {
      db.prepare("insert into users (username,password,nickname) values (@username,@password,@nickname)").run(user)
    } catch (error) {
      return false
    }
    return true
  },

  //登录  查询成功返回一个user对象 查询不到则返回空
  login: function (user) {
    return db.prepare("select * from  users where username = @username and password = @password").get(user)
  },
}


// console.log(dbApi.getBlogs())
// console.log(dbApi.login({ username: "12312311", password: "1213123112" })) //返回undefined
// console.log(dbApi.addTag("hello"))
// console.log("更改",dbApi.patchBlog({
//   id: 16,
//   title: '2222',
//   content: '1111',
//   coverImage: '1111.png',
//   tags: '["难受"]'
// }))
