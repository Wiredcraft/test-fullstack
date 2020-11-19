Requirements
=============

Done
--------------
[√]  When a user opens the page, he/she should see a list of lighting talks submitted by the users, ordered by rating (poll amount).

[√]  If there's no lighting talk yet, there should be some description and some text to encourage the users to submit their own talks.

[√]  For each of the talks in the list, the user could vote it by clicking a button.

[√]  After voting it, the user should see an updated version of the list, eg. with new talks and new sorting order etc.

[√]  The users should be able to submit new lighting talks anytime. The required information is the title and description, while the system should also save the submit time and user.

[√]  After submitting a topic, the user should see an updated version of the list.

[√] The frontend part should be a single page application rendered in the frontend and load data from a RESTful API (not rendered from backend).

[√] The API should follow typical RESTful API design pattern.

[√] Make it responsive.

[√] Provide a form validation strategy.

[√] Provide an error handling strategy, such as the UI/UX, and different handling for different errors etc.

[√] Provide a complete user auth (authentication/authorization/etc) strategy, such as OAuth.

[√] Provide a complete logging (when/how/etc) strategy.

[√] Use React for the frontend.


后端部分
======================
项目基于NestJS构建，分成两部分 WebServer 和 UploadServer


安装
---------------

数据存储依赖于 MongoDB，请先安装 Mongo。

另外，UploadServer 的文件转换功能依赖 Open Office，所以需要安装必要组件。

```$ apt install libreoffice imagemagick ghostscript```

最后

```$ cd backend && npm i```

启动
----------------
WebServer:

```$ cd backend && npm start```

UploadServer:

```$ cd backend && npm run upload```

WebServer API Testing Panel: ```http://localhost:3000/api-front/```

UploadServer API Testing Panel: ```http://localhost:3001/api-front/```


功能点
-----------------
* 基于 JWT 的用户注册、登录。
* 用户可以列出 lightning talks，分页展示，并按 votes 数量倒序排序。
* 登录用户可以 vote 和 unvote，并影响其排序。用户对每个 lightning talk 只能投一次票，并且不能投自己。
* 登录用户可以创建 lightning talk 并上传 PPT 文档，后端自动转换成图片存储和展示。
* 当用户请求创建 lightning talk 时，WebServer 会返回一个 Upload URI 给 Client，用于上传资料到指定的 UploadServer。UploadServer 则可以分布式地部署多个实例。他们将以 Microservice 的形式与 WebServer 协同工作，同时又各自提供文件服务给 Client。



前端部分
=====================
frontend 基于 Angular 构建，分两部分演示：Client App 和一个 Web Component
frontend-react 基于 React 构建，重用了 Angular Web Component


安装
---------------

[Angular 版]

```$ cd frontend && npm i```

```$ cd slideshow && npm i && npm run buildall```

[React 版]

```$ cd frontend-react && npm i```

启动
----------------

[Angular 版]

```$ cd frontend && ng serve```

Web Browser 访问 ```http://localhost:4200/```

[React 版]

```$ cd frontend-react && npm start```

Web Browser 访问 ```http://localhost:3100/```

功能点
---------------
* 基于 JWT 的用户注册、登录。
* 用户可以列出 lightning talks，分页展示，并按 votes 数量倒序排序。
* 登录用户可以 vote 和 unvote，并影响其排序。用户对每个 lightning talk 只能投一次票，并且不能投自己。
* 登录用户可以创建 lightning talk 并上传 PPT 文档。
* 用户可以查看 lightning talk 详细信息，查看 PPT 内容。
