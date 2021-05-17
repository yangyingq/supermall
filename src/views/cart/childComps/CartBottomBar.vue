<template>
  <div class="bottom-bar">
    <div class="check-area">
      <check-button :isCheck="allSelect" @click.native="selectAll"></check-button>
      <span>全选</span>
    </div>
    <div class="price">
      合计： {{totalPrice}}
    </div>
    <div class="calculate">
      去计算:({{calculateLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
import  { mapGetters } from 'vuex';

  export default {
    name: "CartBottomBar",
    components:{
      CheckButton
    },
    computed: {
        ...mapGetters(['totalPrice','cartLength','calculateLength']),
        allSelect(){
          if(this.$store.state.cartList.length === 0){
            return false;
          }
          return !this.$store.state.cartList.find(item=>!item.checked)
        }
      },
    methods:{
      selectAll(){
        this.$store.dispatch('selectAll',this.allSelect)
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    display: flex;
    height: 40px;
    background-color: #eee;
    position:relative;
    line-height: 40px;
  }
  .check-area {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }
  .check-button {
    line-height: 20px;
    height: 20px;
    width: 20px;
    margin-right: 5px;
  }

  .price {
    margin-left: 20px;
  }

  .calculate {
    background-color: red;
    width:80px;
    height: 100%;
    color:#fff;
    font-size: 15px;
    text-align: center;
    position: absolute;
    right: 0;
  }
</style>
