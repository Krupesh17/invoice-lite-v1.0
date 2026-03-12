// hooks/useFormErrorSync.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFormError } from "@/store/slices/dashboard-slice";

export function useFormErrorSync(formId, errors) {
  const dispatch = useDispatch();

  useEffect(() => {
    const hasError = Object.keys(errors).length > 0;
    dispatch(setFormError({ formId, hasError }));
  }, [errors, formId, dispatch]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      dispatch(setFormError({ formId, hasError: false }));
    };
  }, [formId, dispatch]);
}
