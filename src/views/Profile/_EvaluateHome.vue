<template>
  <section class="profile-evaluate-home">
    <top-bar :topbar_text="'동행 평가'" :topbar_type="'back'" />
    <section class="evaluate-home-body">
      <weather-range :user_weather="user_profile_info.weather" />
      <evaluate-list :evaluate_list="evaluate_list" />
      <!--  -->
      <router-link class="weather-guide-link" to="/about/weather">
        <p class="text-area">
          <span class="question-mark not-kr">Q</span>
          동행 날씨 규칙이 궁금하신가요?
        </p>
        <!--  -->
        <div class="image-wrapper">
          <img
            class="button-image"
            :src="require('@/assets/images/btn_arrow_right@3x.png')"
            alt="오른 화살표 아이콘"
          />
        </div>
      </router-link>
      <s-toast :where="'bottom'" />
    </section>
  </section>
</template>

<script>
  import TopBar from "@/components/Common/TopBar.vue";
  import WeatherRange from "@/components/Profile/UserPage/WeatherRange.vue";
  import EvaluateList from "@/components/Profile/UserPage/EvaluateList.vue";
  import SToast from "@/components/Common/SToast.vue";

  import { mapState } from "vuex";

  export default {
    name: "profile-evaluate-home",
    components: { TopBar, WeatherRange, EvaluateList, SToast },
    computed: {
      ...mapState("profileStore", ["user_profile_info", "evaluate_list"])
    }
  };
</script>

<style lang="scss" scoped>
  .profile-evaluate-home {
    .evaluate-home-body {
      margin-top: 48px;
      height: calc(100vh - 48px);
      background-color: #f0f0f0;
    }

    .weather-guide-link {
      display: flex;
      align-items: center;

      padding: 15px 6px 15px 14px;
      border-top: 8px solid #f0f0f0;
      background-color: #fff;

      .text-area {
        flex: 1;
        font-weight: 500;
        font-size: 14px;
        letter-spacing: -0.56px;
        color: #1e1e1e;
        .question-mark {
          display: inline-block;
          margin-right: 6px;

          color: $dodger_blue;
          font-size: 15px;
        }
      }
      .image-wrapper {
        width: 36px;
        height: 36px;
        .button-image {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
