import {request} from "@/network/request";

export function getToken(){
  return request({
    url:'/home/getToken'
  })
}
export function  getHomedata(){
  return request({
    url:'/home/data',
    method:'get'
  })
}
export function getHomeGoods(type,page){
  return request({
    url:'/home/goods/data',
    method:'get',
    params:{
      'type':type,
      'page':page
    }
  })
}
export function checkLogin(){
  return request({
    url:'/home/checklogin'
  })
}
