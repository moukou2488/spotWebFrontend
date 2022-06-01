<template>
  <div class="join-member-list-header">
    <company-list-item :company_detail="join_company_detail" />
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import CompanyListItem from "@/components/Company/CompanyListItem.vue";
  export default {
    name: "join-member-list-header",
    components: { CompanyListItem },
    computed: { ...mapState("profileStore", ["join_company_detail"]) }
  };
</script>

<style lang="scss" scoped>
  .join-member-list-header {
    margin-top: 48px;
    padding: 18px 14px;
  }
</style>
