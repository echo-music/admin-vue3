<template>
    <div class="bg-gray-100">
        <el-row>
            <el-col :lg=10 class="m-3">
                <el-input v-model="keyword" style="width: 240px" placeholder="手机号/微信号/用户ID" />
                <el-button type="primary" class="ml-3"  @click="handleSearch">搜索</el-button>
                <el-button type="primary" @click="handleRefresh">刷新</el-button>
                <el-button type="primary" class="ml-3" @click="handleUserBatchCreateView" >批量创建用户</el-button>

            </el-col>
        </el-row>
    </div>
    <div>
        <el-table ref="table" :data="tableUsers.list" style="width: 100%">
          <el-table-column fixed prop="id" label="用户ID"  />
          <el-table-column prop="nickname" label="用户昵称" />
          <el-table-column prop="phone" label="手机号" />
          <el-table-column prop="create_at" label="注册时间"  />
          <el-table-column prop="balance" label="账户余额"  />
          <el-table-column prop="idcard" label="宠物编号"  />
          <el-table-column prop="pet_name" label="宠物名称"  />
          <el-table-column prop="species_val" label="宠物品种"  />
          <el-table-column prop="pet_age" label="宠物年龄"  />
          <el-table-column prop="level" label="培养次数"  />

           <el-table-column  fixed="right" label="操作" width="200">
              <template #default="scope">
                <el-button  link type="primary" size="small"   @click="HandleUserDetailView(scope!.row!.id)">查看详情</el-button>
                <el-button  link type="primary" size="small"  @click="equipHandSendView(scope?.row)">发装备</el-button>
                <el-button  link type="primary" size="small"  @click="userGoldInceOrDecrView(scope?.row)">金币增减</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="flex  justify-start items-center mt-3">
            <el-pagination 
            background layout="total,prev, pager, next" :total="tableUsers.total"
            v-model:current-page="tableUsers.page"
            @current-change="changeCurPage"
            :pageSize="tableUsers.pageSize"

            />
          </div>

            <!---发装备-S-->
          <el-dialog v-model="dialogFormVisible" draggable title="发装备" width="700">
            <div class=" bg-gray-50">
            <p>给用户ID为: <span class="text-pink-500 font-bold mr-1">{{ userInfo.id }}</span>名字叫 <span class="font-bold text-pink-500 mr-1">{{ userInfo.nickname }}</span>的用户发装备</p>
            </div>
            
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
                <el-button  type="success" size="small" @click="EquipSendSubmit(userInfo.id,scope.row.id)">
                  发送
                </el-button>
              </template>
            </el-table-column>
          </el-table>
            <template #footer>
              <div class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button v-if="equipInfo.id > 0" type="primary" >
                  发放
                </el-button>
              </div>
            </template>
          </el-dialog>
           <!---发装备-E-->

           <!---金币增减-S-->
          <el-dialog v-model="dialogFormVisible2" title="金币增减" width="700">
            <div class="">
              <div class=" bg-gray-50">
                <p>给用户ID为: <span class="text-pink-500 font-bold mr-1">{{ userInfo.id }}</span>名字叫 <span class="font-bold text-pink-500 mr-1">{{ userInfo.nickname }}</span>的账户增减金币</p>
                </div>
              <el-radio-group  v-model="userGoldInceOrDecrForm.action" class="ml-4 mt-3">
                  <el-radio :value="1" size="large">增加</el-radio>
                  <el-radio :value="2" size="large">扣除</el-radio>
              </el-radio-group>
              <div class="m-3">
                <el-input-number v-model="userGoldInceOrDecrForm.num"  :min="1" :max="1000000"  />
              </div>
            </div>
            <template #footer>
              <div class="dialog-footer">
                <el-button @click="dialogFormVisible2 = false">取消</el-button>
                <el-button type="primary" @click="userGoldInceOrDecrSubmit">
                  确认
                </el-button>
              </div>
            </template>
          </el-dialog>
           <!---金币增减-E-->
          <!---详情-S-->
          <el-dialog v-model="dialogFormVisible3" draggable title="查看详情" width="700">
            <div class=" bg-gray-100">
              <el-tabs
                  v-model="activeName"
                  type="card"
                  class="demo-tabs"
                >
                  <el-tab-pane label="用户信息" name="first" class="mb-3">
                    <div class="flex flex-wrap justify-start " v-if="userDetailData.user.id>0">
                      <p class="m-3">
                        <span class="w-[100px] font-bold">用户ID:</span>
                        <span class="ml-1 ">{{userDetailData.user.id}}</span>
                      </p>
                      <p class="m-3">
                        <span class="w-[100px] font-bold">用户昵称:</span>
                        <span class="ml-1 ">{{userDetailData.user.nickname}}</span>
                      </p>
                      <p class="m-3">
                        <span class="w-[100px] font-bold">手机号:</span>
                        <span class="ml-1 ">{{userDetailData.user.phone}}</span>
                      </p>
                      <p class="m-3">
                        <span class="w-[100px] font-bold">注册时间:</span>
                        <span class="ml-1 ">{{userDetailData.user.create_at}}</span>
                      </p>
                      <p class="m-3">
                        <span class="w-[100px] font-bold">账户余额:</span>
                        <span class="ml-1 ">{{userDetailData.user.balance}}</span>
                      </p>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="宠物信息" name="second">
                    <div class="flex flex-wrap justify-start" v-if="userDetailData.petRole.id">
                      <p class="m-3">
                        <span class="w-[100px] font-bold">宠物ID:</span>
                        <span class="ml-1 ">{{userDetailData.petRole.pet_id}}</span>
                      </p>
                      <p class="m-3">
                        <span class="w-[100px] font-bold">宠物分身ID:</span>
                        <span class="ml-1 ">{{userDetailData.petRole.id}}</span>
                      </p>
                      <p class="m-3">
                        <span class="w-[100px] font-bold">宠物编号:</span>
                        <span class="ml-1 ">{{userDetailData.petRole.idcard}}</span>
                      </p>
                      <p class="m-3">
                        <span class="w-[100px] font-bold">宠物名称:</span>
                        <span class="ml-1 ">{{userDetailData.petRole.name}}</span>
                      </p>
                      <p class="m-3">
                        <span class="w-[100px] font-bold">宠物品种和年龄:</span>
                        <span class="ml-1 ">{{userDetailData.petRole.breed_val}}-{{userDetailData.petRole.age}}</span>
                      </p>
                      <p class="m-3">
                        <span class="w-[100px] font-bold">公母和绝育:</span>
                        <span class="ml-1 ">公-已绝育</span>
                      </p>
                      <p class="m-3">
                        <span class="w-[100px] font-bold">金币速度:</span>
                        <span class="ml-1 ">{{userDetailData.petRole.earn}}</span>
                      </p>
                      <p class="m-3">
                        <span class="w-[100px] font-bold">存钱包金币:</span>
                        <span class="ml-1 ">{{userDetailData.petRole.balance}}</span>
                      </p>
                      <p class="m-3">
                        <span class="w-[100px] font-bold">存钱包上限:</span>
                        <span class="ml-1 ">0</span>
                      </p>
                      <p class="m-3">
                        <span class="w-[100px] font-bold">宠物评分:</span>
                        <span class="ml-1 ">{{userDetailData.petRole.rank}}</span>
                      </p>
                      <p class="m-3">
                        <span class="w-[100px] font-bold">培养次数:</span>
                        <span class="ml-1 ">{{userDetailData.petRole.level}}</span>
                      </p>
                    </div> 
                  </el-tab-pane>
                  <el-tab-pane label="宠物属性" name="third">
                    <div class="flex flex-wrap justify-start " v-if="userDetailData.petAttr?.length>0">
                      <p class="m-3" v-for="item in userDetailData.petAttr" :key="item.attribute">
                        <span class="w-[100px] font-bold">{{item.attribute_val}}</span>
                        <span class="ml-1 ">{{item.number_val}}</span>
                      </p>
                    </div>  
                  </el-tab-pane>
                  <el-tab-pane label="宠物装扮" name="fourth">
                    <h3 class="m-1 font-bold">已装扮</h3>
                    <div class="">
                      <el-table
                      :data="userDetailData.pet_equips.dressed_up"
                      style="width: 100%"
                    >
                      <el-table-column prop="id" label="背包ID" />
                      <el-table-column prop="equip_cfg_id" label="装备ID" />
                      <el-table-column prop="name" label="装备名称" />
                      <el-table-column prop="part_val" label="装备部位" />
                      <el-table-column prop="status_val" label="装备状态" />
                      <el-table-column  fixed="right" label="操作" >
                        <template #default="scope">
                          <el-button  link type="primary" size="small" v-if="scope.row.status==3" @click="handleUserEquipDel(scope!.row)">删除</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                    </div>
                    <h3 class="m-1 font-bold">未装扮</h3>
                    <div class="">
                      <el-table
                      :data="userDetailData.pet_equips.not_dressed_up"
                      style="width: 100%"
                    >
                      <el-table-column prop="id" label="背包ID" />
                      <el-table-column prop="equip_cfg_id" label="装备ID" />
                      <el-table-column prop="name" label="装备名称" />
                      <el-table-column prop="part_val" label="装备部位" />
                      <el-table-column prop="status_val" label="装备状态" />
                      <el-table-column  fixed="right" label="操作" >
                        <template #default="scope">
                          <el-button  link type="primary" size="small" v-if="scope.row.status==3" @click="handleUserEquipDel(scope!.row)">删除</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                    </div>

                  </el-tab-pane>
             </el-tabs>
            </div>
           
            <template #footer>
              <div class="dialog-footer">
                <el-button @click="dialogFormVisible3 = false">取消</el-button>
                <el-button type="primary" @click="dialogFormVisible3 = false">
                  确定
                </el-button>
              </div>
            </template>
          </el-dialog>
           <!---详情-E-->
          <!---批量创建用户-S-->
           <el-dialog v-model="dialogFormVisible4" title="批量创建用户" width="700">
            <div class="">
              <div class="m-3">
                <el-input-number v-model="user_num" :min="1" :max="1000"  />
              </div>
            </div>
            <template #footer>
              <div class="dialog-footer">
                <el-button @click="dialogFormVisible4 = false">取消</el-button>
                <el-button type="primary" @click="handleUserBatchCreateSubmit">
                  确认
                </el-button>
              </div>
            </template>
          </el-dialog>
          <!---批量创建用户-E-->

    </div> 


   
