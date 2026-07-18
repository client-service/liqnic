import { NextRequest, NextResponse } from "next/server"

const RESEND_API_KEY = "re_KreEy98L_3cMtvgohDToZV1XAtajqaWk6" // your new key
const FROM_EMAIL = "noreply@liqnic.com"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { firstName, lastName, email, contactNumber, message } = body

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Liqnic Contact Form <${FROM_EMAIL}>`,
        to: ["liqnichost@gmail.com", "liqnicinfo@gmail.com"],
        reply_to: email,
        subject: `New Contact Form Submission from ${firstName} ${lastName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9fafb; border-radius: 8px;">
            <h2 style="color: #B3935A; margin-bottom: 4px;">New Contact Form Submission</h2>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin-bottom: 24px;" />

            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #606060; font-size: 13px; width: 140px;">First Name</td>
                <td style="padding: 8px 0; color: #323232; font-weight: 600;">${firstName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #606060; font-size: 13px;">Last Name</td>
                <td style="padding: 8px 0; color: #323232; font-weight: 600;">${lastName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #606060; font-size: 13px;">Email</td>
                <td style="padding: 8px 0; color: #323232; font-weight: 600;">
                  <a href="mailto:${email}" style="color: #B3935A;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #606060; font-size: 13px;">Contact Number</td>
                <td style="padding: 8px 0; color: #323232; font-weight: 600;">${
                  contactNumber || "—"
                }</td>
              </tr>
            </table>

            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />

            <p style="color: #606060; font-size: 13px; margin-bottom: 8px;">Message</p>
            <p style="color: #323232; background: #fff; padding: 16px; border-radius: 6px; border-left: 3px solid #B3935A; margin: 0; white-space: pre-wrap;">${message}</p>

            <p style="color: #9ca3af; font-size: 11px; margin-top: 24px;">Submitted via liqnic.com contact form</p>
          </div>
        `,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error("Resend error:", error)
      return NextResponse.json({ success: false, error }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Contact API error:", err)
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    )
  }
}
