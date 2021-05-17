<template>
    <div class="wrapper" ref="wrapper">
      <div class="content">
        <slot></slot>
      </div>
      <span class="pull-content">{{ pullContent }}</span>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: "Scroll",
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default: false
    },
    pullContent:{
      type:String,
      default(){
        return ""
      }
    }
  },
  data(){
    return{
      scroll:null,
    }
  },
  mounted() {
    // 1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      observeDOM:true,
      click:true,
      probeType:this.probeType,/*2=监听滚动但忽略惯性滚动；3=监听实时滚动包括惯性滚动*/
      pullUpLoad:this.pullUpLoad
    })

    //2.监听滚动条
    if(this.probeType == 2 || this.probeType==3){
      this.scroll.on('scroll',(position)=>{
        this.$emit('scroll',position)

      })
    }

    //3.上拉加载更多
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp',()=>{
        this.$emit('pullingUp')
      })
    }
  },

  methods:{
    scrollTo(x,y,time=300){
      this.scroll && this.scroll.scrollTo(x,y,time)
    },

    refresh(){
      this.scroll.refresh()
    },

    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    },

    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  }

}
</script>

<style scoped>
  .pull-content {
    position: absolute;
    bottom: 1px;
    z-index: 100;
    font-size: 13px;
  }
</style>
