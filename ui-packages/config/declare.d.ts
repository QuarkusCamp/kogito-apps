declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content1: string;
  export default content1;
}

declare module '!!raw-loader!*' {
  const contentStr: string;
  export default contentStr;
}
