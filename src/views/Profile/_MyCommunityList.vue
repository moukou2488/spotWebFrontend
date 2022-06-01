<template>
  <section class="profile-my_community_list">
    <top-bar :topbar_text="'나의 작성 글'" :topbar_type="'back'" />
    <!--  -->
    <header class="list-header">
      <ul class="tab-list">
        <li class="tab-list-item">
          <a
            class="tab-list-link"
            :class="{ active: list_tab === 'community' }"
            href="#"
            @click.prevent="list_tab = 'community'"
            >구단 이야기
          </a>
        </li>
        <li class="tab-list-item">
          <a
            class="tab-list-link"
            :class="{ active: list_tab === 'buddy' }"
            href="#"
            @click.prevent="list_tab = 'buddy'"
            >버디 일기
          </a>
        </li>
      </ul>
    </header>

    <!--  -->
    <section v-if="list_tab === 'community'" class="list-body community">
      <community-list
        class="community-list"
        v-if="my_community_list.length"
        :community_list="my_community_list"
      />
      <empty-view v-else :page_id="'community_list'" />
    </section>

    <section v-else class="list-body community">
      <my-stamp-list v-if="stamp_list.length > 0" :stamp_list="stamp_list" />
      <infinite-loading
        ref="InfiniteLoading"
        @infinite="infiniteHandler"
        spinner="waveDots"
      >
        <div slot="no-more" class="no-more">
          <a
            v-if="stamp_list.length > 4"
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
          <div v-if="stamp_list.length === 0" class="empty-view">
            <p class="main">이런, 등록된 버디의 일기가 없어요.</p>
            <p class="sub">지금 바로 일기를 등록해보세요.</p>
          </div>
        </div>
        <span slot="spinner">
          <span class="custom-spinner"></span>
          <span class="custom-spinner"></span>
          <span class="custom-spinner"></span>
        </span>
      </infinite-loading>
    </section>
  </section>
</template>

<script>
  import TopBar from "@/components/Common/TopBar.vue";
  import EmptyView from "@/components/Profile/Community/EmptyView.vue";
  import CommunityList from "@/components/Profile/Community/CommunityList.vue";
  import MyStampList from "@/components/Profile/Stamp/MyStampList.vue";
  import InfiniteLoading from "vue-infinite-loading";

  import { mapActions, mapMutations, mapState } from "vuex";

  export default {
    name: "profile-my_community_list",
    components: {
      TopBar,
      EmptyView,
      CommunityList,
      MyStampList,
      InfiniteLoading
    },
    computed: {
      ...mapState("profileStore", ["my_community_list"]),
      ...mapState("stampStore", ["stamp_list", "stamp_list_scroll_index"])
    },
    watch: {
      async list_tab(new_tab) {
        if (new_tab === "buddy") {
          this.set_stamp_list_header("my");
        }
      }
    },
    data: () => ({
      list_tab: "community" // community or buddy
    }),
    methods: {
      ...mapMutations("stampStore", [
        "set_stamp_list_header",
        "set_stamp_list"
      ]),
      ...mapActions("stampStore", ["api_get_diary_list"]),
      async infiniteHandler($state) {
        const response = await this.api_get_diary_list(
          this.stamp_list_scroll_index
        );

        if (response.length) {
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
  .profile-my_community_list {
    .list-header {
      margin-top: 48px;
      .tab-list {
        display: flex;

        .tab-list-item {
          flex: 1;

          height: 40px;

          .tab-list-link {
            display: inline-flex;
            justify-content: center;
            align-items: center;

            width: 100%;
            height: 100%;

            font-size: 14px;
            color: #373737;
            letter-spacing: -0.56px;
            font-weight: 500;
            border-bottom: 1px solid #e9e9e9;

            &.active {
              border-bottom: 2px solid $dodger_blue;
              color: $dodger_blue !important;
            }
          }
        }
      }
    }
    // 무한 스크롤
    .infinite-loading-container {
      margin: 18px 0 50px;
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
        .empty-view {
          text-align: center;
          margin-top: 25.6%;
          .main {
            margin-bottom: 8px !important;
            font-size: 20px;
            font-weight: 500;
            line-height: 1.45;
            letter-spacing: -0.8px;
            color: #1e1e1e;
          }
          .sub {
            font-size: 15px;
            line-height: 1.4;
            letter-spacing: -0.6px;
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
      }
    }
  }
</style>
