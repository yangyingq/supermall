<template>
  <div v-if="Object.keys(paramInfo).length !== 0" class="param-info">

    <div class="info-key">商品参数</div>
    <div class="info-list">
      <img :src="paramInfo.size_image"  alt="">
      <img :src="paramInfo.size_image1"  alt="">
    </div>
  </div>
</template>

<script>
	export default {
		name: "DetailParamInfo",
    props: {
      paramInfo: {
        type: Object
      }
    },
    data() {
			return {

      }
    },
    methods: {

    },
	}
</script>

<style scoped>
  .param-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
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
