<template>
  <div class="s-toast" v-if="toast_show" :class="where">
    <p class="toast-msg">{{ toast_msg }}</p>
  </div>
</template>

<script>
  import { mapState } from "vuex";

  export default {
    name: "s-toast",
    props: {
      where: {
        type: String
      }
    },
    computed: { ...mapState("modalStore", ["toast_show", "toast_msg"]) }
  };
</script>

<style lang="scss" scoped>
  .s-toast {
    position: fixed;
    left: 14px;
    right: 14px;
    z-index: 9;
    height: 38px;
    background-color: rgba($color: #000000, $alpha: 0.7);
    border-radius: 4px;

    &.bottom-bar {
      bottom: 64px;
    }
    &.bottom {
      bottom: 12px;
    }
    &.top_bar {
      top: 58px;
    }

    .toast-msg {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      font-size: 12px;
      color: #fff;
      letter-spacing: -0.72px;
    }
  }
</style>
