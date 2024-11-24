let scrw;
let scrh;
let objs = [];
let radius = 50;
let numObjs = 5;
let midp;
let setmidp;
let stepCount = 0;

function distTo(p, c) {
  return abs(dist(p.x, p.y, c.pos.x, c.pos.y)) - c.r / 2;
}

function rayMarch(startp, dir) {
  stepCount = 0;
  let nowp = startp;
  let minDist = 1000;
  let maxIter = 100;
  let rayCircs = [];
  for (let i = 0; i < maxIter; i++) {
    stepCount++;
    minDist = 100000;
    for (let o of objs) {
      let d = distTo(nowp, o);
      if (d < minDist) minDist = d;
    }
    for (let e of [nowp.x, nowp.y, scrw - nowp.x, scrh - nowp.y]) {
      if (e < minDist) minDist = e;
    }
    noFill();
    stroke(255);
    circle(nowp.x, nowp.y, 2 * minDist);
    fill(255, 0, 0);
    circle(nowp.x, nowp.y, 5);
    nowp = nowp.add(createVector(0, -minDist).rotate(dir));
    if (minDist < 1) i = maxIter;
  }
  let endp = nowp;
  return endp;
}

function keyPressed() {
  if (keyCode == 90) {
    objs.push(new Obj(mouseX, mouseY, radius));
  }
}

function setup() {
  scrw = windowWidth;
  scrh = windowHeight;
  setmidp = createVector(scrw / 2, scrh / 2);
  createCanvas(scrw, scrh);
}

function draw() {
  if (keyIsDown(88)) objs.push(new Obj(mouseX, mouseY, radius));
  if (keyIsDown(67)) setmidp = createVector(mouseX, mouseY);
  if (keyIsDown(38)) radius+=5;
  if (keyIsDown(40)) radius-=5;
  if (radius > 200) radius = 200;
  if (radius < 10) radius = 10;

  midp = createVector(setmidp.x, setmidp.y);
  background(160);
  noStroke();
  circle(midp.x, midp.y, 10);
  for (let o of objs) {
    o.show();
  }
  let mousePosN = createVector(mouseX - midp.x, midp.y - mouseY);
  let mouseDir = atan2(mousePosN.x, mousePosN.y);
  let rayEnd = rayMarch(midp, mouseDir);
  noStroke();
  textSize(20);
  let txt =
    "Z to place circle \nX to paint circles \nC to move start point \n⇅ to change radius (" +
    radius +
    ")\n" +
    "End Point: " +
    round(rayEnd.x) +
    ", " +
    round(rayEnd.y) +
    "\nNumber of steps: " +
    stepCount;
  text(txt, 10, scrh - 200, 300, 400);
}

//mouseX,mouseY
