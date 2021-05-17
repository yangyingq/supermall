<template>
  <div class="address-edit">
    <nav-bar class="address-edit-nav">
      <div slot="left" @click="back">
        <img src="~assets/img/common/arrow-left-white.svg" alt="">
      </div>
      <div slot="center">{{ title }}</div>
    </nav-bar>
    <div class="form">
      <div class="form-item">
        <label for="">收件人:</label>
        <input type="text" placeholder="收件人" >
      </div>
      <div class="form-item">
        <label for="">手机号码:</label>
        <input type="text" placeholder="手机号码">
      </div>
      <div class="form-item">
        <label for="">所在地区:</label>
        <el-cascader
          v-model="value"
          :options="options"
          :props="{ expandTrigger: 'hover' }"
          @change="handleChange"></el-cascader>
      </div>
      <div class="form-item">
        <label for="">详细住址:</label>
        <input type="text" placeholder="具体地点">
      </div>
      <div class="save">
        <button class="edit-btn">保存</button>
      </div>

    </div>

  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
  export default {
    name: "addressEdit",
    data(){
      return {
        title: "",
        form: {},
        value: [],
        options: [
          {
            value: 'zhinan',
            label: '指南',
            children: [{
              value: 'shejiyuanze',
              label: '设计原则',
              children: [
                {
                  value: 'yizhi',
                  label: '一致'
                },
                {
                  value: 'fankui',
                  label: '反馈'
                },
                {
                  value: 'xiaolv',
                  label: '效率'
                },
                {
                  value: 'kekong',
                  label: '可控'
                }
              ]
            },
            ]
          }]
      }
    },
    components:{
      NavBar
    },
    methods:{
      back(){
        this.$router.back()
      },
      save(){

      },
      handleChange(value) {
        console.log(value);
      }
    },
    created() {
      if(this.$route.params.address_id == 0){
        this.title = '新增地址'
      }else{
        this.title = '编辑地址'
      }
    }
  }
</script>

<style scoped>
  .address-edit {
    height: 100vh;
  }
  .address-edit input {
    border:none;
    outline: none;
    font-size: 14px;
    padding-left: 10px;
    height: 35px;
    width: 60%;
  }
  .address-edit-nav {
    background-color: var(--color-tint);
    font-size: 15px;
    color:#fff;
  }
  .address-edit-nav img{
    width: 30px;
    height: 30px;
    margin-top:8px;
  }
  .form {
    padding-top:54px ;
    font-size: 14px;
  }
  .form-item {
    background-color: #fff;
    padding: 0 15px;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #F0EFF7;
  }
  .edit-btn {
    background-color: #ff6500;
    border-radius: 10px;
    color:#fff;
    width: 70%;
    height: 40px;
    border:none;
    outline: none;
    margin:30px auto;
  }
  .save {
    display: flex;
    justify-content: center;
  }
</style>
