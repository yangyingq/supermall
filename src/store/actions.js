import { updateCart }  from '../network/cart'

export  default {
  addCart(context,payload){
    return new Promise((resolve,reject)=>{
      // 查找数组中是否有某个商品
      let oldProduct = context.state.cartList.find(item=>item.id === payload.id)
      if (oldProduct) {
        context.commit('addCounter',oldProduct);
        resolve('该商品数量加一')
      }else {
        payload.temp_count = 1;
        context.commit('addToCart',payload)
        updateCart(JSON.stringify(context.state.cartList)).then(res=>{
          if(res.data.code == 200){
            resolve('添加购物车成功！') 
          }else {
            context.commit('moveFromCart',payload)
            resolve('加入失败')
          }
        })
        
      }
    })
  },

  changeChecked(context, payload) {

    let oldProduct = context.state.cartList.find(item=>item.id === payload.id)
    oldProduct.checked = !oldProduct.checked
  },

  selectAll(context,payload) {
    context.commit('selectAll',payload)
  }

}
