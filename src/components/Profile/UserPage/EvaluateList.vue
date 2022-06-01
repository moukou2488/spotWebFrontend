<template>
  <section class="evaluate-list">
    <ul>
      <evaluate-list-item
        v-for="(evaluate_item, index) in evaluate_list"
        :evaluate_detail="evaluate_item"
        :key="index + ' 받은 동행 평가'"
      />
    </ul>
  </section>
</template>

<script>
  import EvaluateListItem from "@/components/Profile/UserPage/EvaluateListItem.vue";
  import company_evaluate_list from "@/assets/data/company_evaluate_list.js";

  import { mapActions, mapMutations, mapState } from "vuex";

  export default {
    name: "evaluate-list",
    components: { EvaluateListItem },
    props: {
      evaluate_list: {
        type: Array,
        required: true
      }
    },
    watch: {
      more_btn_choose_index(new_choose_index) {
        // 수정하기
        const {
          id,
          getReviewed,
          weatherIndex,
          detailReview,
          anonymous,
          simpleTourReviews
        } = this.more_btn_props_data;

        let review_list = simpleTourReviews.map(review => {
          return {
            index: review.reviewIndex,
            selected: true,
            text: company_evaluate_list[review.reviewIndex - 1].text,
            type: company_evaluate_list[review.reviewIndex - 1].type
          };
        });

        if (this.more_btn_list.type === "evaluate") {
          if (new_choose_index === 0) {
            this.set_modify_evaluate_id(id);
            this.set_evaluate_weather_index(weatherIndex);
            this.set_evaluate_detail(detailReview);
            this.set_evaluate_anonymous(anonymous);
            this.set_evaluate_short_list(review_list);
            this.$router.push(`/profile/evaluate/${getReviewed}`);
          }
          // 삭제하기
          else if (new_choose_index === 1) {
            this.$eventBus.$emit("alert", {
              type: "evaluate-delete",
              payload_data: {
                id,
                nickname: getReviewed
              }
            });
            // this.api_post_tour_review_delete({ id, nickname: getReviewed });
          }
        }
      }
    },
    computed: {
      ...mapState("modalStore", [
        "more_btn_list",
        "more_btn_choose_index",
        "more_btn_props_data"
      ])
    },
    methods: {
      ...mapMutations("profileStore", [
        "set_modify_evaluate_id",
        "set_evaluate_anonymous", // 익명
        "set_evaluate_detail", // 상세
        "set_evaluate_short_list", // 리뷰 리스트
        "set_evaluate_weather_index"
      ]),
      ...mapActions("profileStore", ["api_post_tour_review_delete"])
    },
    mounted() {
      this.$eventBus.$on("alert_close", payload => {
        const { id, nickname } = payload.payload_data;
        this.api_post_tour_review_delete({ id, nickname });
      });
    }
  };
</script>

<style lang="scss" scoped>
  .evaluate-list {
    background-color: #fff;
  }
</style>
