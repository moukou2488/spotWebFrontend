export default {
  // 로그인 만료
  session: {
    headline: "세션이 만료되었습니다.",
    body_text: `다시 로그인해 주세요.`,
    button_text_major: "확인"
  },
  // 로그인
  login: {
    headline: "로그인이 필요합니다",
    button_text_major: "확인"
  },
  // 로그아웃
  logout: {
    headline: "로그인이 필요합니다",
    body_text: "정말 로그아웃 하시겠습니까?",
    button_text_negative: "닫기",
    button_text_major: "로그아웃"
  },
  // 차단
  block: {
    headline: "해당 사용자를 차단하시겠습니까?",
    body_text: `차단시, 해당 사용자의 모집글, <br/>채팅을 볼 수 없습니다.`,
    button_text_negative: "아니오",
    button_text_major: "네"
  },
  // 동행 & 커뮤 삭제 공통 사용
  delete: {
    headline: "해당 게시글을 삭제하시겠습니까?",
    body_text: ``,
    button_text_negative: "취소",
    button_text_major: "확인"
  },
  // 동행 확정
  "company-confirm": {
    headline: "동행을 확정하시겠습니까?",
    body_text: `
      모집자와 신청자 양쪽 모두 동행확정을 누를 시 <br />
      최종 확정이 되며, 확인 알림이 보내집니다.`,
    button_text_negative: "더 생각할게요",
    button_text_major: "확정할게요"
  },
  // 커뮤 숨기기
  "community-hide": {
    headline: "해당 게시글을 숨기시겠습니까?",
    button_text_negative: "아니오",
    button_text_major: "네"
  },
  "chat-delete": {
    headline: "채팅을 삭제하시겠습니까? ",
    body_text: `삭제를 하시면 채팅내역이 모두 삭제되고 채팅목록에서도 삭제됩니다.`,
    button_text_negative: "아니요",
    button_text_major: "네"
  },
  "alert-delete": {
    headline: "알림을 삭제하시겠습니까? ",
    body_text: ``,
    button_text_negative: "아니요",
    button_text_major: "네"
  },
  "email-auth": {
    headline: "아직 이메일 인증이<br />완료되지 않았습니다.",
    body_text: `
      이 기능은 이메일 인증이 필요한 기능입니다. <br />
      프로필에서 이메일 인증을<br /> 완료해주시기 바랍니다.
    `,
    button_text_negative: "취소",
    button_text_major: "프로필로 가기"
  },
  "mail-auth-yet": {
    headline: "아직 이메일 인증이 완료되지<br />않았습니다.",
    body_text: `
    아래 메일 재전송 버튼을 눌러 이메일 인증을<br />
    완료해주시기 바랍니다.<br />
    메일함에서 인증메일을 확인해주시기 바랍니다.<br />
    이메일 인증이 완료되지 않은 경우,<br />
    앱 내 활동에 제약을 받을 수 있습니다.<br />
    `,
    body_style: "p-12",
    button_text_negative: "확인",
    button_text_major: "메일 재전송",
    button_type: "parallel"
  },
  // 동행 마감
  "company-close": {
    headline: "모집 공고를 마감하시겠습니까?",
    body_text:
      "동행 모집이 완료되었나요?<br/>사용자들에게 해당 공고가 보여지지 않습니다.",
    button_text_negative: "아니오",
    button_text_major: "네"
  },
  // 동행 평가 삭제
  "evaluate-delete": {
    headline: "동행 평가를 삭제하시겠습니까?",
    body_text: "",
    button_text_negative: "취소",
    button_text_major: "확인"
  }
};
