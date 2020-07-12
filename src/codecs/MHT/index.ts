import { CFB$Container, CFB$Entry } from "cfb";
import { read as read_HTML } from "../HTML";

export function parse_cfb(file: CFB$Container): string {
  const firstHtmlIdx: number = file.FullPaths.findIndex((path: string) => /\.html?$/.test(path));
  const entry: CFB$Entry = file.FileIndex[firstHtmlIdx];
  if(!entry || !entry.content) throw "MHT missing an HTML entry";
  return read_HTML(Buffer.from(entry.content as Buffer));
}

/*
import * as fs from 'fs';
import * as CFB from 'cfb';

const cfb: CFB.CFB$Container = CFB.read("testFiles/demo.mht", { type: "file" });
console.log(cfb.FullPaths);

fs.writeFile("testFiles/output.txt", dom.window.document.querySelector('body').textContent, (err: NodeJS.ErrnoException) => console.error(err))
*/
// console.log(dom.window.document.querySelector('body').textContent.replace("\n", ''));

/*fs.readFile('./Hello_World.demo', 'utf8', (err: NodeJS.ErrnoException, data: string) => {
    dom.window.document.children.item(0).childNodes
})*/