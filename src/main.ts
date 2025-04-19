

import { createApp } from 'vue' 
import router from '@/router' 
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//@ts-expect-error
import zhCn from "element-plus/dist/locale/zh-cn.mjs" ;
import "element-plus/dist/index.css" 
import '@/assets/main.css' 
import App from '@/App.vue'
import 'default-passive-events'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


const pinia = createPinia()
pinia.use(piniaPluginPersistedstate);

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(ElementPlus, { locale: zhCn });

app.use(router)
app.use(pinia)
app.mount('#app')
console.log(import.meta.env)
