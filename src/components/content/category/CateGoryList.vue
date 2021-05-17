<template>
  <div id="category-content">
      <div class="left-panel">
        <div v-for="(item,index) in cateList" :key="index" class="left-panel-item" @click="showCateGory(item.title,index)" :class="activeIndex == index? 'active':''">{{item.title}}</div>
      </div>

      <div class="right-list">
        <scroll class="content" ref="scroll" >
          <div v-for="(item,valIndex) in innerList" :key="valIndex" class="innerList">
            <span class="inner-title">{{item.innerTitle}}</span>
            <div class="inner-item-list">
              <div v-for="(innerItem,innerIndex) in item.innerVal" :key="innerIndex" class="innerItem" @click="showClothes(innerItem.id)">
                <img :src="innerItem.img_url" alt="" width="60px" height="60px">
                <span class="inner-item-title">{{innerItem.title}}</span>
              </div>
            </div>
          </div>
        </scroll>
      </div>
  </div>

</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import { getCategory } from "network/category";

export default {
    name: "CateGoryList",
    data(){
      return {
        cateList:[],
        activeIndex: 0,
        innerList:[],
        scroll:null
      }
    },
    components:{
      Scroll
    },
    created() {
      this.fetchData();
    },
    methods:{
      showCateGory(title,index){
        this.activeIndex = index;
        let res = this.cateList.filter((item)=>{
          return item.title == title
        })
        this.innerList = res[0]['val'];
      },
      showClothes(id) {
        this.$router.push('/search/'+id)
        // setTimeout(()=>{
        //   location.reload()
        // },200)
      },
      async fetchData() {
        await getCategory().then(res=>{
          this.cateList = res.data;
          this.innerList = this.cateList[0]['val'];
          console.log(this.innerList)
        })
      },
    },
    activated() {
      this.$refs.scroll.refresh();
    },

  }
</script>

<style scoped>
  #category-content {
    height:  calc(100% - 44px - 49px);
    margin-top: 44px;
  }

  .content {
    height: 100%;
  }
  .left-panel {
    width: 23%;
    position: absolute;
    left: 0;
    right: 0;
    text-align: center;
  }

  .right-list {
    width: 74.3%;
    position: absolute;
    right: 10px;
    bottom: 49px;
    top:44px;
  }

  .left-panel-item {
    width: 100%;
    padding: 20px 0px;
    color:#2f3742;

  }
  .active {
    color:#F5511D;
    font-size: 18px;
  }

  .innerList {
    width: 100%;
    margin:10px auto;
    background-color: #fff;
    border-radius: 15px;
  }
  .inner-title {
    display: block;
    width: 100%;
    font-weight: 550;
    font-family: "微软雅黑";
    padding: 15px 15px 5px 15px;
    font-size: 16px;
    color:#000;
  }
  .inner-item-list {
    display: flex;
    flex-wrap: wrap;
    margin:10px 10px;
  }
  .innerItem {
    width: 60px;
    height: 90px;
    margin: 20px 13px;
    font-size: 12px;
    color:#000;
    text-align: center;
  }
  .inner-item-title {
    position: relative;
    bottom: -10px;
  }
</style>
