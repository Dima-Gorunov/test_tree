const MyTreeNode = require("./MyTreeNode");
const { printTree } = require("./helpers");

const tree = new MyTreeNode();
tree.buildFromString("1 (2 (4 5 6 (7) 108 (9)) 3)");


printTree(tree.root);
