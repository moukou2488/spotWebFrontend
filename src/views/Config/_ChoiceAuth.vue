<template>
  <section class="config-choice_auth">
    <top-bar :topbar_text="'선택적 접근 권한'" :topbar_type="'back'" />
    <ul class="config-list">
      <li class="list-item">
        <div class="text-area">
          <p class="main-text">사진</p>
          <p class="sub-text">
            사진 및 동영상 업로드 및 저장을 위해 필요합니다.
          </p>
        </div>
        <div class="switch-area">
          <v-switch
            class="custom-switch"
            inset
            :color="'#3bb1ff'"
            hide-details
          ></v-switch>
        </div>
      </li>
      <li class="list-item">
        <div class="text-area">
          <p class="main-text">카메라</p>
          <p class="sub-text">
            사진 및 동영상 업로드를 위한 촬영을 위해 필요합니다.
          </p>
        </div>
        <div class="switch-area">
          <v-switch
            class="custom-switch"
            inset
            :color="'#3bb1ff'"
            hide-details
          ></v-switch>
        </div>
      </li>
      <li class="list-item">
        <div class="text-area">
          <p class="main-text">위치 정보</p>
          <p class="sub-text">
            SPOT맵 제작 시 지도 상의 현 위치 확인 및 출발지, 도착지 설정을 위해
            필요합니다.
          </p>
        </div>
        <div class="switch-area">
          <v-switch
            class="custom-switch"
            inset
            :color="'#3bb1ff'"
            hide-details
          ></v-switch>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
  import TopBar from "@/components/Common/TopBar.vue";

  export default {
    name: "config-choice_auth",
    components: { TopBar }
  };
</script>

<style lang="scss" scoped>
  @import "./ConfigSwitch.scss";
  .config-choice_auth {
    height: 100vh;
    background-color: #f0f0f0;
  }
</style>
