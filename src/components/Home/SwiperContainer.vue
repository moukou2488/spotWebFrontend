<template>
  <div class="swiper-container">
    <header class="swiper-header">
      <router-link :to="url_path">
        <strong class="header-title">{{ header_title }}</strong>
        <div class="image-wrapper">
          <img
            class="arrow-icon"
            :src="require('@/assets/images/btn_arrow_right_all.png')"
            alt="진한 오른 화살표 아이콘"
          />
        </div>
      </router-link>
    </header>
    <swiper v-if="list_length" :options="swiperOption">
      <slot name="swiper-card-list" />
    </swiper>
    <div v-else class="swiper-empty-view">
      <p class="main">
        이런, 등록된 동행이 없어요.
      </p>
      <p class="sub">
        지금 바로 동행을 등록해보세요.
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "swiper-container",
    props: {
      header_title: {
        type: String,
        required: true
      },
      url_path: {
        type: String,
        required: true
      },
      list_length: {
        type: Number
      }
    },
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
  .swiper-container {
    .swiper-header {
      margin: 28px 0 10px;
      padding-left: 14px;
      .header-title {
        font-size: 16px;
        font-weight: 500;
        letter-spacing: -0.96px;
        color: #1e1e1e;
      }
      .image-wrapper {
        display: inline-block;
        vertical-align: text-top;
        margin-left: 6px;
        width: 12px;
        height: 12px;
        .arrow-icon {
          width: 100%;
          height: 100%;
        }
      }
    }
    .swiper-empty-view {
      margin-top: 48px;
      .main {
        margin-bottom: 5px !important;
        font-size: 16px;
        font-weight: 500;
        line-height: 1.38;
        letter-spacing: -0.32px;
        text-align: center;
        color: #1e1e1e;
      }
      .sub {
        font-size: 12px;
        line-height: 1.75;
        letter-spacing: -0.24px;
        text-align: center;
        color: #999;
      }
    }
  }
</style>
