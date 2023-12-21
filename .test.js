const MyTreeNode = require("./MyTreeNode");

describe("Tree test", () => {
  let tree;
  const testData = "1 (2 3 (6 7 (9 10) 8) 4 5)";
  beforeEach(() => {
    tree = new MyTreeNode();
    tree.buildFromString(testData);
  });

  test("Test root", () => {
    expect(tree.root.value).toBe(1);
  });

  test("Get depth", () => {
    expect(tree.getDepth()).toBe(4);
  });

  test("Get count nodes", () => {
    expect(tree.getCountNodes()).toBe(10);
  });

  test("Get count leaves", () => {
    expect(tree.getCountLeaves()).toBe(7);
  });

  test("throws error for mismatched parentheses", () => {
    const str = "1 (2 (4 5 6 (7) 108 (9) 3)";
    expect(() => {
      const tree = new MyTreeNode();
      tree.buildFromString(str);
    }).toThrow("Invalid format: mismatched parentheses");
  });

  test("throws error for empty string", () => {
    const str = "";
    expect(() => {
      const tree = new MyTreeNode();
      tree.buildFromString(str);
    }).toThrow("Invalid format: mismatched parentheses");
  });

  test("throws error for missing space between numbers", () => {
    const str = "1(2 (4 5 6 (7) 108 (9)) 3)";
    expect(() => {
      const tree = new MyTreeNode();

      tree.buildFromString(str);
    }).toThrow("Invalid format: mismatched parentheses or missing space");
  });

  test("throws error for missing space at the end", () => {
    const str = "1 (2 (4 5 6 (7) 108 (9)) 3) ";
    expect(() => {
      const tree = new MyTreeNode();

      tree.buildFromString(str);
    }).toThrow("Invalid format: mismatched parentheses or missing space");
  });
});
