---
name: git-commit
description: Git 提交规范。Use when writing a git commit message or preparing a commit in this repo — `git commit`, 起草提交信息、填写 commit message、staging 后组织提交. Triggers on commit, 提交, 提交信息, commit message, 提交规范.
---

# Git 提交规范

本规范统一本仓库的提交信息格式与提交纪律，**每次提交 git 时都必须遵循**。

## 1. 提交信息结构

```
<type>(<scope>): <subject>

[<body>]

[<footer>]
```

## 2. type（必填）

| type       | 含义                                              |
| ---------- | ------------------------------------------------- |
| `feat`     | 新功能                                            |
| `fix`      | 修复 Bug                                          |
| `docs`     | 仅文档变更（含注释、swagger 注解）                |
| `style`    | 格式调整，不影响代码逻辑（gofmt、空格、分号）     |
| `refactor` | 重构，行为不变                                    |
| `perf`     | 性能优化                                          |
| `test`     | 增删测试                                          |
| `build`    | 构建系统/依赖变更（go.mod、Dockerfile、Makefile） |
| `ci`       | CI 配置变更                                       |
| `chore`    | 杂项（配置、工具、日常维护），不碰 src 与 test    |
| `revert`   | 回滚某次提交                                      |

**规则**：一次提交只对应一个 type；`fix` + `feat` 混在一起时拆成两个提交。

## 3. scope（可选）

本次改动涉及的模块/范围，小写，用 `-` 连接。取影响面最大的模块，不跨模块。

```
feat(user): 增加最后登录时间字段
fix(auth): 修复登录 token 生成错误
refactor(repository): 合并批量删除逻辑
chore(deps): 升级 fiber 到 v3
```

## 4. subject（必填）

- 一行，≤ 50 字符
- 祈使句开头，动词在前（如 `增加`、`修复`、`重构`），不用"新增了""已经"
- 提交信息统一使用中文（type/scope 等英文标识除外），句末不加句号
- 只描述"做了什么"，"为什么"放 body

```
feat(user): 增加最后登录时间字段
fix(auth): 修复登录 token 生成错误
```

## 5. body（可选但推荐）

- 空一行后写，每行 ≤ 72 字符
- 说明"为什么这么改"与"改了什么影响面"
- 涉及接口/分层改动时，点明影响面（Handler/Service/Repository、schema 变更、是否已重跑 swag）

```
feat(user): 增加最后登录时间字段

用户表新增 last_login_at 字段，登录成功后由 auth service 写入。
UserResponse 与 LoginUser DTO 同步暴露该字段，供管理端与客户端展示。
字段变更经 AutoMigrate 追加列，无破坏性。
```

## 6. footer（可选）

- 空一行后写
- 破坏性变更：`BREAKING CHANGE: <说明>`；scope 后加 `!`（如 `feat(user)!:`）也可
- 关联 issue：`Closes #123` / `Fixes #456`

## 7. 完整示例

```
feat(user): 增加最后登录时间字段

users 表新增 last_login_at（毫秒时间戳，0=从未登录），登录成功后
由 auth service 写入并回填到 LoginUser/UserResponse，供前端与管理端展示。

字段由 AutoMigrate 追加列，存量数据为 0，无破坏性变更。
```

```
fix(auth): 避免登录时因记录时间失败而中断

最后登录时间写入失败仅记 warn 日志，不再阻断本次登录，
避免非关键指标写入放大成登录失败。

Closes #88
```

## 8. 提交纪律（必须遵守）

1. **原子提交**：一次提交一个逻辑变更，可独立回滚。
2. **不混脏**：只 stage 本提交相关文件，提交前 `git diff --cached` 复查，杜绝误提交密钥/日志/构建产物。
3. **提交前自查**：`gofmt` + `go vet` + `go build` + `go test`；涉及接口变更确认 `swag init --parseDependency --parseInternal` 已跑。
4. **不 amend 已推送提交**，不 force-push（除非明确要求）。
5. **合入前 rebase** 而非 merge，保持线性历史；冲突只改行为、不改意图。
6. 仅在用户明确要求（如"提交"、"commit"）时才执行 `git commit`，不得擅自提交。
7. **提交信息必须使用中文**：subject 与 body 一律中文编写（type/scope/Closes 等英文标识除外），不得中英混杂或使用英文整句，保持一致风格。

## 9. 执行流程

1. `git status` 查看工作区改动，`git diff` / `git diff --cached` 复核本次改动内容与范围。
2. 依据改动内容确定 type、scope，按第 1-7 节编写 commit message。
3. 只 `git add` 本提交相关文件，确认无误后 `git commit`。
4. 提交信息统一用中文正文描述（见示例），保持一致风格。
