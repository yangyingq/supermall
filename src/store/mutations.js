import { updateCart }  from '../network/cart'
export  default {
  //添加商品数量
  addCounter(state,payload){
    payload.temp_count +=1;
  },
  //加入购物车
  addToCart(state,payload){
    payload.checked = true
    state.cartList.push(payload)
    let cartList = JSON.stringify(state.cartList)
    updateCart(cartList).then((res)=>{
      console.log(res)
    })
  },
  //购物车选择所有
  selectAll(state,payload){
    state.cartList.forEach((item)=>{
      item.checked = !payload
    })
  },
  //移除信息
  removeUserInfo(state,payload){
    state.accessToken = ""
    state.userInfo = {}
    state.cartList = []
  },
  //设置用户信息
  setUserInfo(state,payload){
    state.userInfo = payload.info
    state.accessToken = payload.token
    state.cartList = payload.cartList
  }
}
