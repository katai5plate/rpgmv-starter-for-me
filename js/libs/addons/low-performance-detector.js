/**
 * システム要件に合致するかどうかを調べる関数
 *
 * 必須:
 * - utils.js
 * - detect-es.js
 * - クラス xhr-test と src が付与された script タグ
 *
 * システム要件:
 * - ES8 完全対応
 * - ES9 一部対応
 *   - オブジェクトの spread
 *   - for-await-of
 *   - Promise.prototype.finally
 * - base64 対応
 * - WEBGL 完全対応 (experimental-webgl 禁止)
 * - ローカルファイルアクセス
 * - Web Audio API 対応
 * - Fetch API 対応
 */

window.lowPerformanceDetector = function (onComplete) {
  var reasons = [];
  var onError = function (res) {
    reasons.push(res.reason);
  };
  _u.tryit(
    "ES6-8",
    function () {
      return new DetectES(8).start().result;
    },
    onError
  );
  _u.tryit(
    "ES9 Rest/Spread Properties",
    DetectES.codes.syntax.es9.filter(function (x) {
      return x.desc.indexOf("{...}") > -1;
    })[0].code,
    onError
  );
  _u.tryit(
    "ES9 for-await-of",
    DetectES.codes.syntax.es9.filter(function (x) {
      return x.desc.indexOf("for-await-of") > -1;
    })[0].code,
    onError
  );
  _u.tryit(
    "ES9 Promise.prototype features",
    function () {
      return DetectES.testProps(
        DetectES.codes.props.es9.filter(function (x) {
          return x.parent.indexOf("Promise.prototype") > -1;
        })[0]
      ).result;
    },
    onError
  );
  _u.tryit(
    "base64 conversions",
    function () {
      return "atob" in window && "btoa" in window;
    },
    onError
  );
  _u.tryit(
    "WEBGL (Full support)",
    function () {
      return document.createElement("canvas").getContext("webgl");
    },
    onError
  );
  _u.tryit(
    "WEB Audio API",
    function () {
      return "AudioContext" in window || "webkitAudioContext" in window;
    },
    onError
  );
  _u.tryit(
    "Fetch API",
    function () {
      return "fetch" in window;
    },
    onError
  );
  var xhrResult = null;
  try {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", document.querySelector("script.xhr-test").src);
    xhr.overrideMimeType("text/javascript");
    xhr.send();
    xhr.onload = function () {
      xhrResult = true;
    };
    xhr.onerror = function () {
      xhrResult = false;
    };
  } catch (e) {
    xhrResult = false;
  }
  _u.callbackWhen(
    "lpd-xhr",
    function () {
      return xhrResult !== null;
    },
    function () {
      if (xhrResult === false) reasons.push("Reading local file");
      onComplete(reasons.length === 0, reasons);
    }
  );
};
