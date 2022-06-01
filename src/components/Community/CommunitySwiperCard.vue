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
    width: 144px !important;
    height: 160px !important;
    margin-right: 10px;

    &:first-child {
      margin: 0 10px 0 14px;
    }
    .community-swiper-card {
      width: 144px !important;
      height: 142px !important;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 16px;
      border: 1px solid #e9e9e9;
      border-radius: 4px;
    }
  }
  .swiper-card-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    .s-talk-pre-team-image {
      margin: 0 13px 10px 16px;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      overflow: hidden;
      background-color: #fff;
    }

    .s-talk-pre-team-logo {
      max-width: 100%;
    }

    .s-talk-pre-team-name {
      text-align: center;
      line-height: 16px;
      font-size: 12px;
      font-weight: 700;
      color: #404040;
    }

    .s-talk-pre-team-text {
      text-align: center;
      margin-top: 3px;
      margin-bottom: 14px;
      font-size: 10px;
      font-weight: 400;
      color: #686868;
      overflow: hidden;
      line-height: 13px;
      max-width: 117px;
    }
  }
</style>
