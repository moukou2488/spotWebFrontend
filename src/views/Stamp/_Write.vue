<template>
  <div class="stamp-write">
    <stamp-write-top-bar />
    <stamp-write-cover />
    <stamp-write-body />
    <stamp-write-footer />
    <s-cropper />
    <s-toast :where="'bottom'" />
  </div>
</template>

<script>
  import StampWriteBody from "@/components/Stamp/StampWriteBody.vue";
  import StampWriteTopBar from "@/components/Stamp/StampWriteTopBar.vue";
  import StampWriteFooter from "@/components/Stamp/StampWriteFooter.vue";
  import StampWriteCover from "@/components/Stamp/StampWriteCover.vue";
  import SCropper from "@/components/Common/SCropper.vue";
  import SToast from "@/components/Common/SToast.vue";

  export default {
    name: "stamp-write",
    components: {
      StampWriteTopBar,
      StampWriteCover,
      StampWriteBody,
      StampWriteFooter,
      SCropper,
      SToast
    }
  };
</script>

<style></style>
