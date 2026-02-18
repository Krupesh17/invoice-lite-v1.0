import { useCallback, useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../ui/field";
import { Input } from "../ui/input";
import { AlertCircleIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { invoiceThemes, taxDiscountTypes } from "@/constants";
import { Button } from "../ui/button";
import CurrencyCombobox from "../currency-combobox";
import CalendarPopover from "../calendar-popover";
import { zodResolver } from "@hookform/resolvers/zod";
import InvoiceDetailsFormSchema from "@/schemas/invoice-details-form-schema";
import SelectOptionDropdown from "../select-option-dropdown";
import { debounce } from "lodash";
import ColorPickerCombobox from "../color-picker-combobox";

function InvoiceDetailsForm() {
  const form = useForm({
    resolver: zodResolver(InvoiceDetailsFormSchema),
    defaultValues: {
      currency: "USD",
      darkMode: "light",
      themeColor: "#FF6900",
      invoicePrefix: "Invoice INV-",
      serialNumber: "0001",
      invoiceDate: new Date() || "",
      dueDate: null,
      paymentTerms: "",
      billingDetails: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "billingDetails",
    control: form.control,
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const debouncedSubmit = useCallback(
    debounce(() => {
      form.handleSubmit(onSubmit)();
    }, 1000),
    [],
  );

  useEffect(() => {
    const subscription = form.watch(() => {
      debouncedSubmit();
    });

    return () => subscription.unsubscribe();
  }, [form, debouncedSubmit]);

  return (
    <form className="w-full">
      <FieldGroup className="gap-4">
        <div className="flex-1 grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-4">
          <Controller
            name="currency"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="gap-2 col-span-full @[392px]:col-auto"
              >
                <FieldLabel
                  htmlFor="currency-select"
                  className="text-xs max-w-fit"
                >
                  Currency
                </FieldLabel>

                <CurrencyCombobox
                  value={field.value}
                  onChange={field.onChange}
                  invalid={fieldState.invalid}
                  id="currency-select"
                />

                {!fieldState.invalid && (
                  <FieldDescription className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <AlertCircleIcon className="size-2.5" />
                    <span>Currency code for the invoice</span>
                  </FieldDescription>
                )}
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
            name="darkMode"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-2">
                <FieldLabel
                  htmlFor="theme-select"
                  className="text-xs max-w-fit"
                >
                  Dark Mode
                </FieldLabel>

                <SelectOptionDropdown
                  id="theme-select"
                  value={field.value}
                  onChange={field.onChange}
                  invalid={fieldState.invalid}
                  items={invoiceThemes}
                />

                {!fieldState.invalid && (
                  <FieldDescription className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <AlertCircleIcon className="size-2.5" />
                    <span>Dark mode for the invoice</span>
                  </FieldDescription>
                )}
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
            name="themeColor"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-2">
                <FieldLabel
                  htmlFor="theme-color-picker"
                  className="text-xs max-w-fit"
                >
                  Theme Color
                </FieldLabel>

                <ColorPickerCombobox
                  value={field.value}
                  onChange={field.onChange}
                  invalid={fieldState.invalid}
                  id="theme-color-picker"
                />

                {!fieldState.invalid && (
                  <FieldDescription className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <AlertCircleIcon className="size-2.5" />
                    <span>Works in white mode only</span>
                  </FieldDescription>
                )}
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

        <div className="flex-1 grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-4">
          <Controller
            name="invoicePrefix"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-2">
                <FieldLabel
                  htmlFor="invoice-prefix-input"
                  className="text-xs max-w-fit"
                >
                  <span>Invoice Prefix</span>
                  <small className="text-[10px] text-muted-foreground rounded-sm">
                    Optional
                  </small>
                </FieldLabel>

                <Input
                  {...field}
                  id="invoice-prefix-input"
                  aria-invalid={fieldState.invalid}
                  placeholder="Invoice Prefix"
                  autoComplete="off"
                  className="h-8"
                />

                {!fieldState.invalid && (
                  <FieldDescription className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <AlertCircleIcon className="size-2.5" />
                    <span>Prefix for invoice number</span>
                  </FieldDescription>
                )}
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
            name="serialNumber"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-2">
                <FieldLabel
                  htmlFor="serial-number-input"
                  className="text-xs max-w-fit"
                >
                  Serial Number
                </FieldLabel>

                <Input
                  {...field}
                  id="serial-number-input"
                  aria-invalid={fieldState.invalid}
                  placeholder="Serial Number"
                  autoComplete="off"
                  className="h-8"
                />

                {!fieldState.invalid && (
                  <FieldDescription className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <AlertCircleIcon className="size-2.5" />
                    <span>Invoice serial number</span>
                  </FieldDescription>
                )}
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

        <div className="flex-1 grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-4">
          <Controller
            name="invoiceDate"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-2">
                <FieldLabel
                  htmlFor="invoice-date-button"
                  className="text-xs max-w-fit"
                >
                  Invoice Date
                </FieldLabel>

                <CalendarPopover
                  value={field.value}
                  onChange={field.onChange}
                  invalid={fieldState.invalid}
                  id="invoice-date-button"
                />

                {!fieldState.invalid && (
                  <FieldDescription className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <AlertCircleIcon className="size-2.5" />
                    <span>Date when invoice is issued</span>
                  </FieldDescription>
                )}
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
            name="dueDate"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-2">
                <FieldLabel
                  htmlFor="invoice-due-date-button"
                  className="text-xs max-w-fit"
                >
                  Due Date
                </FieldLabel>

                <CalendarPopover
                  value={field.value}
                  onChange={field.onChange}
                  invalid={fieldState.invalid}
                  id="invoice-due-date-button"
                />

                {!fieldState.invalid && (
                  <FieldDescription className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <AlertCircleIcon className="size-2.5" />
                    <span>Date when invoice is issued</span>
                  </FieldDescription>
                )}
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

        <Controller
          name="paymentTerms"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-2">
              <FieldLabel
                htmlFor="payment-terms-input"
                className="text-xs gap-1 max-w-fit"
              >
                <span>Payment Terms</span>
                <small className="text-[10px] text-muted-foreground rounded-sm">
                  Optional
                </small>
              </FieldLabel>

              <Input
                {...field}
                id="payment-terms-input"
                aria-invalid={fieldState.invalid}
                placeholder="50% of total amount upfront"
                autoComplete="off"
                className="h-8"
              />

              {!fieldState.invalid && (
                <FieldDescription className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <AlertCircleIcon className="size-2.5" />
                  <span>Terms of payment</span>
                </FieldDescription>
              )}
              {fieldState.invalid && (
                <FieldError
                  className="text-[10px]"
                  errors={[fieldState.error]}
                />
              )}
            </Field>
          )}
        />

        <div className={`space-y-2 ${!fields?.length && "hidden"}`}>
          <p className="text-xs font-medium">Billing Details</p>

          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex items-stretch gap-4 flex-col @[440px]:flex-row @[440px]:items-center"
            >
              <div className="flex-1 grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-4">
                <Controller
                  name={`billingDetails.${index}.label`}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="gap-2">
                      <FieldLabel
                        htmlFor={`label-input-${index}`}
                        className="text-xs max-w-fit"
                      >
                        <span>Label</span>
                        <small className="text-[10px] text-muted-foreground rounded-sm">
                          Tax/Discount/Other
                        </small>
                      </FieldLabel>

                      <Input
                        {...field}
                        aria-invalid={fieldState.invalid}
                        placeholder="Label"
                        autoComplete="off"
                        id={`label-input-${index}`}
                        className="h-8"
                      />

                      {!fieldState.invalid && (
                        <FieldDescription className="text-[10px] text-muted-foreground flex items-center gap-1">
                          <AlertCircleIcon className="size-2.5" />
                          <span>Enter the label for the field</span>
                        </FieldDescription>
                      )}

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
                  name={`billingDetails.${index}.value`}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="gap-2">
                      <FieldLabel
                        htmlFor={`value-input-${index}`}
                        className="text-xs max-w-fit"
                      >
                        Value
                      </FieldLabel>

                      <Input
                        {...field}
                        type="number"
                        aria-invalid={fieldState.invalid}
                        placeholder="Value"
                        autoComplete="off"
                        id={`value-input-${index}`}
                        className="h-8"
                      />

                      {!fieldState.invalid && (
                        <FieldDescription className="text-[10px] text-muted-foreground flex items-center gap-1">
                          <AlertCircleIcon className="size-2.5" />
                          <span>Enter the value for the field</span>
                        </FieldDescription>
                      )}

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
                  name={`billingDetails.${index}.type`}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="gap-2 col-span-full @[392px]:col-auto">
                      <FieldLabel
                        htmlFor={`type-select-${index}`}
                        className="text-xs max-w-fit"
                      >
                        Type
                      </FieldLabel>

                      <SelectOptionDropdown
                        id={`type-select-${index}`}
                        value={field.value}
                        onChange={field.onChange}
                        invalid={fieldState.invalid}
                        items={taxDiscountTypes}
                      />

                      {!fieldState.invalid && (
                        <FieldDescription className="text-[10px] text-muted-foreground flex items-center gap-1">
                          <AlertCircleIcon className="size-2.5" />
                          <span>Select the type for the field</span>
                        </FieldDescription>
                      )}

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

               <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => remove(index)}
                className="@[440px]:p-2!"
              >
                <Trash2Icon /> <span className="@[440px]:hidden">Delete</span>
              </Button>
            </div>
          ))}
        </div>

        <div className="w-full">
          <Button
            type="button"
            size="sm"
            variant="link"
            className="h-auto! p-0! text-xs!"
            onClick={() => append({ label: "", type: "fixed", value: 0 })}
          >
            <PlusIcon /> <span>Add New Field</span>
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}

export default InvoiceDetailsForm;
