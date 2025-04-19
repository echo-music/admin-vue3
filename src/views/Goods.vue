<template>
    <div class="bg-gray-100 flex justify-start">
      <el-row>
        <el-col :lg=24 class="m-3">
            <el-input  class="w-[240px] mr-3" v-model="search.goods_id" placeholder="商品ID" />
            <el-input  class="w-[240px]" v-model="search.name" placeholder="装备名称" />
            <el-button type="primary" class="ml-3" @click="handleSearch">搜索</el-button>
            <el-button type="primary"  @click="handleRefresh">刷新</el-button>
        </el-col>
    </el-row>
    </div>
    <div>
        <el-table :data="tableGoods.list" style="width: 100%">
            <el-table-column fixed prop="goods_id" label="商品ID"  />
            <el-table-column prop="name" label="商品名" />
            <el-table-column fixed prop="sku_id" label="商品sku"  />
            <el-table-column prop="price" label="价格" />
            <el-table-column prop="equip_cfg_ids" label="装备ID" />
            <el-table-column prop="create_at" label="创建时间"/>
            <el-table-column fixed="right" label="操作">
              <template v-slot="scope">
                <el-button  size="small" type="primary"   @click="handleGoodsEquipBindView(scope.row)">
                  编辑
                </el-button>
               
              </template>
            </el-table-column>
          </el-table>
          <div class="flex  justify-start items-center mt-3">
            <el-pagination 
            background layout="total,prev, pager, next" :total="tableGoods.total"
            v-model:current-page="tableGoods.page"
            @current-change="changeCurPage"
            :pageSize="tableGoods.pageSize"

            />
          </div>

          <!--绑定装备-S-->
          <el-dialog v-model="dialogFormVisible" title="绑定装备" width="700">
            <div class=" bg-gray-50 m-3">
              <p>商品ID: <span class="text-pink-500 font-bold ml-3 mr-3">{{ goodsRow.id }}</span>商品名称:<span class="font-bold text-pink-500 ml-3">{{ goodsRow.name }}</span></p>
              </div>
            <div class="w-auto">
              <!-- <el-select
                  v-model="selectOptions"
                  multiple
                  placeholder="请选择要绑定的装备"
                >
                  <el-option
                    v-for="item in equipOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select> -->
                <el-row>
                  <el-col :lg=16 class="m-3">
                      <el-input  style="width: 240px" v-model="equip_keyword" placeholder="装备ID/装备名称" />
                      <el-button type="primary" class="ml-3" @click="handleEquipSearch">搜索</el-button>
                  </el-col>
                </el-row>
                <el-table 
                  :data="tableEquips.list"
                style="width: 100%">
                  <el-table-column type="expand">
                    <template #default="props">
                      <h1 class="ml-3">装备属性加成:</h1>
                    <div class="flex flex-wrap justify-start ">
                      <p class="m-3" v-for="item in props.row.benefit.attrs" :key="item.attribute">
                        <span class="w-[100px] font-bold">{{item.attribute_val}}</span>
                        <span class="ml-1 ">{{item.number_val}}</span>
                      </p>
                      <p class="m-3">
                        <span class="w-[100px] font-bold">金币加速</span>
                        <span class="ml-1 ">{{props.row.benefit.gold.speed}}/天</span>
                      </p>
                    </div>
                    </template>
                  </el-table-column>

                    <el-table-column prop="id" label="装备ID"  >
                      <template #default="scope">{{ scope.row.id }}</template>
                    </el-table-column>
                    <el-table-column prop="name" label="装备名称"  />
                    <el-table-column prop="species_val" label="适应种类"/>
                    <el-table-column prop="part_val" label="适应部位" />
                    <el-table-column prop="quality" label="品质"  />
                    <el-table-column prop="expire_at" label="有效时间" />
                    <!-- <el-table-column prop="expire_unit_value" label="有效单位" /> -->
                    <!-- <el-table-column prop="create_at" label="创建时间" /> -->
                    <el-table-column fixed="right" label="操作">
                      <template v-slot="scope">
                        <el-button  type="danger" size="small" v-if="scope.row.bind == true"   @click="handleGoodsEquipUnbind(scope.row)">
                          解绑
                        </el-button>
                        <el-button  type="success" size="small" v-if="scope.row.bind == false"    @click="handleGoodsEquipBind(scope.row)">
                          绑定
                        </el-button>
                      
                       
                      </template>
                    </el-table-column>
                  </el-table>
                <!-- <div  v-if="equipInfo.id > 0">
                  <h1 class="ml-3">装备基础信息:</h1>
                  <div class="flex flex-wrap justify-start ">
                    <p class="m-3">
                      <span class="w-[100px] font-bold">装备ID:</span>
                      <span class="ml-1 ">{{equipInfo.id}}</span>
                    </p>
                    <p class="m-3">
                      <span class="w-[100px] font-bold">装备名称:</span>
                      <span class="ml-1 ">{{equipInfo.name}}</span>
                    </p>
                    <p class="m-3">
                      <span class="w-[100px] font-bold">装备部位:</span>
                      <span class="ml-1 ">{{equipInfo.part_val}}</span>
                    </p>
                    
                  </div>
      
                  <h1 class="ml-3">装备属性加成:</h1>
                  <div class="flex flex-wrap justify-start ">
                    <p class="m-3" v-for="item in equipInfo.benefit.attrs" :key="item.attribute">
                      <span class="w-[100px] font-bold">{{item.attribute_val}}</span>
                      <span class="ml-1 ">{{item.number_val}}</span>
                    </p>
                  </div>    
                </div>  -->
            </div>
            <template #footer>
              <div class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary"  @click="()=>{dialogFormVisible=false;getGoodsList();}">
                  确定
                </el-button>
              </div>
            </template>
          </el-dialog>
           <!---绑定创建装备-E-->
    </div> 
   
