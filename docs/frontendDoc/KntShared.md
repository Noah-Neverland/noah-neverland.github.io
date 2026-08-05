# knt-shared 组件库

基于 **Arco Design Vue 2.50.0** 二次封装的 Vue3 组件库，参考 Vben Admin v2.9.1 设计思路实现，全量 TypeScript 支持。

---

## 安装与引入

```bash
npm install knt-shared
# 或
pnpm add knt-shared
```

### 全局注册

```typescript
import { createApp } from 'vue';
import { KntSharedPlugin } from 'knt-shared';
import App from './App.vue';

const app = createApp(App);
app.use(KntSharedPlugin);
app.mount('#app');
```

### 按需引入

```typescript
import { BasicForm, useForm } from 'knt-shared';
import type { FormSchema } from 'knt-shared';
```

---

## 组件

### Form 表单

对 Arco Design `a-form` 的二次封装，支持通过 Schema 配置渲染表单、动态字段控制、只读模式、展开/收起等功能。

#### 引入方式

```typescript
// 方式一：Props 直传
import { BasicForm } from 'knt-shared';

// 方式二：Hook 方式
import { BasicForm, useForm } from 'knt-shared';
import type { FormSchema, BasicFormProps } from 'knt-shared';
```

#### Props

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| `schemas` | 表单字段配置列表 | `FormSchema[]` | `[]` |
| `layout` | 表单布局 | `'horizontal' \| 'vertical' \| 'inline'` | `'horizontal'` |
| `size` | 表单尺寸 | `'mini' \| 'small' \| 'medium' \| 'large'` | — |
| `gutter` | 栅格间距 | `number` | `24` |
| `disabled` | 是否禁用整个表单 | `boolean` | — |
| `labelAlign` | 标签对齐方式 | `'left' \| 'right'` | `'right'` |
| `autoLabelWidth` | 是否自动计算标签宽度 | `boolean` | — |
| `labelColProps` | 标签列属性 | `Record<string, any>` | — |
| `wrapperColProps` | 输入框列属性 | `Record<string, any>` | — |
| `baseColProps` | 基础栅格列属性 | `Record<string, any>` | — |
| `baseFormItemProps` | 基础 FormItem 属性 | `Record<string, any>` | — |
| `actionColOptions` | 操作按钮列配置 | `Record<string, any>` | — |
| `actionFormItemProps` | 操作按钮 FormItem 属性 | `Record<string, any>` | — |
| `autoSetPlaceHolder` | 是否自动设置占位符 | `boolean` | `true` |
| `showSubmitButton` | 是否显示提交按钮 | `boolean` | `true` |
| `showResetButton` | 是否显示重置按钮 | `boolean` | `true` |
| `submitButtonText` | 提交按钮文本 | `string` | `'提交'` |
| `resetButtonText` | 重置按钮文本 | `string` | `'重置'` |
| `showActionButtons` | 是否显示操作按钮区域 | `boolean` | `true` |
| `readonly` | 全局只读模式 | `boolean` | — |
| `autoTrim` | 全局开启失焦自动 trim | `boolean` | `true` |
| `context` | 只读渲染的额外上下文数据 | `Record<string, any>` | — |
| `showCollapse` | 是否显示展开/收起按钮 | `boolean` | `false` |
| `collapseRows` | 收起时显示的行数 | `number` | `1` |
| `defaultCollapsed` | 默认是否收起 | `boolean` | `true` |

#### FormSchema 字段配置

| 参数 | 说明 | 类型 | 必填 |
|---|---|---|---|
| `field` | 字段名 | `string` | 是 |
| `label` | 标签文本 | `string` | 是 |
| `component` | 组件类型 | `string \| ComponentType` | 是 |
| `componentProps` | 组件属性（支持函数动态计算） | `Record<string, any> \| Function` | — |
| `rules` | 验证规则 | `FieldRule[]` | — |
| `defaultValue` | 默认值 | `any` | — |
| `span` | 栅格跨度 | `number` | — |
| `show` | 是否显示（支持函数） | `boolean \| ((formModel) => boolean)` | — |
| `disabled` | 是否禁用（支持函数） | `boolean \| ((formModel) => boolean)` | — |
| `required` | 是否必填（自动添加星号） | `boolean` | — |
| `readonly` | 是否只读（支持函数） | `boolean \| ((formModel) => boolean)` | — |
| `readonlyConfig` | 只读模式配置 | `object` | — |
| `render` | 自定义渲染函数 | `Function` | — |
| `renderComponentContent` | 自定义组件内容渲染函数 | `Function` | — |
| `slotName` | 插槽名称 | `string` | — |
| `help` | 帮助文本 | `string` | — |
| `extra` | 额外提示信息 | `string` | — |
| `colProps` | 栅格列属性 | `Record<string, any>` | — |
| `labelColProps` | 标签列属性 | `Record<string, any>` | — |
| `wrapperColProps` | 输入框列属性 | `Record<string, any>` | — |
| `formItemProps` | FormItem 的其他属性 | `Record<string, any>` | — |
| `labelEllipsis` | 是否启用 label 省略显示 | `boolean` | — |
| `labelMaxWidth` | label 最大宽度 | `number \| string` | — |
| `labelTooltip` | 是否显示 label tooltip | `boolean \| string` | — |
| `trim` | 是否失焦自动去除空格 | `boolean` | — |
| `componentSlots` | 组件插槽配置 | `Record<string, SlotConfig>` | — |

#### 内置 ComponentType

`Input`、`InputNumber`、`InputPassword`、`Textarea`、`AutoComplete`、`Select`、`ApiSelect`、`Radio`、`RadioGroup`、`Checkbox`、`CheckboxGroup`、`Cascader`、`ApiCascader`、`TreeSelect`、`DatePicker`、`TimePicker`、`RangePicker`、`Switch`、`Slider`、`Rate`、`Upload`、`BasicUpload`、`Mention`、`Transfer`

#### Events

| 事件名 | 说明 | 回调参数 |
|---|---|---|
| `register` | 注册表单实例（Hook 方式必须绑定） | `(formInstance: any)` |
| `submit` | 表单提交 | `(values: Record<string, any>)` |
| `reset` | 表单重置 | — |
| `validate` | 字段校验 | `(field: string, valid: boolean, message: string)` |

#### Methods（useForm 暴露）

| 方法名 | 说明 | 参数 | 返回值 |
|---|---|---|---|
| `getFieldsValue` | 获取所有字段值 | — | `Record<string, any>` |
| `setFieldsValue` | 设置字段值 | `(values: Record<string, any>)` | `Promise<void>` |
| `resetFields` | 重置表单 | — | `Promise<void>` |
| `validate` | 验证表单 | `(nameList?: string[])` | `Promise<any>` |
| `validateFields` | 验证指定字段 | `(nameList?: string[])` | `Promise<any>` |
| `clearValidate` | 清除验证 | `(field?: string \| string[])` | `Promise<void>` |
| `submit` | 提交表单 | — | `Promise<any>` |
| `updateSchema` | 更新 schema | `(schema: Partial<FormSchema> \| Partial<FormSchema>[])` | `Promise<void>` |
| `resetSchema` | 重置 schema | `(schemas: FormSchema[])` | `Promise<void>` |
| `removeSchemaByField` | 根据字段名移除 schema | `(field: string \| string[])` | `Promise<void>` |
| `appendSchemaByField` | 添加 schema | `(schema, prefixField?, first?)` | `Promise<void>` |
| `getSchema` | 获取 schema | `(field?: string)` | `FormSchema \| FormSchema[]` |
| `setProps` | 设置表单 Props | `(formProps: Partial<BasicFormProps>)` | `Promise<void>` |
| `scrollToField` | 滚动到指定字段 | `(name: string, options?)` | `Promise<void>` |
| `getForm` | 获取表单实例 | — | `any` |

