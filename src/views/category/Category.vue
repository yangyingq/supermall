<template>
<!--  better-scroll 的基本使用-->
  <div id="category" >
    <nav-bar class="category-nav"><div slot="center">分类</div></nav-bar>
      <CateGoryList></CateGoryList>
  </div>
</template>

<script>

  import NavBar from "components/common/navbar/NavBar";
  import CateGoryList from "components/content/category/CateGoryList";
  export default {
    name: "Category",
    components:{
      NavBar,
      CateGoryList,
    },
    data(){
      return {
      }
    },

    created() {

    },
  }

</script>

<style scoped>
  #category {
    height: 100vh;
    background-color: #F2F2F2;
  }
  .category-nav {
    background-color: var(--color-tint);
    color:#ffffff;
  }
</style>
