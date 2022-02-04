const KEYWORD_LENGTH = 5;

export default (node: Element): Variables => {
  const varRegex = /:var:[a-zA-z]+/;
  const attrs = Array.from(node.attributes);
  const newVars: Variables = {};
  attrs.forEach((attr) => {
    if (varRegex.test(attr.name)) {
      const { name, value } = attr;
      newVars[name.slice(KEYWORD_LENGTH)] = value;
    }
  });
  return newVars;
};
