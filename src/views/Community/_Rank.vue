<template>
  <div class="communuty-rank">
    <top-bar :topbar_type="'back'" :topbar_text="'구단순위'"></top-bar>
    <s-rank-pre />
  </div>
</template>

<script>
  import TopBar from "@/components/Common/TopBar.vue";
  import SRankPre from "@/components/Community/s-rank-pre.vue";
  export default {
    name: "communuty-rank",
    components: {
      TopBar,
      SRankPre
    }
  };
</script>