</template>

<script lang="ts" setup>
import { ref,onBeforeMount } from 'vue'
import userApi from '@/api/userApi'
import equipApi from '@/api/equipApi'
import { ElMessage,ElMessageBox } from 'element-plus'
import type { TableData } from '@/types/user';

let dialogFormVisible = ref(false)
let dialogFormVisible2 = ref(false)
let dialogFormVisible3 = ref(false)
let dialogFormVisible4 = ref(false)
const keyword = ref('');
let activeName = ref('first')
let equip_keyword = ref('');
let user_num = ref(0);
let userGoldInceOrDecrData = {
  action:1,
  num:0,
  userID:0
}
let userGoldInceOrDecrForm = ref(userGoldInceOrDecrData);
let tableEquips = ref({
   list:[],
})

const handleUserEquipDel = (row:any) =>{
  
  ElMessageBox({
      title: '提示', //MessageBox 标题
      message: '确认删除操作?', //MessageBox 消息正文内容
      confirmButtonText: '确定', //确定按钮的文本内容
      cancelButtonText: '取消', //取消按钮的文本内容
      showCancelButton: true, //是否显示取消按钮
      closeOnClickModal: false, //是否可通过点击遮罩关闭
      type: 'warning', //消息类型，用于显示图标
  }).then(() => {
    
    userApi.handleUserEquipDel({
        id:row!.id,
      }).then((res:any)=>{
        if(res.data?.code != 0){
          ElMessage.error(res.data!.msg)
          return false
        }
        ElMessage.success("删除成功")
       activeName.value = "fourth"
       getUserDetail(row!.user_id);


      }).catch(err=>{
        ElMessage.error(err);
      });
  }).catch(() => {
      user_num.value = 0
      ElMessage.info('已取消删除操作');
  });


}

