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
    global.bullAndBearIndex = mod.exports;
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
   * 多空指标
   * 公式: BBI = (MA(CLOSE, M) + MA(CLOSE, N) + MA(CLOSE, O) + MA(CLOSE, P)) / 4
   *
   * @type {{calcTechnicalIndicator: (function(*=, *=): []), calcParams: number[], shouldCheckParamCount: boolean, name: string, isPriceTechnicalIndicator: boolean, plots: [{type: string, key: string}]}}
   */
  var bullAndBearIndex = {
    name: 'BBI',
    series: 'price',
    precision: 2,
    calcParams: [3, 6, 12, 24],
    shouldCheckParamCount: true,
    shouldOhlc: true,
    plots: [{
      key: 'bbi',
      type: 'line'
    }],
    calcTechnicalIndicator: function calcTechnicalIndicator(kLineDataList, calcParams) {
      var maxParam = Math.max.apply(null, calcParams);
      var closeSums = [];
      var mas = [];
      var result = [];
      kLineDataList.forEach(function (kLineData, i) {
        var bbi = {};
        var close = kLineData.close;
        calcParams.forEach(function (param, index) {
          closeSums[index] = (closeSums[index] || 0) + close;

          if (i >= param - 1) {
            mas[index] = closeSums[index] / param;
            closeSums[index] -= kLineDataList[i - (param - 1)].close;
          }
        });

        if (i >= maxParam - 1) {
          var maSum = 0;
          mas.forEach(function (ma) {
            maSum += ma;
          });
          bbi.bbi = maSum / 4;
        }

        result.push(bbi);
      });
      return result;
    }
  };
  var _default = bullAndBearIndex;
  _exports.default = _default;
});