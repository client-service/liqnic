import NepaliDate from "nepali-date-converter"

/**
 * Formats an AD date as a Bikram Sambat "Miti" date, e.g. "2083/02/05".
 */
export const formatBsDate = (date: Date): string => {
  return new NepaliDate(date).format("YYYY/MM/DD")
}

/**
 * Nepal government fiscal year runs Shrawan 1 (BS month 4) through the end of
 * Ashadh (BS month 3) the following year. Given an AD date, returns the BS
 * fiscal year label used on tax invoices, e.g. "82-83".
 *
 * Kept in sync with backend/src/modules/invoice/utils/fiscal-year.ts - the
 * backend mints the invoice_number using this same rule, so the dashboard
 * only ever displays a fiscal year that matches what's embedded in the
 * invoice number it received.
 */
export const getNepaliFiscalYear = (date: Date): string => {
  const bsDate = new NepaliDate(date)
  const bsYear = bsDate.getYear()
  // getMonth() is 0-indexed (0 = Baisakh); Shrawan is BS month 4 -> index 3.
  const bsMonthIndex = bsDate.getMonth()

  const startYear = bsMonthIndex >= 3 ? bsYear : bsYear - 1
  const endYear = startYear + 1

  const pad2 = (year: number) => String(year % 100).padStart(2, "0")

  return `${pad2(startYear)}-${pad2(endYear)}`
}
