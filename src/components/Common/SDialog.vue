<template>
  <div class="s-dialog" :style="style_obj">
    <!-- login -->
    <dialog-login v-if="dialog_type === 'login'" />
    <!-- 동행 차단 -->
    <dialog-company-block v-else-if="dialog_type === 'company-block'" />
    <!-- 동행 취소 -->
    <dialog-company-cancel v-else-if="dialog_type === 'company-cancel'" />
    <!-- 동행 작성 -> 임시 저장 불러올지 확인 -->
    <dialog-company-temp-save v-else-if="dialog_type === 'company-temp-save'" />
    <!-- 확인창 commonDialog -->
    <dialog-confirm v-else-if="dialog_type === 'confirm'" />
    <!-- 페이지 나가는 것 막는 확인창 -->
    <dialog-evaluate-weather v-else-if="dialog_type === 'evaluate-weather'" />
    <!-- 메일 미인증 프로필 안내 -->
    <dialog-mail-auth-yet v-else-if="dialog_type === 'mail-auth-yet'" />
  </div>
</template>

<script>
  import DialogCompanyCancel from "./Dialog/DialogCompanyCancel.vue";
  import DialogLogin from "./Dialog/DialogLogin.vue";
  import DialogCompanyBlock from "./Dialog/DialogCompanyBlock.vue";
  import DialogCompanyTempSave from "./Dialog/DialogCompanyTempSave.vue";
  import DialogConfirm from "./Dialog/DialogConfirm.vue";
  import DialogEvaluateWeather from "./Dialog/DialogEvaluateWeather.vue";

  import { mapState } from "vuex";
  import DialogMailAuthYet from "./Dialog/DialogMailAuthYet.vue";

  export default {
    name: "s-dialog",
    components: {
      DialogCompanyCancel,
      DialogLogin,
      DialogCompanyBlock,
      DialogConfirm,
      DialogCompanyTempSave,
      DialogEvaluateWeather,
      DialogMailAuthYet
    },
    computed: {
      ...mapState("modalStore", ["dialog_type", "dialog_scroll_height"]),

      style_obj() {
        return {
          top: this.dialog_scroll_height + "px"
        };
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "./Dialog/Dialog.scss";
</style>
