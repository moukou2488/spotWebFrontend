<template>
  <div class="input-item email-form">
    <label class="input-label required" for="email">이메일</label>
    <div class="input-item-wrap">
      <input
        id="email"
        class="input-box"
        :class="{ active: focus.email }"
        type="text"
        placeholder="예: SPOT_BUDDY@gmail.com"
        @focus="set_focus($event, true)"
        @blur="set_focus($event, false)"
        @input="check_email"
        v-model="sign_up_info.email"
      />

      <button
        class="confirm-btn"
        :disabled="!email_confirm_btn"
        @click="call_api_valid_email"
      >
        중복확인
      </button>
    </div>

    <label class="alert-msg" v-show="check_boolean.email">
      {{ check_text.email }}
    </label>

    <div v-show="email_confirm_done">
      <label class="alert-msg-blue" v-show="valid_email">
        사용 가능한 이메일입니다.
      </label>
      <label class="alert-msg" v-show="!valid_email">
        이미 가입된 이메일입니다.
      </label>
    </div>
  </div>
</template>

<script>
  import formMixins from "@/mixins/formMixins.js";

  import { mapActions, mapState } from "vuex";

  export default {
    name: "form-email",
    computed: { ...mapState("userStore", ["valid_email"]) },
    data: () => ({
      sign_up_info: {
        email: ""
      },
      focus: {
        email: false
      },
      check_boolean: {
        email: false
      },
      check_text: {
        email: ""
      },
      fix_email: "",
      email_confirm_done: false,
      email_confirm_btn: false
    }),
    mixins: [formMixins],
    methods: {
      ...mapActions("userStore", ["api_valid_email"]),
      check_email() {
        this.check_boolean.email = false;
        this.email_confirm_btn = false;
        this.email_confirm_done = false;
        if (this.sign_up_info.email != "") {
          // eslint-disable-next-line no-useless-escape
          this.check_boolean.email = !/^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/.test(
            this.sign_up_info.email
          );
          this.check_text.email = this.check_boolean.email
            ? "올바른 이메일 형식이 아닙니다."
            : "";
          if (!this.check_boolean.email) this.email_confirm_btn = true;
        }
      },
      async call_api_valid_email() {
        await this.api_valid_email(this.sign_up_info.email);
        this.email_confirm_done = true;
        this.fix_email = this.sign_up_info.email;
      }
    }
  };
</script>
