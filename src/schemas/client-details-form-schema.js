import * as z from "zod";

const clientDetailsFormSchema = z.object({
  clientName: z
    .string()
    .trim()
    .min(1, "Client name cannot be empty")
    .max(100, "Client name must be under 100 characters"),
  clientAddress: z
    .string()
    .trim()
    .min(5, "Address must be at least 5 characters")
    .max(250, "Address must be under 250 characters")
    .optional()
    .or(z.literal("")),
  clientFields: z
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

export default clientDetailsFormSchema;
