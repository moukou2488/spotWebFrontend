<template>
  <div class="user-weather-container center" :style="container_style">
    <div class="user-weather-wrap center spinner" :style="percent_border"></div>
    <div class="white-margin center" :style="white_circle">
      <div class="user-weather" :style="gray_circle">
        <div v-if="weather_icon" class="weather-icon-wrap">
          <img class="icon-image" :src="weather_icon" alt="날씨 일러스트" />
        </div>
        <!--  -->
        <v-skeleton-loader
          v-show="is_loading"
          class="profile-skeleton-loader"
          :height="size.width"
          :width="size.width"
          type="image"
        ></v-skeleton-loader>
        <div
          v-show="!is_loading"
          class="image-wrapper"
          :class="{ end: is_end }"
        >
          <div class="end_text" v-if="is_end">
            <p>앗, 마감된</p>
            <p>동행입니다.</p>
          </div>
          <img
            class="user-profile-image"
            ref="user_profile_image"
            :src="computed_img_url"
            alt="프로필 사진"
          />
        </div>
        <!--  -->
        <div v-if="image_upload" class="camera-icon-wrap">
          <input
            class="hidden"
            type="file"
            accept="image/*"
            id="profile_image"
            @change="fileUpload"
          />
          <label
            @click.prevent="open_more_btn_list"
            for="profile_image"
            class="camera-icon"
          />
        </div>
      </div>
    </div>
    <p v-if="percentage_show" class="percetage-info" :class="percentage_size">
      <span class="percetage-num">{{ percentage }}</span>
      <span class="percetage-ico">%</span>
    </p>
    <img
      class="hidden"
      id="default_profile"
      :src="require('@/assets/images/profile_default.png')"
      alt="숨겨진 디폴트 이미지"
    />
  </div>
</template>

<script>
  import weatherCalculate from "@/assets/scripts/weatherCalculate.js";

  import { mapActions, mapMutations, mapState } from "vuex";

  export default {
    name: "user-weather",
    props: {
      percentage: {
        type: Number,
        required: true
      },
      size: {
        type: Object,
        default() {
          return {
            width: 74,
            height: 74
          };
        }
      },
      percentage_show: {
        type: Boolean,
        default: false
      },
      weather_icon: {
        type: String,
        default: null
      },
      image_upload: {
        type: Boolean,
        default: false
      },
      user_nick: {
        type: String,
        required: false
      },
      profile_weather: {
        type: Boolean,
        default: false
      },
      percentage_size: {
        type: String,
        required: false
      },
      is_end: {
        type: Boolean,
        required: false
      }
    },
    computed: {
      gray_circle() {
        return {
          width: this.size.width + "px",
          height: this.size.height + "px"
        };
      },
      container_style() {
        return {
          width: this.size.width + 10 + "px",
          height: this.size.height + 10 + "px"
        };
      },
      percent_border() {
        return {
          width: this.size.width + 10 + "px",
          height: this.size.height + 10 + "px",
          background: `conic-gradient(#fff 0,#fff ${100 -
            this.percentage}% ,#3bb1ff 0%, #3bb1ff ${this.percentage}%)`
        };
      },
      white_circle() {
        return {
          width: this.size.width + 8 + "px",
          height: this.size.height + 8 + "px"
        };
      },
      ...mapState("profileStore", [
        "user_profile_photo_url",
        "user_profile_default_url"
      ]),
      ...mapState("modalStore", [
        "more_btn_show",
        "more_btn_choose_index",
        "more_btn_list"
      ]),
      computed_img_url() {
        // 프로필 사진이 없는 유저의 경우 디폴트 이미지 처리
        return this.profile_photo_url === undefined
          ? this.user_profile_default_url
          : this.profile_photo_url;
      }
    },
    watch: {
      user_profile_photo_url(new_profile_img) {
        this.profile_photo_url = new_profile_img;
      },
      async more_btn_show(bool) {
        if (
          !bool &&
          this.more_btn_choose_index !== null &&
          this.more_btn_list.type === "profile_image"
        ) {
          // 이미지 업로드
          if (this.more_btn_choose_index === 0) this.img_click();
          else {
            // 기본 이미지로 변경
            // src(string)를 통해 이미지를 업로드하기 위해서는
            // blob 객체가 필요해서 canvas 를 통해 그린 뒤 toBlob 메소드를 통해 해결했습니다.
            let canvas = document.createElement("canvas");
            let default_img = document.querySelector("#default_profile");

            canvas.width = default_img.naturalWidth;
            canvas.height = default_img.naturalHeight;

            let context = canvas.getContext("2d");
            context.fillStyle = "#addeff";
            context.fillRect(
              0,
              0,
              default_img.naturalWidth,
              default_img.naturalHeight
            );
            context.drawImage(default_img, 0, 0);

            // upload
            canvas.toBlob(async blob => {
              await this.api_post_upload_photo(blob);
            }, "image/jpeg");
          }
        }
      }
    },
    data: () => ({
      profile_photo_url: require("@/assets/images/profile_default.png"),

      is_loading: false // 프로필 이미지 업로드 간 스켈레톤 로딩 처리
    }),
    methods: {
      ...mapMutations("modalStore", ["set_cropper_show", "set_cropper_url"]),
      ...mapActions("modalStore", ["config_more_btn_show"]),
      ...mapActions("profileStore", [
        "api_post_upload_photo",
        "api_get_profile_photo"
      ]),
      async fileUpload(event) {
        if (event.target.files[0]) {
          const image_file = event.target.files[0];

          const reader = new FileReader();

          reader.readAsDataURL(image_file);
          reader.onload = e => {
            this.set_cropper_url(e.target.result);
            this.set_cropper_show(true);
          };

          // 같은 파일을 다시 시도할 때
          // null 로 만들어줘야 change 이벤트가 동작
          event.target.value = null;
        }
      },
      // 더보기 모달창 open
      open_more_btn_list() {
        this.config_more_btn_show({
          type: "profile_image",
          header: "프로필 사진 설정하기"
        });
      },
      img_click() {
        // ios 권한 체크
        if (window.webkit) {
          window.webkit.messageHandlers.profileImage.postMessage("");
        } else document.querySelector("#profile_image").click(); // web 환경에서 테스트를 위한 코드
      },

      // 이미지 로딩 대기 처리 함수
      wait_image_loading(img_src) {
        this.is_loading = true;
        const img = new Image();
        img.src = img_src;
        // 로딩이 다 되면
        img.onload = () => (this.is_loading = false);
      }
    },
    async mounted() {
      // 프로필 페이지
      if (this.user_nick) {
        const response = await this.api_get_profile_photo(this.user_nick);
        this.profile_photo_url = response;
      } else {
        this.profile_photo_url = undefined;
      }

      // 동행날씨 이미지
      if (this.profile_weather) {
        const user_weather_object = weatherCalculate(this.percentage);
        this.profile_photo_url = user_weather_object.icon_url;
      }

      this.wait_image_loading(this.profile_photo_url);
    }
  };
