---
title: 前端文档doc
editLink: true
---

# Jenkins

## Jenkins Pipeline

Jenkins Pipeline 是一种允许用户以代码为基础来定义和构建持续交付流程的插件。它允许用户将整个软件开发和发布过程分解为多个阶段，并提供了丰富的语法和功能来自定义流程中的操作。

## 配置全局共享库的默认版本

1. 进入 Jenkins 管理 > 系统配置
2. 找到 Global Trusted Pipeline Libraries 部分
3. 找到名为 job_shared_libs 的库配置
4. 在 Default version 字段中输入默认版本（如 master 或 main）
5. 勾选 Allow default version to be overridden 以便在必要时仍可在 Jenkinsfile 中覆盖版本
6. 保存配置

```groovy
// 完成此设置后，Jenkinsfile 中只需简单引用 @Library('job_shared_libs') _ 即可

// 指定分支
@Library('job_shared_libs@master') _

// 指定标签
@Library('job_shared_libs@v1.0') _

// 指定提交哈希
@Library('job_shared_libs@c2a6b94') _
```

## 在 Jenkins Pipeline 中的实际应用

根据锁文件自动选择包管理器

```groovy
pipeline {
    agent any
    stages {
        stage('Install') {
            steps {
                sh '''
                    if [ -f "pnpm-lock.yaml" ]; then
                        echo "Using pnpm"
                        pnpm install
                    elif [ -f "yarn.lock" ]; then
                        echo "Using yarn"
                        yarn install
                    else
                        echo "Using npm"
                        npm install
                    fi
                '''
            }
        }
    }
}
```

根据分支执行不同操作

```groovy
script {
    sh """
        if [ "$BRANCH_NAME" = "main" ]; then
            echo "Deploying to production"
            npm run build:prod
        elif [ "$BRANCH_NAME" = "develop" ]; then
            echo "Deploying to staging"
            npm run build:stage
        else
            echo "Running development build"
            npm run build:dev
        fi
    """
}
```

检查命令执行是否成功

```groovy
sh '''
    # 检查上一个命令的退出状态码
    npm run build
    
    if [ $? -eq 0 ]; then
        echo "Build successful"
    else
        echo "Build failed"
        exit 1
    fi
'''
```

复杂的条件组合

```groovy
sh '''
    if [ -f ".env" ] && [ -r ".env" ]; then
        echo "Environment file exists and is readable"
        source .env
    fi
    
    if [ "$NODE_ENV" = "production" ] || [ "$CI" = "true" ]; then
        echo "Running in CI or production mode"
        npm run test:ci
    fi
'''
```

## Groovy

### 常用条件判断表达式

文件/目录判断

```groovy
sh '''
    # 判断文件是否存在
    if [ -f "package.json" ]; then
        echo "File exists"
    fi

    # 判断目录是否存在
    if [ -d "node_modules" ]; then
        echo "Directory exists"
    fi

    # 判断文件是否可读
    if [ -r "config.json" ]; then
        echo "File is readable"
    fi

    # 判断文件是否可执行
    if [ -x "build.sh" ]; then
        echo "File is executable"
    fi
'''
```

字符串比较

```groovy
sh '''
    BRANCH_NAME="$BRANCH"  # 从环境变量获取

    if [ "$BRANCH_NAME" = "main" ]; then
        echo "This is main branch"
    fi

    if [ "$BRANCH_NAME" != "develop" ]; then
        echo "This is not develop branch"
    fi

    # 检查字符串是否为空
    if [ -z "$VARIABLE" ]; then
        echo "Variable is empty"
    fi

    if [ -n "$VARIABLE" ]; then
        echo "Variable is not empty"
    fi
'''
```

数值比较

```groovy
sh '''
    # 获取进程数量
    PROCESS_COUNT=$(ps aux | grep node | wc -l)

    if [ $PROCESS_COUNT -gt 5 ]; then
        echo "Too many node processes"
    fi

    if [ $PROCESS_COUNT -eq 0 ]; then
        echo "No node processes running"
    fi

    if [ $PROCESS_COUNT -lt 3 ]; then
        echo "Few node processes"
    fi
'''
```

### 常见注意事项

1. 空格很重要：在 [ ] 条件表达式中，括号内的空格是必须的
2. 变量引用：使用双引号引用变量，防止空变量导致的语法错误
3. 退出状态码：$? 变量包含上一个命令的退出状态码
4. 字符串比较：使用 = 而不是 ==（虽然 == 在某些 shell 中也有效

```groovy
// 正确的写法
sh 'if [ "$VAR" = "value" ]; then echo "Equal"; fi'

// 错误的写法（缺少空格）
sh 'if ["$VAR" = "value"]; then echo "Equal"; fi'
```

> 参考文献

[jenkins 官网](https://www.jenkins.io/)
