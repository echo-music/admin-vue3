import http from '@/utils/http/http';
const getAds= async (params:any) => {
    const url = "/v1/admin/ads";
   return http.get(url,params)
}

const adStore= async (data:any) => {
    const url = "/v1/admin/ads";
   return http.post(url,data)
}

const adUpdate= async (data:any) => {
    const url = "/v1/admin/ads/"+data.id;
   return http.put(url,data)
}
export default {
    getAds,
    adStore,
    adUpdate
}