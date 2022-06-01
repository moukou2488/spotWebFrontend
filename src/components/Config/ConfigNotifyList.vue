<template>
  <ul v-if="question_list" class="question-list">
    <config-question-list-item
      v-for="notify_item in data_list"
      :key="notify_item.id"
      :notify_item="notify_item"
    />
  </ul>
  <ul v-else class="notify-list">
    <config-notify-list-item
      v-for="notify_item in data_list"
      :key="notify_item.id"
      :notify_item="notify_item"
    />
  </ul>
</template>

<script>
  import ConfigNotifyListItem from "./ConfigNotifyListItem.vue";
  import ConfigQuestionListItem from "./ConfigQuestionListItem.vue";

  export default {
    name: "config-notify-list",
    components: { ConfigNotifyListItem, ConfigQuestionListItem },
    props: {
      data_list: {
        type: Array,
        required: true
      },
      question_list: {
        type: Boolean,
        default: false
      }
    }
  };
</script>

<style lang="scss" scoped>
  .notify-list,
  .question-list {
    margin-top: 48px;
  }
</style>
