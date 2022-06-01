import { mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapState("profileStore", ["end_regist_company_list"]),
    ...mapState("userStore", ["user_info"]),
    // 모집 마감된 글인지 아닌지 검증
    this_company_recruit_close() {
      for (let i = 0; i < this.end_regist_company_list.length; i++) {
        if (this.end_regist_company_list[i].id === this.company_detail.id)
          return true;
      }
      return false;
    }
  },
  methods: {
    ...mapActions("profileStore", ["get_regist_company_list"])
  },
  async mounted() {
    if (this.user_info) await this.get_regist_company_list();
  }
};
