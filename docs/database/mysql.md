# MYSQL

## 默认字符集

- 字符集：`utf8mb4`
- 排序规则（collation）：`utf8mb4_0900_ai_ci`（Navicat16 新建时默认）

## 进入容器

```shell
podman exec -it [容器 ID 或名称] bash
podman exec -it [容器ID或名称] sh
```

## 登录 mysql

```shell
mysql -u root -p
```

## 查看默认字符集

```sql
SHOW VARIABLES LIKE 'character_set_%';
SHOW VARIABLES LIKE 'character_set_server';
```

## 退出 mysql 和容器

```bash
exit
```
