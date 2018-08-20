<template>
    <div class="errordetails perW100 perH100">
        <div class="searchVal _cus_flexContent _cus_fleAlignCen">
            <span class="search_back" @click="city_back"></span>
        </div>
        <div class="network_box">
            <img src="../../../static/imgs/error.png" alt="">
            <p class="error_text">该内容已下线</p>
        </div>
       
    </div>
</template>
<script>
export default {
  methods: {
    city_back() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="less">
.errordetails {
  height: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  .network_box {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    >img{
      width: 1.4rem;
      height: 1.4rem;
    }
  }
  .error_text {
    color: #aaa;
    font-size: .32rem;
    margin-top: .5rem;
  }
  .searchVal {
    width: 100%;
    height: 1rem;
    color: #fff;
    display: flex;
    line-height: 1rem;
    text-align: center;
    background: #f41a14;
    z-index: 2;
    .username_ready {
      position: absolute;
      right: 0.3rem;
    }
    .search_back {
      width: 0.22rem;
      height: 0.4rem;
      margin-left: 0.3rem;
      display: inline-block;
      background: url("../../../static/imgs/back.png") center center no-repeat;
      background-size: contain;
      z-index: 10;
    }
    .search_box {
      height: 0.6rem;
      color: #fff;
      flex: 1;
      position: relative;
      overflow: hidden;
      border: 2px solid #fff;
      border-radius: 0.1rem;
      .search_icon {
        width: 0.3rem;
        height: 0.3rem;
        background: url("../../../static/imgs/search.png") center center
          no-repeat;
        background-size: 0.3rem 0.3rem;
        z-index: 1;
        top: 0;
        left: 1.5rem;
        bottom: 0;
        margin: auto;
      }
      .search_mode {
        width: 100%;
        height: 0.6rem;
        line-height: 0.6rem;
        padding-left: 2rem;
        outline: 0;
        text-align: left;
        box-sizing: border-box;
        display: block;
        font-size: 0.24rem;
        background-color: #f41a14;
        color: #fff;
        &::-webkit-input-placeholder {
          /*WebKit browsers*/
          color: #fff;
        }
        &::-moz-input-placeholder {
          /*Mozilla Firefox*/
          color: #fff;
        }
        &::-ms-input-placeholder {
          /*Internet Explorer*/
          color: #fff;
        }
      }
    }
    .search_city {
      height: 0.5rem;
      line-height: 0.5rem;
      //              margin: 0 0.3rem;
      margin-right: 0.3rem;
    }
    .city_text {
      position: absolute;
      left: 0;
      width: 100vw;
      text-align: center;
      height: 1rem;
      line-height: 1rem;
      font-size: 0.32rem;
    }
  }
}
</style>


