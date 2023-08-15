import { defineConfig } from 'vitepress';
import { resolve } from 'path';

function pathResolve(dir) {
  return resolve(process.cwd(), '.', dir);
}

export default defineConfig({
  title: '恺恩泰指南',
  // base: '/hss.github.io/',
  // titleTemplate: false,
  appearance: true,
  description: '',
  // cleanUrls: 'with-subfolders',
  cleanUrls: 'disabled',
  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: '指南', link: '/knt/运维' },
      {
        text: '前端开发',
        items: [
          { text: '文档DOC', link: '/leadDoc/提交规范Git' },
          { text: '前端技术栈', link: '/pages/前端技术栈' },
        ],
      },
      { text: '后端开发', link: '/rear/' },
    ],
    sidebar: {
      '/knt/': [
        {
          text: '恺恩泰信息',
          items: [
            { text: '运维部署测试', link: '/knt/运维' },
            { text: '互医项目', link: '/knt/互医项目' },
          ],
        },
      ],
      '/leadDoc/': [
        {
          text: '项目规范',
          collapsible: true,
          // collapsed: true,
          items: [{ text: 'Git提交规范', link: '/leadDoc/提交规范Git' }],
        },
        {
          text: 'GIT相关信息',
          collapsible: true,
          // collapsed: true,
          items: [{ text: 'Git技巧', link: '/leadDoc/技巧Git' }],
        },
        {
          text: '技术文档',
          collapsible: true,
          // collapsed: true,
          items: [
            { text: 'KNT微前端', link: '/leadDoc/KNT微前端' },
            { text: 'KNT健康平台技术文档', link: '/leadDoc/KNT健康平台技术文档' },
            { text: 'Taro vs uni-app选型对比', link: '/leadDoc/TaroVSuni-app选型对比' },
            { text: 'QuickWebServe', link: '/leadDoc/QuickWebServe' },
            { text: 'Prettier', link: '/leadDoc/Prettier' },
            { text: 'Nginx', link: '/leadDoc/Nginx' },
            { text: 'MacOs', link: '/leadDoc/MacOs' },
            { text: 'AntDesignVue', link: '/leadDoc/AntDesignVue' },
          ],
        },
      ],
    },
    // editLink: {
    //   pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
    //   text: '编辑这个页面',
    // },
    lastUpdated: true,
    footer: {
      message: '苏ICP备2021050542号-2',
      copyright: 'Copyright © 2021恺恩泰（南京）科技有限公司',
    },
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    // algolia: {
    //   apiKey: 'your_api_key',
    //   indexName: 'index_name'
    // }
  },
  // outDir: pathResolve('dist'),
  markdown: {
    lineNumbers: false,
  },
});
