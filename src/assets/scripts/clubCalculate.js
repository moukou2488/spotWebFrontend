let team_list = [
  { team: "선택안함", team_idx: -1 },
  { team: "두산 베어스", team_idx: 1 },
  { team: "한화 이글스", team_idx: 2 },
  { team: "NC 다이노스", team_idx: 3 },
  { team: "롯데 자이언츠", team_idx: 4 },
  { team: "키움 히어로즈", team_idx: 5 },
  { team: "KIA 타이거즈", team_idx: 6 },
  { team: "kt wiz", team_idx: 7 },
  { team: "SSG 랜더스", team_idx: 8 },
  { team: "삼성 라이온즈", team_idx: 9 },
  { team: "LG 트윈스", team_idx: 10 }
];

export default function(team_idx) {
  for (let i = 0; i < team_list.length; i++) {
    if (team_list[i].team_idx === team_idx) return team_list[i].team;
  }
}
