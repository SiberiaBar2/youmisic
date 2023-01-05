
// 导入跨域中间件
const proxy = require('http-proxy-middleware')
// 跨域请求配置 
// 这个东西似乎不需要引入！！！
// 第一次没起来是因为没装 npm i http-proxy-middleware -D

/**
 * 
 * http://localhost:4000加上接口地址就能访问呢接口数据了
 * 不知道为什么不需要加api
 */

module.exports = function(app){
    app.use(proxy.createProxyMiddleware('/api' ,{
        target:'http://localhost:4000',
        pathRewrite:{
            '^/api':''
        }
    }))
}