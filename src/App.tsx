import { useRoutes } from "react-router-dom"
import { realRoutes } from "./routes"

function App() {
  const routes = useRoutes(realRoutes)

  return routes
}

export default App
