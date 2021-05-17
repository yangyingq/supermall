<template>
  <div id="app">
    <keep-alive :include="[ 'Home','Category']">
      <router-view/>
    </keep-alive>
    <main-tab-bar v-if="show"></main-tab-bar>
  </div>
</template>
<script>
  import MainTabBar from "components/content/mainTabbar/MainTabBar";
  export default {
    name:'app',
    components:{
      MainTabBar
    },
    data(){
      return {
        show:true
      }
    },
    watch:{
      $route(e){
        if(e.path.indexOf('search')=='-1'&&e.path.indexOf('advice') == '-1') {
          this.show = true
        }else {
          this.show = false
        }
      }
    }
  }
</script>
<style>
  @import "assets/css/base.css";
  @media screen and (max-width: 500px) {
    .el-message-box{
      width: 300px !important;
    }
    .el-cascader-panel {
      width: 360px !important;
    }
    .el-cascader-menu {
      min-width: 120px !important;
    }
    .el-loading-spinner {
      top:40px !important;
    }
  }
</style>
