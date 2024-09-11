import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Home from "./pages/Home"
import Explore from "./pages/Explore"
import Post from "./pages/Post"

function App() {

  return (
    <div className="">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />}/>
        <Route path="/" element={<Home />}/>
        <Route path="/explore" element={<Explore />} />
        <Route path="/post" element={<Post />} />
      </Routes>
    </div>
  )
}

export default App
