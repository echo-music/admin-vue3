<template>
    <div>
        <span>新闻详情{{ props.id }} 的文章</span>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
const props = defineProps(['id']);
console.log(props.id);
let route = useRoute();
</script>