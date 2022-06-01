<template>
  <div class="s-modal">
    <div class="s-modal-wrap">
      <div v-if="head_title" class="s-modal-head">
        <span>{{ head_title }}</span>
      </div>
      <div class="s-modal-body">
        <slot name="body" />
      </div>
      <div class="s-modal-foot">
        <slot name="foot" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "s-modal",
    props: {
      head_title: {
        type: String
      }
    }
  };
</script>

<style lang="scss" scoped>
  .s-modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 998;
    top: 0;
    bottom: 0;
    width: 100%;
    padding: 0 14px;
    box-sizing: border-box;
    background-color: rgba($color: #000, $alpha: 0.3);

    .s-modal-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      font-size: 14px;
      background-color: #fff;
      border-radius: 3px;

      .s-modal-head {
        width: 100%;
        padding: 14px 0;
        text-align: center;
        border-bottom: 1px solid #e9e9e9;
      }

      .s-modal-foot {
        width: 100%;
        box-sizing: border-box;
        padding: 12px 15px;
        margin-top: 40px;
        border-top: 1px solid #e9e9e9;
        .solo {
          width: 202px !important;
        }
      }
    }
  }
</style>
