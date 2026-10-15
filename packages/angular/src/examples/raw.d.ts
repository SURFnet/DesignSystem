// `import source from './file.ts?raw'` gives a file's text, to show example code in Storybook
// Docs. The loader for it is set up in `.storybook/main.ts`.
declare module '*?raw' {
  const source: string;
  export default source;
}
