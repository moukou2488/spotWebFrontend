<template>
  <div class="user-frame">
    <div class="user-frame-title text">
      <p>
        {{ nickname }}
        {{ frame_info.frame_title }}
      </p>
    </div>
    <div class="user-frame-sub_text text">
      <p>
        {{ frame_info.sub_text[0] }}
      </p>
      <p>
        {{ frame_info.sub_text[1] }}
      </p>
    </div>
    <div
      class="user-frame-sub_text_small text"
      v-if="frame_info.sub_text_small != undefined"
    >
      <p>
        {{ frame_info.sub_text_small[0] }}
      </p>
      <p>
        {{ frame_info.sub_text_small[1] }}
      </p>
    </div>
    <div class="user-frame-image">
      <div class="frame-image-wrapper">
        <img class="frame-image" :src="img" alt="프레임이미지" />
      </div>
    </div>
    <ul
      class="user-frame-sub_text_explain"
      v-if="frame_info.sub_text_explain != undefined"
    >
      <li>
        <span>{{ frame_info.sub_text_explain[0] }}</span>
      </li>
      <li>
        <span>{{ frame_info.sub_text_explain[1] }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "user-frame",
    props: {
      frame_info: {
        type: Object,
        required: true
      },
      nickname: {
        type: String
      },
      img: {
        type: String
      }
    }
  };
</script>

<style lang="scss" scoped>
  .user-frame {
    display: inline-block;
    margin: 58px auto 0;
    width: 100%;

    .text {
      text-align: center;
    }

    .user-frame-title {
      margin-bottom: 10px;
      line-height: 27px;
      letter-spacing: -0.8px;
      font-size: 24px;
    }
    .user-frame-sub_text {
      line-height: 24px;
      letter-spacing: -0.6px;
      font-size: 15px;
      color: #484848;
    }
    .user-frame-sub_text_small {
      margin-top: 10px;
      margin-left: 7px;
      line-height: 18px;
      letter-spacing: -0.72px;
      font-size: 11px;
      color: #636363;
    }
    .user-frame-sub_text_explain {
      position: relative;
      right: -10px;
      width: 350px;
      margin: 0 auto;
      line-height: 18px;
      letter-spacing: -0.72px;
      font-size: 11px;
      color: $dodger_blue;
      list-style-type: disc;
      li {
        & + li {
          margin-top: 12px !important;
        }
        span {
          position: relative;
          left: -7px;
          color: #636363;
        }
      }
    }
    .user-frame-image {
      .frame-image-wrapper {
        width: 259px;
        height: 259px;
        margin: 28px auto;
        .frame-image {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
