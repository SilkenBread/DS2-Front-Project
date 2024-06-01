import './App.css'
import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Login } from "./views/login";
import { ResetPassword } from "./views/resetPass";
import { RoutesMenu } from "./routes/routesMenu";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path = "/" element = {<Login />} />     
          <Route path = "/ResetPassword" element = {<ResetPassword />} /> 
          <Route path = "/menu/*" element = {<RoutesMenu />} /> 
        </Routes>
      </Router> 
    </> 
  );
}

export default App;



