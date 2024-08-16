# Git

## git commit paradigm

Git 提交范式通常指的是在进行 Git 提交时所遵循的一种规范化格式，以便于团队协作和代码管理。常见的提交信息格式包括以下几个部分：

1. **类型 (type)**: 提交的类型，常见的有：
   - `feat`: 新功能
   - `fix`: 修复 bug
   - `docs`: 文档变更
   - `style`: 代码格式（不影响代码运行的变更）
   - `refactor`: 代码重构（既不是修复 bug 也不是添加功能）
   - `test`: 添加测试
   - `chore`: 其他杂项变更

2. **范围 (scope)**: 可选，表示影响的模块或功能范围，例如 `api`、`ui` 等。

3. **描述 (description)**: 简要描述提交的内容，通常不超过 72 个字符。

4. **正文 (body)**: 可选，详细描述提交的内容和原因，换行后写。

5. **脚注 (footer)**: 可选，通常用于关联问题或任务，例如 `Closes #123`。

### 示例

```
feat(api): add user login endpoint

This commit adds a new endpoint for user login, allowing users to authenticate using their email and password.

Closes #42
```

### 提交规范工具

为了帮助团队遵循提交规范，可以使用一些工具，如:
- **Commitlint**: 用于检查提交信息是否符合规范。
- **Husky**: 用于在 Git 钩子中运行 lint 检查。
