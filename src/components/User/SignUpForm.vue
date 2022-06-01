<template>
  <section class="sign-up-form" role="main">
    <div class="sign-up-form-input">
      <form-email />
      <form-password />
    </div>
  </section>
</template>

<script>
  import FormEmail from "./Form/FormEmail.vue";
  import FormPassword from "./Form/FormPassword.vue";
  export default {
    name: "sign-up-form",
    components: { FormEmail, FormPassword }
  };
</script>

<style lang="scss">
  @import "@/assets/styles/input.scss";
  .sign-up-form-input {
    padding: 26px 14px 0 !important;

    .input-item {
      .input-item-wrap {
        // 생년 월일
        &.date {
          align-items: center;
          border: 1px solid #dddddd;
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
</style>
