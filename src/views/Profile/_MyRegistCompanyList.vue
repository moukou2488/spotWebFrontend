<template>
  <div class="profile-my_regist_company_list">
    <top-bar :topbar_type="'back'" :topbar_text="'모집 내역'" />
    <div class="company-list-container">
      <div v-if="not_end_regist_company_list.length" class="recruit-true">
        <profile-my-regist-company-list
          :company_list="not_end_regist_company_list"
        />
      </div>

      <div v-if="end_regist_company_list.length" class="recruit-done">
        <profile-my-regist-company-list
          :company_list="end_regist_company_list"
          :is_finish="true"
        />
      </div>

      <empty-view v-if="empty_view" :view_type="'regist'" />
    </div>
    <s-toast :where="'bottom'" />
  </div>
</template>

<script>
  import TopBar from "@/components/Common/TopBar.vue";
  import ProfileMyRegistCompanyList from "@/components/Profile/ProfileMyRegistCompanyList.vue";
  import EmptyView from "@/components/Profile/EmptyView.vue";
  import SToast from "@/components/Common/SToast.vue";

  import { mapState } from "vuex";

  export default {
    name: "profile-my_regist_company_list",
    components: { TopBar, ProfileMyRegistCompanyList, EmptyView, SToast },
    computed: {
      ...mapState("profileStore", [
        "not_end_regist_company_list",
        "end_regist_company_list"
      ]),
      empty_view() {
        return (
          this.not_end_regist_company_list.length === 0 &&
          this.end_regist_company_list.length === 0
        );
      }
    }
  };
</script>

<style lang="scss" scoped>
  .profile-my_regist_company_list {
    .company-list-container {
      margin-top: 48px;
    }
  }
</style>
