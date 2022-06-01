<template>
  <div class="profile-user_page">
    <top-bar :topbar_type="'back'" :topbar_text="'프로필 보기'">
      <template v-if="!is_me" v-slot:top_bar_right>
        <s-more-btn :set_list="set_list" />
      </template>
    </top-bar>
    <profile-header :props_user_info="user_profile_info" />
    <profile-body :user_info="user_profile_info" />
    <s-toast :where="'bottom'" />
    <s-cropper />
  </div>
</template>

<script>
  import TopBar from "@/components/Common/TopBar.vue";
  import ProfileHeader from "@/components/Profile/ProfileHeader.vue";
  import ProfileBody from "@/components/Profile/ProfileBody.vue";
  import SMoreBtn from "@/components/Common/SMoreBtn.vue";
  import SToast from "@/components/Common/SToast.vue";
  import SCropper from "@/components/Common/SCropper.vue";

  import { mapState, mapActions, mapMutations } from "vuex";

  export default {
    name: "profile-user_page",
    components: {
      TopBar,
      ProfileHeader,
      ProfileBody,
      SMoreBtn,
      SToast,
      SCropper
    },
    computed: {
      ...mapState("profileStore", ["user_profile_info"]),
      ...mapState("userStore", ["user_info"]),
      set_list() {
        return {
          type: "other_user_report",
          header: "다른 사용자 프로필"
        };
      }
    },
    methods: {
      ...mapActions("companyStore", ["api_post_block_tour"]),
      ...mapMutations("companyStore", ["set_company_list"]),
      ...mapActions("modalStore", ["config_toast_show"])
    },
    data: () => ({
      is_me: false
    }),
    mounted() {
      if (this.user_info) {
        this.is_me =
          this.user_info.nickname === this.user_profile_info.nickname;
      }
      this.$eventBus.$on("alert_close", async payload => {
        if (payload.type === "block") {
          await this.api_post_block_tour(this.user_profile_info.nickname); // 동행 차단 api 호출
          this.set_company_list([]); // 차단 후 동행 리스트 초기화
          this.$router.go(-1);
          this.config_toast_show("해당 사용자가 차단되었습니다."); // 동행 차단 toast 창 띄우기
        }
      });
    },
    beforeDestroy() {
      this.$eventBus.$off("alert_close");
    }
  };
</script>

<style lang="scss" scoped>
  .profile-user_page {
    height: 100vh;
    background-color: #f0f0f0;
  }
</style>
