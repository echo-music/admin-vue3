import http from '@/utils/http/http';


const getGoodsList= async (params:any) => {
    const url = "/v1/admin/goods/list";
   return http.get(url,params)
}

const goodsEquipBind= async (data:any) => {
    const url = "/v1/admin/goods/"+data.id+"/equip/bind";
   return http.put(url,data)
}
const goodsEquipUnbind= async (data:any) => {
    const url = "/v1/admin/goods/"+data.id+"/equip/unbind";
   return http.put(url,data)
}

const goodsDetail= async (params:any) => {
    const url = "/v1/admin/goods/"+params.id;
   return http.get(url,{})
}
const goodsEquips= async (params:any) => {
    const url = "/v1/admin/goods/"+params.id+"/equips";
   return http.get(url,{keyword:params.keyword})
}



export default {
    getGoodsList,
    goodsEquipBind,
    goodsEquipUnbind,
    goodsDetail,
    goodsEquips,
}