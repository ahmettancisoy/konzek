import { RootState } from "@/lib/store";
import { useState } from "react";
import { useSelector } from "react-redux";

interface InputProps {
  value: string;
  setValue: (value: string) => void;
}

const InputPassword: React.FC<InputProps> = ({ value, setValue }) => {
  const primaryColor = useSelector(
    (state: RootState) => state.themeColor.primaryColor
  );

  const [isVisible, setIsVisible] = useState(false);

  const handleChange = (str: string) => {
    if (str.length < 3 && str.length !== 0) setIsVisible(true);
    else setIsVisible(false);
    setValue(str);
  };

  return (
    <div className="pt-4 pb-2 px-4">
      <label
        htmlFor="password"
        className="block text-sm font-semibold leading-6 text-gray-900"
      >
        Password
      </label>
      <div className="mt-2.5">
        <input
          type="password"
          name="password"
          id="password"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          autoComplete="password"
          className={`${primaryColor.focusBorder} mb-2 block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 focus:outline-none`}
        />
        <span
          className={`${
            isVisible ? "opacity-100" : "opacity-0"
          } bg-gray-700 rounded-md p-1.5 text-xs text-white transition-all`}
        >
          Min 3 characters
        </span>
      </div>
    </div>
  );
};

export default InputPassword;
