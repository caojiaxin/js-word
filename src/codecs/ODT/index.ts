import { CFB$Container, find } from "cfb";
import { JSDOM } from "jsdom";

/**
 * Grabs the text content of an odt file
 *
 * @param {string} file path to .odt file
 * @return {string} text content of file
 */
export function parse_cfb(file: CFB$Container): string {
  // Read the content.xml of the file
  const buf = find(file, 'content.xml').content;

  // Parse with JSDOM
  const dom = new JSDOM((buf as Buffer).toString());
  let result = "";

  // Use querySelector to grab elements from content.xml
  // We can grab any element, not just text:p
  dom.window.document.querySelectorAll("text\\:p").forEach((element) => {
    // Do something with each paragraph here
    //   TODO: compare output to word text files
    result += element.textContent + "\n";
  });

  return result;
}
