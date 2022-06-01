<template>
  <div class="mail-auth view">
    <top-bar :topbar_type="'back'" :topbar_text="'본인 인증'" />
    <div role="main">
      <user-frame
        :frame_info="frame_info"
        v-if="user_mail_auth"
        :nickname="user_mail_auth.nickname"
        :img="img"
      />
      <div class="user-frame-button-wrapper">
        <div class="user-frame-button-label-wrapper">
          <label class="star">* </label
          ><label class="user-frame-button-explain"
            >앗, 메일을 받지 못하셨나요?</label
          >
        </div>
        <button class="btn large fill" @click="call_api_resend_email">
          메일 재전송
        </button>
        <router-link class="btn large fill" to="/user/sign-in">
          완료
        </router-link>
      </div>
    </div>
    <s-toast :where="'top_bar'" />
  </div>
</template>

<script>
  import TopBar from "@/components/Common/TopBar.vue";
  import UserFrame from "@/layouts/UserFrame.vue";
  import SToast from "@/components/Common/SToast.vue";
  import { mapActions, mapState } from "vuex";
  export default {
    name: "user-mail-auth",
    components: { TopBar, UserFrame, SToast },
    computed: {
      ...mapState("userStore", ["user_mail_auth"])
    },
    data: () => ({
      img: require("@/assets/images/empty_02@3x.png"),
      frame_info: {
        frame_title: "님!",
        sub_text: ["인증 메일을 발송했습니다."],
        sub_text_small: [
          "메일함에서 teamspot0925@gmail.com의 인증 메일을 확인해주세요.",
          "이메일의 인증완료 버튼을 누르시면 회원가입이 완료됩니다."
        ],
        sub_text_explain: [
          "인증메일은 발송 시점으로부터 1시간 동안만 유효하며, 재발송 시 기존 인증 코드는 완료됩니다. 반드시 마지막에 수신된 메일을 확인해주시기 바랍니다.",
          "메일이 도착하지 않았다면 스팸함을 확인해주시기 바랍니다."
        ]
      }
    }),
    methods: {
      ...mapActions("userStore", ["api_resend_email"]),
      call_api_resend_email() {
        this.api_resend_email(this.user_mail_auth.email);
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import "@/assets/styles/input.scss";
  .user-frame-button-wrapper {
    margin: 68px 0 40px !important;
    .user-frame-button-label-wrapper {
      margin-bottom: 6px;
      line-height: 17px;
      letter-spacing: -0.72px;
      font-size: 12px;
      .user-frame-button-explain {
        color: #636363;
      }
      .star {
        color: dodgerblue;
      }
    }
    .v-input--is-focused {
      color: #636363 !important;
      border: 1px solid !important;
    }
  }
</style>
