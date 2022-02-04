export default (node: Element) => {
  const message = node.getAttribute(":message");
  console.log(message);
};
