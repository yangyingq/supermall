<template>
  <div class="goods">
    <goods-list-item v-for="(item,index) in goods" :goods-item="item":key="index"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "components/content/goods/GoodsListItem";
export default {
  name: "GoodsList",
  components:{
    GoodsListItem,
  },
  props:{
    goods:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
  .goods{
    display: flex;/*根据模块进行均等分*/
    flex-wrap: wrap;/*规定灵活的项目在必要的时候拆行或拆列。*/
    justify-content: space-around;
    padding:2px;
  }
</style>
