import http from '@/utils/http/http';


const getEquipcfgs= async (params:any) => {
    const url = "/v1/admin/pet/equipcfgs";
   return http.get(url,params)
}

const equipStore= async (data:any) => {
    const url = "/v1/admin/pet/equipcfgs";
   return http.post(url,data)
}

const equipDetail= async (data:any) => {
    const url = "/v1/admin/pet/equipcfgs/"+data.id;
   return http.get(url,{})
}

const equipUpdate= async (data:any) => {
    const url = "/v1/admin/pet/equipcfgs/"+data.id;
   return http.put(url,data)
}
export default {
    getEquipcfgs,
    equipStore,
    equipDetail,
    equipUpdate
}