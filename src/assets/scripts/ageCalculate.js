/**
 * Number type의 나이를 받으면 연령대를 String 으로 반환
 * @param {Number} num_age - 나이 (e.g 27)
 * @return {String} 연령대 (e.g 20대 후반)
 */
function ageCalculate(num_age) {
  const age_arr = String(num_age).split("");

  let return_text = age_arr[0] + "0대 ";
  if (num_age >= 100) {
    return_text = "100대";
  }

  if (age_arr[1] < 3) return_text += "초반";
  else if (age_arr[1] < 6) return_text += "중반";
  else return_text += "후반";

  return return_text;
}

function onlyAgeCalculate(num_age) {
  const age_arr = String(num_age).split("");
  let return_text = age_arr[0] + "0대 ";

  if (num_age >= 100) {
    return_text = "100대";
  }

  return return_text;
}

function ageFromYear(year_age) {
  const birth_year = Number(year_age.substring(0, 4));
  const current_year = new Date().getFullYear();
  return current_year - birth_year + 1; // 만 나이로 해야하나..?
}

export { ageCalculate, onlyAgeCalculate, ageFromYear };
