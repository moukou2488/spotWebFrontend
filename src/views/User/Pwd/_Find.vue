<template>
  <div class="pwd-find">
    <top-bar :topbar_text="'비밀번호 찾기'" :topbar_type="'back'" />
    <div role="main">
      <div class="auth-input-wrap">
        <div class="input-item">
          <label class="input-label">이름</label>
          <div class="input-item-wrap">
            <input
              class="input-box"
              type="text"
              placeholder="이름 입력"
              v-model="user.name"
            />
          </div>
        </div>
        <div class="input-item">
          <label class="input-label">이메일</label>
          <div class="input-item-wrap">
            <input
              class="input-box"
              type="text"
              placeholder="이메일 입력"
              v-model="user.email"
              @input="check_email_valid"
            />
          </div>
        </div>
      </div>
      <div>
        <button v-if="btn_loading" class="btn loading-btn flat">
          <img
            class="loading-img"
            :src="require('@/assets/videos/loading_blue_ver.gif')"
            alt="버튼 로딩"
          />
        </button>
        <button
          v-else
          class="btn send-btn"
          :class="submit ? 'flat' : 'flat_disabled'"
          :disabled="!submit"
          @click="send_email_auth"
        >
          인증번호 발송
        </button>
      </div>
    </div>
    <div class="divide-line" />
    <div class="pd-row-14">
      <div class="input-item">
        <label class="input-label">인증번호 입력</label>
        <div class="input-item-wrap">
          <input
            class="input-box"
            type="text"
            :readonly="!next_step"
            placeholder="인증번호 입력"
            v-model="checkNum"
          />
          <button
            class="btn flat confirm-btn"
            :disabled="!next_step"
            @click="check_token_number"
          >
            확인
          </button>
        </div>
      </div>
      <div>
        <button
          class="btn next-btn"
          :class="identity_complete ? 'fill' : 'fill_disabled'"
          :disabled="!identity_complete"
          @click="next_page"
        >
          다음
        </button>
      </div>
    </div>
    <s-toast :where="'bottom'" />
  </div>
</template>

<script>
  import TopBar from "@/components/Common/TopBar.vue";
  import SToast from "@/components/Common/SToast.vue";

  import { mapState, mapMutations, mapActions } from "vuex";

  export default {
    name: "pwd-find",
    components: { TopBar, SToast },
    computed: {
      ...mapState("userStore", ["identity_complete"])
    },
    watch: {
      user: {
        deep: true,
        handler() {
          this.submit = this.user.name !== "" && this.email_valid;
        }
      }
    },
    data() {
      return {
        btn_loading: false,
        submit: false,
        user: {
          name: "",
          email: ""
        },
        email_valid: false,
        checkNum: "",
        next_step: false
      };
    },
    methods: {
      ...mapMutations("userStore", [
        "set_identity_complete",
        "set_pass_find_email"
      ]),
      ...mapActions("userStore", [
        "api_setting_password_send_email",
        "api_setting_password_token_check"
      ]),
      ...mapActions("modalStore", ["config_toast_show"]),
      next_page() {
        this.set_pass_find_email(this.user.email);
        this.$router.push({ name: "user-pwd-reset" });
      },
      check_email_valid() {
        // eslint-disable-next-line no-useless-escape
        this.email_valid = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/.test(
          this.user.email
        );
      },
      async send_email_auth() {
        this.btn_loading = true;
        const response_message = await this.api_setting_password_send_email(
          this.user
        );
        this.config_toast_show(response_message);

        if (response_message === "인증번호가 발송되었습니다.")
          this.next_step = true;
        else this.next_step = false;

        this.btn_loading = false;
      },

      async check_token_number() {
        const payload = {
          email: this.user.email,
          token: this.checkNum
        };
        const response_message = await this.api_setting_password_token_check(
          payload
        );
        if (response_message === "correct") {
          this.set_identity_complete(true);
          this.config_toast_show("인증되었습니다.");
        } else {
          this.set_identity_complete(false);
          this.config_toast_show("일치하지 않습니다.");
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/styles/input.scss";
  .pwd-find {
    .auth-input-wrap {
      padding-top: 26px;
    }

    .send-btn {
      width: 100%;
      padding: 14px 0 13px 0;
      margin-top: 25px;
    }
    .loading-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      margin-top: 25px;
      .loading-img {
        width: 300px;
        height: 47px;
      }
    }

    .confirm-btn {
      &:disabled {
        color: #999 !important;
      }
    }

    .next-btn {
      width: 100%;
      padding: 12px 0 11px 0;
      margin-top: 27px;
    }

    .divide-line {
      width: 100%;
      height: 8px;
      margin: 30px 0 26px;
      background-color: #f0f0f0;
    }
  }
</style>
