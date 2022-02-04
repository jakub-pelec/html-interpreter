import fFor from "./features/for";
import fGlobal from "./features/global";
import fPrint from "./features/print";
import fVar from "./features/var";

window.variables = {};

const code = document.querySelector("entry#code");

const parseNode = (node: Element, vars?: Variables) => {
  if (!(node instanceof HTMLElement)) {
    return false;
  }
  const token = node.tagName;

  switch (token) {
    case "GLOBAL":
      fGlobal(node);
      break;
    case "FOR":
      fFor(node, parseNode, vars);
      break;
    case "PRINT":
      fPrint(node, vars);
      break;
    case "VAR":
      const newVars = fVar(node);
      vars = { ...vars, ...newVars };
      break;
  }
  if (node.childNodes && token !== 'FOR') {
    for (let childNode of Array.from(node.childNodes)) {
      parseNode(childNode as Element, vars);
    }
  }
};

for (const childNode of Array.from(code!.childNodes)) {
  parseNode(childNode as Element);
}
