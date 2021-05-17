<template>
  <div id="confirm" v-show="isShow">
    <div class="content" >
      <div class="tips">
        <span>操作提示</span>
        <span class="tips-1">确认{{tips}}吗？</span>
      </div>
      <div class="operation">
        <span class="cancel" @click="cancel">取消</span>
        <span class="execute" @click="execute">确认</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Confirm",
  data(){
    return {
      isShow:false,
      tips:""
    }
  },
  methods:{
    show(tips){
      this.isShow = true
      this.tips = tips
    },
    cancel(){
      this.isShow = false
      this.tips = ""
    },
    execute(){
      this.$emit('execute');
    }
  }
}
</script>

<style scoped>
  #confirm {
    position: absolute;
    top:0;
    left: 0%;
    height: 100vh;
    width: 100%;
    background-color: rgba(128, 128, 128, 0.9);
    border-radius: 5px;
    text-align: center;
    padding: 50% 10%;
  }
  .content {
    background-color: #ffffff;
    height: 150px;
  }
  .tips {
    height: 60%;
    line-height: 40px;
    padding: 0 10px;
    border-bottom: 1px solid #eee;
  }
  .tips span {
    display: block;
    font-size:15px;
  }
  .tips-1 {
    color:#666666;
    font-size: 15px;
  }
  .operation {
    height: 40%;
    line-height: 60px;
  }
  .operation span {
    margin:0 40px;
  }
  .execute {
    color:#ff6500;
  }
</style>
