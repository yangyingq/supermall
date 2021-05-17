<template>
  <div id="register">
    <div class="back" @click="back">
      <img src="~assets/img/common/back.svg" alt="" v-show = "iconShow" >
      <span>返回登陆</span>
    </div>
    <div class="topic">
      <span class="topic-title">手机号注册</span>
      <span class="welcome">亲，欢迎注册强服账号</span>
    </div>

    <div class="form">
        <div class="register-input">
          <div class="mobile">
            <span>+86</span>
            <img src="~assets/img/common/arrow-bottom.svg" alt="" v-show = "iconShow" >
            <img src="~assets/img/common/arrow-top.svg" alt="" v-show = "!iconShow">
            <input type="text" placeholder="请输入你的手机号码" v-model="form.mobile">
          </div>
          <div class="password">
            <input type="password" placeholder="密码（6-16位）" v-model="form.password" >
          </div>
          <div class="repass">
            <input type="password" placeholder="重新输入密码" v-model="form.repass" >
          </div>
          <div class="verify">
            <input  placeholder="请输入手机验证码" v-model="form.code">
            <span style="color:#ff6500" @click="getCode" v-show="timeShow">获取验证码</span>
            <span v-show="!timeShow" style="font-size: 14px;">{{timeCount}} s后可以重新获取</span>
          </div>
        </div>
        <div class="register-btn" >
          <button type="submit" @click="doRegister" :class="consent?'btn-active':''">同意注册</button>
        </div>
        <div class="agreement">
          <div class="agreement-input">
            <input type="checkbox" style="width: 15px;height: 15px" v-model="consent">
          </div>
          <div class="agreement-message">
            <span>已阅读并同意以下协议</span>
            <span style="color:#ff6500;">强服安全协议、强服隐私协议</span>
          </div>

        </div>
    </div>
  </div>
</template>

<script>
import { register,getVerifyCode } from "network/user";
export default {
  name: "register",
  data(){
    return{
      iconShow:true,
      timeShow:true,
      timeCount:10,
      timer:null,
      consent:true,
      form:{
        mobile:"",
        code:"",
        password:"",
        repass:""
      }
    }
  },
  computed: {
    verify: function () {
      if (!/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(this.form.mobile)) {
        return {"flag": false, "msg": '请填写有效手机号码'};
      }
      if(!this.form.password||this.form.password.length<4||this.form.password.length>16){
        return {"flag":false,"msg":'密码长度请保持在6-16位'}
      }
      if(this.form.repass!=this.form.password){
        return {"flag":false,"msg":'两次输入的密码不同'}
      }
      if (!this.form.code) {
        return {"flag": false, "msg": '请输入验证码'};
      }
      if (!this.consent) {
        return {"flag": false, "msg": '请勾选[同意服务条款]'};
      }
      return {"flag": true, "msg": 'ok'};
    },
    mobile:function () {
      if (!/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(this.form.mobile)) {
        return {"flag": false, "msg": '请填写有效手机号码'};
      }
      return {"flag": true};
    }
  },
  methods:{
    back(){
      this.$router.push('/login')
    },
    getCode(){
      if(!this.mobile.flag){
        this.$toast.show(this.mobile.msg)
        return false
      }
      getVerifyCode(this.form.mobile).then((res)=>{
        this.$toast.show(res.data.msg)
        this.timeShow = false
        for (let i=1;i<=10;i++){
          setTimeout(()=>{
            this.timeCount = this.timeCount-1;
          },i*1000)
        }
      })
    },
    doRegister(){
      if(!this.verify.flag){
        this.$toast.show(this.verify.msg)
      }else{
        register(this.form).then(res=>{
          if(res.data.code == 200){
            this.$toast.show(res.data.msg)
            setTimeout(()=>{
              this.$router.push('/login')
            },1000)
          }else{
            this.$toast.show(res.data.msg)
          }
        }).catch(err=>{
          this.$toast.show(err)
        })
      }
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
#register {
  height: 100vh;
  padding:20px 20px;

}
.back {
  height: 40px;
  width: 40%;
  line-height: 40px;
  margin:0 0 10px 0;
  font-size: 15px;
  color:#FF5000;
}
.back img {
  width: 16px;
  height: 16px;
  margin: -2px 3px;
}
.topic {
  height: 100px;
}
.topic span {
  display: block;
}
.topic-title {
  color:#000;
  font-size: 30px;
}
.welcome {
  margin-top:15px;
  font-size: 16px;
  color:#999999;
}
.register-input div{
  margin:20px 0;
  border-bottom: 1px solid #999999;
}
.form input {
  border: 0;
  outline: none;
  height: 38px;
  width: 200px;
  padding-left: 10px;
}

.mobile img {
  width: 10px;
  margin: 0 5px;
}

.reigster-btn {
  width: 100%;
}
.register-btn button{
  width: 100%;
  height: 45px;
  border-radius: 15px;
  border:0;
  outline: none;
  color:#fff;
}
.btn-active {
  background-color:#ff6500;
}
.agreement {
  font-size: 13px;
  height: 40px;
  line-height: 40px;
  margin-top:30px;
}
.agreement-input {
  float: left;
  margin-top: 2px;
}
.agreement-message {
  float: left;
}
</style>
