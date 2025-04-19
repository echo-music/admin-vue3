<template>
    <div class="bg-gray-100 ">
        <el-row>
            <el-col :lg=24 class="m-3">
                <el-input  style="width: 240px" v-model="keyword" placeholder="装备名称/装备ID" />
                <el-button type="primary" class="ml-3" @click="handleSearch">搜索</el-button>
                <el-button type="primary"  @click="handleRefresh">刷新</el-button>
                <el-button type="primary" class="ml-3" @click="handleEquipStoreView" >创建装备</el-button>
            </el-col>
        </el-row>
    </div>
    <div>
        <el-table :data="tableEquips.list"  style="width: 100%">
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
            <el-table-column prop="id" label="装备ID"  />
            <el-table-column prop="name" label="装备名称"  />
            <el-table-column prop="species_val" label="适应种类"/>
            <el-table-column prop="part_val" label="适应部位" />
            <el-table-column prop="quality" label="品质"  />
            <el-table-column prop="expire_at" label="有效时间" />
            <!-- <el-table-column prop="expire_unit_value" label="有效单位" /> -->
            <el-table-column prop="create_at" label="创建时间" />
            <el-table-column fixed="right" label="操作">
              <template v-slot="scope">
                <el-button  type="primary" size="small" @click="handleEquipUpdateView(scope.row)">
                  编辑
                </el-button>
               
              </template>
            </el-table-column>
          </el-table>
          <div class="flex  justify-start items-center mt-3">
            <el-pagination 
            background layout="total,prev, pager, next" :total="tableEquips.total"
            v-model:current-page="tableEquips.page"
            @current-change="changeCurPage"
            :pageSize="tableEquips.pageSize"

            />
          </div>

          <!--创建装备-S-->
          <el-dialog v-model="dialogFormVisible" draggable title="创建装备" style="min-width:600px;max-width:800px;">
            <el-row>
              <el-col :md="16" >
                <el-form :model="equipItemForm"  label-width="auto" >
                  <el-form-item label="装备名称">
                    <el-input v-model="equipItemForm.name" />
                  </el-form-item>
                  <el-form-item label="品质">
                    <el-input-number v-model="equipItemForm.quality" placeholder="请输入品质" :min="1" :max="5"  class="w-[180px]" />
                  </el-form-item>
                  <el-form-item label="品种">
                    <el-select v-model="equipItemForm.species" placeholder="请选择品种">
                      <el-option label="狗" :value="0" />
                      <el-option label="猫" :value="1" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="部位">
                    <el-select v-model="equipItemForm.part" placeholder="请选择部位">
                      <el-option label="颈部" :value="0"/>
                      <el-option label="服饰" :value="1"/>
                      <el-option label="食品" :value="2"/>
                      <el-option label="玩具" :value="3"/>
                      <el-option label="主食" :value="4"/>
                      <el-option label="零食" :value="5"/>
                      <el-option label="卫生" :value="6"/>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="属性加成">
                    <el-checkbox-group v-model="equipItemForm.benefit.attrs.keys">
                      <el-checkbox :value="0" name="keys" class="mb-3">
                        <span>攻击力</span><el-input-number v-model="equipItemForm.benefit.attrs.values[0]" placeholder="请输入攻击力" :min="0"  class="ml-3 mr-1 w-[180px]" />%
                      </el-checkbox>
                      <el-checkbox :value="1" name="keys" class="mb-3">
                        <span>暴击率</span><el-input-number v-model="equipItemForm.benefit.attrs.values[1]"  placeholder="请输入暴击率" :min="0"  class="ml-3 mr-1 w-[180px]" />%
                      </el-checkbox>
                      <el-checkbox :value="2" name="keys" class="mb-3">
                        <span>生命值</span><el-input-number  v-model="equipItemForm.benefit.attrs.values[2]" placeholder="请输入生命值" :min="0"  class="ml-3 mr-1 w-[180px]" />%
                      </el-checkbox>
                      <el-checkbox :value="3" name="keys" >
                        <span>闪避率</span><el-input-number v-model="equipItemForm.benefit.attrs.values[3]" placeholder="请输入闪避率" :min="0"  class="ml-3 mr-1 w-[180px]" />%
                      </el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                  <el-form-item label="金币加成">
                    <el-input-number v-model="equipItemForm.benefit.gold_speed"placeholder="请输入数值" :min="1"  class="mr-3 w-[180px]"  />/ 天
                  </el-form-item>
    
                  <el-form-item label="有效期">
                    <el-input-number v-model="equipItemForm.expire_in" placeholder="请输入数值" class="w-[180px]" />
                    <el-select v-model="equipItemForm.expire_unit" placeholder="时间单位" class="w-[120px] ml-1" >
                      <el-option label="小时" :value="0" />
                      <el-option label="天" :value="1" />
                      <el-option label="月" :value="2" />
                      <el-option label="周" :value="3" />
                      <el-option label="年" :value="4" />
                    </el-select>
                  </el-form-item>
                 
                  
                </el-form>
              </el-col>
              <el-col :md="8" >
                <div class="flex justify-center items-center">
                  <div class="w-[100px] text-right mr-1">icon</div>
                  <div class="w-auto ml-1">
                    <el-upload
                    action="#"
                    ref="upload"
                    class="avatar-uploader"
                    :show-file-list="false"
                    :before-upload="beforeAvatarUpload"
                    :http-request="handleFileUploadIcon"
                  >
                    <img v-if="imageUrls.icon" :src="imageUrls.icon" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                  </el-upload>
                  </div>
                </div>

                <div class="flex justify-center items-center mt-3">
                  <div class="w-[100px] text-right mr-1">装备图</div>
                  <div class="w-auto ml-1">
                    <el-upload
                    class="avatar-uploader"
                    action=""
                    :show-file-list="false"
                    :before-upload="beforeAvatarUpload"
                    :http-request="handleFileUploadPicture"
                    
                  >
                    <img v-if="imageUrls.picture" :src="imageUrls.picture" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                  </el-upload>
                  </div>
                </div>

                <div class="flex justify-center items-center mt-3">
                  <div class="w-[100px] text-right mr-1">装备装饰图</div>
                  <div class="w-auto ml-1">
                    <el-upload
                    class="avatar-uploader"
                    action=""
                    :show-file-list="false"
                    :before-upload="beforeAvatarUpload"
                    :http-request="handleFileUploadDecor"
                  >
                    <img v-if="imageUrls.decoration" :src="imageUrls.decoration" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                  </el-upload>
                  </div>
                </div>
              </el-col>
            </el-row>
            <template #footer>
              <div class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary"  @click="handleEquipStoreSubmit">
                  创建
                </el-button>
              </div>
            </template>
          </el-dialog>
           <!---创建装备-E-->
           <!--更新装备-S-->
          <el-dialog v-model="dialogFormVisible2" draggable :title="'更新装备['+equipRow.id.toString()+']'" style="min-width:600px;max-width:800px;">
            <el-row>
              <el-col :md="16" >
                <el-form :model="equipUpdateForm"  label-width="auto" >
                  <el-form-item label="装备名称">
                    <el-input v-model="equipUpdateForm.name" />
                  </el-form-item>
                  <el-form-item label="品质">
                    <el-input-number v-model="equipUpdateForm.quality" placeholder="请输入品质" :min="1" :max="5"  class="w-[180px]" />
                  </el-form-item>
                  <el-form-item label="品种">
                    <el-select v-model="equipUpdateForm.species" placeholder="请选择品种">
                      <el-option label="狗" :value="0" />
                      <el-option label="猫" :value="1" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="部位">
                    <el-select v-model="equipUpdateForm.part" placeholder="请选择部位">
                      <el-option label="颈部" :value="0"/>
                      <el-option label="服饰" :value="1"/>
                      <el-option label="食品" :value="2"/>
                      <el-option label="玩具" :value="3"/>
                      <el-option label="主食" :value="4"/>
                      <el-option label="零食" :value="5"/>
                      <el-option label="卫生" :value="6"/>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="属性加成">
                    <el-checkbox-group v-model="equipUpdateForm.benefit.attrs.keys">
                      <el-checkbox :value="0" name="keys" class="mb-3">
                        <span>攻击力</span><el-input-number v-model="equipUpdateForm.benefit.attrs.values[0]" placeholder="请输入攻击力" :min="0"  class="ml-3 mr-1 w-[180px]" />%
                      </el-checkbox>
                      <el-checkbox :value="1" name="keys" class="mb-3">
                        <span>暴击率</span><el-input-number v-model="equipUpdateForm.benefit.attrs.values[1]"  placeholder="请输入暴击率" :min="0"  class="ml-3  mr-1 w-[180px]" />%
                      </el-checkbox>
                      <el-checkbox :value="2" name="keys" class="mb-3">
                        <span>生命值</span><el-input-number  v-model="equipUpdateForm.benefit.attrs.values[2]" placeholder="请输入生命值" :min="0"  class="ml-3 mr-1 w-[180px]" />%
                      </el-checkbox>
                      <el-checkbox :value="3" name="keys" >
                        <span>闪避率</span><el-input-number v-model="equipUpdateForm.benefit.attrs.values[3]" placeholder="请输入闪避率" :min="0"  class="ml-3 mr-1 w-[180px]" />%
                      </el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                  <el-form-item label="金币加成">
                    <el-input-number v-model="equipUpdateForm.benefit.gold_speed"placeholder="请输入数值"  class="mr-3 w-[180px]"  />/ 天
                  </el-form-item>
    
                  <el-form-item label="有效期">
                    <el-input-number v-model="equipUpdateForm.expire_in" placeholder="请输入数值" :min="1" :max="365"  class="w-[180px]" />
                    <el-select v-model="equipUpdateForm.expire_unit" placeholder="时间单位" class="w-[120px] ml-1" >
                      <el-option label="小时" :value="0" />
                      <el-option label="天" :value="1" />
                      <el-option label="月" :value="2" />
                      <el-option label="周" :value="3" />
                      <el-option label="年" :value="4" />
                    </el-select>
                  </el-form-item>
                 
                  
                </el-form>
              </el-col>
              <el-col :md="8" >
                <div class="flex justify-center items-center">
                  <div class="w-[100px] text-right mr-1">icon</div>
                  <div class="w-auto ml-1">
                    <el-upload
                    action="#"
                    ref="upload"
                    class="avatar-uploader"
                    :show-file-list="false"
                    :before-upload="beforeAvatarUpload"
                    :http-request="handleFileUploadIcon"
                  >
                    <img v-if="imageUpdateUrls.icon" :src="imageUpdateUrls.icon" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                  </el-upload>
                  </div>
                </div>

                <div class="flex justify-center items-center mt-3">
                  <div class="w-[100px] text-right mr-1">装备图</div>
                  <div class="w-auto ml-1">
                    <el-upload
                    class="avatar-uploader"
                    action=""
                    :show-file-list="false"
                    :before-upload="beforeAvatarUpload"
                    :http-request="handleFileUploadPicture"
                    
                  >
                    <img v-if="imageUpdateUrls.picture" :src="imageUpdateUrls.picture" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                  </el-upload>
                  </div>
                </div>

                <div class="flex justify-center items-center mt-3">
                  <div class="w-[100px] text-right mr-1">装备装饰图</div>
                  <div class="w-auto ml-1">
                    <el-upload
                    class="avatar-uploader"
                    action=""
                    :show-file-list="false"
                    :before-upload="beforeAvatarUpload"
                    :http-request="handleFileUploadDecor"
                  >
                    <img v-if="imageUpdateUrls.decoration" :src="imageUpdateUrls.decoration" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                  </el-upload>
                  </div>
                </div>
              </el-col>
            </el-row>
            <template #footer>
              <div class="dialog-footer">
                <el-button @click="dialogFormVisible2 = false">取消</el-button>
                <el-button type="primary"  @click="handleEquipUpdateSubmit">
                  更新
                </el-button>
              </div>
            </template>
          </el-dialog>
           <!---更新装备-E-->
    </div> 
   
