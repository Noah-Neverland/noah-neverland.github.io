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
          { text: '文档DOC', link: '/frontendDoc/提交规范Git' },
          { text: '前端技术栈', link: '/pages/前端技术栈' },
        ],
      },
      { text: '后端开发', link: '/backendDoc/Python' },
      { text: 'DevOps', link: '/devOpsDoc/Docker' },
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
      '/frontendDoc/': [
        {
          text: '项目规范',
          collapsible: true,
          // collapsed: true,
          items: [{ text: 'Git提交规范', link: '/frontendDoc/提交规范Git' }],
        },
        {
          text: 'GIT相关信息',
          collapsible: true,
          // collapsed: true,
          items: [{ text: 'Git技巧', link: '/frontendDoc/技巧Git' }],
        },
        {
          text: 'Utils',
          collapsible: true,
          // collapsed: true,
          items: [
            { text: 'utils', link: '/frontendDoc/utils/utils.md' },
            { text: 'is', link: '/frontendDoc/utils/is.md' },
            { text: 'dateUtil', link: '/frontendDoc/utils/dateUtil.md' },
            { text: '正则表达式', link: '/frontendDoc/utils/正则表达式.md' },
          ],
        },
        {
          text: '前端框架',
          collapsible: true,
          // collapsed: true,
          items: [
            { text: 'VbenAdmin', link: '/frontendDoc/VbenAdmin.md' },
            { text: 'AntDesignVue', link: '/frontendDoc/AntDesignVue' },
          ],
        },
        {
          text: '技术文档',
          collapsible: true,
          // collapsed: true,
          items: [
            { text: 'KNT微前端', link: '/frontendDoc/KNT微前端' },
            { text: 'KNT健康平台技术文档', link: '/frontendDoc/KNT健康平台技术文档' },
            { text: 'Taro vs uni-app选型对比', link: '/frontendDoc/TaroVSuni-app选型对比' },
            { text: 'QuickWebServe', link: '/frontendDoc/QuickWebServe' },
            { text: 'Prettier', link: '/frontendDoc/Prettier' },
            { text: 'MacOs', link: '/frontendDoc/MacOs' },
            { text: 'Yargs', link: '/frontendDoc/Yargs入门.md' },
            { text: 'Yalc', link: '/frontendDoc/yalc.md' },
            { text: 'changeset', link: '/frontendDoc/changeset.md' },
            { text: 'TypeScript', link: '/frontendDoc/TypeScript.md' },
            { text: 'Electron', link: '/frontendDoc/Electron.md' },
            { text: 'Cron', link: '/frontendDoc/Cron.md' },
            { text: 'Npm', link: '/frontendDoc/Npm.md' },
          ],
        },
      ],
      '/backendDoc/': [
        {
          text: '技术文档',
          collapsible: true,
          // collapsed: true,
          items: [
            { text: 'Python', link: '/backendDoc/Python.md' },
            { text: 'Linux', link: '/backendDoc/Linux.md' },
            { text: 'Ubuntu', link: '/backendDoc/Ubuntu.md' },
          ],
        },
      ],
      '/devOpsDoc/': [
        {
          text: '技术文档',
          collapsible: true,
          // collapsed: true,
          items: [
            { text: 'Docker', link: '/devOpsDoc/Docker.md' },
            { text: 'k8s', link: '/devOpsDoc/k8s.md' },
            { text: 'Jenkins', link: '/devOpsDoc/Jenkins.md' },
             { text: 'GithubSynsToGitee', link: '/devOpsDoc/GithubSynsToGitee' },
             { text: 'Nginx', link: '/devOpsDoc/Nginx' },
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
