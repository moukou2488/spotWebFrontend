<template>
  <router-link
    :to="`/stamp/detail/${stamp_item.diaryId}`"
    class="stamp-swiper-card"
    role="listitem"
  >
    <div class="image-wrapper">
      <img
        v-show="image_load"
        class="background-photo"
        :src="stamp_item.photoUrl"
        alt="버디 일기 이미지"
      />
      <v-skeleton-loader
        v-show="!image_load"
        width="100%"
        height="100%"
        type="image"
      />
    </div>
    <!--  -->
    <div class="card--body">
      <div class="body--header">
        <img
          v-if="stamp_item.logoExists"
          class="header--logo"
          width="150"
          height="18"
          :src="require('@/assets/images/stamp_logo@3x.png')"
          alt="스팟 로고"
        />
        <p v-if="stamp_item.countExists" class="view-count">
          <span class="view-count--number nanum-square">
            {{ stamp_item.watchCount }} </span
          >회차
        </p>
        <!--  -->
        <p class="team-info">{{ teamInfoFormat }}</p>
        <p v-if="stamp_item.gameExists" class="game-info">
          {{ locationFormat }}
        </p>
        <p v-if="stamp_item.gameExists" class="date-info">
          {{ gameDateFormat }}
        </p>
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
            <p class="profile--text">{{ writeDateFormat }}</p>
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
    </div>
  </router-link>
</template>

<script>
  import teams_list from "@/assets/data/teams_list.js";
  import game_place from "@/assets/data/game_place.js";
  import { mapActions, mapState } from "vuex";

  export default {
    name: "stamp-swiper-card",
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
            gameDate: String, // 게임 일자
            updateDate: String, // 작성 일자
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
    data: () => ({
      image_load: false,
      profile_url: require("@/assets/images/profile_default.png"),
      is_like: false,
      like_count: 0
    }),
    computed: {
      ...mapState("userStore", ["user_info"]),
      writeDateFormat() {
        if (this.stamp_item.updateDate)
          return this.stamp_item.updateDate.replaceAll("-", ".");
        else return null;
      },
      gameDateFormat() {
        return this.stamp_item.gameDate.replaceAll("-", ".");
      },
      teamInfoFormat() {
        return `${this.filters_full_team_name(
          this.stamp_item.homeTeam
        )} vs ${this.filters_full_team_name(this.stamp_item.awayTeam)}`;
      },
      locationFormat() {
        return this.filters_full_place_name(this.stamp_item.location);
      }
    },
    methods: {
      ...mapActions("profileStore", ["api_get_profile_photo"]),
      ...mapActions("stampStore", [
        "api_stamp_like_check",
        "api_stamp_like",
        "api_stamp_cancle_like"
      ]),
      filters_full_team_name(team) {
        let full_team_name = "";
        for (let i = 0; i < teams_list.length; i++) {
          if (teams_list[i].team.toUpperCase().includes(team)) {
            full_team_name = teams_list[i].team;
            break;
          }
        }
        return full_team_name;
      },
      filters_full_place_name(place) {
        if (place === "문학") return "인천SSG랜더스필드";
        let full_place_name = "";
        for (let i = 0; i < game_place.length; i++) {
          if (game_place[i].place.toUpperCase().includes(place)) {
            full_place_name = game_place[i].place;
            break;
          }
        }
        return full_place_name;
      },
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
  .stamp-swiper-card {
    //
    position: relative;
    width: 100%;
    height: 100%;
    display: inline-block;

    // background
    .image-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1;

      .background-photo {
        width: 100%;
        height: 100%;
        border-radius: 4px;
      }
    }

    //
    .card--body {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      height: 100%;
      padding: 22.2px 16px;
      box-sizing: border-box;
      background-color: rgba($color: #000000, $alpha: 0.55);
      border-radius: 4px;
      color: #fff;
      .body--header {
        .header--logo {
          margin-bottom: 16px;
        }
        .view-count {
          margin-bottom: 16px !important;
          font-size: 14px;
          letter-spacing: -0.84px;
          font-weight: 500;

          .view-count--number {
            display: inline-block;
            margin-right: 8px;

            font-size: 72px;
            letter-spacing: -5.76px;
            font-weight: 800;
            line-height: 79px;
          }
        }
        .team-info {
          margin-bottom: 8px !important;
          font-size: 12px;
          letter-spacing: -0.72px;
          font-weight: 500;
        }

        .game-info {
          margin-bottom: 2px !important;
          font-size: 12px;
          letter-spacing: -0.48px;
        }

        .date-info {
          font-size: 12px;
        }
      }
      .body--footer {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;

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
