<template>
  <div class="profile">
    <nav-bar class="home-nav"><div slot="center">个人中心</div></nav-bar>
    <div id="profile">
      <div class="user-info">
        <img :src="userInfo.avatar">
        <span v-show="isShow">去登录</span>
        <span>{{ userInfo.mobile }}</span>
        <span class="edit">编辑</span>
      </div>
      <div class="address" @click="address">
        <span >我的收货地址</span>
        <img src="~assets/img/common/arrow-right.svg" alt="" class="svg-style">
      </div>
      <div class="order">
        <span>我的订单</span>
        <img src="~assets/img/common/arrow-right.svg" alt="" class="svg-style">

      </div>
      <div class="advice" @click="advice">
        <span>反馈意见</span>
        <img src="~assets/img/common/arrow-right.svg" alt="" class="svg-style">

      </div>
      <div class="about">
        <span>关于强服</span>
        <img src="~assets/img/common/arrow-right.svg" alt="" class="svg-style">
      </div>

      <div class="logout" @click="logout">
        退出登陆
      </div>
    </div>
    <confirm ref="confirm" @execute="execute"></confirm>
  </div>
</template>

<script>
import Confirm from "components/common/confirm/Confirm";
import NavBar from "components/common/navbar/NavBar";
import empty from "../../../../fantastic-admin-master/src/layout/empty";
  export default {
    name: "Profile",
    components:{
      NavBar,
      Confirm
    },
    created() {
      let str = localStorage.getItem('userInfo')
      if(!str){
        this.$router.push('/login')
        return false
      }
      this.userInfo = JSON.parse(str)['info']
    },
    data(){
      return {
        isShow:false,
        userInfo:{}
      }
    },
    methods:{
      advice(){
        this.$router.push('/profile/advice')
      },
      address(){
        this.$router.push('/profile/address')
      },
      logout(){
        localStorage.removeItem('userInfo')
        this.$refs.confirm.show('退出登陆')
        // this.$router.push('/login')
      },
      execute(){
        this.$refs.confirm.cancel()
        this.$store.commit('removeUserInfo')
        this.$router.push('/login')
      },

    }
  }
</script>

<style scoped>
  .profile {
    background-color: #eee!important;
    height: 100vh;
  }
  .home-nav {
    background-color: var(--color-tint);
    color:#fff;
  }
  #profile {
    width: 100%;
    /*background-color: yellow;*/
    margin-top:50px;
  }

  #profile div {
    background-color: #ffffff;
    height: 50px;
    padding: 0 20px;
    line-height: 50px;
    margin:0 0 20px 0 ;
  }
  .svg-style {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 20px;
    margin-top:15px;
    vertical-align: middle;
  }
  .user-info {
    background-color:#fff;
    height: 100px !important;
    display: flex;
    align-items:center;
    font-size: 16px;
  }
  .user-info img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  .user-info span {
    margin-left: 10px;
    font-size:14px;
  }
  .edit {
    flex: 1;
    text-align: right;
  }
  .logout {
    text-align: center;
  }


</style>
