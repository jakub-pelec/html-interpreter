import fFor from "./features/for";
import fGlobal from "./features/global";
import fPrint from "./features/print";
import getChildNodes from "./helpers/getChildNodes";
import fFunction from './features/function';
import fCall from './features/call';
import fCondition from './features/condition';

enum Tokens {
  'GLOBAL' = 'GLOBAL',
  'FOR' = 'FOR',
  'PRINT' = 'PRINT',
  'LOCAL' = 'LOCAL',
  'FUNCTION' = 'FUNCTION',
  'ARGS' = 'ARGS',
  'CALL' = 'CALL',
  'CONDITION' = "CONDITION"
}

const endTokens = [Tokens.FOR, Tokens.CONDITION];

window.variables = {};

const code = document.querySelector("entry#code");

const parseNode = (node: Element, vars?: Variables) => {
  const token: Tokens = node.tagName as Tokens;
  const connectedVars = {...window.variables, ...vars};
  switch (token) {
    case Tokens.GLOBAL:
      fGlobal(node);
      break;
    case Tokens.FOR:
      fFor(node, parseNode, connectedVars);
      break;
    case Tokens.PRINT:
      fPrint(node, vars);
      break;
    case Tokens.FUNCTION:
      fFunction(node, parseNode, connectedVars);
      break;
    case Tokens.CALL:
      fCall(node);
      break;
    case Tokens.CONDITION:
      fCondition(node, parseNode, connectedVars);
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
