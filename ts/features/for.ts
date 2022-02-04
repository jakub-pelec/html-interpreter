export default (node: Element, next: NodeParser) => {
  let fromValue = node.getAttribute(":from")!;
  if (window.variables[fromValue]) {
    fromValue = window.variables[fromValue];
  }
  let toValue = node.getAttribute(":to")!;
  if (window.variables[toValue]) {
    toValue = window.variables[toValue];
  }
  for (let i = parseInt(fromValue); i < parseInt(toValue); i++) {
    for (const childNode of node.children) {
      next(childNode);
    }
  }
};
