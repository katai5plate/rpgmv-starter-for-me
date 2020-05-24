"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listToAssets = exports.scriptToAssets = void 0;
const const_1 = require("./const");
/**
 * JS のソースコードから asset-names 関数を探し出し、素材を登録する
 */
exports.scriptToAssets = (code) => {
    const maches = code.match(/an\..*?\(["|'].*?["|']\)/g);
    if (!maches)
        return [];
    return maches.reduce((p, c) => {
        const [, category, filename] = c.match(/an\.(.*?)\(["|'](.*?)["|']\)/);
        return [...p, [const_1.Dir[category], filename]];
    }, []);
};
/**
 * インタプリタから素材を登録する
 */
exports.listToAssets = (list) => list.reduce((p, { code, parameters }) => {
    switch (code) {
        case 132:
        case 241:
            return [...p, [const_1.Dir.bgm, parameters[0].name]];
        case 245:
            return [...p, [const_1.Dir.bgs, parameters[0].name]];
        case 133:
        case 139:
        case 249:
            return [...p, [const_1.Dir.me, parameters[0].name]];
        case 250:
            return [...p, [const_1.Dir.se, parameters[0].name]];
        case 140:
            return [...p, [const_1.Dir.bgm, parameters[1].name]];
        case 101:
            return [...p, [const_1.Dir.faces, parameters[1]]];
        case 205:
            return [...p, ...walkListToAssets(parameters[1].list)];
        case 231:
            return [...p, [const_1.Dir.pictures, parameters[1]]];
        case 261:
            return [...p, [const_1.Dir.movies, parameters[0]]];
        case 283:
            return [
                ...p,
                [const_1.Dir.battlebacks1, parameters[0]],
                [const_1.Dir.battlebacks2, parameters[1]],
            ];
        case 284:
            return [...p, [const_1.Dir.parallaxes, parameters[0]]];
        case 322:
            return [
                ...p,
                [const_1.Dir.characters, parameters[1]],
                [const_1.Dir.faces, parameters[3]],
                [const_1.Dir.sv_actors, parameters[5]],
            ];
        case 323:
            return [...p, [const_1.Dir.characters, parameters[1]]];
        case 355:
        case 655:
            return [...p, ...exports.scriptToAssets(parameters[0])];
        case 0:
        case 102:
        case 111:
        case 401:
        case 402:
        case 404:
        case 412:
        case 505: // walkListToAssets と重複
            return p;
    }
    return [...p, [code, JSON.stringify(parameters).replace(/"/g, "'")]];
}, []);
/**
 * 歩行ルートの指定から素材を登録する
 */
const walkListToAssets = (list) => list.reduce((p, { code, parameters }) => {
    switch (code) {
        case 41:
            return [...p, [const_1.Dir.characters, parameters[0]]];
        case 44:
            return [...p, [const_1.Dir.se, parameters[0].name]];
        case 45:
        case 45:
            return [...p, ...exports.scriptToAssets(parameters[0])];
    }
    return p;
}, []);
