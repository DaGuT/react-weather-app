import Leaf from './leaf.js';
import p5 from "p5"

export default class LeafField {
    constructor(maxLeafs,leafsTextures,p) {
        this.maxLeafs = maxLeafs;
        this.leafsTextures = leafsTextures;
        this.p = p;

        this.leafs = [];

        this.xOff = 0;

        this.gravity = p.createVector(0,0.005);
    }

    create() {
        //creating maxLeafs leafs
        for (let i = 0; i<this.maxLeafs; i++) {
            //height of the leaf
            let h = this.p.random()*25+25;
            //pushin leaf to the array
            this.leafs.push(new Leaf(this.p.random(this.p.width),this.p.random(this.p.height),h,this.p.random(this.leafsTextures),this.p));
        }
    }

    draw() {
        //renaming
        let leafs = this.leafs;

        this.xOff +=0.1;

        //loop to update every single leaf
        for (let i=0; leafs[i]; i++) {
            leafs[i].draw();
            
            let nz = this.p.noise(leafs[i].pos.x,leafs[i].pos.y,this.xOff)*this.p.TWO_PI;
            let pow = this.p.noise(this.xOff);
            
            leafs[i].applyForce(p5.Vector.fromAngle(nz).mult(pow*0.01));
            leafs[i].applyForce(this.gravity);
            leafs[i].applyForce(this.p.createVector(-window.wind||0,0).mult(0.005));

            //if leaf is offscreen, we spawn a new one
            if (leafs[i].isOffscreen()) {
                //we first remove it
                leafs.splice(i,1);

                //init new height
                let h = this.p.random()*25+25;
                //create new leaf
                if (this.p.random()>0.5)
                    leafs.push(new Leaf(this.p.random(this.p.width),-h,h,this.p.random(this.leafsTextures),this.p));
                else
                    leafs.push(new Leaf(this.p.width+h,this.p.random(this.p.height),h,this.p.random(this.leafsTextures),this.p));
            }
        }
    }

    //on window resize we resize each leaf
    resize() {
        let leafs = this.leafs;
        for (let i=0; leafs[i]; i++) { 
            leafs[i].resize();
        }
    }
}