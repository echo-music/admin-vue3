<template>
    <div>
      <!---统计-->
        <div  class="grid grid-rows-1 gap-3 sm:grid-cols-2 md:grid-cols-4 mb-3">
            <div v-for="item in list" :key="item.id"  class="bg-white rounded-xl shadow-md w-auto">
                <div class="md:flex justify-center items-center m-0">
                  <div class="p-3">
                    <el-icon size="50px">
                        <component :is="item.icon"></component>
                    </el-icon>
                  </div>
                  <div class="p-3">
                    <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{{ item.title }}</div>
                    <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{{ item.num }}</a>
                  </div>
                </div>
              </div>
        </div>
      <!-- 图表 -->
        <div class="grid grid-rows-1 gap-3 sm:grid-cols-2 md:grid-cols-2 mb-3">
          <div class="bg-white rounded-xl shadow-md w-auto">
            <div ref="chartLine" class="h-[350px] bg-white mb-3">
            </div>
          </div>
          <div class="bg-white rounded-xl shadow-md w-auto">
            <div ref="chartLine2" class="h-[350px] bg-white mb-3">
            </div>
          </div>
        </div>

        <div class="grid grid-rows-1 gap-3 sm:grid-cols-2 md:grid-cols-2 mb-3">
          <div class="bg-white rounded-xl shadow-md w-auto">
            <div ref="chartPie" class="h-screen bg-white mb-3">
            </div>
          </div>
          <div class="bg-white rounded-xl shadow-md w-auto">
            <div ref="chartPie2" class="h-screen bg-white mb-3">
            </div>
          </div>
        </div>
        
        <div class="grid grid-rows-1  gap-3 sm:grid-cols-2 md:grid-cols-4">
            <div class="col-span-2 bg-white rounded-xl shadow-md">
              <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="date" label="Date" width="180" />
                <el-table-column prop="name" label="Name" width="180" />
                <el-table-column prop="address" label="Address" />
              </el-table>
            </div>
            <div class=" bg-white rounded-xl shadow-md">
              <div class="p-1">
                <el-progress :percentage="50" :indeterminate="true" />
                <el-progress :percentage="100" :format="format" :indeterminate="true" />
                <el-progress
                  :percentage="100"
                  status="success"
                  :indeterminate="true"
                  :duration="5"
                />
                <el-progress
                  :percentage="100"
                  status="warning"
                  :indeterminate="true"
                  :duration="1"
                />
                <el-progress :percentage="50" status="exception" :indeterminate="true" />
                <el-progress :text-inside="true" :stroke-width="26" :percentage="70" />
              </div>
            </div>
            <div class=" bg-white rounded-xl shadow-md">
              <el-card style="max-width: 480px">
                <template #header>Yummy hamburger</template>
                <img
                  src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                  style="width: 100%"
                />
              </el-card>
            </div>

        </div>  
        
    </div>
  </template>
  
  <script lang="ts" setup>
  import echarts from '@/utils/chart/echart';
  import {onMounted,ref} from 'vue'
  const format = (percentage:number) => (percentage === 100 ? 'Full' : `${percentage}%`)


  const chartLine = ref()
  const chartLine2 = ref()
  const optionLine = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
  };

  const optionLine2  = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true
      }
    ]
  };

  const chartPie = ref();
  const chartPie2 = ref();
  const optionPie = {
  legend: {
    top: 'bottom'
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  series: [
    {
      name: 'Nightingale Chart',
      type: 'pie',
      radius: [50, 250],
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 8
      },
      data: [
        { value: 40, name: 'rose 1' },
        { value: 38, name: 'rose 2' },
        { value: 32, name: 'rose 3' },
        { value: 30, name: 'rose 4' },
        { value: 28, name: 'rose 5' },
        { value: 26, name: 'rose 6' },
        { value: 22, name: 'rose 7' },
        { value: 18, name: 'rose 8' }
      ]
    }
  ]
  };

  const optionPie2 = {
  title: {
    text: 'Referer of a Website',
    subtext: 'Fake Data',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
  };

onMounted(() => {
  // 这里是由于图表渲染快于父元素导致图表比例溢出，做的一个延缓操作
    line();
});
const line = ()=>{
  const chartObj = echarts.init(chartLine.value)
  chartObj.setOption(optionLine);

  const chartObj2 = echarts.init(chartLine2.value)
  chartObj2.setOption(optionLine2);

  const chartObj3 = echarts.init(chartPie.value)
  chartObj3.setOption(optionPie)

  const chartObj4 = echarts.init(chartPie2.value)
  chartObj4.setOption(optionPie2)


  window.onresize = function () {
  //自适应大小, 不用的话不会自适应大小。
  chartObj.resize();
  chartObj2.resize();
  chartObj3.resize();
  chartObj4.resize();
  }

}
  
  
  const tableData = [
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-04',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-01',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
  ]

  const list = [
    {id:1, title: '新注册用户',num:10000,icon:"User"},
    {id:2, title: '购物总数',num:87843,icon:"ShoppingCartFull"},
    {id:3, title: '消息总数',num:719304,icon:"Message"},
    {id:4, title: '进账流水',num:87456,icon:"Money"},  
  
  ]
  </script>
  

<style scoped>
.el-card__body{padding:0 !important;}
</style>