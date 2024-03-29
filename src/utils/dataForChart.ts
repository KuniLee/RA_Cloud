// @ts-nocheck

import { Data } from '../stores/database'

export function dataForChart(arr: Data[]) {
  return arr.reduce((old, item) => {
    const ar = old

    ar[item.parameter] =
      old[item.parameter] !== undefined
        ? [...old[item.parameter], { x: item[Object.keys(item)[1]], y: item.average }]
        : [{ x: item[Object.keys(item)[1]], y: item.average }]

    return ar
  }, {})
}
