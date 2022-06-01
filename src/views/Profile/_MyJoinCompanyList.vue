<template>
  <div class="profile-join_company_list">
    <top-bar :topbar_type="'back'" :topbar_text="'참여 내역'" />
    <div class="company-list-container">
      <!-- 예정인 동행 -->
      <profile-my-join-company-list
        v-if="will_join_company_list.length"
        :company_list="will_join_company_list"
        :tour_state="'동행 예정'"
      />

      <!-- 진행중인 동행 -->
      <profile-my-join-company-list
        v-if="ing_join_company_list.length"
        :company_list="ing_join_company_list"
        :tour_state="'동행 진행 중'"
      />

      <!-- 완료된 동행 -->
      <profile-my-join-company-list
        v-if="done_join_company_list.length"
        :company_list="done_join_company_list"
        :tour_state="'동행 완료'"
      />
      <empty-view v-if="is_empty" :view_type="'join'" />
    </div>
    <s-toast :where="'bottom'" />
  </div>
</template>

<script>
  import TopBar from "@/components/Common/TopBar.vue";
  import ProfileMyJoinCompanyList from "@/components/Profile/ProfileMyJoinCompanyList.vue";
  import SToast from "@/components/Common/SToast.vue";
  import EmptyView from "@/components/Profile/EmptyView.vue";

  import { mapState } from "vuex";

  export default {
    name: "profile-join_company_list",
    components: { TopBar, ProfileMyJoinCompanyList, SToast, EmptyView },
    computed: {
      ...mapState("profileStore", [
        "ing_join_company_list",
        "will_join_company_list",
        "done_join_company_list"
      ]),
      is_empty() {
        return (
          this.will_join_company_list.length === 0 &&
          this.done_join_company_list.length === 0 &&
          this.ing_join_company_list.length === 0
        );
      }
    }
  };
</script>

<style lang="scss" scoped>
  .profile-join_company_list {
    .company-list-container {
      margin-top: 48px;
    }
  }
</style>
