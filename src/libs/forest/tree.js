function Tree(x, y, width, height, sprite) {
  //this.pos={x:x,y:y};
  var p5 = window.p5;

  //ATTENTION
  //All size and positions should also be calculated as relative so that upon resize they keep everything
  this.pos = p5.createVector(x, y);
  this.relPos = p5.createVector(x / p5.width, y / p5.height);

  //tree Size
  this.maxHeight = p5.height - 380 - 66;
  this.width = width;
  this.height = height;
  this.relHeight = height / this.maxHeight;
  this.relWidth = this.relHeight * 0.871;
  //tree image
  this.sprite = p5.loadImage(sprite);

  //tree physics stuff
  this.acc = 0;
  this.vel = 0;
  this.angle = 0;
  this.tensionCoef = 0.5;

  //this is tension force of tree
  this.tensionForce = function() {
    let F = Math.abs(this.angle) * this.tensionCoef;
    return -F;
  }

  //this is force of wind
  this.wind = function() {
    return window.wind;
  }

  //force application (F=sum(ma))
  this.applyForce = function(force) {
    this.acc += force;
  }

  //we update tree by applying phycics
  this.update = function() {

    //update acceleration
    this.applyForce(this.wind());
    this.applyForce(this.tensionForce());

    //update velocity
    this.vel += (this.acc * 0.1);
    this.angle += (this.vel);

    //drop acceleration as new thypics should be applied at new step
    this.acc = 0;
  }

  //in case of resize of canvas we also resize trees and update their positions
  this.resize = function() {
    this.pos.x = this.relPos.x * p5.width;
    this.pos.y = this.relPos.y * p5.height;

    //tree Size
    this.maxHeight = p5.height - 380 - 66;
    this.height = Math.min(this.relHeight * this.maxHeight, this.maxHeight);
    this.width = this.height * 0.871;
  }

  //to make tree move we need to make hard transformation and then draw it
  this.draw = function() {

    //we apply physics
    this.update();

    //then we make tranform of our tree
    p5.shearX(this.angle);
    //we draw tranformed tree
    p5.image(this.sprite, this.pos.x - p5.width / 2, this.pos.y - this.height, this.width, this.height);
    //we rever back our transformation so that it will not apply to other trees
    p5.shearX(-this.angle);
  }

}

export default Tree;
