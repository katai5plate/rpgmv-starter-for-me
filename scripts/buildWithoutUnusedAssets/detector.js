"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const Actors_json_1 = __importDefault(require("../../data/Actors.json"));
const Animations_json_1 = __importDefault(require("../../data/Animations.json"));
const CommonEvents_json_1 = __importDefault(require("../../data/CommonEvents.json"));
const Enemies_json_1 = __importDefault(require("../../data/Enemies.json"));
const System_json_1 = __importDefault(require("../../data/System.json"));
const Tilesets_json_1 = __importDefault(require("../../data/Tilesets.json"));
const Troops_json_1 = __importDefault(require("../../data/Troops.json"));
const parser_1 = require("./parser");
const loader_1 = require("./loader");
const const_1 = require("./const");
const detected = [
    // アクター
    ...Actors_json_1.default
        .filter(Boolean)
        .reduce((p, c) => [
        ...p,
        [const_1.Dir.sv_actors, c.battlerName],
        [const_1.Dir.characters, c.characterName],
        [const_1.Dir.faces, c.faceName],
    ], []),
    // 戦闘アニメ（アニメーション）
    ...Animations_json_1.default
        .filter(Boolean)
        .reduce((p, c) => [
        ...p,
        [const_1.Dir.animations, c.animation1Name],
        [const_1.Dir.animations, c.animation2Name],
        ...c.timings
            .filter((x) => x && x.se)
            .map((x) => [const_1.Dir.se, x.se.name]),
    ], []),
    // 敵キャラ
    ...Enemies_json_1.default
        .filter(Boolean)
        .reduce((p, c) => [
        ...p,
        [const_1.Dir.enemies, c.battlerName],
        [const_1.Dir.sv_enemies, c.battlerName],
    ], []),
    // システム
    [const_1.Dir.battlebacks1, System_json_1.default.battleback1Name],
    [const_1.Dir.battlebacks2, System_json_1.default.battleback2Name],
    [const_1.Dir.enemies, System_json_1.default.battlerName],
    [const_1.Dir.sv_enemies, System_json_1.default.battlerName],
    [const_1.Dir.titles1, System_json_1.default.title1Name],
    [const_1.Dir.titles2, System_json_1.default.title2Name],
    [const_1.Dir.bgm, System_json_1.default.airship.bgm.name],
    [const_1.Dir.characters, System_json_1.default.airship.characterName],
    [const_1.Dir.bgm, System_json_1.default.boat.bgm.name],
    [const_1.Dir.characters, System_json_1.default.boat.characterName],
    [const_1.Dir.bgm, System_json_1.default.ship.bgm.name],
    [const_1.Dir.characters, System_json_1.default.ship.characterName],
    [const_1.Dir.bgm, System_json_1.default.battleBgm.name],
    [const_1.Dir.bgm, System_json_1.default.titleBgm.name],
    [const_1.Dir.me, System_json_1.default.defeatMe.name],
    [const_1.Dir.me, System_json_1.default.gameoverMe.name],
    [const_1.Dir.me, System_json_1.default.victoryMe.name],
    ...System_json_1.default.sounds.map((x) => [const_1.Dir.se, x.name]),
    // タイルセット
    ...Tilesets_json_1.default
        .filter(Boolean)
        .reduce((p, c) => [...p, ...c.tilesetNames.map((x) => [const_1.Dir.tilesets, x])], []),
    // コモンイベント
    ...CommonEvents_json_1.default
        .filter(Boolean)
        .reduce((p, { list }) => [...p, ...parser_1.listToAssets(list)], []),
    // Map000.json 系
    ...loader_1.jsonMaps.reduce((p, map) => {
        return [
            ...p,
            [const_1.Dir.battlebacks1, map.battleback1Name],
            [const_1.Dir.battlebacks2, map.battleback2Name],
            [const_1.Dir.bgm, map.bgm.name],
            [const_1.Dir.bgs, map.bgs.name],
            [const_1.Dir.parallaxes, map.parallaxName],
            ...map.events
                .filter(Boolean)
                .reduce((pp, { pages }) => [
                ...pp,
                ...pages
                    .filter(Boolean)
                    .reduce((ppp, page) => [
                    ...ppp,
                    [const_1.Dir.characters, page.image.characterName],
                    ...parser_1.listToAssets(page.list),
                    ...parser_1.listToAssets(page.moveRoute.list),
                ], []),
            ], []),
        ];
    }, []),
    // 敵グループ
    ...Troops_json_1.default
        .filter(Boolean)
        .reduce((p, { pages }) => [
        ...p,
        ...pages
            .filter(Boolean)
            .reduce((p, { list }) => [...p, ...parser_1.listToAssets(list)], []),
    ], []),
    // プラグインのソースコードから asset-names を検索し素材を登録
    ...loader_1.connectedPlugins.reduce((p, c) => [
        ...p,
        ...parser_1.scriptToAssets(fs_extra_1.default.readFileSync(`./js/plugins/${c}.js`, { encoding: "utf8" })),
    ], []),
]
    // ファイル名が空のものを排除
    .filter(([, x]) => x !== "")
    // パスを結合
    .map((x) => x.join(""))
    // 重複を削除
    .filter((x, i, s) => s.indexOf(x) === i)
    .sort();
/**
 * コピー可能なファイル
 */
const copyableFiles = detected
    // 同一ファイル名で拡張子が異なるものが存在するかどうかを調べる
    .reduce((p, c) => [
    ...p,
    ...const_1.exts.map((ext) => {
        const address = `${c}.${ext}`;
        return [fs_extra_1.default.pathExistsSync(address), address];
    }),
], [])
    // 存在したものに絞り込む
    .filter(([x]) => x)
    // 拡張子付きファイルパスにする
    .map(([, x]) => x);
exports.default = copyableFiles;
