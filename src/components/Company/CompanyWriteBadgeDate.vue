<template>
  <div class="company-write-badge date badge-required">
    <a
      href="#"
      class="custom-btn-wrap"
      :class="{ active: payload_data.tourStartDate }"
      @click.prevent="go_date_picker"
    >
      <img
        v-if="payload_data.tourStartDate"
        class="icon-image"
        :src="require('@/assets/images/ic_date_active@3x.png')"
        alt="활성화 달력 아이콘"
      />
      <img
        v-else
        class="icon-image"
        :src="require('@/assets/images/ic_date@3x.png')"
        alt="비활성화 달력 아이콘"
      />
      <span class="custom-divison"></span>
      <span v-if="payload_data.tourStartDate" class="loc_date-text">
        {{ computed_date }}
      </span>
      <span v-else class="loc_date-text">동행날짜 선택</span>
    </a>
  </div>
</template>

<script>
  import { mapActions, mapState } from "vuex";

  export default {
    name: "company-write-badge-date",
    computed: {
      ...mapState("companyWriteStore", ["payload_data"]),
      computed_date() {
        return (
          this.payload_data.tourStartDate + "~" + this.payload_data.tourEndDate
        );
      }
    },
    methods: {
      ...mapActions("modalStore", ["config_toast_show"]),
      go_date_picker() {
        // 경기 일정을 골라놔야 동행 날짜를 선택할 수 있음
        if (this.payload_data.tourTeam !== "")
          this.$router.push("/company/write/date_picker");
        else this.config_toast_show("경기일정을 먼저 선택해주세요.");
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "./CompanyWriteBadge.scss";
</style>
