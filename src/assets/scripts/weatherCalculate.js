/**
 * (80%~100%) : 하늘이
 * (60%~80%) : 맑음이
 * (40%~60%) : 구름이
 * (20%~40%) : 흐림이
 * (0%~20%) : 천둥이
 */
export default function(weather_point) {
  let icon = "";
  let sub_text = "오늘의 날씨";
  let icon_text = "";

  if (weather_point > 80) {
    icon = "sky";
    icon_text = "무지개";
    sub_text += " 무지개 등장";
  } else if (weather_point > 60) {
    icon = "sun";
    icon_text = "맑음";
    sub_text += " 맑음";
  } else if (weather_point > 40) {
    icon = "cloud";
    icon_text = "구름";
    sub_text += " 포근";
  } else if (weather_point > 20) {
    icon = "rainy";
    icon_text = "흐림";
    sub_text += " 흐림";
  } else {
    icon = "thunder";
    icon_text = "천둥";
    sub_text += " 우르르쾅쾅";
  }

  return {
    icon_url: require(`@/assets/images/profile_weather_${icon}.png`),
    icon_text,
    sub_text,
    weather_point
  };
}
