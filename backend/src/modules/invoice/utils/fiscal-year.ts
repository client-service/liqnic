import NepaliDate from "nepali-date-converter"

/**
 * Nepal government fiscal year runs Shrawan 1 (BS month 4) through the end of
 * Ashadh (BS month 3) the following year. Given an AD date, returns the BS
 * fiscal year label used on tax invoices, e.g. "82-83".
 */
export function getNepaliFiscalYear(date: Date): string {
  const bsDate = new NepaliDate(date)
  const bsYear = bsDate.getYear()
  // getMonth() is 0-indexed (0 = Baisakh); Shrawan is BS month 4 -> index 3.
  const bsMonthIndex = bsDate.getMonth()

  const startYear = bsMonthIndex >= 3 ? bsYear : bsYear - 1
  const endYear = startYear + 1

  const pad2 = (year: number) => String(year % 100).padStart(2, "0")

  return `${pad2(startYear)}-${pad2(endYear)}`
}
