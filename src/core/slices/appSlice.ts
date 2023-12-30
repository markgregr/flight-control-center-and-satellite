import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { v4 as uuidv4 } from 'uuid';

export interface INotification {
  id: string;
  message: string;
  isError: boolean;
}

export interface IApp {
  darkMode: boolean;
  notifications: INotification[];
}

const savedTheme = localStorage.getItem('markVovka-theme');

const initialState: IApp = {
  darkMode: savedTheme === "dark",
  notifications: [],
};

const slice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem('markVovka-theme', state.darkMode ? 'dark' : 'light');
    },
    addNotification: (state, action: PayloadAction<{message: string, isError?: boolean}>) => {
      state.notifications.push({
        message: action.payload.message,
        id: uuidv4(),
        isError: action.payload.isError || false,
      });
    },
    deleteNotification: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const queue = state.notifications;
      const new_queue = queue.filter((item) => item.id !== id);
      state.notifications = new_queue;
    },
  },
});

export const { toggleTheme, addNotification, deleteNotification } =
  slice.actions;

export const isDarkThemeSelector = (state: RootState) => state.app.darkMode;
export const notificationsSelector = (state: RootState) => state.app.notifications;

export const { reducer } = slice;
