import React from 'react'

import axios from 'axios'

// 响应拦截器
axios.interceptors.response.use(function(config){
    return config.data
})

// 设置baseurl
if(process.env.NODE_ENV === 'development'){
    var basURL = 'https://siberiabear.top';
}else if(process.env.NODE_ENV === 'production'){
    var basURL = 'https://siberiabear.top';
}

axios.defaults.baseURL = basURL

React.Component.prototype.$http = axios;

export const $http = React.Component.prototype.$http;

export default axios