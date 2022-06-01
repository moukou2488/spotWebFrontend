<template>
  <section class="company-swiper">
    <swiper-container
      :header_title="'새로운 동행'"
      :url_path="'/company/index'"
      :list_length="company_recommend_list.length"
    >
      <template v-slot:swiper-card-list>
        <company-swiper-card
          v-for="company_item in company_recommend_list"
          :key="company_item.id"
          :company_detail="company_item"
        />
      </template>
    </swiper-container>
  </section>
</template>

<script>
  import { mapActions, mapState } from "vuex";
  import CompanySwiperCard from "@/components/Home/CompanySwiperCard.vue";
  import SwiperContainer from "@/components/Home/SwiperContainer.vue";

  export default {
    name: "company-swiper",
    components: { SwiperContainer, CompanySwiperCard },
    computed: {
      ...mapState("companyStore", ["company_recommend_list"])
    },
    methods: {
      ...mapActions("companyStore", ["api_get_company_recommend_list"])
    },
    async mounted() {
      await this.api_get_company_recommend_list();
    }
  };
</script>
