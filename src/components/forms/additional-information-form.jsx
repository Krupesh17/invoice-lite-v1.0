import { useCallback, useEffect, useRef } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../ui/field";
import { Input } from "../ui/input";
import { AlertCircleIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { debounce } from "lodash";
import additionalInformationFormSchema from "@/schemas/additional-information-form-schema";
import { useDispatch, useSelector } from "react-redux";
import { updateMetadata } from "@/store/slices/invoice-slice";
import { useFormErrorSync } from "@/hooks/use-form-error-sync";

function AdditionalInformationForm() {
  const dispatch = useDispatch();
  const invoiceFields = useSelector((state) => state.invoice.invoiceFields);

  const form = useForm({
    resolver: zodResolver(additionalInformationFormSchema),
    defaultValues: {
      notes: invoiceFields?.metadata?.notes ?? "",
      terms: invoiceFields?.metadata?.terms ?? "",
      paymentInformation: invoiceFields?.metadata?.paymentInformation ?? [],
    },
    mode: "onChange", // validates on change so errors sync in real-time
  });

  const { fields, append, remove } = useFieldArray({
    name: "paymentInformation",
    control: form.control,
  });

  const {
    formState: { errors },
  } = form;

  // ✅ One line per form — unique ID for each
  useFormErrorSync("additionalInformationForm", errors);

  const onSubmit = useCallback(
    (data) => {
      dispatch(updateMetadata(data));
    },
    [dispatch],
  );

  const onSubmitRef = useRef(onSubmit);

  const debouncedSubmit = useCallback(
    debounce(() => {
      form.handleSubmit((...args) => onSubmitRef.current(...args))();
    }, 1000),
    [],
  );

  useEffect(() => {
    onSubmitRef.current = onSubmit;

    const subscription = form.watch(() => debouncedSubmit());

    return () => {
      subscription.unsubscribe();
      debouncedSubmit.cancel();
    };
  }, [onSubmit, debouncedSubmit, form]);

  return (
    <form className="w-full">
      <FieldGroup className="gap-4">
        <Controller
          name="notes"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-2">
              <FieldLabel
                htmlFor="notes-textarea"
                className="text-xs gap-1 max-w-fit"
              >
                <span>Notes</span>
                <small className="text-[10px] text-muted-foreground rounded-sm">
                  Optional
                </small>
              </FieldLabel>
              <Textarea
                {...field}
                id="notes-textarea"
                aria-invalid={fieldState.invalid}
                placeholder="Notes - any relevant information not already covered"
                autoComplete="off"
                className="resize-none"
              />
              {!fieldState.invalid && (
                <FieldDescription className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <AlertCircleIcon className="size-2.5" />
                  <span>Additional notes for the invoice</span>
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
          name="terms"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-2">
              <FieldLabel
                htmlFor="terms-textarea"
                className="text-xs gap-1 max-w-fit"
              >
                <span>Terms</span>
                <small className="text-[10px] text-muted-foreground rounded-sm">
                  Optional
                </small>
              </FieldLabel>
              <Textarea
                {...field}
                id="terms-textarea"
                aria-invalid={fieldState.invalid}
                placeholder="Terms & Conditions - late fees, payment methods, delivery terms, etc."
                autoComplete="off"
                className="resize-none"
              />
              {!fieldState.invalid && (
                <FieldDescription className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <AlertCircleIcon className="size-2.5" />
                  <span>Terms and conditions for the invoice</span>
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
          <p className="text-xs font-medium">Payment Information</p>

          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex items-stretch gap-4 flex-col @[360px]:flex-row @[360px]:items-center"
            >
              <div className="flex-1 grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-4">
                <Controller
                  name={`paymentInformation.${index}.label`}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="gap-2">
                      <FieldLabel
                        htmlFor={`label-input-${index}`}
                        className="text-xs max-w-fit"
                      >
                        Label
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
                  name={`paymentInformation.${index}.value`}
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
              </div>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => remove(index)}
                className="@[360px]:p-2!"
              >
                <Trash2Icon /> <span className="@[360px]:hidden">Delete</span>
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
            onClick={() => append({ label: "", value: "" })}
          >
            <PlusIcon /> <span>Add New Field</span>
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}

export default AdditionalInformationForm;
