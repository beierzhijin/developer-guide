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

## Super Key 超键

> A Super Key in DBMS is a group of one or more attributes in a table that can uniquely identify every row in that table.

在数据库设计中，**super key**（超键）是一个属性集合，它能够唯一地标识关系中的每一行。换句话说，超键是一个可以唯一识别数据库表中某一行数据的属性集。一个超键不一定是最小的，可以包含多余的属性。

**关键点：**

- **唯一性**：超键可以唯一标识表中的每一行数据。
- **冗余性**：超键的属性可以是冗余的，它可以包含不必要的属性，依然能够唯一识别每一行数据。

**举例：**

假设有一个简单的学生表（`Student`），其结构如下：

| StudentID | Name    | Email               |
| --------- | ------- | ------------------- |
| 1         | Alice   | alice@example.com   |
| 2         | Bob     | bob@example.com     |
| 3         | Charlie | charlie@example.com |

**1. 超键示例：**

- **{StudentID}**：`StudentID` 是唯一的，可以唯一标识每一行数据，所以 `{StudentID}` 是一个超键。
- **{Email}**：`Email` 也是唯一的，因此 `{Email}` 也是一个超键。
- **{StudentID, Name}**：虽然 `StudentID` 本身就足以唯一标识每一行数据，但 `{StudentID, Name}` 也是超键。因为它依然满足唯一性，只是包含了冗余的属性。

**2. Candidate Key , 候选键 , 最小超键：**

超键的最小集合叫做 **候选键**。在这个例子中，**{StudentID}** 和 **{Email}** 都是候选键，因为它们能够唯一标识每一行数据，而且没有冗余属性。

![Lightbox](https://ulooklikeamovie.oss-cn-beijing.aliyuncs.com/img/keys-in-dbms.jpg)

| **Super Key**                                                | **Candidate Key**                                            |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| A set of one or more attributes that uniquely identifies a row in a table. | A minimal super key that uniquely identifies a row without any unnecessary attributes. |
| It may include extra attributes that are not required for uniqueness. | It is always minimal (contains only the necessary attributes for uniqueness). |
| Ensures rows are unique in the table.                        | It also ensures rows are unique but in the most efficient way. |
| A table can have many super keys.                            | A table may have one or more candidate keys.                 |
| Every candidate key is a super key.                          | Not every super key is a candidate key.                      |
| **Example:** `{StudentID}`, `{StudentID, Name}` in Student table where StudentID is candidate key. | **Example:** `{StudentID}` in Student table.                 |                                |


## UML

### 序列图

描述业务流程

### 用例图

### 类图
