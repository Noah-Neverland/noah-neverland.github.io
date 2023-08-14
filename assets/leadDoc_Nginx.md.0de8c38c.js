import{_ as s,o as n,c as a,a as l}from"./app.3e2caadd.js";const o="/assets/image.d57c9b29.png",d=JSON.parse('{"title":"\u524D\u7AEF\u6587\u6863doc","description":"","frontmatter":{"title":"\u524D\u7AEF\u6587\u6863doc","editLink":true},"headers":[{"level":2,"title":"mac \u7CFB\u7EDF\u8FDB\u884C nginx \u4EE3\u7406\u914D\u7F6E","slug":"mac-\u7CFB\u7EDF\u8FDB\u884C-nginx-\u4EE3\u7406\u914D\u7F6E","link":"#mac-\u7CFB\u7EDF\u8FDB\u884C-nginx-\u4EE3\u7406\u914D\u7F6E","children":[{"level":3,"title":"\u4E00\u3001\u627E\u5230 nginx \u914D\u7F6E\u6587\u4EF6","slug":"\u4E00\u3001\u627E\u5230-nginx-\u914D\u7F6E\u6587\u4EF6","link":"#\u4E00\u3001\u627E\u5230-nginx-\u914D\u7F6E\u6587\u4EF6","children":[]},{"level":3,"title":"\u4E8C\u3001\u521B\u5EFA\u81EA\u5DF1\u7684\u914D\u7F6E\u6587\u4EF6","slug":"\u4E8C\u3001\u521B\u5EFA\u81EA\u5DF1\u7684\u914D\u7F6E\u6587\u4EF6","link":"#\u4E8C\u3001\u521B\u5EFA\u81EA\u5DF1\u7684\u914D\u7F6E\u6587\u4EF6","children":[]},{"level":3,"title":"\u4E09\u3001\u4FEE\u6539 hosts","slug":"\u4E09\u3001\u4FEE\u6539-hosts","link":"#\u4E09\u3001\u4FEE\u6539-hosts","children":[]},{"level":3,"title":"\u56DB\u3001nginx \u5E38\u7528\u547D\u4EE4","slug":"\u56DB\u3001nginx-\u5E38\u7528\u547D\u4EE4","link":"#\u56DB\u3001nginx-\u5E38\u7528\u547D\u4EE4","children":[]}]}],"relativePath":"leadDoc/Nginx.md"}'),p={name:"leadDoc/Nginx.md"},e=l('<h1 id="nginx" tabindex="-1">Nginx <a class="header-anchor" href="#nginx" aria-hidden="true">#</a></h1><h2 id="mac-\u7CFB\u7EDF\u8FDB\u884C-nginx-\u4EE3\u7406\u914D\u7F6E" tabindex="-1">mac \u7CFB\u7EDF\u8FDB\u884C nginx \u4EE3\u7406\u914D\u7F6E <a class="header-anchor" href="#mac-\u7CFB\u7EDF\u8FDB\u884C-nginx-\u4EE3\u7406\u914D\u7F6E" aria-hidden="true">#</a></h2><h3 id="\u4E00\u3001\u627E\u5230-nginx-\u914D\u7F6E\u6587\u4EF6" tabindex="-1">\u4E00\u3001\u627E\u5230 nginx \u914D\u7F6E\u6587\u4EF6 <a class="header-anchor" href="#\u4E00\u3001\u627E\u5230-nginx-\u914D\u7F6E\u6587\u4EF6" aria-hidden="true">#</a></h3><ul><li>nginx -t \u53EF\u4EE5\u627E\u5230 nginx \u76F8\u5173\u914D\u7F6E\uFF0C\u8FDB\u5165\u5230\u8FD9\u4E2A\u914D\u7F6E\u6587\u4EF6\u4E2D <img src="'+o+`" alt="Alt text"></li></ul><h3 id="\u4E8C\u3001\u521B\u5EFA\u81EA\u5DF1\u7684\u914D\u7F6E\u6587\u4EF6" tabindex="-1">\u4E8C\u3001\u521B\u5EFA\u81EA\u5DF1\u7684\u914D\u7F6E\u6587\u4EF6 <a class="header-anchor" href="#\u4E8C\u3001\u521B\u5EFA\u81EA\u5DF1\u7684\u914D\u7F6E\u6587\u4EF6" aria-hidden="true">#</a></h3><ul><li>\u521B\u5EFA\u6587\u4EF6 touch app.conf</li><li>\u6253\u5F00\u6587\u4EF6 code app.conf \u6216\u8005 vim \u76EE\u5F55\u5730\u5740/app.conf\uFF08\u547D\u4EE4\u884C\u91CC\u64CD\u4F5C\uFF09</li><li>\u67E5\u770B\u6587\u4EF6 cat app.conf</li><li>\u590D\u5236\u4EE5\u4E0B\u914D\u7F6E</li></ul><div class="language-JavaScript"><button class="copy"></button><span class="lang">JavaScript</span><pre><code><span class="line"><span style="color:#676E95;">// template</span></span>
<span class="line"><span style="color:#A6ACCD;">server </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">listen</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">80</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">server_name</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">a</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">dev</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">com</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">location</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">/</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">proxy_pass</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">http</span><span style="color:#89DDFF;">:</span><span style="color:#676E95;">//10.10.135.158:8090;</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">proxy_set_header</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Host</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">$host</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#676E95;">// vue/react</span></span>
<span class="line"><span style="color:#A6ACCD;">server </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">listen</span><span style="color:#F07178;">  </span><span style="color:#F78C6C;">8080</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">server_name</span><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">localhost</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">root</span><span style="color:#F07178;">   </span><span style="color:#A6ACCD;">xxx</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#676E95;">// \u653E\u5165\u8BBF\u95EE\u7684\u9879\u76EE\u76EE\u5F55\u5730\u5740</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">index</span><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">index</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">html</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">location</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">/</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">try_files</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">$uri</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">$uri</span><span style="color:#89DDFF;">/</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">@</span><span style="color:#A6ACCD;">router</span><span style="color:#F07178;">;</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">access_log</span><span style="color:#F07178;">  </span><span style="color:#89DDFF;">/</span><span style="color:#C792EA;">var</span><span style="color:#F07178;">/</span><span style="color:#A6ACCD;">log</span><span style="color:#F07178;">/nginx/access.log  main</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">error_log</span><span style="color:#F07178;">   </span><span style="color:#89DDFF;">/</span><span style="color:#C792EA;">var</span><span style="color:#F07178;">/</span><span style="color:#A6ACCD;">log</span><span style="color:#F07178;">/nginx/error.log  warn</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">location</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">@</span><span style="color:#A6ACCD;">router</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">rewrite</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">^.*</span><span style="color:#A6ACCD;">$</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">index</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">html</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">last</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h3 id="\u4E09\u3001\u4FEE\u6539-hosts" tabindex="-1">\u4E09\u3001\u4FEE\u6539 hosts <a class="header-anchor" href="#\u4E09\u3001\u4FEE\u6539-hosts" aria-hidden="true">#</a></h3><ul><li>\u901A\u8FC7 ihosts \u4FEE\u6539\u81EA\u5DF1\u7684\u914D\u7F6E \u91CD\u542F\u670D\u52A1 nginx -s reload</li><li>\u8FD9\u91CC\u662F\u628A <a href="http://a.dev.com" target="_blank" rel="noreferrer">a.dev.com</a> \u6620\u5C04\u5230\u672C\u5730 127.0.0.1</li></ul><h3 id="\u56DB\u3001nginx-\u5E38\u7528\u547D\u4EE4" tabindex="-1">\u56DB\u3001nginx \u5E38\u7528\u547D\u4EE4 <a class="header-anchor" href="#\u56DB\u3001nginx-\u5E38\u7528\u547D\u4EE4" aria-hidden="true">#</a></h3><ul><li>\u5F00\u542F\uFF1A<code>nginx</code></li><li>\u91CD\u8F7D\uFF1A<code>nginx -s reload</code></li><li>\u5173\u95ED\uFF1A<code>nginx -s stop/quit</code></li></ul>`,11),c=[e];function t(r,i,y,F,D,C){return n(),a("div",null,c)}const h=s(p,[["render",t]]);export{d as __pageData,h as default};
