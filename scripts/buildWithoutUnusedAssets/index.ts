import fs from "fs-extra";

import copyable from "./detector";
import { otherFiles } from "./const";

fs.writeJSONSync("./detect.ignore.json", copyable, { spaces: 2 });

if (fs.pathExistsSync("./dist/")) fs.removeSync("./dist/");
fs.mkdirpSync("./dist/");

[...copyable, ...otherFiles].forEach((x) => {
  fs.copySync(`./${x}`, `./dist/${x}`);
});
