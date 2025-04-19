import {defineStore} from 'pinia'
import {ref} from 'vue'
export const useCollapseStore = defineStore('collapse',()=>{

     const isCollapse =  ref(false)

     const toggle = ()=>{
        isCollapse.value = !isCollapse.value
     }

     return {
        isCollapse,
        toggle
    }
})