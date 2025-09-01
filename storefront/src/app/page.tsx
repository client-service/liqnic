// app/page.tsx
import { redirect } from "next/navigation"

export default function HomePage() {
  const defaultRegion = process.env.NEXT_PUBLIC_DEFAULT_REGION || "us"
  redirect(`/${defaultRegion}`)
}
