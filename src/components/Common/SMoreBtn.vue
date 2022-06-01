<template>
  <div class="s-more-btn">
    <v-btn
      class="button-link"
      @click="config_more_btn_show(set_list)"
      depressed
      :color="'#fff'"
    >
      <img
        class="button-image"
        :src="require('@/assets/images/btn_more@3x.png')"
        alt="더보기 버튼"
      />
    </v-btn>
  </div>
</template>

<script>
  import { mapActions } from "vuex";

  export default {
    name: "s-more-btn",
    props: {
      set_list: {
        type: Object,
        required: true
      }
    },
    methods: {
      ...mapActions("modalStore", ["config_more_btn_show"])
    }
  };
</script>

<style lang="scss">
  .s-more-btn {
    .button-link {
      .v-btn__content {
        width: 100%;
        height: 100%;
        .button-image {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
