<template>
  <div class="swiper-container">
    <header class="swiper-header">
      <strong class="header-title">우리 구단 이야기</strong>
    </header>
    <swiper class="swiper-wrapper" :options="swiperOption">
      <slot name="swiper-card-list" />
    </swiper>
  </div>
</template>

<script>
  export default {
    name: "swiper-container",
    data() {
      return {
        swiperOption: {
          slidesPerView: "auto",
          freeMode: true
        }
      };
    }
  };
</script>

<style lang="scss" scoped>
  .swiper-wrapper {
    margin-top: 18px;
  }
  .swiper-header {
    padding: 16px 14px 0;

    .header-title {
      font-size: 16px;
      font-weight: 500;
      letter-spacing: -0.96px;
      color: #1e1e1e;
    }
  }
</style>
