import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import addInvoiceItemFormSchema from "@/schemas/add-invoice-item-form-schema";

function AddInvoiceItemForm({ setDialogOpen }) {
  const form = useForm({
    resolver: zodResolver(addInvoiceItemFormSchema),
    defaultValues: {
      itemName: "",
      itemDescription: "",
      quantity: 1,
      unitPrice: 1,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    setDialogOpen(false);
  };

  return (
    <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="gap-4">
        <Controller
          name="itemName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-2">
              <FieldLabel htmlFor="item-name-input" className="text-xs max-w-fit">
                Item Name
              </FieldLabel>
              <Input
                {...field}
                type="text"
                id="item-name-input"
                aria-invalid={fieldState.invalid}
                placeholder="Item Name"
                autoComplete="off"
                className="h-8"
              />
              {fieldState.invalid && (
                <FieldError
                  className="text-[10px]"
                  errors={[fieldState.error]}
                />
              )}
            </Field>
          )}
        />

        <Controller
          name="itemDescription"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-2">
              <FieldLabel htmlFor="item-description-input" className="text-xs max-w-fit">
                Item Description
              </FieldLabel>
              <Input
                {...field}
                type="text"
                id="item-description-input"
                aria-invalid={fieldState.invalid}
                placeholder="Item Description"
                autoComplete="off"
                className="h-8"
              />
              {fieldState.invalid && (
                <FieldError
                  className="text-[10px]"
                  errors={[fieldState.error]}
                />
              )}
            </Field>
          )}
        />

        <div className="flex-1 grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-4">
          <Controller
            name="quantity"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-2">
                <FieldLabel htmlFor="quantity-input" className="text-xs max-w-fit">
                  Quantity
                </FieldLabel>
                <Input
                  {...field}
                  type="number"
                  id="quantity-input"
                  aria-invalid={fieldState.invalid}
                  placeholder="Quantity"
                  autoComplete="off"
                  className="h-8"
                />
                {fieldState.invalid && (
                  <FieldError
                    className="text-[10px]"
                    errors={[fieldState.error]}
                  />
                )}
              </Field>
            )}
          />

          <Controller
            name="unitPrice"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-2">
                <FieldLabel htmlFor="unit-price-input" className="text-xs max-w-fit">
                  Unit Price
                </FieldLabel>
                <Input
                  {...field}
                  type="number"
                  id="unit-price-input"
                  aria-invalid={fieldState.invalid}
                  placeholder="Unit Price"
                  autoComplete="off"
                  className="h-8"
                />
                {fieldState.invalid && (
                  <FieldError
                    className="text-[10px]"
                    errors={[fieldState.error]}
                  />
                )}
              </Field>
            )}
          />
        </div>

        <div className="flex items-center gap-2 justify-end">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => setDialogOpen(false)}
          >
            Cancel
          </Button>

          <Button type="submit" size="sm">
            Add Item
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}

export default AddInvoiceItemForm;
