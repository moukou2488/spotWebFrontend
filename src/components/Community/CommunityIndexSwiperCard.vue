<template>
  <swiper-slide class="community-swiper-slide">
    <router-link
      :to="`/community/team/${this.team_item.team_idx}`"
      class="community-swiper-card"
    >
      <div class="s-talk-pre-team">
        <div class="swiper">
          <div class="swiper-card-wrapper">
            <!-- 이미지 들어갈 자리 -->
            <div
              class="d-flex justify-center align-center s-talk-pre-team-image"
            >
              <img
                class="s-talk-pre-team-logo"
                :src="require(`@/assets/images/${team_item.team_logo}`)"
                alt="구단 로고"
              />
            </div>
            <div class="s-talk-pre-team-name">
              {{ team_item.team }}
            </div>
            <div class="s-talk-pre-team-text text-truncate">
              {{ team_item.team_slogan }}
            </div>
          </div>
          <div class="swiper-pagination" slot="pagination"></div>
        </div>
      </div>
    </router-link>
  </swiper-slide>
</template>

<script>
  export default {
    name: "community-swiper-card",
    props: {
      team_item: {
        type: Object,
        default() {
          return {
            team: String,
            team_idx: Number,
            team_slogan: String
          };
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .community-swiper-slide {
    width: 86px !important;
    height: 136px !important;
    margin-right: 20px;

    &:first-child {
      margin: 0 20px 0 14px;
    }
    .community-swiper-card {
      width: 86px !important;
      height: 136px !important;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  .swiper-card-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    .s-talk-pre-team-image {
      margin-bottom: 12px;
      width: 86px;
      height: 86px;
      border-radius: 50%;
      overflow: hidden;
      background-color: #fff;
    }

    .s-talk-pre-team-logo {
      max-width: 100%;
    }

    .s-talk-pre-team-name {
      text-align: center;
      line-height: 20px;
      font-size: 12px;
      font-weight: 500;
      color: #1e1e1e;
    }

    .s-talk-pre-team-text {
      text-align: center;
      font-size: 10px;
      color: #999;
      overflow: hidden;
      line-height: 18px;
      max-width: 86px;
    }
  }
</style>
