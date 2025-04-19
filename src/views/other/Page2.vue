<template>
    <div>
        <ul>
            <li v-for="r in list" :key="r.id"><RouterLink replace :to="{
              name:'detail',
              params:{
                id:r.id
              }
            }" active-class="active" >{{ r.title }}</RouterLink></li>
            <div class="content">
                <RouterView ></RouterView>
             </div>
           </ul>
    </div>
  
</template>

<script setup>
const list = [
    {id:1,title: '新闻1','content':"1"},
    {id:2,title: '新闻2','content':"2"},
    {id:3,title: '新闻3','content':"3"},
    {id:4,title: '新闻4','content':"4"},
    {id:5,title: '新闻5','content':"5"},
    {id:6,title: '新闻6','content':"6"},
    {id:7,title: '新闻7','content':"7"},
    {id:8,title: '新闻8','content':"8"},
    {id:9,title: '新闻9','content':"9"},
  ]
</script>

<style lang="scss" scoped>

</style>