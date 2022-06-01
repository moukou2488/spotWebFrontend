<template>
  <li class="my-stamp-list-item">
    <router-link class="stamp-link" :to="`/stamp/detail/${stamp_item.diaryId}`">
      <div class="image-wrapper">
        <img
          class="item--image"
          v-show="image_load"
          :src="stamp_item.photoUrl"
          alt="이미지"
        />
        <v-skeleton-loader
          class="item--image"
          v-show="!image_load"
          width="100%"
          height="200"
          type="image"
        />
      </div>
      <!--  -->
      <div class="body--footer">
        <router-link
          :to="`/profile/userpage/${stamp_item.nickname}`"
          class="footer--profile"
        >
          <img
            class="profile--image"
            width="38"
            height="38"
            :src="profile_url"
            alt="프로필 이미지"
          />
          <div class="profile--info">
            <p class="profile--text">{{ stamp_item.nickname }}</p>
            <p class="profile--text not-kr">{{ writeDateFormat }}</p>
          </div>
        </router-link>
        <!--  -->
        <div class="footer--like">
          <a
            class="footer--like-link"
            href="#"
            @click.prevent="toggle_scrap(stamp_item.diaryId)"
          >
            <img
              class="like--btn"
              width="20"
              height="20"
              :src="
                is_like === true
                  ? require('@/assets/images/ic_recommended_active@3x.png')
                  : require('@/assets/images/ic_recommended@3x.png')
              "
              alt="좋아요 버튼"
            />
            <span class="like--count">{{ like_count }}</span>
          </a>
        </div>
      </div>
      <div class="linear-background"></div>
    </router-link>
  </li>
</template>

<script>
  import { mapActions } from "vuex";
  export default {
    name: "my-stamp-list-item",
    props: {
      stamp_item: {
        type: Object,
        required: true,
        default() {
          return {
            diaryId: Number,
            diaryContent: String,
            nickname: String,
            photoUrl: String,
            watchCount: Number,
            likeCount: Number,
            location: String,
            gameDate: String,
            homeTeam: String,
            awayTeam: String,
            publicStatus: Boolean,
            logoExists: Boolean,
            countExists: Boolean,
            gameExists: Boolean
          };
        }
      }
    },
    computed: {
      writeDateFormat() {
        if (this.stamp_item.updateDate)
          return this.stamp_item.updateDate.replaceAll("-", ".");
        else return null;
      }
    },
    data: () => ({
      image_load: false,
      profile_url: require("@/assets/images/profile_default.png"),
      is_like: false,
      like_count: 0
    }),
    methods: {
      ...mapActions("profileStore", ["api_get_profile_photo"]),
      ...mapActions("stampStore", [
        "api_stamp_like_check",
        "api_stamp_like",
        "api_stamp_cancle_like"
      ]),
      async toggle_scrap(diaryId) {
        if (this.is_like) {
          await this.api_stamp_cancle_like(diaryId);
          this.is_like = false;
          this.like_count--;
        } else {
          await this.api_stamp_like(diaryId);
          this.is_like = true;
          this.like_count++;
        }
      }
    },
    async mounted() {
      const img = new Image();
      img.src = this.stamp_item.photoUrl;
      img.onload = () => {
        this.image_load = true;
      };

      const response = await this.api_get_profile_photo(
        this.stamp_item.nickname
      );
      if (response) this.profile_url = response;

      //
      if (this.user_info) {
        const is_like = await this.api_stamp_like_check(
          this.stamp_item.diaryId
        );

        this.is_like = is_like;
      }
      this.like_count = this.stamp_item.likeCount;
    }
  };
</script>

<style lang="scss" scoped>
  .my-stamp-list-item {
    .stamp-link {
      position: relative;
      display: inline-block;
      width: 100%;
      height: 200px;
      .image-wrapper {
        position: absolute;
        width: 100%;
        .item--image {
          width: 100%;
          height: 200px;
          border-radius: 4px;
        }
      }
      .linear-background {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        background-image: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.28),
          rgba(0, 0, 0, 0.55) 89%,
          rgba(0, 0, 0, 0.58)
        );
        border-radius: 4px;
      }
      .body--footer {
        position: relative;
        z-index: 2;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        height: 100%;
        padding: 0 16px 9px;
        color: #f0f0f0;

        .footer--profile {
          display: flex;
          align-items: center;

          .profile--image {
            border-radius: 50%;
          }

          .profile--info {
            margin-left: 12px;

            .profile--text {
              font-size: 12px;
              font-weight: 500;
              letter-spacing: -0.72px;
              & + .profile--text {
                margin-top: 1px !important;
              }
            }
          }
        }
        //
        .footer--like {
          .footer--like-link {
            display: flex;
            align-items: center;
          }
          .like--count {
            display: inline-block;
            line-height: 20px;
            margin-left: 2px;
          }
        }
      }
    }
  }
</style>