#### 代码示例

**方式一：Props 直传**

```vue
<template>
  <BasicForm
    :schemas="schemas"
    :label-col-props="{ span: 6 }"
    :wrapper-col-props="{ span: 18 }"
    @submit="handleSubmit"
  />
</template>

<script setup lang="ts">
import { BasicForm } from 'knt-shared';
import type { FormSchema } from 'knt-shared';

const schemas: FormSchema[] = [
  {
    field: 'name',
    label: '姓名',
    component: 'Input',
    rules: [{ required: true, message: '请输入姓名' }],
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 },
      ],
    },
  },
];

function handleSubmit(values: Record<string, any>) {
  console.log('提交数据：', values);
}
</script>
```

**方式二：Hook 方式**

```vue
<template>
  <BasicForm @register="register" />
</template>

<script setup lang="ts">
import { BasicForm, useForm } from 'knt-shared';

const [register, { getFieldsValue, setFieldsValue, validate }] = useForm({
  schemas: [
    { field: 'name', label: '姓名', component: 'Input' },
    { field: 'age', label: '年龄', component: 'InputNumber' },
  ],
  showActionButtons: false,
});

async function handleLoad(data: any) {
  await setFieldsValue(data);
}

async function handleSave() {
  const values = await validate();
  console.log(values);
}
</script>
```

---

### Table 表格

对 Arco Design `a-table` 的二次封装，集成查询表单、工具栏、行内编辑、序号列、操作列、远程数据加载等功能。

#### 引入方式

```typescript
import { BasicTable, useTable } from 'knt-shared';
import type { BasicColumn, BasicTableProps } from 'knt-shared';
```

#### Props（扩展属性）

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| `tableId` | 表格唯一标识（用于列设置持久化） | `string` | — |
| `api` | 远程数据请求函数 | `(params, signal?) => Promise<{data, total}>` | — |
| `immediate` | 挂载后是否立即请求 | `boolean` | `true` |
| `fetchSetting` | 请求字段映射配置 | `FetchSetting` | — |
| `beforeFetch` | 请求前参数预处理 | `(params) => any` | — |
| `afterFetch` | 请求后数据后处理 | `(data) => any` | — |
| `onFetchError` | 请求失败回调 | `(error) => void` | — |
| `search` | 查询表单配置 | `false \| TableSearchConfig` | — |
| `toolbar` | 工具栏配置 | `false \| TableToolbarConfig` | — |
| `showIndexColumn` | 是否显示序号列 | `boolean` | — |
| `indexColumnProps` | 序号列额外配置 | `Partial<BasicColumn>` | — |
| `showActionColumn` | 是否显示操作列 | `boolean` | — |
| `actionColumn` | 操作列配置 | `object` | — |
| `autoHeight` | 是否自动填充容器高度 | `boolean` | — |
| `maxHeight` | 表格最大高度 | `number \| string` | — |
| `editConfig` | 可编辑表格配置 | `TableEditConfig` | — |
| `emptyConfig` | 全局空值展示配置 | `false \| string \| TableEmptyConfig` | — |

#### Props（Arco 原生属性）

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| `columns` | 表格列配置 | `BasicColumn[]` | `[]` |
| `data` | 表格数据 | `TableData[]` | `[]` |
| `bordered` | 是否显示边框 | `boolean \| TableBorder` | `true` |
| `hoverable` | 是否显示行 hover 效果 | `boolean` | `true` |
| `stripe` | 是否开启斑马纹 | `boolean` | `false` |
| `size` | 表格尺寸 | `'mini' \| 'small' \| 'medium' \| 'large'` | `'large'` |
| `loading` | 是否显示加载中 | `boolean` | `false` |
| `rowKey` | 行 key 取值字段 | `string \| Function` | `'id'` |
| `pagination` | 分页配置 | `false \| TablePaginationConfig` | `{current:1, pageSize:20}` |
| `rowSelection` | 行选择器配置 | `TableRowSelection` | — |
| `expandable` | 展开行配置 | `TableExpandable` | — |
| `scroll` | 滚动配置 | `{x?, y?, minWidth?, maxHeight?}` | — |
| `showHeader` | 是否显示表头 | `boolean` | `true` |
| `draggable` | 拖拽排序配置 | `TableDraggable` | — |
| `columnResizable` | 是否允许拖拽调整列宽 | `boolean` | — |
| `stickyHeader` | 是否开启表头吸顶 | `boolean \| number` | — |
| `spanMethod` | 单元格合并方法 | `Function` | — |
| `summary` | 是否显示表尾总结行 | `boolean \| Function` | — |
| `virtualListProps` | 虚拟列表配置 | `Record<string, any>` | — |

#### BasicColumn 列配置

| 参数 | 说明 | 类型 |
|---|---|---|
| `title` | 列标题 | `string \| Function` |
| `dataIndex` | 列数据字段名 | `string` |
| `width` | 列宽度（px） | `number` |
| `align` | 对齐方式 | `'left' \| 'center' \| 'right'` |
| `fixed` | 是否固定列 | `'left' \| 'right'` |
| `show` | 是否显示列 | `boolean` |
| `edit` | 是否可编辑 | `boolean` |
| `editComponent` | 编辑组件类型 | `string \| Component` |
| `editComponentProps` | 编辑组件属性 | `Record<string, any> \| Function` |
| `editRule` | 编辑规则 | `EditRule \| EditRule[]` |
| `customRender` | 自定义渲染函数 | `(data) => VNode` |
| `slotName` | 插槽名称 | `string` |
| `format` | 格式化函数 | `(text, record, index) => string` |
| `ellipsis` | 文本省略配置 | `boolean \| object` |
| `emptyConfig` | 列级空值展示配置 | `false \| string \| TableEmptyConfig` |
| `sortable` | 排序配置 | `object` |
| `filterable` | 过滤配置 | `object` |

#### Events

| 事件名 | 说明 | 回调参数 |
|---|---|---|
| `register` | 注册表格实例 | `(tableInstance, formInstance?)` |
| `change` | 排序/筛选/分页变化 | `(data, extra, currentData, pagination)` |
| `select` | 行选择变化 | `(rowKeys, rowKey, record)` |
| `selectAll` | 全选变化 | `(checked, rows, rowKeys)` |
| `expand` | 展开行变化 | `(record, expanded)` |
| `row-click` | 行点击 | `(record, event)` |
| `row-dblclick` | 行双击 | `(record, event)` |
| `cell-click` | 单元格点击 | `(record, column, event)` |
| `search` | 查询表单提交 | `(values)` |
| `reset` | 查询表单重置 | — |
| `fetch-success` | 数据加载成功 | `(data)` |
| `fetch-error` | 数据加载失败 | `(error)` |
| `edit-save` | 编辑保存 | `(record, changedValues)` |
| `edit-cancel` | 编辑取消 | `(record)` |
| `edit-delete` | 编辑删除行 | `(record)` |
| `edit-add` | 添加新行 | `(record)` |

#### Methods（useTable 暴露）

