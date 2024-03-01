function drawTriangle(ctx, coord, size, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(coord.x + size.w, coord.y - 25);
  ctx.lineTo(coord.x + size.w, coord.y + size.h + 25);
  ctx.lineTo(coord.x + size.w + 50, coord.y + size.h / 2);
  ctx.fill();
}

export class EarthModule {
  constructor(name, type, coord, size, color) {
    this.name = name;
    this.type = type;
    this.coord = coord;
    this.size = { w: size.w - 50, h: size.h };
    this.color = color;
  }
  draw(ctx) {
    if (this.type == "Flow")
      drawTriangle(ctx, this.coord, this.size, this.color);

    ctx.fillStyle = this.color;
    ctx.fillRect(this.coord.x, this.coord.y, this.size.w, this.size.h);
    ctx.fillStyle = this.color;
    ctx.fillRect(this.coord.x, this.coord.y, this.size.w, this.size.h);
    ctx.font = "bold 24px Fira Sans, sans-serif";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      this.name,
      this.coord.x + this.size.w / 2,
      this.coord.y + this.size.h / 2
    );
  }
}
