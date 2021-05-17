<template>
  <div class="advice">
    <nav-bar class="advice-nav">
      <div slot="left" @click="back">
        <img src="~assets/img/common/arrow-left-white.svg" alt="">
      </div>
      <div slot="center">意见反馈</div>
    </nav-bar>
    <div class="word">
      <span class="title">问题和意见</span>
      <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="textarea"
        maxlength="200"
        show-word-limit
        class="text-area"
      >
      </el-input>
    </div>

    <div class="picture">
      <span class="title">图片（选填，提供问题截图）</span>
      <el-upload
        class="upload-div"
        action="http://testapi.baotongbt.com/V1/upload"
        multiple
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :before-upload="beforeUpload"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>

    <div class="contact">
      <span class="title">联系电话</span>
      <input type="text" v-model="mobile" placeholder="选填，便于我们与您联系">
    </div>

    <div class="submit">
      <button>提交</button>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
  export default {
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        textarea: '',
        mobile:''
      };
    },
    components:{
      NavBar
    },
    methods: {
      back(){
        this.$router.back();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      beforeUpload(file) {
        console.log(file.type)
      }
    }
  }
</script>

<style scoped>
  .advice {
    background-color: #F0EFF7;
    height: 100vh;
  }
  .advice-nav {
    background-color: var(--color-tint);
    color:#fff;
    font-size: 15px;
  }
  .advice-nav img {
    margin-top:8px;
    width: 30px;
    height: 30px;
  }
  .word {
    margin-top:44px;
  }
  .title {
    display: block;
    height: 40px;
    width: 100%;
    line-height: 40px;
    font-size: 14px;
    padding: 0 20px;
  }
  .picture {
    width: 100%;
    margin-top: 20px;
    background-color: #fff;
  }
  .upload-div {
    padding: 20px;
  }
  /deep/ .el-textarea__inner {
    height: 100px;
    border: none;
  }
  /deep/ .el-upload--picture-card {
    width: 80px;
    height: 80px;
    line-height: 80px;
  }
  /deep/ .el-upload-list__item {
    width: 70px;
    height: 80px;
  }
  .contact input {
    border: none;
    height: 40px;
    outline: none;
    width: 100%;
    font-size: 14px;
    padding-left: 20px;
  }
  .submit {
    width: 100%;
    padding: 30px 20px;
  }
  .submit button {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    background-color: #1AAC19;
    border: none;
    outline: none;
    color:#fff;
  }
</style>
