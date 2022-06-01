<template>
  <footer class="community_write_footer">
    <div class="empty-checkbox-wrap">
      <input
        :checked="public_state"
        @click="set_public_state"
        id="isAnonymous"
        class="anonymous-wrap empty-checkbox"
        type="checkbox"
      />
      <label for="isAnonymous" class="empty-label">비공개</label>
      <s-toast :where="'bottom'" />
    </div>
  </footer>
</template>

<script>
  import SToast from "@/components/Common/SToast.vue";
  import { mapMutations, mapState } from "vuex";
  export default {
    components: { SToast },
    computed: {
      ...mapState("stampStore", ["public_state"])
    },
    methods: {
      ...mapMutations("stampStore", ["set_public_state"])
    }
  };
</script>

<style lang="scss" scoped>
  .img_wrapper {
    margin-bottom: 60px;
    width: 100%;
  }
  .img_wrapper img {
    max-width: 100%;
  }
  .community_write_footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 54px;
    padding: 0 14px;
    border-top: solid 1px #e9e9e9;
    .anonymous-wrap {
      margin-bottom: 16px;
      padding-top: 26px;

      .custom-label {
        font-size: 12px;
        font-weight: 500;
        line-height: 18px;
        color: #777;
      }
    }
  }
</style>
