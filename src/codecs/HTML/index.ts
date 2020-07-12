import { JSDOM } from "jsdom";

export function parse_str(data: string): string {
  const dom: JSDOM = new JSDOM(data);
  return dom.window.document.querySelector('body').textContent;
}

export function read(data: Buffer): string {
  return parse_str(data.toString());
}