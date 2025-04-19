/// <reference types="vite/client" />

declare module '*.vue' {
    import { ComponentOptions } from 'vue'
    const componentOptions: ComponentOptions
    export default componentOptions
}
interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string
    readonly VITE_APP_BASE_API: string
    // 更多环境变量...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }