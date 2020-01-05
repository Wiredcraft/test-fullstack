import { useState, ChangeEvent } from "react";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useInput = (initialValue?: string) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(""),
    bind: {
      value,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
      }
    }
  };
};

export default useInput;
