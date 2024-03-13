import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Colors } from "@/app/constants/themeColors";

// Define a type for the slice state
interface ColorState {
  primaryColor: {
    background: string;
    text: string;
    spinner: string;
    focusBorder: string;
    radioColor: string;
  };
  secondaryColor: {
    ring: string;
    textHover: string;
    active: string;
    background: string;
    backgroundHover: string;
  };
}

const initialState: ColorState = {
  primaryColor: Colors.primary.rose,
  secondaryColor: Colors.secondary.rose,
};

export const themeSlice = createSlice({
  name: "themeColor",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setPrimaryColor: (
      state,
      action: PayloadAction<ColorState["primaryColor"]>
    ) => {
      state.primaryColor = action.payload;
    },
    setSecondaryColor: (
      state,
      action: PayloadAction<ColorState["secondaryColor"]>
    ) => {
      state.secondaryColor = action.payload;
    },
  },
});

export const { setPrimaryColor, setSecondaryColor } = themeSlice.actions;

export default themeSlice.reducer;
