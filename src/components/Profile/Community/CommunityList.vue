<template>
  <ul>
    <community-list-item
      v-for="community_list_item in community_list"
      :key="community_list_item.id"
      :community_list_item="community_list_item"
    />
  </ul>
</template>

<script>
  import CommunityListItem from "./CommunityListItem.vue";
  export default {
    components: { CommunityListItem },
    props: {
      community_list: {
        type: Array,
        required: true
      }
    }
  };
</script>

<style lang="scss" scoped></style>
