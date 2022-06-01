<template>
  <li class="item-wrap">
    <div @click="call_read_status" class="item-link">
      <div class="item-img-wrap">
        <img class="item-img" :src="alert_profile(alert_item)" alt="" />
      </div>
      <div class="item-info">
        <p class="item-source overflow">
          {{ alert_item.title }}
        </p>
        <div class="item-preview overflow">
          {{ alert_item.body }}
        </div>
        <p class="item-date not-kr">{{ alert_item.alarmDate }}</p>
      </div>
      <div v-if="!alert_item.readStatus" class="item-new"></div>
    </div>
  </li>
</template>

<script>
  import { mapActions, mapState } from "vuex";
  import teams_list from "@/assets/data/teams_list.js";

  export default {
    name: "alert-list-item",
    props: {
      alert_item: {
        type: Object,
        default() {
          return {
            alarmId: Number,
            alarmType: Number,
            alarmedObjectId: Number,
            readStatus: Boolean,
            title: String,
            body: String,
            alarmDate: String
          };
        }
      }
    },
    computed: {
      ...mapState("profileStore", ["user_profile_default_url"]),
      alert_path() {
        return this.alert_item.alarmType === 2
          ? `/profile/my_join_company_list`
          : `/community/detail/${this.alert_item.teamIndex}/${this.alert_item.alarmedObjectId}`;
      }
    },
    methods: {
      ...mapActions("notifyStore", ["api_alarm_read"]),
      async call_read_status() {
        await this.api_alarm_read(this.alert_item.alarmId);
        this.$router.push(this.alert_path);
      },
      alert_profile(alert_item) {
        if (alert_item.alarmType === 3 || alert_item.alarmType === 4) {
          const logo = teams_list[alert_item.teamIndex - 1].team_logo;
          return require(`@/assets/images/${logo}`);
        } else {
          return this.user_profile_default_url;
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "./NotifyList.scss";
</style>
