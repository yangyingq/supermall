export  default {
  //添加商品数量
  addCounter(state,payload){
    payload.temp_count +=1;
  },
  //加入购物车
  addToCart(state,payload){
    payload.checked = true
    state.cartList.push(payload)
  },
  //失败回滚购物车
  moveFromCart(state,payload){
    state.cartList.splice(state.cartList.findIndex(item => item.id === payload.id), 1)
  },
  //购物车选择所有
  selectAll(state,payload){
    state.cartList.forEach((item)=>{
      item.checked = !payload
    })
  },
  //移除用户信息
  removeUserInfo(state,payload){
    state.accessToken = ""
    localStorage.removeItem('token')
  },
  //设置用户信息
  setUserInfo(state,payload){
    state.accessToken = payload.token
    state.cartList = payload.cartList
    localStorage.setItem('token',payload.token)
  },
  //购物车信息
  setCart(state,payload){
    state.cartList = payload;
  },
  //清除购物车缓存
  removeCart(state){
    state.cartList = []
  }
}