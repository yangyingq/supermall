export  default  {
  cartLength(state) {
    return state.cartList.length;
  },
  cartList(state) {
    return state.cartList;
  },
  totalPrice(state) {
    return "￥" + state.cartList.filter(item => {
      return item.checked
    }).reduce((preValue, item) => {
      let price = Number(item.price.substring(1)).toFixed(2)
      return preValue + price * item.temp_count
    }, 0).toFixed(2)
  },
  calculateLength(state){
    return state.cartList.filter(item =>{
      return item.checked
    }).length;
  },
  getAccessToken(state){
    return state.accessToken
  }
}
