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
    global.awesomeOscillator = mod.exports;
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
  var awesomeOscillator = {
    name: 'AO',
    calcParams: [5, 34],
    shouldCheckParamCount: true,
    plots: [{
      key: 'ao',
      type: 'bar',
      color: function color(data, technicalIndicatorOptions) {
        var preData = data.preData,
            currentData = data.currentData;
        var preAo = (preData.technicalIndicatorData || {}).ao;
        var ao = (currentData.technicalIndicatorData || {}).ao;

        if (ao > preAo) {
          return technicalIndicatorOptions.bar.upColor;
        } else {
          return technicalIndicatorOptions.bar.downColor;
        }
      },
      isStroke: function isStroke(data) {
        var preData = data.preData,
            currentData = data.currentData;
        var preAo = (preData.technicalIndicatorData || {}).ao;
        var ao = (currentData.technicalIndicatorData || {}).ao;
        return ao > preAo;
      }
    }],
    baseValue: 0,
    calcTechnicalIndicator: function calcTechnicalIndicator(kLineDataList, calcParams) {
      var maxParam = Math.max(calcParams[0], calcParams[1]);
      var result = [];
      var shortSum = 0;
      var longSum = 0;
      var short = 0;
      var long = 0;
      kLineDataList.forEach(function (kLineData, i) {
        var ao = {};
        var middle = (kLineData.low + kLineData.high) / 2;
        shortSum += middle;
        longSum += middle;

        if (i >= calcParams[0] - 1) {
          short = shortSum / calcParams[0];
          var agoKLineData = kLineDataList[i - (calcParams[0] - 1)];
          shortSum -= (agoKLineData.low + agoKLineData.high) / 2;
        }

        if (i >= calcParams[1] - 1) {
          long = longSum / calcParams[1];
          var _agoKLineData = kLineDataList[i - (calcParams[1] - 1)];
          longSum -= (_agoKLineData.low + _agoKLineData.high) / 2;
        }

        if (i >= maxParam - 1) {
          ao.ao = short - long;
        }

        result.push(ao);
      });
      return result;
    }
  };
  var _default = awesomeOscillator;
  _exports.default = _default;
});