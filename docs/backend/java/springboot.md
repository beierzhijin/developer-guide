# SPRING BOOT

## 规范

### 给外键建索引

```sql
-- 用户表 user
CREATE TABLE `user` (
  `id`       INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '用户ID，主键，自增',
  `username` VARCHAR(50)  NOT NULL                COMMENT '用户名',
  `phone`    VARCHAR(20)  DEFAULT NULL            COMMENT '手机号',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';

-- 商品表 product
CREATE TABLE `product` (
  `id`     INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '商品ID，主键',
  `name`   VARCHAR(100) NOT NULL                COMMENT '商品名称',
  `price`  DECIMAL(10,2) NOT NULL               COMMENT '价格，保留两位小数',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='商品表';

-- 购物车表 cart  —— 多对多中间表
--        外键：user_id → user.id ，product_id → product.id
--        作用：把「用户 多对多 商品」拆成两个一对多
CREATE TABLE `cart` (
  `id`         INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '购物车记录ID，主键',
  `user_id`    INT UNSIGNED NOT NULL COMMENT '用户ID，外键 → user.id',
  `product_id` INT UNSIGNED NOT NULL COMMENT '商品ID，外键 → product.id',
  `quantity`   INT UNSIGNED NOT NULL DEFAULT 1      COMMENT '数量',
  PRIMARY KEY (`id`),
  KEY `idx_cart_user` (`user_id`),          -- 给外键建索引，建一个名叫 idx_cart_user 的索引，查询更快
  KEY `idx_cart_product` (`product_id`),
  -- 外键约束：当 user 表对应记录被删除时，购物车里的记录一并删除
  CONSTRAINT `fk_cart_user`    FOREIGN KEY (`user_id`)    REFERENCES `user` (`id`)    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_cart_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='购物车表（用户-商品多对多中间表）';
```

### BigDecimal

数据库中 `price` 字段 `decimal(10,2)`，在Java中要使用 `private BigDecimal price;`，绝对不要使用 `Double`，`Double` 会严重丢失丢失精度

### DTO

DTO 的全称是 Data Transfer Object（数据传输对象）。为什么需要它？因为我们的 JOIN 查询会同时从多张表取字段（比如用户名来自 user 表、商品名来自 product 表），单用一个实体类装不下，所以专门建一个类来接收查询结果。