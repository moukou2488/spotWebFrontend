<template>
  <div class="pass-reset">
    <top-bar :topbar_text="top_bar" :topbar_type="'back'" />
    <div role="main">
      <div class="pass-finish" v-if="pwd_finish">
        <user-frame
          :frame_info="info"
          :img="require('@/assets/images/pass_reset@3x.png')"
        />
        <s-footer>
          <button class="btn large fill" @click="go_sign_in">
            로그인 하기
          </button>
        </s-footer>
      </div>
      <div v-else class="pwd-reset-wrap">
        <div class="input-item">
          <label class="input-label">비밀번호</label>
          <div class="input-item-wrap">
            <input
              class="input-box"
              type="password"
              placeholder="비밀번호 (영문/숫자/특수문자(!@#$%^*+=-) 포함 8자 이상)"
              v-model="pass.pass"
            />
          </div>
          <label class="alert-msg" v-show="reg_pass"
            >영문/숫자/특수기호(!@#$%^*+=-) 8~20자로 입력해주세요.</label
          >
        </div>
        <div class="input-item">
          <label class="input-label">비밀번호 확인</label>
          <div class="input-item-wrap">
            <input
              class="input-box"
              id="email"
              type="password"
              placeholder="비밀번호 확인"
              v-model="pass.pass_check"
            />
          </div>
          <label class="alert-msg" v-show="pwd_pass"
            >비밀번호가 일치하지 않습니다.</label
          >
        </div>
        <div>
          <button
            class="btn confirm-btn"
            :class="confirm ? 'fill' : 'fill_disabled'"
            :disabled="!confirm"
            @click="next_page"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TopBar from "@/components/Common/TopBar.vue";
  import UserFrame from "@/layouts/UserFrame.vue";
  import SFooter from "@/layouts/SFooter.vue";
  import { mapActions } from "vuex";

  export default {
    components: { TopBar, UserFrame, SFooter },
    name: "pass-reset",
    watch: {
      pass: {
        deep: true,
        handler() {
          //비밀번호 유효성 체크
          this.reg_pass = !/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,30}$/.test(
            this.pass.pass
          );

          if (this.pass.pass != "" && this.pass.pass_check != "") {
            //비밀번호 일치 체크
            this.pwd_pass = this.pass.pass != this.pass.pass_check;
            //버튼 활성화
            this.confirm = !this.reg_pass && !this.pwd_pass;
          }
        }
      }
    },
    data() {
      return {
        top_bar: "비밀번호 재설정",
        confirm: false,
        pass: {
          pass: "",
          pass_check: ""
        },
        reg_pass: false,
        pwd_pass: false,
        pwd_finish: false,
        info: {
          frame_title: "버디님!",
          sub_text: ["비밀번호가 재설정 되었습니다."]
        }
      };
    },
    methods: {
      ...mapActions("userStore", ["api_setting_password_reset"]),
      async next_page() {
        const response = await this.api_setting_password_reset(this.pass.pass);
        if (response) {
          this.pwd_finish = true;
          this.top_bar = "비밀번호 찾기";
        }
      },
      go_sign_in() {
        this.$router.push({ name: "user-sign-in" });
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/styles/input.scss";
  .pass-reset {
    .pwd-reset-wrap {
      padding-top: 26px;
    }
    .confirm-btn {
      width: 100%;
      padding: 12px 0 11px 0;
      margin-top: 27px;
    }
  }
</style>
