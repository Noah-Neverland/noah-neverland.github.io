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
        dropdownMatchSelectWidth: false, // select下拉选项全部展示
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

## Table

**Use**

```js
// tableData.tsx（模版来自 售后管理列表页面）
import { FormProps, FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';
import { getHospital } from '/@/api/sys/user';
import { dateTimes } from '/@/utils/dateUtil';
import { TableImg } from '/@/components/Table';
import LogisticsTableCell from './components/LogisticsTableCell.vue';
import { IntlFormatter } from '/@/utils/index';
import RersonInfoComponent from './components/DetailTabPane/lib/PersonInfo.vue'; // 服务人信息/收件人信息/自提信息

export function getDistributionColumns(): BasicColumn[] {
  return [
    {
      title: '状态信息',
      dataIndex: 'statusInfo',
      width: 280,
      customRender: ({ record }) => {
        const items = [
          { label: '订单状态', value: 'orderStatusStr' },
          { label: '履约单状态', value: 'shipmentStatusStr' },
          { label: '售后状态', value: 'afterSaleStatusStr' },
          { label: '包裹订单状态', value: 'logisticSendModeStr' },
          { label: '审核状态', value: 'afterSaleAuditStatusStr' },
        ];
        // const afterSaleAuditStatusArr = [904, 905];
        return (
          <ul style="margin-bottom: 0">
            {items.map((item: any) =>
              record[item.value] ? (
                <li class="flex">
                  <label class="inline-block text-right" style={'width: 100px;'}>
                    {item.label}：
                  </label>
                  {/* {item.value === 'afterSaleAuditStatus' ? (
                    <span class="flex-1 text-left">
                      {afterSaleAuditStatusArr.includes(record[item.value])
                        ? '审核通过'
                        : record['afterSaleAuditStatusStr']}
                    </span>
                  ) : (
                    <span class="flex-1 text-left">{record[item.value]}</span>
                  )} */}
                  <span class="flex-1 text-left">{record[item.value]}</span>
                </li>
              ) : (
                ''
              ),
            )}
          </ul>
        );
      },
    },
    {
      title: '订单信息',
      dataIndex: 'order',
      width: 300,
      customRender: ({ record }) => {
        const items = [
          { label: '售后单号', value: 'afterSaleNo' },
          { label: '订单编码', value: 'orderNo' },
          { label: '履约单号', value: 'shipmentNo' },
          { label: '渠道来源', value: 'hospitalName' },
        ];
        return (
          <ul style="margin-bottom: 0">
            {items.map((item: any) => (
              <li class="flex">
                <label class="inline-block text-right" style={'width: 100px;'}>
                  {item.label}：
                </label>
                <span class="flex-1 text-left">{record[item.value] || '--'}</span>
              </li>
            ))}
          </ul>
        );
      },
    },
    {
      title: '商品信息(名称/sku/售价/售后数量/供应商)',
      dataIndex: 'goodsInfo',
      width: 320,
      customRender: ({ record }) => {
        const {
          orderDetail: { refundNumber, goodsName, headPic, supplierName, price, skuCode },
        } = record;
        return (
          <div class="flex items-center justify-around">
            {/* 商品图片 */}
            <TableImg size={60} simpleShow={true} imgList={headPic ? [headPic] : []} />
            {/* 商品信息 */}
            <ul class="text-left ml-2" style="margin-bottom: 0">
              <li class="font-bold">{goodsName}</li>
              <li>{`${skuCode} / ${IntlFormatter(price)} / ${refundNumber}`}</li>
              <li>{supplierName}</li>
            </ul>
          </div>
        );
      },
    },
    {
      title: '时间信息',
      dataIndex: 'date',
      width: 280,
      customRender: ({ record }) => {
        const items = [
          { label: '下单时间', value: 'orderCreateTime' },
          { label: '支付时间', value: 'payTime' },
          { label: '申请售后时间', value: 'afterSaleCreateTime' },
        ];
        return (
          <ul style="margin-bottom: 0">
            {items.map((item: any) => (
              <li class="flex">
                <label class="inline-block text-right" style={'width: 100px;'}>
                  {item.label}：
                </label>
                <span class="flex-1 text-left">{record[item.value] || '--'}</span>
              </li>
            ))}
          </ul>
        );
      },
    },
    {
      title: '配送&物流信息',
      dataIndex: 'logistics',
      width: 260,
      customRender: ({ record }) => {
        return <LogisticsTableCell data={record} />;
      },
    },
    {
      title: '服务人信息/收件人信息/自提信息',
      dataIndex: 'pePerson',
      width: 260,
      customRender: ({ record }) => {
        const { orderDetail } = record;
        return !!orderDetail ? <RersonInfoComponent data={orderDetail} /> : '';
      },
    },
    {
      title: '预约时间',
      dataIndex: 'appointedDate',
      width: 260,
      customRender: ({ record }) => {
        const { orderDetail } = record;
        return !!orderDetail ? (
          <span>
            {orderDetail?.appointedDate} {orderDetail?.appointedTime}
          </span>
        ) : (
          ''
        );
      },
    },
  ];
}

export function getFormConfig(): Partial<FormProps> {
  const schemas: FormSchema[] = [
    {
      field: 'afterSaleId',
      component: 'Input',
      label: '售后单号',
      componentProps: {
        placeholder: '请输入',
      },
    },
    {
      field: 'orderId',
      component: 'Input',
      label: '订单编码',
      componentProps: {
        placeholder: '请输入',
      },
    },
    {
      field: 'logisticNum',
      component: 'Input',
      label: '物流编码',
      componentProps: {
        placeholder: '请输入',
      },
    },
    {
      field: 'shipmentNo',
      component: 'Input',
      label: '履约单号',
      componentProps: {
        placeholder: '请输入',
      },
    },
    {
      field: 'userName',
      component: 'Input',
      label: '下单人',
      componentProps: {
        placeholder: '请输入',
      },
    },
    {
      field: 'userPhone',
      component: 'Input',
      label: '下单人手机号',
      componentProps: {
        placeholder: '请输入',
      },
    },
    {
      field: 'goodsType',
      component: 'Select',
      label: '商品类型',
      componentProps: {
        placeholder: '请选择',
        options: [
          { label: '实物商品', value: 1 },
          { label: '服务商品', value: 2 },
        ],
      },
    },
    {
      field: 'isRemark',
      component: 'Select',
      label: '备注',
      componentProps: {
        placeholder: '请选择',
        options: [
          { label: '有备注', value: 2 },
          { label: '无备注', value: 1 },
        ],
      },
    },
    {
      field: 'goodsName',
      component: 'Input',
      label: '商品名称',
      componentProps: {
        placeholder: '请输入',
      },
    },
    {
      field: 'category',
      component: 'Cascader',
      label: '后台类目',
      colProps: {
        span: 12,
      },
      componentProps: {
        placeholder: '选择商品类目',
        changeOnSelect: true,
        fieldNames: { label: 'name', value: 'id', children: 'children' },
      },
    },
    {
      field: 'refundStatus',
      component: 'Select',
      label: '售后单退款状态',
      colProps: {
        span: 8,
      },
      componentProps: {
        placeholder: '请选择',
        mode: 'multiple',
        options: [
          { label: '无退款', value: 201 },
          { label: '部分退款', value: 202 },
          { label: '全部退款', value: 203 },
        ],
      },
    },
    {
      field: 'hospitalIds',
      component: 'ApiSelect',
      label: '渠道来源',
      colProps: {
        span: 8,
      },
      componentProps: {
        mode: 'multiple',
        api: getHospital,
        labelField: 'hospitalName',
        valueField: 'id',
        placeholder: '请选择',
        showSearch: true,
        filterOption: (input: string, option: any) => {
          return option.label.indexOf(input) >= 0;
        },
      },
    },
    {
      field: 'deliveryModes',
      component: 'Select',
      label: '配送方式',
      colProps: {
        span: 8,
      },
      componentProps: {
        placeholder: '请选择',
        mode: 'multiple',
        options: [
          { label: '自提', value: 1 },
          { label: '物流配送', value: 2 },
          { label: '无需物流发货', value: 3 },
        ],
      },
    },
    {
      field: 'afterSaleTypes',
      component: 'Select',
      label: '售后类型',
      colProps: {
        span: 8,
      },
      componentProps: {
        placeholder: '请选择',
        mode: 'multiple',
        options: [
          { label: '退款（未收到货）', value: 1 },
          { label: '退货退款', value: 2 },
          // { label: '换货', value: 3 },
        ],
      },
    },
    {
      field: 'auditStatus',
      component: 'Select',
      label: '审核状态',
      colProps: {
        span: 8,
      },
      componentProps: {
        placeholder: '请选择',
        mode: 'multiple',
        options: [
          { label: '审核不通过', value: 906 },
          { label: '运营审核中', value: 901 },
          { label: '财务审核中', value: 902 },
          { label: 'CEO审核中', value: 903 },
          { label: '审核通过(未打款)', value: 904 },
          { label: '审核通过(售后完成)', value: 905 },
        ],
      },
    },
    {
      field: 'timeselect',
      component: 'Select',
      label: '时间查询',
      colProps: {
        span: 8,
      },
      componentProps: ({ formModel }) => {
        return {
          placeholder: '请选择',
          options: [
            { label: '最近7天', value: 7 },
            { label: '最近30天', value: 30 },
            { label: '最近60天', value: 60 },
          ],
          onChange: (e: any) => {
            const type = {
              7: 'lastWeek',
              30: 'lastMonth',
              60: 'lastThreeMonth',
            };
            if (!!e) {
              const startTime = dateTimes[type[e]].start_time;
              const endTime = dateTimes[type[e]].end_time;
              // 设置下单时间
              formModel.placeTime = [startTime, endTime];
              // 设置支付时间
              formModel.payTime = [startTime, endTime];
              // 设置申请售后时间
              formModel.afterSalesTime = [startTime, endTime];
            }
          },
        };
      },
    },
    {
      field: 'placeTime',
      component: 'RangePicker',
      label: '下单时间',
      colProps: {
        span: 12,
      },
      componentProps: {
        style: { width: '100%' },
      },
    },
    {
      field: 'payTime',
      component: 'RangePicker',
      label: '支付时间',
      defaultValue: [dateTimes['lastMonth'].start_time, dateTimes['lastMonth'].end_time],
      colProps: {
        span: 12,
      },
      componentProps: {
        style: { width: '100%' },
      },
    },
    {
      field: 'afterSalesTime',
      component: 'RangePicker',
      label: '申请售后时间',
      colProps: {
        span: 12,
      },
      componentProps: {
        style: { width: '100%' },
      },
    },
  ];

  return {
    labelWidth: 100,
    showAdvancedButton: true,
    compact: true,
    alwaysShowLines: 2,
    baseColProps: {
      span: 6,
    },
    wrapperCol: {
      span: 24,
    },
    actionColOptions: {
      span: 24,
    },
    showResetButton: true,
    transformDateFunc: (date: any) => {
      return date?.format?.('YYYY-MM-DD') ?? date;
    },
    fieldMapToTime: [
      ['placeTime', ['createTimeBegin', 'createTimeEnd'], 'YYYY-MM-DD'],
      ['payTime', ['payTimeBegin', 'payTimeEnd'], 'YYYY-MM-DD'],
      ['afterSalesTime', ['refundApplyTimeBegin', 'refundApplyTimeEnd'], 'YYYY-MM-DD'],
    ],
    schemas,
  };
}
```

