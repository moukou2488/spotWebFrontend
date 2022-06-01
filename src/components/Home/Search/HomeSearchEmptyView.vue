<template>
  <section class="home-search-empty-view">
    <p class="main_text">검색 결과가 없습니다.</p>
    <p class="sub_text">{{ sub_text }}</p>
  </section>
</template>

<script>
  export default {
    name: "home-search-empty-view",
    props: {
      sub_text: {
        type: String,
        required: true
      }
    }
  };
</script>

<style lang="scss" scoped>
  .home-search-empty-view {
    margin-top: 27.8%;
    .main_text {
      font-size: 20px;
      font-weight: 500;
      letter-spacing: -0.8px;
      text-align: center;
      color: #1e1e1e;
    }
    .sub_text {
      margin-top: 8px !important;

      font-size: 15px;
      letter-spacing: -0.6px;
      text-align: center;
      color: #999;
    }
  }
</style>
