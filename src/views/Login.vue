<template>
    <el-row class="login" style="min-width: 255px;">
      <el-col :lg="14" class="left bg-indigo-500">
        <div>
            <div class="text-5xl text-zinc-50 font-bold mb-5">欢迎使用宠物社区运营后台</div>
            <div class="text-white"></div> 
        </div>
     </el-col>
     <el-col :lg="10" class="right bg-zinc-50">
            <h2 class=" font-bold text-3xl text-gray-800">欢迎回来</h2>
            <div class="flex justify-center items-center text-gray-300 my-5 space-x-2">
                <span class="h-px w-10 bg-gray-200"></span>
                <span>账号密码登陆</span>
                <span class="h-px w-10 bg-gray-200"></span>
            </div>
            <el-form :rules="rules" :model="loginForm" ref="loginFromRef" label-width="auto" class="w-auto" style="max-width:350px">
                <el-form-item label="账号" prop="phone">
                  <el-input v-model="loginForm.phone" type="text" placeholder="请输入账号">
                    <template #prefix>
                        <el-icon><Iphone /></el-icon>
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item label="密码"  prop="password">
                    <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" >
                        <template #prefix>
                            <el-icon><Lock /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="captcha">
                  <div class="flex justify-start">
                    <div class="w-auto">
                      <el-input v-model="loginForm.captcha" type="text" placeholder="请输入验证码">
                       
                      </el-input>
                    </div>
                    <el-image :src="captchaImg" class="w-[180px] ml-3 h-[30px]" @click="captchaReload"/>
                  </div>
                </el-form-item>
                <el-form-item>
                <el-button type="primary" :round="true"  class="w-[255px] bg-indigo-500 hover:bg-indigo-300" @click="submitForm()">登陆</el-button>
                </el-form-item>
            </el-form>    
      </el-col>
    </el-row>
  </template>
  
<script lang="ts" setup>
import { reactive ,ref,onMounted } from 'vue'
import type {FormInstance, FormRules } from 'element-plus'
import {useAuthStore} from '@/store/userAuth'
import type {LoginForm} from '@/types/login'
import userApi from '@/api/userApi'
import { ElMessage } from 'element-plus'

const useAuth = useAuthStore()
let captchaImg = ref("");
// 定义表单响应式对象
const loginForm = reactive<LoginForm>({
  phone:"",
  password:"",
  captcha:"",
  captcha_id:"",
})
const loginFromRef = ref<FormInstance>()

// 定义表单字段验证规则
const rules = reactive<FormRules<LoginForm>>({
  phone:[
    { required: true, message: '请输入手机号码', trigger: 'blur' },
  ],
  password:[
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
  captcha:[
    { required: true, message: '请输入验证码', trigger: 'blur' },
  ],
  captcha_id:[
    { required: true, message: '验证码ID必填', trigger: 'blur' },
  ],
})



const getCaptcha = function(){
  userApi.getCaptcha().then((res:any) => {
    const respone = res.data!;
         if (respone.code !=0){
           ElMessage.error(respone.msg);
         }else{
          captchaImg.value = respone.data.content;
          loginForm.captcha_id = respone.data.id
         }
  }).catch(err => {
    ElMessage.error(err);
  });
}

// 提交表单数据
const submitForm = async () => {
  if (!loginFromRef) return
  await loginFromRef.value!!.validate(async (valid:any, fields:any) => {
    if (valid) {
     await useAuth.login(loginForm)
    } 
    if (useAuth.isErr) {
      getCaptcha();
      useAuth.changeIsErr();
    }
    
    
  })
}


onMounted(()=>{
  getCaptcha();
});
const captchaReload = ()=>{
  getCaptcha();
}

</script>

<style scoped>
.login .left, .login .right{
 @apply min-h-screen flex justify-center items-center flex-col
}
</style>