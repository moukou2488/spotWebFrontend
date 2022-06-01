<template>
  <nav class="company-write-nav top-bar">
    <div class="top-bar-wrap x">
      <div class="button-wrapper left">
        <a class="button-link" href="#" @click.prevent="exit_company_write">
          <img
            class="button-image"
            :src="require('@/assets/images/close_btn@3x.png')"
            alt="창 닫기"
          />
        </a>
      </div>
      <div class="headline-wrap">
        <span class="headline-text">{{ headline }}</span>
      </div>
      <div class="button-wrapper right">
        <slot name="right-btn" />
      </div>
    </div>
  </nav>
</template>

<script>
  import { mapState } from "vuex";
  export default {
    name: "company-write-nav",
    computed: {
      ...mapState("companyWriteStore", ["modify_company_id"])
    },
    props: {
      headline: {
        type: String,
        default: "동행모집"
      }
    },
    methods: {
      exit_company_write() {
        if (this.modify_company_id)
          this.$router.replace(`/company/detail/${this.modify_company_id}`);
        else this.$router.go(-1);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .button-wrapper {
    &.right {
      width: 48px;
      height: 40px;
      margin-right: 4px;
      .temp-save-btn {
        width: 100%;
        height: 100%;
        font-size: 12px;
        color: #373737;
        letter-spacing: -0.24px;
      }
    }
  }
</style>
