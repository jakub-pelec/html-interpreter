export default class StringInterpolator {

    v: Variables = {};
    cursor: number = -1;
    s: string = '';
    f: string = '';
    exprMode: boolean = false;
    expr: string[] = [];

    constructor(s: string, v?: Variables) {
        this.s = s;
        if(v) {
            this.v = v;
        }
    }

    getToken() {
        this.cursor++;
        return this.s[this.cursor];
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
        this.f += token;
    }

    interpolate(name: string) {
        if(this.v[name] !== undefined) {
            this.f += this.v[name];
            return;
        }
        if(window.variables[name] !== undefined) {
            this.f += window.variables[name]
            return;
        }
        this.f += 'undefined';
        return;
    }
    
    process() {
        while(this.cursor < this.s.length - 1) {
            this.checkToken(this.getToken());
        }
        return this.f;
    }
}