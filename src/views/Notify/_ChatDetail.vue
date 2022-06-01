<template>
  <div class="chat-detail">
    <notify-top-bar @confirm_send_message="confirm_send_message">
      <template v-slot:top_bar_right>
        <s-more-btn :set_list="set_list" />
      </template>
    </notify-top-bar>
    <!-- chat-detail-header -->
    <chat-detail-header />

    <!-- chat-detail-body -->
    <chat-message-list v-if="chat_array" :chat_messages="chat_array" />
    <a href="#" class="fab-btn" @click.prevent="go_to_bottom_scroll">
      <img
        class="btn-img"
        :src="require('@/assets/images/arrow_btn_bottom@3x.png')"
        alt="최하로 스크롤"
      />
    </a>
    <s-toast :where="'bottom-bar'" />
    <!-- chat-detail-footer -->
    <footer class="chat-footer">
      <div class="input-box-wrapper">
        <textarea
          type="text"
          class="input-box-inside"
          placeholder="채팅을 입력하세요."
          ref="inputBox"
          @input="expand_chat_area"
          :value="content"
        ></textarea>
        <a class="button-send" href="#" @click.prevent="send_message">
          <img
            class="button-image"
            :src="require('@/assets/images/bt_send@3x.png')"
            alt="보내기"
          />
        </a>
      </div>
    </footer>
  </div>
</template>

<script>
  import Stomp from "webstomp-client";
  import SockJS from "sockjs-client";
  import NotifyTopBar from "@/components/Notify/NotifyTopBar.vue";
  import ChatDetailHeader from "@/components/Notify/ChatDetail/ChatDetailHeader.vue";
  import ChatMessageList from "@/components/Notify/ChatDetail/ChatMessageList.vue";
  import SToast from "@/components/Common/SToast.vue";
  import SMoreBtn from "@/components/Common/SMoreBtn.vue";

  import { mapState, mapActions } from "vuex";

  export default {
    name: "chat-detail",
    components: {
      NotifyTopBar,
      ChatDetailHeader,
      ChatMessageList,
      SToast,
      SMoreBtn
    },
    computed: {
      ...mapState("notifyStore", [
        "chatroom_id",
        "chat_message",
        "counter_nick"
      ]),
      ...mapState("modalStore", ["more_btn_choose_index"]),
      ...mapState("userStore", ["user_info"]),
      // 더보기 리스트 세팅
      set_list() {
        return {
          type: "chat_detail",
          header: "동행 채팅 관리하기"
        };
      }
    },
    watch: {
      more_btn_choose_index(new_type) {
        if (new_type === 0) {
          this.go_company_evaluate();
        } else if (new_type === 1) {
          this.$router.push(`/company/report/user/${this.counter_nick}`);
        } else if (new_type === 2) {
          this.open_dialog("block");
        }
      }
    },
    created() {
      const socket = new SockJS("/api/chat-start");
      this.stompClient = Stomp.over(socket);
      this.stompClient.reconnect_delay = 5000;
      this.stompClient.connect(
        {},
        frame => {
          console.log("success", frame);
          this.stompClient.subscribe("/api/sub/" + this.chatroom_id, res => {
            let jsonBody = JSON.parse(res.body);
            let m = {
              sender: jsonBody.sender,
              message: jsonBody.message,
              messageTime: jsonBody.messageTime,
              me: jsonBody.sender == this.user_info.nickname
            };
            this.chat_array.push(m);

            //마지막 메세지로 스크롤 이동
            setTimeout(() => {
              const height = document.querySelector("body").scrollHeight;
              window.scrollTo(0, height);
            }, 0);
          });
          this.api_chat_enter(this.chatroom_id);
        },
        err => {
          console.log("fail", err);
        }
      );
      this.call_api_get_chat();
      this.call_api_chat_read();
    },
    data() {
      return {
        scrollHeight: "",
        content: "",
        stompClient: null,
        chat_array: [],
        confirm: false
      };
    },
    methods: {
      ...mapActions("notifyStore", [
        "api_get_chat",
        "api_chat_read",
        "api_all_confirm",
        "api_chat_enter",
        "api_chat_out"
      ]),
      ...mapActions("companyStore", ["api_post_block_tour"]),
      ...mapActions("modalStore", ["config_toast_show"]),
      go_to_bottom_scroll() {
        const height = document.querySelector("body").scrollHeight;
        window.scrollTo(0, height);
      },
      async call_api_chat_read() {
        await this.api_chat_read(this.chatroom_id);
      },
      async call_api_get_chat() {
        await this.api_get_chat(this.chatroom_id);
        for (let i = this.chat_message.length - 1; i > -1; i--) {
          let m = {
            sender: this.chat_message[i].sender,
            message: this.chat_message[i].message,
            messageTime: this.chat_message[i].messageTime,
            me: this.chat_message[i].sender === this.user_info.nickname
          };
          this.chat_array.push(m);

          // 페이지 로딩시 마지막 메세지로 스크롤 이동
          setTimeout(() => {
            const height = document.querySelector("body").scrollHeight;
            window.scrollTo(0, height);
          }, 0);
        }
      },
      async confirm_send_message(bool) {
        if (this.stompClient != null) {
          const week = new Array("일", "월", "화", "수", "목", "금", "토");
          let time = new Date();
          time =
            time.getMonth() +
            1 +
            "/" +
            time.getDate() +
            week[time.getDay()] +
            " " +
            time.getHours() +
            ":" +
            (time.getMinutes() < 10 ? "0" : "") +
            time.getMinutes();
          let chatMessage = {
            sender: this.user_info.nickname,
            message: bool
              ? this.user_info.nickname +
                "님도 동행 확정버튼을 눌렀습니다. 행복한 동행하시기 바랍니다. :)"
              : this.user_info.nickname +
                "님이 동행 확정버튼을 눌렀습니다. " +
                this.counter_nick +
                "님도 확정 버튼을 눌러, 동행을 확정지어주세요 :)",
            messageTime: time,
            chatRoomId: this.chatroom_id
          };
          await this.stompClient.send(
            "/api/pub/message",
            JSON.stringify(chatMessage),
            {}
          );
        }
      },
      expand_chat_area($event) {
        this.content = $event.target.value;
        if (this.chat_array === "") {
          this.$refs.inputBox.style.height = "34px";
          return;
        }
        this.$refs.inputBox.style.height = "34px";
        if (
          40 < this.$refs.inputBox.scrollHeight &&
          this.$refs.inputBox.scrollHeight < 65
        ) {
          this.$refs.inputBox.style.height = "53px";
        } else if (this.$refs.inputBox.scrollHeight >= 70) {
          this.$refs.inputBox.style.height = "78px";
        }
      },
      async send_message() {
        if (this.content.trim() != "" && this.stompClient != null) {
          const week = new Array("일", "월", "화", "수", "목", "금", "토");
          let time = new Date();
          time =
            time.getMonth() +
            1 +
            "/" +
            time.getDate() +
            week[time.getDay()] +
            " " +
            time.getHours() +
            ":" +
            (time.getMinutes() < 10 ? "0" : "") +
            time.getMinutes();
          let chatMessage = {
            sender: this.user_info.nickname,
            message: this.content,
            messageTime: time,
            chatRoomId: this.chatroom_id
          };
          await this.stompClient.send(
            "/api/pub/message",
            JSON.stringify(chatMessage),
            {}
          );
        }
        this.$refs.inputBox.style.height = "34px";
        this.content = "";
      },
      socket_disconnect() {
        if (this.stompClient !== null) {
          this.stompClient.disconnect();
          this.api_chat_out(this.chatroom_id);
        }
      },
      open_dialog(modal_type) {
        this.$eventBus.$emit("alert", {
          type: modal_type
        });
      },
      go_company_evaluate() {
        if (this.user_info.emailVerified === false) {
          this.$eventBus.$emit("alert", { type: "email-auth" });
          return;
        }
        this.$router.push(`/profile/evaluate/${this.counter_nick}`);
      }
    },
    /**
     * 페이지를 나갈 경우에 동작하는 함수
     * 창닫기, 다른 주소 이동, 새로고침 시
     * socket 연결 끊기
     */
    mounted() {
      window.addEventListener("beforeunload", this.socket_disconnect);

      // 모달창 event
      this.$eventBus.$on("alert_close", async payload => {
        if (payload.type === "block") {
          await this.api_post_block_tour(this.counter_nick); // 동행 차단 api 호출
          this.$router.go(-1);
          this.config_toast_show("해당 사용자가 차단되었습니다."); // 동행 차단 toast 창 띄우기
        }
      });
    },
    beforeUnmount() {
      window.removeEventListener("beforeunload", this.socket_disconnect);
    },
    /**
     * 페이지를 나갈 경우에 동작하는 함수
     * 다른 라우터 주소 이동 시
     * socket 연결 끊기
     */
    beforeRouteLeave(to, from, next) {
      this.call_api_chat_read();
      this.socket_disconnect();
      next();
    },
    destroyed() {
      this.$eventBus.$off("alert_close");
    }
  };
