# ape-easy-template
`ape-easy-template` 是 `ape-easy` 的页面脚手架模板仓库，专注于 **Ant Design Pro** 场景下的页面结构与 TypeScript 规范化输出。
通过 `ape-easy` CLI 使用该模板，可以快速生成包含 **列表、详情、Model、API、样式** 的标准模块。

## 目录结构

```text
ant-pro-template/
  src/
    protable/
      simple/
        api.ts
        detail.tsx
        list.tsx
        model.ts
        styles.less
```

## 使用方式（示例）

> 以下为说明性示例，具体参数以 `ape-easy` CLI 的文档为准。

```bash
ape-easy generate protable simple --module_name=Image --connect_model=true --batch_handler=true --hander_modal=true
```

## 模板特性

- 统一的 TypeScript 类型定义，减少 `any` 使用。
- 列表页与详情页数据接口命名一致，便于快速串联业务逻辑。
- 支持可选的批量操作、弹窗表单、Model 连接能力。

## 规范说明

- 模板代码默认使用 **TypeScript** 与 **React Function Component** 书写。
- 业务实体类型统一在 `api.ts` 中定义，页面组件仅引用。
- 如需自定义字段，请优先扩展类型而非在页面中直接使用 `any`。
