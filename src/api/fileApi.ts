import http from '@/utils/http/http';




const fileUpload= async (data:any) => {
    const formData = new FormData();
    formData.append("file", data);
    const url = "/v1/admin/file/upload";
   return http.post(url,formData)
}
export default {
    fileUpload
}