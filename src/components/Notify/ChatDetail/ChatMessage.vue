<template>
  <div
    class="chat-message"
    :class="chat_item.me ? 'message-right-wrap' : 'message-left-wrap'"
  >
    <div v-if="!chat_item.me" class="message-profile-img">
      <router-link :to="`/profile/userpage/${chat_item.sender}`">
        <img class="profile-img" :src="profile_img_url" alt="프로필 이미지" />
      </router-link>
    </div>

    <div>
      <div
        class="message-box"
        :class="chat_item.me ? 'message-right-box' : 'message-left-box'"
      >
        {{ chat_item.message }}
      </div>
      <div class="message-time">{{ chat_item.messageTime }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "chant-message",
    props: {
      chat_item: {
        type: Object,
        default() {
          return {
            id: Number,
            sender: String,
            message: String,
            messageTime: String,
            me: Boolean
          };
        }
      },
      profile_img_url: {
        type: String,
        required: true
      }
    }
  };
</script>

<style lang="scss" scoped>
  .chat-message {
    width: 100%;
    margin-bottom: 18px;
    display: flex;

    .message-box {
      padding: 11px 16px;
      max-width: 258px;
      font-size: 14px;
      letter-spacing: -0.6px;
      line-height: 22px;
      word-break: break-word;
    }

    .message-time {
      margin: 0 2px;
      font-size: 10px;
      line-height: 22px;
      color: #999;
    }

    // 내가 보낸 메세지
    &.message-right-wrap {
      flex-direction: row-reverse;

      .message-right-box {
        border-radius: 10px 0 10px 10px;
        background-color: #5dbfff;
        color: #fff;
      }

      .message-time {
        text-align: right;
      }
    }

    // 상대방이 보낸 메세지
    &.message-left-wrap {
      flex-direction: row;
      .message-profile-img {
        width: 42px;
        height: 42px;
        margin-right: 10px;
        .profile-img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .message-left-box {
        border-radius: 0 10px 10px 10px;
        background-color: #f4f4f4;
        color: #575757;
      }

      & + .message-right-wrap {
        margin-top: 18px;
      }
    }
  }
</style>
