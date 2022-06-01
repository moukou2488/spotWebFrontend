<template>
  <div class="stamp-detail">
    <stamp-detail-top-bar />
    <stamp-detail-cover />
    <stamp-detail-body />
    <s-toast :where="'bottom'" />
  </div>
</template>

<script>
  import SToast from "@/components/Common/SToast.vue";
  import StampDetailBody from "@/components/Stamp/StampDetailBody.vue";
  import StampDetailCover from "@/components/Stamp/StampDetailCover.vue";
  import StampDetailTopBar from "@/components/Stamp/StampDetailTopBar.vue";
  export default {
    name: "stamp-detail",
    components: {
      StampDetailBody,
      StampDetailCover,
      StampDetailTopBar,
      SToast
    }
  };
</script>

<style></style>
