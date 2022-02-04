interface Variables {
    [key: string]: string | number
}

interface Functions {
    [name: string]: {
        fn: Function,
        params: Variables
    }
}

declare type NodeParser = (node: Element, vars?: Variables) => void
declare module globalThis {
    var variables: Variables
    var functions: Functions
}
