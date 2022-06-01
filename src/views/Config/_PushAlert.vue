<template>
  <section class="config-push_alert">
    <top-bar :topbar_text="'푸시 알림 설정'" :topbar_type="'back'" />
    <ul class="config-list">
      <li class="list-item">
        <div class="text-area">
          <p class="main-text">채팅 알림</p>
          <p class="sub-text">채팅 메시지 알림</p>
        </div>
        <div class="switch-area">
          <v-switch
            class="custom-switch"
            inset
            :color="'#3bb1ff'"
            hide-details
            v-model="push_alert.messageTurnOn"
            @change="change_push_alert($event, 'MESSAGE')"
          ></v-switch>
        </div>
      </li>
      <li class="list-item">
        <div class="text-area">
          <p class="main-text">활동 알림</p>
          <p class="sub-text">댓글, 좋아요 알림</p>
        </div>
        <div class="switch-area">
          <v-switch
            class="custom-switch"
            inset
            :color="'#3bb1ff'"
            hide-details
            v-model="push_alert.activityTurnOn"
            @change="change_push_alert($event, 'ACTIVITY')"
          ></v-switch>
        </div>
      </li>
      <li class="list-item">
        <div class="text-area">
          <p class="main-text">일정 알림</p>
          <p class="sub-text">등록 일정 알림</p>
        </div>
        <div class="switch-area">
          <v-switch
            class="custom-switch"
            inset
            :color="'#3bb1ff'"
            hide-details
            v-model="push_alert.scheduleTurnOn"
            @change="change_push_alert($event, 'SCHEDULE')"
          ></v-switch>
        </div>
      </li>
      <li class="list-item">
        <div class="text-area">
          <p class="main-text">마케팅 알림</p>
          <p class="sub-text">마케팅 정보 수신 동의</p>
        </div>
        <div class="switch-area">
          <v-switch
            class="custom-switch"
            inset
            :color="'#3bb1ff'"
            hide-details
            v-model="push_alert.promoTurnOn"
            @change="change_push_alert($event, 'PROMOTION')"
          ></v-switch>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
  import TopBar from "@/components/Common/TopBar.vue";
  import { mapActions, mapState } from "vuex";

  export default {
    name: "config-push_alert",
    components: { TopBar },
    computed: { ...mapState("configStore", ["push_alert"]) },
    methods: {
      ...mapActions("configStore", [
        "api_get_push_alarm_status",
        "api_post_push_alarm_setting"
      ]),
      async change_push_alert($event, type) {
        await this.api_post_push_alarm_setting({
          pushAlarmType: type,
          pushAlarmOn: $event
        });
      }
    },
    async mounted() {
      await this.api_get_push_alarm_status();
    }
  };
</script>

<style lang="scss" scoped>
  @import "./ConfigSwitch.scss";
  .config-push_alert {
    height: 100vh;
    background-color: #f0f0f0;
  }
</style>
