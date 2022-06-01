<template>
  <header class="weather-header">
    <div class="img-wrap">
      <img
        class="img"
        :src="require('@/assets/images/profile_default.png')"
        alt="스팟버디"
      />
    </div>
    <p class="main">스팟 버디</p>
    <p class="sub">버디의 날씨를 알려드려요!</p>
  </header>
</template>

<script>
  export default {
    name: "weather-header"
  };
</script>

<style lang="scss" scoped>
  .weather-header {
    margin-top: calc(48px + 37px);
    .img-wrap {
      margin: 0 auto 16px;
      width: 96px;
      height: 96px;
      box-sizing: border-box;
      .img {
        width: 100%;
        height: 100%;
      }
    }
    .main {
      margin-bottom: 2px !important;
      color: #1e1e1e;
      font-size: 18px;
      font-weight: 500;
      line-height: 27px;
      letter-spacing: -0.72px;
      text-align: center;
    }
    .sub {
      margin-bottom: 26px !important;
      color: #999;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: -0.56px;
      text-align: center;
    }
    border-bottom: 8px solid #f0f0f0;
  }
</style>
