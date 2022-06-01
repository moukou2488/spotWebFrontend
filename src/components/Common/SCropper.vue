<template>
  <div class="s-cropper" v-if="cropper_show && image_onload">
    <header class="crop-header">
      <a class="button-link" href="#" @click.prevent="exit_crop">
        <img
          class="button-image"
          :src="require('@/assets/images/close_btn@3x.png')"
          alt="창 닫기"
        />
      </a>
      <span class="header-text">앨범에서 사진 선택하기</span>
      <button class="crop_btn" @click="crop">완료</button>
    </header>
    <!--  -->
    <cropper
      ref="cropper"
      class="cropper"
      :src="cropper_url"
      stencil-component="circle-stencil"
    />
  </div>
</template>

<script>
  import { Cropper } from "vue-advanced-cropper";
  import "vue-advanced-cropper/dist/style.css";

  import { mapActions, mapMutations, mapState } from "vuex";

  export default {
    name: "s-cropper",
    components: { Cropper },
    computed: { ...mapState("modalStore", ["cropper_show", "cropper_url"]) },
    data: () => ({ image_onload: false }),
    watch: {
      // 이미지 로딩 대기
      cropper_show(bool) {
        if (bool) {
          const img = new Image();
          img.src = this.cropper_url;
          img.onload = () => {
            this.image_onload = true;
          };
        } else {
          this.image_onload = false;
        }
      }
    },
    methods: {
      ...mapMutations("modalStore", ["set_cropper_show"]),
      ...mapMutations("stampStore", ["set_stamp_photo"]),
      ...mapActions("profileStore", ["api_post_upload_photo"]),
      crop() {
        const { canvas } = this.$refs.cropper.getResult();
        canvas.toBlob(async blob => {
          if (this.$route.name !== "stamp-write")
            await this.api_post_upload_photo(blob);
          else {
            const url = URL.createObjectURL(blob);
            this.set_stamp_photo({ url: url, blob: blob });
          }
          this.set_cropper_show(false);
        }, "image/jpeg");
      },
      // 크롭창 닫기
      exit_crop() {
        this.set_cropper_show(false);
      }
    }
  };
</script>

<style lang="scss">
  .s-cropper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    background: #737373;
    .crop-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      height: 48px;
      padding: 0 8px 0 4px;

      background-color: #fff;
      color: #373737;

      .button-link {
        width: 40px;
        height: 40px;
        .button-image {
          width: 100%;
          height: 100%;
        }
      }

      .header-text {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        font-size: 16px;
      }

      .crop_btn {
        width: 48px;
        height: 40px;
        font-size: 12px;
      }
    }
  }
  .cropper {
    height: 100%;

    .vue-advanced-cropper__background {
      background: rgba($color: #000000, $alpha: 0.55) !important;
    }
  }
</style>
