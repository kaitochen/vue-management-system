# vue-management-system

> 基于vue的后台管理系统demo
> vue+vue-router+vuex+element-ui+axios+qiniu
> 基于vue的基础框架，使用vue-router作为路由，使用vuex做状态管理，UI框架使用element-ui，异步请求使用axios，同时集成七牛云2.x版本的基础上传功能

该版本增加多窗口显示，在原先路由跳转的基础上增加，实现传统后台内置多窗口显示的效果，细节还有待优化。
对于element-ui的具体样式，可以根据需求去改变
该版本增加七牛云2.x版本的jssdk,集成了基础上传功能，其余功能可根据七牛云文档进行实现

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
