<template>
  <div class="communuty-index">
    <top-bar :topbar_text="'구단 이야기'"></top-bar>
    <div class="community-index-swiper-wrap">
      <community-index-swiper />
    </div>
    <div class="community-index-button-wrap">
      <router-link class="button-link" :to="`/game_schedule/view_all`">
        <div class="community-index-button">
          <img
            class="button-image"
            :src="require('@/assets/images/ic_date_active@3x.png')"
            alt="경기일정"
          />
          <span class="button-text">경기일정</span>
        </div>
      </router-link>
      <router-link class="button-link" :to="`/community/rank`">
        <div class="community-index-button">
          <img
            class="button-image"
            :src="require('@/assets/images/ic_baseball_active@3x.png')"
            alt="구단 순위"
          />
          <span class="button-text">구단순위</span>
        </div>
      </router-link>
    </div>
    <community-popular />
    <s-toast :where="'bottom-bar'" />
    <bottom-bar />
  </div>
</template>

<script>
  import TopBar from "@/components/Common/TopBar.vue";
  import BottomBar from "@/components/Common/BottomBar.vue";
  import CommunityPopular from "@/components/Community/CommunityPopular.vue";
  import CommunityIndexSwiper from "@/components/Community/CommunityIndexSwiper.vue";
  import SToast from "@/components/Common/SToast.vue";

  export default {
    name: "communuty-index",
    components: {
      TopBar,
      BottomBar,
      CommunityPopular,
      CommunityIndexSwiper,
      SToast
    }
  };
</script>

<style lang="scss" scoped>
  .community-index-swiper-wrap {
    margin-top: 48px;
  }
  .community-swiper-slide {
    .community-swiper-card {
      border: none !important;
    }
  }
  .community-index-button-wrap {
    display: flex;
    padding: 22px 14px 0;
    .button-link {
      width: 100%;
      .community-index-button {
        display: flex;
        width: 100%;
        height: 46px;
        padding: 12px;
        border-radius: 6px;
        background-color: #fff;
        border: #ddd solid 1px;

        .button-image {
          width: 22px;
          height: 22px;
        }
        .button-text {
          font-size: 15px;
          font-weight: 500;
          line-height: 22px;
          letter-spacing: -0.6px;
          color: #454545;
        }
      }
      & + .button-link {
        margin-left: 12px;
      }
    }
  }
</style>
