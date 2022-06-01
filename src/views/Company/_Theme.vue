<template>
  <section class="company-theme">
    <nav class="theme-nav">
      <a class="button-link" href="#" @click.prevent="$router.go(-1)">
        <img
          class="button-image"
          :src="require('@/assets/images/arrow_btn@3x.png')"
          alt="뒤로가기"
        />
      </a>
      <p class="theme-nav__text">
        <span class="text__theme">#{{ theme }}</span>
        에 해당하는 동행입니다.
      </p>
    </nav>
    <company-list
      class="theme-company-list"
      :company_list="company_theme_search_list"
    />
  </section>
</template>

<script>
  import CompanyList from "@/components/Company/CompanyList.vue";
  import { mapState } from "vuex";

  export default {
    components: { CompanyList },
    name: "company-theme",
    data: () => ({
      theme: ""
    }),
    computed: { ...mapState("companyStore", ["company_theme_search_list"]) },
    mounted() {
      this.theme = this.$route.params.theme;
    }
  };
</script>

<style lang="scss" scoped>
  .company-theme {
    .theme-nav {
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      z-index: 9;

      display: flex;
      align-items: center;
      height: 48px;

      .button-link {
        width: 40px;
        height: 40px;

        .button-image {
          width: 100%;
          height: 100%;
        }
      }
      .theme-nav__text {
        color: #1e1e1e;
        font-size: 15px;
        font-weight: 500;
        letter-spacing: -0.75px;
        .text__theme {
          color: $dodger_blue;
          letter-spacing: -0.3px;
        }
      }
    }
    .theme-company-list {
      margin-top: 60px;
      padding: 0 14px;
    }
  }
</style>
