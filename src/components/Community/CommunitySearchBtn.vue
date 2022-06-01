<template>
  <div>
    <router-link class="button-link" href="#" to="/community/search">
      <img
        class="button-image"
        :src="require('@/assets/images/bt_search@3x.png')"
        alt="검색 아이콘"
      />
    </router-link>
  </div>
</template>

<script>
  export default {
    name: "community-search-btn"
  };
</script>
