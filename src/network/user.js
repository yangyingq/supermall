import {request} from "network/request";

export function loginPassword(data){
  return request({
    url:'/user/login',
    method:'post',
    data,
  })
}

export function loginMobile(data){
  return request({
    url:'/user/loginMobile',
    method:'post',
    data,
  })
}

export function getVerifyCode(data){
  return request({
    url:'/user/getVerifyCode',
    method:'get',
    params:{
      mobile:data
    }
  })
}

export function getLoginCode(data){
  return request({
    url:'/user/getLoginCode',
    method:'get',
    params:{
      mobile:data
    }
  })
}
export function register(data){
  return request({
    url:'/user/register',
    method:'post',
    data
  })
}