const handleUserBatchCreateView = ()=>{
  dialogFormVisible4.value = true;
}

const handleUserBatchCreateSubmit = ()=>{

ElMessageBox({
      title: '提示', //MessageBox 标题
      message: '确认操作?', //MessageBox 消息正文内容
      confirmButtonText: '确定', //确定按钮的文本内容
      cancelButtonText: '取消', //取消按钮的文本内容
      showCancelButton: true, //是否显示取消按钮
      closeOnClickModal: false, //是否可通过点击遮罩关闭
      type: 'warning', //消息类型，用于显示图标
  }).then(() => {
    userApi.handleUserBatchCreate({
        num:user_num.value,
      }).then((res:any)=>{
        if(res.data?.code != 0){
          ElMessage.error(res.data!.msg)
          return false
        }
        user_num.value = 0
        ElMessage.success("已发起批量创建用户请求")
        dialogFormVisible4.value = false;

        getUserList();


      }).catch(err=>{
        ElMessage.error(err);
      });
  }).catch(() => {
      user_num.value = 0
      ElMessage.info('已取消创建用户操作请求!');
  });

}

const userGoldInceOrDecrView = (row:any)=>{
  userInfo.value = row
  InitGoldInceOrDecrForm(true)
  userGoldInceOrDecrForm.value.userID = userInfo.value.id

}
const userGoldInceOrDecrSubmit = ()=>{

  ElMessageBox({
        title: '提示', //MessageBox 标题
        message: '是否确定增减金币?', //MessageBox 消息正文内容
        confirmButtonText: '确定', //确定按钮的文本内容
        cancelButtonText: '取消', //取消按钮的文本内容
        showCancelButton: true, //是否显示取消按钮
        closeOnClickModal: false, //是否可通过点击遮罩关闭
        type: 'warning', //消息类型，用于显示图标
    }).then(() => {
      userApi.userAccountIncrOrDescr({
          action:userGoldInceOrDecrForm.value.action,
          num:userGoldInceOrDecrForm.value.num,
          user_id:userGoldInceOrDecrForm.value.userID
        }).then((res:any)=>{
          if(res.data?.code != 0){
            ElMessage.error(res.data!.msg)
            return false
          }
          dialogFormVisible.value = false
          ElMessage.success("金币增减成功")
          dialogFormVisible2.value = false
          getUserList();

        }).catch(err=>{
          ElMessage.error(err);
        });
    }).catch(() => {
        ElMessage.info('已取消金币增减操作!');
    });
  

}

