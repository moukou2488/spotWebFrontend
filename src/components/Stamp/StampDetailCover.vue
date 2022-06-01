<template>
  <div class="stamp-detail-cover">
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
      </header>
      <div class="zoom-swiper-container">
        <div
          class="stamp-cover-img"
          :style="`background-image: url(${stamp_detail.photoUrl})`"
        >
          <div class="background" @click.self="image_zoom = true"></div>
          <div class="padding" @click="image_zoom = true">
            <div class="cover-first-line">
              <div class="cover-logo-wrapper">
                <img
                  v-if="stamp_detail.logoExists"
                  id="logo"
                  class="cover-logo"
                  width="150"
                  height="18"
                  :src="require('@/assets/images/stamp_logo@3x.png')"
                  alt="스탬프로고"
                />
              </div>
            </div>
            <div class="cover-count">
              <div v-if="stamp_detail.countExists">
                <span class="cover-count-number">{{
                  stamp_detail.watchCount
                }}</span
                ><span class="cover-count-text">회차</span>
              </div>
            </div>
            <div v-if="stamp_detail.gameExists">
              <div class="cover-game team">
                {{ game_team }}
              </div>
              <div class="cover-game place">{{ stamp_detail.location }}</div>
              <div class="cover-game day">{{ stamp_detail.gameDate }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div
      class="stamp-cover-img"
      :style="`background-image: url(${stamp_detail.photoUrl})`"
    >
      <div class="background" @click.self="image_zoom = true"></div>
      <div class="padding" @click="image_zoom = true">
        <div class="cover-first-line">
          <div class="cover-logo-wrapper">
            <img
              v-if="stamp_detail.logoExists"
              id="logo"
              width="150"
              height="18"
              class="cover-logo"
              :src="require('@/assets/images/stamp_logo@3x.png')"
              alt="스탬프로고"
            />
          </div>
        </div>
        <div class="cover-count">
          <div v-if="stamp_detail.countExists">
            <span class="cover-count-number nanum-square">
              {{ stamp_detail.watchCount }} </span
            ><span class="cover-count-text">회차</span>
          </div>
        </div>
        <div v-if="stamp_detail.gameExists">
          <div class="cover-game team">
            {{ game_team }}
          </div>
          <div class="cover-game place">{{ stamp_detail.location }}</div>
          <div class="cover-game day">{{ stamp_detail.gameDate }}</div>
        </div>
      </div>
      <div class="cover-footer">
        <div class="profile-wrapper">
          <router-link
            :to="`/profile/userpage/${stamp_detail.nickname}`"
            class="simple-profile-img"
          >
            <img class="profile-img" :src="profile_img" alt="프로필 이미지" />
          </router-link>
          <div class="profile-explain-wrapper text-truncate">
            <span class="simple-profile-explain">
              {{ stamp_detail.nickname }}
            </span>
            <p class="simple-profile-name not-kr">
              {{ stamp_detail.updateDate }}
            </p>
          </div>
        </div>
        <div class="cover-like" @click="stamp_like(stamp_detail.diaryId)">
          <img class="stamp-like" :src="is_user_like" alt="버디일기좋아요" />
          <span class="info-text like-conut">{{ stamp_like_count }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState } from "vuex";
  export default {
    name: "stamp-detail-cover",
    data: () => ({
      is_user_like: require("@/assets/images/ic_recommended@3x.png"),
      stamp_like_count: 0,
      profile_img: require("@/assets/images/profile_default.png"),
      image_zoom: false
    }),
    computed: {
      ...mapState("stampStore", ["stamp_detail"]),
      ...mapState("userStore", ["user_info"]),

      game_team() {
        return this.stamp_detail.homeTeam + " vs " + this.stamp_detail.awayTeam;
      }
    },
    methods: {
      ...mapActions("stampStore", [
        "api_stamp_like_check",
        "api_stamp_like",
        "api_stamp_cancle_like"
      ]),
      ...mapActions("profileStore", ["api_get_profile_photo"]),
      async stamp_like_confirm(id) {
        this.is_user_like = (await this.api_stamp_like_check(id))
          ? require("@/assets/images/ic_recommended_active@3x.png")
          : require("@/assets/images/ic_recommended@3x.png");
      },
      async stamp_like(id) {
        if (this.user_info) {
          if (this.user_info.emailVerified === false) {
            this.$eventBus.$emit("alert", { type: "email-auth" });
          } else if (
            this.is_user_like ===
            require("@/assets/images/ic_recommended@3x.png")
          ) {
            await this.call_api_stamp_like(id);
          } else {
            await this.call_api_stamp_cancle_like(id);
          }
        } else {
          this.$eventBus.$emit("alert", {
            type: "login"
          });
          return;
        }
      },
      call_api_stamp_like(id) {
        this.api_stamp_like(id);
        this.stamp_like_count += 1;
        this.is_user_like = require("@/assets/images/ic_recommended_active@3x.png");
      },
      call_api_stamp_cancle_like(id) {
        this.api_stamp_cancle_like(id);
        this.stamp_like_count -= 1;
        this.is_user_like = require("@/assets/images/ic_recommended@3x.png");
      }
    },
    async mounted() {
      if (this.user_info !== null)
        this.stamp_like_confirm(this.stamp_detail.diaryId);
      this.stamp_like_count = this.stamp_detail.likeCount;
      const response = await this.api_get_profile_photo(
        this.stamp_detail.nickname
      );
      this.profile_img = response;
    }
  };
</script>

<style lang="scss" scoped>
  .stamp-detail-cover {
    margin-top: 48px;
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
        .save_btn {
          position: absolute;
          top: 14px;
          right: 14px;
          font-size: 12px;
          line-height: 18px;
          letter-spacing: -0.24px;
          color: #ffffff;
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
        .canvas {
          display: flex;
          justify-content: center;
        }
        .zoom-image {
          filter: brightness(50%);
          display: flex;
          width: 100vw;
          height: 100vw;
          justify-content: center;
        }
      }
    }
    .stamp-cover-img {
      position: relative;
      width: 100vw;
      height: 100vw;
      color: #fff;
      background-size: cover;
      .padding {
        position: relative;
        padding: 22.4px 0 0 16px;
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
      .cover-footer {
        position: absolute;
        display: flex;
        padding-left: 16px;
        width: 100%;
        justify-content: flex-end;
        bottom: 0;
        align-items: center;
        margin-bottom: 21px;
        .cover-like {
          display: flex;
          justify-content: flex-end;
          margin-right: 16px;
          .stamp-like {
            width: 20px;
            height: 20px;
            vertical-align: top;
            margin-right: 4px;
          }
          .like-conut {
            display: inline-block;
            margin-right: 16px;
          }
          .info-text {
            color: #fff;
            font-size: 12px;
            line-height: 20px;
            letter-spacing: -0.72px;
          }
        }
        .profile-wrapper {
          width: 100%;
          display: flex;
          .simple-profile-img {
            width: 38px;
            height: 38px;
            margin-right: 14px;

            .profile-img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
          .profile-explain-wrapper {
            width: 80%;
            .simple-profile-explain {
              height: 16px;
              margin: 3px 0 3px !important;
              font-size: 12px;
              line-height: 18px;
              color: #fff;
            }
            .simple-profile-name {
              margin-top: 1px !important;
              font-size: 12px;
              font-weight: 600;
              line-height: 17px;
              color: #fff;
            }
          }
        }
      }
    }
  }
</style>
