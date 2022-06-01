<template>
  <footer class="bottom-bar">
    <router-link
      class="bottm-bar-link"
      v-for="item in tab_list"
      :key="item.id"
      :to="item.path"
    >
      <div class="bottom-bar-img">
        <img
          class="image-icon"
          v-if="currentPath === item.path"
          :src="item.active_img_src"
          alt="하단바 아이콘"
        />
        <img
          class="image-icon"
          v-else
          :src="item.img_src"
          alt="하단바 아이콘"
        />
      </div>

      <p class="bottom-bar-text">{{ item.text }}</p>
    </router-link>
  </footer>
</template>

<script>
  export default {
    name: "bottom-bar",
    computed: {
      currentPath() {
        return this.$route.path;
      }
    },
    data: () => ({
      tab_list: [
        {
          id: "home",
          path: "/",
          text: "홈",
          img_src: require("@/assets/images/bottom_ic_home.png"),
          active_img_src: require("@/assets/images/bottom_ic_home_active.png")
        },
        {
          id: "company",
          path: "/company/index",
          text: "버디 동행",
          img_src: require("@/assets/images/bottom_ic_with.png"),
          active_img_src: require("@/assets/images/bottom_ic_with_active.png")
        },
        {
          id: "chat",
          path: "/notify/chat",
          text: "채팅",
          img_src: require("@/assets/images/bottom_ic_chat.png"),
          active_img_src: require("@/assets/images/bottom_ic_chat_active.png")
        },
        {
          id: "stamp",
          path: "/stamp/index",
          text: "버디 일기",
          img_src: require("@/assets/images/bottom_ic_buddy.png"),
          active_img_src: require("@/assets/images/bottom_ic_buddy_active.png")
        },
        {
          id: "community",
          path: "/community/index",
          text: "구단 이야기",
          img_src: require("@/assets/images/bottom_ic_community.png"),
          active_img_src: require("@/assets/images/bottom_ic_community_active.png")
        }
      ]
    })
  };
</script>

<style lang="scss" scoped>
  .bottom-bar {
    display: flex;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 52px;
    z-index: 9;
    background-color: #fff;

    .bottm-bar-link {
      flex: 1;
      padding-top: 8px;
      text-align: center;
      border-top: 1px solid #e9e9e9;
      color: #999 !important;
      .bottom-bar-img {
        display: block;
        width: 24px;
        height: 24px;
        margin: 0 auto 4px;
        .image-icon {
          width: 100%;
          height: 100%;
        }
      }

      .bottom-bar-text {
        display: inline-block;
        vertical-align: top;
        line-height: 12px;
      }
      &.router-link-exact-active {
        border-top: 1px solid $dodger_blue;
        color: $dodger_blue !important;
      }
    }
  }
</style>
