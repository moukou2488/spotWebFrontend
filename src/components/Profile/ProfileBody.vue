<template>
  <section class="profile-body">
    <weather-range :user_weather="user_info.weather" />
    <company-count :user_info="user_info" />
    <evaluate-rank
      v-if="user_info.popularReviews.length"
      :best_evaluate_list="user_info.popularReviews"
    />
    <evaluate-last
      v-if="user_info.latestReviews.length"
      :last_evaluate_list="user_info.latestReviews"
    />
  </section>
</template>

<script>
  import WeatherRange from "@/components/Profile/UserPage/WeatherRange.vue";
  import CompanyCount from "@/components/Profile/UserPage/CompanyCount.vue";
  import EvaluateRank from "@/components/Profile/UserPage/EvaluateRank.vue";
  import EvaluateLast from "@/components/Profile/UserPage/EvaluateLast.vue";

  export default {
    name: "profile-body",
    components: { WeatherRange, CompanyCount, EvaluateRank, EvaluateLast },
    props: {
      user_info: {
        type: Object,
        default() {
          return {
            weather: Number,
            nickname: String
          };
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .profile-body {
    background-color: #fff;
  }
</style>
