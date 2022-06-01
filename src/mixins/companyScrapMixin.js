// import router from "@/router/index.js";
import { mapActions, mapState } from "vuex";

export default {
  computed: { ...mapState("userStore", ["user_info"]) },
  data: () => ({
    is_my_scrap: false,
    scrap_count: 0,
    toast_type: null
  }),
  methods: {
    ...mapActions("modalStore", ["config_toast_show"]),
    ...mapActions("companyStore", [
      "api_post_scrap",
      "api_post_delete_scrap",
      "check_my_scrap_list"
    ]),
    check_auth_user() {
      if (this.user_info === null) {
        this.$eventBus.$emit("alert", {
          type: "login"
        });
        return false;
      } else return true;
    },
    async scrap_company_item() {
      const response = this.check_auth_user();

      if (response) {
        await this.api_post_scrap(this.company_detail.id);
        this.is_my_scrap = true;
        this.scrap_count += 1;
        this.config_toast_show("관심 목록에 추가되었습니다.");
      }
    },
    async unscrap_company_item() {
      const response = this.check_auth_user();

      if (response) {
        await this.api_post_delete_scrap(this.company_detail.id);
        this.is_my_scrap = false;
        this.scrap_count -= 1;

        // 내 관심 목록에서 하트를 눌렀을 때
        if (this.$route.name === "profile-my_favorite_list") {
          await this.$store.dispatch("profileStore/get_favorite_company_list");
        }
      }
    }
  },
  async beforeMount() {
    // 로그인한 유저 && 내가 쓴 글이 아니면 요청을 통해 확인
    if (this.is_my_scrap) return;
    if (this.user_info !== null && !this.company_detail.is_my_company) {
      this.is_my_scrap = await this.check_my_scrap_list(this.company_detail.id);
    }
  }
};
