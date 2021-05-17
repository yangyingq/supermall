<template>
  <div class="address">
    <nav-bar class="address-nav">
      <div slot="left" @click="back">
        <img src="~assets/img/common/arrow-left-white.svg" alt="">
      </div>
      <div slot="center">收货地址</div>
      <div slot="right" class="add-address" @click="edit(0)">添加地址</div>
    </nav-bar>
    <div class="address-list">
      <div v-for="(item,index) in addressList" class="address-item">
        <div class="item-left">
          <span>{{ item.name }}-{{ item.mobile }}</span>
          <span><i v-show="item.default">默认:</i>{{ item.address }}</span>
        </div>
        <div class="item-right">
          <span @click="edit(item.mobile)">编辑</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
  export default {
    name: "Address",
    components:{
      NavBar
    },
    data() {
      return {
        addressList:[
          {name:'杨应强',mobile:'15217825455',address:'广东省广州市白云区亮帆大厦写字楼b901',default:true},
          {name:'杨应强',mobile:'15217825455',address:'广东省广州市白云区亮帆大厦写字楼b901',default:false},
          {name:'杨应强',mobile:'15217825455',address:'广东省广州市白云区亮帆大厦写字楼b901',default:false},
          {name:'杨应强',mobile:'15217825455',address:'广东省广州市白云区亮帆大厦写字楼b901',default:false},
          {name:'杨应强',mobile:'15217825455',address:'广东省广州市白云区亮帆大厦写字楼b901',default:false},
          {name:'杨应强',mobile:'15217825455',address:'广东省广州市白云区亮帆大厦写字楼b901',default:false},
          {name:'杨应强',mobile:'15217825455',address:'广东省广州市白云区亮帆大厦写字楼b901',default:false}
        ],
        isDefault:true
      }
    },
    methods: {
      back(){
        this.$router.back()
      },
      edit(type){
        this.$router.push('/profile/address/edit/'+type)
      }
    }
  }
</script>

<style scoped>
  .address {
    height: 100vh;
    background-color: #F0EFF7;
  }
  .address-nav {
    background-color: var(--color-tint);
    color:#fff;
    font-size: 15px;
  }
  .address-nav img{
    width: 30px;
    height: 30px;
    margin-top:8px;
  }
  .address-list {
    padding-top:44px;
  }
  .address-item {
    font-size:13px;
    height: 50px;
    display: flex;
    align-items:center;
    background-color: #fff;
    justify-content:space-between;
    margin:20px 0px;
    padding: 0 15px;
  }
  .item-left span {
    display: block;
    margin:2px
  }
  .item-left i {
    color:#ff6500;
    font-size: 12px;
    font-style: normal;
  }
  .item-right  span{
    border-left: 1px solid #000;
    padding-left: 10px;
  }


</style>
