(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.priceAndVolumeTrend = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /**
   * MIT License
   * Copyright (c) 2020 lihu
  
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
  
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
  
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */

  /**
   * 价量趋势指标
   * 公式:
   * X = (CLOSE - REF(CLOSE, 1)) / REF(CLOSE, 1) * VOLUME
   * PVT = SUM(X)
   *
   * @type {{calcTechnicalIndicator: PriceAndVolumeTrend.calcTechnicalIndicator, name: string, plots: [{type: string, key: string}]}}
   */
  var priceAndVolumeTrend = {
    name: 'PVT',
    plots: [{
      key: 'pvt',
      type: 'line'
    }],
    calcTechnicalIndicator: function calcTechnicalIndicator(kLineDataList) {
      var result = [];
      var sum = 0;
      kLineDataList.forEach(function (kLineData, i) {
        var pvt = {};

        if (i > 0) {
          var close = kLineData.close;
          var volume = kLineData.volume;
          var preClose = kLineDataList[i - 1].close;
          var x = 0;

          if (preClose !== 0) {
            x = (close - preClose) / preClose * volume;
          }

          sum += x;
          pvt.pvt = sum;
        }

        result.push(pvt);
      });
      return result;
    }
  };
  var _default = priceAndVolumeTrend;
  _exports.default = _default;
});