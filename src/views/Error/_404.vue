<template>
  <div class="error-404">
    <section class="error-body">
      <p class="main-text">
        이런!
        <br />
        현재 찾을 수 없는 페이지입니다
      </p>
      <p class="sub-text">
        존재하지 않는 주소를 입력하셨거나,
        <br />
        요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
      </p>
    </section>
    <footer class="btn-wrapper">
      <router-link to="/" class="go-home-link">홈으로 돌아가기</router-link>
    </footer>
  </div>
</template>

<script>
  export default {
    name: "error-404"
  };
</script>

<style lang="scss" scoped>
  @import "./Error.scss";
</style>
