import { createSlice } from "@reduxjs/toolkit";

export const inisialState = {
  id: "",
  username: "",
  password: "",
  token: null
};

const UserSlice = createSlice({
  name: "user",
  initialState: inisialState,
  reducers: {
    updateUser: (state, action) => {
      state.id = action.payload.id;
      state.username=action.payload.username
      state.token = action.payload.token
    },
    clearUser: (state) => {
      state.id = "";
      state.username = "";
      state.password = "";
      state.token = null; 
    },
  },
});
export const { updateUser,clearUser } = UserSlice.actions;
export default UserSlice.reducer;
