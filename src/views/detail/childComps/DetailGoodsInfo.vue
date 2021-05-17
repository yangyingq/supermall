<template>
  <div  class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start">
      </div>
      <div class="desc">红色弹力棉质长袜。全幅饰FF流苏细节。弹力罗纹饰边。意大利制造</div>
      <div class="end"></div>
    </div>
    <div class="info-key">商品展示</div>
    <div class="info-list">
      <img v-for="(item, index) in detailInfo.wear_images" :key="index" :src="item" @load="imgLoad" alt="">
    </div>
  </div>
</template>

<script>
	export default {
		name: "DetailGoodsInfo",
    props: {
      detailInfo: {
        type: Object
      }
    },
    data() {
			return {
				counter: 0,
        imagesLength: 0
      }
    },
    methods: {
	    imgLoad() {
        if (++this.counter === this.imagesLength) {
          this.$emit('imageLoad');
        }
	    }
    },
    watch: {
	    detailInfo() {
	      // 获取图片的个数
	    	this.imagesLength = this.detailInfo.wear_images.length
	    }
    }
	}
</script>

<style scoped>
  .goods-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-desc {
    padding: 0 15px;
  }

  .info-desc .start, .info-desc .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }

  .info-desc .start {
    float: left;
  }

  .info-desc .end {
    float: right;
  }

  .info-desc .start::before, .info-desc .end::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }

  .info-desc .end::after {
    right: 0;
  }

  .info-desc .desc {
    padding: 15px 0;
    font-size: 14px;
  }

  .info-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
  }

  .info-list img {
    width: 100%;
  }
</style>
