<template>
    <div class="bg-gray-100 ">
        <el-row>
            <el-col :lg=10 class="m-3">
                <el-input  style="width: 240px" placeholder="用户名/ID/手机号" />
                <el-button type="primary" class="ml-3" >搜索</el-button>
                <el-button type="primary" >刷新</el-button>
            </el-col>
        </el-row>
    </div>
    <div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column fixed prop="date" label="日期" width="150" />
            <el-table-column prop="name" label="姓名" width="120" />
            <el-table-column prop="state" label="状态" width="120" />
            <el-table-column prop="city" label="城市" width="120" />
            <el-table-column prop="address" label="地址" width="600" />
            <el-table-column prop="zip" label="压缩" width="120" />
          </el-table>
    </div> 
   
</template>

<script lang="ts" setup>
const handleClick = () => {
  console.log('click')
}

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
]

import { reactive, ref } from 'vue'
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})


</script>