| 方法名 | 说明 | 参数 | 返回值 |
|---|---|---|---|
| `reload` | 重新加载数据 | `(opt?: {page?})` | `Promise<void>` |
| `refresh` | 刷新数据（保持当前页） | — | `Promise<void>` |
| `search` | 执行查询 | — | `Promise<void>` |
| `getDataSource` | 获取表格数据 | — | `TableData[]` |
| `setDataSource` | 设置表格数据 | `(data: TableData[])` | `Promise<void>` |
| `getSelectRows` | 获取选中行 | — | `TableData[]` |
| `getSelectRowKeys` | 获取选中行 keys | — | `(string \| number)[]` |
| `clearSelectedRowKeys` | 清空选中行 | — | `void` |
| `setSelectedRowKeys` | 设置选中行 keys | `(keys)` | `void` |
| `setSelectedRows` | 设置选中行数据 | `(rows)` | `void` |
| `deleteSelectRowByKey` | 删除选中行 | `(key)` | `void` |
| `getPaginationInfo` | 获取分页信息 | — | `TablePaginationConfig \| false` |
| `setPagination` | 设置分页信息 | `(info)` | `Promise<void>` |
| `getSize` | 获取表格大小 | — | `string` |
| `setSize` | 设置表格大小 | `(size)` | `void` |
| `getColumns` | 获取列配置 | — | `BasicColumn[]` |
| `updateColumns` | 更新列配置 | `(columns)` | `Promise<void>` |
| `setProps` | 设置表格 Props | `(props)` | `Promise<void>` |
| `setLoading` | 设置加载状态 | `(loading)` | `void` |
| `getSearchFormValues` | 获取查询表单值 | — | `Record<string, any>` |
| `setSearchFormValues` | 设置查询表单值 | `(values)` | `Promise<void>` |
| `expandAll` | 展开所有行 | — | `void` |
| `collapseAll` | 收起所有行 | — | `void` |
| `getForm` | 获取查询表单实例 | — | `any` |
| `startEdit` | 开始编辑 | `(record, column?)` | `void` |
| `saveEdit` | 保存编辑 | `(record)` | `Promise<boolean>` |
| `cancelEdit` | 取消编辑 | `(record)` | `void` |
| `deleteRow` | 删除行 | `(record)` | `Promise<void>` |
| `addRow` | 添加新行 | `(position: 'top' \| 'bottom')` | `Promise<void>` |
| `getEditingRows` | 获取所有编辑中的数据 | — | `TableData[]` |
| `saveAllEdits` | 批量保存编辑 | — | `Promise<boolean>` |
| `cancelAllEdits` | 批量取消编辑 | — | `void` |
| `clearEditingRows` | 清空所有编辑状态 | — | `void` |
| `isEditing` | 判断是否正在编辑 | `(record, column?)` | `boolean` |
| `getEditValue` | 获取编辑值 | `(record, column)` | `any` |
| `setEditValue` | 设置编辑值 | `(record, column, value)` | `void` |
| `getChangedValues` | 获取变更的值 | `(record)` | `Record<string, any>` |

#### 代码示例

**远程加载 + 查询**

```vue
<template>
  <BasicTable @register="register" />
</template>

<script setup lang="ts">
import { BasicTable, useTable } from 'knt-shared';
import type { BasicColumn } from 'knt-shared';
import { getUserList } from '@/api/user';

const columns: BasicColumn[] = [
  { title: '姓名', dataIndex: 'name', width: 120 },
  { title: '状态', dataIndex: 'status', width: 100 },
  { title: '创建时间', dataIndex: 'createTime', width: 180 },
];

const [register, { reload }] = useTable({
  api: getUserList,
  columns,
  rowKey: 'id',
  search: {
    show: true,
    schemas: [
      { field: 'name', label: '姓名', component: 'Input' },
    ],
  },
  toolbar: { show: true, title: '用户列表' },
  showActionColumn: true,
  actionColumn: {
    title: '操作',
    width: 150,
    actions: (record) => [
      { label: '编辑', onClick: () => handleEdit(record) },
      { label: '删除', color: 'danger', onClick: () => handleDelete(record) },
    ],
  },
});
</script>
```

---

### Modal 模态框

对 Arco Design `a-modal` 的二次封装，支持全屏切换、自适应高度、内容区加载状态、跨组件通信。

#### 引入方式

```typescript
import { BasicModal, useModal, useModalInner } from 'knt-shared';
import type { BasicModalProps } from 'knt-shared';
```

#### Props（Arco 原生属性）

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| `visible` | 是否显示弹窗 | `boolean` | `false` |
| `title` | 弹窗标题 | `string` | — |
| `width` | 弹窗宽度 | `number \| string` | `520` |
| `mask` | 是否显示遮罩层 | `boolean` | `true` |
| `maskClosable` | 点击遮罩是否关闭 | `boolean` | `true` |
| `closable` | 是否显示关闭按钮 | `boolean` | `true` |
| `okText` | 确认按钮文案 | `string` | `'确定'` |
| `cancelText` | 取消按钮文案 | `string` | `'取消'` |
| `okLoading` | 确认按钮是否加载中 | `boolean` | — |
| `footer` | 是否展示页脚 | `boolean` | `true` |
| `titleAlign` | 标题水平对齐 | `'start' \| 'center'` | `'center'` |
| `alignCenter` | 内容是否居中 | `boolean` | `true` |
| `escToClose` | 是否支持 ESC 关闭 | `boolean` | `true` |
| `draggable` | 是否支持拖动 | `boolean` | — |
| `renderToBody` | 是否挂载在 body 下 | `boolean` | `true` |
| `unmountOnClose` | 关闭时是否卸载节点 | `boolean` | — |
| `fullscreen` | 是否全屏展示 | `boolean` | — |

#### Props（扩展属性）

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| `height` | 固定 modal 高度 | `number \| string` | — |
| `minHeight` | modal 最小高度 | `number \| string` | `46` |
| `useWrapper` | 是否开启自适应高度 | `boolean` | `true` |
| `wrapperFooterOffset` | 自适应高度时底部和顶部的间距 | `number` | — |
| `canFullscreen` | 是否显示全屏切换按钮 | `boolean` | `false` |
| `defaultFullscreen` | 默认全屏 | `boolean` | — |
| `loading` | 内容区加载状态 | `boolean` | — |
| `loadingTip` | 加载文本 | `string` | — |
| `showCancelBtn` | 是否显示取消按钮 | `boolean` | `true` |
| `showOkBtn` | 是否显示确认按钮 | `boolean` | `true` |
| `showFooter` | 是否显示底部 | `boolean` | `true` |
| `helpMessage` | 标题右侧提示文本 | `string \| string[]` | — |
| `centered` | 是否居中弹窗 | `boolean` | — |
| `closeFunc` | 关闭前执行（返回 true 才关闭） | `() => Promise<boolean>` | — |
| `clearDataOnClose` | 关闭时是否自动清空数据 | `boolean` | — |

#### Events

| 事件名 | 说明 | 回调参数 |
|---|---|---|
| `register` | 注册 Modal 实例 | `(instance)` |
| `update:visible` | v-model:visible 更新 | `(visible: boolean)` |
| `ok` | 点击确定 | `(ev: MouseEvent)` |
| `cancel` | 点击取消或关闭 | `(ev: MouseEvent \| KeyboardEvent)` |
| `open` | 对话框打开后（动画结束） | — |
| `close` | 对话框关闭后（动画结束） | — |
| `before-open` | 对话框打开前 | — |
| `before-close` | 对话框关闭前 | — |
| `visible-change` | 可见性变化 | `(visible: boolean)` |

#### Methods（useModal）

> `useModal` 用于父组件（外部）控制弹窗。

| 方法名 | 说明 | 参数 | 返回值 |
|---|---|---|---|
| `openModal` | 打开/关闭弹窗（第二个参数可传数据给内部组件） | `(visible?, data?)` | `void` |
| `closeModal` | 关闭弹窗 | — | `void` |
| `setModalProps` | 设置 Modal Props | `(props: Partial<BasicModalProps>)` | `void` |
| `getVisible` | 获取 Modal 是否可见 | — | `boolean` |
| `changeOkLoading` | 修改确认按钮的 loading 状态 | `(loading: boolean)` | `void` |
| `changeLoading` | 修改 modal 的 loading 状态 | `(loading: boolean)` | `void` |
| `getModalProps` | 获取 Modal Props | — | `BasicModalProps` |
| `clearData` | 清空弹窗数据 | — | `void` |

#### Methods（useModalInner）

> `useModalInner` 用于弹窗内部组件，可接收 `openModal` 传入的数据。

