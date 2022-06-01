<template>
  <div class="company-search-result-header">
    <p v-if="list_number" class="header-txt">
      <span class="number">{{ list_number }}</span
      >개의 동행을 둘러보세요.
    </p>
    <p v-else class="header-txt"><span class="number">NEW</span> 새로운 동행</p>
  </div>
</template>

<script>
  export default {
    name: "company-search-result-header",
    props: {
      list_number: {
        type: Number
      }
    }
  };
</script>

<style lang="scss" scoped>
  .company-search-result-header {
    .header-txt {
      padding: 18px 0;
      line-height: 21px;
      font-size: 15px;
      font-weight: 500;
      letter-spacing: -0.75px;
      color: #1e1e1e;
      .number {
        color: $dodger_blue;
        letter-spacing: -0.3px;
      }
    }
  }
</style>
