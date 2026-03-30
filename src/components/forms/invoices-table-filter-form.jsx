import { Controller, useForm } from "react-hook-form";
import { CommandGroup, CommandItem } from "../ui/command";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { statusCodes, storageTypes } from "@/constants";
import { Badge } from "../ui/badge";
import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";
import { useCallback, useEffect, useRef } from "react";
import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
  selectInvoicesTableFilters,
  updateInvoicesTableFilters,
} from "@/store/slices/dashboard-slice";
import { getTimestamp } from "@/helpers/timestamp";

function InvoicesTableFilterForm({ filter }) {
  const dispatch = useDispatch();
  const invoicesTableFilters = useSelector(selectInvoicesTableFilters);

  const form = useForm({
    defaultValues: {
      storage: invoicesTableFilters?.storage ?? [], // ["local"] | ["server"] | ["local", "server"]
      id: invoicesTableFilters?.id ?? "",
      createdAt: invoicesTableFilters?.createdAt ?? {
        from: undefined,
        to: undefined,
      },
      paidAt: invoicesTableFilters?.paidAt ?? {
        from: undefined,
        to: undefined,
      },
      serialNo: invoicesTableFilters?.serialNo ?? "",
      status: invoicesTableFilters?.status ?? [], // ["pending"] | ["success"] | ["error"] | ["expired"] | ["refunded"]
      // ["pending", "success", "error", "expired", "refunded"]
    },
  });

  const onSubmit = useCallback((data) => {
    dispatch(
      updateInvoicesTableFilters({
        ...data,
        createdAt: {
          from: data.createdAt?.from
            ? getTimestamp(data.createdAt.from)
            : undefined,
          to: data.createdAt?.to ? getTimestamp(data.createdAt.to) : undefined,
        },
        paidAt: {
          from: data.paidAt?.from ? getTimestamp(data.paidAt.from) : undefined,
          to: data.paidAt?.to ? getTimestamp(data.paidAt.to) : undefined,
        },
      }),
    );
  }, []);

  const onSubmitRef = useRef(onSubmit);

  const debouncedSubmit = useCallback(
    debounce(() => {
      form.handleSubmit((...args) => onSubmitRef.current(...args))();
    }, 300),
    [],
  );

  useEffect(() => {
    onSubmitRef.current = onSubmit;

    const subscription = form.watch(() => {
      debouncedSubmit();
    });

    return () => {
      subscription.unsubscribe();
      debouncedSubmit.cancel();
    };
  }, [onSubmit, debouncedSubmit, form]);

  return (
    <CommandGroup className={`hidden ${filter && "block"}`}>
      <form>
        {filter === "storage" && (
          <FormFieldCheckbox
            control={form.control}
            items={storageTypes}
            name="storage"
          />
        )}

        {filter === "id" && <FormFieldInput control={form.control} name="id" />}

        {filter === "createdAt" && (
          <FormFieldCalender control={form.control} name="createdAt" />
        )}

        {filter === "paidAt" && (
          <FormFieldCalender control={form.control} name="paidAt" />
        )}

        {filter === "serialNo" && (
          <FormFieldInput control={form.control} name="serialNo" />
        )}

        {filter === "status" && (
          <FormFieldCheckbox
            control={form.control}
            items={statusCodes}
            name="status"
          />
        )}
      </form>
    </CommandGroup>
  );
}

export default InvoicesTableFilterForm;

function FormFieldCheckbox({ control, items, name }) {
  return (
    <div className="space-y-4">
      {items?.map((option) => (
        <CommandItem key={option?.value} className="h-8.5 mb-0!">
          <Controller
            key={option?.value}
            name={name}
            control={control}
            render={({ field }) => (
              <div className="flex items-center gap-2">
                <Checkbox
                  id={option?.value}
                  checked={field.value?.includes(option?.value)}
                  onCheckedChange={(checked) => {
                    const current = field.value ?? [];
                    field.onChange(
                      checked
                        ? [...current, option?.value]
                        : current.filter((v) => v !== option?.value),
                    );
                  }}
                />
                <Label htmlFor={option?.value}>
                  <Badge className={`rounded-sm ${option?.className}`}>
                    {option?.label}
                  </Badge>
                </Label>
              </div>
            )}
          />
        </CommandItem>
      ))}
    </div>
  );
}

function FormFieldInput({ control, name }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <Input {...field} placeholder="Search..." />}
    />
  );
}

function FormFieldCalender({ control, name }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Calendar
          mode="range"
          selected={field.value} // { from: Date, to: Date }
          onSelect={field.onChange} // fires { from, to } automatically
          numberOfMonths={1}
        />
      )}
    />
  );
}
