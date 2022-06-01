<template>
  <section class="chat-message-list">
    <chat-message
      v-for="chat_item in chat_messages"
      :key="chat_item.id"
      :chat_item="chat_item"
      :profile_img_url="profile_img_url"
    />
  </section>
</template>

<script>
  import { mapActions, mapState } from "vuex";
  import ChatMessage from "./ChatMessage.vue";

  export default {
    name: "chat-message-list",
    components: { ChatMessage },
    computed: { ...mapState("notifyStore", ["counter_nick"]) },
    data: () => ({
      profile_img_url: require("@/assets/images/profile_default.png")
    }),
    props: {
      chat_messages: {
        type: Array,
        required: true
      }
    },
    methods: { ...mapActions("profileStore", ["api_get_profile_photo"]) },
    async mounted() {
      const response = await this.api_get_profile_photo(this.counter_nick);
      this.profile_img_url = response;
    }
  };
</script>

<style lang="scss" scoped>
  .chat-message-list {
    padding: 131px 14px 0px !important;
    margin-bottom: 72px;
  }
</style>
