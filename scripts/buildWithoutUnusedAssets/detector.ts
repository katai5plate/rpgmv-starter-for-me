import fs from "fs-extra";

import jsonActors from "../../data/Actors.json";
import jsonAnimations from "../../data/Animations.json";
import jsonCommonEvents from "../../data/CommonEvents.json";
import jsonEnemies from "../../data/Enemies.json";
import jsonSystem from "../../data/System.json";
import jsonTilesets from "../../data/Tilesets.json";
import jsonTroops from "../../data/Troops.json";

import { AssetData, listToAssets, scriptToAssets } from "./parser";
import { jsonMaps, connectedPlugins } from "./loader";
import { Dir, exts } from "./const";

const detected: AssetData[] = [
  // アクター
  ...jsonActors
    .filter(Boolean)
    .reduce<AssetData[]>(
      (p, c) => [
        ...p,
        [Dir.sv_actors, c!.battlerName],
        [Dir.characters, c!.characterName],
        [Dir.faces, c!.faceName],
      ],
      []
    ),
  // 戦闘アニメ（アニメーション）
  ...jsonAnimations
    .filter(Boolean)
    .reduce<AssetData[]>(
      (p, c) => [
        ...p,
        [Dir.animations, c!.animation1Name],
        [Dir.animations, c!.animation2Name],
        ...(c!.timings as any)
          .filter((x: any) => x && x.se)
          .map((x: { se: { name: string } }) => [Dir.se, x.se.name]),
      ],
      []
    ),
  // 敵キャラ
  ...jsonEnemies
    .filter(Boolean)
    .reduce<AssetData[]>(
      (p, c) => [
        ...p,
        [Dir.enemies, c!.battlerName],
        [Dir.sv_enemies, c!.battlerName],
      ],
      []
    ),
  // システム
  [Dir.battlebacks1, jsonSystem.battleback1Name],
  [Dir.battlebacks2, jsonSystem.battleback2Name],
  [Dir.enemies, jsonSystem.battlerName],
  [Dir.sv_enemies, jsonSystem.battlerName],
  [Dir.titles1, jsonSystem.title1Name],
  [Dir.titles2, jsonSystem.title2Name],
  [Dir.bgm, jsonSystem.airship.bgm.name],
  [Dir.characters, jsonSystem.airship.characterName],
  [Dir.bgm, jsonSystem.boat.bgm.name],
  [Dir.characters, jsonSystem.boat.characterName],
  [Dir.bgm, jsonSystem.ship.bgm.name],
  [Dir.characters, jsonSystem.ship.characterName],
  [Dir.bgm, jsonSystem.battleBgm.name],
  [Dir.bgm, jsonSystem.titleBgm.name],
  [Dir.me, jsonSystem.defeatMe.name],
  [Dir.me, jsonSystem.gameoverMe.name],
  [Dir.me, jsonSystem.victoryMe.name],
  ...jsonSystem.sounds.map((x) => [Dir.se, x.name]),
  // タイルセット
  ...jsonTilesets
    .filter(Boolean)
    .reduce(
      (p, c) => [...p, ...c.tilesetNames.map((x) => [Dir.tilesets, x])],
      []
    ),
  // コモンイベント
  ...jsonCommonEvents
    .filter(Boolean)
    .reduce((p, { list }) => [...p, ...listToAssets(list)], []),
  // Map000.json 系
  ...jsonMaps.reduce((p, map) => {
    return [
      ...p,
      [Dir.battlebacks1, map.battleback1Name],
      [Dir.battlebacks2, map.battleback2Name],
      [Dir.bgm, map.bgm.name],
      [Dir.bgs, map.bgs.name],
      [Dir.parallaxes, map.parallaxName],
      ...map.events
        .filter(Boolean)
        .reduce(
          (pp, { pages }) => [
            ...pp,
            ...pages
              .filter(Boolean)
              .reduce(
                (ppp, page) => [
                  ...ppp,
                  [Dir.characters, page.image.characterName],
                  ...listToAssets(page.list),
                  ...listToAssets(page.moveRoute.list),
                ],
                []
              ),
          ],
          []
        ),
    ];
  }, []),
  // 敵グループ
  ...jsonTroops
    .filter(Boolean)
    .reduce<AssetData[]>(
      (p, { pages }) => [
        ...p,
        ...pages
          .filter(Boolean)
          .reduce((p, { list }) => [...p, ...listToAssets(list)], []),
      ],
      []
    ),
  // プラグインのソースコードから asset-names を検索し素材を登録
  ...connectedPlugins.reduce(
    (p, c) => [
      ...p,
      ...scriptToAssets(
        fs.readFileSync(`./js/plugins/${c}.js`, { encoding: "utf8" })
      ),
    ],
    []
  ),
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
  .reduce(
    (p, c) => [
      ...p,
      ...exts.map((ext) => {
        const address = `${c}.${ext}`;
        return [fs.pathExistsSync(address), address];
      }),
    ],
    []
  )
  // 存在したものに絞り込む
  .filter(([x]) => x)
  // 拡張子付きファイルパスにする
  .map(([, x]) => x);

export default copyableFiles;
