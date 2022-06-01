<template>
  <div class="sign-up-form view" role="main">
    <div class="sign-up-form-input">
      <div class="input-item">
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
          <label class="alert-msg-blue" v-show="is_ok_email">
            사용 가능한 이메일입니다.
          </label>
          <label class="alert-msg" v-show="!is_ok_email">
            {{ check_text.confirm_email }}
          </label>
        </div>
      </div>
      <div class="input-item">
        <label class="input-label required" for="password">비밀번호</label>
        <div class="input-item-wrap">
          <input
            id="password"
            class="input-box"
            :class="{ active: focus.password }"
            type="password"
            placeholder="영문/숫자/특수기호(!@#$%^*+=-) 포함 8~20자"
            @focus="set_focus($event, true)"
            @blur="set_focus($event, false)"
            v-model="sign_up_info.password"
          />
        </div>
        <label class="alert-msg" v-show="check_boolean.password">{{
          check_text.password
        }}</label>
      </div>
      <div class="input-item">
        <label class="input-label required" for="re_password"
          >비밀번호 확인</label
        >
        <div class="input-item-wrap">
          <input
            id="re_password"
            class="input-box"
            :class="{ active: focus.re_password }"
            type="password"
            placeholder="비밀번호 확인"
            @focus="set_focus($event, true)"
            @blur="set_focus($event, false)"
            v-model="sign_up_info.re_password"
          />
        </div>
        <label class="alert-msg" v-show="check_boolean.re_password">{{
          check_text.re_password
        }}</label>
        <label class="alert-msg-blue" v-show="re_password_blue">{{
          check_text.re_password
        }}</label>
      </div>
      <div class="input-item">
        <label class="input-label required" for="name">이름</label>
        <div class="input-item-wrap">
          <input
            id="name"
            class="input-box"
            :class="{ active: focus.name }"
            type="text"
            placeholder="이름 입력"
            @focus="set_focus($event, true)"
            @blur="set_focus($event, false)"
            :value="sign_up_info.name"
            @input="set_sign_up_info_name"
          />
        </div>
        <label class="alert-msg" v-show="check_boolean.name">
          {{ check_text.necess }}
        </label>
      </div>
      <div class="input-item">
        <label class="input-label required" for="nickname">닉네임</label>
        <div class="input-item-wrap">
          <input
            id="nickname"
            class="input-box"
            :class="{ active: focus.nickname }"
            type="text"
            placeholder="한글/영문/숫자 조합 2~12자"
            @focus="set_focus($event, true)"
            @blur="set_focus($event, false)"
            :value="sign_up_info.nickname"
            @input="check_nickname"
          />
          <button
            class="confirm-btn"
            :disabled="!nickname_confirm_btn"
            @click="call_api_valid_nickname"
          >
            중복확인
          </button>
        </div>
        <label class="alert-msg" v-show="check_boolean.nickname">{{
          check_text.nickname
        }}</label>
        <div v-show="nickname_confirm_done">
          <label class="alert-msg-blue" v-show="overlap_nickname">
            사용 가능한 닉네임입니다.
          </label>
          <label class="alert-msg" v-show="!overlap_nickname">
            {{ check_text.nickname }}
          </label>
        </div>
      </div>
      <div class="input-item">
        <label class="input-label required">생년월일</label>
        <div class="input-item-wrap date" :class="{ active: focus.birth }">
          <input
            id="birth-year"
            class="input-box year"
            maxlength="4"
            type="text"
            placeholder="YYYY"
            @focus="set_focus($event, true)"
            @blur="set_focus($event, false)"
            @keyup="check_birth"
            v-model="birth.y"
          />
          <span class="div-line">/</span>
          <input
            id="birth-month"
            class="input-box month"
            maxlength="2"
            type="text"
            placeholder="MM"
            @focus="set_focus($event, true)"
            @blur="set_focus($event, false)"
            @keyup="check_birth"
            v-model="birth.m"
          />
          <span class="div-line">/</span>
          <input
            id="birth-day"
            class="input-box day"
            maxlength="2"
            type="text"
            placeholder="DD"
            @focus="set_focus($event, true)"
            @blur="set_focus($event, false)"
            @keyup="check_birth"
            v-model="birth.d"
          />
        </div>
        <label class="alert-msg" v-show="check_boolean.birth">{{
          check_text.birth
        }}</label>
      </div>
      <div class="input-item">
        <label class="input-label required" for="gender">성별</label>
        <div class="input-item-wrap">
          <v-select
            class="selectbox"
            :items="items_gender"
            v-model="sign_up_info.gender"
            item-text="gender"
            item-value="gender_idx"
            placeholder="성별"
            dense
            hide-details
            required
            outlined
          >
          </v-select>
        </div>
        <label class="alert-msg" v-show="check_boolean.gender">{{
          check_text.necess
        }}</label>
      </div>
      <div class="input-item">
        <label class="input-label" for="team_idx">구단 선택</label>
        <div class="input-item-wrap">
          <v-select
            class="selectbox"
            :items="items_team"
            v-model="sign_up_info.teamIndex"
            item-text="team"
            item-value="team_idx"
            placeholder="선택안함"
            dense
            hide-details
            required
            outlined
          >
          </v-select>
        </div>
      </div>
      <s-footer :is_fixed="false">
        <button v-if="loading_status" class="btn large fill" @click="all_check">
          <img
            class="loading-img"
            :src="require('@/assets/videos/loading_white_ver.gif')"
            alt=""
          />
        </button>
        <button v-else class="btn large fill" @click="all_check">
          확인
        </button>
      </s-footer>
    </div>
    <s-toast :where="'bottom-bar'" />
  </div>
