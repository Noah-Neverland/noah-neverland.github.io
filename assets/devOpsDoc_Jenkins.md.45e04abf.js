import{_ as s,o as n,c as a,a as l}from"./app.9ca8001b.js";const d=JSON.parse('{"title":"\u524D\u7AEF\u6587\u6863doc","description":"","frontmatter":{"title":"\u524D\u7AEF\u6587\u6863doc","editLink":true},"headers":[{"level":2,"title":"Jenkins Pipeline","slug":"jenkins-pipeline","link":"#jenkins-pipeline","children":[]},{"level":2,"title":"\u914D\u7F6E\u5168\u5C40\u5171\u4EAB\u5E93\u7684\u9ED8\u8BA4\u7248\u672C","slug":"\u914D\u7F6E\u5168\u5C40\u5171\u4EAB\u5E93\u7684\u9ED8\u8BA4\u7248\u672C","link":"#\u914D\u7F6E\u5168\u5C40\u5171\u4EAB\u5E93\u7684\u9ED8\u8BA4\u7248\u672C","children":[]},{"level":2,"title":"\u5728 Jenkins Pipeline \u4E2D\u7684\u5B9E\u9645\u5E94\u7528","slug":"\u5728-jenkins-pipeline-\u4E2D\u7684\u5B9E\u9645\u5E94\u7528","link":"#\u5728-jenkins-pipeline-\u4E2D\u7684\u5B9E\u9645\u5E94\u7528","children":[]},{"level":2,"title":"Groovy","slug":"groovy","link":"#groovy","children":[{"level":3,"title":"\u5E38\u7528\u6761\u4EF6\u5224\u65AD\u8868\u8FBE\u5F0F","slug":"\u5E38\u7528\u6761\u4EF6\u5224\u65AD\u8868\u8FBE\u5F0F","link":"#\u5E38\u7528\u6761\u4EF6\u5224\u65AD\u8868\u8FBE\u5F0F","children":[]},{"level":3,"title":"\u5E38\u89C1\u6CE8\u610F\u4E8B\u9879","slug":"\u5E38\u89C1\u6CE8\u610F\u4E8B\u9879","link":"#\u5E38\u89C1\u6CE8\u610F\u4E8B\u9879","children":[]}]}],"relativePath":"devOpsDoc/Jenkins.md"}'),p={name:"devOpsDoc/Jenkins.md"},e=l(`<h1 id="jenkins" tabindex="-1">Jenkins <a class="header-anchor" href="#jenkins" aria-hidden="true">#</a></h1><h2 id="jenkins-pipeline" tabindex="-1">Jenkins Pipeline <a class="header-anchor" href="#jenkins-pipeline" aria-hidden="true">#</a></h2><p>Jenkins Pipeline \u662F\u4E00\u79CD\u5141\u8BB8\u7528\u6237\u4EE5\u4EE3\u7801\u4E3A\u57FA\u7840\u6765\u5B9A\u4E49\u548C\u6784\u5EFA\u6301\u7EED\u4EA4\u4ED8\u6D41\u7A0B\u7684\u63D2\u4EF6\u3002\u5B83\u5141\u8BB8\u7528\u6237\u5C06\u6574\u4E2A\u8F6F\u4EF6\u5F00\u53D1\u548C\u53D1\u5E03\u8FC7\u7A0B\u5206\u89E3\u4E3A\u591A\u4E2A\u9636\u6BB5\uFF0C\u5E76\u63D0\u4F9B\u4E86\u4E30\u5BCC\u7684\u8BED\u6CD5\u548C\u529F\u80FD\u6765\u81EA\u5B9A\u4E49\u6D41\u7A0B\u4E2D\u7684\u64CD\u4F5C\u3002</p><h2 id="\u914D\u7F6E\u5168\u5C40\u5171\u4EAB\u5E93\u7684\u9ED8\u8BA4\u7248\u672C" tabindex="-1">\u914D\u7F6E\u5168\u5C40\u5171\u4EAB\u5E93\u7684\u9ED8\u8BA4\u7248\u672C <a class="header-anchor" href="#\u914D\u7F6E\u5168\u5C40\u5171\u4EAB\u5E93\u7684\u9ED8\u8BA4\u7248\u672C" aria-hidden="true">#</a></h2><ol><li>\u8FDB\u5165 Jenkins \u7BA1\u7406 &gt; \u7CFB\u7EDF\u914D\u7F6E</li><li>\u627E\u5230 Global Trusted Pipeline Libraries \u90E8\u5206</li><li>\u627E\u5230\u540D\u4E3A job_shared_libs \u7684\u5E93\u914D\u7F6E</li><li>\u5728 Default version \u5B57\u6BB5\u4E2D\u8F93\u5165\u9ED8\u8BA4\u7248\u672C\uFF08\u5982 master \u6216 main\uFF09</li><li>\u52FE\u9009 Allow default version to be overridden \u4EE5\u4FBF\u5728\u5FC5\u8981\u65F6\u4ECD\u53EF\u5728 Jenkinsfile \u4E2D\u8986\u76D6\u7248\u672C</li><li>\u4FDD\u5B58\u914D\u7F6E</li></ol><div class="language-groovy"><button class="copy"></button><span class="lang">groovy</span><pre><code><span class="line"><span style="color:#676E95;">// \u5B8C\u6210\u6B64\u8BBE\u7F6E\u540E\uFF0CJenkinsfile \u4E2D\u53EA\u9700\u7B80\u5355\u5F15\u7528 @Library(&#39;job_shared_libs&#39;) _ \u5373\u53EF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">// \u6307\u5B9A\u5206\u652F</span></span>
<span class="line"><span style="color:#C792EA;">@Library</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">job_shared_libs@master</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> _</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">// \u6307\u5B9A\u6807\u7B7E</span></span>
<span class="line"><span style="color:#C792EA;">@Library</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">job_shared_libs@v1.0</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> _</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">// \u6307\u5B9A\u63D0\u4EA4\u54C8\u5E0C</span></span>
<span class="line"><span style="color:#C792EA;">@Library</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">job_shared_libs@c2a6b94</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> _</span></span>
<span class="line"></span></code></pre></div><h2 id="\u5728-jenkins-pipeline-\u4E2D\u7684\u5B9E\u9645\u5E94\u7528" tabindex="-1">\u5728 Jenkins Pipeline \u4E2D\u7684\u5B9E\u9645\u5E94\u7528 <a class="header-anchor" href="#\u5728-jenkins-pipeline-\u4E2D\u7684\u5B9E\u9645\u5E94\u7528" aria-hidden="true">#</a></h2><p>\u6839\u636E\u9501\u6587\u4EF6\u81EA\u52A8\u9009\u62E9\u5305\u7BA1\u7406\u5668</p><div class="language-groovy"><button class="copy"></button><span class="lang">groovy</span><pre><code><span class="line"><span style="color:#A6ACCD;">pipeline {</span></span>
<span class="line"><span style="color:#A6ACCD;">    agent any</span></span>
<span class="line"><span style="color:#A6ACCD;">    stages {</span></span>
<span class="line"><span style="color:#A6ACCD;">        stage</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Install</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> {</span></span>
<span class="line"><span style="color:#A6ACCD;">            steps {</span></span>
<span class="line"><span style="color:#A6ACCD;">                sh </span><span style="color:#89DDFF;">&#39;&#39;&#39;</span></span>
<span class="line"><span style="color:#C3E88D;">                    if [ -f &quot;pnpm-lock.yaml&quot; ]; then</span></span>
<span class="line"><span style="color:#C3E88D;">                        echo &quot;Using pnpm&quot;</span></span>
<span class="line"><span style="color:#C3E88D;">                        pnpm install</span></span>
<span class="line"><span style="color:#C3E88D;">                    elif [ -f &quot;yarn.lock&quot; ]; then</span></span>
<span class="line"><span style="color:#C3E88D;">                        echo &quot;Using yarn&quot;</span></span>
<span class="line"><span style="color:#C3E88D;">                        yarn install</span></span>
<span class="line"><span style="color:#C3E88D;">                    else</span></span>
<span class="line"><span style="color:#C3E88D;">                        echo &quot;Using npm&quot;</span></span>
<span class="line"><span style="color:#C3E88D;">                        npm install</span></span>
<span class="line"><span style="color:#C3E88D;">                    fi</span></span>
<span class="line"><span style="color:#C3E88D;">                </span><span style="color:#89DDFF;">&#39;&#39;&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">            }</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"></span></code></pre></div><p>\u6839\u636E\u5206\u652F\u6267\u884C\u4E0D\u540C\u64CD\u4F5C</p><div class="language-groovy"><button class="copy"></button><span class="lang">groovy</span><pre><code><span class="line"><span style="color:#A6ACCD;">script {</span></span>
<span class="line"><span style="color:#A6ACCD;">    sh </span><span style="color:#89DDFF;">&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#C3E88D;">        if [ &quot;</span><span style="color:#A6ACCD;">$BRANCH_NAME</span><span style="color:#C3E88D;">&quot; = &quot;main&quot; ]; then</span></span>
<span class="line"><span style="color:#C3E88D;">            echo &quot;Deploying to production&quot;</span></span>
<span class="line"><span style="color:#C3E88D;">            npm run build:prod</span></span>
<span class="line"><span style="color:#C3E88D;">        elif [ &quot;</span><span style="color:#A6ACCD;">$BRANCH_NAME</span><span style="color:#C3E88D;">&quot; = &quot;develop&quot; ]; then</span></span>
<span class="line"><span style="color:#C3E88D;">            echo &quot;Deploying to staging&quot;</span></span>
<span class="line"><span style="color:#C3E88D;">            npm run build:stage</span></span>
<span class="line"><span style="color:#C3E88D;">        else</span></span>
<span class="line"><span style="color:#C3E88D;">            echo &quot;Running development build&quot;</span></span>
<span class="line"><span style="color:#C3E88D;">            npm run build:dev</span></span>
<span class="line"><span style="color:#C3E88D;">        fi</span></span>
<span class="line"><span style="color:#C3E88D;">    </span><span style="color:#89DDFF;">&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"></span></code></pre></div><p>\u68C0\u67E5\u547D\u4EE4\u6267\u884C\u662F\u5426\u6210\u529F</p><div class="language-groovy"><button class="copy"></button><span class="lang">groovy</span><pre><code><span class="line"><span style="color:#A6ACCD;">sh </span><span style="color:#89DDFF;">&#39;&#39;&#39;</span></span>
<span class="line"><span style="color:#C3E88D;">    # \u68C0\u67E5\u4E0A\u4E00\u4E2A\u547D\u4EE4\u7684\u9000\u51FA\u72B6\u6001\u7801</span></span>
<span class="line"><span style="color:#C3E88D;">    npm run build</span></span>
<span class="line"><span style="color:#C3E88D;">    </span></span>
<span class="line"><span style="color:#C3E88D;">    if [ $? -eq 0 ]; then</span></span>
<span class="line"><span style="color:#C3E88D;">        echo &quot;Build successful&quot;</span></span>
<span class="line"><span style="color:#C3E88D;">    else</span></span>
<span class="line"><span style="color:#C3E88D;">        echo &quot;Build failed&quot;</span></span>
<span class="line"><span style="color:#C3E88D;">        exit 1</span></span>
<span class="line"><span style="color:#C3E88D;">    fi</span></span>
<span class="line"><span style="color:#89DDFF;">&#39;&#39;&#39;</span></span>
<span class="line"></span></code></pre></div><p>\u590D\u6742\u7684\u6761\u4EF6\u7EC4\u5408</p><div class="language-groovy"><button class="copy"></button><span class="lang">groovy</span><pre><code><span class="line"><span style="color:#A6ACCD;">sh </span><span style="color:#89DDFF;">&#39;&#39;&#39;</span></span>
<span class="line"><span style="color:#C3E88D;">    if [ -f &quot;.env&quot; ] &amp;&amp; [ -r &quot;.env&quot; ]; then</span></span>
<span class="line"><span style="color:#C3E88D;">        echo &quot;Environment file exists and is readable&quot;</span></span>
<span class="line"><span style="color:#C3E88D;">        source .env</span></span>
<span class="line"><span style="color:#C3E88D;">    fi</span></span>
<span class="line"><span style="color:#C3E88D;">    </span></span>
<span class="line"><span style="color:#C3E88D;">    if [ &quot;$NODE_ENV&quot; = &quot;production&quot; ] || [ &quot;$CI&quot; = &quot;true&quot; ]; then</span></span>
<span class="line"><span style="color:#C3E88D;">        echo &quot;Running in CI or production mode&quot;</span></span>
<span class="line"><span style="color:#C3E88D;">        npm run test:ci</span></span>
<span class="line"><span style="color:#C3E88D;">    fi</span></span>
<span class="line"><span style="color:#89DDFF;">&#39;&#39;&#39;</span></span>
<span class="line"></span></code></pre></div><h2 id="groovy" tabindex="-1">Groovy <a class="header-anchor" href="#groovy" aria-hidden="true">#</a></h2><h3 id="\u5E38\u7528\u6761\u4EF6\u5224\u65AD\u8868\u8FBE\u5F0F" tabindex="-1">\u5E38\u7528\u6761\u4EF6\u5224\u65AD\u8868\u8FBE\u5F0F <a class="header-anchor" href="#\u5E38\u7528\u6761\u4EF6\u5224\u65AD\u8868\u8FBE\u5F0F" aria-hidden="true">#</a></h3><p>\u6587\u4EF6/\u76EE\u5F55\u5224\u65AD</p><div class="language-groovy"><button class="copy"></button><span class="lang">groovy</span><pre><code><span class="line"><span style="color:#A6ACCD;">sh </span><span style="color:#89DDFF;">&#39;&#39;&#39;</span></span>
<span class="line"><span style="color:#C3E88D;">    # \u5224\u65AD\u6587\u4EF6\u662F\u5426\u5B58\u5728</span></span>
<span class="line"><span style="color:#C3E88D;">    if [ -f &quot;package.json&quot; ]; then</span></span>
<span class="line"><span style="color:#C3E88D;">        echo &quot;File exists&quot;</span></span>
<span class="line"><span style="color:#C3E88D;">    fi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;">    # \u5224\u65AD\u76EE\u5F55\u662F\u5426\u5B58\u5728</span></span>
<span class="line"><span style="color:#C3E88D;">    if [ -d &quot;node_modules&quot; ]; then</span></span>
<span class="line"><span style="color:#C3E88D;">        echo &quot;Directory exists&quot;</span></span>
<span class="line"><span style="color:#C3E88D;">    fi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;">    # \u5224\u65AD\u6587\u4EF6\u662F\u5426\u53EF\u8BFB</span></span>
<span class="line"><span style="color:#C3E88D;">    if [ -r &quot;config.json&quot; ]; then</span></span>
<span class="line"><span style="color:#C3E88D;">        echo &quot;File is readable&quot;</span></span>
<span class="line"><span style="color:#C3E88D;">    fi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;">    # \u5224\u65AD\u6587\u4EF6\u662F\u5426\u53EF\u6267\u884C</span></span>
<span class="line"><span style="color:#C3E88D;">    if [ -x &quot;build.sh&quot; ]; then</span></span>
<span class="line"><span style="color:#C3E88D;">        echo &quot;File is executable&quot;</span></span>
<span class="line"><span style="color:#C3E88D;">    fi</span></span>
<span class="line"><span style="color:#89DDFF;">&#39;&#39;&#39;</span></span>
<span class="line"></span></code></pre></div><p>\u5B57\u7B26\u4E32\u6BD4\u8F83</p><div class="language-groovy"><button class="copy"></button><span class="lang">groovy</span><pre><code><span class="line"><span style="color:#A6ACCD;">sh </span><span style="color:#89DDFF;">&#39;&#39;&#39;</span></span>
<span class="line"><span style="color:#C3E88D;">    BRANCH_NAME=&quot;$BRANCH&quot;  # \u4ECE\u73AF\u5883\u53D8\u91CF\u83B7\u53D6</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;">    if [ &quot;$BRANCH_NAME&quot; = &quot;main&quot; ]; then</span></span>
<span class="line"><span style="color:#C3E88D;">        echo &quot;This is main branch&quot;</span></span>
<span class="line"><span style="color:#C3E88D;">    fi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;">    if [ &quot;$BRANCH_NAME&quot; != &quot;develop&quot; ]; then</span></span>
<span class="line"><span style="color:#C3E88D;">        echo &quot;This is not develop branch&quot;</span></span>
<span class="line"><span style="color:#C3E88D;">    fi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;">    # \u68C0\u67E5\u5B57\u7B26\u4E32\u662F\u5426\u4E3A\u7A7A</span></span>
<span class="line"><span style="color:#C3E88D;">    if [ -z &quot;$VARIABLE&quot; ]; then</span></span>
<span class="line"><span style="color:#C3E88D;">        echo &quot;Variable is empty&quot;</span></span>
<span class="line"><span style="color:#C3E88D;">    fi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;">    if [ -n &quot;$VARIABLE&quot; ]; then</span></span>
<span class="line"><span style="color:#C3E88D;">        echo &quot;Variable is not empty&quot;</span></span>
<span class="line"><span style="color:#C3E88D;">    fi</span></span>
<span class="line"><span style="color:#89DDFF;">&#39;&#39;&#39;</span></span>
<span class="line"></span></code></pre></div><p>\u6570\u503C\u6BD4\u8F83</p><div class="language-groovy"><button class="copy"></button><span class="lang">groovy</span><pre><code><span class="line"><span style="color:#A6ACCD;">sh </span><span style="color:#89DDFF;">&#39;&#39;&#39;</span></span>
<span class="line"><span style="color:#C3E88D;">    # \u83B7\u53D6\u8FDB\u7A0B\u6570\u91CF</span></span>
<span class="line"><span style="color:#C3E88D;">    PROCESS_COUNT=$(ps aux | grep node | wc -l)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;">    if [ $PROCESS_COUNT -gt 5 ]; then</span></span>
<span class="line"><span style="color:#C3E88D;">        echo &quot;Too many node processes&quot;</span></span>
<span class="line"><span style="color:#C3E88D;">    fi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;">    if [ $PROCESS_COUNT -eq 0 ]; then</span></span>
<span class="line"><span style="color:#C3E88D;">        echo &quot;No node processes running&quot;</span></span>
<span class="line"><span style="color:#C3E88D;">    fi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;">    if [ $PROCESS_COUNT -lt 3 ]; then</span></span>
<span class="line"><span style="color:#C3E88D;">        echo &quot;Few node processes&quot;</span></span>
<span class="line"><span style="color:#C3E88D;">    fi</span></span>
<span class="line"><span style="color:#89DDFF;">&#39;&#39;&#39;</span></span>
<span class="line"></span></code></pre></div><h3 id="\u5E38\u89C1\u6CE8\u610F\u4E8B\u9879" tabindex="-1">\u5E38\u89C1\u6CE8\u610F\u4E8B\u9879 <a class="header-anchor" href="#\u5E38\u89C1\u6CE8\u610F\u4E8B\u9879" aria-hidden="true">#</a></h3><ol><li>\u7A7A\u683C\u5F88\u91CD\u8981\uFF1A\u5728 [ ] \u6761\u4EF6\u8868\u8FBE\u5F0F\u4E2D\uFF0C\u62EC\u53F7\u5185\u7684\u7A7A\u683C\u662F\u5FC5\u987B\u7684</li><li>\u53D8\u91CF\u5F15\u7528\uFF1A\u4F7F\u7528\u53CC\u5F15\u53F7\u5F15\u7528\u53D8\u91CF\uFF0C\u9632\u6B62\u7A7A\u53D8\u91CF\u5BFC\u81F4\u7684\u8BED\u6CD5\u9519\u8BEF</li><li>\u9000\u51FA\u72B6\u6001\u7801\uFF1A$? \u53D8\u91CF\u5305\u542B\u4E0A\u4E00\u4E2A\u547D\u4EE4\u7684\u9000\u51FA\u72B6\u6001\u7801</li><li>\u5B57\u7B26\u4E32\u6BD4\u8F83\uFF1A\u4F7F\u7528 = \u800C\u4E0D\u662F ==\uFF08\u867D\u7136 == \u5728\u67D0\u4E9B shell \u4E2D\u4E5F\u6709\u6548</li></ol><div class="language-groovy"><button class="copy"></button><span class="lang">groovy</span><pre><code><span class="line"><span style="color:#676E95;">// \u6B63\u786E\u7684\u5199\u6CD5</span></span>
<span class="line"><span style="color:#A6ACCD;">sh </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">if [ &quot;$VAR&quot; = &quot;value&quot; ]; then echo &quot;Equal&quot;; fi</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">// \u9519\u8BEF\u7684\u5199\u6CD5\uFF08\u7F3A\u5C11\u7A7A\u683C\uFF09</span></span>
<span class="line"><span style="color:#A6ACCD;">sh </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">if [&quot;$VAR&quot; = &quot;value&quot;]; then echo &quot;Equal&quot;; fi</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span></code></pre></div><blockquote><p>\u53C2\u8003\u6587\u732E</p></blockquote><p><a href="https://www.jenkins.io/" target="_blank" rel="noreferrer">jenkins \u5B98\u7F51</a></p>`,28),o=[e];function c(t,i,r,y,D,u){return n(),a("div",null,o)}const h=s(p,[["render",c]]);export{d as __pageData,h as default};
