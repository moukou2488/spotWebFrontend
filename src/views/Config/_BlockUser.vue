<template>
  <section class="config-block_user">
    <top-bar :topbar_text="'차단 사용자 관리'" :topbar_type="'back'" />
    <ul v-if="my_block_user_list.length" class="block-user-list">
      <block-user-list-item
        v-for="block_user in my_block_user_list"
        :key="block_user.nickname"
        :block_user_nick="block_user.nickname"
      />
    </ul>
    <section v-else class="empty-view">
      차단한 사용자가 없습니다.
    </section>
    <s-toast :where="'bottom'" />
  </section>
</template>

<script>
  import TopBar from "@/components/Common/TopBar.vue";
  import SToast from "@/components/Common/SToast.vue";
  import BlockUserListItem from "@/components/Config/BlockUserListItem.vue";

  import { mapState } from "vuex";

  export default {
    name: "config-block_user",
    components: { TopBar, SToast, BlockUserListItem },
    computed: {
      ...mapState("configStore", ["my_block_user_list"])
    }
  };
</script>

<style lang="scss" scoped>
  .config-block_user {
    .block-user-list,
    .empty-view {
      margin-top: 48px;
    }
    .empty-view {
      display: flex;
      height: calc(100vh - 48px);
      justify-content: center;
      align-items: center;
      font-size: 15px;
      letter-spacing: -0.6px;
    }
  }
</style>
