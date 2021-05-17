import {request} from "@/network/request";

export function getCategory() {
  return request({
    url: '/cateGory',
  })
}


export function getCateGoodList(params) {
  return request({
    url: '/cateList',
    params:params
  })
}

