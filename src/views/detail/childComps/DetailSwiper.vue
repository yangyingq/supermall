<template>
  <div class="detail-swiper">
    <swiper>
      <swiper-item  v-for="(item,index) in topImage" :key="index">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
  export default {
    name: "DetailSwiper",
    components:{
      Swiper,
      SwiperItem
    },
    props:{
      topImage:{
        type:Array,
        default(){
          return [];
        }
      }
    },
  }
</script>

<style scoped>
  .detail-swiper{

  }
</style>
