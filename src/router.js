import Vue from 'vue'
import Router from 'vue-router'

const LoginIndex = () => import('./views/Login.vue')
const homePage = () => import('./views/home.vue')

/*人员管理*/
const PersonManageIndex = () => import('./views/perManage/index.vue')
const paymentManage = () => import('./views/perManage/paymentManage.vue')
const registerMange = () => import('./views/perManage/registerMange.vue')
const singleMange = () => import('./views/perManage/singleMange/singleMange.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect:'/homePage',
    },
    {
      path: '/homePage',
      name:'homePage',
      component: homePage,
      meta: {
        showNav: true,
        name:'系统首页'
      }
    },
    {
      path: '/login',
      name: 'LoginIndex',
      component: LoginIndex,
      meta: {
        showNav: false,
        name:'登录界面'
      }
    },
    {
      path: '/PersonManage',
      name: 'PersonManageIndex',
      component: PersonManageIndex,
      meta: {
        showNav: true,
        name:'人员管理'
      },
      children: [
        {path: "paymentManage", name: "paymentManage", component: paymentManage, meta: { showNav: true,name:'缴费管理' }},
        {path: "registerMange", name: "registerMange",  component: registerMange, meta: { showNav: true,name:'登记管理' }},
        { path: "single",
          name: "single",
          component: PersonManageIndex,
          meta: { showNav: true,name:'单个登记' },
          children:[
            {path: "singleMange", name: "singleMange", component: singleMange, meta: { showNav: true,name:'单个登记内页' }},
          ]
        },
      ],
    },
  ]
})
