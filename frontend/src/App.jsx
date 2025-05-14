// import { Button } from "@/components/ui/ui/button"

import { createBrowserRouter } from "react-router-dom"
// import Navbar from "./components/shared/Navbar"
import { Router } from "lucide-react"
import  Home from "./components/Home"
import Login from "./components/auth/Login"
import Signup from "./components/auth/Signup"
import { RouterProvider } from "react-router-dom"


function App() {

  const appRouter = createBrowserRouter([{
    path: "/",
    element: <Home />
  },
  {
    path: "/Login",
    element: <Login />
  },
  {
    path: "/Signup",
    element: <Signup />
  },
  // {
  //   path: "/Dashboard",
  //   element: <Dashboard />
  // },
  ])
  return (
    <div >
      {/* <Button>Click me</Button> */}
      <RouterProvider router={appRouter} />

    </div>
  )
}

export default App
