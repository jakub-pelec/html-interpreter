export default (node: Element, next: NodeParser, vars?: Variables) => {
  const iterator = node.getAttribute(":iterator");
  let fromValue = node.getAttribute(":from")!;
  if (window.variables[fromValue]) {
    fromValue = window.variables[fromValue] as string;
  }
  if (!!vars && vars[fromValue]) {
    fromValue = vars[fromValue] as string;
  }
  let toValue = node.getAttribute(":to")!;
  if (window.variables[toValue]) {
    toValue = window.variables[toValue] as string;
  }
  if (!!vars && vars[toValue]) {
    toValue = vars[toValue] as string;
  }
  for (let i = parseInt(fromValue); i < parseInt(toValue); i++) {
    for (const childNode of node.children) {
      next(childNode, { ...vars, ...(iterator && { [iterator]: i }) });
    }
  }
};
