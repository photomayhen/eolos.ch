import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  message: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  try {
    const { name, email, company, message } = (await req.json()) as ContactPayload;

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: name, email, message" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    console.log("Resend API Key exists:", !!resendApiKey);
    
    if (!resendApiKey) {
      console.error("RESEND_API_KEY is not set");
      return new Response(JSON.stringify({ error: "Email service not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const resend = new Resend(resendApiKey);

    const subject = `New contact form submission from ${name}`;
    const html = `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company || "-"}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br/>")}</p>
      <hr/>
      <p>Sent from EOLOS website contact form.</p>
    `;
    const text = `New Contact Message\n\nName: ${name}\nEmail: ${email}\nCompany: ${company || "-"}\n\nMessage:\n${message}`;

    const emailResponse = await resend.emails.send({
      from: "EOLOS <no-reply@eolos.ch>",
      to: ["info@eolos.ch"],
      reply_to: email,
      subject,
      html,
      text,
    });

    console.log("Email sent response:", JSON.stringify(emailResponse, null, 2));
    
    if (emailResponse.error) {
      console.error("Resend API error:", emailResponse.error);
      return new Response(JSON.stringify({ error: "Failed to send email", details: emailResponse.error }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error) {
    console.error("send-contact-email error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});
