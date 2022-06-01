<template>
  <div class="error-500">
    <section class="error-body">
      <p class="main-text">죄송합니다 :(</p>
      <p class="main-text">
        현재 일시적인 문제로
        <br />
        작동하지 않는 페이지입니다
      </p>
      <p class="sub-text">
        내부 서버 오류 또는 찾고 있는 리소스에
        <br />
        문제가 있어 표시할 수 없습니다
      </p>
    </section>
    <footer class="btn-wrapper">
      <router-link to="/" class="go-home-link">홈으로 돌아가기</router-link>
    </footer>
  </div>
</template>

<script>
  export default {
    name: "error-500"
  };
</script>

<style lang="scss" scoped>
  @import "./Error.scss";
</style>
