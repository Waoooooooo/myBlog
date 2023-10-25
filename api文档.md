**统一响应格式**

***
{
    "success": Boolean, // 响应结果(true/false)
    "code": Integer, // 状态码(20000/20001/21001/21002...)
    "message": String, // 返回消息
    "data": HashMap // 数据
}
***


没有返回数据时
{
    "success": Boolean,
    "code": Integer,
    "message": String,
    "data": {}
}



返回数据中有多个数据列表
{
    "success": Boolean,
    "code": Integer,
    "message": String,
    "data": {
        "items": [ //列表
            {
                "id": 1,
                "username": "AydenBryan",
                "password": "123456"
            },
            ...
        ]
    }
}

