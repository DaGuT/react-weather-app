import p5 from "p5"
import Forest from "./forest.js"

const sketch = (p5) => {

  //so that we can work with p5 later we change scope of p5
  window.p5 = p5;

  //this is just background color stuf
  let color = 1;
  let sign = 1;

  //we create forest
  let forest = new Forest(5);

  //basic setup
  p5.setup = () => {
    p5.angleMode(p5.DEGREES);
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.background(255);
    forest.create();
  }

  //here we draw everything
  p5.draw = () => {

    // //color changing stuff
    // if (color >= 255) {
    //   sign *= -1;
    // }
    // if (color <= 0) {
    //   sign *= -1;
    // }
    // color += sign;
    // p5.background(color);
    p5.background(255);

    //we redraw forest everyframe
    forest.draw();
  }

  //in case of window resize we resize everything
  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    forest.resize();
  }

}

new p5(sketch);
