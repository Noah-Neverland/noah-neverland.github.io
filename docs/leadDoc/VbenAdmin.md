---
title: 前端文档doc
editLink: true
---

# VbenAdmin

## Form 组件

**Use**

```js
// tableData.tsx
import { FormProps, FormSchema } from '/@/components/Table';

export function getModalTagFormConfig(): Partial<FormProps> {
  const schemas: FormSchema[] = [
    {
      field: 'tag',
      component: 'ApiSelect',
      label: '选择标签',
      componentProps: {
        mode: 'multiple',
        api: getHospital,
        labelField: 'hospitalName',
        valueField: 'id',
      },
      required: true,
      itemProps: { validateTrigger: 'blur' }, // 用于解决component为ApiSelect且此选择为必填时，第一次选择（已选中选项）会提示请选择
    },
  ];

  return {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
    baseColProps: {
      span: 20,
    },
    schemas,
    showAdvancedButton: false,
    showActionButtonGroup: false,
    showResetButton: true,
  };
}
```

```js
// Modal.vue
<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { getModalTagFormConfig } from '../tableData';

  const { createMessage } = useMessage();

  const props = defineProps({
    reload: Function,
  });

  const currentInfo = ref<any>({}); // 当前编辑的数据
  const loading = ref(false); // 保存loging
  const typeStatus = ref<string>('');

  const [registerForm, { closeModal }] = useModalInner((data: any) => {
    const { typeStatus: ts } = data;
    currentInfo.value = data;
    typeStatus.value = ts;
  });

  const [register, { resetFields, validate }] = useForm({ ...getModalTagFormConfig() });

  // 保存
  const handleSumbit = async () => {
    // const id = currentInfo.value.id;
    loading.value = true;
    try {
      let values: any = await validate();
      createMessage.success('操作成功');
      closeModal();
      props.reload && props.reload();
    } catch (error) {
    } finally {
      loading.value = false;
    }
  };

  // 判断modal打开关闭
  const handleVisibleChange = (visible) => {
    // 关闭弹窗清空form信息
    if (!visible) {
      typeStatus.value = '';
      resetFields();
    }
  };
</script>

<template>
  <BasicModal
    @register="registerForm"
    v-bind="$attrs"
    wrap-class-name="customClass"
    :minHeight="100"
    :confirmLoading="loading"
    :cancelButtonProps="{ disabled: loading }"
    @visible-change="handleVisibleChange"
    @ok="handleSumbit"
  >
    <div class="p-4 scroll-wrap" v-loading="loading">
      <BasicForm @register="register" />
    </div>
  </BasicModal>
</template>

<style lang="less">
  .customClass {
    .scrollbar {
      overflow: visible;

      .scrollbar__wrap {
        overflow: visible;
      }
    }
  }
</style>
```

```js
// index.vue
<script lang="ts" setup>
  import { useModal } from '/@/components/Modal';
  import Modal from 'xxx';

  const [registerModal, { openModal }] = useModal();
</script>

<template>
  <Modal
    @register="registerModal"
    :title="ModalTitle"
    width="500px"
    :destroyOnClose="false"
    :maskClosable="false"
    :keyboard="false"
    :canFullscreen="false"
    cancelText="关闭"
    :reload="reload"
  />
</template>
```
