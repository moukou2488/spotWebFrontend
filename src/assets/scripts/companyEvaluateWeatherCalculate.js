export default function(index_point) {
  let return_point;
  let icon_url;
  let sub_text = "오늘의 ";

  switch (index_point) {
    case 5:
      return_point = 0;
      icon_url = require("@/assets/images/profile_weather_sky.png");
      sub_text += "하늘 무지개 등장";
      break;
    case 3:
      return_point = 1;
      icon_url = require("@/assets/images/profile_weather_sun.png");
      sub_text += "날씨 맑음";
      break;
    case 0:
      return_point = 2;
      icon_url = require("@/assets/images/profile_weather_cloud.png");
      sub_text += "날씨 포근";
      break;
    case -3:
      return_point = 3;
      icon_url = require("@/assets/images/profile_weather_rainy.png");
      sub_text += "날씨 흐림";
      break;
    case -5:
      return_point = 4;
      icon_url = require("@/assets/images/profile_weather_thunder.png");
      sub_text += "날씨 우르르쾅쾅";
      break;
    default:
      return_point = false;
      break;
  }
  return {
    icon_url,
    return_point,
    sub_text
  };
}
