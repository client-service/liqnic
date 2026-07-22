import { describe, expect, test } from "vitest"
import { amountInWords } from "../amount-in-words"

describe("amountInWords", () => {
  test("zero", () => {
    expect(amountInWords(0)).toBe("Zero Rupees Only.")
  })

  test("whole rupees, no paisa", () => {
    // Matches the sample invoice PDF the format was sourced from.
    expect(amountInWords(13560)).toBe(
      "Thirteen Thousand Five Hundred Sixty Rupees Only."
    )
  })

  test("rupees with paisa", () => {
    // Matches the amount printed during e2e verification (490 + 13% VAT).
    expect(amountInWords(553.7)).toBe(
      "Five Hundred Fifty Three Rupees and Seventy Paisa Only."
    )
  })

  test("paisa only, zero rupees", () => {
    expect(amountInWords(0.5)).toBe("Zero Rupees and Fifty Paisa Only.")
  })

  test("lakh", () => {
    expect(amountInWords(150000)).toBe("One Lakh Fifty Thousand Rupees Only.")
  })

  test("crore", () => {
    expect(amountInWords(20500000)).toBe(
      "Two Crore Five Lakh Rupees Only."
    )
  })

  test("rounds sub-paisa amounts", () => {
    expect(amountInWords(10.004)).toBe("Ten Rupees Only.")
  })
})
