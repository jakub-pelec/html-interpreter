interface Variables {
    [key: string]: string
}

declare type NodeParser = (node: Element) => void
declare module globalThis {
    var variables: Variables
}
