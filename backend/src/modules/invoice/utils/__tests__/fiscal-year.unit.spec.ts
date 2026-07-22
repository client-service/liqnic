import NepaliDate from "nepali-date-converter"
import { getNepaliFiscalYear } from "../fiscal-year"

// Round-trip through the same library the function itself uses, rather than
// hand-computing AD dates, so the fixtures can't drift from what NepaliDate
// actually considers e.g. "the last day of Ashadh".
const bsDate = (bs: string) => new NepaliDate(bs).toJsDate()

describe("getNepaliFiscalYear", () => {
  it("returns the previous BS year pair for a date before Shrawan (mid fiscal year)", () => {
    // 2083/02/05 (Jestha) - matches the real invoice minted during e2e testing
    expect(getNepaliFiscalYear(bsDate("2083-02-05"))).toBe("82-83")
  })

  it("returns the previous BS year pair on the last day of Ashadh (fiscal year end)", () => {
    expect(getNepaliFiscalYear(bsDate("2083-03-31"))).toBe("82-83")
  })

  it("rolls over to the new BS year pair on the first day of Shrawan (fiscal year start)", () => {
    expect(getNepaliFiscalYear(bsDate("2083-04-01"))).toBe("83-84")
  })

  it("returns the current BS year pair for a date well within Shrawan-Chaitra", () => {
    // 2083/09/15 (Poush) - after Shrawan, before next Baisakh
    expect(getNepaliFiscalYear(bsDate("2083-09-15"))).toBe("83-84")
  })
})
