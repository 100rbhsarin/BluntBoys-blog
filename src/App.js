import {
  BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Register from './component/Register'
import Login from './component/Login'
import Home from "./component/Home"
import Write from "./component/Write"
import Single from "./component/Single"
import Navbar from "./component/main/Navbar"
import RequireAuth from "./component/RequireAuth";
import Footer from "./component/main/Footer"
import useTitle from "./hook/useTitle";


const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}


const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};





function App() {
  useTitle('BluntBoys-blog')
  return (
    <div className="app">
      <div className="container">
    
      <Routes>
      <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/notes/:id" element={<Single  />} />
         
          <Route path="/login"element={<Login />} />
          <Route path="/register"element={<Register />} />
          {/* <Route element={<RequireAuth/>}> */}
          <Route path="/write"element={<Write />} />
          {/* </Route> */}
          </Route>
    </Routes>
      
      
      
      </div>
    </div>
  )
}

export default App;