</template>

<script lang="ts" setup>

import { ref,onBeforeMount,nextTick} from 'vue'
import goodsApi from '@/api/goodsApi'
import { ElMessage,ElMessageBox } from 'element-plus'
import type { TableData } from '@/types/user';
import { ElTable } from 'element-plus'
const dialogFormVisible = ref(false)
let tableEquips = ref({
   list:[],
})
const goodsEquips = () =>{
  goodsApi.goodsEquips({id:goodsRow.value.id,keyword:equip_keyword.value}).then((res:any)=>{
    if(res.data?.code != 0){
      ElMessage.error(res.data!.msg)
      return false
    }
    
    if (res.data?.data?.total==0){
      ElMessage.error("未查询到装备信息")
      tableEquips.value.list = [];
      return false
    }
    tableEquips.value.list = res.data?.data
    // nextTick(()=> toggleSelection(tableEquips.value.list ))
   
  
  }).catch((err:any)=>{
    ElMessage.error(err);
  });

}

let tableGoods = ref<TableData>({
   list:[],
   page: 1,
   total:0,
   pageSize:15,
})

let search = ref({
  name:'',
  goods_id: '',
});
let goodsRow = ref({
    id:0,
    sku_id:'',
    name:''
});

let equip_keyword = ref('');
const equipInfoTemp ={
  id:0,
  name:"",
  part_val:"",
  quality:0,
  benefit:{
    gold:{
      speed:0,
    },
    attrs:[
      {
        id:0,
        attribute:0,
        attribute_val:"",
        number_val:"",
      }
    ],
  }
}

const handleEquipSearch = ()=>{
   goodsEquips();
}

const handleGoodsEquipUnbind = (row:any)=>{
  ElMessageBox({
        title: '提示', //MessageBox 标题
        message: '是否确定解绑当前商品上的装备?', //MessageBox 消息正文内容
        confirmButtonText: '确定', //确定按钮的文本内容
        cancelButtonText: '取消', //取消按钮的文本内容
        showCancelButton: true, //是否显示取消按钮
        closeOnClickModal: false, //是否可通过点击遮罩关闭
        type: 'warning', //消息类型，用于显示图标
    }).then(() => { 
      let data = {
        id:goodsRow.value.id,
        equip_cfg_id:row.id,
      }
      goodsApi.goodsEquipUnbind(data).then((res:any)=>{
          if(res.data?.code != 0){
            ElMessage.error(res.data!.msg)
            return false
          }
          if (res.data?.msg == "ok"){
            ElMessage.success("装备解绑成功");
            goodsEquips();
            
          }
        }).catch((err)=>{
          ElMessage.error(err);
        });
      
    }).catch(() => {
        ElMessage.info('已取消装备解绑!');
    });
}
const handleGoodsEquipBind = (row:any) => {
  ElMessageBox({
        title: '提示', //MessageBox 标题
        message: '是否确定将装备绑定到当前商品?', //MessageBox 消息正文内容
        confirmButtonText: '确定', //确定按钮的文本内容
        cancelButtonText: '取消', //取消按钮的文本内容
        showCancelButton: true, //是否显示取消按钮
        closeOnClickModal: false, //是否可通过点击遮罩关闭
        type: 'warning', //消息类型，用于显示图标
    }).then(() => {
      let data = {
        id:goodsRow.value.id,
        equip_cfg_ids:[row.id],
      }
      goodsApi.goodsEquipBind(data).then((res:any)=>{
          if(res.data?.code != 0){
            ElMessage.error(res.data!.msg)
            return false
          }
          if (res.data?.msg == "ok"){
            ElMessage.success("装备绑定成功")
            goodsEquips();
          }
        }).catch((err)=>{
          ElMessage.error(err);
        });
    }).catch(() => {
        ElMessage.info('已取消装备绑定!');
    });
}

const handleGoodsEquipBindView = (row:any) => {
  equip_keyword.value = ""
  goodsRow.value.id = row.id
  goodsRow.value.name = row.name
  goodsRow.value.sku_id = row.sku_id
  dialogFormVisible.value = true
  tableEquips.value.list = [];
  goodsEquips();
}
const handleRefresh = ()=>{
  search.value.goods_id = '';
  search.value.name = ''
  getGoodsList()
}
const getGoodsList = () =>{
  goodsApi.getGoodsList({page:tableGoods.value.page,
    goods_id:search.value.goods_id,
    name:search.value.name,
  }).then((res:any)=>{
    if(res.data?.code != 0){
      ElMessage.error(res.data!.msg)
      return false
    }
    
    if (res.data?.data?.total==0){
      ElMessage.error("未查询到装备信息")
      tableGoods.value.list = [];
      return false
    }
    
    tableGoods.value.total =  res.data?.data?.total
    tableGoods.value.list = res.data?.data?.list
    tableGoods.value.pageSize = res.data?.data?.pageSize
  }).catch((err:any)=>{
    ElMessage.error(err);
  });

}

onBeforeMount(()=>{
  getGoodsList();
});

// 查询数据
const handleSearch = ()=>{
  if(search.value.goods_id || search.value.name){
    getGoodsList()
  }
}

const changeCurPage = (val: number) => {
  getGoodsList();
}

window.addEventListener('touchstart', function() {
    // some logic
}, {passive:false}); // <-- mark the event listerner as NOT passive
</script>

