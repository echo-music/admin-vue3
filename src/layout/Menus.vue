<template>
    <el-sub-menu  :index="menu.path" v-if="menu.children && menu.children.length > 0">
      <template #title>
        <el-icon>
          <component :is="menu.meta.icon" ></component>
        </el-icon>
        <span>{{ menu.meta.title }}</span>
      </template>
      <Menus :menu="menuItem" v-for="menuItem in menu.children" :key="menuItem.path" />
    </el-sub-menu>

    <el-menu-item :index="menu.path" :key="menu.path" v-else>
        <el-icon>
          <component :is="menu.meta.icon" ></component>
        </el-icon>
        <span>{{ menu.meta.title }}</span>
    </el-menu-item>

    
</template>

<script lang="ts" setup>
const {menu} =  defineProps(['menu'])

</script>