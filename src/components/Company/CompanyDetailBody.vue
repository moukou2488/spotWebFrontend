<template>
  <section class="company-detail-body">
    <h3 class="recruit_title">모집정보</h3>
    <!-- 인원 -->
    <p class="recruit_info-wrap">
      <span class="gray">인원</span>
      <span>{{ company_memeber_count }}</span>
      <span class="dodger_blue">
        현재 확정 인원 : {{ company_detail.nowNumberOfMember }}명
      </span>
    </p>
    <!-- 성별 -->
    <p class="recruit_info-wrap">
      <span class="gray">성별</span>
      <span>{{ company_detail_gender }}</span>
    </p>
    <!-- 연령 -->
    <p class="recruit_info-wrap">
      <span class="gray">연령</span>
      <span>{{ company_detail_age }}</span>
    </p>
  </section>
</template>

<script>
  export default {
    name: "company-detail-body",
    computed: {
      company_detail() {
        return this.$store.getters.compnay_detail;
      },
      company_memeber_count() {
        const { minimumMember, maximumMember } = this.company_detail;
        if (minimumMember === -1) return "제한없음";
        else if (minimumMember === maximumMember) return `${minimumMember}명`;
        else return `${minimumMember}명~${maximumMember}명`;
      },
      company_detail_gender() {
        const gender = this.company_detail.requiredGender;
        return gender === 1 ? "남성" : gender === 2 ? "여성" : "제한없음";
      },
      company_detail_age() {
        const { minimumAge, maximumAge } = this.company_detail;
        if (minimumAge === -1) return "제한없음";
        else if (minimumAge === maximumAge) return `${minimumAge}세`;
        else return `${minimumAge}세~${maximumAge}세`;
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "./CompanyDetail.scss";
  .company-detail-body {
    padding: 30px 20px;
    .recruit_title {
      margin-bottom: 24px;
      font-size: 16px;
      letter-spacing: -0.32px;
    }
  }
</style>
