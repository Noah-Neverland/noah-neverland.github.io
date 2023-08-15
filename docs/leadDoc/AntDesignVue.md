---
title: 前端文档doc
editLink: true
---

# AntDesignVue

## 填坑之路

> 在使用 vue3 + vite + ant design vue 的时候，引入一些 antd 的一些组件的时候，通常运行是没有错的，但是打包会报错，例如：

1. vue3 使用 Vite 打包报 Rollup failed to resolve import “xxx/node_modules/ant-design-vue/xxxx

   `Rollup failed to resolve import "D:/xxxxx/node_modules/ant-design-vue/es/form-item-rest/style/index" from "src/views/xxx/xxx.vue". 15:01:51 This is most likely unintended because it can break your application at runtime. If you do want to externalize this module explicitly add it to build.rollupOptions.external 报关于 ant design vue的一些组件错误，`

   解决：

   ```js
    <template>
      <FormItemRest>
        <a-input v-moal:value='val' />
      </FormItemRest>
    </template>
    <script lang='ts' setup>
      import { ref } from 'vue';
      import { Form } from 'ant-design-vue';
      const FormItemRest = Form.ItemRest; //正解
      const val = ref('');
    </script>
   ```
