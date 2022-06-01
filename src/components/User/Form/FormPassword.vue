<template>
  <div class="form-password">
    <div class="input-item">
      <label class="input-label required" for="password">비밀번호</label>
      <div class="input-item-wrap">
        <input
          id="password"
          class="input-box"
          :class="{ active: focus.password }"
          type="password"
          placeholder="영문/숫자/특수기호(!@#$%^*+=-) 8~20자"
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
  </div>
</template>

<script>
  export default {
    name: "form-password"
  };
</script>

<style>
  .form-password {
    margin: 21px 0;
  }
</style>
