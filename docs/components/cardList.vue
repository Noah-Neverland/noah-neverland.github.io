<template>
  <div class="cardList">
    <ul>
      <li v-for="(item, index) in list" :key="`${index}_cardlist`" @click="handleClick(item)">
        <div class="cardList-icon" v-if="!!item.icon">
          <img :src="withBase(item.icon)" />
        </div>
        <p class="cardList-title">{{ item.title }}</p>
        <p class="cardList-sub">{{ item.description }}</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { withBase } from 'vitepress';
  import { LEAD_STACT } from '../constants/mock';

  export default defineComponent({
    setup() {
      const list = ref(LEAD_STACT);

      function handleClick(item) {
        window.open(item.link);
      }

      return {
        handleClick,
        list,
        withBase,
      };
    },
  });
</script>

<style lang="less" scoped>
  .cardList {
    ul {
      display: flex;
      flex-wrap: wrap;
      text-align: center;
      justify-content: space-around;
      li {
        cursor: pointer;
        flex: 0 0 19%;
        background-color: #f9f9f9;
        padding: 30px 10px;
        position: relative;
        margin-bottom: 10px;
        &:hover {
          top: -6px;
        }
      }
    }
    &-icon {
      width: 80px;
      height: 80px;
      text-align: center;
      margin: 20px auto;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    &-title {
      font-size: 24px;
      margin: 20px 0;
    }
    &-sub {
      font-size: 14px;
      color: #a7a7a7;
      line-height: 16px;
      font-weight: 500;
      text-align: left;
    }
  }
</style>
