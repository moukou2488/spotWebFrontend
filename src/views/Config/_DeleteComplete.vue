<template>
  <section class="config-delete-complete">
    <nav class="nav">계정삭제</nav>
    <section class="body">
      <p class="delete-body-title">계정 삭제가 완료되었습니다.</p>
      <div class="button-wrap">
        <a
          href="#"
          @click.prevent="delete_complete('/user/sign-up/terms')"
          class="btn large fill"
          >새 계정 만들기</a
        >
        <a
          href="#"
          @click.prevent="delete_complete('/')"
          class="btn large fill_disabled"
          >둘러보기</a
        >
      </div>
    </section>
  </section>
</template>

<script>
  export default {
    name: "config-delete-complete",
    methods: {
      async delete_complete(where) {
        this.$router.push(where);
        await this.$store.dispatch("userStore/api_logout");
        location.reload();
      }
    }
  };
</script>

<style lang="scss" scoped>
  .config-delete-complete {
    .nav {
      padding: 12px 0;
      color: #373737;
      font-size: 16px;
      font-weight: 500;
      line-height: 24px;
      letter-spacing: -0.64px;
      text-align: center;
      border-bottom: 1px solid #e9e9e9;
    }

    .body {
      .delete-body-title {
        padding: 175px 0 40px;
        color: #1e1e1e;
        font-size: 20px;
        font-weight: 500;
        line-height: 27px;
        letter-spacing: -0.8px;
        text-align: center;
      }
      .button-wrap {
        padding: 10px 14px;
      }
    }
  }
</style>
