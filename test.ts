import 'mocha';
import * as assert from 'assert';
import * as fs from 'fs';
import * as WORD from "./src";
import { sync } from 'glob';

const formats = ["doc", "docx", "htm", "html", "mht", "odt", "rtf", "xml"];
describe("test_files", () => {
  formats.forEach(fmt => {
    describe(fmt, () => {
      const files = sync(`test_files/**/*.${fmt}`);
      files.forEach(fn => {
        if(fs.existsSync(fn + ".skip")) return;
        (fs.existsSync(fn + ".txt") ? it : it.skip)(fn, () => {
          const result: string = "\ufeff" + WORD.readFile(fn);
          const baseline = fs.readFileSync(fn + ".txt", "utf8");
          assert.equal(result, baseline);
        });
      });
    });
  });
});