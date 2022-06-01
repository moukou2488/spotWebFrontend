<template>
  <router-link :to="`/company/detail/${company_detail.tourId}`">
    <header class="chat-detail-header">
      <router-link
        :to="`/profile/userpage/${company_detail.nickname}`"
        class="simple-profile-img"
      >
        <img class="profile-img" :src="profile_img" alt="프로필 이미지" />
      </router-link>
      <div class="profile-explain-wrapper text-truncate">
        <span class="simple-profile-explain">
          {{ company_detail.tourTitle }}
        </span>
        <p class="simple-profile-name">{{ company_detail.nickname }}</p>
      </div>
    </header>
  </router-link>
</template>

<script>
  import { mapActions, mapState } from "vuex";

  export default {
    name: "chat-detail-header",
    computed: {
      ...mapState("notifyStore", ["company_detail"])
    },

    data: () => ({
      profile_img: require("@/assets/images/profile_default.png")
    }),
    methods: {
      ...mapActions("profileStore", ["api_get_profile_photo"])
    },
    async mounted() {
      const response = await this.api_get_profile_photo(
        this.company_detail.nickname
      );
      this.profile_img = response;
    }
  };
</script>

<style lang="scss" scoped>
  .chat-detail-header {
    position: fixed;
    width: 100%;
    margin-top: 48px;
    padding: 9px 0 9px 14px;
    background-color: #f8f8f8;
    display: flex;
    &.keyboard {
      position: absolute;
    }
    .simple-profile-img {
      width: 42px;
      height: 42px;
      margin-right: 14px;

      .profile-img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .profile-explain-wrapper {
      width: 80%;
      margin-top: 4px;
      .simple-profile-explain {
        height: 16px;
        margin: 3px 0 3px !important;
        font-size: 13px;
        line-height: 16px;
        color: #575757;
      }
      .simple-profile-name {
        margin-top: 1px !important;
        font-size: 12px;
        font-weight: 600;
        line-height: 17px;
        color: #484848;
      }
    }
  }
</style>
