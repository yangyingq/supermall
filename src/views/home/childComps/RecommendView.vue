<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.id">
        <img :src="item.img_url" alt="">
        <div>{{item.name}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props:{
    recommends:{
      type:Array,
      default(){
        return [];
      }
    }
  }
}
</script>

<style scoped>
  .recommend{
    display: flex;
    padding: 10px 0 30px;
    border-bottom: 8px solid #eee;
  }
  .recommend-item{
    text-align: center;
    flex: 1;
    font-size: 12px;
  }
  .recommend-item img{
    width: 70px;
    height: 70px;
    border-radius: 50%;

  }
</style>
