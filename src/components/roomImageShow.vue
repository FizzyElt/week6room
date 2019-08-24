<template>
  <div class="img-show-container">
    <div class="img-main-box">
      <img class="main-img" :src="imgUrlList[imgIndex]" />
    </div>
    <div class="img-list-box">
      <img v-for="(item,index) in imgUrlList" :src="item" v-on:click="mainImgChange(index)"/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imgUrlList: Array
  },
  data() {
    return {
      imgIndex: 1
    };
  },
  methods:{
      mainImgChange(index=0){
          this.imgIndex=index;
      }
  }
};
</script>
<style lang="scss" scoped>
.img-show-container {
  display: flex;
  width: 100%;
  height: 600px;
  margin-bottom: 60px;
}
.img-main-box {
  height: 100%;
  width: 80%;
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.1);
}
.img-list-box {
  display: flex;
  width: 20%;
  height: 100%;
  flex-direction: column;
  img {
    cursor: pointer;
    width: 100%;
    height: 33.33333%;
    background-size: cover;
    transition: all 0.3s;
  }
  img:hover{
      transform: translateX(-15px);
  }
}
.main-img {
  //width: 100%;
  height: 100%;
  background-size: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.3);
  border-right: 1px solid rgba(0, 0, 0, 0.3);
}
</style>