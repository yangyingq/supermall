<template>
    <div class="cart-list">
      <scroll class="content" ref="scroll" >
        <Cart-list-item v-for="(item,index) in cartList" :item-info="item" :key="index" ></Cart-list-item>
      </scroll>
    </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";
  import CartListItem from "views/cart/childComps/CartListItem";
  import  { mapGetters } from 'vuex';

  export default {
    name: "CartList",
    components:{
      Scroll,
      CartListItem
    },
    data(){
      return {

      }
    },
    computed:{
      ...mapGetters(['cartList'])
    },
    methods:{
    },
    activated(){
      this.$refs.scroll.refresh();
    }
  }
</script>

<style scoped>
  .cart-list {
    height:  calc(100% - 44px - 49px - 40px);
    margin-top:44px;
  }
  .content {
    height: 100%;
  }
</style>
