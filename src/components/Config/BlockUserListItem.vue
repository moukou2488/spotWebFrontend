<template>
  <li class="block-user-list-item">
    <div class="user-profile-img-wrap">
      <img
        class="profile-img"
        :src="block_profile_img"
        alt="사용자 프로필 사진"
      />
    </div>
    <p class="block-user-nickname">{{ block_user_nick }}</p>
    <button class="block-state-btn" @click="cancel_block_user">차단 중</button>
  </li>
</template>

<script>
  import { mapActions } from "vuex";
  export default {
    name: "block-user-list-item",
    props: {
      block_user_nick: {
        type: String,
        required: true
      }
    },
    data: () => ({
      block_profile_img: require("@/assets/images/profile_default.png")
    }),
    methods: {
      ...mapActions("configStore", ["api_post_block_cancel"]),
      ...mapActions("modalStore", ["config_toast_show"]),
      ...mapActions("profileStore", ["api_get_profile_photo"]),
      async cancel_block_user() {
        await this.api_post_block_cancel(this.block_user_nick);
        this.config_toast_show("차단이 해제 되었습니다.");
      }
    },
    async mounted() {
      const response = await this.api_get_profile_photo(this.block_user_nick);
      this.block_profile_img = response;
    }
  };
</script>

<style lang="scss" scoped>
  .block-user-list-item {
    display: flex;
    padding: 0 16px;
    height: 90px;
    align-items: center;
    border-bottom: 1px solid #e9e9e9;
    .user-profile-img-wrap {
      width: 58px;
      height: 58px;
      .profile-img {
        width: 100%;
        height: 100%;
        vertical-align: top;
        border-radius: 50%;
      }
    }
    .block-user-nickname {
      flex: 1;
      padding-left: 18px;
      font-size: 14px;
      font-weight: 500;
      letter-spacing: -0.56px;
      color: #1e1e1e;
    }
    .block-state-btn {
      width: 64px;
      height: 26px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      letter-spacing: -0.56px;
      background-color: $dodger_blue;
      border-radius: 100px;
    }
  }
</style>
