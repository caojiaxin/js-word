import { read as readCFB, find, CFB$Container } from "cfb";
import { readFib } from "./fib";
import { getDocTxt } from "./clx";

/**
 * [MS-DOC] 2.4.1 Retrieving Text
 */
export function parse_cfb(file: CFB$Container): string {
  const wordDocument = find(file, "/WordDocument");
  const wordStream = wordDocument.content as Buffer;
  const fib = readFib(wordStream);
  const tableName = fib.base.fWhichTblStm === 1 ? "/1Table" : "/0Table";
  const table = find(file, tableName);
  const tableStream = table.content as Buffer;
  const text = getDocTxt(fib, wordStream, tableStream);
  return text;
}

export function readFile(filePath: string): string {
  const file = readCFB(filePath, {type: "file"});
  return parse_cfb(file);
}

export function read(data: Buffer): string {
  const file = readCFB(data, {type: "buffer"});
  return parse_cfb(file);
}