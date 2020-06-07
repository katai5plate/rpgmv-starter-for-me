window._u = {
  callbackWhen: function (when, fn) {
    var i = setInterval(function () {
      if (!when) return;
      fn();
      clearInterval(i);
    }, 0);
  },
  concatArray: function (a) {
    return a.reduce(function (p, c) {
      return p.concat(c);
    }, []);
  },
};
