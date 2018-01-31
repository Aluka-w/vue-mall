// 导包
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import ElementUI from 'element-ui'
import moment from 'moment'
import VueLazyLoad from 'vue-lazyload'
import Vuex from 'vuex'

//基于vue的组件,需要用到vue.use(xxx)
Vue.use(VueRouter)//相当于在Vue.prototype.$route  Vue.prototype.$router 在原型上挂载了
Vue.use(ElementUI)
Vue.use(VueLazyLoad,{
  loading:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2756625274,1025018221&fm=27&gp=0.jpg'
})
Vue.use(Vuex)



//不基于vue,如果想绑定在vue上面
Vue.prototype.$axios = axios
axios.defaults.baseURL = "http://39.108.135.214:8899/"
//在跨域的时候，允许访问服务器带上cookies
axios.defaults.withCredentials = true


// 导入单页面组件(相当于定义组件)
// import layout from './components/layout.vue'
import layout from "./components/layout"
import goodslist from "./components/goods/goodslist.vue"
import goodsInfo from './components/goods/goodsinfo.vue'
import shopcart from './components/shopcart/shopcart.vue'
import login from './components/account/login.vue'
import order from './components/order/order.vue'


// 定义全局过滤器
Vue.filter('dataFmt',(input,formatString='YYYY-MM-DD')=> {
   return moment(input).format(formatString)
})




// 引入全局的css样式
import './statics/site/css/style.css'
import 'element-ui/lib/theme-chalk/index.css'

// 创建路由对象,设置路由规则
const router = new VueRouter({
  routes: [
    { path:'/' , redirect:'/site/goodslist'},
    { path:'/site', component: layout,children: [
        {  path: 'goodslist',component: goodslist,name:'goodslist' },
        {  path: 'goodsInfo/:goodsid',component: goodsInfo },
        {  path:'shopcart',component: shopcart},
        {  path:'login',component: login, name:'login'},
        // 需要登录的
        {  path:'order/:ids',component: order,meta:{needLogin:true}},
      ]
    }
  ]
})



// 路由元信息配合导航守卫
router.beforeEach((to, from, next) => {
  // 除了登录,每次都记录一下即将要去的路由
  if(to.path!='/site/login'){
    localStorage.setItem('lastPath',to.path)
  }

  // 判断是否需要判断登录
  if (to.meta.needLogin) {
    const url = 'site/account/islogin'
    
    // main.js中因为直接引入了axios,所以可以直接使用,不需要this.$axios
    axios.get(url).then(response=>{
      // 未登录
      if(response.data.code == 'nologin'){
        router.push({name:'login'})
      }else{
        next()
      }
    })

  } else {
    // 路由元信息不需要验证登录的页面
    next() 
  }
})


// 全局数据管理相关,vuex
// 导入存储相关的组件,按需导入
import {getTotalCount, addLocalGoods, updateLocalGoods, deleteLocalGoods} from './common/localStorageTool.js'


// 创建vuex对象
const store = new Vuex.Store({
    state:{
      buycount : 0 //加入购物车中商品的总数量,用在layout.vue的头部的购物车那个徽标上面
    },
    getters:{//从仓库中获取数据,内存有就从内存去,没有就从本地取
      getBuyCount(state){
        if(state.buycount > 0){
          return state.buycount
        }else{
          return getTotalCount()
        }
      }
    },
    mutations:{//往仓库中增删改数据
      // 增
      addGoods(state,goodsObj){
        state.buycount = addLocalGoods(goodsObj)
      },
      // 修改
      updateGoods(state,changedGoods){
        state.buycount = updateLocalGoods(changedGoods)
      },
      // 删除
      deleteGoods(state,goodsId){
        state.buycount = deleteLocalGoods(goodsId)
      }
    }

  })


// 注入路由,注入vuex
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
