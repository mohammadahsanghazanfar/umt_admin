import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    
  } from "react-router-dom";

import Home from './Pages/Home';
import Login from './Pages/Login';
import MyForm from './Components/Form';
import ProtectedRoute from './Components/ProtectedRoute';
import { useSelector } from 'react-redux';
 

function App() {

   const [isAuthenticated,setIsAuthenticated]=useState(false)
   const addClicked=useSelector((state)=>state.userData.checkAdd)

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
                <Route  path='/movies' element={<ProtectedRoute isAuthenticated={isAuthenticated}><Home /></ProtectedRoute>}/>
            </Routes>
            <Routes>
                <Route  path='/manage-movies/:id' element={<ProtectedRoute isAuthenticated={addClicked}><MyForm/></ProtectedRoute>}/>
            </Routes>
            
            </div>
        </Router>
    
    );
}

export default App;
