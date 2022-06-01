function canvas() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerWidth;
  var img = new Image();
  img.src = this.stamp_detail.photoUrl;
  img.width = window.innerWidth;
  img.height = window.innerWidth;
  img.crossOrigin = "Anonymous";
  const logoExists = this.stamp_detail.logoExists;
  const countExists = this.stamp_detail.countExists;
  const gameExists = this.stamp_detail.gameExists;
  const watchCount = this.stamp_detail.watchCount;
  const game_team = this.game_team;
  const location = this.stamp_detail.location;
  const gameDate = this.stamp_detail.gameDate;
  img.onload = function() {
    ctx.drawImage(img, 0, 0, window.innerWidth, window.innerWidth);
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, window.innerWidth, window.innerWidth);
    ctx.fillStyle = "white";
    if (logoExists) {
      const logo = document.getElementById("logo");
      ctx.drawImage(logo, 13, 13);
    }
    if (countExists) {
      ctx.font = "72px Noto Sans KR";
      ctx.fillText(watchCount, 13, 100);
      ctx.font = "14px Noto Sans KR";
      let width = 55;
      if (9 < watchCount && watchCount < 100) width = 95;
      else if (99 < watchCount && watchCount < 1000) width = 135;

      ctx.fillText("회차", width, 100);
    }
    if (gameExists) {
      ctx.font = "13px Noto Sans KR";
      ctx.fillText(game_team, 13, 135);
      ctx.fillText(location, 13, 160);
      ctx.fillText(gameDate, 13, 180);
    }
  };
  this.canvas_stamp();
}
function canvas_stamp() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerWidth;
  if (this.stamp_detail.logoExists) {
    const logo = document.getElementById("logo");
    ctx.drawImage(logo, 13, 13);
  }
  ctx.fillStyle = "white";
  if (this.stamp_detail.countExists) {
    ctx.font = "72px Noto Sans KR";
    ctx.fillText(this.stamp_detail.watchCount, 13, 100);
    ctx.font = "14px Noto Sans KR";
    let width = 55;
    if (9 < this.stamp_detail.watchCount && this.stamp_detail.watchCount < 100)
      width = 95;
    else if (
      99 < this.stamp_detail.watchCount &&
      this.stamp_detail.watchCount < 1000
    )
      width = 135;

    ctx.fillText("회차", width, 100);
  }
  if (this.stamp_detail.gameExists) {
    ctx.font = "13px Noto Sans KR";
    ctx.fillText(this.game_team, 13, 135);
    ctx.fillText(this.stamp_detail.location, 13, 160);
    ctx.fillText(this.stamp_detail.gameDate, 13, 180);
  }
}
function save_image() {
  var link = document.createElement("a");
  link.download = "buddy.png";
  link.href = document.getElementById("canvas").toDataURL();
  link.click();
}

export { canvas, canvas_stamp, save_image };
