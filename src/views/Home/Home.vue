<template>
  <div class="home">
    <top-bar>
      <template v-slot:search-icon>
        <router-link class="button-link" to="/search">
          <img
            class="button-image"
            :src="require('@/assets/images/bt_search@3x.png')"
            alt="검색 아이콘"
          />
        </router-link>
      </template>
    </top-bar>
    <div class="home-header">
      <s-carousel />
    </div>
    <!-- 경기 일정 -->
    <game-schedule-preview />
    <!-- 새로운 동행 -->
    <company-swiper />
    <!-- 구단 이야기 -->
    <community-swiper />
    <!-- 베스트 인기글 -->
    <community-popular />
    <bottom-bar />
    <s-toast :where="'bottom-bar'" />
  </div>
</template>

<script>
  import TopBar from "@/components/Common/TopBar.vue";
  import BottomBar from "@/components/Common/BottomBar.vue";
  import SCarousel from "@/components/Common/SCarousel.vue";
  import CompanySwiper from "@/components/Home/CompanySwiper.vue";
  import GameSchedulePreview from "@/components/Home/GameSchedule/GameSchedulePreview.vue";
  import CommunityPopular from "@/components/Community/CommunityPopular.vue";
  import CommunitySwiper from "@/components/Community/CommunitySwiper.vue";
  import SToast from "@/components/Common/SToast.vue";
  import moment from "moment";

  import { mapMutations } from "vuex";

  export default {
    name: "home",
    components: {
      TopBar,
      SCarousel,
      BottomBar,
      CompanySwiper,
      GameSchedulePreview,
      CommunityPopular,
      CommunitySwiper,
      SToast
    },
    methods: {
      ...mapMutations("gameScheduleStore", [
        "set_search_year",
        "set_search_month",
        "set_search_day"
      ])
    },
    beforeRouteLeave(to, from, next) {
      if (to.name !== "company-search-result") {
        this.set_search_year(moment().format("YYYY"));
        this.set_search_month(moment().format("MM"));
        this.set_search_day(moment().format("DD"));
      }
      next();
    }
  };
</script>

<style lang="scss" scoped>
  .home {
    height: 100%;
    margin-bottom: 52px;
    .home-header {
      margin-top: 48px;
    }
  }
</style>
