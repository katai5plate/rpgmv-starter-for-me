# rpgmv-starter-for-me
自分用のツクールMV新規プロジェクト

## 現状の機能
### 未使用素材を省いて WEB 用ビルド
- `yarn deploy` で実行
- JavaScript で素材を使う場合、**行を跨がずに** `an.se("Cat")` を記述すると、ビルド時にコピーしてくれる。
  - `an.{ここに入るもの}("")`: bgm, bgs, me, se, animations, battlebacks1, battlebacks2, characters, enemies, faces, parallaxes, pictures, sv_actors, sv_enemies, system, tilesets, titles1, titles2, movies
  - この関数は、引数に入れた文字列がそのまま返る。なのでスクリプトからファイル名を指定する時などに使える。

## 方針
- 特に使わなそうな初期設定を排除
- 既存プラグインでいいものはまんま入れてしまう。

## メモ
- `img/system` 以外の素材は自分で用意する。
- JS　で素材を使う場合 `an.{DIR_NAME}("{FILE_NAME}")` または `an.{DIR_NAME}('{FILE_NAME}')` を行を跨がずに書けば、未使用素材フィルタリングにひっかからなくなるようにする。

## 今作ってる
- TypeScript 環境 (ES6出力、型定義、アツマール型定義)

## 入れたい機能
- 必須
  - [x] 未使用素材を省いてWEBビルド
  - [ ] TypeScript環境 (ES6出力、型定義、アツマール型定義)
  - [ ] ES6、WEBGLモードに対応してない環境は強制遮断 (detect-browser)
  - [ ] 常にWEBGLモード
- 楽に機能を作れる
  - [ ] オートセーブ
  - [ ] 放置時間ボーナス
  - [ ] エラー表示
  - [ ] PIXI描画処理
  - [ ] マウス移動無効化切替
  - [ ] 足音
  - [ ] モーダルフォーム入力
  - [ ] タイトルスキップ切替
  - [ ] ユーザーNG
  - [ ] マウス操作
  - [ ] 直列プリロード
- 自動化
  - [ ] pngの減色
- 機能追加
  - [ ] シンセで8ビットSE
  - [ ] アツマールモック
  - [ ] クロマキー素材使用
  - [ ] プラグインの処理を別ファイルに分けて書けるrequireみたいな関数
  - [ ] 初期位置確認テスト
  - [ ] バイブ機能 (safariは無理らしい)
- プラグイン
  - [ ] 拡大縮小
  - [ ] ogg, mp3再生
  - [ ] 並列プリロード
  - [ ] 2000素材変換
  - [ ] パーティクルエフェクト
- 素材
  - [ ] 2000のキャラ、マップ
  - [ ] abyssのキャラ、マップ
  - [ ] 再配布可能なフォント
  - [ ] VHS風ノイズエフェクト
- ドキュメント
  - [ ] 効果音の2000互換表
- 願わくば
  - [ ] 2000の戦闘アニメ再現
