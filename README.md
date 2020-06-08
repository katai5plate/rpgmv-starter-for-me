# rpgmv-starter-for-me

自分用のツクール MV 新規プロジェクト

## 現状の機能

### 未使用素材を省いて WEB 用ビルド

- `yarn deploy` で実行
- JavaScript で素材を使う場合、**行を跨がずに** `an.se("Cat")` のように記述すると、ビルド時にコピーしてくれる。
  - `an.{ここに入るもの}("")`: bgm, bgs, me, se, animations, battlebacks1, battlebacks2, characters, enemies, faces, parallaxes, pictures, sv_actors, sv_enemies, system, tilesets, titles1, titles2, movies
  - この関数は、引数に入れた文字列がそのまま返る。なのでスクリプトからファイル名を指定する時などに使える。
  - ビルド時にテキストとして読み込まれるため、コメントに書いてもいい。

### 減色済 `img/system`

- 625 KB -> 90.7 KB に削減。
- `IconSet.png` と `MadeWithMv.png` は色数を抑えるためデザイン変更。

### 動作対象外の環境はプレイを遮断

- システム要件に合致しない場合 main.js が実行される前にエラー画面が出る。
- たとえ IE5 で開いても警告が出るようにしてある。
- ゲーム開始条件:
  - ES8 完全対応
  - ES9 一部対応
    - オブジェクトの spread
    - for-await-of
    - Promise.prototype.finally
  - base64 対応
  - WEBGL 完全対応 (experimental-webgl 禁止)
  - ローカルファイルアクセス
  - Web Audio API 対応
  - Fetch API 対応

## ルール

- `js/libs/addons` は IE 11 でも動くように ES5 で書く。
- 自作プラグインは TypeScript で書いて ES6 に出力する。
  - システム要件に ES8-9 が入ってるのは、試験的にその構文でプラグイン書いて出しちゃったときの保険。

## 方針

- 特に使わなそうな初期設定を排除
- 既存プラグインでいいものはまんま入れてしまう。

## 今作ってる

- プリロード機能

### ES6 判断方法

1. ES6 の構文が全て動くかをテストする
2. mdn にある ES6 で追加されたプロパティをチェックする

## 入れたい機能

- 組み込み
  - [x] 未使用素材を省いて WEB ビルド
  - [ ] TypeScript 環境 (ES6 出力、型定義、アツマール型定義)
  - [x] ES6、WEBGL モードに対応してない環境は強制遮断 (detect-browser)
  - [x] 常に WEBGL モード
  - [ ] プリロード
- 楽に機能を作れる
  - [ ] オートセーブ
  - [ ] 放置時間取得
  - [ ] PIXI 描画処理
  - [ ] 足音 (パン振り, 誤差ランダム)
  - [ ] モーダルフォーム入力
  - 開発系
    - [ ] エラー表示
    - [ ] ユーザー NG
  - 操作系
    - [ ] タイトルスキップ切替
    - [ ] マウス移動無効化切替
    - [ ] マウス操作
    - [ ] ジョイスティック操作
    - [ ] スワイプ検知
- 自動化
  - [ ] png の減色
- 機能追加
  - [ ] シンセで 8 ビット SE
  - [ ] アツマールモック
  - [ ] クロマキー素材使用
  - [ ] プラグインの処理を別ファイルに分けて書ける require みたいな関数
  - [ ] 初期位置確認テスト
  - [ ] バイブ機能 (safari は無理らしい)
  - [ ] 文章の制御文字からコモンイベント呼び出し
- プラグイン
  - [ ] 拡大縮小
  - [ ] ogg, mp3 再生
  - [ ] 並列プリロード
  - [ ] 2000 素材変換
  - [ ] パーティクルエフェクト
- 素材
  - [ ] 2000 のキャラ、マップ
  - [ ] abyss のキャラ、マップ
  - [ ] 再配布可能なフォント
  - [ ] VHS 風ノイズエフェクト
- ドキュメント
  - [ ] 効果音の 2000 互換表
- 願わくば
  - [ ] 2000 の戦闘アニメ再現

# メモ

- アツマールデモ: https://game.nicovideo.jp/atsumaru/games/gm14943?key=34565400ceb4&link_in=users
  - `?param9=debug-protect&` で動作対象外の時の挙動を再現
- Windows/Mac/Linux ビルドは yarn deploy 後のプロジェクトファイルから公式ビルドする
- mp3 素材を ogg にする方法:
  1. ffmpeg をインストール
  2. mp3 素材の入ったフォルダに `./scripts/tools/mp3ToOgg.bat` をコピーして実行