<template>
  <div class="notify">
    <nav class="notify-top-bar">
      <h2 class="notify-headline">채팅</h2>
    </nav>
    <chat-list />
    <bottom-bar />
    <s-toast :where="'bottom'" />
  </div>
</template>

<script>
  import ChatList from "@/components/Notify/ChatList.vue";
  import SToast from "@/components/Common/SToast.vue";
  import BottomBar from "@/components/Common/BottomBar.vue";
  import { mapState } from "vuex";

  export default {
    name: "notify",
    components: { ChatList, SToast, BottomBar },
    computed: {
      ...mapState("userStore", ["user_info"])
    },
    data: () => ({
      scroll_info: {
        alert: 0,
        chat: 0
      }
    })
  };
</script>

<style lang="scss" scoped>
  .notify-top-bar {
    position: fixed;
    display: flex;
    align-items: center;
    z-index: 9;
    top: 0;
    width: 100%;
    height: 48px;
    padding: 0 4px 0 14px;
    background-color: #fff;
    border-bottom: 1pt solid #e9e9e9;
    .notify-headline {
      flex: 1;
      font-size: 18px;
      letter-spacing: -0.36px;
      color: #373737;
    }
    .button-link {
      display: inline-block;
      width: 40px;
      height: 40px;
      .button-image {
        width: 100%;
        height: 100%;
      }
    }
    @media screen and (max-width: 330px) {
      .notify-headline {
        font-size: 16px !important;
      }
    }
  }
</style>
