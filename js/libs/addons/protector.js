/**
 * システム要件に合致しない場合、エラー画面を出す。
 * 合致する場合、main.js の処理を実行する。
 *
 * 必須:
 * - detect-es.js
 * - low-performance-detector
 * - クラス xhr-test と src が付与された script タグ
 * - js/main.js を読み込む直前
 */
(function () {
  // エラー画面構築
  var initError = document.createElement("div");
  initError.className = "init-error";
  var message = document.createElement("div");
  message.className = "init-error message";
  initError.appendChild(message);
  document.body.appendChild(initError);
  // main.js を一旦無力化
  var _PluginManager = PluginManager;
  var _SceneManager = SceneManager;
  PluginManager = { setup: function () {} };
  SceneManager = { run: function () {} };
  // 処理
  window.lowPerformanceDetector(function (result, reasons) {
    if (result === false) {
      document.body.style.backgroundColor = "white";
      var chromeUrl = "https://www.google.com/intl/ja/chrome/";
      var gotoChrome = [
        // アツマール対応
        "if('RPGAtsumaru' in window){window.RPGAtsumaru.popups.openLink('",
        chromeUrl,
        // それ以外の場合
        "');}else{location.href='",
        chromeUrl,
        "';}",
      ].join("");
      message.innerHTML = [
        [
          '<h2 style="color: red;">お使いのブラウザは動作対象外です</h2>',
          [
            "<p>申し訳ございませんが、最新のバージョンに更新するか、",
            '別のブラウザ ( <u style="color: blue;" onclick="' +
              gotoChrome +
              '">Google Chrome</u> など ) をお試しください。',
            "また、もし以下の「エラーの原因」が「ファイルアクセス不可」のみの場合、",
            "ブラウザの設定を変更することで改善する可能性があります。</p>",
          ].join("<br>"),
          "<pre><b>[ エラーの原因 ]</b>\n",
        ],
        reasons.map(function (x) {
          if (x === "ES6-8") return "ES6-8 実装不完全";
          if (x === "Reading local file") return "ファイルアクセス不可";
          return x + " 非対応";
        }),
        ["</pre>"],
      ]
        .reduce(function (p, c) {
          return p.concat(c);
        }, [])
        .join("\n");
    } else {
      // エラー画面を削除
      initError.remove();
      // main.js を再実行
      PluginManager = _PluginManager;
      SceneManager = _SceneManager;
      var xhr = new XMLHttpRequest();
      xhr.open("GET", document.querySelector('script[src~="js/main.js"]').src);
      xhr.overrideMimeType("text/javascript");
      xhr.send();
      xhr.onload = function () {
        // プラグイン設定のため実行
        eval(xhr.response);
        // Community_Basic 対策
        SceneManager.preferableRendererType = function () {
          if (!Utils.isOptionValid("canvas")) {
            // クエリで例外的に canvas モードにできるように変更
            return "canvas";
          } else {
            // Community_Basic で指定してても強制 WEBGL モード
            return "webgl";
          }
        };
        // ゲーム開始
        window.onload();
      };
    }
  });
})();
