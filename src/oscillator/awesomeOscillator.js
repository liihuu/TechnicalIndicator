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

const awesomeOscillator = {
  name: 'AO',
  calcParams: [5, 34],
  shouldCheckParamCount: true,
  plots: [{
    key: 'ao',
    type: 'bar',
    color: (data, technicalIndicatorOptions) => {
      const { preData, currentData } = data
      const preAo = (preData.technicalIndicatorData || {}).ao
      const ao = (currentData.technicalIndicatorData || {}).ao
      if (ao > preAo) {
        return technicalIndicatorOptions.bar.upColor
      } else {
        return technicalIndicatorOptions.bar.downColor
      }
    },
    isStroke: (data) => {
      const { preData, currentData } = data
      const preAo = (preData.technicalIndicatorData || {}).ao
      const ao = (currentData.technicalIndicatorData || {}).ao
      return ao > preAo
    }
  }],
  baseValue: 0,
  calcTechnicalIndicator: (kLineDataList, calcParams) => {
    const maxParam = Math.max(calcParams[0], calcParams[1])
    const result = []
    let shortSum = 0
    let longSum = 0
    let short = 0
    let long = 0
    kLineDataList.forEach((kLineData, i) => {
      const ao = {}
      const middle = (kLineData.low + kLineData.high) / 2
      shortSum += middle
      longSum += middle
      if (i >= calcParams[0] - 1) {
        short = shortSum / calcParams[0]
        const agoKLineData = kLineDataList[i - (calcParams[0] - 1)]
        shortSum -= ((agoKLineData.low + agoKLineData.high) / 2)
      }
      if (i >= calcParams[1] - 1) {
        long = longSum / calcParams[1]
        const agoKLineData = kLineDataList[i - (calcParams[1] - 1)]
        longSum -= ((agoKLineData.low + agoKLineData.high) / 2)
      }
      if (i >= maxParam - 1) {
        ao.ao = short - long
      }
      result.push(ao)
    })
    return result
  }
}

export default awesomeOscillator
