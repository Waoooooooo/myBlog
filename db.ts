import Database from "better-sqlite3";
const db = new Database('blogDB.sqlite3');
var a = db.prepare("select * from users where id = 1").get()




type Blog = {
  title: string,
  content: string,
  coverImage: string,
  userid: string,
  tags: Tags
}

type Tags = string[]

type User = {
  username: string,
  password: string
}

type DbApi = {
  addBlog: (blog:Blog) => boolean,
  getBlogs: () => Blog[],
  getBlogsByTag: (tagName: string) => Blog[],
  getTags: () => string[],
  deleteBlog: (blogid: number) => boolean,
  patchBlog: (blog:Blog) => boolean,
  register: (user: User) => boolean,
  login: (user: User) => boolean,
}

export const dbApi: DbApi = {

  //获取所有的博客文章
  getBlogs() {
    return db.prepare("select * from blogs").all();
  },
  //获取所有的标签
  getTags() {
    return db.prepare("select * from tags").all();
  },



  //增加一篇博客(传入一个博客对象)
  addBlog: function (blog: Blog): boolean {
    return db.prepare("insert into blogs (title,content,coverImage,userid,tags)values(@title,@content,@coverImage,@tags)").run(blog);
  },


  getBlogsByTag: function (tagName) {
    return db.prepare("select * from tagsAndBlogs where tagName = ? ").all(tagName);
  },

  deleteBlog: function (blogId: number): boolean {
    return db.prepare("delete  from blogs where blogid = ? ").run(blogId);
  },

  patchBlog: function (blog: Blog): boolean {
    return db.prepare("update blogs set title=@title,content=@content,coverImage=@coverImage,tags=@tags where id = @id").run(blog);
  },

  register: function (user: User): boolean {
    return db.prepare("insert into users (username,password) valuse (@username,@password)").run(user)
  },

  login: function (user: User): boolean {
    return db.prepare("select * from  users where username = @username and password = @password").run(user)
  },

}

console.log(dbApi.addBlog({
  title: "1111",
  content: "1111",
  coverImage: "1111.png",
  userid: "1",
  tags: ["难受"]
}))
