<template>
  <!-- login -->
  <div class="s-dialog-wrap login">
    <p class="dialog-headline">로그인이 필요합니다.</p>

    <div class="s-dialog-foot">
      <button class="close_dialog_btn" @click="config_dialog_state(false)">
        확인
      </button>
    </div>
  </div>
</template>

<script>
  import dialogMixin from "@/mixins/dialogMixin";
  export default {
    name: "dialog-login",
    mixins: [dialogMixin]
  };
</script>

<style lang="scss" scoped>
  @import "./Dialog.scss";
</style>
