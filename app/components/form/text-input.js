import { Input } from "@nextui-org/react";
import { useField } from "formik";

export default function TextInput({
  name,
  label,
  placeholder,
  size,
  ...props
}) {
  const [field, meta] = useField(name);

  return (
    <div className={"flex flex-col gap-1"}>
      <label className={"font-bold text-lg"} htmlFor={name}>
        {label}
      </label>
      <Input
        {...props}
        id={name}
        name={name}
        isInvalid={meta.error !== undefined}
        errorMessage={meta.error}
        size={size}
        onChange={(e) => {
          field.onChange(e);
        }}
        placeholder={placeholder}
        type="text"
        variant={"bordered"}
        color={"primary"}
      />
    </div>
  );
}
