"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectedPlugins = exports.jsonMaps = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const vm_1 = __importDefault(require("vm"));
/**
 * Map000.json 系
 */
exports.jsonMaps = fs_extra_1.default
    .readdirSync("./data")
    .filter((x) => /^Map\d/.test(x))
    .map((x) => `./data/${x}`)
    .map((x) => fs_extra_1.default.readJSONSync(x));
/**
 * 指定されたプラグイン一覧
 */
exports.connectedPlugins = (() => {
    const context = vm_1.default.createContext();
    vm_1.default.runInContext(fs_extra_1.default.readFileSync("./js/plugins.js", { encoding: "utf8" }), context);
    return context["$plugins"];
})().map((x) => x.name);
