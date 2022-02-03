const code = document.querySelector("#code");
const variables = {};

const getVariable = (node) => {
  const varRegex = /:var:[a-zA-z]+/;
  const attrs = Array.from(node.attributes);
  attrs.forEach((attr) => {
    if (varRegex.test(attr.name)) {
      const { name, value } = attr;
      variables[name.slice(5)] = value;
    }
  });
};

const parseNode = (node) => {
  if (!(node instanceof HTMLElement)) {
    return false;
  }
  const cmd = node.tagName;

  switch (cmd) {
    case "VAR":
      getVariable(node);
      break;
    case "FOR":
      let fromValue = node.getAttribute(":from");
      if (variables[fromValue]) {
        fromValue = variables[fromValue];
      }
      let toValue = node.getAttribute(":to");
      if (variables[toValue]) {
        toValue = variables[toValue];
      }
      for (let i = fromValue; i < toValue; i++) {
        for (let childNode of node.children) {
          parseNode(childNode);
        }
      }
      break;
    case "PRINT":
      const message = node.getAttribute(":message");
      console.log(message);
      break;
  }
  if (node.childNodes) {
    for (let childNode of Array.from(node.childNodes)) {
      parseNode(childNode);
    }
  }
};

for (const childNode of Array.from(code.childNodes)) {
  parseNode(childNode);
}
