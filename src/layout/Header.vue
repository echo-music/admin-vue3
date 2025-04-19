<template>
    <div class="min-w-screen flex justify-between items-center bg-gray-50 pl-5 pr-5">
        <div class="flex justify-start items-center">
            <el-button class="toggle-button border-0 p-0  bg-gray-50" @click="switchCollapse">
                <el-icon  size="20">
                    <Expand v-if="isCollapse" />
                    <Fold v-else />
                </el-icon>
            </el-button>
            <el-breadcrumb separator="/" class="ml-5">
                <el-breadcrumb-item index="/dashboard" key="/dashboard" :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item v-for="(item, index) in breadcrumbData" :key="item.path" >
                   <span :to="{ path: item.path,name:item.name }">{{item?.meta?.title}}</span>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-dropdown :hide-on-click="true">
            <span class="el-dropdown-link">
                <el-avatar
                :src="userAuth.userInfo.avatar"
                />
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item @click="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup>
    import {ref,watch} from 'vue';
    import { storeToRefs } from 'pinia';
    import {useRoute} from 'vue-router';
    import { useCollapseStore } from '@/store/collapse';
    import {useAuthStore} from '@/store/userAuth'
    const store = useCollapseStore();
    const userAuth = useAuthStore();
    const {isCollapse} = storeToRefs(store)
    const switchCollapse = function () {
     store.toggle()
    }
   
    const route = useRoute();
    // 生成数组数据
    const breadcrumbData = ref([]);
    const getBreadcrumbData = () => {
        breadcrumbData.value = route.matched.filter((item) => {
                return item.meta && item.meta.title && item.path !=="/" && item.path !=="/dashboard" ;
        });
    };
    watch(route,()=>{
        getBreadcrumbData();
    },{
        immediate: true,
    })
    const logout=function() {
        userAuth.logout();
    }

</script>
