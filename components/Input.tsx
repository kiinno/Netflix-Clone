import React from "react";

interface InputProps {
  id: string;
  onChange: any;
  value: string;
  label: string;
  type: string;
}

const Input: React.FC<InputProps> = (props) => {
  return (
    <div className="relative">
      <input
        id={props.id}
        type={props.type}
        className="
          block
          rounded
          px-6
          pt-6
          text-md
          pb-1
          w-full
          text-white
          bg-neutral-700
          focus:outline-none
          focus:ring-0
          appearance-none
          peer
        "
        value={props.value}
        onChange={props.onChange}
        placeholder=" "
      />
      <label
        htmlFor={props.id}
        className="
        absolute
        text-zinc-400
        duration-150
        transform
        -translate-y-3
        scale-75
        top-4
        z-10
        origin-[0]
        left-6
        peer-placeholder-shown:scale-100
        peer-placeholder-shown:translate-y-0
        peer-focus:scale-75
        peer-focus:-translate-y-3
      "
      >
        {props.label}
      </label>
    </div>
  );
};

export default Input;
