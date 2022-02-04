import renderError from "../helpers/renderError";
import StringInterpolator from "../helpers/StringInterpolator";

export default (node: Element, next: NodeParser, vars?: Variables) => {
    const expression = node.getAttribute(':expr');
    if(!expression) {
        return renderError('Expression must be specified');
    }
    const interpolator = new StringInterpolator(expression, vars);
    const results = interpolator.process();
    const trueValue = node.querySelector('true');
    const falseValue = node.querySelector('false');
    const result = eval(results);
    if(!trueValue || !falseValue) {
        return renderError('Both true and false expressions must be specified');
    }
    if(result) {
        next(trueValue, vars);
    } else {
        next(falseValue, vars);
    }
}