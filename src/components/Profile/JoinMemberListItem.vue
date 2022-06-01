<template>
  <li class="join-member-list-item">
    <router-link :to="`/profile/userpage/${user_nick}`">
      <img
        class="user_picture"
        :src="computed_user_profile_img_url"
        alt="사용자 프로필"
      />
    </router-link>
    <span class="user_nick">{{ user_nick }}</span>
    <a
      v-if="user_nick !== user_info.nickname"
      href="#"
      @click.prevent="go_company_evaluate"
      class="member-evaluate-btn"
    >
      평가하기
    </a>
  </li>
</template>

<script>
  import { mapState, mapActions } from "vuex";

  export default {
    name: "join-member-list-item",
    props: {
      user_nick: {
        type: String,
        required: true
      }
    },
    computed: {
      ...mapState("userStore", ["user_info"]),
      ...mapState("profileStore", ["user_profile_default_url"]),
      computed_user_profile_img_url() {
        return this.user_profile === undefined
          ? this.user_profile_default_url
          : this.user_profile;
      }
    },
    data: () => ({
      user_profile: ""
    }),
    methods: {
      ...mapActions("profileStore", ["api_get_profile_photo"]),
      go_company_evaluate() {
        if (this.user_info.emailVerified === false) {
          this.$eventBus.$emit("alert", { type: "email-auth" });
          return;
        }
        this.$router.push(`/profile/evaluate/${this.user_nick}`);
      }
    },
    async mounted() {
      const response = await this.api_get_profile_photo(this.user_nick);
      this.user_profile = response;
    }
  };
</script>

<style lang="scss" scoped>
  .join-member-list-item {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px;
    border-bottom: 1px solid #e9e9e9;
    // 유저 프로필 사진
    .user_picture {
      margin-right: 18px;
      width: 58px;
      height: 58px;
      border-radius: 50%;
    }
    // 닉네임
    .user_nick {
      display: inline-block;
      flex: 1;

      font-size: 14px;
      letter-spacing: -0.56px;
      color: #1e1e1e;
    }
    @media screen and (max-width: 330px) {
      .user_nick {
        max-width: 143px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    // 평가 버튼
    .member-evaluate-btn {
      padding: 4px 10px;
      font-size: 14px;
      letter-spacing: -0.56px;
      color: #fff !important;
      background-color: $dodger_blue;
      border-radius: 4px;
    }
  }
</style>
