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
window.whenGameIsReady = function (onReady) {
  // エラー画面構築
  var initError = document.createElement("div");
  initError.className = "init-error";
  var message = document.createElement("div");
  message.className = "init-error message";
  initError.appendChild(message);
  document.body.appendChild(initError);
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
  var title = '<h2 style="color: red;">お使いのブラウザは動作対象外です</h2>';
  var getDescription = function (isIE) {
    return (
      "<p>" +
      [
        "申し訳ございませんが、" +
          (!isIE ? "最新のバージョンに更新するか、" : ""),
        '別のブラウザ ( <u style="color: blue;" onclick="' +
          gotoChrome +
          '">Google Chrome</u> など ) をお試しください。',
        !isIE
          ? "また、もし以下の「エラーの原因」が「ファイルアクセス不可」のみの場合、"
          : "",
        !isIE ? "ブラウザの設定を変更することで改善する可能性があります。" : "",
      ].join("<br>") +
      "</p>"
    );
  };
  // IE の処理
  if (
    navigator.userAgent.indexOf("MSIE") > -1 ||
    navigator.userAgent.indexOf("Trident") > -1 ||
    "defineProperties" in Object === false // IE 5 対策
  ) {
    document.body.style.backgroundColor = "white";
    message.innerHTML = title + getDescription(true);
    return;
  }
  // IE 以外の処理
  window.lowPerformanceDetector(function (result, reasons) {
    var isError = result === false;
    if ("RPGAtsumaru" in window) {
      if (window.RPGAtsumaru.query["param9"] === "debug-protect") {
        isError = true;
      }
    }
    if (isError) {
      document.body.style.backgroundColor = "white";
      message.innerHTML = [
        [title, getDescription(), "<pre><b>[ エラーの原因 ]</b>\n"],
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
      onReady();
    }
  });
};
