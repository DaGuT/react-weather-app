import p5 from "p5"
import "./forest.css"
import Tree from "./tree.js"
import tree1 from "./trees/tree1.png"

window.wind = 2;

export default function Forest(maxTrees) {

  var p5 = window.p5;

  this.forest = [];
  this.maxTrees = maxTrees || 2;

  this.create = function() {
    this.forest = [];
    for (let i = 0; i < this.maxTrees; ++i) {
      //we set maximum treeSize by that, because line height is 380px and 66px is navbar. Now our trees do not overlap with text
      let treeHeight = p5.random(p5.height / 6, p5.height - 380 - 66);
      this.forest.push(new Tree(p5.random(0, p5.width * 3 / 4), 0, treeHeight * 0.871, treeHeight, tree1));
    }
  }

  this.draw = function() {
    //to make shear work propely and let root stay on its place without moving we apply translate
    p5.translate(p5.width / 2, p5.height);
    //we draw each tree of this forest
    for (let i = 0; i < this.maxTrees; ++i) {
      this.forest[i].draw();
    }
    //To let all other things draw properly
    p5.translate(-p5.width / 2, -p5.height);
  }

  this.resize = function() {
    for (let i = 0; i < this.maxTrees; ++i) {
      this.forest[i].resize(100, 100);
    }
  }

}
