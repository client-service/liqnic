const ONES = [
  "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
  "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
  "Seventeen", "Eighteen", "Nineteen",
]
const TENS = [
  "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety",
]

const twoDigitsToWords = (n: number): string => {
  if (n < 20) return ONES[n]
  const tens = TENS[Math.floor(n / 10)]
  const ones = n % 10
  return ones ? `${tens} ${ONES[ones]}` : tens
}

const threeDigitsToWords = (n: number): string => {
  const hundreds = Math.floor(n / 100)
  const rest = n % 100
  const parts: string[] = []
  if (hundreds) parts.push(`${ONES[hundreds]} Hundred`)
  if (rest) parts.push(twoDigitsToWords(rest))
  return parts.join(" ")
}

/**
 * Converts a non-negative integer to words using the Indian numbering system
 * (Thousand / Lakh / Crore) - the convention used in Nepal.
 */
const integerToWords = (value: number): string => {
  if (value === 0) return "Zero"

  let n = value
  const crore = Math.floor(n / 1_00_00_000)
  n %= 1_00_00_000
  const lakh = Math.floor(n / 1_00_000)
  n %= 1_00_000
  const thousand = Math.floor(n / 1_000)
  n %= 1_000
  const hundreds = n

  const parts: string[] = []
  if (crore) parts.push(`${threeDigitsToWords(crore)} Crore`)
  if (lakh) parts.push(`${twoDigitsToWords(lakh)} Lakh`)
  if (thousand) parts.push(`${twoDigitsToWords(thousand)} Thousand`)
  if (hundreds) parts.push(threeDigitsToWords(hundreds))

  return parts.join(" ")
}

/**
 * Formats a Rupee amount in words for the "Amount in Words" line on a tax
 * invoice, e.g. 13560 -> "Thirteen Thousand Five Hundred Sixty Rupees Only."
 */
export const amountInWords = (amount: number): string => {
  const rounded = Math.round(Math.abs(amount) * 100) / 100
  const rupees = Math.floor(rounded)
  const paisa = Math.round((rounded - rupees) * 100)

  const rupeeWords = integerToWords(rupees)
  const paisaWords = paisa > 0 ? ` and ${integerToWords(paisa)} Paisa` : ""

  return `${rupeeWords} Rupees${paisaWords} Only.`
}
