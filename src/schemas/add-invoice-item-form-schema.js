import * as z from "zod";

const addInvoiceItemFormSchema = z.object({
  itemName: z
    .string()
    .trim()
    .min(1, "Item name cannot be empty")
    .max(100, "Item name must be less than 100 characters"),
  itemDescription: z
    .string()
    .trim()
    .max(500, "Description must be less than 500 characters")
    .optional(),

  /** 🚩
   * HTML input elements with type="number" return their values as strings, not numbers.
   * The 'coerce' automatically convert strings to numbers.
   * 'z.coerce' is used to access helper functions that perform automatic type conversion (coercion) before
   * validation. It is not a single, standalone function itself, but rather an object containing methods
   * (which are functions) for specific data types.
   * */
  quantity: z.coerce
    .number({
      required_error: "Quantity is required",
      invalid_type_error: "Quantity must be a number",
    })
    .int("Quantity must be an integer")
    .positive("Quantity must be greater than zero"),
  unitPrice: z.coerce
    .number({
      required_error: "Unit price is required",
      invalid_type_error: "Unit price must be a number",
    })
    .positive("Unit price must be greater than zero")
    .max(1000000, "Unit price exceeds allowed limit"),
});

export default addInvoiceItemFormSchema;
