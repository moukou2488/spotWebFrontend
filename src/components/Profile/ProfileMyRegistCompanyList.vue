<template>
  <div class="profile-my-regist-company-list">
    <div
      class="company-list-item-wrapper"
      v-for="company_item in company_list"
      :key="company_item.id"
      role="list"
    >
      <h2 class="main-text">{{ is_finish ? "모집 완료" : "모집 중" }}</h2>
      <company-list-item class="company-item" :company_detail="company_item" />

      <div class="finish-btn-wrapper">
        <button
          class="btn fill large"
          :disabled="is_finish"
          @click="call_close_company_api(company_item.id)"
        >
          모집 공고 마감하기
        </button>
      </div>
      <div class="custom-br"></div>
    </div>
  </div>
</template>

<script>
  import CompanyListItem from "@/components/Company/CompanyListItem.vue";
  import { mapActions } from "vuex";

  export default {
    name: "profile-my-regist-company-list",
    components: { CompanyListItem },
    props: {
      company_list: {
        type: Array,
        required: true
      },
      is_finish: {
        type: Boolean,
        default: false
      }
    },
    data: () => ({ company_id: null }),
    methods: {
      ...mapActions("modalStore", ["config_toast_show"]),
      ...mapActions("profileStore", ["get_regist_company_list"]),
      ...mapActions("companyStore", ["api_post_close_tour"]),
      call_close_company_api(company_id) {
        this.$eventBus.$emit("alert", {
          type: "company-close",
          payload_data: company_id
        });
      }
    },
    mounted() {
      // 왜 두 번 뜨는지는 모르겠데 이벤트 리스너가 남아있음
      this.$eventBus.$off("alert_close");
      // 동행 마감 alert
      this.$eventBus.$on("alert_close", async payload => {
        if (payload.type == "company-close") {
          try {
            await this.api_post_close_tour(payload.payload_data); // 동행 마감하기
            this.get_regist_company_list(); // 리스트 초기화
            this.config_toast_show("동행 마감 되었습니다.");
          } catch (error) {
            this.config_toast_show("Something Wrong :(");
            console.log(error);
          }
        }
      });
    },
    beforeDestroy() {
      this.$eventBus.$off("alert_close");
    }
  };
</script>

<style lang="scss" scoped>
  .profile-my-regist-company-list {
    padding-top: 12px;
    .main-text {
      margin-bottom: 9px;
      padding: 0 14px 0 16px;
      font-size: 14px;
      letter-spacing: -0.56px;
      font-weight: 500;
      color: #1e1e1e;
    }
    .company-list-item-wrapper {
      .company-item {
        margin: 0 14px;
      }
      .finish-btn-wrapper {
        padding: 12px 14px;
        button:disabled {
          background-color: #c2c2c2;
        }
      }
      .custom-br {
        margin-bottom: 10px;
      }
      &:last-child {
        .custom-br {
          margin-bottom: 0;
        }
      }
    }
  }
</style>
