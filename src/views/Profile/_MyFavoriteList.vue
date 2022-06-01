<template>
  <div class="profile-my_favorite_list">
    <top-bar :topbar_type="'back'" :topbar_text="'관심 목록'" />
    <div v-if="count_favorite_list > 0" class="favorite-company-list-wrapper">
      <company-list :company_list="favorite_company_list" />
    </div>
    <empty-view v-else :view_type="'favorite'" />
  </div>
</template>

<script>
  import TopBar from "@/components/Common/TopBar.vue";
  import CompanyList from "@/components/Company/CompanyList.vue";
  import { mapActions, mapGetters, mapState } from "vuex";
  import EmptyView from "@/components/Profile/EmptyView.vue";

  export default {
    name: "profile-my_favorite_list",
    components: { TopBar, CompanyList, EmptyView },
    computed: {
      ...mapState("profileStore", ["favorite_company_list"]),
      ...mapGetters("profileStore", ["count_favorite_list"])
    },
    methods: { ...mapActions("profileStore", ["get_favorite_company_list"]) },
    async mounted() {
      await this.get_favorite_company_list();
    }
  };
</script>

<style lang="scss" scoped>
  .profile-my_favorite_list {
    .favorite-company-list-wrapper {
      margin-top: 48px;
      padding: 18px 14px 40px;

      .empty-view {
        display: flex;
        flex-direction: column;
        align-items: center;

        height: calc(100vh - 48px);
        margin-top: -18px;
        .main-text {
          margin-top: 208px !important;
          font-size: 20px;
          font-weight: 500;
          letter-spacing: -0.8px;
          color: #1e1e1e;
        }
        .sub-text {
          margin-top: 8px !important;
          font-size: 15px;
          letter-spacing: -0.6px;
          color: #999;
        }
        .go-company-index-btn {
          display: inline-block;
          margin-top: 52px;
          width: 100%;
          padding: 10px 0;
          text-align: center;
          font-size: 14px;
          letter-spacing: -0.28px;
          color: #fff !important;
          background-color: $dodger_blue;
          border-radius: 4px;
        }
      }
    }
  }
</style>