function InitGoldInceOrDecrForm(visible:boolean){
  dialogFormVisible2.value = visible;
  userGoldInceOrDecrForm.value.num = 0;
  userGoldInceOrDecrForm.value.action = 1;
  userGoldInceOrDecrForm.value.userID = 0;
}

const EquipSendSubmit = (toUserID:number,equipID:number)=>{
  ElMessageBox({
        title: '提示', //MessageBox 标题
        message: '是否确定发送该['+equipID+']装备?', //MessageBox 消息正文内容
        confirmButtonText: '确定', //确定按钮的文本内容
        cancelButtonText: '取消', //取消按钮的文本内容
        showCancelButton: true, //是否显示取消按钮
        closeOnClickModal: false, //是否可通过点击遮罩关闭
        type: 'warning', //消息类型，用于显示图标
    }).then(() => {
      if (!toUserID || !equipID){
        ElMessage.warning("参数缺失")
      }
      userApi.equipHandSend({
          to_user_id:toUserID,
          equip_id:equipID,
        }).then((res:any)=>{
          if(res.data?.code != 0){
            ElMessage.error(res.data!.msg)
            return false
          }
          ElMessage.success("发送成功")

        }).catch(err=>{
          ElMessage.error(err);
        });
        
    }).catch(() => {
        ElMessage.info('已取消发送装备!');
    });
}

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
let equipInfo = ref(equipInfoTemp);

