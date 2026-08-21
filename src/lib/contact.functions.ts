import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name is too long"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Invalid email address")
    .max(200, "Email is too long"),
  message: z
    .string()
    .trim()
    .min(1, "Message is required")
    .max(5000, "Message is too long"),
});

/**
 * Submits the portfolio contact form to Web3Forms, which forwards the
 * details to the owner's Gmail inbox. The Web3Forms access key is a
 * server-side secret (WEB3FORMS_ACCESS_KEY) bound to the destination email,
 * so it never reaches the client bundle.
 */
export const sendContactMessage = createServerFn({ method: "POST" })
  .inputValidator((input) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    const accessKey = process.env["WEB3FORMS_ACCESS_KEY"];
    if (!accessKey) {
      throw new Error("Contact form is not configured.");
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        name: data.name,
        email: data.email,
        message: data.message,
        subject: `Portfolio contact from ${data.name}`,
        from_name: "Mohamed Ibrahim H — Portfolio",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to deliver message. Please try again later.");
    }

    const result = (await response.json()) as {
      success: boolean;
      message?: string;
    };

    if (!result.success) {
      throw new Error(result.message ?? "Failed to deliver message.");
    }

    return { success: true as const };
  });
