<template>
  <section class="community-index-swiper">
    <community-index-swiper-container>
      <template v-if="computed_team_list.length" v-slot:swiper-card-list>
        <community-index-swiper-card
          v-for="team_item in computed_team_list"
          :key="team_item.id"
          :team_item="team_item"
        />
      </template>
    </community-index-swiper-container>
  </section>
</template>

<script>
  import CommunityIndexSwiperCard from "./CommunityIndexSwiperCard.vue";
  import CommunityIndexSwiperContainer from "./CommunityIndexSwiperContainer.vue";
  import teams_list from "@/assets/data/teams_list.js";

  import { mapState } from "vuex";

  export default {
    name: "community-index-swiper",
    components: { CommunityIndexSwiperCard, CommunityIndexSwiperContainer },
    computed: {
      ...mapState("userStore", ["user_info"])
    },
    data: () => ({
      teams_list,
      computed_team_list: []
    }),
    mounted() {
      // 배열의 복사를 해줘야 원본 배열이 변경되지 않음
      this.computed_team_list = [...teams_list];
      // 내가 선택한 구단이 제일 앞으로 가도록
      if (this.user_info && this.user_info.teamIndex !== -1) {
        for (let i = 0; i < this.computed_team_list.length; i++) {
          //
          if (
            this.computed_team_list[i].team_idx === this.user_info.teamIndex
          ) {
            const my_team = this.computed_team_list.splice(i, 1); // 잘라내고
            this.computed_team_list.unshift(my_team[0]); // 맨 앞으로
            return;
          }
        }
      }
    }
  };
</script>
