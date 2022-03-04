export function dataForChart(arr) {
  return arr.reduce((old, item) => {
    const ar = old
    ar[item.parameter] =
      old[item.parameter] !== undefined
        ? [
            ...old[item.parameter],
            { x: (item.timestamp - 18000) * 1000, y: item.value },
          ]
        : [{ x: (item.timestamp - 18000) * 1000, y: item.value }]
    return ar
  }, {})
}
