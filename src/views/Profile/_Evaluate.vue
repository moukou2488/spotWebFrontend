<template>
  <div class="profile-evaluate">
    <top-bar :topbar_text="'동행날씨 평가하기'" :topbar_type="'back'" />
    <evaluate-header :user_info="user_profile_info" />
    <evaluate-weather :user_nick="user_profile_info.nickname" />
    <evaluate-short :short_type="'맑은'" />
    <evaluate-short :short_type="'흐린'" />
    <evaluate-detail />
    <s-toast :where="'top_bar'" />
  </div>
</template>

<script>
  import TopBar from "@/components/Common/TopBar.vue";
  import EvaluateHeader from "@/components/Profile/Evaluate/EvaluateHeader.vue";
  import EvaluateWeather from "@/components/Profile/Evaluate/EvaluateWeather.vue";
  import EvaluateShort from "@/components/Profile/Evaluate/EvaluateShort.vue";
  import EvaluateDetail from "@/components/Profile/Evaluate/EvaluateDetail.vue";
  import SToast from "@/components/Common/SToast.vue";

  import { mapMutations, mapState } from "vuex";

  export default {
    name: "profile-evaluate",
    components: {
      TopBar,
      EvaluateHeader,
      EvaluateWeather,
      EvaluateShort,
      EvaluateDetail,
      SToast
    },
    computed: {
      ...mapState("profileStore", [
        "user_profile_info",
        "router_guard_evaluate"
      ])
    },
    methods: {
      ...mapMutations("profileStore", [
        "set_router_guard_evaluate",
        "clear_evaluate_data"
      ])
    },
    mounted() {
      if (history.length !== this.$store.state.scrollStore.history_length) {
        const scroll_y = this.$store.state.scrollStore.scroll_info[
          "profile-evaluate"
        ];
        window.scrollTo(0, scroll_y);
      }
    },
    // 동행 평가 데이터 다 지워주기
    beforeRouteLeave(to, from, next) {
      if (to.name !== "profile-evaluate-short") this.clear_evaluate_data();
      next();
    }
  };
</script>