| 方法名 | 说明 |
|---|---|
| `closeModal` | 关闭弹窗 |
| `changeOkLoading` | 修改确认按钮 loading |
| `changeLoading` | 修改 modal loading |
| `setModalProps` | 设置 Modal Props |
| `getModalProps` | 获取 Modal Props |
| `clearData` | 清空弹窗数据 |

接收的数据通过 `openModal(true, data)` 传入，在 `useModalInner` 回调函数中获取：

```typescript
const [register, { closeModal }] = useModalInner((data) => {
  // data 为 openModal 传入的第二个参数
  console.log('接收到的数据：', data);
});
```

#### 代码示例

**父组件：使用 useModal**

```vue
<template>
  <a-button @click="openModal(true, { id: 1 })">打开弹窗</a-button>
  <UserModal @register="register" @ok="handleOk" />
</template>

<script setup lang="ts">
import { useModal } from 'knt-shared';
import UserModal from './UserModal.vue';

const [register, { openModal }] = useModal();

function handleOk() {
  // 处理确认逻辑
}
</script>
```

**子组件：使用 useModalInner**

```vue
<template>
  <BasicModal @register="register" title="用户详情" @ok="handleOk">
    <div>弹窗内容</div>
  </BasicModal>
</template>

<script setup lang="ts">
import { BasicModal, useModalInner } from 'knt-shared';

const [register, { closeModal, changeOkLoading }] = useModalInner(async (data) => {
  // data 是父组件 openModal(true, data) 传入的数据
  console.log(data.id);
});

async function handleOk() {
  changeOkLoading(true);
  // 处理保存逻辑...
  closeModal();
}
</script>
```

---

### Drawer 抽屉

对 Arco Design `a-drawer` 的二次封装，用法与 Modal 对称。

#### 引入方式

```typescript
import { BasicDrawer, useDrawer, useDrawerInner } from 'knt-shared';
import type { BasicDrawerProps } from 'knt-shared';
```

#### Props（Arco 原生属性）

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| `visible` | 抽屉是否可见 | `boolean` | `false` |
| `title` | 标题 | `string` | — |
| `placement` | 抽屉位置 | `'top' \| 'right' \| 'bottom' \| 'left'` | `'right'` |
| `width` | 抽屉宽度（left/right 时生效） | `number \| string` | `378` |
| `height` | 抽屉高度（top/bottom 时生效） | `number \| string` | — |
| `mask` | 是否显示遮罩层 | `boolean` | `true` |
| `maskClosable` | 点击遮罩是否关闭 | `boolean` | `true` |
| `closable` | 是否显示关闭按钮 | `boolean` | `true` |
| `okText` | 确认按钮文案 | `string` | — |
| `cancelText` | 取消按钮文案 | `string` | — |
| `okLoading` | 确认按钮是否加载中 | `boolean` | — |
| `footer` | 是否展示底部 | `boolean` | — |
| `header` | 是否展示头部 | `boolean` | — |
| `escToClose` | 是否支持 ESC 关闭 | `boolean` | — |
| `renderToBody` | 是否挂载在 body 下 | `boolean` | — |
| `unmountOnClose` | 关闭时是否卸载节点 | `boolean` | — |

#### Props（扩展属性）

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| `loading` | 内容区加载状态 | `boolean` | — |
| `loadingTip` | 加载文本 | `string` | — |
| `showCancelBtn` | 是否显示取消按钮 | `boolean` | `true` |
| `showOkBtn` | 是否显示确认按钮 | `boolean` | `true` |
| `showFooter` | 是否显示底部（优先级高于 footer） | `boolean` | `true` |
| `helpMessage` | 标题右侧提示文本 | `string \| string[]` | — |
| `closeFunc` | 关闭前执行（返回 true 才关闭） | `() => Promise<boolean>` | — |
| `clearDataOnClose` | 关闭时是否自动清空数据 | `boolean` | — |

#### Events

| 事件名 | 说明 | 回调参数 |
|---|---|---|
| `register` | 注册 Drawer 实例 | `(instance)` |
| `update:visible` | v-model:visible 更新 | `(visible: boolean)` |
| `ok` | 点击确定 | `(ev: MouseEvent)` |
| `cancel` | 点击取消或关闭 | `(ev: MouseEvent \| KeyboardEvent)` |
| `open` | 抽屉打开后（动画结束） | — |
| `close` | 抽屉关闭后（动画结束） | — |
| `before-open` | 抽屉打开前 | — |
| `before-close` | 抽屉关闭前 | — |
| `visible-change` | 可见性变化 | `(visible: boolean)` |

#### Methods（useDrawer / useDrawerInner）

与 Modal 对称，`openModal` → `openDrawer`，`closeModal` → `closeDrawer`，其余方法名以 `Drawer` 替代 `Modal`。

#### 代码示例

```vue
<!-- 父组件 -->
<template>
  <a-button @click="openDrawer(true, { id: 1 })">打开抽屉</a-button>
  <UserDrawer @register="register" />
</template>

<script setup lang="ts">
import { useDrawer } from 'knt-shared';
import UserDrawer from './UserDrawer.vue';
const [register, { openDrawer }] = useDrawer();
</script>
```

```vue
<!-- 子组件 -->
<template>
  <BasicDrawer @register="register" title="用户详情" @ok="handleOk">
    内容区域
  </BasicDrawer>
</template>

<script setup lang="ts">
import { BasicDrawer, useDrawerInner } from 'knt-shared';

const [register, { closeDrawer }] = useDrawerInner((data) => {
  console.log(data.id);
});

function handleOk() {
  closeDrawer();
}
</script>
```

---

### Description 详情

对 Arco Design `a-descriptions` 的二次封装，通过 Schema 配置渲染详情字段。

#### 引入方式

```typescript
import { BasicDescription, useDescription } from 'knt-shared';
import type { BasicDescriptionProps, DescItem } from 'knt-shared';
```

#### Props

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| `title` | 标题 | `string` | — |
| `column` | 一行显示的数量 | `number \| object` | `3` |
| `schema` | 详情项配置 | `DescItem[]` | — |
| `data` | 数据源 | `Record<string, any>` | — |
| `helpMessageOptions` | 帮助信息配置 | `HelpMessageOptions` | — |
| `size` | 尺寸 | `'mini' \| 'small' \| 'medium' \| 'large'` | — |
| `bordered` | 是否显示边框 | `boolean` | — |
| `layout` | 布局方式 | `'horizontal' \| 'vertical' \| 'inline-horizontal' \| 'inline-vertical'` | — |
| `colon` | 是否显示冒号 | `boolean` | — |
| `align` | 对齐方式 | `string \| { label?, value? }` | — |
| `tableLayout` | 表格布局 | `'auto' \| 'fixed'` | — |
| `labelStyle` | 标签样式 | `CSSProperties` | — |
| `valueStyle` | 内容样式 | `CSSProperties` | — |
| `showEmptyText` | 是否显示空值占位文本 | `boolean` | — |
| `emptyText` | 空值占位文本 | `string` | — |
| `extra` | 标题额外内容 | `string` | — |

#### DescItem 字段配置

| 参数 | 说明 | 类型 |
|---|---|---|
| `field` | 字段名 | `string` |
| `label` | 标签名 | `string` |
| `span` | 包含列的数量 | `number` |
| `labelMinWidth` | 标签最小宽度 | `number` |
| `contentMinWidth` | 内容最小宽度 | `number` |
| `labelStyle` | 标签样式 | `CSSProperties` |
| `contentStyle` | 内容样式 | `CSSProperties` |
| `show` | 动态判断是否显示 | `(data) => boolean` |
| `render` | 自定义渲染内容 | `(val, data) => VNodeChild` |

#### Methods

| 方法名 | 说明 |
|---|---|
| `setDescriptionProps` | 设置 Description Props |
| `getDescriptionProps` | 获取 Description Props |

