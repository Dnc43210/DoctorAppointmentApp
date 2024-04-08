import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Landing from "./components/Landing";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
          <Toaster position="top-center" reverseOrder={false}></Toaster>
<Router>
      <Routes>
        <Route path = "/dashboard" element={<Dashboard/>}></Route>
        <Route path = "/login" element ={<Login/>}></Route>
        <Route path = "/" element ={<Landing/>}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
