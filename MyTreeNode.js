const MyNode = require("./MyNode");
const { findClosingBracketIndex, checkInputError } = require("./helpers");
class MyThreeNode {
  constructor() {
    this.root = null;
  }

  _setLastNode(newNode) {
    this._lastNode = newNode;
  }

  setRoot(rootNode) {
    this.root = rootNode;
  }

  _getLastNode() {
    return this._lastNode;
  }

  getDepth() {
    return this._getDepth(this.root);
  }

  _getDepth(node) {
    if (!node) {
      return 0;
    }
    if (node.children.length === 0) {
      return 1;
    }
    let maxChildDepth = 0;
    for (let child of node.children) {
      const childDepth = this._getDepth(child);
      if (childDepth > maxChildDepth) {
        maxChildDepth = childDepth;
      }
    }
    return 1 + maxChildDepth;
  }

  getCountNodes() {
    return this._getCountNodes(this.root);
  }

  _getCountNodes(node) {
    if (!node) {
      return 0;
    }
    let count = 1;
    for (let child of node.children) {
      count += this._getCountNodes(child);
    }
    return count;
  }

  getCountLeaves() {
    return this._getCountLeaves(this.root);
  }

  _getCountLeaves(node) {
    if (!node) {
      return 0;
    }
    if (node.children.length === 0) {
      return 1;
    }
    let leafCount = 0;
    for (let child of node.children) {
      leafCount += this._getCountLeaves(child);
    }
    return leafCount;
  }

  buildFromString(str, parent = null) {
    checkInputError(str)
    const arrayChild = str.match(/\d+|\s+|./g);
    if (!parent) {
      const root = new MyNode(parseInt(arrayChild[0], 10));
      this.setRoot(root);
      if (str.length) {
        arrayChild.splice(0, 3);
        arrayChild.pop();
        this.buildFromString(arrayChild.join(""), root);
      }
    } else {
      for (let index = 0; index < arrayChild.length; index++) {
        const char = arrayChild[index];
        if (char !== " " && char !== "(" && char !== ")") {
          const newNode = new MyNode(parseInt(char, 10));
          this._setLastNode(newNode);
          parent.addChild(newNode);
        }
        if (char === "(") {
          const subNum = arrayChild
            .slice(0, index)
            .filter((item) => item !== " ")
            .reduce((acc, cur) => {
              return acc + (cur.length - 1);
            }, 0);
          const closingIndex = findClosingBracketIndex(str, index + subNum);
          const slicedStr = str.slice(index + subNum + 1, closingIndex);
          this.buildFromString(slicedStr, this._getLastNode());
          index += slicedStr.length;
        }
      }
    }
  }
}

module.exports = MyThreeNode;