#### 代码示例

```vue
<template>
  <BasicDescription
    title="用户信息"
    :schema="schema"
    :data="userData"
    :column="3"
    bordered
  />
</template>

<script setup lang="ts">
import { BasicDescription } from 'knt-shared';
import type { DescItem } from 'knt-shared';

const schema: DescItem[] = [
  { field: 'name', label: '姓名' },
  { field: 'phone', label: '手机号' },
  {
    field: 'status',
    label: '状态',
    render: (val) => (val === 1 ? '启用' : '禁用'),
  },
];

const userData = { name: '张三', phone: '13800138000', status: 1 };
</script>
```

---

### Upload 上传

对 Arco Design `a-upload` 的二次封装，支持图片预览、裁剪、压缩、视频预览、拖拽排序等。

#### 引入方式

```typescript
import { BasicUpload, useUpload } from 'knt-shared';
import type { BasicUploadProps, UploadFileItem } from 'knt-shared';
```

#### Props

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| `modelValue` | 文件列表（v-model） | `UploadFileItem[] \| string[] \| string` | — |
| `accept` | 接受的文件类型 | `string` | `'image/*'` |
| `maxSize` | 单文件大小上限 | `number` | `30` |
| `maxSizeUnit` | 大小单位 | `'B' \| 'KB' \| 'MB' \| 'GB'` | `'MB'` |
| `maxCount` | 最大文件数量 | `number` | `1` |
| `multiple` | 是否支持多文件上传 | `boolean` | — |
| `disabled` | 是否禁用 | `boolean` | — |
| `readonly` | 是否只读 | `boolean` | — |
| `listType` | 列表展示类型 | `'text' \| 'picture' \| 'picture-card'` | `'picture-card'` |
| `action` | 上传地址 | `string` | — |
| `headers` | 自定义请求头 | `Record<string, string>` | — |
| `data` | 额外的上传参数 | `Record<string, any>` | — |
| `name` | 上传文件的字段名 | `string` | — |
| `withCredentials` | 是否携带 cookie | `boolean` | — |
| `customRequest` | 自定义上传实现 | `(options) => void` | — |
| `beforeUpload` | 上传前的钩子 | `(file) => boolean \| Promise<boolean>` | — |
| `autoUpload` | 是否自动上传 | `boolean` | `true` |
| `resultType` | 返回值类型 | `'fileList' \| 'url' \| 'string'` | `'fileList'` |
| `responseUrlKey` | 从响应中获取 URL 的 key | `string \| Function` | — |
| `imagePreview` | 是否启用图片预览 | `boolean` | — |
| `imageCrop` | 是否启用图片裁剪 | `boolean` | — |
| `imageCompress` | 是否启用图片压缩 | `boolean` | — |
| `compressOptions` | 压缩配置 | `CompressOptions` | — |
| `draggable` | 是否支持拖拽上传 | `boolean` | — |
| `directory` | 是否支持文件夹上传 | `boolean` | — |
| `sortable` | 是否启用拖拽排序 | `boolean` | — |
| `videoPreview` | 是否启用视频预览 | `boolean` | — |
| `videoPreviewMode` | 视频预览模式 | `'modal' \| 'inline'` | — |
| `videoPlayerOptions` | 视频播放器配置 | `VideoPlayerOptions` | — |
| `tip` | 提示文字 | `string` | — |
| `cardSize` | 卡片按钮尺寸 | `number` | — |
| `uploadButtonText` | 上传按钮文字 | `string` | — |
| `uploadButtonType` | 上传按钮类型 | `'primary' \| 'secondary' \| 'outline' \| 'dashed' \| 'text'` | — |
| `showFileList` | 是否显示文件列表 | `boolean` | — |
| `showRemoveButton` | 是否显示删除按钮 | `boolean` | — |
| `showDownloadButton` | 是否显示下载按钮 | `boolean` | — |
| `showPreviewButton` | 是否显示预览按钮 | `boolean` | — |
| `showUploadButton` | 是否显示上传按钮 | `boolean` | — |
| `showErrorMessage` | 上传失败是否显示错误提示 | `boolean` | `true` |
| `showSuccessMessage` | 上传成功是否显示成功提示 | `boolean` | `true` |
| `emptyText` | disabled/readonly 时无文件的文本 | `string` | — |
| `showEmptyState` | disabled/readonly 时是否显示空状态 | `boolean` | — |

#### Events

| 事件名 | 说明 | 回调参数 |
|---|---|---|
| `register` | 注册上传实例 | `(instance)` |
| `update:modelValue` | v-model 更新 | `(value)` |
| `change` | 文件状态改变 | `(fileList)` |
| `handleSuccess` | 上传成功 | `(response, fileItem)` |
| `handleError` | 上传失败 | `(error, fileItem)` |
| `progress` | 上传进度 | `(percent, fileItem)` |
| `remove` | 删除文件 | `(fileItem)` |
| `preview` | 预览文件 | `(fileItem)` |
| `exceed` | 超出数量限制 | `(files, fileList)` |
| `sortChange` | 拖拽排序改变 | `(fileList)` |

#### Methods

| 方法名 | 说明 |
|---|---|
| `submit` | 手动触发上传 |
| `abort` | 中止上传 |
| `clearFiles` | 清空文件列表 |
| `getFileList` | 获取文件列表 |
| `upload` | 上传指定文件 |
| `setFileList` | 设置文件列表（useUpload） |
| `addFile` | 添加文件（useUpload） |
| `removeFile` | 删除文件（useUpload） |
| `updateFile` | 更新文件（useUpload） |
| `setProps` | 设置 Props（useUpload） |

#### 代码示例

```vue
<template>
  <BasicUpload
    v-model="fileList"
    :max-count="5"
    :max-size="10"
    action="/api/upload"
    list-type="picture-card"
    image-preview
    @handleSuccess="onSuccess"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { BasicUpload } from 'knt-shared';
import type { UploadFileItem } from 'knt-shared';

const fileList = ref<UploadFileItem[]>([]);

function onSuccess(response: any, fileItem: UploadFileItem) {
  console.log('上传成功', response);
}
</script>
```

---

### Image 图片

多图展示组件，支持图片列表展示、预览功能。

#### 引入方式

```typescript
import { BasicImage, useImage } from 'knt-shared';
import type { BasicImageProps, ImageItem } from 'knt-shared';
```

#### Props

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| `images` | 图片数据 | `string[] \| ImageItem[]` | — |
| `showAll` | 是否铺开展示所有图片 | `boolean` | — |
| `width` | 图片宽度（px） | `number` | `80` |
| `height` | 图片高度（px） | `number` | `80` |
| `maxCount` | 简单模式下显示的最大数量 | `number` | `1` |
| `preview` | 是否开启预览功能 | `boolean` | — |
| `fit` | 图片填充模式 | `'contain' \| 'cover' \| 'fill' \| 'none' \| 'scale-down'` | `'cover'` |
| `gap` | 图片之间的间距（px） | `number` | `8` |
| `loading` | 是否显示加载状态 | `boolean` | — |
| `errorImage` | 加载失败时的占位图 | `string` | — |
| `disabled` | 是否禁用 | `boolean` | — |
| `emptyText` | 空值占位符 | `string` | `'暂无图片'` |

#### Events

| 事件名 | 说明 | 回调参数 |
|---|---|---|
| `register` | 注册组件实例 | `(instance)` |
| `click` | 点击图片 | `(item: ImageItem, index: number)` |
| `preview` | 预览图片 | `(item: ImageItem, index: number)` |

#### Methods

| 方法名 | 说明 |
|---|---|
| `getImages` | 获取图片列表 |
| `setImages` | 设置图片列表 |
| `getProps` | 获取当前 Props |
| `setProps` | 设置 Props |

