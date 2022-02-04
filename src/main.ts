import fFor from "./features/for";
import fGlobal from "./features/global";
import fPrint from "./features/print";
import fVar from "./features/local";
import getChildNodes from "./helpers/getChildNodes";
import fFunction from './features/function';
import fCall from './features/call';

enum Tokens {
  'GLOBAL' = 'GLOBAL',
  'FOR' = 'FOR',
  'PRINT' = 'PRINT',
  'LOCAL' = 'LOCAL',
  'FUNCTION' = 'FUNCTION',
  'ARGS' = 'ARGS',
  'CALL' = 'CALL'
}

const endTokens = [Tokens.FOR];

window.variables = {};

const code = document.querySelector("entry#code");

const parseNode = (node: Element, vars?: Variables) => {
  const token: Tokens = node.tagName as Tokens;
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
    case Tokens.FUNCTION:
      fFunction(node, parseNode, vars);
      break;
    case Tokens.CALL:
      fCall(node);
      break;
  }
  if (node.childNodes && !endTokens.includes(token)) {
    for (const childNode of getChildNodes(node)) {
      parseNode(childNode as Element, vars);
    }
  }
};

for (const childNode of getChildNodes(code!)) {
  parseNode(childNode as Element);
}
