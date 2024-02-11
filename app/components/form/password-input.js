"use client";
import { Input } from "@nextui-org/react";
import { useState } from "react";
import EyeIcon from "@/icons/eyeIcon";
import EyeOffIcon from "@/icons/eyeOffIcon";
import { useField } from "formik";


export default function PasswordInput({ name, label, placeholder, ...props }) {
  const [field, meta] = useField(name);

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

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
        onChange={(e) => {
          field.onChange(e);
        }}
        placeholder={placeholder}
        type={isVisible ? "text" : "password"}
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeOffIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        variant={"bordered"}
        color={"primary"}
      />
    </div>
  );
}
