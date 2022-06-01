<template>
  <div class="sign-in">
    <top-bar :topbar_type="'x'" :topbar_text="'나의 SPOT BUDDY'" />
    <div role="main">
      <div v-show="sign_in_error" class="toast-alert">
        <p class="alert-text">이메일 또는 비밀번호를 확인해주세요.</p>
      </div>
      <!-- 자동 로그인 -->
      <div class="auto-login-wrap custom-checkbox-wrap">
        <input
          id="auto-login"
          v-model="sign_in_info.rememberMe"
          class="custom-checkbox"
          type="checkbox"
        />
        <label for="auto-login" class="custom-label">로그인 상태 유지</label>
      </div>
      <!-- 로그인 인풋 -->
      <div class="input-wrap">
        <input
          id="email"
          class="input-box login-input"
          v-model="sign_in_info.email"
          @input="clear_sign_in_error"
          @blur="blur_handler"
          ref="email"
          type="text"
          placeholder="이메일을 입력해주세요"
        />
        <input
          id="password"
          class="input-box login-input"
          v-model="sign_in_info.password"
          @input="clear_sign_in_error"
          @blur="blur_handler"
          type="password"
          ref="password"
          placeholder="비밀번호를 입력해주세요"
          @keypress.enter="call_api_login"
        />
      </div>
      <!-- 로그인, 회원가입 버튼 -->
      <div class="action-btn-wrap">
        <button class="btn fill large" @click="call_api_login">로그인</button>
        <router-link to="/user/sign-up" class="btn flat large"
          >회원가입</router-link
        >
      </div>
      <!-- 비밀번호 찾기 -->
      <div class="find-pw-wrap">
        <router-link to="/user/pwd/find">비밀번호 찾기</router-link>
      </div>
      <!-- social login -->
      <div class="social-wrap">
        <!-- <a
          href="#"
          class="social-btn kakao"
          @click.prevent="api_oauth_kakao"
        ></a>
        <a
          href="#"
          class="social-btn naver"
          @click.prevent="api_oauth_naver"
        ></a> -->
        <!-- <div
          id="appleid-signin"
          class="social-btn"
          data-color="black"
          data-height="40"
          data-border="true"
          data-type="sign in"
        ></div> -->
        <!-- <a
          href="#"
          class="social-btn apple"
          @click.prevent="api_oauth_apple"
        ></a> -->
      </div>
    </div>
  </div>
</template>

<script>
  import TopBar from "@/components/Common/TopBar.vue";
  import { createNamespacedHelpers } from "vuex";
  const { mapState, mapMutations, mapActions } = createNamespacedHelpers(
    "userStore"
  );

  export default {
    name: "sign-in",
    components: { TopBar },
    computed: { ...mapState(["sign_in_error", "pass_find_email"]) },
    data() {
      return {
        sign_in_info: {
          email: "",
          password: "",
          rememberMe: false
        }
      };
    },
    methods: {
      ...mapMutations(["set_sign_in_error"]),
      ...mapActions([
        "api_login",
        "api_oauth_kakao",
        "api_oauth_naver",
        "api_oauth_google"
      ]),
      async call_api_login() {
        const response = await this.api_login(this.sign_in_info);
        if (response) this.$router.push("/");
      },
      clear_sign_in_error() {
        if (this.sign_in_error) {
          this.set_sign_in_error(false);
        }
      },
      blur_handler(event) {
        this.$refs[event.target.id].blur();
      },
      async api_oauth_apple() {
        try {
          // eslint-disable-next-line no-undef
          var data = await AppleID.auth.signIn();
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      }
    },
    mounted() {
      if (this.pass_find_email !== "") {
        this.sign_in_info.email = this.pass_find_email;
      }
      var state = "";
      var random_array = new Uint32Array(10);
      window.crypto.getRandomValues(random_array);
      random_array.forEach(rand => {
        state += rand;
      });
      // eslint-disable-next-line no-undef
      AppleID.auth.init({
        clientId: "com.SpotTeam.spot",
        scope: "name email",
        redirectURI: "https://www.spotbuddy.co.kr/apple-login",
        state: state,
        usePopup: false //or false defaults to false
      });
    }
  };
</script>

<style lang="scss" scoped>
  .sign-in {
    position: relative;
    width: 100%;
    .auto-login-wrap {
      margin-bottom: 16px;
      padding-top: 26px;

      .custom-label {
        font-size: 12px;
        font-weight: 500;
        line-height: 18px;
        color: #777777;
      }
    }
    .input-wrap {
      margin-bottom: 16px;
      .login-input {
        width: 100%;
        padding: 11px 0 13px 16px;
        box-sizing: border-box;
        font-size: 14px;
        font-weight: 300;
        & + .login-input {
          margin-top: 8px;
        }

        &::placeholder {
          color: #ccc;
        }
      }
    }

    .action-btn-wrap {
      .btn {
        display: inline-block;
        text-align: center;
      }
      .btn + .btn {
        margin-top: 8px;
      }
    }

    .find-pw-wrap {
      margin-top: 12px;
      color: #777777;
      font-size: 12px;
      text-align: center;
    }

    .social-wrap {
      margin-top: 20px;
      .social-btn {
        display: inline-block;
        width: 100%;
        height: 40px;
        vertical-align: top;

        & + .social-btn {
          margin-top: 8px;
        }
        &.kakao {
          background: url("~@/assets/images/Btn_kakao_login3x.png") center;
          background-size: cover;
        }
        &.naver {
          background: url("~@/assets/images/Btn_naver_login3x.png") center;
          background-size: cover;
        }
        &.apple {
          background: url("~@/assets/images/Btn_apple_login3x.png") center;
          background-size: cover;
        }
      }
    }
    .social-test {
      display: inline-block;
      width: 100%;
      text-align: center;
    }
  }
</style>
