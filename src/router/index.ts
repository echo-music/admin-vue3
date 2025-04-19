import { createRouter, createWebHashHistory ,type RouteRecordRaw} from 'vue-router';
import {useAuthStore} from '@/store/userAuth'


export const dynamicRoutes:RouteRecordRaw[] = [
  {
    path:"/dashboard",
    name:"dashboard",
    meta:{
      title:"首页",
      icon:"House"
    },
    component:()=>import('@/views/Dashboard.vue'),
    children:[],
  },
  {
    path:"/users",
    name:"user",
    meta:{
      title:"用户管理",
      icon:"User",
    },
    component:()=>import('@/views/User.vue'),
    children:[],
  },
  {
    path:"/equips",
    name:"equip",
    meta:{
      title:"装备管理",
      icon:"Setting",

    },
    children:[],
    component: ()=>import('@/views/Equip.vue'),
  },
  {
    path:"/goods/list",
    name:"goodsList",
    meta:{
      title:"商品管理",
      icon:"Setting",

    },
    children:[],
    component: ()=>import('@/views/Goods.vue'),
  },
  {
    path:"/ads",
    name:"ad",
    meta:{
      title:"广告配置",
      icon:"Setting",

    },
    children:[
      {
        path:"/ads/list",
        name:"ad_list",
        meta:{
          title:"页面1",
          icon:"Setting",
    
        },
        children:[],
        component: ()=>import('@/views/other/Page1.vue'),
      },
    ],
    // component: ()=>import('@/views/Ad.vue'),
  },
  
];


const routes:RouteRecordRaw[] = [
  {
    path:"/login",
    component: ()=>import('@/views/Login.vue'),
  },
  {
    name:"home",
    path:"/",
    redirect:"/dashboard",
    meta:{
      title:"主页"
    }, 
    component: ()=>import('@/views/Home.vue'),

    children:[...dynamicRoutes],
  }
]
export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
router.beforeEach((to, from,next) => {
  const useAuth = useAuthStore()
  if(to.path == "/login") return next();
  if (useAuth.isLogin()== false) {
    return next("/login");
  }
  next()
})

export default router;
