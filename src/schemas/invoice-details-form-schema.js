import * as z from "zod";

const InvoiceDetailsFormSchema = z
  .object({
    currency: z
      .string()
      .length(3, "Currency code must be exactly 3 characters")
      .regex(/^[A-Z]{3}$/, "Invalid ISO 4217 code (e.g., USD)")
      .toUpperCase(),

    darkMode: z.enum(["light", "dark"]),

    themeColor: z
      .string()
      .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex color code")
      .transform((val) => val.toUpperCase()),

    invoicePrefix: z
      .string()
      .max(50)
      .trim()
      .optional()
      .or(z.literal(""))
      .transform((v) => v || undefined),

    serialNumber: z
      .string()
      .min(1, "Required")
      .max(20)
      .regex(/^[A-Za-z0-9-_]+$/, "Only alphanumeric, hyphens, or underscores"),

    invoiceDate: z.date({ required_error: "Issue date is required" }).refine(
      (date) => {
        const today = new Date();
        today.setHours(23, 59, 59, 999);
        return date <= today;
      },
      { message: "Invoice date cannot be in the future" },
    ),

    // Cleaned up date logic
    dueDate: z.date().nullable().optional(),

    paymentTerms: z.string().max(250).trim().optional().or(z.literal("")),

    billingDetails: z.array(
      z
        .object({
          label: z.string().trim().min(1, "Label is required").max(50),
          type: z.enum(["fixed", "percentage"]),
          value: z.preprocess(
            // Force empty string to undefined to trigger required_error consistently
            (val) =>
              val === "" || val === null || val === undefined ? undefined : val,
            z.coerce
              .number({
                required_error: "Value is required",
                invalid_type_error: "Value must be a number",
              })
              .min(0, "Value cannot be negative")
              .max(1000000, "Value exceeds allowed limit"),
          ),
        })
        .refine(
          (data) => (data.type === "percentage" ? data.value <= 100 : true),
          {
            message: "Percentage cannot exceed 100%",
            path: ["value"], // Points the error to the value field
          },
        ),
    ),
  })
  /* INDUSTRY STANDARD: Cross-field validation 
    Ensures Due Date isn't before the Issue Date
  */
  .refine(
    (data) => {
      if (!data.dueDate || !data.invoiceDate) return true;
      return data.dueDate >= data.invoiceDate;
    },
    {
      message: "Due date must be after the invoice date",
      path: ["dueDate"],
    },
  );

export default InvoiceDetailsFormSchema;
