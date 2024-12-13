import{_ as a,o as s,c as n,a as e}from"./app.d2536faa.js";const g=JSON.parse('{"title":"\u524D\u7AEF\u6587\u6863doc","description":"","frontmatter":{"title":"\u524D\u7AEF\u6587\u6863doc","editLink":true},"headers":[{"level":2,"title":"Installation","slug":"installation","link":"#installation","children":[]},{"level":2,"title":"\u5E38\u89C4\u4F7F\u7528","slug":"\u5E38\u89C4\u4F7F\u7528","link":"#\u5E38\u89C4\u4F7F\u7528","children":[]}],"relativePath":"leadDoc/changeset.md"}'),l={name:"leadDoc/changeset.md"},o=e(`<h1 id="changesets-\u6D41\u884C\u7684-monorepo-\u573A\u666F\u53D1\u5305\u5DE5\u5177" tabindex="-1">Changesets: \u6D41\u884C\u7684 monorepo \u573A\u666F\u53D1\u5305\u5DE5\u5177 <a class="header-anchor" href="#changesets-\u6D41\u884C\u7684-monorepo-\u573A\u666F\u53D1\u5305\u5DE5\u5177" aria-hidden="true">#</a></h1><h2 id="installation" tabindex="-1">Installation <a class="header-anchor" href="#installation" aria-hidden="true">#</a></h2><p>Using PNPM:</p><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#A6ACCD;">pnpm add </span><span style="color:#89DDFF;">--</span><span style="color:#A6ACCD;">save</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">dev </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">w </span><span style="color:#89DDFF;">@</span><span style="color:#A6ACCD;">changesets</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">cli prettier</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">plugin</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">organize</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">imports prettier</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">plugin</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">packagejson</span></span>
<span class="line"><span style="color:#A6ACCD;">npx changeset init</span></span>
<span class="line"></span></code></pre></div><h2 id="\u5E38\u89C4\u4F7F\u7528" tabindex="-1">\u5E38\u89C4\u4F7F\u7528 <a class="header-anchor" href="#\u5E38\u89C4\u4F7F\u7528" aria-hidden="true">#</a></h2><ol><li><p><code>npx changeset add</code> \u540E\u4F1A\u8BA9\u4F60\u9009\u62E9\u66F4\u65B0\u54EA\u4E2A\u7248\u672C\u53F7\uFF0C\u7248\u672C\u53F7\u9009\u62E9\u9009\u62E9\u662F Major&gt;Minor&gt;Patch\uFF08\u4E0D\u6572\u7A7A\u683C\u4E00\u76F4\u56DE\u64A4\u7684\u8BDD\u5C31\u662F\u66F4\u65B0\u7684 Patch\uFF09</p><ul><li>Major, Minor, Patch \u7248\u672C\u53F7\u7684\u542B\u4E49 <ul><li>Major (\u4E3B\u7248\u672C\u53F7)\uFF1A\u5F53\u4F9D\u8D56\u5305\u8FDB\u884C\u4E86\u4E00\u6B21\u4E0D\u517C\u5BB9\u7684 API \u4FEE\u6539\u65F6\uFF0C\u4E3B\u7248\u672C\u53F7\u4F1A\u589E\u52A0\u3002\u8FD9\u610F\u5473\u7740\u5982\u679C\u4F60\u6B63\u5728\u4F7F\u7528\u7684\u4EE3\u7801\u4F9D\u8D56\u4E8E\u67D0\u4E2A\u5E93\u7684\u67D0\u4E2A API\uFF0C\u800C\u8BE5\u5E93\u5728\u4E0B\u4E00\u4E2A\u4E3B\u7248\u672C\u4E2D\u6539\u53D8\u4E86\u8FD9\u4E2A API\uFF0C\u90A3\u4E48\u4F60\u7684\u4EE3\u7801\u53EF\u80FD\u5C06\u65E0\u6CD5\u6B63\u5E38\u5DE5\u4F5C\uFF0C\u9664\u975E\u4F60\u8FDB\u884C\u76F8\u5E94\u7684\u4FEE\u6539\u3002</li><li>Minor (\u6B21\u7248\u672C\u53F7)\uFF1A\u5F53\u4F9D\u8D56\u5305\u589E\u52A0\u4E86\u5411\u540E\u517C\u5BB9\u7684\u65B0\u529F\u80FD\u65F6\uFF0C\u6B21\u7248\u672C\u53F7\u4F1A\u589E\u52A0\u3002\u8FD9\u610F\u5473\u7740\u4F60\u53EF\u4EE5\u5B89\u5168\u5730\u5347\u7EA7\u6B21\u7248\u672C\uFF0C\u800C\u65E0\u9700\u62C5\u5FC3\u73B0\u6709\u7684\u4EE3\u7801\u4F1A\u56E0\u4E3A\u65B0\u529F\u80FD\u7684\u52A0\u5165\u800C\u51FA\u73B0\u95EE\u9898\u3002</li><li>Patch (\u8865\u4E01\u7248\u672C\u53F7)\uFF1A\u5F53\u4F9D\u8D56\u5305\u4FEE\u590D\u4E86 bug \u6216\u8005\u8FDB\u884C\u4E86\u975E\u529F\u80FD\u6027\u7684\u4F18\u5316\u65F6\uFF0C\u8865\u4E01\u7248\u672C\u53F7\u4F1A\u589E\u52A0\u3002\u8865\u4E01\u7248\u672C\u7684\u66F4\u65B0\u901A\u5E38\u662F\u5B89\u5168\u7684\uFF0C\u56E0\u4E3A\u5B83\u4EEC\u53EA\u662F\u4E3A\u4E86\u4FEE\u590D\u95EE\u9898\uFF0C\u800C\u4E0D\u4F1A\u5F15\u5165\u65B0\u7684\u529F\u80FD\u6216\u4FEE\u6539\u73B0\u6709\u529F\u80FD\u3002</li></ul></li></ul></li><li><p><code>npx changeset version</code></p></li><li><p><code>npx changeset publish</code></p></li></ol><blockquote><p>changeset \u4F1A\u57FA\u4E8E git \u6765\u5224\u65AD\u4EE3\u7801\u6709\u6CA1\u6709\u53D8\u52A8 Major, Minor, Patch \u7248\u672C\u53F7\u7684\u542B\u4E49</p></blockquote>`,7),t=[o];function p(c,i,r,d,h,D){return s(),n("div",null,t)}const C=a(l,[["render",p]]);export{g as __pageData,C as default};
