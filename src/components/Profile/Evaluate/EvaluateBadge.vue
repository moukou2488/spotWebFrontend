<template>
  <div class="evalutate-badge" :class="{ selected: item.selected }">
    <p class="badge-text">{{ item.text }}</p>
    <a class="button-link" href="#" @click.prevent="delete_item">
      <img
        v-if="item.selected"
        class="button-image"
        :src="require('@/assets/images/clear@3x.png')"
        alt="평가 삭제"
      />
    </a>
  </div>
</template>

<script>
  export default {
    name: "evaluate-badge",
    props: {
      item: {
        type: Object,
        default() {
          return {
            index: Number,
            selected: Boolean,
            text: String,
            type: String
          };
        }
      }
    },
    methods: {
      delete_item() {
        this.$eventBus.$emit("delete_item", this.item);
        this.$emit("delete_item", this.item);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .evalutate-badge {
    display: inline-flex;
    align-items: center;
    height: 34px;
    padding: 0 14px;
    border: 1px solid #ddd;
    border-radius: 60px;

    .badge-text {
      font-size: 12px;
      line-height: 17px;
      letter-spacing: -0.24px;
      color: #464646;
    }

    &.selected {
      padding: 8px 12px 8px 14px;
      .button-link {
        width: 16px;
        height: 16px;
        margin-left: 8px;
        .button-image {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
