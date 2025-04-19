<template>
    <div class="bg-gray-100 ">
        <el-row>
            <el-col :lg=24 class="m-3">
                <!-- <el-input  style="width: 240px" v-model="keyword" placeholder="广告名称" />
                <el-button type="primary" class="ml-3" @click="handleSearch">搜索</el-button> -->
                <el-button type="primary"  @click="handleRefresh">刷新</el-button>
                <el-button type="primary" class="ml-3" plain @click="handleAdStoreView" >创建广告</el-button>
            </el-col>
        </el-row>
    </div>
    <div>
        <el-table :data="tableAds.list"  style="width: 100%">
            <el-table-column prop="id" label="ID"  />
            <el-table-column prop="content" label="内容"/>
            <el-table-column prop="link" label="跳转地址" />
            <el-table-column prop="position" label="位置" />
            <el-table-column prop="create_at" label="创建时间" />
            <el-table-column fixed="right" label="操作">
              <template v-slot="scope">
                <el-button  type="primary" size="small"  @click="handleAdUpdateView(scope.row)">
                  编辑
                </el-button>
               
              </template>
            </el-table-column>
          </el-table>
          <div class="flex  justify-start items-center mt-3">
            <el-pagination 
            background layout="total,prev, pager, next" :total="tableAds.total"
            v-model:current-page="tableAds.page"
            @current-change="changeCurPage"
            :pageSize="tableAds.pageSize"

            />
          </div>

          <!--创建广告-S-->
          <el-dialog v-model="dialogFormVisible" title="创建广告" style="min-width:600px;max-width:800px;">
            <el-row>
              <el-col :lg="24" >
                <el-form :model="adFormForm"  label-width="auto" >
                  <el-form-item label="广告位置">
                    <el-input v-model="adFormForm.position" placeholder="非必填" />
                  </el-form-item>
                  <el-form-item label="广告内容">
                    <el-input v-model="adFormForm.content" placeholder="非必填"  />
                  </el-form-item>
                  <el-form-item label="跳转地址">
                    <el-input v-model="adFormForm.link" placeholder="非必填"   />
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <template #footer>
              <div class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary"  @click="handleAdStoreSubmit">
                  创建
                </el-button>
              </div>
            </template>
          </el-dialog>
           <!---创建广告-E-->
           <!--更新广告-S-->
          <el-dialog v-model="dialogFormVisible2" :title="'更新广告['+adRow.id.toString()+']'" style="min-width:600px;max-width:800px;">
            <el-row>
                <el-col :md="24" >
                  <el-form :model="adUpdateForm"  label-width="auto" >
                    <el-form-item label="广告位置">
                      <el-input v-model="adUpdateForm.position" placeholder="非必填"/>
                    </el-form-item>
                    <el-form-item label="广告内容">
                      <el-input v-model="adUpdateForm.content" placeholder="非必填"  />
                    </el-form-item>
                    <el-form-item label="跳转地址">
                      <el-input v-model="adUpdateForm.link" placeholder="非必填"  />
                    </el-form-item>
                  </el-form>
                </el-col>
              </el-row>
            <template #footer>
              <div class="dialog-footer">
                <el-button @click="dialogFormVisible2 = false">取消</el-button>
                <el-button type="primary"  @click="handleAdUpdateSubmit">
                  更新
                </el-button>
              </div>
            </template>
          </el-dialog>
           <!---更新广告-E-->
    </div> 
   
</template>

<script lang="ts" setup>
import {  ref,onBeforeMount, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import type { TableData } from '@/types/user';
import adApi from '@/api/adApi';
import type {AdForm} from '@/types/ad';
const dialogFormVisible = ref(false)
const dialogFormVisible2 = ref(false)
const adForm :AdForm= {
  id:0,
  content: "",
  position: "",
  link:"",
}
let adFormForm = reactive<AdForm>({...adForm})
let adUpdateForm = reactive<AdForm>({...adForm})
let tableAds = ref<TableData>({
   list:[],
   page: 1,
   total:0,
   pageSize:15,
})
let keyword = ref('');
let adRow = ref({
  id:0,
  name:""
})

const handleAdUpdateSubmit = ()=>{

  console.log("form",adUpdateForm);
  adApi.adUpdate(adUpdateForm).then((res:any)=>{
    if(res.data?.code != 0){
      ElMessage.error(res.data!.msg)
      return false
    }
    if (res.data?.msg == "ok"){
      ElMessage.success("装备更新成功")
      InitUpdateForm(false);
      getAds();

    }
  }).catch((err)=>{
    ElMessage.error(err);
  });

}

const handleAdUpdateView = function(row:any){
  InitUpdateForm(true);
  adRow.value.id = row.id
  adRow.value.name = row.name
  adUpdateForm.id = row.id
  adUpdateForm.content = row.content
  adUpdateForm.position = row.position
  adUpdateForm.link = row.link
}
const handleAdStoreSubmit=()=>{
  console.log("form",adFormForm);
  adApi.adStore(adFormForm).then((res:any)=>{
    if(res.data?.code != 0){
      ElMessage.error(res.data!.msg)
      return false
    }
    if (res.data?.msg == "ok"){
      ElMessage.success("装备创建成功")
      InitStoreForm(false);
      getAds();

    }
  }).catch((err)=>{
    ElMessage.error(err);
  });

}

const handleAdStoreView=()=>{
  InitStoreForm(true);
}

const InitStoreForm = (visiavle:boolean)=>{
  dialogFormVisible.value = visiavle
  Object.assign(adFormForm,adForm);
};

const InitUpdateForm = (visiavle:boolean)=>{
  dialogFormVisible2.value = visiavle
  Object.assign(adUpdateForm, adForm);

};

const getAds = () =>{
  adApi.getAds({page:tableAds.value.page,keyword:keyword.value}).then((res:any)=>{
    if(res.data?.code != 0){
      ElMessage.error(res.data!.msg)
      return false
    }
    
    if (res.data?.data?.total==0){
      ElMessage.error("未查询到装备信息")
      tableAds.value.list = [];
      return false
    }
    
    tableAds.value.total =  res.data?.data?.total
    tableAds.value.list = res.data?.data?.list
    tableAds.value.pageSize = res.data?.data?.pageSize
  }).catch((err:any)=>{
    ElMessage.error(err);
  });

}

onBeforeMount(()=>{
  getAds();
  
});

// 查询数据
const handleSearch = ()=>{
  getAds()
}

const handleRefresh = ()=>{
  keyword.value = '';
  getAds()
}


const changeCurPage = (val: number) => {
  getAds()
  console.log(`current page: ${val}`)
}

</script>


<style scoped>
.avatar-uploader .avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;
}
</style>