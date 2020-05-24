"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otherFiles = exports.Dir = exports.exts = void 0;
/**
 * 対応拡張子
 */
exports.exts = [
    "png",
    "ogg",
    "m4a",
    "mp3",
    "mp4",
    "webm",
];
/**
 * 各ディレクトリ
 */
var Dir;
(function (Dir) {
    Dir["bgm"] = "audio/bgm/";
    Dir["bgs"] = "audio/bgs/";
    Dir["me"] = "audio/me/";
    Dir["se"] = "audio/se/";
    Dir["animations"] = "img/animations/";
    Dir["battlebacks1"] = "img/battlebacks1/";
    Dir["battlebacks2"] = "img/battlebacks2/";
    Dir["characters"] = "img/characters/";
    Dir["enemies"] = "img/enemies/";
    Dir["faces"] = "img/faces/";
    Dir["parallaxes"] = "img/parallaxes/";
    Dir["pictures"] = "img/pictures/";
    Dir["sv_actors"] = "img/sv_actors/";
    Dir["sv_enemies"] = "img/sv_enemies/";
    Dir["system"] = "img/system/";
    Dir["tilesets"] = "img/tilesets/";
    Dir["titles1"] = "img/titles1/";
    Dir["titles2"] = "img/titles2/";
    Dir["movies"] = "movies/";
})(Dir = exports.Dir || (exports.Dir = {}));
/**
 * その他コピーするもの
 */
exports.otherFiles = [
    "img/system/",
    "data/",
    "fonts/",
    "icon/",
    "js/",
    "Game.rpgproject",
    "index.html",
    "package.json",
];
