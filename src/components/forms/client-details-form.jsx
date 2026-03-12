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
import clientDetailsFormSchema from "@/schemas/client-details-form-schema";
import { useDispatch, useSelector } from "react-redux";
import { updateClientDetails } from "@/store/slices/invoice-slice";
import { useFormErrorSync } from "@/hooks/use-form-error-sync";

const ClientDetailsForm = () => {
  const dispatch = useDispatch();
  const invoiceFields = useSelector((state) => state.invoice.invoiceFields);

  const form = useForm({
    resolver: zodResolver(clientDetailsFormSchema),
    defaultValues: {
      clientName: invoiceFields?.clientDetails?.name ?? "John Doe",
      clientAddress:
        invoiceFields?.clientDetails?.address ??
        "4567 Elm Street, Anytown, USA",
      clientFields: invoiceFields?.clientDetails?.metadata ?? [],
    },
    mode: "onChange", // validates on change so errors sync in real-time
  });

  const { fields, append, remove } = useFieldArray({
    name: "clientFields",
    control: form.control,
  });

  const {
    formState: { errors },
  } = form;

  // ✅ One line per form — unique ID for each
  useFormErrorSync("clientDetailsForm", errors);

  const onSubmit = useCallback(
    (data) => {
      dispatch(
        updateClientDetails({
          name: data?.clientName,
          address: data?.clientAddress,
          metadata: data?.clientFields,
        }),
      );
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
          name="clientName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-2">
              <FieldLabel
                htmlFor="client-name-input"
                className="text-xs max-w-fit"
              >
                Client Name
              </FieldLabel>
              <Input
                {...field}
                id="client-name-input"
                aria-invalid={fieldState.invalid}
                placeholder="Client Name"
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
          name="clientAddress"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-2">
              <FieldLabel
                htmlFor="client-address-textarea"
                className="text-xs max-w-fit"
              >
                Client Address
              </FieldLabel>
              <Textarea
                {...field}
                id="client-address-textarea"
                aria-invalid={fieldState.invalid}
                placeholder="Client Address"
                autoComplete="off"
                className="resize-none"
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

        <div className={`space-y-2 ${!fields?.length && "hidden"}`}>
          <p className="text-xs font-medium">Client Fields</p>

          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex items-stretch gap-4 flex-col @[360px]:flex-row @[360px]:items-center"
            >
              <div className="flex-1 grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-4">
                <Controller
                  name={`clientFields.${index}.label`}
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
                  name={`clientFields.${index}.value`}
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
};

export default ClientDetailsForm;
