import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

export default function Spinner() {
  const primaryColor = useSelector(
    (state: RootState) => state.themeColor.primaryColor
  );

  return (
    <div
      className={`w-8 h-8 border-4 ${primaryColor.spinner} rounded-full inline-block animate-spin`}
    ></div>
  );
}
