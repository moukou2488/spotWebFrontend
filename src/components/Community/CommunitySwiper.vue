<template>
  <section class="company-swiper">
    <swiper-container
      :header_title="'구단 이야기'"
      :url_path="'/community/index'"
      :list_length="teams_list.length"
    >
      <template v-slot:swiper-card-list>
        <community-swiper-card
          v-for="team_item in teams_list"
          :key="team_item.id"
          :team_item="team_item"
        />
      </template>
    </swiper-container>
  </section>
</template>

<script>
  import CommunitySwiperCard from "./CommunitySwiperCard.vue";
  import teams_list from "@/assets/data/teams_list.js";
  import SwiperContainer from "@/components/Home/SwiperContainer.vue";

  export default {
    name: "company-swiper",
    components: { CommunitySwiperCard, SwiperContainer },
    data: () => ({
      teams_list: teams_list
    })
  };
</script>
