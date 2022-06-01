<template>
  <div class="s-dialog" v-if="show">
    <!-- login -->
    <div class="s-dialog-wrap">
      <p v-html="dialog_info.headline" class="dialog-headline"></p>

      <div class="s-dialog-body" :class="dialog_info.body_style">
        <p v-html="dialog_info.body_text" class="body-text"></p>
      </div>

      <div class="s-dialog-foot" :class="dialog_info.button_type">
        <button
          v-if="dialog_info.button_text_negative"
          class="foot-btn"
          @click="close_dialog(false)"
        >
          {{ dialog_info.button_text_negative }}
        </button>
        <button class="foot-btn major" @click="close_dialog(true)">
          {{ dialog_info.button_text_major }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import dialogType from "@/assets/data/dialogType.js";

  export default {
    name: "s-dialog",
    watch: {
      type(new_type) {
        this.dialog_info = dialogType[new_type];
      }
    },
    data: () => ({
      show: false,
      type: null,
      dialog_scroll_height: 0,

      dialog_info: {
        headline: "",
        body_text: "",
        body_style: "",
        button_text_negative: "",
        button_text_major: "",
        button_type: ""
      },
      payload_data: null
    }),
    methods: {
      close_dialog(bool) {
        if (bool)
          this.$eventBus.$emit("alert_close", {
            type: this.type,
            payload_data: this.payload_data
          }); // 어떤 타입의 모달이 닫혔는지

        // 모달창 닫기
        this.show = false;
        this.payload_data = null;
        document.querySelector("html").classList.remove("modal-on");
      }
    },
    created() {
      this.$eventBus.$on("alert", payload => {
        this.type = payload.type;
        this.payload_data = payload.payload_data;

        this.show = true;
      });
    }
  };
</script>

<style lang="scss" scoped>
  .s-dialog {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    z-index: 998;
    width: 100%;
    height: 100vh;
    padding: 0 52px;
    box-sizing: border-box;
    background-color: rgba($color: #000, $alpha: 0.4);

    @media screen and (max-width: 330px) {
      padding: 0 20px;
    }

    .s-dialog-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      font-size: 14px;
      background-color: #fff;
      border-radius: 9px;

      .dialog-headline {
        padding: 22px 16px 0;

        font-size: 17px;
        font-weight: 600;
        letter-spacing: -0.54px;
        color: #464646;
        text-align: center;
      }

      .s-dialog-body {
        width: 100%;
        padding: 6px 16px 13px;
        &.p-12 {
          padding: 6px 12px 13px;
        }
        .body-text {
          font-size: 13px;
          color: #464646;
          letter-spacing: -0.26px;
          text-align: center;
        }
      }

      .s-dialog-foot {
        display: flex;
        width: 100%;
        border-top: 0.5px solid #adadad;
        font-size: 16px;
        letter-spacing: -0.38px;
        font-weight: 500;
        &.parallel {
          flex-direction: column;
          .foot-btn {
            flex: auto;
            & + .foot-btn {
              border-top: 1px solid #adadad;
            }
          }
        }
        .foot-btn {
          flex: 1;
          height: 44px;
          text-align: center;
          color: #797979;
          &.major {
            color: $dodger_blue;
          }
          & + .foot-btn {
            border-left: 1px solid #adadad;
          }
        }
      }
    }
  }
</style>
