npm -### 目录及约定

在文件和目录的组织上，使用约定的方式。

一个应用的目录结构如下：

```js
 ├─build 					 // 输出路径
 ├─config                    // 配置
 │   ├─index.js              // 打包配置
 │   └─private.json          // SharePoint凭据信息
 ├─scripts                   // 打包脚本
 ├─src
 │   ├─assets                // 公共静态资源
 │   ├─components            // 公共组件/公共组件库
 │   ├─config                // 运行时配置文件
 │   ├─html                  // 页面模板
 │   ├─i18n                  // 语言包
 │   ├─pages
 │   │  └─Test
 │   │     ├── Index.ts      // 多页应用时的页面入口，单页应用时为页面组件
 │   │     └── pageinfo.js   // 对应页面的html模板信息，多页应用时使用
 │   ├─services              // 其他功能库
 │   ├─App.css
 │   ├─App.tsx
 │   └─Index.tsx             // 单页应用入口
 ├──modules.d.ts             // TypeScript模块声明
 ├──package.json			 // 项目信息，脚本指令，依赖信息
 ├──README.md                // 使用说明
 ├──tsconfig.json            // TypeScript编译设置
 └──tslint.json              // tslint代码规范选项
```



#### 使用

1.安装依赖

在项目路径下打开cmd或使用vscode打开项目后启动终端，执行依赖安装命令

```bash
npm i
# 安装所需的依赖
```



2.运行

依次执行以下的命令，执行完命令后会自动打开浏览器，在打开的页面中选择打开html下的页面即可看到示例页面，如果打开的页面没看到有html，需等打包完成后刷新页面

```bash
npm run dll	# 打包通用dll
npm run watch	# 进行本地调试
```



4.部署

执行正式环境打包命令，将build文件夹的内容复制到服务器。

```bash
npm run prod # 正式环境打包
```






