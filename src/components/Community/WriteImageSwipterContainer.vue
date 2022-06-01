<template>
  <div class="write-image-swiper-container">
    <div class="section-header">
      <img
        class="camera-icon"
        :src="require('@/assets/images/ic_camera_gray@3x.png')"
        alt="카메라 아이콘"
      />
      <span class="section-text">{{ computed_image_length }}</span>
    </div>
    <swiper v-show="image_ratio_end" :options="swiperOption">
      <swiper-slide
        v-for="(image, index) in image_list"
        :key="index + '이미지 미리보기'"
        class="community-swiper-card"
      >
        <div class="talk-team-post-image-wrap">
          <img
            class="talk-team-post-image"
            :ref="`image_preview_${index}`"
            :style="image_size_list[index]"
            :src="image"
            alt="이미지 미리보기"
          />
        </div>
        <div class="delete-area">
          <img
            @click="$emit('image_delete', index)"
            class="delete-img"
            :src="require('@/assets/images/btn_search_clear@3x.png')"
            alt="삭제 아이콘"
          />
        </div>
      </swiper-slide>
    </swiper>
    <swiper
      class="skeleton-loader-wrap"
      v-show="!image_ratio_end"
      :options="swiperOption"
    >
      <swiper-slide
        v-for="(image, index) in 5"
        :key="index + '스켈레톤 로더'"
        class="community-swiper-card"
      >
        <v-skeleton-loader
          height="104"
          width="104"
          type="image"
        ></v-skeleton-loader>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
  import { img_ratio_calculate } from "@/assets/scripts/imageCalculate.js";

  export default {
    name: "write-image-swiper-container",
    props: {
      image_list: {
        type: Array,
        required: true
      }
    },
    watch: {
      image_list_length(new_val, old_val) {
        if (old_val > new_val) {
          // 이미지 삭제
          return;
        } else {
          // 이미지 추가
          this.image_ratio_end = false;
          this.wait_image_loading();
          window.scrollTo(0, window.innerHeight);
        }
      },

      is_loading(new_val) {
        if (!new_val) {
          this.image_size_list = [];
          this.image_ratio_end = false;
          this.image_list.forEach((image, index) => {
            const image_el = this.$refs[`image_preview_${index}`];

            let img_width = 0;
            let img_height = 0;

            img_width = image_el[0].naturalWidth;
            img_height = image_el[0].naturalHeight;

            const image_size = img_ratio_calculate(
              img_width,
              img_height,
              "write-preview"
            );

            this.image_size_list.push(image_size);
          });
          this.image_ratio_end = true;
          this.is_loading = false;
        }
      }
    },
    computed: {
      computed_image_length() {
        return `${this.image_list.length} / 10`;
      },
      image_list_length() {
        return this.image_list.length;
      }
    },
    data: () => ({
      swiperOption: {
        slidesPerView: "auto",
        freeMode: true
      },
      image_size_list: [],
      is_loading: false,
      image_ratio_end: false
    }),
    methods: {
      wait_image_loading() {
        this.is_loading = true;
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
    },
    // 처음 이미지 업로드시 watch 로 못잡아주는 이슈
    mounted() {
      // 이미지 로딩 다 될 때까지 대기
      this.wait_image_loading();
      window.scrollTo(0, window.innerHeight);
    }
  };
</script>

<style lang="scss" scoped>
  .write-image-swiper-container {
    margin-bottom: 133px;
    padding: 0 14px;
    border-top: 1px solid #e9e9e9;
    background-color: #fff;
    z-index: 2;
    .section-header {
      display: flex;
      align-items: center;
      padding: 14px 0 8px;
      .camera-icon {
        width: 30px;
        height: 30px;
      }
      .section-text {
        display: inline-block;
        margin-left: 7px;
        line-height: 20px;
        letter-spacing: -0.84px;
        color: #797979;
      }
    }
    //
    .community-swiper-card {
      width: 104px;
      height: 104px;
      .talk-team-post-image-wrap {
        border-radius: 4px 4px 0 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #ddd;
        width: 100%;
        height: 78px;
        vertical-align: top;
      }
      .delete-area {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-right: 10px;
        box-sizing: border-box;
        width: 100%;
        height: 26px;
        border-radius: 0 0 4px 4px;
        background-color: rgb(232, 232, 232);
        .delete-img {
          width: 9px;
          height: 9px;
        }
      }
      & + .community-swiper-card {
        margin-left: 8px;
      }
    }
    .skeleton-loader-wrap {
      display: flex;
    }
  }
</style>
