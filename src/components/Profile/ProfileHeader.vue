<template>
  <header class="profile-header" role="main">
    <div class="header-weather-wrap">
      <user-weather
        :percentage="props_user_info.weather"
        :size="{
          width: 100,
          height: 100
        }"
        :percentage_show="true"
        :weather_icon="user_weather.icon_url"
        :image_upload="image_upload"
        :user_nick="props_user_info.nickname"
      />
    </div>
    <!-- profile-info -->
    <div class="profile-info-wrap">
      <p class="nickname">{{ props_user_info.nickname }}</p>
      <p class="weather-info">{{ user_weather.sub_text }}</p>
    </div>

    <!-- user-info -->
    <div class="user-info-wrap">
      <p class="user-info">
        <img
          class="icon-image"
          :src="require('@/assets/images/ic_person@3x.png')"
          alt=""
        />
        <span class="user-info-text"
          >{{ computed_user_age }} / {{ computed_user_gender }}</span
        >
      </p>
      <span class="custom_vertical_br"></span>
      <p class="user-info">
        <img
          class="icon-image"
          :src="require('@/assets/images/btn_favorite_active@3x.png')"
          alt=""
        />
        <span class="user-info-text">{{ computed_club }}</span>
      </p>
    </div>
    <!-- button-wrap -->
    <div class="button-wrap">
      <button class="btn fill large" @click="click_major_btn">
        {{
          is_home
            ? "나의 프로필 보기"
            : is_my_page
            ? "회원정보 수정"
            : "동행날씨 평가하기"
        }}
      </button>
    </div>
  </header>
</template>

<script>
  import UserWeather from "@/components/User/UserWeather.vue";
  import clubCalculate from "@/assets/scripts/clubCalculate.js";
  import {
    ageFromYear,
    onlyAgeCalculate
  } from "@/assets/scripts/ageCalculate.js";
  import weatherCalculate from "@/assets/scripts/weatherCalculate.js";

  import { mapState } from "vuex";

  export default {
    name: "profile-header",
    components: { UserWeather },
    computed: {
      ...mapState("userStore", ["user_info"]),
      ...mapState("profileStore", ["user_profile_info"]),
      is_home() {
        return this.$route.name === "profile-home" ? true : false;
      },
      computed_user_gender() {
        return this.props_user_info.gender === 1 ? "남성" : "여성";
      },
      computed_user_age() {
        const number_age = ageFromYear(this.props_user_info.birth);
        return onlyAgeCalculate(number_age);
      },
      computed_club() {
        return clubCalculate(this.props_user_info.teamIndex);
      },
      user_weather() {
        return weatherCalculate(this.props_user_info.weather);
      },
      is_my_page() {
        if (this.user_info)
          return this.user_info.nickname === this.user_profile_info.nickname;
        else return false;
      },
      image_upload() {
        return this.$route.name === "profile-user_page" && this.is_my_page;
      }
    },
    props: {
      props_user_info: {
        type: Object,
        default() {
          return {
            weather: Number,
            nickname: String,
            teamIndex: Number
          };
        }
      }
    },
    methods: {
      click_major_btn() {
        if (this.is_home)
          this.$router.push(
            `/profile/userpage/${this.props_user_info.nickname}`
          );
        else if (this.is_my_page) this.$router.push("/profile/modify");
        else {
          // 동행날씨 평가하기
          if (this.user_info === null) {
            this.$eventBus.$emit("alert", { type: "login" });
            return;
          }
          if (this.user_info.emailVerified === false) {
            this.$eventBus.$emit("alert", { type: "email-auth" });
            return;
          }
          this.$router.push(
            `/profile/evaluate/${this.props_user_info.nickname}`
          );
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .profile-header {
    background-color: #fff;
    border-bottom: 8px solid #f0f0f0;
    .header-weather-wrap {
      padding: 30px 0 26px;
      .user-weather-container {
        display: inline-flex;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    // profile-info
    .profile-info-wrap {
      margin-bottom: 13px;
      text-align: center;
      .nickname {
        margin-bottom: 2px !important;
        font-size: 18px;
        letter-spacing: -0.72px;
        color: #1e1e1e;
        font-weight: 500;
      }
      .weather-info {
        font-size: 14px;
        letter-spacing: -0.56px;
        color: #999;
      }
    }
    // user-info
    .user-info-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 23px;
      .user-info {
        .icon-image {
          margin-right: 6px;
          width: 14px;
          height: 14px;
          vertical-align: text-top;
        }
        .user-info-text {
          font-size: 14px;
          letter-spacing: -0.56px;
          color: #464646;
        }
      }
      .custom_vertical_br {
        display: inline-block;
        margin: 0 11px;
        width: 1px;
        height: 10px;
        background-color: #ddd;
      }
    }

    .button-wrap {
      padding: 6px 0;
      margin-bottom: 10px;
    }
  }
</style>
