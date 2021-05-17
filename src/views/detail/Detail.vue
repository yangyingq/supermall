<template>
  <div id="detail" >
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="detailNavBar"></detail-nav-bar>
    <ul>
      <li>{{$store.state.cartList.length}}</li>
    </ul>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-image="topImage"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="param" ></detail-param-info>
      <detail-comment-info  :comment-info = "commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommendInfo" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top  @click.native="backClick"  v-show="isShowBackTop"></back-top>
<!--    <toast :message="message" :isshow="show"></toast>-->
  </div>
</template>

<script>
  import DetailNavBar from "views/detail/childComps/DetailNavBar";
  import DetailSwiper from "views/detail/childComps/DetailSwiper";
  import DetailBaseInfo from "views/detail/childComps/DetailBaseInfo";
  import DetailShopInfo from "views/detail/childComps/DetailShopInfo";
  import DetailGoodsInfo from "views/detail/childComps/DetailGoodsInfo";
  import DetailParamInfo from "views/detail/childComps/DetailParamInfo";
  import DetailCommentInfo from "views/detail/childComps/DetailCommentInfo";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  // import Toast from "components/common/toast/Toast";
  import {getDetail,getDetailRecommend} from "network/detail";
  import {debounce} from 'common/utils'
  import DetailBottomBar from "views/detail/childComps/DetailBottomBar";
  import {BackTopMixin} from "common/mixin";


  export default {
    name: "Detail",
    data(){
      return{
        good_id:null,
        topImage:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo: {},
        commentInfo:{},
        recommendInfo:[],
        themTops:[],
        getThemeTop:null,
        currentIndex:0,

      }
    },
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      GoodsList,
      Scroll,
    },
    mixins:[BackTopMixin],
    created() {
      this.good_id = this.$route.params.good_id;
      this.getDetailData(this.good_id);
      this.getRecommend();
      this.getThemeTop = debounce(()=>{
        this.themTops = [];
        this.themTops.push(0);
        this.themTops.push(this.$refs.param.$el.offsetTop);
        this.themTops.push(this.$refs.comment.$el.offsetTop);
        this.themTops.push(this.$refs.recommend.$el.offsetTop);
        this.themTops.push(Number.MAX_VALUE);
      },50)
    },
    mounted() {

    },
    updated() {
    },
    methods:{
      getDetailData(id){
        getDetail(id).then((res)=>{
          //轮播图
          this.topImage = res.data.image;
          //商品基础信息
          this.goods = res.data.result;
          //商品商店信息
          this.shop = res.data.store;
          //商品图片展示
          this.detailInfo = res.data.result;
          //尺码信息展示
          this.paramInfo = res.data.result;
          //评论信息
          this.commentInfo = res.data.result;

          // this.$nextTick(()=>{
          //   setTimeout(()=>{
          //     // console.log(this.$refs.param)
          //     // console.log(this.$refs.param.$el.offsetTop)
          //     // console.log(this.$refs.comment)
          //     // console.log(this.$refs.comment.$el.offsetTop)
          //
          //   },700)
          // })
        })
      },
      getRecommend(){
        getDetailRecommend().then(res=>{
          this.recommendInfo = res.data.detailRecommend;
        })
      },
      imageLoad(){
        this.$refs.scroll.refresh();
        this.getThemeTop();
      },
      titleClick(index) {
        this.$refs.scroll.refresh()
        this.$refs.scroll.scrollTo(0,-this.themTops[index]+44,500);
      },
      contentScroll(position) {
        const scrollY = -position.y+44;
        const len = this.themTops.length;
        const theme = this.themTops;

        for(let i=0;i<len-1;i++){
            if( (this.currentIndex!==i)&&(theme[i]<=scrollY)&&(theme[i+1]>=scrollY)){
              this.currentIndex = i;
              this.$refs.detailNavBar.currentIndex = this.currentIndex
            }
        }
        this.isShowBackTop = (-position.y)>1000
      },
      addToCart(){
        this.$store.dispatch('addCart',this.detailInfo).then(res=>{
          this.$toast.show(res)
        })
      }
    },
  }
</script>

<style scoped>

  #detail {
    position:relative;
    z-index:10;
    background-color:#fff;
    height: 100vh;
  }
  .detail-nav {
    position:relative;
    z-index:10;
    background-color:#fff;
  }
  .content {
    height: calc(100% - 44px);
  }

</style>
