<template>
  <ul class="stamp-list">
    <stamp-list-item
      v-for="stamp_item in stamp_list"
      :key="'피드형 아이템' + stamp_item.diaryId"
      :stamp_item="stamp_item"
    />
  </ul>
</template>

<script>
  import StampListItem from "@/components/Stamp/StampListItem.vue";

  export default {
    name: "stamp-list",
    components: { StampListItem },
    props: {
      stamp_list: {
        type: Array,
        required: true
      }
    }
  };
</script>

<style lang="scss" scoped>
  .stamp-list {
    display: flex;
    flex-wrap: wrap;
  }
</style>
