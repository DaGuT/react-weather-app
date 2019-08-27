import p5 from "p5"
import "./forest.css"
import Tree from "./tree.js"
import tree1 from "./tree1.png"

window.wind = 0;

export default function Forest(maxTrees,p) {

  this.forest = [];
  this.maxTrees = maxTrees || 2;

  //we set maximum tree height by that, because line height is #380px and #66px is navbar. Now our trees do not overlap with text
  //Actually, it's always gonna be 380, but it's fine. Id ont want to change it as I like how it looks. 
  let lineHeight = document.getElementsByClassName('weather').length !== 0
    ? parseInt(document.getElementsByClassName('weather')[0].style.height)
    : 380;
  let maxTreeHeight = window.innerHeight - lineHeight - 66;

  this.create = function() {
    this.forest = [];
    for (let i = 0; i < this.maxTrees; ++i) {
      let treeHeight = p.random(maxTreeHeight / 6, maxTreeHeight);
      this.forest.push(new Tree(p.random(0, p.width * 3 / 4), 0, treeHeight * 0.871, treeHeight, tree1,p));
    }
  }

  this.draw = function() {
    //to make shear work propely and let root stay on its place without moving we apply translate
    p.translate(p.width / 2, p.height);
    //we draw each tree of this forest
    for (let i = 0; i < this.maxTrees; ++i) {
      this.forest[i].draw();
    }
    //To let all other things draw properly
    p.translate(-p.width / 2, -p.height);
  }

  this.resize = function() {
    for (let i = 0; i < this.maxTrees; ++i) {
      //just to make it clear visible
      let tree = this.forest[i];
      tree.resize();
    }
  }

}
