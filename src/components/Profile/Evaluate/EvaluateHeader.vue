<template>
  <header class="evaluate-header">
    <div class="profile-img-wrap">
      <router-link :to="`/profile/userpage/${user_info.nickname}`">
        <img class="profile-img" :src="profile_img_url" alt="프로필 이미지" />
      </router-link>
    </div>
    <div class="profile-info">
      <p class="user-info">
        <span class="user-text nickname">
          {{ user_info.nickname }}
        </span>
        <span class="user-text age_sex">{{ computed_user_info }}</span>
      </p>
      <p class="user-text team-info">{{ computed_club }}</p>
    </div>
  </header>
</template>

<script>
  import {
    onlyAgeCalculate,
    ageFromYear
  } from "@/assets/scripts/ageCalculate.js";
  import clubCalculate from "@/assets/scripts/clubCalculate.js";
  import { mapActions } from "vuex";

  export default {
    name: "evaluate-header",
    props: {
      user_info: {
        type: Object,
        default() {
          return {
            nickname: String,
            birth: String,
            teamIndex: Number
          };
        }
      }
    },
    computed: {
      computed_user_info() {
        const user_age = ageFromYear(this.user_info.birth);
        return onlyAgeCalculate(user_age) + "여";
      },
      computed_club() {
        return clubCalculate(this.user_info.teamIndex);
      }
    },
    data: () => ({
      profile_img_url: ""
    }),
    methods: {
      ...mapActions("profileStore", ["api_get_profile_photo"])
    },
    async mounted() {
      const response = await this.api_get_profile_photo(
        this.user_info.nickname
      );
      this.profile_img_url = response;
    }
  };
</script>

<style lang="scss" scoped>
  .evaluate-header {
    display: flex;
    margin-top: 48px;
    padding: 24px 14px;
    .profile-img-wrap {
      width: 58px;
      height: 58px;
      margin-right: 14px;
      .profile-img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }

    .profile-info {
      .user-text {
        display: inline-block;
        vertical-align: top;
        line-height: 19px;
        font-weight: 500;
      }
      .user-info {
        padding: 10px 0 4px;

        .nickname {
          color: #464646;
          font-size: 16px;
          letter-spacing: -0.64px;
        }
        .age_sex {
          margin-left: 8px;
          color: $dodger_blue;
          font-size: 14px;
          letter-spacing: -0.56px;
        }
      }
      .team-info {
        color: #797979;
        font-size: 14px;
        letter-spacing: -0.56px;
      }
    }
  }
</style>
