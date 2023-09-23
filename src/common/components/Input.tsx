import React from "react";

type TInput = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  acceptValue?: "number-only" | "string-number" | "all";
  className?: string;
  disabled?: boolean;
};

const Input: React.FC<TInput> = ({
  value,
  onChange,
  acceptValue = "all",
  placeholder,
  className,
  disabled = false,
}) => {
  return (
    <input
      className={className}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      onChange={(e) => {
        const value = e.target.value;
        if (acceptValue === "string-number") {
          const customValue = value.replace(/\s\s/g, " ");
          if (/^(?![\s])[\w\s]*$/.test(customValue)) onChange(customValue);
        } else if (acceptValue === "number-only") {
          if (/^[\d]*$/.test(value)) onChange(value);
        } else {
          onChange(value);
        }
      }}
    />
  );
};

export default Input;
