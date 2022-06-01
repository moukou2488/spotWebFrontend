<template>
  <nav class="notify-top-bar top-bar">
    <div class="top-bar-wrap back">
      <div class="button-wrapper left">
        <a class="button-link" href="#" @click.prevent="call_api_chat_read">
          <img
            class="button-image"
            :src="require('@/assets/images/arrow_btn@3x.png')"
            alt="뒤로가기"
          />
        </a>
      </div>
      <div class="headline-wrap">
        <span class="headline-text">동행 채팅</span>
      </div>
      <button
        class="btn fix fill"
        :class="tour_cancle_state ? 'fill_disabled' : 'fill'"
        @click="confirm_tour_bool"
      >
        {{ confirm_messsage }}
      </button>
      <div class="button-wrapper right">
        <slot name="top_bar_right" />
      </div>
    </div>
  </nav>
</template>

<script>
  import { mapActions, mapMutations, mapState } from "vuex";
  export default {
    name: "notify-top-bar",
    computed: {
      ...mapState("notifyStore", [
        "company_detail",
        "tour_cancle_state",
        "confirmed",
        "chatroom_id"
      ]),
      confirm_messsage() {
        if (this.tour_cancle_state) {
          return "확정";
        }
        return this.confirmed ? "취소" : "확정";
      }
    },
    methods: {
      ...mapActions("notifyStore", [
        "api_confirm_tour",
        "api_chat_read",
        "api_all_confirm",
        "api_cancel_state"
      ]),
      ...mapActions("modalStore", ["config_toast_show", "config_dialog_state"]),
      ...mapMutations("notifyStore", ["set_confirm_tour"]),
      async confirm_tour_bool() {
        if (this.tour_cancle_state) {
          this.config_toast_show("이미 취소한 동행입니다.");
          return;
        }
        if (this.confirmed === false) {
          this.open_dialog("company-confirm");
        } else {
          this.cancel_company(this.company_detail.tourId);
        }
      },
      async call_api_confirm_tour() {
        if (this.confirmed === false) {
          this.set_confirm_tour(true);
          this.chatroom_company_id.chatRoomId = this.chatroom_id;
          this.chatroom_company_id.companyId = this.company_detail.tourId;
          await this.api_confirm_tour(this.chatroom_company_id);
          const response = await this.api_all_confirm(this.chatroom_id);
          this.$emit("confirm_send_message", response);
        }
      },
      async call_api_chat_read() {
        await this.api_chat_read(this.chatroom_id);
        this.$router.go(-1); // push 알림 리다이렉트 이슈로 go(-1) 에서 수정
      },
      open_dialog(modal_type) {
        this.$eventBus.$emit("alert", {
          type: modal_type
        });
      },
      cancel_company(company_id) {
        this.config_dialog_state({
          modal_state: true,
          modal_type: "company-cancel",
          dialog_scroll_height: window.scrollY,
          props_data: company_id
        });
      }
    },
    data: () => ({
      chatroom_company_id: {}
    }),

    mounted() {
      this.$eventBus.$on("alert_close", async payload => {
        if (payload.type === "company-confirm") {
          await this.call_api_confirm_tour();
        }
      });
    },
    destroyed() {
      this.$eventBus.$off("alert_close");
    }
  };
</script>

<style lang="scss" scoped>
  .notify-top-bar {
    .top-bar-wrap {
      .headline-wrap {
        margin-left: 22px;
        .headline-text {
          font-size: 16px;
          line-height: 24px;
          font-weight: 500;
          letter-spacing: -0.64px;
        }
      }

      // 동행 확정 버튼
      .fix {
        width: 38px;
        height: 22px;
        margin: 13px 0;
        font-size: 12px;
        line-height: 18px;
        letter-spacing: -0.24px;
      }
    }
  }
</style>
