(function () {
  "use strict";
  var __assign =
    (this && this.__assign) ||
    function () {
      __assign =
        Object.assign ||
        function (t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
              if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
          return t;
        };
      return __assign.apply(this, arguments);
    };
  window.an = [
    "bgm",
    "bgs",
    "me",
    "se",
    "animations",
    "battlebacks1",
    "battlebacks2",
    "characters",
    "enemies",
    "faces",
    "parallaxes",
    "pictures",
    "sv_actors",
    "sv_enemies",
    "system",
    "tilesets",
    "titles1",
    "titles2",
    "movies",
  ].reduce(function (p, c) {
    var _a;
    return __assign(
      __assign({}, p),
      ((_a = {}),
      (_a[c] = function (x) {
        return x;
      }),
      _a)
    );
  }, {});
})();
