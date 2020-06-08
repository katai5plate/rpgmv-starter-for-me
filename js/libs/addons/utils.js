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
};
