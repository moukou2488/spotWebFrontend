<template>
  <div class="profile-my-join-company-list">
    <div
      class="company-list-item-wrapper"
      v-for="company_item in company_list"
      :key="company_item.id"
      role="list"
    >
      <h2 class="main-text">{{ tour_state }}</h2>
      <company-list-item class="company-item" :company_detail="company_item" />

      <div class="btn-wrapper">
        <router-link
          :to="`/profile/join_member_list/${company_item.id}`"
          class="action-btn"
        >
          참여자 목록
        </router-link>
        <button
          class="action-btn"
          @click="cancel_company(company_item.id)"
          :disabled="tour_state === '동행 완료'"
        >
          동행 취소
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
    name: "profile-my-join-company-list",
    components: { CompanyListItem },
    props: {
      company_list: {
        type: Array,
        required: true
      },
      tour_state: {
        type: String,
        required: true
      }
    },
    methods: {
      ...mapActions("modalStore", ["config_dialog_state"]),
      cancel_company(company_id) {
        this.config_dialog_state({
          modal_state: true,
          modal_type: "company-cancel",
          dialog_scroll_height: window.scrollY,
          props_data: company_id
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .profile-my-join-company-list {
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
      .btn-wrapper {
        display: flex;
        padding: 12px 14px;
        .action-btn {
          display: inline-block;
          flex: 1;
          padding: 10px 0;
          color: $dodger_blue !important;
          font-size: 14px;
          text-align: center;
          letter-spacing: -0.28px;
          border: 1px solid $dodger_blue;
          border-radius: 4px;
          & + .action-btn {
            margin-left: 7px;
          }
        }
        button:disabled {
          border: 1px solid #c2c2c2;
          color: #999 !important;
        }
      }
      .custom-br {
        margin-bottom: 12px;
      }
      &:last-child {
        .custom-br {
          margin-bottom: 0;
        }
      }
    }
  }
</style>
