import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Home from "./pages/Home"

function App() {

  return (
    <div className="">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />}/>
        <Route path="/" element={<Home />}/>
      </Routes>
    </div>
  )
}

export default App
