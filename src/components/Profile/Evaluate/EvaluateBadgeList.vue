<template>
  <!-- eslint-disable vue/no-use-v-if-with-v-for -->
  <div class="evaluate-badge-list">
    <ul v-if="state == 'not_seletect'" class="list-wrap">
      <li
        class="list-item"
        v-for="evaluate_item in badge_list"
        v-if="evaluate_item.type === type && !evaluate_item.selected"
        :key="evaluate_item.text"
      >
        <a
          class="list-item-link"
          @click.prevent="add_item(evaluate_item)"
          href="#"
        >
          <evaluate-badge :item="evaluate_item" />
        </a>
      </li>
    </ul>
    <!-- 추가 된 -->
    <ul v-else class="list-wrap selected">
      <li
        class="list-item"
        v-for="evaluate_item in badge_list"
        :key="evaluate_item.text"
        v-if="evaluate_item.type === type"
      >
        <evaluate-badge :item="evaluate_item" />
      </li>
    </ul>
  </div>
</template>

<script>
  import EvaluateBadge from "@/components/Profile/Evaluate/EvaluateBadge.vue";

  import { mapMutations } from "vuex";

  export default {
    name: "evaluate-badge-list",
    components: { EvaluateBadge },
    props: {
      badge_list: {
        type: Array,
        required: true
      },
      type: {
        type: String,
        required: true
      },
      state: {
        type: String,
        default: "not_seletect"
      }
    },
    methods: {
      ...mapMutations("profileStore", ["add_evaluate_short_list"]),
      add_item(item) {
        const index = this.badge_list.findIndex(
          selected_item => selected_item.text === item.text
        );
        this.badge_list[index].selected = true;
        this.add_evaluate_short_list(item);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .list-wrap {
    padding: 0 8px !important;

    .list-item {
      display: inline-block;
      padding-left: 6px;
      margin-top: 6px;
    }
    &.selected {
      margin-bottom: 24px;
    }
  }
</style>
