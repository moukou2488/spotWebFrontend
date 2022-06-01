<template>
  <div class="community-team view">
    <top-bar :topbar_type="'back'" :topbar_text="'우리 구단 이야기'">
      <template v-slot:top_bar_right> <community-search-btn /> </template
    ></top-bar>
    <community-team-header />
    <ul>
      <community-team-item
        v-for="community_team_item in team_list"
        :key="community_team_item.id"
        :community_team_item="community_team_item"
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
        <!-- 엠티뷰가 no-more 로 인식되는 문제 -->
        <div v-if="team_list.length === 0" class="community-empty-view">
          <p class="main">아직 게시글이 없어요.</p>
          <p class="sub">구단의 새로운 이야기를 검색해보세요.</p>
        </div>
      </div>
      <div slot="no-results">
        <div v-if="team_list.length === 0" class="community-empty-view">
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
    <div class="plus_btn" @click="go_write">
      <img :src="require('@/assets/images/plus_btn.png')" alt="글작성" />
    </div>
    <s-toast :where="'bottom'" />
  </div>
</template>

<script>
  import TopBar from "@/components/Common/TopBar.vue";
  import teams_list from "@/assets/data/teams_list.js";
  import CommunityTeamHeader from "@/components/Community/CommunityTeamHeader.vue";
  import CommunityTeamItem from "@/components/Community/CommunityTeamItem.vue";
  import InfiniteLoading from "vue-infinite-loading";
  import CommunitySearchBtn from "@/components/Community/CommunitySearchBtn.vue";
  import SToast from "@/components/Common/SToast.vue";

  import { mapState, mapMutations } from "vuex";

  export default {
    name: "community-team",
    components: {
      TopBar,
      CommunityTeamHeader,
      CommunityTeamItem,
      InfiniteLoading,
      CommunitySearchBtn,
      SToast
    },
    watch: {
      async filter_index() {
        this.set_page_plus(0);
        this.set_team_list([]);
        // 카테고리가 바뀌게 되면 초기화 상태로 바꿔줍니다.
        await this.$refs.InfiniteLoading.stateChanger.reset();
      },
      async team_list(newVal) {
        // 리스트가 초기화 되면, 인피니티 스크롤도 초기화 상태로 바꿔줍니다.
        if (newVal.length == 0) {
          await this.$refs.InfiniteLoading.stateChanger.reset();
          this.set_page_plus(0);
        }
      }
    },
    computed: {
      ...mapState("communityStore", [
        "page",
        "team_list",
        "community_team",
        "filter_index",
        "community_write_complete"
      ]),
      ...mapState("userStore", ["user_info"]),

      team_logo() {
        return teams_list[this.community_team.team_idx - 1].team_logo;
      }
    },
    methods: {
      ...mapMutations("communityStore", [
        "set_page_plus",
        "set_team_list",
        "set_filter_index"
      ]),
      ...mapMutations("communityStore", [
        "set_modify_community_id",
        "set_community_write_complete"
      ]),
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
        if (response.length > 0) {
          this.set_page_plus(this.page + 1);
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
      },
      go_write() {
        if (this.user_info) {
          if (this.user_info.emailVerified === false) {
            this.$eventBus.$emit("alert", { type: "email-auth" });
          } else {
            this.set_modify_community_id(null);
            this.$router.push(
              `/community/write/${this.community_team.team_idx}`
            );
          }
        } else {
          this.$eventBus.$emit("alert", {
            type: "login"
          });
        }
      },
      go_to_top_scroll() {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    },
    // 리스트 로딩 이슈로 인한 스크롤 동작 코드
    mounted() {
      if (history.length !== this.$store.state.scrollStore.history_length) {
        const scroll_y = this.$store.state.scrollStore.scroll_info[
          "community-team"
        ];
        window.scrollTo(0, scroll_y);
      }
      // 작성 후 뒤로 가기를 한 경우
      if (this.community_write_complete) {
        this.set_page_plus(0);
        this.set_team_list([]);
        this.set_community_write_complete(false);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .plus_btn {
    position: fixed;
    right: 14px;
    bottom: 35px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;

    border-radius: 50%;
    background-color: $dodger_blue;
    box-shadow: 0 3px 6px grey;
  }
  .no-more {
    .top-btn-link {
      display: inline-block;

      .top-btn-ico {
        width: 38px;
        height: 38px;
        margin: 10px 0;
      }
    }
  }
  .community-empty-view {
    margin-top: 60px;
    .main {
      margin-bottom: 6px !important;
      font-size: 20px;
      font-weight: 500;
      line-height: 1.38;
      letter-spacing: -0.32px;
      text-align: center;
      color: #1e1e1e;
    }
    .sub {
      font-size: 15px;
      line-height: 1.75;
      letter-spacing: -0.24px;
      text-align: center;
      color: #999;
    }
    @media screen and (max-width: 330px) {
      .main {
        font-size: 18px;
      }
      .sub {
        font-size: 14px;
      }
    }
  }
</style>
