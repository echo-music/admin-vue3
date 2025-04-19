<template>
      <el-container >
        <el-aside :width="isCollapse?'63px':'200px'" class="fixed z-auto" >
            <Aside :isCollapse="isCollapse" />
        </el-aside>    
        <el-container >
          <el-header class="pl-0 pr-0 ml-[200px]"  :style="isCollapse?'margin-left:63px':'margin-left:200px'">
            <Header :isCollapse="isCollapse"  />
          </el-header>
          <el-main class="ml-[200px]"  :style="isCollapse?'margin-left:63px':'margin-left:200px'">
            <router-view ></router-view>
          </el-main>
        </el-container>
      </el-container>
  </template>

<script setup>
    import { storeToRefs } from 'pinia';
    import Aside from '@/layout/Aside.vue'
    import Header from '@/layout/Header.vue'
    import { useCollapseStore } from '@/store/collapse';
    const store = useCollapseStore()
    const {isCollapse} = storeToRefs(store)

</script>

<style scoped>

</style>