</template>

<script>
  import SFooter from "@/layouts/SFooter.vue";
  import SToast from "@/components/Common/SToast.vue";

  import { mapState, mapActions } from "vuex";

  export default {
    name: "sign-up-form",
    components: { SFooter, SToast },
    watch: {
      birth: {
        deep: true,
        handler() {
          this.check_boolean.birth = false;
        }
      },
      sign_up_info: {
        deep: true,
        handler() {
          if (this.fix_email != this.sign_up_info.email) {
            this.email_confirm_done = false;
          }
          if (this.fix_nickname != this.sign_up_info.nickname) {
            this.nickname_confirm_done = false;
          }
          if (this.sign_up_info.password != "") {
            //비밀번호 유효성 체크
            this.check_boolean.password = !/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/.test(
              this.sign_up_info.password
            );

            if (this.check_boolean.password) {
              this.check_text.password =
                "영문/숫자/특수기호(!@#$%^*+=-) 8~20자로 입력해주세요.";
            }
            if (
              this.sign_up_info.password != "" &&
              this.sign_up_info.re_password != ""
            ) {
              //비밀번호 일치 체크
              this.check_boolean.re_password =
                this.sign_up_info.password != this.sign_up_info.re_password;
              this.check_text.re_password = "비밀번호가 일치하지 않습니다.";

              this.re_password_blue =
                this.sign_up_info.password == this.sign_up_info.re_password;

              if (this.re_password_blue) {
                this.check_text.re_password = "비밀번호가 일치합니다.";
              }
            }
          }
        }
      }
    },
    computed: {
      ...mapState("userStore", [
        "valid_email",
        "valid_nickname",
        "check_ad_term"
      ])
    },
    data: () => ({
      loading_status: false,
      sign_up_info: {
        email: "",
        password: "",
        re_password: "",
        nickname: "",
        name: "",
        birth: "",
        gender: "",
        teamIndex: "",
        isAgreeOnGetPromotion: ""
      },
      focus: {
        email: false,
        password: false,
        re_password: false,
        nickname: false,
        name: false,
        birth: false,
        gender: false,
        team_idx: false
      },
      check_boolean: {
        email: false,
        password: false,
        re_password: false,
        nickname: false,
        name: false,
        birth: false,
        gender: false
      },
      check_text: {
        email: "",
        password: "",
        re_password: "",
        nickname: "",
        birth: "",
        necess: "",
        confirm_email: ""
      },
      items_gender: [
        { gender: "남자", gender_idx: 1 },
        { gender: "여자", gender_idx: 2 }
      ],
      items_team: [
        { team: "선택안함", team_idx: -1 },
        { team: "두산 베어스", team_idx: 1 },
        { team: "한화 이글스", team_idx: 2 },
        { team: "NC 다이노스", team_idx: 3 },
        { team: "롯데 자이언츠", team_idx: 4 },
        { team: "키움 히어로즈", team_idx: 5 },
        { team: "KIA 타이거즈", team_idx: 6 },
        { team: "kt wiz", team_idx: 7 },
        { team: "SSG 랜더스", team_idx: 8 },
        { team: "삼성 라이온즈", team_idx: 9 },
        { team: "LG 트윈스", team_idx: 10 }
      ],
      birth: {
        y: "",
        m: "",
        d: ""
      },
      overlap_nickname: false,
      email_confirm_btn: false,
      nickname_confirm_btn: false,
      email_confirm_done: false,
      nickname_confirm_done: false,
      fix_email: "",
      fix_nickname: "",
      re_password_blue: false,
      sign_up_toast: "",
      sign_up_error: false,
      is_ok_email: false
    }),
    methods: {
      ...mapActions("modalStore", ["config_toast_show"]),
      ...mapActions("userStore", [
        "api_sign_up",
        "api_valid_email",
        "api_valid_nickname",
        "api_send_email"
      ]),
      set_sign_up_info_name($event) {
        this.check_boolean.name = false;
        this.sign_up_info.name = $event.target.value;
      },
      async call_api_sign_up() {
        this.sign_up_info.isAgreeOnGetPromotion = this.check_ad_term;
        const response = await this.api_sign_up(this.sign_up_info);
        await this.api_send_email(response);
        this.loading_status = false;
        this.$router.push("/user/mail-auth");
      },
      async call_api_valid_email() {
        await this.api_valid_email(this.sign_up_info.email);
        if (this.valid_email === "ok") {
          this.is_ok_email = true;
        } else {
          if (this.valid_email === "delete") {
            this.check_text.confirm_email = "가입이 불가능한 이메일입니다.";
          } else if (this.valid_email === "no") {
            this.check_text.confirm_email = "이미 가입된 이메일입니다.";
          }
        }
        this.email_confirm_done = true;

        this.fix_email = this.sign_up_info.email;
      },
      async call_api_valid_nickname() {
        await this.api_valid_nickname(this.sign_up_info.nickname);
        if (this.valid_nickname === "ok") this.overlap_nickname = true;
        else {
          if (this.valid_nickname === "bad") {
            this.check_text.nickname =
              "욕설, 비속어 등 부적절한 내용의 닉네임은 사용불가합니다.";
          } else {
            this.check_text.nickname = "이미 사용 중인 닉네임입니다.";
          }

          this.overlap_nickname = false;
        }
        this.nickname_confirm_done = true;
        this.fix_nickname = this.sign_up_info.nickname;
      },
      set_focus(event, bool) {
        const ID = event.target.id;
        if (ID.includes("birth")) this.focus.birth = bool;
        else this.focus[event.target.id] = bool;
        this.focus[event.target.id] = bool;
      },
      all_check() {
        this.loading_status = true;
        let neccess = 0;
        let form = 0;
        let overlap = 0;

        this.check_boolean.name = false;
        this.check_boolean.gender = false;

        Object.keys(this.check_boolean).forEach(element => {
          if (this.sign_up_info[element] == "") {
            this.check_boolean[element] = true;
            this.check_text[element] = "필수 입력 항목입니다.";
            this.check_text.necess = "필수 입력 항목입니다.";
            neccess++;
          } else if (this.check_boolean[element] == true) form++;
        });
        if (
          this.email_confirm_done == false ||
          this.nickname_confirm_done == false
        )
          overlap++;

        this.sign_up_info.teamIndex =
          this.sign_up_info.teamIndex == "" ? -1 : this.sign_up_info.teamIndex;

        const count = neccess + form + overlap;
        if (count === 0) {
          this.call_api_sign_up();
        } else {
          this.loading_status = false;
          this.sign_up_toast =
            neccess > 0
              ? "필수 항목을 입력해주세요."
              : form > 0
              ? "형식에 맞추어 작성해주세요."
              : "중복 확인을 해주세요.";

          this.config_toast_show(this.sign_up_toast);
        }
      },
      check_email() {
        this.check_boolean.email = false;
        this.email_confirm_btn = false;
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
      check_nickname($event) {
        this.check_boolean.nickname = false;
        this.nickname_confirm_btn = false;
        this.sign_up_info.nickname = $event.target.value;
        if (this.sign_up_info.nickname != "") {
          this.check_boolean.nickname = !/^[A-Za-zㄱ-ㅎㅏ-ㅣ가-힣0-9+]{2,12}$/.test(
            this.sign_up_info.nickname
          );
          this.check_text.nickname = this.check_boolean.nickname
            ? "한글, 영문, 숫자 조합 2~12자 이내로 입력해주세요."
            : "";
          if (!this.check_boolean.nickname) this.nickname_confirm_btn = true;
        }
      },
      check_birth() {
        this.sign_up_info.birth = "";
        if (this.birth.y != "" && this.birth.m != "" && this.birth.d != "") {
          this.sign_up_info.birth = this.birth.y + this.birth.m + this.birth.d;
          this.check_boolean.birth = !/^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/.test(
            this.sign_up_info.birth
          );
          this.check_text.birth = this.check_boolean.birth
            ? "올바르게 입력해주세요."
            : "";
          if (!this.check_boolean.birth) {
            const today = new Date();
            const yyyy = today.getFullYear();
            const mm =
              today.getMonth() < 9
                ? "0" + (today.getMonth() + 1)
                : today.getMonth() + 1;
            const dd =
              today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
            this.check_boolean.birth =
              parseInt(yyyy + mm + dd) -
                parseInt(this.sign_up_info.birth) -
                140000 <
              0;
            this.check_text.birth = "만 14세 이상부터 가입이 가능합니다";
          }
        }
        this.focus.birth = false;
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/styles/input.scss";
  .sign-up-form-input {
    padding: 26px 14px 0 !important;

    .input-item {
      .input-item-wrap {
        // 생년 월일
        &.date {
          align-items: center;
          border: 1px solid #ddd;
          border-radius: 4px;
          .input-box {
            box-sizing: border-box;
            flex: unset;
            width: 33%;
            padding: 13px 0;
            border: none !important;
            text-align: center;
          }
          .div-line {
            color: #999999;
          }

          &.active {
            border: 1px solid $input_active;
          }
        }
        .selectbox {
          font-size: 12px !important;
        }
      }
    }
  }
  .s-footer {
    margin: 32px auto 34px;
    .loading-img {
      width: 100%;
      height: 30px;
      vertical-align: top;
    }
  }
</style>
