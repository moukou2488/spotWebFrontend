<template>
  <div class="chat-list notify-list">
    <ul v-if="computed_chat_list.length > 0">
      <swipe-list
        ref="list"
        class="card"
        :items="computed_chat_list"
        @active="item_swipe"
      >
        <template
          v-slot="{
            item
          }"
        >
          <chat-list-item :chat_item="item" />
        </template>
        <template v-slot:right="{ item }">
          <div
            class="swipeout-action blue"
            title="remove"
            @click="open_dialog('chat-delete', item.chatRoomId)"
          >
            <!-- place icon here or what ever you want -->
            삭제
          </div>
          <div
            class="swipeout-action gray"
            @click="open_dialog('block', item.nickname)"
          >
            <!-- place icon here or what ever you want -->
            차단
          </div>
        </template>
      </swipe-list>
    </ul>
    <section v-else class="chat-empty-view">
      <p class="main">앗, 아직 대화를 나눈 동행이 없어요.</p>
      <p class="sub">동행을 찾아 대화를 나눠보세요.</p>
    </section>
  </div>
</template>

<script>
  import ChatListItem from "./ChatListItem.vue";
  import { SwipeList } from "vue-swipe-actions";
  import { mapState, mapActions } from "vuex";

  export default {
    name: "chat-list",
    components: { ChatListItem, SwipeList },
    watch: {
      notify_last_visit() {
        this.item_swipe();
      }
    },
    data: () => ({
      block_nick: "",
      del_chat_id: ""
    }),
    computed: {
      ...mapState("notifyStore", ["chat_list", "notify_last_visit"]),
      computed_chat_list() {
        if (this.chat_list.length === 0) {
          return [];
        } else {
          return this.chat_list;
        }
      }
    },
    methods: {
      ...mapActions("notifyStore", [
        "api_get_chatroom_list",
        "api_chat_delete"
      ]),
      ...mapActions("companyStore", ["api_post_block_tour"]),
      ...mapActions("modalStore", ["config_toast_show"]),

      open_dialog(modal_type, item) {
        if (modal_type === "block") {
          this.block_nick = item;
        } else {
          this.del_chat_id = item;
        }
        this.$eventBus.$emit("alert", {
          type: modal_type
        });
      },
      item_swipe() {
        this.$refs.list.closeActions();
      }
    },
    async mounted() {
      await this.api_get_chatroom_list();
      // 모달창 event
      this.$eventBus.$on("alert_close", async payload => {
        if (payload.type === "block") {
          await this.api_post_block_tour(this.block_nick); // 동행 차단 api 호출
          await this.api_get_chatroom_list();
          this.config_toast_show("해당 사용자가 차단되었습니다."); // 동행 차단 toast 창 띄우기
        } else if (payload.type === "chat-delete") {
          await this.api_chat_delete(this.del_chat_id);
          await this.api_get_chatroom_list();
          this.config_toast_show("해당 채팅이 삭제되었습니다."); // 동행 차단 toast 창 띄우기
        }
      });
    }
  };
</script>

<style lang="scss" scoped>
  @import "./NotifyList.scss";
  .notify-list {
    .chat-empty-view {
      display: flex;
      flex-direction: column;
      align-items: center;

      margin-top: 22.8%;
      .main {
        margin-bottom: 5px !important;
        font-size: 16px;
        font-weight: 500;
        line-height: 1.38;
        letter-spacing: -0.32px;
        text-align: center;
        color: #1e1e1e;
      }
      .sub {
        font-size: 12px;
        line-height: 1.75;
        letter-spacing: -0.24px;
        text-align: center;
        color: #999;
      }
    }
    .swipeout-action {
      display: flex;
      align-items: center;
      padding: 0 3rem;
      cursor: pointer;
      left: 0;
    }
    .swipeout-right {
      display: flex;
      align-items: center;
    }
    .swipeout-action.blue {
      width: 76px;
      height: 58px;
      padding: 0 26px;
      font-size: 12px;
      font-weight: 500;
      line-height: 17px;
      letter-spacing: -0.56px;
      text-align: center;
      color: #ffffff;
      background-color: #3bb1ff !important;
    }
    .swipeout-action.blue:hover {
      background-color: darken#3bb1ff !important;
    }
    .swipeout-action.gray {
      width: 76px;
      height: 58px;
      padding: 0 26px;
      font-size: 12px;
      font-weight: 500;
      line-height: 17px;
      letter-spacing: -0.56px;
      text-align: center;
      color: #ffffff;
      background-color: #c2c2c2;
    }
    .swipeout-action.gray:hover {
      background-color: darken#c2c2c2;
    }
  }
</style>