</template>

<script lang="ts" setup>
import {  ref,onBeforeMount, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
import type { TableData } from '@/types/user';
import equipApi from '@/api/equipApi'
import fileApi from '@/api/fileApi'
import type{EquipForm} from '@/types/equip'
const dialogFormVisible = ref(false)
const dialogFormVisible2 = ref(false)
const imageUrlsTemp = {
  icon: "",
  picture:"",
  decoration:"",
}

let imageUrls = ref({...imageUrlsTemp})
let imageUpdateUrls = ref({...imageUrlsTemp})
const equipItem :EquipForm= {
  id:0,
  name: "",
  icon: "",
  picture:"",
  decoration:"",
  species: 1,
  part: 0,
  quality: 0,
  expire_in: 0,
  expire_unit: 1,
  benefit: {
      gold_speed:0,
      attrs:{
        keys:[],   // 复选框
        values:[0,0,0,0], // 复选框对应的表单数据,默认初始化都是0
      },
    }
}
let equipItemForm = reactive<EquipForm>({...equipItem})
let equipUpdateForm = reactive<EquipForm>({...equipItem})
let tableEquips = ref<TableData>({
   list:[],
   page: 1,
   total:0,
   pageSize:15,
})
let keyword = ref('');
let equipRow = ref({
  id:0,
  name:""
})

const handleEquipUpdateSubmit = ()=>{
  equipApi.equipUpdate(equipUpdateForm).then((res:any)=>{
    if(res.data?.code != 0){
      ElMessage.error(res.data!.msg)
      return false
    }
    if (res.data?.msg == "ok"){
      ElMessage.success("装备更新成功");
      InitUpdateForm(false);
      getEquipcfgs();
    }
  }).catch((err)=>{
    ElMessage.error(err);
  });

}

const handleEquipUpdateView = function(row:any){
  InitUpdateForm(true);
  equipRow.value.id = row.id
  equipRow.value.name = row.name

  equipApi.equipDetail({id:row.id}).then((res:any)=>{
    if(res.data?.code != 0){
      ElMessage.error(res.data!.msg)
      return false
    }
    const cfg = res.data?.data
    if (cfg){
      if (cfg.icon 
      && (cfg.icon.includes("https://") || cfg.icon.includes("http://"))
    ){
        const  icon = new URL(cfg.icon)
        console.log( icon?.pathname)
        equipUpdateForm.icon = icon?.pathname
      }
      if (cfg.picture
      && (cfg.picture.includes("https://") || cfg.picture.includes("http://"))
      ){
        const  picture = new URL(cfg.picture)
        equipUpdateForm.picture = picture?.pathname
      }
      if (cfg.decoration
      && (cfg.decoration.includes("https://") || cfg.decoration.includes("http://"))

      ){
        const  decoration = new URL(cfg.decoration)
        equipUpdateForm.decoration = decoration?.pathname
      }
      equipUpdateForm.id = cfg.id
      equipUpdateForm.name = cfg.name
      equipUpdateForm.species = cfg.species
      equipUpdateForm.expire_in = cfg.expire_in
      equipUpdateForm.expire_unit = cfg.expire_unit
      equipUpdateForm.id = cfg.id
      equipUpdateForm.part = cfg.part
      equipUpdateForm.quality = cfg.quality
      imageUpdateUrls.value.icon = cfg.icon
      imageUpdateUrls.value.picture = cfg.picture
      imageUpdateUrls.value.decoration = cfg.decoration
      if(cfg.benefit?.attrs){
        for(let i in cfg.benefit.attrs){
          let attr = cfg.benefit.attrs[i];
          equipUpdateForm.benefit.attrs.keys.push(attr.attribute);
          attr.number = attr.number*100
          equipUpdateForm.benefit.attrs.values[attr.attribute] = attr.number
        }
      }
      if(cfg.benefit?.gold?.speed){
        equipUpdateForm.benefit.gold_speed = cfg.benefit.gold.speed

      }
   
    }
   
  }).catch((err)=>{
    console.log(err)
    ElMessage.error(err);
  });
}

const handleFileUploadIcon = (file:any) => {
  fileApi.fileUpload(file!.file).then((res:any)=>{
    if(res.data?.code != 0){
      ElMessage.error(res.data!.msg)
      return false
    }
    if (dialogFormVisible.value ){
      equipItemForm.icon = res.data.data.path
      imageUrls.value.icon = res.data.data.url
    }
    
    if (dialogFormVisible2.value ){
      equipUpdateForm.icon = res.data.data.path
      imageUpdateUrls.value.icon = res.data.data.url
    }
  }).catch((err)=>{
    ElMessage.error(err);
  });
}

const handleFileUploadPicture = (file:any) => {
  fileApi.fileUpload(file!.file).then((res:any)=>{
    if(res.data?.code != 0){
      ElMessage.error(res.data!.msg)
      return false
    }
    if (dialogFormVisible.value ){
      equipItemForm.picture = res.data.data.path
      imageUrls.value.picture = res.data.data.url
    }
    if (dialogFormVisible2.value ){
      equipUpdateForm.picture = res.data.data.path
      imageUpdateUrls.value.picture = res.data.data.url

    }
    
  }).catch((err)=>{
    ElMessage.error(err);
  });
}

const handleFileUploadDecor = (file:any) => {
  fileApi.fileUpload(file!.file).then((res:any)=>{
    if(res.data?.code != 0){
      ElMessage.error(res.data!.msg)
      return false
    }
    if (dialogFormVisible.value ){
      equipItemForm.decoration = res.data.data.path
      imageUrls.value.decoration = res.data.data.url
    }
    if (dialogFormVisible2.value ){
      equipUpdateForm.decoration = res.data.data.path
      imageUpdateUrls.value.decoration = res.data.data.url
    }
   
   
  }).catch((err)=>{
    ElMessage.error(err);
  });

}

const handleEquipStoreSubmit=()=>{
  console.log("form",equipItemForm);
  equipApi.equipStore(equipItemForm).then((res:any)=>{
    if(res.data?.code != 0){
      ElMessage.error(res.data!.msg)
      return false
    }
    if (res.data?.msg == "ok"){
      ElMessage.success("装备创建成功")
      InitStoreForm(false);
      getEquipcfgs();

    }
  }).catch((err)=>{
    ElMessage.error(err);
  });

}

const handleEquipStoreView=()=>{
  InitStoreForm(true);
}

const InitStoreForm = (visiavle:boolean)=>{
  dialogFormVisible.value = visiavle
  Object.assign(equipItemForm,equipItem);
  equipItemForm.benefit.attrs.keys =[];
  equipItemForm.benefit.attrs.values = [0,0,0,0]
  Object.assign(imageUrls.value, imageUrlsTemp);
};

const InitUpdateForm = (visiavle:boolean)=>{
  dialogFormVisible2.value = visiavle
  Object.assign(equipUpdateForm, equipItem);
  equipUpdateForm.benefit.attrs.keys =[];
  equipUpdateForm.benefit.attrs.values = [0,0,0,0]
  Object.assign(imageUpdateUrls.value, imageUrlsTemp);
};

const getEquipcfgs = () =>{
  equipApi.getEquipcfgs({page:tableEquips.value.page,keyword:keyword.value}).then((res:any)=>{
    if(res.data?.code != 0){
      ElMessage.error(res.data!.msg)
      return false
    }
    
    if (res.data?.data?.total==0){
      ElMessage.error("未查询到装备信息")
      tableEquips.value.list = [];
      return false
    }
    
    tableEquips.value.total =  res.data?.data?.total
    tableEquips.value.list = res.data?.data?.list
    tableEquips.value.pageSize = res.data?.data?.pageSize
  }).catch((err:any)=>{
    ElMessage.error(err);
  });

}

onBeforeMount(()=>{
  getEquipcfgs();
  
});

// 查询数据
const handleSearch = ()=>{
  getEquipcfgs()
}

const handleRefresh = ()=>{
  keyword.value = '';
  getEquipcfgs()
}


const changeCurPage = (val: number) => {
  getEquipcfgs()
  console.log(`current page: ${val}`)
}


// 声明一个数组，限制其元素类型为图片上传格式
const imageTypes  = ["image/jpeg", "image/png"];
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (!imageTypes.includes(rawFile.type)) {
    ElMessage.error('Avatar picture must be JPG or PNG format!')
    return false
  }
   if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
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