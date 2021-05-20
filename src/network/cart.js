import {request} from "@/network/request";

export function updateCart(datas) {
  return request({
    url: '/cart/updateCart',
    method: 'post',
    data:{
      'cartList':datas
    }
  })
}

export function getCartList() {
  return request({
    url: '/cart/getCartList',
    method: 'get',
  })
}



