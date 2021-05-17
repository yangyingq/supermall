<template>
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
    <div class="header">
      <span class="info-key">用户评价</span>
      <span class="info-more" @click="loadMore">更多</span>
      <img src="~assets/img/common/arrow-left.svg" alt="">
    </div>

    <div class="comment-body">
      <div class="user-info">
        <img :src="'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3944179354,2656794388&fm=26&gp=0.jpg'" alt="">
        <span> yangyingq </span>
      </div>
      <div class="comment-desc">
        <span>
          知道吗，这款裤子特别好穿，我130斤穿着还不紧呢。我喜欢这个牛仔裤的颜色，很好搭配衣服，裤脚也好看，百搭款啊，大家快买吧，装裤子的袋子是布袋呦，能放别的东西呢。
        </span>
        <span class="date">2021-3-13 18:45 颜色 白（5555）尺码：L</span>
        <img :src="'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1793924994,2353842854&fm=26&gp=0.jpg'" alt="">
        <img :src="'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2957730146,1408954177&fm=26&gp=0.jpg'" alt="">
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "DetailCommentInfo",
    props:{
      commentInfo:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    methods:{
      loadMore(){
        console.log('this is more comment');
      }
    }
  }
</script>

<style scoped>

  .comment-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }

  .header {
    border-bottom: 2px solid #f2f5f8;
    padding-bottom: 10px;
  }
  .info-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
  }

  .info-more{
    position: absolute;
    right: 40px;
    color:#333;
    font-size: 14px;
  }

  .header img{
    background-color: #222222;
    width: 20px;
    height: 20px;
    position: absolute;
    right: 15px;
    margin-top:-2px;
  }
  .comment-body {
    margin:10px 0px 20px 10px;
  }

  .user-info img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .user-info span {
    position: relative;
    top:-20px;
    left: 5px;
  }
  .comment-desc {
    margin:10px 15px 10px 0px;
    font-size: 12px;
    color:#969696;
    letter-spacing:0.5px;
  }

  .comment-desc img {
    width: 50px;
    height: 50px;
    flex:1;
    margin: 10px 7px 10px 0px;
  }
  .date {
    display: block;
    margin-top:10px;
  }



</style>
