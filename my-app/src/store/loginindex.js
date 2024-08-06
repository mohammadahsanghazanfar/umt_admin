import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: [{ username: "admin", password: "admin" }],

  username: "",
  validatelogin: false,
  openModal: false,
};

const slice = createSlice({
  name: "loginData",
  initialState,
  reducers: {
    setUserName(state, action) {
      state.username = action.payload;
    },
    checkLogin(state, action) {
       let found=  state.login.find((user) => {
        return (
          user.username === action.payload.username &&
          user.password === action.payload.password
        );
      });

      if (found) {
        
        state.validatelogin = true;
        console.log(state.validatelogin)
      } else {
        state.openModal = true;
      }
    },
    setValidateLogin(state, action) {
      state.validatelogin = action.payload;
    },
    setOpanModal(state, action) {
      state.openModal = action.payload;
    },
  },
});
export const loginActions = slice.actions;
export default slice.reducer;
