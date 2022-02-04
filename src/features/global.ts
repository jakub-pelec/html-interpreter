const KEYWORD_LENGTH = 5;

export default (node: Element) => {
  const varRegex = /:var:[a-zA-z]+/;
  const attrs = Array.from(node.attributes);
  attrs.forEach((attr) => {
    if (varRegex.test(attr.name)) {
      const { name, value } = attr;
      window.variables[name.slice(KEYWORD_LENGTH)] = value;
    }
  });
};
