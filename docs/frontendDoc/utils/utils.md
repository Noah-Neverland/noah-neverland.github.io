---
title: 前端文档doc
editLink: true
---

# 常用封装的方法

```ts
import { isObject } from '/@/utils/is';
import { cloneDeep } from 'lodash-es';

// 深度合并
export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  const res: any = cloneDeep(src);
  for (key in target) {
    res[key] = isObject(res[key]) ? deepMerge(res[key], target[key]) : (res[key] = target[key]);
  }
  return res;
}

/**
 * @name: 返回一个对象里面包含后一个数组比第一个数组增加、减少的数据（适用于去重过后的数组）
 * @param {Array} beforeArr 前一个数组
 * @param {Array} afterArr 后一个数组
 * @return {*}
 */
export const ArrayCompare = (beforeArr: Array<any> = [], afterArr: Array<any> = []) => {
  const resObj = {
    add: <any>[],
    del: <any>[],
  };
  const cenObj = {};
  // 数组去重
  const tBeforeArr = [...new Set(beforeArr)];
  const tAftereArr = [...new Set(afterArr)];
  // 把beforeArr数组去重放入cenObj
  tBeforeArr.forEach((item: any) => {
    cenObj[item] = item;
  });
  // 遍历afterArr数组，查看元素是否在cenObj中
  tAftereArr.forEach((item: any) => {
    if (!cenObj[item]) {
      resObj.add.push(item);
    } else {
      delete cenObj[item];
    }
  });
  for (const k in cenObj) {
    resObj.del.push(k);
  }
  return resObj;
};

/**
 * @name: 根据身份证信息获取用户信息
 * @param {any} IdCard 身份号
 * @param {number} type 获取类型
 * @return {*}
 */
export const IdCard = (IdCard: any, type: number): any => {
  switch (type) {
    case 2: // 获取性别
      return parseInt(IdCard.substr(16, 1)) % 2 === 1 ? '男' : '女';
    case 3: // 获取年龄
      const ageDate = new Date();
      const month = ageDate.getMonth() + 1;
      const day = ageDate.getDate();
      let age = ageDate.getFullYear() - IdCard.substring(6, 10) - 1;
      if (
        IdCard.substring(10, 12) < month ||
        (IdCard.substring(10, 12) === month && IdCard.substring(12, 14) <= day)
      ) {
        age++;
      }
      if (age <= 0) {
        age = 1;
      }
      return age;
    default: // 默认获取出生日期
      const birthday =
        IdCard.substring(6, 10) + '-' + IdCard.substring(10, 12) + '-' + IdCard.substring(12, 14);
      return birthday;
  }
};

/* @name: Intl.NumberFormat数字格式化应用
 * @param {number} num
 * @return {*}
 */
export const IntlFormatter = (num: number): string => {
  const formatter = new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    currencySign: 'accounting',
  });

  return formatter.format(num);
};

/**
 * @name: inputNumber parser（数字输入框限制输入不为空、最大值、最小值）
 * @param {any} value
 * @param {number} max
 * @param {number} min
 * @return {*}
 */
export const inputNumberParser = (value: any, max: number, min: number) => {
  if (value.length < 1) {
    return min;
  }
  const v = parseFloat(value);
  if (!isNaN(v)) {
    if (v > max) {
      return max;
    } else if (v < min) {
      return min;
    } else {
      return v;
    }
  } else {
    return min;
  }
};

/**
 * @name: 拼接请求参数
 * @param {any} info
 * @return {*}
 */
export const exportWithParams = (info: any) => {
  let params = '';
  const keys = Object.keys(info);
  for (let i = 0; i < keys.length; i++) {
    if (i === 0) {
      params += `${keys[i]}=${info[keys[i]]}`;
    } else {
      params += `&${keys[i]}=${info[keys[i]]}`;
    }
  }
  return params;
};

/**
 * @name: 根据日期计算今天是星期几
 * @param {*} dateString
 * @return {*}
 */
export const getWeek = (dateString) => {
  let date;
  if (!dateString) {
    date = new Date();
  } else {
    const dateArray = dateString.split('-');
    date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2]);
  }
  return '星期' + '日一二三四五六'.charAt(date.getDay());
};

/**
 * tree数组扁平化
 * @param {Array} arrs 树形数据
 * @param {string} childs 树形数据子数据的属性名,常用'children'
 * @param {Array} attrArr 需要提取的公共属性数组(默认是除了childs的全部属性)
 * @returns
 */
export const extractTree = (arrs, childs = 'children', attrArr?: any) => {
  let attrList: any = [];
  if (!Array.isArray(arrs) && !arrs.length) return [];
  if (typeof childs !== 'string') return [];
  if (!Array.isArray(attrArr) || (Array.isArray(attrArr) && !attrArr.length)) {
    attrList = Object.keys(arrs[0]);
    attrList.splice(attrList.indexOf(childs), 1);
  } else {
    attrList = attrArr;
  }
  const list: any = [];
  const getObj = (arr) => {
    arr.forEach(function (row) {
      const obj = {};
      attrList.forEach((item) => {
        obj[item] = row[item];
      });
      list.push(obj);
      if (row[childs]) {
        getObj(row[childs]);
      }
    });
    return list;
  };
  return getObj(arrs);
};
```
