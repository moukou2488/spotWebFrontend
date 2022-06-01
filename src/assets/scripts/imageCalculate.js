// 이미지 비율 계산기
function calculator(origin_width, origin_height, criteria_size) {
  let ratio = 0;

  let image_size = {
    width: "",
    height: ""
  };

  if (origin_width >= origin_height) {
    ratio = origin_height / origin_width;
    image_size.width = `${criteria_size.width}px`;
    image_size.height = `${criteria_size.width * ratio}px`;
  } else {
    // 세로가 더 긴 사진
    ratio = origin_width / origin_height;
    if (criteria_size.height * ratio > criteria_size.width) {
      image_size.width = `${criteria_size.width}px`;
      image_size.height = `${criteria_size.width / ratio}px`;
    } else {
      image_size.width = `${criteria_size.height * ratio}px`;
      image_size.height = `${criteria_size.height}px`;
    }
  }
  return image_size;
}

function big_size_calculate(origin_width, origin_height) {
  const criteria_size = {
    width: window.innerWidth,
    height: window.innerHeight - 40
  };
  return calculator(origin_width, origin_height, criteria_size);
}

function img_ratio_calculate(origin_width, origin_height, image_type) {
  let criteria_size = {
    width: "",
    height: ""
  };
  if (image_type === "solo") {
    // 상세 페이지 한 장 짜리
    criteria_size.width = window.innerWidth - 28;
    criteria_size.height = 462;
  } else if (image_type === "swipe") {
    // 상세 페이지
    criteria_size.width = 190;
    criteria_size.height = 190;
  } else if (image_type === "write-preview") {
    // 작성 미리보기
    criteria_size.width = 104;
    criteria_size.height = 78;
  } else if (image_type === "list-preview") {
    // 리스트 뷰
    criteria_size.width = 94;
    criteria_size.height = 94;
  }

  return calculator(origin_width, origin_height, criteria_size);
}

export { big_size_calculate, img_ratio_calculate };
