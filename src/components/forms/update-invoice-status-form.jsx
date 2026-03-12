import { Controller, useForm } from "react-hook-form";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import SelectOptionDropdown from "../select-option-dropdown";
import { statusCodes } from "@/constants";
import { Button } from "../ui/button";
import { useEditInvoiceMutation } from "@/store/services/invoice-api";
import { useCallback } from "react";
import { getInvoiceById } from "@/utils/indexedDB/invoices-store";
import { getTimestamp } from "@/helpers/timestamp";
import { toast } from "sonner";
import { LoaderIcon } from "lucide-react";

function UpdateInvoiceStatusForm({ setOpen, setDialogBlock, invoice }) {
  const [editInvoice, { isLoading }] = useEditInvoiceMutation();

  const { id } = invoice;

  const form = useForm({
    defaultValues: {
      invoiceId: invoice?.id ?? "",
      status: invoice?.status ?? "pending",
    },
  });

  const onSubmit = useCallback(
    async (data) => {
      try {
        setDialogBlock(true);
        const invoiceData = await getInvoiceById(id);
        if (!invoiceData) {
          throw new Error("Missing or invalid invoice ID.");
        }

        const updatedStatus =
          data?.status === "success"
            ? { status: data?.status, paidAt: getTimestamp() }
            : { status: data?.status, paidAt: null };

        const updatedInvoiceData = {
          ...invoiceData,
          ...updatedStatus,
        };

        await editInvoice(updatedInvoiceData);
        toast.success("Invoice Created Successfully.", {
          description: "Your invoice has been created successfully.",
        });
        setOpen(false);
      } catch (err) {
        toast.error("Error Updating Invoice Status", {
          description:
            err?.message ||
            "An unexpected error occurred while updating the invoice status. Please try again.",
        });
      } finally {
        setDialogBlock(false);
      }
    },
    [id, getInvoiceById, editInvoice],
  );

  return (
    <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="gap-4">
        <Controller
          name="invoiceId"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-2">
              <FieldLabel
                htmlFor="invoice-id-input"
                className="text-xs max-w-fit"
              >
                Invoice ID
              </FieldLabel>

              <Input
                {...field}
                type="text"
                id="invoice-id-input"
                aria-invalid={fieldState.invalid}
                placeholder="Invoice ID"
                autoComplete="off"
                className="h-8"
                disabled={true}
              />
            </Field>
          )}
        />
        <Controller
          name="status"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-2">
              <FieldLabel
                htmlFor="change-status-input"
                className="text-xs max-w-fit"
              >
                Change Status
              </FieldLabel>
              <SelectOptionDropdown
                id="change-status-input"
                value={field.value}
                onChange={field.onChange}
                invalid={fieldState.invalid}
                items={statusCodes}
              />
            </Field>
          )}
        />

        <div className="flex items-center gap-2 justify-end">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>

          <Button type="submit" size="sm">
            {isLoading && <LoaderIcon className="animate-spin" />}
            <span>Update</span>
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}

export default UpdateInvoiceStatusForm;
