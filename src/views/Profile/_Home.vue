<template>
  <div class="profile-home">
    <profile-top-bar :topbar_text="computed_topbar_text" />
    <profile-header :props_user_info="user_info" />

    <profile-my-list />
    <div class="custom-br"></div>

    <profile-my-activity />
    <div class="custom-br"></div>

    <profile-spot-story />
    <div class="custom-br"></div>
    <s-toast v-if="toast_show" :where="'bottom'" />
  </div>
</template>

<script>
  import ProfileTopBar from "@/components/Profile/ProfileTopBar.vue";
  import ProfileHeader from "@/components/Profile/ProfileHeader.vue";
  import ProfileMyList from "@/components/Profile/ProfileMyList.vue";
  import ProfileMyActivity from "@/components/Profile/ProfileMyActivity.vue";
  import ProfileSpotStory from "@/components/Profile/ProfileSpotStory.vue";
  import SToast from "@/components/Common/SToast.vue";

  import { mapState, mapActions } from "vuex";

  export default {
    name: "profile-home",
    components: {
      ProfileTopBar,
      ProfileHeader,
      ProfileMyList,
      ProfileMyActivity,
      ProfileSpotStory,
      SToast
    },
    computed: {
      ...mapState("userStore", ["user_info"]),
      ...mapState("modalStore", ["toast_show"]),
      computed_topbar_text() {
        return this.user_info.nickname + "님의 프로필";
      }
    },
    methods: {
      ...mapActions("modalStore", ["config_toast_show"]),
      ...mapActions("userStore", ["api_resend_email"])
    },
    mounted() {
      if (!this.user_info.emailVerified) {
        this.$eventBus.$emit("alert", { type: "mail-auth-yet" });
      }
      this.$eventBus.$on("alert_close", async payload => {
        if (payload.type == "mail-auth-yet") {
          this.config_toast_show("메일이 재전송되었습니다.");
          await this.api_resend_email(this.user_info.email);
        }
      });
    }
  };
</script>
