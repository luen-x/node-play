# 阿里云RPA运营管理平台

## Project setup
```

yarn install

如果没有安装node，需要先安装node
如果没有安装yarn，需先安装yarn   ：npm i yarn -g

```

### Compiles and hot-reloads for development
```
yarn start
```

### Compiles and minifies for production
```
yarn build
构建结束后打包后的文件都会输出到dist目录下
```

### Lints and fixes files
```
yarn lint

```



### Vue项目开发规范

## 代码规范
```
    缩进使用tab，一个tab的长度是4个空格  eslint会自动格式化
    空格 eslint会自动格式化
    方法命名 小驼峰，加载数据的方法以load开头，事件处理的函数以handle开头
    变量命名 小驼峰
    类命名 大驼峰
    常量 统一在constants中定义，大写+下划线
    语法检查都已经配置好eslint规则
```


## 组件规范
```
组件都在components文件夹下定义，components/_common 用于定义公用组件，layout用于定义整体布局，其他文件夹都对应了一个一级路由，文件夹的文件名除_common外都对应于一个二级路由名或2级以上的路由名，二级以上的路由，文件名以中横线分隔。


```

## css规范
```
组件css不使用scope，便于组件被调用时可以进行一定的样式覆盖
组件的容器样式以v-开头，加上路由名做区分，确保每个组件都有唯一的容器样式
公用的组件components/_common以c-开头
在css/color中定义ui给的颜色，如果有UI改动直接改这个文件即可
在global中定义全局样式，全局样式以g-开头，已经定义了许多的全局样式，在@lawrence/le-sass下提供了很多基本的全局样式如g-m-l-8，g-pd-l-8，g-flex，g-flex-center，g-jc-c等等，如果有新的全局样式要添加可以在global.scss中加入

css/reset.scss文件定义了所有覆盖组件库的样式，后期会根据ui设计在此处进行样式覆盖
css/index.scss中应该引入css文件夹下的所有样式文件，并在main.js中引入index.scss，使webpack能够把css打包进来，index.scss中引入文件的顺序要注意，color等定义变量的scss文件要放在前面引入。



```

## 弹层规范
```
    使用portal包装modal组件或drawer组件封装成可独立工作的组件供其他组件调用，
    对于component的name相同组件，重复调用popup只会更新prop，不会重新创建弹窗
```

## api规范
```
    接口统一在constants/apis中定义常量，并且在接口后添加备注，大致说明此接口的用途，如果接口需要替换可以在这里统一替换，如果项目接口很多可以拆分成多个文件来定义常量
```
## 接口请求规范
```
    组件内统一使用this.$get，this.$post来请求接口
    对于分页列表数据的请求使用this.$getList请求，便于后期对列表请求统一增加处理
    组件外部使用window.app.$get/post来发起请求
    使用在apis中定义的常量用来请求接口
    使用axios进行请求，相关配置都在util/http.js中
```
## 全局配置global
```
在global文件夹中定义全局的配置，预设了auth，user，config三个对象
auth用于存储用户的权限，user存储当前登录用户信息,condig用于存储系统的其他配置
在组件内可以使用this.$global访问到global
组件外需引入global.js来访问global
无论如何访问，访问的都是同一个global

```

## 跨域处理
```
使用webpack-dev-server进行请求转发，相当于浏览器请求本地express服务器,express检查此请求路径否有匹配的路由，如果没有则去请求proxy中配置的地址，并且将结果原样返回给浏览器
可以在vue.config.js中的devServer对请求转发进行详细配置，配置参数参考vue-cli 以及 webpack-dev-server，
正式环境下，前端文件是部署在后端服务器下的（和接口一个域名），不会有跨域问题（如果正式环境也要发送跨域请求，就需要后端同学配合了）


```

## 路由结构规范
```
    小写单词用斜杠分割，允许出现驼峰式的路由，不用中横线或下划线，应尽量避免使用多个单词的路由
    在container下创建各个页面的容器组件容器组件统一使用baseView，便于后期对各个页面做统一的调整
    每个一级路由在container下对应一个文件夹（大模块），每个路由对应该文件夹下的一个文件，二级以上的路由，文件夹名以中横线分隔路由，每个大模块中定义app.js来声明每个container对应的路由
    后期会补充工具链，通过命令行或者图形界面来创建路由
    除了路由文件外，文件和文件夹命名统一使用中横线
```

## 使用命令创建路由
```
使用 npm run add 可以创建创建路由
使用 npm run remove 可以移除路由（此方法还待改进，有时会有问题，需要手动调整一些代码）
命令式创建路由以及模板文件，目前还不是很完善，后期优化
建议使用命令增加、删除路由前，先提交一波代码，如果生成错了可以直接在git上放弃修改
对于每个项目要生成的模板代码不同，在根目录confi文件夹下定义了如何生成模板文件，可以根据不同的项目修改component-template.js来定制模板文件

```
## 开发环境
```
    使用vscode，
    须安装插件
    Vetur
    ESLint，
    Chinese (Simplified) Language Pack for Visual Studio Code,
    Bracket Pair Colorizer，
    Code Runner，
    GitLens // 建议使用此插件来代替git命令行，相当好用
    auto close tag
    auto import
    auto rename tag
    Element UI Snippets

    setting.json:
{
    "git.confirmSync": false,
    "git.enableSmartCommit": true,
    "explorer.confirmDelete": false,
    "workbench.startupEditor": "newUntitledFile",

    "editor.multiCursorModifier": "ctrlCmd",
    "editor.snippetSuggestions": "top",
    "editor.formatOnSave": false,
    "files.exclude": {
      "**/.git": true,
      "**/.svn": true,
      "**/.hg": true,
      "**/CVS": true,
      "**/.DS_Store": true
      // "**/node_modules": true
    },
    "git.path": "F:\\devFiles\\Git\\cmd",
    // 禁止 vetur 校验模版
    "vetur.validation.template": false,

    "eslint.enable": true,
    // 自动修复
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true,
    },
    // 配置 ESLint 检查的文件类型
    "eslint.validate": [
      "javascript",
      "vue",
      "html"
    ],
    "prettier.singleQuote": true,
    "prettier.semi": false,
    "prettier.disableLanguages": [
      "markdown"
    ],
    "extensions.autoUpdate": false,
    "vetur.format.defaultFormatter.html": "none",
    "terminal.integrated.shell.windows": "C:\\WINDOWS\\system32\\cmd.exe",
    "diffEditor.ignoreTrimWhitespace": false,
    // 配React的配置
    // emmet关于react的配置
    "emmet.syntaxProfiles": {
      "JavaScript React": "jsx"
    },
    "terminal.integrated.rendererType": "dom",
    "vetur.format.options.useTabs": true,
    "code-runner.executorMap": {
      "javascript": "node",
      "python": "set PYTHONIOENCODING=utf8 && python"
    },
    "explorer.confirmDragAndDrop": false,
    "editor.quickSuggestions": {
      "strings": true
    }
  }
```
### 切换本地代理
```
在根目录下的vue.config.js中打开相应环境的域名配置即可切换开发环境webpack-dev-server的代理（解决跨域问题，和对应的后端调试时需要切换）
```

## 提供的代码片段
```
    vue
    $modal
    $drawer
    后续补充
```











