<template>
  <footer class="s-footer layout" :class="{ fixed: is_fixed }">
    <slot />
  </footer>
</template>

<script>
  export default {
    name: "s-footer",
    props: {
      is_fixed: {
        type: Boolean,
        default: true
      }
    }
  };
</script>

<style lang="scss" scoped>
  .s-footer {
    box-sizing: border-box;
    &.fixed {
      position: fixed;
      bottom: 34px;
      left: 14px;
      right: 14px;
    }
  }
</style>
