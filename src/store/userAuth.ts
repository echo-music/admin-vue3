import {defineStore} from 'pinia'
import {ref} from 'vue'
import type {LoginForm} from '@/types/login'
import userApi from '@/api/userApi'
import { ElMessage } from 'element-plus'
import {router} from '@/router'
import type {UserInfo} from '@/types/user'

export const useAuthStore = defineStore('user',()=>{
     let userInfo =  ref<UserInfo>({
        userid:0,
        username:"",
        avatar:"",
        token:"",
     })
     let isErr= ref(false)
     const changeIsErr= ()=>{
       isErr.value = false
     }

     const login = async(data:LoginForm)=>{
      userApi.login(data).then((res:any)=>{
         const respone = res;
         if (respone.code !=0){
          isErr.value = true
           ElMessage.error(respone.msg);
         }else{
            userInfo.value.avatar = respone.data?.avatar
            userInfo.value.token = respone.data?.credential?.token
            if(!userInfo.value.token){
              isErr.value = true
              ElMessage.error("登陆异常");
              return false
            }
           // 登陆成功跳转
           router.push('/') 
         }
       }).catch(err => {
         console.log(err)
         ElMessage.error(err)
       });
     }

     const isLogin = ():boolean=>{
        return userInfo?.value?.token?.length >0
     }

     const logout = ()=>{
      userInfo.value.token = ""
      userInfo.value.avatar = ""
      window.localStorage.removeItem('user')
      router.push('/login') 
     }

     const setMenu = ()=>{

     }

     const getMenu = ()=>{

     }
     return {
        userInfo,
        login,
        isLogin,
        logout,
        setMenu,
        getMenu,
        isErr,
        changeIsErr
    }
},{persist: true,})