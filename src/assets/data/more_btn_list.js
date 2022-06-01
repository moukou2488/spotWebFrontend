export default {
  profile_image: {
    type: "profile_image",
    list: [
      {
        text: "사진 촬영 또는 사진 선택하기",
        arrow: true
      },
      {
        text: "기본 이미지로 변경하기",
        arrow: false
      }
    ]
  },
  other_user_report: {
    type: "other_user_report",
    list: [{ text: "신고하기" }, { text: "차단하기" }]
  },
  mine_detail: {
    type: "mine_detail",
    list: [{ text: "수정하기" }, { text: "삭제하기" }]
  },
  chat_detail: {
    type: "chat_detail",
    list: [{ text: "평가하기" }, { text: "신고하기" }, { text: "차단하기" }]
  },
  community_detail_other: {
    type: "community_detail_other",
    list: [{ text: "신고하기" }, { text: "게시글 숨기기" }]
  },
  stamp_detail_other: {
    type: "stamp_detail_other",
    list: [{ text: "게시글 숨기기" }]
  },
  evaluate: {
    type: "evaluate",
    list: [{ text: "수정하기" }, { text: "삭제하기" }]
  }
};
