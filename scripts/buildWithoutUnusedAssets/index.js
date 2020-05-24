"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const detector_1 = __importDefault(require("./detector"));
const const_1 = require("./const");
fs_extra_1.default.writeJSONSync("./detect.ignore.json", detector_1.default, { spaces: 2 });
if (fs_extra_1.default.pathExistsSync("./dist/"))
    fs_extra_1.default.removeSync("./dist/");
fs_extra_1.default.mkdirpSync("./dist/");
[...detector_1.default, ...const_1.otherFiles].forEach((x) => {
    fs_extra_1.default.copySync(`./${x}`, `./dist/${x}`);
});
