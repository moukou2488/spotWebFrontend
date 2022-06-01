<template>
  <div class="d-flex flex-column s-post-list-small">
    <div
      v-if="title != ''"
      class="d-flex align-center s-post-list-small-header"
    >
      <div style="margin-right: 10px">{{ title }}</div>
    </div>
    <div
      class="d-flex flex-column s-post-list-small-item"
      v-for="team_item in team_list"
      :key="team_item.id"
    >
      <router-link
        :to="`/community/detail/${community_team.team_idx}/${team_item.id}`"
        class="d-flex s-post-list-small-item-box"
      >
        <div
          class="d-flex flex-shrink-0 flex-grow-0"
          :style="{
            backgroundSize: 'cover'
          }"
        >
          <img
            v-if="team_item.photoUrl"
            class="s-post-list-small-item-image"
            :src="team_item.photoUrl"
            alt="포스트 사진"
          />
          <img
            v-else
            class="s-post-list-small-item-image"
            :src="require('@/assets/images/empty_logo.png')"
            alt="포스트 사진"
          />
        </div>
        <div
          class="d-flex flex-column flex-grow-0 flex-shrink-1 s-post-list-small-item-contents"
        >
          <div class="d-flex flex-grow-1 flex-shrink-1 align-center">
            <div class="s-post-list-small-item-title">
              {{ team_item.title }}
            </div>
          </div>
          <div class="s-post-list-small-item-content flex-grow-0 flex-shrink-1">
            {{ team_item.content }}
          </div>
          <div class="s-post-list-small-team-count">
            조회 {{ team_item.viewCount }}
          </div>
        </div>
      </router-link>
    </div>
    <!-- 무한 스크롤 -->
    <infinite-loading
      v-if="!search_notice"
      ref="InfiniteLoading"
      @infinite="infiniteHandler"
      spinner="waveDots"
    >
      <div slot="no-more" class="no-more">
        <a
          v-if="team_list.length > 5"
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
      <span slot="spinner">
        <span class="custom-spinner"></span>
        <span class="custom-spinner"></span>
        <span class="custom-spinner"></span>
      </span>
    </infinite-loading>
  </div>
</template>

<script>
  import InfiniteLoading from "vue-infinite-loading";
  import { mapState, mapActions, mapMutations } from "vuex";
  export default {
    components: {
      InfiniteLoading
    },
    props: {
      title: { default: "BEST 실시간 인기 글" },
      filter_index: { default: -1 },
      search_notice: { default: false },
      keyword: { type: String }
    },
    computed: {
      ...mapState("communityStore", ["team_list", "page", "community_team"])
    },
    watch: {
      async filter_index() {
        this.set_team_list([]);
        if (!this.search_notice) {
          // 카테고리가 바뀌게 되면 초기화 상태로 바꿔줍니다.
          await this.$refs.InfiniteLoading.stateChanger.reset();
        }
      }
    },
    data() {
      return {};
    },
    methods: {
      ...mapMutations("communityStore", ["set_page_plus", "set_team_list"]),
      ...mapActions("modalStore", ["config_dialog_state"]),
      async infiniteHandler($state) {
        const payload = {
          teamIndex: this.community_team.team_idx,
          category: this.filter_index - 1,
          page: this.page
        };
        const response = await this.$store.dispatch(
          "communityStore/api_community_team_more",
          payload
        );

        this.set_page_plus(this.page + 1);
        setTimeout(() => {
          if (response.length) {
            $state.loaded();
          } else {
            $state.complete();
          }
        }, 1000);
      },
      go_to_top_scroll() {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    },
    mounted() {
      this.set_team_list([]);
    }
  };
</script>

<style lang="scss" scoped>
  .s-post-list-small {
    padding-top: 20px;
    font-weight: 800;
    background: #fbfbfb;
  }
  .s-post-list-small-header {
    font-size: 18px;
    padding: 0 12px;
    height: 20px;
  }

  .s-post-list-small-item {
    margin-top: 2px;
  }

  .s-post-list-small-item-box {
    width: 100%;
    padding: 12px;
    border-bottom: solid 1px #e9e9e9;
  }

  .s-post-list-small-item-image {
    height: 80px;
    width: 80px;
    border-radius: 2px;
    background-color: #fff;
  }

  .s-post-list-small-item-contents {
    padding-left: 12px;
  }

  .s-post-list-small-item-title {
    margin-top: 2px;
    font-size: 15px;
    font-weight: 700;
    color: #484848;
  }

  .s-post-list-small-item-content {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    word-break: break-all;
    margin-top: 10px;
    font-size: 12px;
    font-weight: 400;
    overflow: hidden;
    color: #616161;
  }

  .s-post-list-small-team-count {
    line-height: 12px;
    margin-top: 8px;
    font-size: 10px;
    font-weight: 400;
    color: #a8a8a8;
  }

  .s-post-list-small-more {
    padding-top: 16px;
    display: flex;
    justify-content: center;
    height: 70px;
    font-size: 14px;
    font-weight: 700;
    color: #616161;
  }

  .s-post-list-small-tag {
    white-space: nowrap;
    margin-right: 8px;
    padding: 0 2px;
    height: 16px;
    border-radius: 50px;
    border: solid 1px #51b9ff;
    background-color: #fff;
    color: #51b9ff;
    font-size: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    line-height: 17px;
  }

  .s-post-list-small-new-icon {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #61c5ff;
    color: white;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    display: flex;
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
</style>
