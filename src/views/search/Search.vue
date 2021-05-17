<template>
  <div class="search-content">
    <search-nav-bar class="nav-bar"></search-nav-bar>
    <select-bar
      :select-list="titles"
      class="select-bar"
      ref="select1"
      @selectChange="selectChange">
    </select-bar>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @scroll="contentScroll"
            @pullingUp="loadMore"
            >
      <goods-list 
        :goods="goodList" 
        v-loading="goodLoad"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        ></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import SearchNavBar from "views/search/childComps/SearchNavBar";
import TabControl from "components/content/TabControl/TabControl";
import SelectBar from "components/common/selectbar/SelectBar";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";
import { getCateGoodList } from "@/network/category";
import {BackTopMixin} from "common/mixin";
  export default {
    name: "Search",
    components:{
      SearchNavBar,
      TabControl,
      SelectBar,
      GoodsList,
      BackTop,
      Scroll
    },
    data(){
      return {
        titles:[
          {
            isSelected:0,
            iconShow:true,
            option: ['全部','杭州','织里','广州','虎门'],
          },
          {
            isSelected:0,
            iconShow:true,
            option:['综合','价格降序','价格升序']
          }
        ],
        form:{
          provider:"全部",
          id:"",
          page:1,
          orderBy:"综合"
        },
        goodLoad:true,
        isShowSelect:true,
        goodList:[],
        isTabFixed:false,
        taboffsetTop:0
      }
    },
    mixins:[BackTopMixin],
    activated() {

    },
    deactivated() {
      console.log('unactive')
    },
    created() {
      this.form.id = this.$route.params.cate_id;
      this.fetchData();
      this.$bus.$on('itemImageLoad',()=>{
        this.goodLoad = false
        console.log(this.goodLoad)
    })
    },
    methods:{
      selectChange(index,selectIndex) {
        if (selectIndex == 0) {
          this.form.provider = this.titles[0].option[index]
        }else if(selectIndex == 1){
          this.form.orderBy = this.titles[1].option[index]
        }
        this.goodList = []
        this.form.page = 1
        this.fetchData()
      },
      contentScroll(position){
        //1.判断backtop是否显示
        this.isShowBackTop = (-position.y)>1000
        //2.tabControl是否吸顶(position:fixed)
        this.isShowSelect = (-position.y-100) >this.taboffsetTop
      },
      loadMore(){
        this.fetchData()
      },
      fetchData(){
        getCateGoodList(this.form).then((res)=>{
          this.goodList.push(...res.data.data) //追加数组
          this.form.page += 1
          this.$refs.scroll.finishPullUp()
        })
      }
    },
    destroyed() {

    }
  }
</script>

<style scoped>
  .search-content {
    height: 100vh;
    background-color: #F2F2F2;
  }
  .nav-bar {
    height: 50px;
    line-height: 50px;
    background-color: #F2F2F2;
  }

  .content{
    overflow: hidden;
    position: absolute;
    top: 100px;
    bottom:0;
    left: 0;
    right: 0;
    z-index:0;
  }
  .select-bar {
    background-color: #fff;
  }
</style>