const getEquipList = ()=>{
  equipApi.getEquipcfgs({page:1,keyword:equip_keyword.value}).then((res:any)=>{
    if(res.data?.code != 0){
      ElMessage.error(res.data!.msg)
      return false
    }
    
    if (res.data?.data?.total==0){
      ElMessage.error("未查询到装备信息")
      tableEquips.value.list = [];
      return false
    }
    tableEquips.value.list =  res.data.data.list
  }).catch((err:any)=>{
    ElMessage.error(err);
  });


}
// 查询装备
const handleEquipSearch = ()=>{
   
  if(equip_keyword.value == ""){
    ElMessage.warning("装备ID或装备名称不能为空");
    return false
  }
  getEquipList()
  
}

let userInfo = ref({
  id:0,
  nickname:"",
});

let userDetailTemp ={
  user:{
    id: 0,
    nickname: "",
    phone: "",
    avatar: "",
    gender: 0,
    balance: 0,
    create_at: ""
  },
  petRole:{
        id: 0,
        pet_id: 0,
        idcard: 0,
        user_id: 0,
        name: "woainizhonuoa",
        avatar: "store/image/boy.png",
        marker: "",
        feature: 0,
        level: 0,
        rank: 0,
        earn: 0,
        balance: 0,
        breed_val: "",
        age: "",
        culture_incr: 0,
        dressup_incr: 0,
        gold_speed: 0
  },
  petAttr:[
    {
        "id": 0,
        "attribute": 0,
        "attribute_val": "",
        "number": 0,
        "number_val": "",
        "level": 0
    }
  ],
  pet_equips:{
    dressed_up:[],
    not_dressed_up:[],
  }
}
let userDetailData =ref(userDetailTemp);
// 用户列表数据初始化
let tableUsers = ref<TableData>({
   list:[],
   page: 1,
   total:0,
   pageSize:15,
})
const HandleUserDetailView = (id:number) =>{
    equipInfo.value = equipInfoTemp
    dialogFormVisible3.value = true;
    activeName.value = "first"
    userDetailData.value =  userDetailTemp
    getUserDetail(id);


}

const getUserDetail = (id:number)=>{
  userApi.getUserDetail({id:id}).then((res:any) =>{
      let  data = res.data!;
      if(res.data?.code != 0){
      ElMessage.error(res.data!.msg)
      return false
    }
      userDetailData.value.user = data?.data?.user
      userDetailData.value.petRole = data.data.pet_role
      userDetailData.value.petAttr = data.data.pet_attr
      userDetailData.value.pet_equips = data.data.pet_equips

    }).catch(error =>{
      ElMessage.error(error);
    });
}
const equipHandSendView = (e:any)=>{
  userInfo.value = e
  dialogFormVisible.value = true
  equip_keyword.value = ""
  tableEquips.value.list = [];
}

// 刷新数据
const handleRefresh = ()=>{
  keyword.value = '';
  getUserList()
}

// 查询数据
const handleSearch = ()=>{
  getUserList()
}

// 页面改变的时候需要发送请求
const changeCurPage = (val: number) => {
  getUserList()
  console.log(`current page: ${val}`)
}

// 获取服务端用户列表数据
const getUserList  = function(){
  userApi.getUserList({page:tableUsers.value.page,keyword:keyword.value}).then((res:any)=>{
    if(res.data?.code != 0){
      ElMessage.error(res.data!.msg)
      return false
    }
    tableUsers.value.total =  res.data?.data?.total
    tableUsers.value.list = res.data?.data?.list
    tableUsers.value.pageSize = res.data?.data?.pageSize
  }).catch(err=>{
    ElMessage.error(err);

  });
}

onBeforeMount(()=>{
  getUserList();
  
});


</script>