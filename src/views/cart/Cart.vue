<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <cart-list></cart-list>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import CartList from "views/cart/childComps/CartList";
  import CartBottomBar from "views/cart/childComps/CartBottomBar";
  import {mapGetters} from 'vuex';
  export default {
    name: "Cart",
    components:{
      NavBar,
      CartList,
      CartBottomBar
    },
    computed:{
      // ...mapGetters(
      //   ['cartLength']
      // )
      ...mapGetters({
        length:'cartLength',
        list:'cartList'
      })
    },
    activated() {
      console.log(this.list)
    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }
  .nav-bar {
    background-color:var(--color-tint) ;
    height: 44px;
    color:#fff;
  }
</style>
