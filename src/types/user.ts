import { type RouteRecordRaw} from 'vue-router';

export interface TableData {
    list: any[];
    page: number;
    total: number;
    pageSize: number;
 }
 

 export interface UserInfo {
    userid: number
    username: string
    avatar: string
    token: string
 }