import { defineConfig } from 'vitepress';
import { resolve } from 'path';

function pathResolve(dir) {
  return resolve(process.cwd(), '.', dir);
}

export default defineConfig({
  title: '小朴Plus',
  // base: '/hss.github.io/',
  // titleTemplate: false,
  appearance: true,
  description: '',
  // cleanUrls: 'with-subfolders',
  cleanUrls: 'disabled',
  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: '指南', link: '/noah/utils/常用工具' },
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
      '/noah/': [
        {
          text: 'Noah',
          items: [{ text: '实用工具', link: '/noah/utils/常用工具' }],
        },
        {
          text: '恺恩泰信息',
          items: [
            { text: '运维部署测试', link: '/noah/knt/运维' },
            { text: '互医项目', link: '/noah/knt/互医项目' },
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
          text: 'Utils',
          collapsible: true,
          // collapsed: true,
          items: [
            { text: 'utils', link: '/leadDoc/utils/utils.md' },
            { text: 'is', link: '/leadDoc/utils/is.md' },
            { text: 'dateUtil', link: '/leadDoc/utils/dateUtil.md' },
            { text: '正则表达式', link: '/leadDoc/utils/正则表达式.md' },
          ],
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
            { text: 'GithubSynsToGitee', link: '/leadDoc/GithubSynsToGitee' },
            { text: 'Yargs', link: '/leadDoc/Yargs入门.md' },
            { text: 'VbenAdmin', link: '/leadDoc/VbenAdmin.md' },
            { text: 'Yalc', link: '/leadDoc/yalc.md' },
            { text: 'changeset', link: '/leadDoc/changeset.md' },
            { text: 'TypeScript', link: '/leadDoc/TypeScript.md' },
            { text: 'Python', link: '/leadDoc/Python.md' },
            { text: 'Linux', link: '/leadDoc/Linux.md' },
            { text: 'Ubuntu', link: '/leadDoc/Ubuntu.md' },
            { text: 'Docker', link: '/leadDoc/Docker.md' },
            { text: 'k8s', link: '/leadDoc/k8s.md' },
            { text: 'Electron', link: '/leadDoc/Electron.md' },
            { text: 'Jenkins', link: '/leadDoc/Jenkins.md' },
            { text: 'Cron', link: '/leadDoc/Cron.md' },
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
      message: '“遇你，予你，与你，余你”',
      copyright: '安稳于日常，浅喜与光阴，阅已、悦己、乐已',
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
