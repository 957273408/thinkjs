
Application created by [ThinkJS](http://www.thinkjs.org)

## Install dependencies

```
npm install
```

## Start server

```
npm start
```

## Deploy with pm2

Use pm2 to deploy app on production enviroment.

```
pm2 startOrReload pm2.json
```

## 项目结构

默认项目结构

```
|--- development.js   //开发环境下的入口文件
|--- nginx.conf  //nginx 配置文件
|--- package.json
|--- pm2.json //pm2 配置文件
|--- production.js //生产环境下的入口文件
|--- README.md
|--- src
| |--- bootstrap  //启动自动执行目录 
| | |--- master.js //Master 进程下自动执行
| | |--- worker.js //Worker 进程下自动执行
| |--- config  //配置文件目录
| | |--- adapter.js  // adapter 配置文件 
| | |--- config.js  // 默认配置文件 
| | |--- config.production.js  //生产环境下的默认配置文件，和 config.js 合并 
| | |--- extend.js  //extend 配置文件 
| | |--- middleware.js //middleware 配置文件 
| | |--- router.js //自定义路由配置文件
| |--- controller  //控制器目录 
| | |--- base.js
| | |--- index.js
| |--- logic //logic 目录
| | |--- index.js
| |--- model //模型目录
| | |--- index.js
|--- view  //模板目录
| |--- index_index.html
```

## common 配置信息

 1. config.js 通用的一些配置
 2. adapter.js adapter 配置
 3. router.js 自定义路由配置
 4. middleware.js middlware 配置
 5. validator.js 数据校验配置
 6. extend.js extend 配置

## config 配置
全局访问的变量
```
// default config
module.exports = {
  default_module: 'api',
  weixin: {
    appid: 'wx39448ee18366bf1c', // 小程序 appid
    secret: '27ce2f838794f4befefb7d7c9106c430', // 小程序密钥
    mch_id: '', // 商户帐号ID
    partner_key: '', // 微信支付密钥
    notify_url: '' // 微信异步通知
  },
  express: {
    // 快递物流信息查询使用的是快递鸟接口，申请地址：http://www.kdniao.com/
    appid: '', // 对应快递鸟用户后台 用户ID
    appkey: '', // 对应快递鸟用户后台 API key
    request_url: 'http://api.kdniao.cc/Ebusiness/EbusinessOrderHandle.aspx'
  }
};

```
## adapter 配置

Adapter 是用来解决一类功能的多种实现，这些实现提供一套相同的接口，类似设计模式里的工厂模式。如：支持多种数据库，支持多种模版引擎等。通过这种方式，可以很方便的在不同的类型中进行切换。Adapter 一般配合 Extend 一起使用。

框架默认提供了很多种 Adapter，如： View、Model、Cache、Session、Websocket，项目中也可以根据需要进行扩展，也可以引入第三方的 Adapter。
```
type 默认使用 Adapter 的类型，具体调用时可以传递参数改写
common 配置通用的一些参数，项目启动时会跟具体的 adapter 参数作合并
nunjucks ejs 配置特定类型的 Adapter 参数，最终获取到的参数是 common 参数与该参数进行合并
handle 对应类型的处理函数，一般为一个类
```

## router配置
```
think-router 是一个 middleware，项目创建时默认已经加到配置文件 src/config/middleware.js 里了，其中 options 支持如下的参数：

defaultModule {String} 多模块项目下，默认的模块名。默认值为 home
defaultController {String} 默认的控制器名，默认值为 index
defaultAction {String} 默认的操作名，默认值为 index
prefix {Array} 默认去除的 pathname 前缀，默认值为 []
suffix {Array} 默认去除的 pathname 后缀，默认值为 ['.html']
enableDefaultRouter {Boolean} 在不匹配情况下是否使用默认路由解析，默认值为 true
optimizeHomepageRouter {Boolean} 是否对首页进行优化，默认值为 true（开启后如果访问地址是首页，那么不会进行自定义路由匹配）
subdomainOffset {Number} 子域名映射下的偏移量，默认值为 2
subdomain {Object|Array} 子域名映射列表，默认为 {}
denyModules {Array} 多模块项目下，禁止访问的模块列表，默认为 []
```
## middleware 配置
Middleware 称之为中间件，是 Koa 中一个非常重要的概念，利用中间件，可以很方便的处理用户的请求。由于 ThinkJS 3.0 是基于 Koa@2 版本之上构建的，所以完全兼容 Koa 里的中间件。
```
其中引入了koacors 处理跨域问题
```
## extend 配置
虽然框架内置了很多功能，但在实际项目开发中，提供的功能还是远远不够的。3.0 里引入了扩展机制，方便对框架进行扩展。支持的扩展类型为：think、application、context、request、response、controller、logic 和 service。

## api 多模块配置
1. config 全局访问的配置信息
2. Controller / 控制器 MVC 模型中，控制器是用户请求的逻辑处理部分。比如：将用户相关的操作都放在 user.js 里，每一个操作就是里面一个 Action。
3. logic 当在 Action 里处理用户的请求时，经常要先获取用户提交过来的数据，然后对其校验，如果校验没问题后才能进行后续的操作；当参数校验完成后，有时候还要进行权限判断等，这些都判断无误后才能进行真正的逻辑处理。如果将这些代码都放在一个 Action 里，势必让 Action 的代码非常复杂且冗长。

为了解决这个问题， ThinkJS 在控制器前面增加了一层 Logic，Logic 里的 Action 和控制器里的 Action 一一对应，系统在调用控制器里的 Action 之前会自动调用 Logic 里的 Action。
4. model 模型
5. Service / 服务 项目中，有时候除了查询数据库等操作外，也需要调用远程的一些接口，如：调用 GitHub 的接口、调用发送短信的接口等等。

这种功能放在 Model 下是不太合适的，为此，框架提供了 Service 来解决此类问题

## Service 文件下的配置
token.js token生成文件
```
使用了jsonwebtoken包生成随机tonken
```