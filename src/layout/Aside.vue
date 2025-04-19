
<template>
    <el-menu
        text-color="#ffffff"
        active-text-color="#1e90ff"
        :unique-opened=true
        background-color="#182C61"
        :collapse="isCollapse"
        :collapse-transition="false"
        class="h-screen"
        router
        :default-active="$route.path"
    >
    <Menus   :menu="menu" v-for="menu in menus" :key="menu.name"/>
    </el-menu>
</template>
<script setup>
import Menus from '@/layout/Menus.vue';
import { storeToRefs } from 'pinia';
import { useCollapseStore } from '@/store/collapse';
import {dynamicRoutes} from '@/router';
const store = useCollapseStore()
const {isCollapse} = storeToRefs(store)

// 假如这是后端获取过来的权限
const menus = dynamicRoutes;
</script>