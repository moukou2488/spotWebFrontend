<template>
  <li class="item-wrap">
    <router-link :to="`/chat-detail/${chat_item.chatRoomId}`" class="item-link">
      <div class="item-img-wrap">
        <img class="item-img" :src="profile_img_url" alt="프로필 사진" />
      </div>
      <div class="item-info">
        <p class="item-source overflow">
          {{ chat_item | chat_origin }}
        </p>
        <div class="item-preview overflow">
          {{ chat_item.lastMessage }}
        </div>
        <p class="item-date not-kr">{{ chat_item.lastMessageTime }}</p>
      </div>
      <div v-if="!chat_item.readState" class="item-new"></div>
    </router-link>
  </li>
</template>

<script>
  import { mapActions, mapState } from "vuex";

  export default {
    name: "chat-list-item",
    watch: {
      chat_item: {
        deep: true,
        async handler() {
          const response = await this.api_get_profile_photo(
            this.chat_item.nickname
          );
          this.profile_img_url = response;
        }
      }
    },
    props: {
      chat_item: {
        type: Object,
        default() {
          return {
            chatRoomId: Number,
            tourId: Number,
            nickname: String,
            tourTitle: String,
            lastMessage: String,
            lastMessageTime: String
          };
        }
      }
    },
    computed: {
      ...mapState("profileStore", ["user_profile_default_url"]),
      ...mapState("userStore", ["user_info"])
    },
    data: () => ({
      profile_img_url: require("@/assets/images/profile_default.png")
    }),
    filters: {
      chat_origin(chat_item) {
        return `[${chat_item.nickname}] ${chat_item.tourTitle}`;
      }
    },
    methods: {
      ...mapActions("profileStore", ["api_get_profile_photo"])
    },
    async mounted() {
      const response = await this.api_get_profile_photo(
        this.chat_item.nickname
      );
      this.profile_img_url = response;
    }
  };
</script>

<style lang="scss" scoped>
  @import "./NotifyList.scss";
</style>
