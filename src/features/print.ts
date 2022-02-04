import StringInterpolator from "../helpers/StringInterpolator";

export default (node: Element, vars?: Variables) => {
  const message = node.getAttribute(":message");
  const interpolator = new StringInterpolator(message!, vars);
  const finalString = interpolator.process();
  const debug = document.createElement("div");
  debug.style.color = "red";
  debug.style.fontWeight = '700';
  debug.style.fontSize = '24px';
  debug.innerText = finalString;
  document.body.appendChild(debug);
};