#### 代码示例

```vue
<template>
  <BasicImage :images="imageUrls" :width="100" :height="100" preview show-all />
</template>

<script setup lang="ts">
import { BasicImage } from 'knt-shared';
const imageUrls = ['https://example.com/1.jpg', 'https://example.com/2.jpg'];
</script>
```

---

### Loading 加载

提供声明式（`BasicLoading` 组件）和命令式（`createLoading`）两种使用方式。

#### 引入方式

```typescript
import { BasicLoading, createLoading } from 'knt-shared';
import type { BasicLoadingProps, CreateLoadingOptions } from 'knt-shared';
```

#### BasicLoading Props

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| `loading` | 是否显示 loading | `boolean` | — |
| `mode` | 显示模式 | `'viewport' \| 'inside'` | `'viewport'` |
| `target` | 容器元素（mode='inside' 时有效） | `string \| HTMLElement` | — |
| `scrollLock` | loading 时是否锁定页面滚动 | `boolean` | `true`（viewport）/ `false`（inside） |
| `tip` | 提示文案 | `string` | — |
| `zIndex` | 遮罩层 z-index | `number` | `1000` |
| `maskStyle` | 遮罩层样式 | `CSSProperties` | — |
| `maskClass` | 遮罩层类名 | `string \| string[]` | — |

#### createLoading（命令式 API）

```typescript
const loading = createLoading(options?: CreateLoadingOptions);

loading.open(options?: { tip?: string }); // 显示 loading
loading.close();                           // 关闭 loading
loading.setTip(tip: string);              // 更新提示文案
```

`CreateLoadingOptions` 配置同 `BasicLoading Props`。

#### 代码示例

**声明式**

```vue
<template>
  <BasicLoading :loading="isLoading" mode="inside" tip="加载中..." />
</template>
```

**命令式**

```typescript
import { createLoading } from 'knt-shared';

const loading = createLoading({ tip: '正在保存...' });

async function handleSave() {
  loading.open();
  try {
    await save();
  } finally {
    loading.close();
  }
}
```

---

### ReadonlyField 只读字段

将 Form/Table 的 `component` + `componentProps` 转换为对应的只读展示文本，适用于详情页。

#### 引入方式

```typescript
import { ReadonlyField, useReadonlyField } from 'knt-shared';
import type { ReadonlyFieldProps } from 'knt-shared';
```

#### Props

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| `value` | 当前值 | `any` | 必填 |
| `component` | 组件类型（与 Form/Table 的 component 对应） | `string` | — |
| `componentProps` | 组件属性（用于获取 options 等） | `Record<string, any>` | — |
| `fetchOptions` | 异步获取 options | `() => Promise<any[]>` | — |
| `labelMap` | 外部传入的 value-label 映射 | `Record<string \| number, string>` | — |
| `customRender` | 自定义渲染函数 | `(value, config) => VNodeChild` | — |
| `emptyText` | 空值占位符 | `string` | `'-'` |
| `class` | 样式类名 | `string` | — |
| `style` | 自定义样式 | `CSSProperties` | — |
| `labelKey` | label 字段名 | `string` | `'label'` |
| `valueKey` | value 字段名 | `string` | `'value'` |
| `childrenKey` | children 字段名 | `string` | `'children'` |

#### Methods（useReadonlyField）

| 方法名 | 说明 | 参数 | 返回值 |
|---|---|---|---|
| `render` | 渲染只读内容 | `(value, config)` | `VNodeChild` |
| `getLabel` | 获取 label（用于 Select 等） | `(value, config)` | `Promise<string>` |
| `getLabels` | 获取多个 label（用于多选） | `(values[], config)` | `Promise<string[]>` |
| `clearCache` | 清除 options 缓存 | — | `void` |

#### 代码示例

```vue
<template>
  <ReadonlyField
    :value="formData.status"
    component="Select"
    :component-props="{ options: statusOptions }"
  />
</template>

<script setup lang="ts">
import { ReadonlyField } from 'knt-shared';

const statusOptions = [
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 },
];
const formData = { status: 1 };
</script>
```

---

### TextEllipsis 文本省略

文本超出时显示省略号，支持多行省略和 Tooltip 提示。

#### 引入方式

```typescript
import { TextEllipsis } from 'knt-shared';
```

#### Props

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| `text` | 显示的文本内容 | `string` | — |
| `lines` | 最大显示行数 | `number` | `1` |
| `tooltip` | 是否显示 Tooltip | `boolean` | `true` |
| `tooltipTrigger` | Tooltip 触发方式 | `'hover' \| 'click'` | `'hover'` |
| `tooltipProps` | Tooltip 属性 | `Record<string, any>` | — |
| `alwaysShowTooltip` | 是否始终显示 Tooltip（不论是否省略） | `boolean` | `false` |

#### 代码示例

```vue
<template>
  <TextEllipsis :text="longText" :lines="2" />
</template>

<script setup lang="ts">
import { TextEllipsis } from 'knt-shared';
const longText = '这是一段很长的文字，超过两行后会显示省略号，鼠标悬浮可查看全部内容。';
</script>
```

---

### CheckUpdate 版本检测

自动检测前端版本更新，发现新版本后弹出提示引导用户刷新。

#### 引入方式

```typescript
import { CheckUpdate } from 'knt-shared';
```

#### Props

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| `enabled` | 是否启用版本检测 | `boolean` | `true` |
| `versionUrl` | version.json 的请求路径 | `string` | `'/version.json'` |
| `checkInterval` | 定时轮询间隔（毫秒） | `number` | `600000`（10分钟） |
| `sessionKey` | sessionStorage 存储 key | `string` | `'app_current_version'` |
| `title` | 弹窗标题 | `string` | `'页面超时'` |
| `content` | 弹窗内容 | `string` | — |
| `okText` | 确认按钮文字 | `string` | `'立即刷新'` |
| `cancelText` | 取消按钮文字 | `string` | `'稍后再说'` |

#### 代码示例

在 `App.vue` 中全局使用：

```vue
<template>
  <router-view />
  <CheckUpdate :check-interval="300000" />
</template>

<script setup lang="ts">
import { CheckUpdate } from 'knt-shared';
</script>
```

需配合构建时生成 `public/version.json`，内容格式为：

```json
{ "version": "1.0.0", "buildTime": "2026-08-05T00:00:00.000Z" }
```

---

## 全局 Hooks

### useDebounce

对响应式值进行防抖处理。

```typescript
import { useDebounce } from 'knt-shared';

function useDebounce<T>(value: Ref<T>, delay?: number): Ref<T>
```

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| `value` | 需要防抖的响应式值 | `Ref<T>` | 必填 |
| `delay` | 延迟时间（毫秒） | `number` | `300` |

返回值：防抖后的 `Ref<T>`，组件卸载时自动清理定时器。

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { useDebounce } from 'knt-shared';

const searchText = ref('');
const debouncedText = useDebounce(searchText, 500);

watch(debouncedText, (val) => {
  // 用户停止输入 500ms 后执行搜索
  fetchData(val);
});
</script>
```

---

### useLocalStorage

响应式的 localStorage 读写 Hook，支持 JSON 序列化和自动同步。

```typescript
import { useLocalStorage } from 'knt-shared';

function useLocalStorage<T>(key: string, initialValue: T): readonly [Ref<T>, (value: T | ((val: T) => T)) => void]
```

| 参数 | 说明 | 类型 |
|---|---|---|
| `key` | localStorage 存储的 key | `string` |
| `initialValue` | 初始值（key 不存在时使用） | `T` |

返回值：`[存储的响应式值, 设置值的函数]`

```vue
<script setup lang="ts">
import { useLocalStorage } from 'knt-shared';

const [theme, setTheme] = useLocalStorage('app-theme', 'light');

