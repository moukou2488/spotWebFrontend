<template>
  <div class="stamp-detail-body">
    {{ stamp_detail.diaryContent }}
  </div>
</template>

<script>
  import { mapState } from "vuex";
  export default {
    name: "stamp-detail-body",
    computed: {
      ...mapState("stampStore", ["stamp_detail"])
    }
  };
</script>

<style lang="scss" scoped>
  .stamp-detail-body {
    width: 100%;
    height: 95px;
    padding: 18px 14px 0;
    font-size: 14px;
    line-height: 28px;
    letter-spacing: -0.64px;
    color: #464646;
    resize: none;
  }
</style>
