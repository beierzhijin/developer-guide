# db design

## BEST PRACTICES
1. Please, primary key should never be business logic. 业务逻辑永远不应该作为主键
> 比如`users`表中即使 username is unique and not nullable，not undefined, but it's business logic, should not be used as primary key
2. Always create an ID of type string, UUID or CUID (Collision-resistant Unique ID 碰撞唯一ID). 始终创建一个字符串、UUID 或 CUID 类型的ID
3. Always add `createdAt` `timestamp` to all tables，even if you think it's not needed. 在所有表中添加 createdAt 时间戳，即使你认为它不需要
4. 创建表关系时，先从`用户表`开始思考，因为应用程序的使用者是用户
5. 创建多对多关系时，创建一个单独的表 `create a separate table`

## Twitter Like Social Media

* Users
* Tweets and Media uploads
* Followers and Following
* Comments and Likes
* Premium Subscription

### E.R.D. 实体关系图

[<strong style="color: skyblue;">entity relationship diagram</strong>](https://app.eraser.io/dashboard/all)

![ERD](https://ulooklikeamovie.oss-cn-beijing.aliyuncs.com/img/image-20250302022718932.png)

```txt
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

// 记录哪个用户关注了哪个用户
follows [icon: users, color: purple] {
  id string pk
  createdAt timestamp
  followingId string fk //关注了谁
  followedId string fk //被谁关注了
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

// < 一对多; > 多对一; - 一对一; <> 多对多
users.id < tweets.userId
tweets.id < media.tweetsId
users.id  < comments.userId
tweets.id < comments.tweetsId
users.id - subscriptions.userId
users.id < likes.userId
tweets.id < likes.tweetsId
follows.followingId > users.id //查有多少粉丝
follows.followedId > users.id //查有多少关注
```


