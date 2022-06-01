<template>
  <div class="company-list" role="list">
    <company-list-item
      v-for="company_item in company_list"
      :key="company_item.id"
      :company_detail="company_item"
    />
  </div>
</template>

<script>
  import CompanyListItem from "./CompanyListItem.vue";

  export default {
    name: "company-list",
    components: { CompanyListItem },
    props: {
      company_list: {
        type: Array,
        required: true
      }
    }
  };
</script>

<style lang="scss">
  .company-list-item {
    & + .company-list-item {
      margin-top: 18px;
    }
  }
</style>
