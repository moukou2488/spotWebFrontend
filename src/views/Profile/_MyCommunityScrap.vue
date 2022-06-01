<template>
  <section class="profile-my_community_scrap">
    <top-bar :topbar_text="'나의 스크랩'" :topbar_type="'back'" />
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
    <section v-if="list_tab === 'community'">
      <community-list
        class="community-list"
        v-if="my_community_scrap.length"
        :community_list="my_community_scrap"
      />
      <empty-view v-else :page_id="'scrap'" />
    </section>

    <!--  -->
    <section v-else>
      <my-stamp-list v-if="stamp_list.length > 0" :stamp_list="stamp_list" />
      <div v-if="stamp_list.length === 0" class="empty-view">
        <p class="main">이런, 등록된 버디의 일기가 없어요.</p>
        <p class="sub">지금 바로 일기를 등록해보세요.</p>
      </div>
    </section>
  </section>
</template>

<script>
  import TopBar from "@/components/Common/TopBar.vue";
  import EmptyView from "@/components/Profile/Community/EmptyView.vue";
  import CommunityList from "@/components/Profile/Community/CommunityList.vue";
  import MyStampList from "@/components/Profile/Stamp/MyStampList.vue";

  import { mapActions, mapMutations, mapState } from "vuex";

  export default {
    name: "profile-my_community_scrap",
    components: {
      TopBar,
      EmptyView,
      CommunityList,
      MyStampList
    },
    watch: {
      async list_tab(new_tab) {
        if (new_tab === "buddy") {
          this.set_stamp_list([]);
          await this.api_get_my_scrap_list();
        }
      }
    },
    computed: {
      ...mapState("profileStore", ["my_community_scrap"]),
      ...mapState("stampStore", ["stamp_list"])
    },
    data: () => ({
      list_tab: "community" // community or buddy
    }),
    methods: {
      ...mapMutations("stampStore", ["set_stamp_list"]),
      ...mapActions("stampStore", ["api_get_my_scrap_list"])
    },
    beforeRouteLeave(to, from, next) {
      this.set_stamp_list([]);
      next();
    }
  };
</script>

<style lang="scss" scoped>
  .profile-my_community_scrap {
    // .community-list {
    //   margin-top: 48px;
    // }
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
</style>
