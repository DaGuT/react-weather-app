import p5 from "p5"
import Forest from "./trees/forest.js"
import LeafField from "./leafs/leafField.js"

//leaves for leaf field
import _leaf01 from './leafs/01.svg';
import _leaf02 from './leafs/02.svg';
import _leaf03 from './leafs/03.svg';
import _leaf04 from './leafs/04.svg';

const sketch = (p) => {

  //so that we can work with p later we change scope of p
  window.p = p;

  let leafField,
    forest;

  p.preload = () => {
    let leaf01 = p.loadImage(_leaf01);
    let leaf02 = p.loadImage(_leaf02);
    let leaf03 = p.loadImage(_leaf03);
    let leaf04 = p.loadImage(_leaf04);

    this.leafs = [leaf01, leaf02, leaf03, leaf04];

    //forest = new Forest(5,p);
    leafField = new LeafField(30, this.leafs, p);
  }

  //this is just background color stuf
  let color = 1;
  let sign = 1;

  //basic setup
  p.setup = () => {
    //basic setup. White bg, full size canvas, degrees mode for rotation
    p.angleMode(p.DEGREES);
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(255);

    //forest.create();
    leafField.create();
  }

  //here we draw everything
  p.draw = () => {
    //only draw when tab is active
    if (!document.hidden) {
      p.background(255);

      //we redraw forest everyframe forest.draw();
      leafField.draw();
    }
  }

  //in case of window resize we resize everything
  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    //forest.resize();
  }

}

new p5(sketch);
