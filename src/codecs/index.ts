import { read as readCFB, find, CFB$Container } from "cfb";
import { parse_cfb as parse_DOCX } from "./DOCX";
import { parse_cfb as parse_DOC } from "./DOC";
import { parse_cfb as parse_MHT } from "./MHT";
import { parse_cfb as parse_ODT } from "./ODT";
import { read as read_HTML } from "./HTML";
import { read as read_RTF } from "./RTF";
import { read as read_XML } from "./XML";
import { readFileSync } from "fs";

export function parse_cfb(file: CFB$Container): string {
  if(find(file, "/WordDocument")) return parse_DOC(file);
  if(find(file, "/CONTENTS")) throw "Unsupported Works WPS file";
  if(find(file, "/MM") || find(file, "/MN0")) throw "Unsupported Works WPS file";
  throw "Unsupported CFB file";
}

export function parse_zip(file: CFB$Container): string {
  if(find(file, "/[Content_Types].xml")) return parse_DOCX(file);
  if(find(file, "/META-INF/manifest.xml")) return parse_ODT(file);
  throw "Unsupported ZIP file";
}

// TODO: replace this with a proper structure
export function read(data: Buffer): string {
  const header = data.slice(0,17).toString("binary");
  if(header == "MIME-Version: 1.0") return parse_MHT(readCFB(data, {type: "buffer"}));
  if(header.slice(0,6) == "{\\rtf1") return read_RTF(data);
  if(header.slice(0,5) == "<?xml") return read_XML(data);
  if(header.slice(0,5) == "<html") return read_HTML(data);
  if(header.slice(0,4) == "\xD0\xCF\x11\xE0") return parse_cfb(readCFB(data, {type: "buffer"}));
  if(header.slice(0,4) == "PK\x03\x04") return parse_zip(readCFB(data, {type: "buffer"}));
  // TODO: plaintext
  throw "Unsupported file";
}

export function readFile(path: string): string {
  return read(readFileSync(path));
}