</script>

<style lang="scss" scoped>
  textarea:focus {
    outline: none;
  }
  .fab-btn {
    position: fixed;
    right: 14px;
    bottom: 66px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;

    border-radius: 50%;
    background-color: $dodger_blue;
    box-shadow: 0 3px 6px grey;
    .btn-img {
      width: 18px;
      height: 10px;
    }
  }
  .chat-footer {
    position: fixed;
    bottom: 0px;
    left: 0px;
    right: 0px;

    .input-box-wrapper {
      width: 100%;
      min-height: 52px;
      max-height: 99px;
      bottom: 34px;
      display: flex;
      background-color: $dodger-blue;
      .input-box-inside {
        width: 100%;
        height: 34px;
        max-height: 78px;
        margin: 9px 4px 9px 14px;
        padding: 7px 16px 7px !important;
        border: none;
        border-radius: 20px;
        background-color: #fff;
        font-size: 14px;
        line-height: 19px;
        letter-spacing: -0.56px;
        resize: none;
      }
      .button-send {
        width: 40px;
        height: 40px;
        margin: 6px 4px;
        justify-self: flex-end;
        .button-image {
          width: 100%;
          height: 100%;
        }
      }
    }
    .join-alert {
      margin: 0 14px 6px;
      padding: 10px;
      opacity: 0.7;
      background-color: #000;
      border-radius: 4px;
      font-size: 13px;
      line-height: 18px;
      text-align: center;
      color: #fff;
    }
  }
</style>
