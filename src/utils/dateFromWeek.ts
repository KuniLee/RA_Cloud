const getSundayFromWeekNum = (date: string) => {
  try {
    const myArray = date.split('-W')
    const simple = new Date(Number(myArray[0]), 0, 1 + (Number(myArray[1]) - 1) * 7)
    const dow = simple.getDay()
    const ISOweekStart = simple

    if (dow <= 4) ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1)
    else ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay())

    return ISOweekStart.toLocaleDateString().split('.').reverse().join().replace(/,/g, '-')
  } catch (error) {
    return null
  }
}

export function dateFromWeek(value: string) {
  return getSundayFromWeekNum(value)
}
