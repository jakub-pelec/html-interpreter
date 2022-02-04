import fFor from './features/for';
import fVar from './features/var';
import fPrint from './features/print';

window.variables = {};

const code = document.querySelector("#code");

const parseNode = (node: Element) => {
  if (!(node instanceof HTMLElement)) {
    return false;
  }
  const cmd = node.tagName;

  switch (cmd) {
    case "VAR":
      fVar(node);
      break;
    case "FOR":
      fFor(node, parseNode);
      break;
    case "PRINT":
      fPrint(node);
      break;
  }
  if (node.childNodes) {
    for (let childNode of Array.from(node.childNodes)) {
      parseNode(childNode as Element);
    }
  }
};

for (const childNode of Array.from(code!.childNodes)) {
  parseNode(childNode as Element);
}
