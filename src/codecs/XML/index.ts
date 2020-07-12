import { JSDOM } from 'jsdom';

export function parse_str(data: string): string {
  const listOfParagraphs: Node[] = [];
  const dom: JSDOM = new JSDOM(data, {contentType: "text/xml"});
  const dfs = (node: Node): void => {
    if (node.hasChildNodes) {
      node.childNodes.forEach((node: ChildNode) => {
        if (node.nodeName === "w:p") listOfParagraphs.push(node);
        dfs(node);
      });
    }
  };
  dfs(dom.window.document)

  const out: string[] = [];
  listOfParagraphs.forEach((node: Node) => {
    node.childNodes.forEach((child) => out.push(child.textContent))
  });

  return out.join("");
};

export function read(data: Buffer): string {
  return parse_str(data.toString());
}