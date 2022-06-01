<template>
  <a class="home-search-all-header" href="#">
    <span class="header-text dodger not-kr">{{ list_length }}</span>
    <span class="header-text">개의 {{ header_text }}을 만나보세요.</span>
    <div class="img-wrap">
      <img
        class="icon-image"
        :src="require('@/assets/images/home_all_bt@3x.png')"
        alt="전체보기 화살표 아이콘"
      />
    </div>
  </a>
</template>

<script>
  export default {
    name: "home-search-all-header",
    props: {
      list_length: {
        type: Number,
        required: true
      },
      header_text: {
        type: String,
        required: true
      }
    }
  };
</script>

<style lang="scss" scoped>
  .home-search-all-header {
    display: flex;
    align-items: center;
    padding: 18px 0;

    .header-text {
      color: #1e1e1e;
      font-size: 15px;
      font-weight: 600;
      line-height: 21px;
      letter-spacing: -0.6px;
    }
    .dodger {
      color: $dodger_blue;
      font-weight: 500;
      letter-spacing: -0.3px;
    }

    .img-wrap {
      margin-left: 2px;
      width: 12px;
      height: 12px;
      .icon-image {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
