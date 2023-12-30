export const BASE_URL =
  "wss://demo.piesocket.com/v3/channel_123?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self";
/* import { Manager } from "socket.io-client"
import { store } from ".."
import { socketConnection } from "../slices/common"

const initialization = (socket) => {
  socket.on("connect", () => {
    store.dispatch(socketConnection({ type: "socketConnection", state: true }))
    console.log("Connection established :)")
  })
  socket.on("connect_error", () => {
    store.dispatch(socketConnection({ type: "socketConnection", state: false }))
    console.log("Socket disconnected!")
  })
}


const manager = new Manager(BASE_URL, {
  path: "/v3/channel_123",
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: Infinity,
})

const socket = manager.socket("/")
initialization(socket)

const someRoom = manager.socket("/room1")

export const socketMiddleware = () => (next) => (action) => {
  switch (action.type) {
    default:
      return next(action)
  }
}

someRoom.on("SET", (data) => {
  console.log("SomeRoom data", data)
}) */
