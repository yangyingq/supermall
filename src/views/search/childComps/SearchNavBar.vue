<template>
  <nav-bar >
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="search">
      <input type="text" :placeholder="searchContent" class="search-input">
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "SearchNavBar",
  components:{
    NavBar
  },
  data(){
    return {
      searchContent:"",
    }
  },
  methods: {
    backClick(){
      this.$router.back(-1);
    }
  }
}
</script>

<style scoped>
  .back {
    margin-top: 5px;
  }
  .search-input {
    border: 2px solid #DD8247;
    outline: none;
    background-color: rgba(0, 0, 0, 0);
    height: 35px;
    border-radius: 20px;
    width: 100%;
    padding-left:20px;
  }
</style>
