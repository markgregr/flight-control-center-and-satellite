import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isSocketConnected: false,
}

const slice = createSlice({
  name: "clusterState",
  initialState,
  reducers: {
    socketConnection: (state, action) => {
      state.isSocketConnected = action.payload.state
    },
  },
})

export const { socketConnection } = slice.actions

export const { reducer } = slice
