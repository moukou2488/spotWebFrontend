<template>
  <div class="company-write">
    <company-write-nav>
      <template v-slot:right-btn>
        <button
          v-if="modify_company_id === null"
          class="temp-save-btn"
          @click="temp_save"
        >
          임시저장
        </button>
      </template>
    </company-write-nav>

    <company-write-header />
    <div class="custom-br"></div>
    <company-write-body />
    <div class="custom-br"></div>
    <company-write-footer :is_finish="is_finish" />
  </div>
</template>

<script>
  import CompanyWriteNav from "@/components/Company/CompanyWriteNav.vue";
  import CompanyWriteHeader from "@/components/Company/CompanyWriteHeader.vue";
  import CompanyWriteBody from "@/components/Company/CompanyWriteBody.vue";
  import CompanyWriteFooter from "@/components/Company/CompanyWriteFooter.vue";

  import { mapActions, mapMutations, mapState } from "vuex";

  export default {
    name: "company-write",
    components: {
      CompanyWriteNav,
      CompanyWriteHeader,
      CompanyWriteBody,
      CompanyWriteFooter
    },
    computed: {
      ...mapState("companyWriteStore", ["payload_data", "modify_company_id"])
    },
    data: () => ({
      is_finish: false
    }),
    watch: {
      payload_data: {
        deep: true,
        handler() {
          this.check_validation();
        }
      }
    },
    methods: {
      ...mapMutations("companyWriteStore", [
        "clear_state",
        "set_modify_company_id",
        "set_tempSaved"
      ]),
      ...mapActions("companyWriteStore", ["api_post_tour_upload"]),
      ...mapActions("modalStore", ["config_dialog_state", "config_toast_show"]),
      async temp_save() {
        this.set_tempSaved(true);
        await this.api_post_tour_upload();
        this.config_toast_show("임시저장 되었습니다.");
      },
      // 동행 필수 사항들 체크
      check_validation() {
        const required_item_array = [
          this.payload_data.tourTitle,
          this.payload_data.tourContent,
          this.payload_data.tourLocation,
          this.payload_data.tourEndDate
        ];

        for (let i = 0; i < required_item_array.length; i++) {
          if (required_item_array[i] === "") {
            this.is_finish = false;
            return;
          }
        }
        this.is_finish = true;
      }
    },
    beforeRouteLeave(to, from, next) {
      // 날짜 정하러 가는 게 아니면 다 지워준다.
      if (
        to.name === "company-write-date_picker" ||
        to.name === "company-write-game_picker"
      )
        next();
      else {
        // 초기화 작업
        next();
        this.clear_state();
        this.set_modify_company_id(null);
      }
    },
    mounted() {
      if (history.length !== this.$store.state.scrollStore.history_length) {
        const scroll_y = this.$store.state.scrollStore.scroll_info[
          "company-write"
        ];
        window.scrollTo(0, scroll_y);
      }
      // 수정하기의 경우에도
      this.check_validation();
    }
  };
</script>

<style lang="scss">
  .required {
    &:after {
      display: inline-block;
      width: 9px;
      height: 17px;
      background: url("~@/assets/images/ic_necessary@3x.png") center;
      background-size: cover;
      content: "";
    }
  }
</style>
