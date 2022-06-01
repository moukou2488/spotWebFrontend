<template>
  <div class="company-search">
    <company-search-top-bar />
    <router-view />
  </div>
</template>

<script>
  import CompanySearchTopBar from "@/components/Company/CompanySearchTopBar";
  export default {
    name: "company-search",
    components: { CompanySearchTopBar },
    destroyed() {
      this.$store.commit("companyStore/set_company_search_date", ["", ""]);
      this.$store.commit("companyStore/set_company_search_keyword", "");
    }
  };
</script>
