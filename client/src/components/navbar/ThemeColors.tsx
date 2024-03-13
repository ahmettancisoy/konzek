"use client";
import { useSelector, useDispatch } from "react-redux";
import {
  setPrimaryColor,
  setSecondaryColor,
} from "@/lib/features/theme/themeSlice";
import { RootState } from "@/lib/store";

interface Props {
  baseColor: {
    background: string;
    text: string;
    spinner: string;
    focusBorder: string;
    radioColor: string;
  };
  ringColor: {
    ring: string;
    textHover: string;
    active: string;
    background: string;
    backgroundHover: string;
  };
}

export default function ThemeColors({ baseColor, ringColor }: Props) {
  const selectedColor = useSelector(
    (state: RootState) => state.themeColor.primaryColor
  );

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setPrimaryColor(baseColor));
    dispatch(setSecondaryColor(ringColor));
    localStorage.setItem("primaryColor", JSON.stringify(baseColor));
    localStorage.setItem("secondaryColor", JSON.stringify(ringColor));
  };

  return (
    <div
      className={`rounded-full w-5 h-5 hover:scale-110 transition-all cursor-pointer ${
        baseColor.background
      } ${ringColor.ring} ${
        selectedColor.background === baseColor.background ? "ring-2" : "ring-1"
      }`}
      onClick={handleClick}
    ></div>
  );
}