</script>

<style lang="scss" scoped>
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
  }

  .user-weather-container {
    position: relative;

    .user-weather-wrap {
      position: absolute;
    }
    .white-margin {
      position: relative;
      background-color: #fff;
      .user-weather {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;

        background-color: #addeff;
        border-radius: 50%;

        .image-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;

          overflow: hidden;
          border-radius: 50%;

          .user-profile-image {
            width: 100%;
            height: 100%;
          }
          &.end {
            .end_text {
              position: absolute;

              display: flex;
              justify-content: center;
              flex-direction: column;
              align-items: center;

              width: 100%;
              height: 100%;

              border-radius: 50%;
              color: #fff;
              text-align: center;
              font-size: 11px;
              letter-spacing: -0.88px;
              background-color: rgba($color: #000000, $alpha: 0.55);
            }
          }
        }

        .weather-icon-wrap {
          position: absolute;
          z-index: 2;
          left: -34px;
          bottom: -5px;
          width: 58px;
          height: 58px;
          border-radius: 50%;
          .icon-image {
            width: 100%;
            height: 100%;
          }
        }
        .camera-icon-wrap {
          position: absolute;
          right: -28px;
          bottom: -5px;
          width: 30px;
          height: 30px;
          .camera-icon {
            display: inline-block;
            width: 100%;
            height: 100%;
            background: url("~@/assets/images/ic_camera@3x.png") center;
            background-size: cover;
          }
        }
      }
    }

    .percetage-info {
      position: absolute;
      left: calc(100% + 8px);
      display: inline-block;
      color: $dodger_blue;
      .percetage-num {
        font-size: 20px;
      }
      .percetage-ico {
        font-size: 10px;
      }
      &.middle {
        left: calc(100% + 3px);
        .percetage-num {
          font-size: 12px;
        }
      }
    }
  }
  .spinner {
    animation: rotate 1s linear;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
