<template>
  <section class="post-detail-image-container">
    <!-- 이미지 확대 -->
    <section v-show="image_zoom" class="zoom-image-view">
      <header class="zoom-swiper-header">
        <button class="exit_btn" @click="image_zoom = false">
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
    <!--  -->
    <section class="post-detail-container" v-if="!image_zoom">
      <!-- 사진 한 장 -->
      <div v-if="image_list.length === 1" class="swiper-container">
        <div class="solo-image-wrap">
          <img
            v-show="image_ratio_end"
            @click="zoom_image(0)"
            ref="image_upload_0"
            class="solo-image"
            :src="image_list[0]"
            alt="업로드 된 사진"
            :style="image_size_list[0]"
          />
          <v-skeleton-loader
            v-show="!image_ratio_end"
            :width="current_window_size"
            :height="current_window_size"
            type="image"
          ></v-skeleton-loader>
        </div>
      </div>
      <!-- 여러장 -->
      <swiper
        class="swiper-container"
        v-else-if="image_list.length > 1"
        :options="swiperOption"
      >
        <swiper-slide
          class="swiper-card"
          v-show="image_ratio_end"
          v-for="(photo, index) in image_list"
          :key="photo + '업로드 사진'"
        >
          <img
            @click="zoom_image(index)"
            :ref="`image_upload_${index}`"
            class="post-image"
            :src="photo"
            alt="업로드된 사진"
            :style="image_size_list[index]"
          />
        </swiper-slide>
        <swiper-slide
          class="swiper-card"
          v-show="!image_ratio_end"
          v-for="photo in image_list"
          :key="photo + '스켈레톤 로더'"
        >
          <v-skeleton-loader
            v-show="!image_ratio_end"
            width="190"
            height="190"
            type="image"
          ></v-skeleton-loader>
        </swiper-slide>
      </swiper>
    </section>
  </section>
</template>

<script>
  import {
    img_ratio_calculate,
    big_size_calculate
  } from "@/assets/scripts/imageCalculate.js";

  export default {
    name: "post-detail-image-container",
    props: {
      image_list: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    computed: {
      computed_zoom_index() {
        return `${this.swipe_index + 1}/${this.image_list.length}`;
      },
      current_window_size() {
        return window.innerWidth - 27;
      }
    },
    watch: {
      image_zoom(bool) {
        // 줌인이 되면 스크롤이 안 되도록
        if (bool) {
          document.querySelector("html").classList.add("modal-on");
        } else {
          // 줌인이 풀리면 스크롤 다시 활성화
          document.querySelector("html").classList.remove("modal-on");
        }
        this.$refs.zoomSwiper.$swiper.slideTo(this.zoom_current_index);
      },
      is_loading(new_val) {
        // 이미지 로딩이 다 되면 비율 계산
        if (!new_val) {
          this.image_list.forEach((image, index) => {
            const image_el = this.$refs[`image_upload_${index}`];

            let img_width = 0;
            let img_height = 0;
            if (this.image_list.length > 1) {
              img_width = image_el[0].naturalWidth;
              img_height = image_el[0].naturalHeight;
            } else {
              img_width = image_el.naturalWidth;
              img_height = image_el.naturalHeight;
            }

            let list_type = this.image_list.length > 1 ? "swipe" : "solo";
            const image_size = img_ratio_calculate(
              img_width,
              img_height,
              list_type
            );
            const zoom_image_size = big_size_calculate(img_width, img_height);

            this.image_size_list.push(image_size);
            this.zoom_image_size_list.push(zoom_image_size);
          });
          this.image_ratio_end = true;
        }
      }
    },
    data: () => ({
      swiperOption: {
        slidesPerView: "auto",
        freeMode: true
      },
      // 줌 스와이프 옵션
      zoomSwiperOption: {
        initialSlide: 1
      },
      image_size_list: [],

      zoom_image_src: "", // 확대된 image url
      image_zoom: false, // 확대 여부
      zoom_image_size_list: [], // 확대된 image 사이즈
      zoom_current_index: 0,
      swipe_index: 0,

      image_ratio_end: false,
      is_loading: true
    }),
    methods: {
      zoom_image(index) {
        this.image_zoom = true;
        this.zoom_current_index = index;
      },
      swipeChange() {
        this.swipe_index = this.$refs.zoomSwiper.$swiper.activeIndex;
      }
    },
    mounted() {
      // 이미지 로딩 다 될 때까지 대기
      let imageLoaded = 0;
      this.image_list.forEach(image => {
        const img = new Image();
        img.src = image;
        img.onload = () => {
          imageLoaded++;
          if (imageLoaded === this.image_list.length) {
            this.is_loading = false;
          }
        };
      });
    }
  };
</script>

<style lang="scss">
  .post-detail-container {
    .swiper-container {
      padding: 0 14px;
      margin-bottom: 30px;
      .solo-image-wrap {
        display: flex;
        justify-content: center;
        width: 100%;
        height: auto;
        .solo-image {
          width: 100%;
          height: 100%;
          border-radius: 4px;
        }
      }

      .swiper-card {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 190px;
        height: 190px;
        background-color: #fff;
        border-radius: 4px;

        .post-image {
          width: 100%;
          height: 100%;
        }

        & + .swiper-card {
          margin-left: 12px;
        }
      }
    }
  }
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
        }
      }
    }
  }
</style>