function toggleTheme() {
  setTheme(theme.value === 'light' ? 'dark' : 'light');
}
</script>
```

---

### useToggle

布尔值切换 Hook。

```typescript
import { useToggle } from 'knt-shared';

function useToggle(initialValue?: boolean): readonly [Ref<boolean>, () => void, () => void, () => void]
```

返回值：`[当前值, toggle, setTrue, setFalse]`

```vue
<script setup lang="ts">
import { useToggle } from 'knt-shared';

const [visible, toggle, show, hide] = useToggle(false);
</script>
```

---

### useVersionCheck

版本检测 Hook，支持手动控制检测生命周期。

```typescript
import { useVersionCheck } from 'knt-shared';
import type { VersionCheckOptions } from 'knt-shared';
```

**VersionCheckOptions**

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| `enabled` | 是否启用版本检测 | `boolean` | `true` |
| `versionUrl` | version.json 的请求路径 | `string` | `'/version.json'` |
| `checkInterval` | 定时轮询间隔（毫秒） | `number` | `600000` |
| `sessionKey` | sessionStorage 存储 key | `string` | `'app_current_version'` |

**返回值**

| 属性/方法 | 说明 |
|---|---|
| `hasNewVersion` | 是否检测到新版本（`Ref<boolean>`） |
| `start` | 启动检测（注册定时器和 visibilitychange 监听） |
| `stop` | 停止检测 |
| `checkVersion` | 手动触发一次检测 |
| `applyUpdate` | 应用更新（刷新页面） |
| `dismissUpdate` | 关闭新版本提示 |

```typescript
const { hasNewVersion, start, applyUpdate, dismissUpdate } = useVersionCheck({
  checkInterval: 5 * 60 * 1000,
});

onMounted(() => start());
```

---

## 工具函数（Utils）

### format — 格式化

```typescript
import { formatDate, formatNumber, formatIntl, formatFileSize } from 'knt-shared';
```

| 函数 | 说明 | 签名 |
|---|---|---|
| `formatDate` | 格式化日期 | `(date: Date \| number, format?: string) => string` |
| `formatNumber` | 数字添加千分位分隔符 | `(num: number) => string` |
| `formatIntl` | 人民币货币格式化 | `(num: number) => string` |
| `formatFileSize` | 格式化文件大小 | `(bytes: number) => string` |

**示例**

```typescript
formatDate(new Date(), 'YYYY-MM-DD')         // '2026-08-05'
formatDate(1722816000000, 'YYYY/MM/DD HH:mm') // '2026/08/05 00:00'
formatNumber(1234567.89)                       // '1,234,567.89'
formatIntl(9999.5)                             // '¥9,999.50'
formatFileSize(1024 * 1024)                    // '1 MB'
formatFileSize(0)                              // '0 B'
```

支持的 `format` 占位符：`YYYY`（年）、`MM`（月）、`DD`（日）、`HH`（时）、`mm`（分）、`ss`（秒）。

---

### validate — 校验

```typescript
import { isValidEmail, isValidPhone, isValidUrl, isValidIdCard } from 'knt-shared';
```

| 函数 | 说明 | 签名 |
|---|---|---|
| `isValidEmail` | 验证邮箱格式 | `(email: string) => boolean` |
| `isValidPhone` | 验证手机号（中国大陆） | `(phone: string) => boolean` |
| `isValidUrl` | 验证 URL 格式 | `(url: string) => boolean` |
| `isValidIdCard` | 验证身份证号（18位） | `(idCard: string) => boolean` |

**示例**

```typescript
isValidEmail('test@example.com')    // true
isValidPhone('13800138000')         // true
isValidUrl('https://example.com')   // true
isValidIdCard('110101199001011234') // true
```

---

### debounce — 防抖节流

```typescript
import { debounce, throttle } from 'knt-shared';
import type { DebouncedFunction } from 'knt-shared';
```

| 函数 | 说明 | 签名 |
|---|---|---|
| `debounce` | 防抖函数（带 cancel 方法） | `(func, wait?, immediate?) => DebouncedFunction` |
| `throttle` | 节流函数 | `(func, wait?) => Function` |

**示例**

```typescript
const debouncedSearch = debounce((keyword: string) => {
  fetchData(keyword);
}, 300);

// 取消未执行的调用
debouncedSearch.cancel();

const throttledScroll = throttle(() => {
  handleScroll();
}, 100);
```

---

### diff — 差异对比

用于对比新旧数组，识别增删改，适用于表单提交时只提交变更数据。

```typescript
import { diffArrays, compareObjects, findDeleted, findModified, findAdded } from 'knt-shared';
import type { DiffOptions, DiffResult } from 'knt-shared';
```

| 函数 | 说明 |
|---|---|
| `diffArrays(original, current, options?)` | 对比两个数组，返回 `{deleted, modified, added}` |
| `compareObjects(obj1, obj2, options?)` | 对比两个对象是否相等 |
| `findDeleted(original, current, options?)` | 查找被删除的数据（自动添加删除标记） |
| `findModified(original, current, options?)` | 查找被修改的数据 |
| `findAdded(original, current, options?)` | 查找新增的数据 |

**DiffOptions**

| 参数 | 说明 | 默认值 |
|---|---|---|
| `uniqueKey` | 唯一标识字段名 | `'id'` |
| `compareDepth` | 对比深度 `'shallow' \| 'deep'` | `'shallow'` |
| `compareFields` | 只对比这些字段 | — |
| `excludeKeys` | 排除不需要对比的字段 | — |
| `deletedFlag` | 删除标记字段名 | `'delFlag'` |
| `deletedFlagValue` | 删除标记值 | `1` |

**示例**

```typescript
const original = [
  { id: 1, name: '张三', age: 25 },
  { id: 2, name: '李四', age: 30 },
  { id: 3, name: '王五', age: 28 },
];
const current = [
  { id: 1, name: '张三', age: 26 },  // age 被修改
  { id: 2, name: '李四', age: 30 },  // 未改
  { id: 4, name: '赵六', age: 32 },  // 新增
];

const { deleted, modified, added } = diffArrays(original, current);
// deleted: [{ id: 3, name: '王五', age: 28, delFlag: 1 }]
// modified: [{ id: 1, name: '张三', age: 26 }]
// added: [{ id: 4, name: '赵六', age: 32 }]
```

---

### tree — 树操作

```typescript
import { flattenTree, arrayToMap, transformTree } from 'knt-shared';
```

| 函数 | 说明 | 签名 |
|---|---|---|
| `flattenTree` | 树形结构扁平化为一维数组 | `(tree, options?) => T[]` |
| `arrayToMap` | 数组转 Map，支持快速查找 | `(array, options?) => Map` |
| `transformTree` | 转换树形数据结构（字段映射/添加元数据） | `(tree, transform, options?) => R[]` |

**示例**

```typescript
// 树扁平化
const flat = flattenTree(treeData, { childrenField: 'children', fields: ['id', 'name'] });

// 数组转 Map
const userMap = arrayToMap(users, { keyField: 'id' });
const user = userMap.get(1);

