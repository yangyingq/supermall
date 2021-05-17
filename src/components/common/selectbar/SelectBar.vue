<template>
  <div id="select-bar">
      <div class="select-bar-list">
        <div
          class="select-bar-item"
          v-for="(item,index) in selectList"
          :key="index"
          @click="showSelectList(index)">
          <div class="select-title" >
            <span :class="item.isSelected == 0? '':'active'">{{ getTitles(item,item.isSelected) }}</span>
            <img src="~assets/img/common/arrow-bottom.svg" alt="" class="icon-style" v-show="item.iconShow">
            <img src="~assets/img/common/arrow-top.svg" alt="" class="icon-style" v-show="!item.iconShow">
          </div>
        </div>
      </div>
      <div class="selected-list" v-show="show">
        <li v-for="(item,index) in showList" :key="index" @click="selectChange(index)" :class="selectList[selectIndex].isSelected == index? 'active':' '">{{item}}</li>
      </div>
  </div>
</template>

<script>
  export default {
    name: "SelectBar",
    props: {
      selectList:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return {
        show:false,
        showList:[],
        selectIndex:0,//显示对应下标的list
        iconShow:true
      }
    },
    methods:{
      getTitles(item,index){
        return item['option'][index];
      },
      showSelectList(index){
        this.showList = this.selectList[index].option
        if(this.selectIndex == index){
          this.show = !this.show
        }else{
          this.show = true
          //不同item之间直接切换时，将所有图标重置，然后点击的item再取反
          this.selectList.forEach((item)=>{
            item.iconShow = true
          })
        }
        this.selectIndex = index
        this.selectList[index].iconShow = !this.selectList[index].iconShow //图标显示
      },
      selectChange(index){
        this.selectList[this.selectIndex].isSelected = index
        this.selectList[this.selectIndex].iconShow = !this.selectList[this.selectIndex].iconShow //选择完毕后关闭下拉框，更换图标
        this.show = false
        this.$emit('selectChange',index,this.selectIndex)
      }
    }
  }
</script>

<style scoped>
  #select-bar {
    position: relative;
    top:50px;
    width: 100%;
    z-index:999;
  }
  .select-bar-list {
    display: flex;
    height: 50px;
    line-height: 50px;
    width: 100%;
    display:flex;
    flex: 1;
  }
  .select-bar-item {
    /*flex: 1;*/
    width: 25%;
    text-align: center;
  }

  .select-title {
    /*background-color: pink;*/
    font-size: 14px;
  }
  .selected-list {
    horiz-align:center;
    background-color: #fff;
    border-bottom: 1px solid #eee;
    border-radius: 10px;
  }

  .selected-list li {
    width: 90%;
    font-size: 13px;
    line-height: 20px;
    padding:10px;
    margin-left: 5%;
    list-style: none;
    border-top: 1px solid #eee;
  }

  .icon-style {
    width: 10px;
    height: 10px;
    margin-left: 5px;
  }

  .active {
    color:#FF5000;
  }

</style>
