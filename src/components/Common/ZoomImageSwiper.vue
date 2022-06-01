<template>
  <section class="zoom-image-view">
    <header class="zoom-swiper-header">
      <button class="exit_btn" @click="$emit('close_zoom')">
        <img
          class="exit_image"
          :src="require('@/assets/images/btn_close@3x.png')"
          alt="닫기 버튼"
        />
      </button>
      <span class="current_index">{{ computed_zoom_index }}</span>
    </header>
    <!-- swiper -->
    <swiper
      ref="zoomSwiper"
      class="zoom-swiper-container"
      :options="zoomSwiperOption"
      @slideChange="swipeChange"
    >
      <swiper-slide
        class="zoom-swiper-card"
        v-for="(photo, index) in image_list"
        :key="photo + '업로드 확대'"
      >
        <img
          class="zoom-post-image"
          :src="photo"
          alt="업로드된 사진"
          :style="zoom_image_size_list[index]"
        />
      </swiper-slide>
    </swiper>
  </section>
</template>

<script>
  export default {
    props: {
      image_list: {
        type: Array,
        default() {
          return [];
        }
      },
      zoom_index: {
        type: Number,
        default: 0
      },
      zoom_image_size_list: {
        type: Array,
        default() {
          return [];
        }
      },
      image_zoom: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      computed_zoom_index() {
        return `${this.swipe_index + 1}/${this.image_list.length}`;
      }
    },
    watch: {
      image_zoom(newVal) {
        if (newVal) {
          //  켜진 경우
          document.querySelector("html").classList.add("modal-on");
          this.$refs.zoomSwiper.$swiper.slideTo(this.zoom_index);
        } else {
          document.querySelector("html").classList.remove("modal-on");
        }
      }
    },
    data: () => ({
      // 줌 스와이프 옵션
      zoomSwiperOption: {
        initialSlide: 1
      },
      zoom_image_src: "", // 확대된 image url

      swipe_index: 0
    }),
    methods: {
      swipeChange() {
        this.swipe_index = this.$refs.zoomSwiper.$swiper.activeIndex;
      }
    }
  };
</script>

<style lang="scss">
  //
  .zoom-image-view {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #464646;
    z-index: 1000;

    .zoom-swiper-header {
      display: flex;
      justify-content: center;
      width: 100%;

      .exit_btn {
        position: absolute;
        top: 0;
        left: 4px;
        width: 40px;
        height: 40px;
        .exit_image {
          width: 100%;
          height: 100%;
        }
      }

      .current_index {
        display: inline-block;
        padding: 10px 0;
        font-size: 18px;
        font-weight: 500;
        line-height: 20px;
        letter-spacing: -1.08px;
        color: #ffffff;
      }
    }
    .zoom-swiper-container {
      display: flex;
      align-items: center;
      padding: 0;
      margin-bottom: 0;
      height: calc(100% - 40px);
      .swiper-wrapper {
        height: auto;
        align-items: center;
        .zoom-swiper-card {
          display: flex;
          justify-content: center;
          flex: 1;
        }
      }
    }
  }
</style>
