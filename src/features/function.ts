import getChildNodes from "../helpers/getChildNodes";
import parseVariables from "../helpers/parseVariables";
import renderError from "../helpers/renderError";

export default (node: Element, next: NodeParser, vars?: Variables) => {
  const name = node.getAttribute(":name");
  if (!name) {
    return renderError("Function must have specified name");
  }
  const argsElement = node.querySelector("args");
  if (argsElement === null) {
    return renderError("Element with arguments must be specified.");
  }
  const args = parseVariables(argsElement!);
  const body = node.querySelector("fbody");
  if (body === null) {
    return renderError("Body must be defined");
  }
  const expr = (params: Variables) => {
    const childNodes = getChildNodes(body);
    for(const childNode of childNodes) {
        next(childNode as Element, params);
    }
  }
  
  window.functions = {
    ...window.functions,
    [name]: { fn: expr, params: args },
  };
};
