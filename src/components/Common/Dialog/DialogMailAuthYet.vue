<template>
  <!-- confirm -->
  <div class="s-dialog-wrap mail-auth-yet">
    <p class="dialog-headline">
      아직 이메일 인증이 완료되지<br />
      않았습니다.
    </p>
    <div class="dialog-body">
      <p class="body-text">
        아래 메일 재전송 버튼을 눌러 이메일 인증을 완료해주시기 바랍니다.
      </p>
      <p class="body-text">메일함에서 인증메일을 확인해주시기 바랍니다.</p>
      <p class="body-text">이메일 인증이 완료되지 않은 경우,</p>
      <p class="body-text">앱 내 활동에 제약을 받을 수 있습니다.</p>
    </div>
    <div class="s-dialog-foot">
      <button class="close_dialog_btn" @click="config_dialog_state(false)">
        확인
      </button>
    </div>
    <div class="s-dialog-foot">
      <button class="close_dialog_btn gray" @click="call_api_resend_email">
        메일 재전송
      </button>
    </div>
  </div>
</template>

<script>
  import dialogMixin from "@/mixins/dialogMixin";
  import { mapState, mapActions } from "vuex";
  export default {
    name: "dialog-mail-auth-yet",
    mixins: [dialogMixin],
    computed: {
      ...mapState("userStore", ["user_info"])
    },
    methods: {
      ...mapActions("userStore", ["api_resend_email"]),
      ...mapActions("modalStore", ["config_toast_show"]),
      async call_api_resend_email() {
        this.config_dialog_state(false);
        this.config_toast_show("메일이 재전송되었습니다.");
        await this.api_resend_email(this.user_info.email);
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "./Dialog.scss";
</style>
