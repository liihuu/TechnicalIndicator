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
 * sma
 * @type {{calcTechnicalIndicator: (function(*, *): []), calcParams: number[], shouldCheckParamCount: boolean, name: string, isPriceTechnicalIndicator: boolean, plots: [{type: string, key: string}]}}
 */
const simpleMovingAverage = {
  name: 'SMA',
  calcParams: [12, 2],
  series: 'price',
  precision: 2,
  plots: [
    { key: 'sma', type: 'line' }
  ],
  shouldCheckParamCount: true,
  shouldOhlc: true,
  calcTechnicalIndicator: (kLineDataList, calcParams) => {
    let oldSma = 0
    const result = []
    kLineDataList.forEach((kLineData, i) => {
      const sma = {}
      const close = kLineData.close
      if (i === 0) {
        sma.sma = close
      } else {
        sma.sma = (close * calcParams[1] + oldSma * (calcParams[0] - calcParams[1] + 1)) / (calcParams[0] + 1)
      }
      oldSma = sma.sma
      result.push(sma)
    })
    return result
  }
}

export default simpleMovingAverage
