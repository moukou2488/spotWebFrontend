<template>
  <div class="notify">
    <nav class="notify-top-bar">
      <h2 class="notify-headline">{{ user_info.nickname }}님의 소식</h2>
      <a href="#" class="button-link" @click.prevent="$router.go(-1)">
        <img
          class="button-image"
          :src="require('@/assets/images/close_btn@3x.png')"
          alt="창 닫기"
        />
      </a>
    </nav>
    <alert-list />
    <s-toast :where="'bottom'" />
  </div>
</template>

<script>
  import AlertList from "@/components/Notify/AlertList.vue";
  import SToast from "@/components/Common/SToast.vue";

  import { mapState } from "vuex";

  export default {
    name: "notify",
    components: { AlertList, SToast },
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
