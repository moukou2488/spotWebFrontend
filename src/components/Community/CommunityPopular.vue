<template>
  <div class="s-post-list view">
    <div class="s-post-list-header pd-row-14">
      <div style="margin-right: 10px">BEST 인기글</div>
    </div>
    <ul>
      <community-popular-item
        v-for="(community_popular_item, index) in community_popular"
        :key="index"
        :community_popular_item="community_popular_item"
        :index="index"
      />
    </ul>
    <!-- 무한 스크롤 -->
    <infinite-loading
      ref="InfiniteLoading"
      @infinite="infiniteHandler"
      spinner="waveDots"
    >
      <div slot="no-more" class="no-more">
        <a
          v-if="community_popular.length > 5"
          class="top-btn-link"
          href="#"
          @click.prevent="go_to_top_scroll"
        >
          <img
            class="top-btn-ico"
            :src="require('@/assets/images/btn_top@3x.png')"
            alt="최상위로 스크롤"
          />
        </a>
      </div>
      <div slot="no-results">
        <div v-if="community_popular.length === 0" class="community-empty-view">
          <p class="main">아직 게시글이 없어요.</p>
          <p class="sub">구단의 새로운 이야기를 검색해보세요.</p>
        </div>
      </div>
      <span slot="spinner">
        <span class="custom-spinner"></span>
        <span class="custom-spinner"></span>
        <span class="custom-spinner"></span>
      </span>
    </infinite-loading>
  </div>
</template>

<script>
  import { mapActions, mapState, mapMutations } from "vuex";
  import clubCalculate from "@/assets/scripts/clubCalculate.js";
  import CommunityPopularItem from "./CommunityPopularItem.vue";
  import InfiniteLoading from "vue-infinite-loading";

  export default {
    components: { CommunityPopularItem, InfiniteLoading },
    computed: {
      ...mapState("communityStore", ["community_popular", "popular_page"])
    },
    methods: {
      ...mapMutations("communityStore", [
        "set_popular_page_plus",
        "set_community_popular"
      ]),
      ...mapActions("communityStore", [
        "api_community_detail",
        "api_community_popular_more"
      ]),
      ...mapActions("modalStore", ["config_dialog_state"]),
      async infiniteHandler($state) {
        if (this.popular_page === 5) {
          $state.complete();
        } else {
          const response = await this.$store.dispatch(
            "communityStore/api_community_popular_more",
            this.popular_page
          );
          if (response.length > 0) {
            this.set_popular_page_plus(this.popular_page + 1);
            setTimeout(() => {
              if (response.length) {
                $state.loaded();
              } else {
                $state.complete();
              }
            }, 1000);
          } else {
            $state.complete();
          }
        }
      },
      computed_club(teamIndex) {
        return clubCalculate(teamIndex);
      },
      go_to_top_scroll() {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .s-post-list {
    margin-bottom: 55px;
    padding-top: 26px;
  }

  .s-post-list-header {
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: -0.96px;
    color: #1e1e1e;
  }
  // 무한 스크롤
  .infinite-loading-container {
    margin-top: 18px;
    .infinite-status-prompt {
      & > span {
        display: inline-flex;
        padding: 17px 0;
      }

      .custom-spinner {
        display: inline-block;
        vertical-align: middle;
        width: 4px;
        height: 4px;
        background-color: $dodger_blue;
        border-radius: 50%;

        & + .custom-spinner {
          margin-left: 6px;
        }
      }
      .no-more {
        .top-btn-link {
          display: inline-block;

          .top-btn-ico {
            width: 38px;
            height: 38px;
          }
        }
      }
    }
  }
  .community-empty-view {
    margin-top: 48px;
    .main {
      margin-bottom: 5px !important;
      font-size: 16px;
      font-weight: 500;
      line-height: 1.38;
      letter-spacing: -0.32px;
      text-align: center;
      color: #1e1e1e;
    }
    .sub {
      font-size: 12px;
      line-height: 1.75;
      letter-spacing: -0.24px;
      text-align: center;
      color: #999;
    }
  }
</style>
