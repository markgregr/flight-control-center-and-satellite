import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "..";

export interface IUser {
  userName: string;
  isUserLogIn: boolean;
}

const initialState: IUser = {
  userName: "",
  isUserLogIn: false,
}

const slice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    logInUser: (state, action: PayloadAction<string>) => {
      state.isUserLogIn = true
      state.userName = action.payload
    },
    logOutUser: (state) => {
      state.isUserLogIn = false
      state.userName = ""
    },
  },
})

export const { logInUser, logOutUser } = slice.actions

export const user = (state: RootState) => state.user

export const { reducer } = slice
