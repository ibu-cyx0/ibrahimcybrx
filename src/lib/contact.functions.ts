import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const contactSchema = z.object({
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

export type ContactInput = z.infer<typeof contactSchema>;

/**
 * Returns the Web3Forms access key. Web3Forms' free plan rejects
 * server-to-server submissions (403 "Use our API in client side"), so the
 * browser must POST directly. The access key is designed by Web3Forms to be
 * public: it only identifies the destination inbox and cannot be used to
 * read anything.
 */
export const getContactConfig = createServerFn({ method: "GET" }).handler(
  async () => {
    const accessKey = "a8dc081b-316a-4881-ab33-a7c2b95b3619";
    if (!accessKey) {
      throw new Error("Contact form is not configured.");
    }
    return { accessKey };
  },
);

/**
 * Browser-side submission to Web3Forms. Must run in the client, not in a
 * server function (see getContactConfig).
 */
export async function submitContactMessage(input: ContactInput) {
  const data = contactSchema.parse(input);
  const { accessKey } = await getContactConfig();

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

  const result = (await response.json().catch(() => null)) as {
    success?: boolean;
    message?: string;
  } | null;

  if (!response.ok || !result?.success) {
    throw new Error(result?.message ?? "Failed to deliver message.");
  }

  return { success: true as const };
}
