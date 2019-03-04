import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import commonJS from "./plugins/common.js"//公用JS
import 'font-awesome/css/font-awesome.css'
import './assets/style/common.less'//公用css
import axios from 'axios';
import qs from "qs"

Vue.prototype.common = commonJS;
Vue.config.productionTip = false
Vue.prototype.axios = axios;
Vue.use(Element);


/**
 * http request 拦截器
 */
Vue.prototype.axios.interceptors.request.use(
  config => {
    // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
    config.data = JSON.stringify(config.data);
    config.headers = {
      'Content-Type':'application/x-www-form-urlencoded'
    }
    // if(token){
    //   config.params = {'token':token}
    // }
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);

/**
 * http response 拦截器
 */
Vue.prototype.axios.interceptors.response.use(
  response => {
    if(response.data.errCode ==2){
      router.push({
        path:"/login",
        querry:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
      })
    }
    return response;
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * 验证用户是否登陆
 */
router.beforeEach((to,from,next) => {
  if(to.matched.some( m => m.meta.auth)) {
    // console.log("先判断是否登录");
    if(to.name=='Login'){
      next();
    }else{
      if(localStorage.getItem('token')){

        //访问服务器缓存数据，判断当前token是否失效
        Vue.http.get("http:xxxx/Login/UserIsLogin?token="+localStorage.getItem('token')+"&url="+to.name,{withCredentials: true}).then(response => response.json()).then(num => {
          // console.log('是否登录',num);
          if(num.code==1001){
            next();
          }else{
            alert('您的token已超时，请重新登录');
            next('/Login');
          }
        })
      }else{
        next('/Login');
      }

    }
  } else {
    console.log("请先登录");
    next()
  }
})


new Vue({
  router,
  store,
  render: function (createElement) {
    let routeMeta = this.$route.meta
    let props = {}
    // 控制是否显示 带导航的布局 || 空白布局
    if (routeMeta && routeMeta.showNav) {
      props.layout = 'nav-layout'
    } else {
      props.layout = 'blank-layout'
    }
    return createElement(App, {props})
  }
}).$mount('#app')
