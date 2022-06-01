<template>
  <div
    class="company-write-badge game"
    :class="isStamp ? '' : 'badge-required'"
  >
    <router-link
      class="custom-btn-wrap"
      :class="{ active: payload_data.tourLocation }"
      :to="routerUrl"
    >
      <img
        v-if="payload_data.tourLocation"
        class="icon-image"
        :src="require('@/assets/images/ic_baseball_active@3x.png')"
        alt="활성화 야구 아이콘"
      />
      <img
        v-else
        class="icon-image"
        :src="require('@/assets/images/ic_baseball@3x.png')"
        alt="비활성화 야구 아이콘"
      />
      <span class="custom-divison"></span>
      <span v-if="payload_data.tourLocation" class="loc_date-text">
        {{ payload_data.tourTeam }}
      </span>
      <span v-else class="loc_date-text">{{ gameChoose }}</span>
    </router-link>
  </div>
</template>

<script>
  import { mapState } from "vuex";

  export default {
    name: "company-write-badge-game",
    computed: {
      ...mapState("companyWriteStore", ["payload_data", "tourInfo"]),
      isStamp() {
        return this.$route.name === "stamp-write";
      },
      gameChoose() {
        return this.isStamp ? "경기 선택" : "경기일정 선택";
      },
      routerUrl() {
        return this.$route.name === "stamp-write"
          ? "/company/write/game_picker/stamp"
          : "/company/write/game_picker/company";
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "./CompanyWriteBadge.scss";
</style>
