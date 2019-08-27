export default class Leaf {
    constructor(x,y,w,texture,p) {
        //in this class I use p instances properly
        this.p = p;

        //position vector of leaft
        this.pos = this.toRelPos(x,y);

        //rotatino angle
        this.angle = 0;

        //leaf size in px in FHD
        this.w=w;

        //calculating relative width and height
        this.resize();

        //physics velocity and acceleration
        this.vel = p.createVector(0,0);
        this.acc = p.createVector(0,0);

        //texture
        this.texture = texture;
    }

    applyForce(force) {
        this.acc.add(force);
    }

    toNormalPos(x,y) {
        return this.p.createVector(x*this.p.width, y*this.p.height);
    }

    toRelPos(x,y) {
        return this.p.createVector(x/this.p.width, y/this.p.height);
    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.toRelPos(this.vel.x,this.vel.y));
        this.angle = (this.vel.heading());
        this.acc.mult(0);
    }

    resize() {
        //relative width and height
        this.relW = Math.min(this.w/this.p.width,this.w/this.p.height);
    }

    draw() {

        this.update();

        //freeze canvas
        this.p.push();

        //translation for rotation
        let pos = this.toNormalPos(this.pos.x,this.pos.y);
        this.p.translate(pos.x,pos.y);
        this.p.imageMode(this.p.CENTER);

        //rotation itelsf
        this.p.rotate(this.angle);

        //drawing
        let d = this.relW*this.p.width;
        this.p.image(this.texture,0,0,d,d);

        //unfreeze
        this.p.pop();
    }

    isOffscreen() {
        return (
            this.pos.x < 0-this.relW ||
            this.pos.x > 1+this.relW ||
            this.pos.y > 1+this.relW
        );
    }
}