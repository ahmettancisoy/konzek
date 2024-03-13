import { RootState } from "@/lib/store";
import React from "react";
import { useSelector } from "react-redux";

interface InputProps {
  value: string;
  setValue: (value: string) => void;
}

const InputUserName: React.FC<InputProps> = ({ value, setValue }) => {
  const primaryColor = useSelector(
    (state: RootState) => state.themeColor.primaryColor
  );

  const handleChange = (str: string) => {
    const viableStr = str.replace(/[^0-9a-zA-Z]+/gi, "").toLocaleLowerCase();
    setValue(viableStr);
  };

  return (
    <div className="p-4">
      <label
        htmlFor="username"
        className="block text-sm font-semibold leading-6 text-gray-900"
      >
        Username
      </label>
      <div className="mt-2.5">
        <input
          type="text"
          name="username"
          id="username"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          autoComplete="username"
          className={`${primaryColor.focusBorder} block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 focus:outline-none`}
        />
      </div>
    </div>
  );
};

export default InputUserName;