// 转换树结构
const arcoTree = transformTree(backendData, (node, ctx) => ({
  key: node.id,
  title: node.name,
  level: ctx.level,
  isLeaf: ctx.isLeaf,
}));
```

---

### typeCheck — 类型判断

```typescript
import {
  isNullOrUnDef, isDef, isArray, isObject, isString,
  isNumber, isBoolean, isFunction, isEmpty, isEmptyArray, isJSONStr
} from 'knt-shared';
```

| 函数 | 说明 | 示例 |
|---|---|---|
| `isNullOrUnDef(value)` | 是否为 null 或 undefined | `isNullOrUnDef(null)` → `true` |
| `isDef(value)` | 是否已定义（非 null/undefined） | `isDef(0)` → `true` |
| `isArray(value)` | 是否为数组 | `isArray([])` → `true` |
| `isObject(value)` | 是否为对象（排除 null 和数组） | `isObject({})` → `true` |
| `isString(value)` | 是否为字符串 | `isString('')` → `true` |
| `isNumber(value)` | 是否为数字 | `isNumber(NaN)` → `true` |
| `isBoolean(value)` | 是否为布尔值 | `isBoolean(false)` → `true` |
| `isFunction(value)` | 是否为函数 | `isFunction(() => {})` → `true` |
| `isEmpty(value)` | 字符串是否为空（包括 null/undefined） | `isEmpty('')` → `true` |
| `isEmptyArray(value)` | 数组或字符串是否为空 | `isEmptyArray([])` → `true` |
| `isJSONStr(str)` | 是否为合法 JSON 字符串 | `isJSONStr('{}')` → `true` |

---

### url — URL 处理

用于 BasicUpload 组件的上传和回填场景。

```typescript
import { transformUploadUrl, transformBackUrl, transFormUrlPath } from 'knt-shared';
```

| 函数 | 说明 |
|---|---|
| `transformUploadUrl(transferUrl)` | 上传后从响应中提取路径，返回 `string \| string[]` |
| `transformBackUrl(transferUrl, config?)` | 将服务端数据转换为 Upload 组件所需格式，返回 `UrlResult \| UrlResult[]` |
| `transFormUrlPath(options)` | 统一入口，通过 `type: 'upload' \| 'back'` 选择转换方式（已废弃，建议使用上方两个函数） |

**示例**

```typescript
// 上传后提交：提取路径
const path = transformUploadUrl(fileList.value);
// => '/uploads/file.jpg'  或  ['/uploads/1.jpg', '/uploads/2.jpg']

// 回填：将服务端数据转为 Upload 组件格式
const files = transformBackUrl({
  filePath: '/uploads/file.jpg',
  fullFilePath: 'https://cdn.example.com/uploads/file.jpg',
});
// => [{ uid: 'back-/uploads/file.jpg', url: 'https://cdn.example.com/...', path: '/uploads/file.jpg', status: 'done' }]
```

---

### clipboard — 剪贴板

```typescript
import { copyToClipboard } from 'knt-shared';
```

| 函数 | 说明 | 签名 |
|---|---|---|
| `copyToClipboard` | 复制文本到剪贴板（优先使用 Clipboard API，降级使用 execCommand） | `(text: string) => Promise<boolean>` |

```typescript
const success = await copyToClipboard('需要复制的文本');
if (success) {
  Message.success('复制成功');
}
```

---

### calc — 高精度计算

解决 JavaScript 浮点数精度问题。

```typescript
import { calcMul, calcAdd, calcSub, calcDiv } from 'knt-shared';
```

| 函数 | 说明 | 签名 |
|---|---|---|
| `calcMul` | 高精度乘法 | `(a: number, b: number) => number` |
| `calcAdd` | 高精度加法 | `(a: number, b: number) => number` |
| `calcSub` | 高精度减法 | `(a: number, b: number) => number` |
| `calcDiv` | 高精度除法 | `(a: number, b: number) => number` |

```typescript
calcAdd(0.1, 0.2)    // 0.3（而非 0.30000000000000004）
calcMul(0.1, 0.2)    // 0.02
calcSub(1.0, 0.9)    // 0.1
calcDiv(0.3, 0.1)    // 3
```

---

### utils — 通用工具

```typescript
import { setObjToUrlParams, openWindow, removeFields } from 'knt-shared';
```

| 函数 | 说明 | 签名 |
|---|---|---|
| `setObjToUrlParams` | 将对象参数拼接到 URL 上 | `(baseUrl: string, obj: any) => string` |
| `openWindow` | 打开新页面 | `(url: string, opt?) => void` |
| `removeFields` | 递归删除对象/数组中的指定字段（不修改原对象） | `(obj: T, fieldsToRemove?: string[]) => T` |

```typescript
setObjToUrlParams('https://api.example.com', { page: 1, size: 10 })
// => 'https://api.example.com?page=1&size=10'

openWindow('https://example.com', { target: '_blank', noopener: true });

removeFields({ id: 1, name: '张三', children: [{ id: 2, name: '李四' }] }, ['id'])
// => { name: '张三', children: [{ name: '李四' }] }
```

---

### base64Conver — Base64 转换

```typescript
import { dataURLtoBlob, urlToBase64 } from 'knt-shared';
```

| 函数 | 说明 | 签名 |
|---|---|---|
| `dataURLtoBlob` | data URL 转 Blob | `(dataURL: string) => Blob` |
| `urlToBase64` | 图片 URL 转 base64 | `(url: string) => Promise<string>` |

```typescript
const base64 = await urlToBase64('https://example.com/image.jpg');
const blob = dataURLtoBlob(base64);
```

---

### download — 文件下载

```typescript
import { downloadByOnlineUrl, downloadByBase64, downloadByData, downloadByUrl } from 'knt-shared';
```

| 函数 | 说明 | 签名 |
|---|---|---|
| `downloadByOnlineUrl` | 下载在线图片/文件 | `(url, filename, mime?, bom?) => void` |
| `downloadByBase64` | 通过 base64 下载文件 | `(buf, filename, mime?, bom?) => void` |
| `downloadByData` | 通过接口返回的文件流下载 | `(data, filename, mime?, bom?) => void` |
| `downloadByUrl` | 通过文件地址下载 | `({url, target?, fileName?}) => boolean` |

```typescript
// 下载在线图片
downloadByOnlineUrl('https://example.com/image.jpg', 'image.jpg');

// 下载接口返回的文件流（Blob）
const blob = await api.exportExcel(params);
downloadByData(blob, '导出数据.xlsx', 'application/vnd.ms-excel');

// 直接下载文件链接
downloadByUrl({ url: '/api/files/report.pdf', fileName: '报表.pdf' });
```

---

### color — 颜色处理

```typescript
import { isHexColor, rgbToHex, hexToRGB, colorIsDark, darken, lighten, calculateBestTextColor } from 'knt-shared';
```

| 函数 | 说明 | 签名 |
|---|---|---|
| `isHexColor` | 判断是否为十六进制颜色值 | `(color: string) => boolean` |
| `rgbToHex` | RGB 转十六进制颜色 | `(r, g, b) => string` |
| `hexToRGB` | 十六进制颜色转 RGB | `(hex: string) => string` |
| `colorIsDark` | 判断颜色是否偏暗 | `(color: string) => boolean` |
| `darken` | 加深颜色（百分比） | `(color: string, amount: number) => string` |
| `lighten` | 变亮颜色（百分比） | `(color: string, amount: number) => string` |
| `calculateBestTextColor` | 根据背景色计算最佳文字颜色（黑/白） | `(hexColor: string) => string` |

```typescript
isHexColor('#ff0000')               // true
rgbToHex(255, 0, 0)                // '#ff0000'
hexToRGB('#ff0000')                // 'RGB(255,0,0)'
colorIsDark('#333333')             // true
darken('#ff0000', 20)              // 变暗 20%
lighten('#ff0000', 20)             // 变亮 20%
calculateBestTextColor('#ffffff')  // '#000000'
calculateBestTextColor('#000000')  // '#FFFFFF'
```

---

### chunkErrorHandler — Chunk 错误处理

处理 Vite 构建产物中 chunk 文件加载失败的问题（通常发生在版本升级后旧 chunk 文件不存在）。

```typescript
import { setupChunkErrorHandler } from 'knt-shared';
```

| 函数 | 说明 | 签名 |
|---|---|---|
| `setupChunkErrorHandler` | 全局注册 chunk 加载失败监听，失败时自动 reload | `() => void` |

在应用入口调用一次即可：

```typescript
// main.ts
import { setupChunkErrorHandler } from 'knt-shared';

setupChunkErrorHandler();
```
