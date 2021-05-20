import Vue from 'vue'
import VueRouter from 'vue-router'

// const  Home = ()=>import('views/home/Home')
// const  Category = ()=>import('views/category/Category')
// const  Cart = ()=>import('views/cart/Cart')
// const  Profile = ()=>import('views/profile/Profile')
// const  Detail = ()=>import('views/detail/Detail')
// const  Search = ()=>import('views/search/Search')
// const  Register = ()=>import('views/login/register')
// const  Login= ()=>import('views/login/index')
// const  LoginMobile = ()=>import('views/login/loginMobile')
// const  page404 = ()=>import('views/404')
// const  Advice = ()=>import('views/profile/childComps/Advice')

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/home'
  },
  {
    path:'/home',
    component:()=>import('views/home/Home')
  },
  {
    path:'/category',
    component:()=>import('views/category/Category')
  },
  {
    path:'/cart',
    component:()=>import('views/cart/Cart')
  },
  {
    path:'/profile',
    component:()=>import('views/profile/Profile')
  },
  {
    path:'/detail/:good_id',
    component:()=>import('views/detail/Detail')
  },
  {
    name:'search',
    path:'/search/:cate_id',
    component:()=>import('views/search/Search'),
  },
  //登陆注册
  {
    name:'register',
    path:'/register',
    component:()=>import('views/login/register')
  },
  {
    name:'login',
    path:'/login',
    component:()=>import('views/login/index')
  },

  {
    name:'loginMobile',
    path:'/loginMobile',
    component:()=>import('views/login/loginMobile')
  },
  //意见反馈
  {
    name:'advice',
    path: '/profile/advice',
    component:()=>import('views/profile/advice/Advice')
  },
  //收货地址
  {
    name: 'address',
    path: '/profile/address',
    component:()=>import('views/profile/address/Address'),
  },
  {
    name: 'addressEdit',
    path: '/profile/address/edit/:address_id',
    component: ()=>import('views/profile/address/childComps/Edit')
  },
  //错误页面重定向
  {
    path: '*',
    redirect: '/home'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to.path)
  if (to.path!='/login' && to.path !='/loginMobile'&& to.path!='/register') {  // 判断该路由是否需要登录权限
    if (localStorage.getItem('token')) {  // 通过vuex state获取当前的token是否存在            next();
      next()
    }
    else {
        next({
            path: '/login',  // 去登录页面
            query: {redirect: to.path}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
    }
  }else {
    next()
  }
})

export default router
