import { ChangeEvent, useCallback, useEffect, useState } from "react";

type FormValues = Record<string, string | undefined>;

interface Options<T extends FormValues = FormValues> {
  initialValues: T;
  validate: (values: T) => Partial<Record<keyof typeof values, string>>;
}

/**
 * A simple form validation hooks
 *
 * @param options
 *  initialValues - The initial form values;
 *  validate - A custom validate method that returns the appropriate error
 * @returns
 *  values - The current values of the form
 *  errors - All errors from validate method
 *  isValid - If there's no error
 *  handleChange - Change event handler for input
 */
export default function useForm({ initialValues, validate }: Options) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = useCallback(
    (field) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (Object.prototype.hasOwnProperty.call(values, field)) {
        setValues({
          ...values,
          [field]: e.target.value,
        });
      }
    },
    [values, validate]
  );

  useEffect(() => {
    setErrors(validate(values));
  }, [values]);

  const isValid = Object.values(errors).every((error) => !error);

  return { values, errors, isValid, handleChange };
}
