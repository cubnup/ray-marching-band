class Obj{
  constructor(x,y,r){
    this.pos=createVector(x,y);
    this.r=r
  }
  show(){
    color(255)
    fill(color(0,0,0));
    noStroke();
    circle(this.pos.x,this.pos.y,this.r);
  }
}