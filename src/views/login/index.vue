<template>
  <div id="login">
    <div class="logo" align="center">
      <img src="~assets/img/profile/logo.svg" alt="">
    </div>
    <div class="form">
      <div class="login-input" v-model="form">
        <input type="text" placeholder="手机号/邮箱/会员名" v-model="form.mobile">
        <input type="password" placeholder="请输入登陆密码"  show-password v-model="form.password">
      </div>
      <div class="login-line">
        <span class="sms-login" @click="smsLogin">短信验证码登陆</span>
        <span class="register" @click="toRegister">免费注册</span>
      </div>
      <div class="login-btn">
        <button type="submit" @click="login">登陆</button>
      </div>
    </div>
  </div>
</template>

<script>
import { loginPassword } from "network/user";

export default {
  name: "login",
  data(){
    return {
      form:{
        mobile:'',
        password:''
      }
    }
  },
  computed:{
    verify:function () {
      if (!/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(this.form.mobile)) {
        return {"flag": false, "msg": '请填写有效手机号码'};
      }
      if (!this.form.password){
        return {"flag": false, "msg": '请输入密码'};
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
      loginPassword(this.form).then(res=>{
        console.log(res)
        if(res.data.code == 200){
          this.$toast.show(res.data.msg)
          localStorage.setItem('userInfo',JSON.stringify(res.data.data))
          this.$store.commit('setUserInfo',res.data.data)
          setTimeout(()=>{
            this.$router.push('/profile')
          },500)
        }
        else{
          this.$toast.show(res.data.msg)
        }
      })
    },
    toRegister(){
      this.$router.push('/register')
    },
    smsLogin(){
      this.$router.push('/loginMobile')
    }
  }
}
</script>

<style scoped>
  #login {
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
    border-bottom: 1px solid #FF5000;
    width:100% ;
    height: 40px;
    margin: 10px 0;
  }

  .login-line {
    margin:20px 0;
    height: 30px;
    font-size: 14px;
  }
  .sms-login {
    float: left;
  }
  .register {
    float: right;
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
