<template>
  <div class="alert-list notify-list">
    <ul>
      <swipe-list
        ref="list"
        class="card"
        :items="computed_alert_list"
        @active="item_swipe"
      >
        <template
          v-slot="{
            item
          }"
        >
          <alert-list-item :alert_item="item" />
        </template>
        <template v-slot:right="{ item }">
          <div
            class="swipeout-action blue"
            title="remove"
            @click="open_dialog('alert-delete', item.alarmId)"
          >
            <!-- place icon here or what ever you want -->
            삭제
          </div>
        </template>
      </swipe-list>
    </ul>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import { SwipeList } from "vue-swipe-actions";
  import AlertListItem from "./AlertListItem.vue";
  export default {
    name: "alert-list",
    components: { AlertListItem, SwipeList },
    watch: {
      notify_last_visit() {
        this.item_swipe();
      }
    },
    data: () => ({
      del_alert_id: ""
    }),
    computed: {
      ...mapState("notifyStore", ["alert_list", "notify_last_visit"]),
      computed_alert_list() {
        if (this.alert_list.length === 0) {
          return [];
        } else {
          return this.alert_list;
        }
      }
    },
    methods: {
      ...mapActions("notifyStore", [
        "api_get_alertroom_list",
        "api_alert_delete"
      ]),
      ...mapActions("modalStore", ["config_toast_show"]),

      open_dialog(modal_type, item) {
        this.del_alert_id = item;
        this.$eventBus.$emit("alert", {
          type: modal_type
        });
      },
      item_swipe() {
        this.$refs.list.closeActions();
      }
    },
    async mounted() {
      await this.api_get_alertroom_list();

      this.$eventBus.$on("alert_close", async payload => {
        if (payload.type === "alert-delete") {
          await this.api_alert_delete(this.del_alert_id);
          await this.api_get_alertroom_list();
          this.config_toast_show("해당 알람이 삭제되었습니다."); // 동행 차단 toast 창 띄우기
        }
      });
    }
  };
</script>

<style lang="scss">
  @import "./NotifyList.scss";
  .swipeout-action {
    display: flex;
    align-items: center;
    padding: 0 3rem;
    cursor: pointer;
    left: 0;
  }
  .swipeout-right {
    display: flex;
    align-items: center;
  }
  .swipeout-action.blue {
    width: 76px;
    height: 58px;
    padding: 0 26px;
    font-size: 12px;
    font-weight: 500;
    line-height: 17px;
    letter-spacing: -0.56px;
    text-align: center;
    color: #ffffff;
    background-color: #3bb1ff !important;
  }
  .swipeout-action.blue:hover {
    background-color: darken#3bb1ff !important;
  }
  .swipeout-action.gray {
    width: 76px;
    height: 58px;
    padding: 0 26px;
    font-size: 12px;
    font-weight: 500;
    line-height: 17px;
    letter-spacing: -0.56px;
    text-align: center;
    color: #ffffff;
    background-color: #c2c2c2;
  }
  .swipeout-action.gray:hover {
    background-color: darken#c2c2c2;
  }
</style>
