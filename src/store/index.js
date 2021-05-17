import Vue from 'vue'
import Vuex from 'vuex'
import actions from "@/store/actions";
import mutations from "@/store/mutations";
import getters from "@/store/getters";
Vue.use(Vuex)
const state = {
  cartList:[],
  accessToken:'',
  userInfo:{
  }
}
export default new Vuex.Store({
  state:state,
  mutations:mutations,
  actions:actions,
  getters:getters
})
