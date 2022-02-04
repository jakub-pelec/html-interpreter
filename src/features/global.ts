import parseVariables from "../helpers/parseVariables";

export default (node: Element) => {
  const variables: Variables = parseVariables(node);
  for(const [key, value] of Object.entries(variables)) {
    window.variables[key] = value;
  }
};
