export default (node: Element) => {
    const varRegex = /:var:[a-zA-z]+/;
    const attrs = Array.from(node.attributes);
    const vars: Variables = {};
    attrs.forEach((attr) => {
      if (varRegex.test(attr.name)) {
        const { name, value } = attr;
        vars[name.slice(5)] = value;
      }
    });
    return vars;
  };
  