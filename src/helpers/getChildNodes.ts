export default (node: Element) => {
    const childNodes = Array.from(node.childNodes);
    return childNodes.filter(node => node instanceof HTMLElement);
}