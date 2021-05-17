<template>
  <div class="login-mobile">
    <div class="logo" align="center">
      <img src="~assets/img/profile/logo.svg" alt="">
    </div>
    <div class="form">
      <div class="login-input" v-model="form">
        <input type="text" placeholder="手机号" v-model="form.mobile">
      </div>
      <div class="verify">
        <input  placeholder="请输入手机验证码" v-model="form.code">
        <span style="color:#ff6500;margin-left: 40px;" @click="getCode" v-show="timeShow">获取验证码</span>
        <span v-show="!timeShow" style="font-size: 14px;">{{timeCount}} s后可以重新获取</span>
      </div>
      <div class="login-line">
        <span class="password-login" @click="passLogin">密码登陆</span>
      </div>
      <div class="login-btn">
        <button type="submit" @click="login">登陆</button>
      </div>
    </div>
  </div>
</template>

<script>
import {getLoginCode, loginMobile} from "network/user";
  export default {
    name: "loginMobile",
    data(){
      return {
        timeCount:10,
        timeShow:true,
        form:{
          mobile:'',
          code:''
        }
      }
    },
  computed:{
    verify:function () {
      if (!/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(this.form.mobile)) {
        return {"flag": false, "msg": '请填写有效手机号码'};
      }
      return {"flag": true};
    }
  },
  methods:{
    login(){
      if(!this.verify.flag){
        this.$toast.show(this.verify.msg)
        return false
      }
      loginMobile(this.form).then(res=>{
        if(res.data.code == 200){
          this.$toast.show(res.data.msg)
          this.$store.commit('setUserInfo',res.data.data)
          setTimeout(()=>{
            this.$router.push('/profile')
          },500)
        }else{
          this.$toast.show(res.data.msg)
        }
      })
    },
    getCode(){
      if(!this.verify.flag){
        this.$toast.show(this.verify.msg)
        return false
      }
      getLoginCode(this.form.mobile).then((res)=>{
        this.$toast.show(res.data.msg)
        this.timeShow = false
        for (let i=1;i<=10;i++){
          setTimeout(()=>{
            this.timeCount = this.timeCount-1;
          },i*1000)
        }
      })
    },
    passLogin(){
      this.$router.push('/login')
    }
  },
  watch:{
    timeCount(val, oldVal){//普通的watch监听
      if(val == 0){
        this.timeCount = 10
        this.timeShow = true
      }
    },
  }
}
</script>

<style scoped>
  .login-mobile {
    height: 60vh;
  }
  .logo {
    height: 200px;
  }
  .logo img {
    width: 80px;
    height: 80px;
    margin-top:100px;
  }
  .form {
    height: calc( 60vh - 200px);
    padding:20px;
  }

  .form input {
    border: 0;
    outline: none;
    width: 60%;
    height: 40px;
    margin: 10px 0;
  }
  .verify {
    width: 100%;
    border-bottom: 1px solid #FF5000;
  }
  .login-input {
    width: 100%;
    border-bottom: 1px solid #FF5000;
  }
  .login-line {
    margin:20px 0;
    height: 30px;
    font-size: 14px;
  }

  .login-btn {
    width: 100%;
  }
  .login-btn button{
    width: 100%;
    height: 45px;
    border-radius: 15px;
    border:0;
    outline: none;
    background-color: #FF6500;
    color:#fff;
  }
</style>


