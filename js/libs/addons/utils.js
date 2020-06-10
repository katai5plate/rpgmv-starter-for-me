window._u = {
  _intervals: {},
  callbackWhen: function (id, whenFn, fn) {
    var i = window._u._intervals;
    i[id] = setInterval(function () {
      if (!whenFn()) return;
      fn();
      clearInterval(i[id]);
    }, 0);
  },
  concatArray: function (a) {
    return a.reduce(function (p, c) {
      return p.concat(c);
    }, []);
  },
  concatObject: function (a) {
    return a.reduce(function (p, c) {
      return Object.assign(p, c);
    }, []);
  },
  tryit: function (reason, code, onError) {
    var result = { reason: reason, code: code, error: null };
    try {
      if (typeof code === "string") {
        new Function(code);
        return true;
      }
      var codeResult = code();
      if (!!codeResult) {
        return true;
      } else {
        result.error = codeResult;
      }
    } catch (e) {
      result.error = e;
    }
    onError(result);
    return false;
  },
};
