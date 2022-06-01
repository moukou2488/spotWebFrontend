<template>
  <ul class="my-stamp-list">
    <my-stamp-list-item
      v-for="stamp_item in stamp_list"
      :key="stamp_item.diaryId"
      :stamp_item="stamp_item"
    />
  </ul>
</template>

<script>
  import MyStampListItem from "@/components/Profile/Stamp/MyStampListItem.vue";
  export default {
    name: "stamp-list",
    components: { MyStampListItem },
    props: {
      stamp_list: {
        type: Array,
        requred: true
      }
    }
  };
</script>

<style lang="scss" scoped>
  .my-stamp-list {
    padding: 18px 14px 30px !important;
    .my-stamp-list-item + .my-stamp-list-item {
      margin-top: 16px;
    }
  }
</style>
