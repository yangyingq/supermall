<template>
  <div class="select-item">
    <div class="select-title" @click="showList">
      {{isSelected}}
    </div>
<!--    <div class="selected-list" v-show="show">-->
<!--      <li v-for="(item,index) in titles" :key="index" @click="selectChange(index)">{{item}}</li>-->
<!--    </div>-->
  </div>
</template>

<script>
  export default {
    name: "SelectBarItem",
    data(){
      return {
        isSelected:"综合",
        show:false
      }
    },
    props:{
      titles:{
        type:Array,
        default(){
          return []
        }
      }
    },
    methods:{
      showList(){
        this.$emit('showList',this.titles)
      },
      selectChange(index){
        this.isSelected = this.titles[index]
        this.show = false
        // this.$emit('selectChange',index)
      }
    }
  }
</script>

<style scoped>
  .select-title {
    height: 50px;
    /*background-color: pink;*/
    line-height: 50px;
    font-size: 14px;
  }
  .selected-list {
    width: 100%;
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
</style>
