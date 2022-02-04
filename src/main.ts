import fFor from "./features/for";
import fGlobal from "./features/global";
import fPrint from "./features/print";
import fVar from "./features/local";
import getChildNodes from "./helpers/getChildNodes";

enum Tokens {
  'GLOBAL' = 'GLOBAL',
  'FOR' = 'FOR',
  'PRINT' = 'PRINT',
  'LOCAL' = 'LOCAL'
}

window.variables = {};

const code = document.querySelector("entry#code");

const parseNode = (node: Element, vars?: Variables) => {
  const token = node.tagName;

  switch (token) {
    case Tokens.GLOBAL:
      fGlobal(node);
      break;
    case Tokens.FOR:
      fFor(node, parseNode, vars);
      break;
    case Tokens.PRINT:
      fPrint(node, vars);
      break;
    case Tokens.LOCAL:
      const newVars = fVar(node);
      vars = { ...vars, ...newVars };
      break;
  }
  if (node.childNodes && token !== 'FOR') {
    for (const childNode of getChildNodes(node)) {
      parseNode(childNode as Element, vars);
    }
  }
};

for (const childNode of getChildNodes(code!)) {
  parseNode(childNode as Element);
}
