<template>
  <div class="alert-detail">
    <top-bar :topbar_text="'알림 출처'" :topbar_type="'back'" />
    <div class="main" role="main">
      <div class="alert-wrap">
        <div class="alert-img"></div>
        <div>
          <div class="alert-box">
            동행 주최자 쪽지 보내기 창 width는 고정 height는 쪽지 내용에 따라
            margin: 14px 16px 14px 16px; 은 고정해주세요.
          </div>
          <div class="alert-time">5/25일 10:00</div>
        </div>
      </div>
      <div class="alert-wrap">
        <div class="alert-img"></div>
        <div>
          <div class="alert-box">
            동행 주최자 쪽지 보내기 창 width는 고정 height는 쪽지 내용에 따라
            margin: 14px 16px 14px 16px; 은 고정해주세요.
            <div class="alert-send-img"></div>
          </div>
          <div class="alert-time">5/25일 10:00</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TopBar from "@/components/Common/TopBar.vue";
  export default {
    name: "alert-detail",
    components: { TopBar }
  };
</script>

<style lang="scss" scoped>
  .main {
    padding-top: 24px !important;
  }
  .alert-wrap {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-bottom: 18px;
    .alert-img {
      width: 42px;
      height: 42px;
      margin-right: 10px;
      border-radius: 50%;
      background-color: #ddd;
    }
    .alert-box {
      width: 258px;
      margin-bottom: 6px;
      padding: 14px 16px;
      border-radius: 0 12px 12px 12px;
      background-color: #f4f4f4;
      color: #575757;
      font-size: 14px;
      font-weight: 600;
      line-height: 22px;
    }
    .alert-time {
      font-size: 10px;
      line-height: 22px;
      color: #999;
    }
    .alert-send-img {
      height: 199px;
      background-color: #fff;
      margin-top: 12px;
    }
  }
</style>
