import type {LoginForm} from '@/types/login'
import http from '@/utils/http/http';

// 登陆
const login = async (data: LoginForm) =>{
    // 模拟登陆，实际应该请求后端接口
    return new Promise((resolve, reject) => {
        resolve({
            code:0,
            msg:"登陆成功",
            data:{
                avatar:"",
                credential:{
                    token:"xxxxxxxxxxxxxxxxxxxxxxx"
                },
               
            },
        })
    })
//     const url = "/v1/admin/login"
//    return http.post(url,data)
}

// 验证码
const getCaptcha = async () =>{
    const url = "/v1/unify/captcha"
   return http.post(url,{})
}

// 用户列表
const getUserList = async (params:any) => {
    const url = "/v1/admin/users"
   return http.get(url,params)
}

const getUserDetail = async (params:any) => {
    const url = "/v1/admin/users/"+params.id!;
   return http.get(url,{})
}


// 手动发装备
const equipHandSend = async (data:any) => {
    const url = "/v1/admin/user/equip/handsend"
   return http.post(url,data)
}

const userAccountIncrOrDescr = async (data:any) => {
    const url = "/v1/admin/user/account/incrordecr"
   return http.put(url,data)
}

const handleUserBatchCreate = async (data:any) => {
    const url = "/v1/admin/user/batch/create"
   return http.post(url,data)
}

const handleUserEquipDel = async (data:any) => {
    const url = "/v1/admin/user/equip/del"
   return http.post(url,data)
}

export default {
    login,
    getCaptcha,
    getUserList,
    equipHandSend,
    getUserDetail,
    userAccountIncrOrDescr,
    handleUserBatchCreate,
    handleUserEquipDel
}