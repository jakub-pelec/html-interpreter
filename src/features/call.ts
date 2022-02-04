import parseVariables from "../helpers/parseVariables";
import renderError from "../helpers/renderError";

export default (node: Element, vars?: Variables) => {
  const name = node.getAttribute(":name");
  if (!name) {
    return renderError("Name of callable object must be defined");
  }
  const args = parseVariables(node);
  const { fn } = window.functions[name];
  return fn({...vars, ...args});
};