```js
// index.vue
<template>
  <PageWrapper title="xxx" :contentStyle="{ margin: 0 }">
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <div v-if="column.dataIndex === 'action'">
          <TableAction
            :actions="[
              {
                label: 'xxx',
                onClick: openDrawer.bind(null, true, { record }),
                auth: 'xxx',
              },
            ]"
          />
        </div>
      </template>
    </BasicTable>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getDistributionColumns, getFormConfig } from './tableData';

  const checkedKeys = ref<any>([]);
  const checkedItems = ref<any>([]);

  const [registerTable, { reload, getForm }] = useTable({
    rowKey: 'id',
    canResize: true,
    api: AfterSaleList,
    columns: getDistributionColumns(),
    useSearchForm: true,
    formConfig: getFormConfig(),
    showTableSetting: true,
    tableSetting: { fullScreen: false, setting: false },
    showIndexColumn: false,
    clickToRowSelect: false,
    ellipsis: false, // td内容不省略展示
    searchInfo: { // 请求参数添加
      status: activeTabKey,
    },
    actionColumn: { // 操作栏
      width: 80,
      title: '操作',
      dataIndex: 'action',
    },
    beforeFetch: (search) => {},
    rowSelection: { // 配置此项 可实现勾选功能
      type: 'checkbox',
      selectedRowKeys: checkedKeys,
      preserveSelectedRowKeys: true, // 有分页时，切换分页记住之前页面勾选项
      onChange: (selectedKeys: (string | number)[], selectedRowKeys) => {
        checkedKeys.value = selectedKeys;
        checkedItems.value = selectedRowKeys;
      },
      getCheckboxProps: () => { // 是否可勾选
        return { disabled: false };
      },
    },
    immediate: true, // 是否立即执行
  });

  // 获取后台类目选项
  const getCategoryTreeApi = async () => {
    const params = { categoryType: 1 };
    const res = await getCategoryTree(params);
    getForm().updateSchema({
      field: 'category',
      componentProps: {
        options: [...res],
      },
    });
  };
</script>
```
