import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Routes,
    Route,
    Link,
    BrowserRouter
  } from "react-router-dom";

import Home from './Pages/Home';
import Login from './Pages/Login';
import ProtectedRoute from './Components/ProtectedRoute';

 

function App() {

   const [isAuthenticated,setIsAuthenticated]=useState(false)

    const checklogin=(bool)=>{
        setIsAuthenticated(bool)
    }



    return (
        <Router>
           <div> 
            <Routes>
                <Route exact path='/' element={<Login checkLogin={checklogin}/> }/>
            </Routes>
            <Routes>
                <Route  path='/home' element={<ProtectedRoute isAuthenticated={isAuthenticated}><Home/></ProtectedRoute>}/>
            </Routes>
            </div>
        </Router>
    
    );
}

export default App;
