<template>
  <section class="profile-community-empty_view">
    <p class="main_text">{{ computed_empty_text.main_text }}</p>
    <p class="sub_text">{{ computed_empty_text.sub_text }}</p>
  </section>
</template>

<script>
  export default {
    name: "profile-community-empty_view",
    props: {
      page_id: {
        type: String,
        required: true
      }
    },
    computed: {
      computed_empty_text() {
        let return_obj = {
          main_text: "",
          sub_text: "우리 구단 이야기를 나눠보세요!"
        };
        switch (this.page_id) {
          case "scrap":
            return_obj.main_text = "아직 스크랩한 글이 없어요.";
            break;
          case "comment":
            return_obj.main_text = "아직 작성된 댓글이 없어요.";
            break;
          case "buddy":
            return_obj.main_text = "아직 등록된 버디의 일기가 없어요.";
            return_obj.sub_text = "지금 바로 일기를 등록해보세요.";
            break;
          default:
            return_obj.main_text = "아직 작성된 글이 없어요.";
            break;
        }

        return return_obj;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .profile-community-empty_view {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // padding-top: 48px;
    height: calc(100vh - 48px - 40px);
    .main_text {
      margin-bottom: 8px !important;
      color: #1e1e1e;
      font-size: 20px;
      font-weight: 500;
      letter-spacing: -0.8px;
    }
    .sub_text {
      color: #999;
      font-size: 15px;
      letter-spacing: -0.6px;
    }
  }
</style>
