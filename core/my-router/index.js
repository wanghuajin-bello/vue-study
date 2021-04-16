import View from './myrouter-view'
import Link from './myrouter-link'

// 1、实现插件，挂载$router
let Vue
// MyVueRouter类接收传入的值，实现api,并实例化

class MyVueRouter {
constructor(option){
    this.$options = option
    console.log('option',option)

    // 需要创建响应式的current属性
    // 利用Vue提供的defineReactive做响应化
    // 这样将来current变化的时候，依赖的组件会重新render
    Vue.util.defineReactive(this, 'current', '/')



    this.current = window.location.hash.slice(1)
    // 匹配当前url,渲染对应的component
    // 当前路由url怎么拿到呢？
    // 使用window对象监听 hashchange 事件，及时更新url
    window.addEventListener('hashchange', this.onHashChange.bind(this))
    window.addEventListener('load', this.onHashChange.bind(this))
    // 拿到路由表 -- this.$options.routes
    this.routeMap = {}
    option.routes.forEach(route => {
      this.routeMap[route.path] = route
    })

    // url和对应的组件能拿到了，怎么渲染component呢？
    // 通过router-view 拿到vdom 并渲染组件
  }
  onHashChange() {
    console.log('hash-url-change', window.location.hash)
    this.current = window.location.hash.slice(1)
  }
}

MyVueRouter.install = function(_Vue) {
  Vue = _Vue
  // 挂载$router示例
  // Vue.prototype.$router = this.$options.router
  // 要在没个component中都能访问到，在应该在beforeCeated时注入
  Vue.mixin({
    beforeCreate() {
      // Vue.prototype.$router = this.$options.router
      // 确保根实例的时候才执行
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
      }
    }
  })

  // 2、实现router-view + router-link全局组件
  Vue.component('router-view', View)
  Vue.component('router-link', Link)
}


export default MyVueRouter