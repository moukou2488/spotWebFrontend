<template>
  <section class="empty-view">
    <h1 class="main-text">{{ main_text }}</h1>
    <p class="sub-text">{{ sub_text }}</p>
    <router-link to="/company/index" class="btn fill large">{{
      link_text
    }}</router-link>
  </section>
</template>

<script>
  export default {
    name: "profile-empty-view",
    props: {
      view_type: {
        type: String,
        required: true
      }
    },
    computed: {
      main_text() {
        return this.view_type === "regist"
          ? "아직 모집한 동행이 없어요."
          : this.view_type === "favorite"
          ? "아직 관심 가진 동행이 없어요."
          : "아직 참여한 동행이 없어요.";
      },
      sub_text() {
        return this.view_type === "regist"
          ? "동행 모집 글을 작성해보세요."
          : this.view_type === "favorite"
          ? "관심 목록을 추가해보세요."
          : "동행에 참여해보세요.";
      },
      link_text() {
        return this.view_type === "regist"
          ? "동행 모집하기"
          : this.view_type === "favorite"
          ? "동행 목록 보러가기"
          : "동행 참여하러 가기";
      }
    }
  };
</script>

<style lang="scss" scoped>
  .empty-view {
    padding: 0 14px;
    text-align: center;

    .main-text {
      margin-top: 208px;
      font-size: 20px;
      letter-spacing: -0.8px;
      color: #1e1e1e;
      font-weight: 500;
    }
    .sub-text {
      margin: 8px 0 56px !important;
      font-size: 15px;
      letter-spacing: -0.6px;
      color: #999;
    }
    .btn {
      display: inline-block;
    }
  }
</style>
