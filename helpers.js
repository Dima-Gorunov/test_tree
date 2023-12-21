function findClosingBracketIndex(str, openingIndex) {
  let openBrackets = 0;

  for (let i = openingIndex + 1; i < str.length; i++) {
    if (str[i] === "(") {
      openBrackets++;
    } else if (str[i] === ")") {
      if (openBrackets === 0) {
        return i; // Нашли соответствующий индекс закрывающей скобки
      }
      openBrackets--;
    }
  }

  return -1; // Если не нашли закрывающую скобку
}

function printTree(node, prefix = "", isTail = true) {
  console.log(prefix + (isTail ? "└── " : "├── ") + node.value);

  for (let i = 0; i < node.children.length - 1; i++) {
    printTree(node.children[i], prefix + (isTail ? "    " : "│   "), false);
  }

  if (node.children.length > 0) {
    printTree(
      node.children[node.children.length - 1],
      prefix + (isTail ? "    " : "│   "),
      true
    );
  }
}

function checkInputError(str) {
  if (!str) {
    throw new Error("Invalid format: mismatched parentheses");
  }
  const regex = /\d+|\(|\)/g;
  const nodes = str.match(regex) || [];

  // Проверка корректности скобок
  const stack = [];
  let lastNodeWasNumber = false;

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node === "(") {
      if (lastNodeWasNumber) {
        throw new Error("Invalid format: missing space between numbers");
      }
      stack.push("(");
    } else if (node === ")") {
      if (stack.length === 0 || stack.pop() !== "(") {
        throw new Error("Invalid format: mismatched parentheses or missing space");
      }
    } else {
      if (lastNodeWasNumber) {
        throw new Error("Invalid format: missing space between numbers");
      }
      lastNodeWasNumber = true;
    }

    if (node !== "(") {
      lastNodeWasNumber = false;
    }
  }

  if (stack.length !== 0 || lastNodeWasNumber) {
    throw new Error("Invalid format: mismatched parentheses or missing space");
  }

  return nodes;
}

module.exports = { findClosingBracketIndex, printTree, checkInputError };
