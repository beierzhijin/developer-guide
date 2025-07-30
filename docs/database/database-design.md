# db design

## BEST PRACTICES

1. Please, primary key should never be business logic. 业务逻辑永远不应该作为主键
   > 比如`users`表中即使 username is unique and not nullable，not undefined, but it's business logic, should not be used as primary key
2. Always create an ID of type string, UUID or CUID (Collision-resistant Unique ID 碰撞唯一 ID). 始终创建一个字符串、UUID 或 CUID 类型的 ID
3. Always add `createdAt` `timestamp` to all tables，even if you think it's not needed. 在所有表中添加 createdAt 时间戳，即使你认为它不需要
4. 创建表关系时，先从`用户表`开始思考，因为应用程序的使用者是用户
5. 创建多对多关系时，创建一个单独的表 `create a separate table`

## Twitter Like Social Media

- Users
- Tweets and Media uploads
- Followers and Following
- Comments and Likes
- Premium Subscription

### E.R.D. 实体关系图 ER 图

[<strong style="color: skyblue;">Entity-Relationship Diagram</strong>](https://app.eraser.io/dashboard/all)

![ERD](https://ulooklikeamovie.oss-cn-beijing.aliyuncs.com/img/image-20250302022718932.png)

```eraser.io
users [icon: user, color: Blue] {
  id string pk
  username string unique
  email string
  bio string //简历
  createdAt timestamp
}

tweets [icon: message-circle, color: yellow] {
  id string pk
  content string
  createdAt timestamp
  userId string fk
}

media [icon: image, color: green] {
  id string pk
  fileUrl string
  type enum
  createdAt timestamp
  tweetsId string fk
}

comments [icon: message-square, color: orange] {
  id string pk
  content string
  createdAt timestamp
  userId string fk
  tweetsId string fk
}

// 关注关系表, 中间表
follows [icon: users, color: purple] {
  id string pk //id字段是这条"关注关系"的唯一标识符，不是用户的id
  createdAt timestamp
  followerId string fk //关注者（主动方）
  followingId string fk //被关注者（被动方）
}

likes [icon: heart, color: pink] {
  id string pk
  createdAt timestamp
  userId string fk
  tweetsId string fk
}

// 我们应用有多少会员订阅用户
subscriptions [icon: credit-card, color: red] {
  id string pk
  subscriptionType enum
  startDate string
  endDate string
  createdAt timestamp
  userId string fk
}

// - 一对一(1:1); < 一对多(1:N); > 多对一; <> 多对多(N:M)
users.id < tweets.userId
tweets.id < media.tweetsId
users.id  < comments.userId
tweets.id < comments.tweetsId
users.id - subscriptions.userId
users.id < likes.userId
tweets.id < likes.tweetsId
follows.followerId > users.id //查有多少粉丝
follows.followingId > users.id //查有多少关注
```

> 想象一下微博的关注关系：
>
> - 小明(用户 id: 001)关注了小红(用户 id: 002)
> - 小张(用户 id: 003)也关注了小红(用户 id: 002)
>
> 这样在 follows 表中会有两条记录：
>
> ```sql
> follows {
>  id: "f001",              // 关注关系的唯一标识
>  followingId: "001",      // 小明的用户id
>  followedId: "002",       // 小红的用户id
>  createdAt: "2024-03-20"
> }
>
> follows {
>  id: "f002",              // 另一条关注关系的唯一标识
>  followingId: "003",      // 小张的用户id
>  followedId: "002",       // 小红的用户id
>  createdAt: "2024-03-21"
> }
> ```

## UML

### 序列图

描述业务流程

### 用例图

### 类图
