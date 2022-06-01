<template>
  <router-link
    id="alert"
    :class="{ on: !not_read }"
    class="button-link"
    to="/notify/alert"
  >
    <img
      class="button-image"
      :src="require('@/assets/images/bt_alarm@3x.png')"
      alt="알림 아이콘"
    />
  </router-link>
</template>

<script>
  import { mapActions } from "vuex";
  export default {
    name: "s-alert-icon",
    data: () => ({ not_read: true }),
    methods: { ...mapActions("notifyStore", ["api_get_alarm_read_status"]) },
    async mounted() {
      const response = await this.api_get_alarm_read_status();
      this.not_read = response;
    }
  };
</script>
