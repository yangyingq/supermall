<template>
  <swiper>
    <swiper-item v-for="(item,index) in banner" :key="index">
      <a href="">
        <img :src="item" alt="" @load ="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from "components/common/swiper"

export default {
  name: "HomeSwiper",
  props:{
   banner:{
     type:Array,
     default(){
       return [];
     }
   }
  },
  data(){
    return {
      isload:false
    }
  },
  components:{
    Swiper,
    SwiperItem
  },
  methods:{
    imageLoad(){
      if(!this.isload){
        this.$emit('swiperImageLoad');
        this.isload = true;
      }
    }
  }
}
</script>

<style scoped>

</style>
