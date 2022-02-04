interface Variables {
    [key: string]: string | number
}

declare type NodeParser = (node: Element, vars?: Variables) => void
declare module globalThis {
    var variables: Variables
}
