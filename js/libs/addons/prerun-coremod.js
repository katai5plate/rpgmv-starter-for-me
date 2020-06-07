/**
 * コアスクリプトが実行される直前に適用する改変
 */

_u.callbackWhen(
  "Graphics" in window && "ProgressWatcher" in window,
  function () {
    Graphics._setupProgress = function () {
      this._progressElement = document.createElement("div");
      this._progressElement.id = "loading-progress";
      this._progressElement.width = 600;
      this._progressElement.height = 300;
      this._progressElement.style.visibility = "hidden";

      this._barElement = document.createElement("div");
      this._barElement.id = "loading-bar";
      this._barElement.style.width = "100%";
      this._barElement.style.height = "10%";
      this._barElement.style.background =
        "linear-gradient(to top, gray, lightgray)";
      this._barElement.style.border = ""; //
      this._barElement.style.borderRadius = ""; //
      this._barElement.style.marginTop = "40%";

      this._filledBarElement = document.createElement("div");
      this._filledBarElement.id = "loading-filled-bar";
      this._filledBarElement.style.width = "0%";
      this._filledBarElement.style.height = "100%";
      this._filledBarElement.style.background = "cyan"; //
      this._filledBarElement.style.border = ""; //
      this._filledBarElement.style.borderRadius = ""; //

      //
      this._barLogElement = document.createElement("div");
      this._barLogElement.id = "loading-log";
      this._barLogElement.style.background = "black";
      this._barLogElement.style.color = "white";
      this._barLogElement.innerText = "Loading... --%";
      this._barLogElement.setLogText = function (per) {
        this.innerText = `Loading... ${per}%`;
      };

      this._progressElement.appendChild(this._barElement);
      this._progressElement.appendChild(this._barLogElement); //
      this._barElement.appendChild(this._filledBarElement);
      this._updateProgress();

      document.body.appendChild(this._progressElement);
    };

    var Graphics_updateProgressCount = Graphics._updateProgressCount;
    Graphics._updateProgressCount = function (countLoaded, countLoading) {
      Graphics_updateProgressCount.apply(this, arguments);
      console.log({ t: this });
      var progressValue =
        countLoading !== 0 ? (countLoaded / countLoading) * 100 : 100;
      this._barLogElement.setLogText(progressValue);
    };

    Graphics.startLoading = function () {
      this._loadingCount = 0;

      ProgressWatcher.truncateProgress();
      ProgressWatcher.setProgressListener(this._updateProgressCount.bind(this));
      this._progressTimeout = setTimeout(function () {
        Graphics._showProgress();
      }, 1500);
    };

    ProgressWatcher._bitmapListener = function (bitmap) {
      this._countLoading++;
      bitmap.addLoadListener(
        function () {
          this._countLoaded++;
          this._progressListener(this._countLoaded, this._countLoading);
        }.bind(this)
      );
    };

    ProgressWatcher._audioListener = function (audio) {
      this._countLoading++;
      audio.addLoadListener(
        function () {
          this._countLoaded++;
          this._progressListener(this._countLoaded, this._countLoading);
        }.bind(this)
      );
    };
  }
);
