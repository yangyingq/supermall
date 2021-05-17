<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
      <tab-control
        :titles="titles"
        @tabClick = "tabClick"
        ref="tabControl1"
        class="tab-control"
        v-show="isTabFixed">
      </tab-control>
      <scroll class="content"
              ref="scroll"
              :probe-type="3"
              :pullContent = "pullContent"
              :pull-up-load="true"
              @scroll="contentScroll"
              @pullingUp="loadMore">
        <home-swiper
          :banner="banners"
          @swiperImageLoad="swiperImageLoad">
        </home-swiper>
        <recommend-view :recommends = "recommends"></recommend-view>
        <feature-view ></feature-view>
        <tab-control
          :titles="titles"
          @tabClick = "tabClick"
          ref="tabControl2">
        </tab-control>
        <goods-list :goods="showGoods"></goods-list>
      </scroll>
      <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>

import NavBar  from "components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
import TabControl from "components/content/TabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import {getToken,getHomedata,getHomeGoods} from "@/network/home";//请求首页数据
import Scroll  from "components/common/scroll/Scroll";
import {debounce} from "common/utils.js"
import {BackTopMixin} from "common/mixin";

export default {
  name: "Home",
  components:{
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,

  },
  data (){
    return{
      banners:['http://oss.gdkclp.com/case/2020/12/KCKP202012270003/1609079577708.jpeg','http://oss.gdkclp.com/case/2020/12/KCKP202012270003/1609079580690.jpeg','http://oss.gdkclp.com/case/2020/12/KCKP202012290001/1609229037501.jpeg'],
      recommends:[],
      titles:['流行','新款','精选'],
      goods:{
        pop:{ page:0,list:[],saveY:0 },
        new:{ page:0,list:[],saveY:0 },
        sell:{ page:0,list:[],saveY:0 }
      },
      currentType:'pop',
      taboffsetTop:0,
      isTabFixed:false,
      saveY:0,
      pullContent:"",
    }
  },
  mixins:[BackTopMixin],
  created () {
    //1.请求首页数据
    // getToken().then(res=>{
    //   let token = res.data.token;
    //   sessionStorage.setItem('token',token);
    // });
    this.Homedata()
    //2.请求商品数据
    this.HomeGoods('pop')
    this.HomeGoods('new')
    this.HomeGoods('sell')

  },
  mounted () {
    //监听item 中图片加载事件
    const refresh = debounce(this.$refs.scroll.refresh,50)
    this.$bus.$on('itemImageLoad',()=>{
      refresh()
    })

  },
  activated() {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0,this.saveY,0)
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY()
    //取消全局事件
    this.$bus.$off('itemImageLoad','');
  },
  computed:{
    showGoods () {
      return this.goods[this.currentType].list
    }
  },

  methods:{

    /**
     *  商品类型点击切换
     */

    tabClick(index){
      // console.log(index)
      this.goods[this.currentType].saveY = this.$refs.scroll.getScrollY();
      switch (index){
        case 0:
          this.currentType='pop'
          break;
        case 1:
          this.currentType='new';
          break;
        case 2:
          this.currentType='sell';
          break;
      }
      this.$refs.scroll.scrollTo(0,this.goods[this.currentType].saveY,0)
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index

    },


    /**
     *  火箭小图标的隐藏和显示
     */
    contentScroll(position){
      //1.判断backtop是否显示
      this.isShowBackTop = (-position.y)>1000
      //2.tabControl是否吸顶(position:fixed)
      this.isTabFixed = (-position.y-100) >this.taboffsetTop
    },

    /**
     *  加载更多数据
     */
    loadMore(){
      this.pullContent = "正在加载中"
      this.HomeGoods(this.currentType)
    },

    //获取tabcontrol的offset $el：获取组件原生的div
    swiperImageLoad(){
      this.taboffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    /**
     * 网络监听相关
     * @constructor
     */
    Homedata(){
      getHomedata().then(res=>{
        this.recommends = res.data.recommends;
      })
    },
    HomeGoods(type){
      const page = this.goods[type].page+1
      getHomeGoods(type,page).then(res=>{
        this.goods[type].list.push(...res.data) //追加数组
        this.goods[type].page +=1
        this.$refs.scroll.finishPullUp()
        this.pullContent = ""
      })
    }
  },

  destroyed() {
    console.log('destoryed');
  }
}
</script>

<style scoped>
/*#scoped 是作用域*/
  #home{
    padding-top:44px;
  }
  .home-nav{
    background-color: var(--color-tint);
    color:#ffffff;
  }
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tab-control{
    position: relative;
    z-index: 9;
  }

</style>
