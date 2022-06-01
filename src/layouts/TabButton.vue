<template>
  <div class="tab-button">
    <ul class="tabs">
      <li class="tabs-item-wrap">
        <a
          class="tabs-item"
          :class="{ 'active-tab': notify_last_visit === 'alert' }"
          href="#"
          @click.prevent="set_notify_last_visit('alert')"
        >
          알림
        </a>
      </li>
      <li class="tabs-item-wrap">
        <a
          class="tabs-item"
          :class="{ 'active-tab': notify_last_visit === 'chat' }"
          href="#"
          @click.prevent="set_notify_last_visit('chat')"
        >
          채팅
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapMutations, mapState } from "vuex";
  export default {
    name: "tab-button",
    computed: { ...mapState("notifyStore", ["notify_last_visit"]) },
    methods: { ...mapMutations("notifyStore", ["set_notify_last_visit"]) }
  };
</script>

<style lang="scss" scoped>
  .tabs {
    position: fixed;
    top: 48px;
    left: 0;
    right: 0;
    z-index: 9;
    background-color: #fff;
    .tabs-item-wrap {
      display: inline-block;
      width: 50%;
      .tabs-item {
        display: inline-flex;
        width: 100%;
        height: 48px;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        color: #373737 !important;
        border-bottom: 1px solid #e9e9e9;
        &.active-tab {
          border-bottom: 1px solid $dodger_blue !important;
          color: $dodger_blue !important;
        }
      }
    }
  }
</style>
