import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserProps {
  _id: string;
  name: string;
  roles: string[];
}

interface ContextState {
  token: string;
  roles: string[];
  users: UserProps[];
}

const usersInit = [
  {
    _id: "",
    name: "",
    roles: [],
  },
];

const initialState: ContextState = {
  token: "",
  roles: [],
  users: usersInit,
};

export const contextSlice = createSlice({
  name: "context",
  initialState,
  reducers: {
    setContext: (state, action: PayloadAction<ContextState>) => {
      state.token = action.payload.token;
      state.roles = action.payload.roles;
    },
    setUsers: (state, action: PayloadAction<UserProps[]>) => {
      state.users = action.payload;
    },
  },
});

export const { setContext, setUsers } = contextSlice.actions;

export default contextSlice.reducer;
