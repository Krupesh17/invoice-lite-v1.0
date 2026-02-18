import * as z from "zod";

const additionalInformationFormSchema = z.object({
  notes: z
    .string()
    .trim()
    .max(500, "Notes must be under 500 characters")
    .optional(),
  terms: z
    .string()
    .trim()
    .max(500, "Terms must be under 500 characters")
    .optional(),
  paymentInformation: z
    .array(
      z.object({
        label: z
          .string()
          .trim()
          .min(1, "Label cannot be empty")
          .max(50, "Label must be under 50 characters")
          .regex(/^[a-zA-Z0-9\s\-_]+$/, "Label contains invalid characters"),
        value: z
          .string()
          .trim()
          .min(1, "Value cannot be empty")
          .max(100, "Value must be under 100 characters"),
      }),
    )
    .max(20, "Too many custom fields")
    .optional(),
});

export default additionalInformationFormSchema;
