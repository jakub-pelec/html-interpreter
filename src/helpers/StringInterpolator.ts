export default class StringInterpolator {

    vars: Variables = {};
    cursor: number = -1;
    initString: string = '';
    finalString: string = '';
    exprMode: boolean = false;
    expr: string[] = [];

    constructor(s: string, v?: Variables) {
        this.initString = s;
        if(v) {
            this.vars = v;
        }
    }

    getToken() {
        this.cursor++;
        return this.initString[this.cursor];
    }

    checkToken(token: string) {
        if(token === '}') {
            this.exprMode = false;
            this.interpolate(this.expr.join(''));
            this.expr = [];
            return;
        }
        if(this.exprMode && token !== '}') {
            this.expr.push(token);
            return;
        }
        if(token === '{') {
            this.exprMode = true;
            return;
        }
        this.finalString += token;
    }

    interpolate(name: string) {
        if(this.vars[name] !== undefined) {
            this.finalString += this.vars[name];
            return;
        }
        if(window.variables[name] !== undefined) {
            this.finalString += window.variables[name]
            return;
        }
        this.finalString += 'undefined';
        return;
    }
    
    process() {
        while(this.cursor < this.initString.length - 1) {
            this.checkToken(this.getToken());
        }
        return this.finalString;
    }
}