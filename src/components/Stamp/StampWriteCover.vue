<template>
  <div class="stamp-write-cover">
    <div
      class="stamp-cover-img"
      :class="stamp_photo.url !== null ? '' : 'stamp-img-nothing'"
      :style="
        stamp_photo.url !== null
          ? `background-image: url(${stamp_photo.url})`
          : ''
      "
    >
      <div class="background"></div>

      <div class="padding">
        <div class="cover-first-line">
          <div class="cover-logo-wrapper">
            <img
              v-if="stamp_exists.logoExists"
              class="cover-logo"
              width="150"
              height="18"
              src="@/assets/images/stamp_logo.png"
              alt="스탬프로고"
            />
          </div>
          <div class="cover-camera-wrapper">
            <span class="cover-camera-text">커버 사진을 등록해주세요.</span>
          </div>
          <label @click.prevent="img_click" for="stamp_image">
            <img
              class="stamp_camera"
              src="@/assets/images/photo_bt@3x.png"
              alt="사진 선택"
            />
          </label>
          <input
            class="hidden"
            type="file"
            accept="image/*"
            id="stamp_image"
            @change="fileUpload"
          />
        </div>
        <div class="cover-count">
          <div v-if="stamp_exists.countExists && stamp_count !== ''">
            <span class="cover-count-number">{{ stamp_count }}</span
            ><span class="cover-count-text nanum-square">회차</span>
          </div>
        </div>
        <div v-if="stamp_exists.gameExists && stamp_game.homeTeam !== ''">
          <div class="cover-game team">
            {{ stamp_game.homeTeam }} vs {{ stamp_game.awayTeam }}
          </div>
          <div class="cover-game place">{{ stamp_game.location }}</div>
          <div class="cover-game day not-kr">{{ stamp_game.gameDate }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapMutations, mapState } from "vuex";
  export default {
    name: "stamp-write-cover",
    computed: {
      ...mapState("stampStore", [
        "stamp_photo",
        "stamp_game",
        "stamp_count",
        "stamp_exists"
      ])
    },
    methods: {
      ...mapMutations("modalStore", ["set_cropper_show", "set_cropper_url"]),
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
      img_click() {
        document.querySelector("#stamp_image").click();
      }
    }
  };
</script>

<style lang="scss" scoped>
  .stamp-write-cover {
    margin-top: 48px;
    .padding {
      position: relative;
      padding: 22.4px 0 0 16px;
    }
    .stamp-img-nothing {
      opacity: 0.55;
      background-image: linear-gradient(
        to bottom,
        #000000,
        rgba(0, 0, 0, 0.55)
      );
    }
    .background {
      position: absolute;
      width: 100vw;
      height: 100vw;
      opacity: 0.35;
      background-image: linear-gradient(
        to bottom,
        #000000,
        rgba(0, 0, 0, 0.55)
      );
    }
    .stamp-cover-img {
      position: relative;
      width: 100vw;
      height: 100vw;
      color: #fff;
      background-size: cover;
      .cover-first-line {
        display: table;
        margin-bottom: 15.5px;
        .cover-logo-wrapper {
          display: table-cell;
          vertical-align: middle;
          width: 190px;
        }
        .cover-camera-wrapper {
          display: table-cell;
          vertical-align: middle;
          .cover-camera-text {
            font-size: 12px;
            line-height: 30px;
            height: 30px;
          }
        }
        .stamp_camera {
          display: table-cell;
          vertical-align: middle;
          width: 30px;
          margin-left: 2px;
        }
      }
      .cover-count {
        height: 94.5px;
        .cover-count-number {
          font-size: 72px;
          letter-spacing: -5.76px;
          line-height: 79px;
          font-weight: 800;
        }
        .cover-count-text {
          padding-left: 5px;
          font-size: 14px;
          line-height: 20px;
          letter-spacing: -0.84px;
        }
      }
      .cover-game {
        font-size: 12px;
        line-height: 12px;
        letter-spacing: -0.72px;
      }
      .team {
        margin: -3px 0 12px 0;
      }
      .place {
        margin-bottom: 7px;
      }
    }
  }
</style>
