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

 

function App() {

   const [isAuthenticated,setIsAuthenticated]=useState(false)
   const [addClicked,setAddIsClicked]=useState(false)

    const checklogin=(bool)=>{
        setIsAuthenticated(bool)
    }

   const checkAdd=(bool)=>{
       setAddIsClicked(bool)
   }

    return (
        <Router>
           <div> 
            <Routes>
                <Route exact path='/' element={<Login checkLogin={checklogin}/> }/>
            </Routes>
            <Routes>
                <Route  path='/home' element={<ProtectedRoute isAuthenticated={isAuthenticated}><Home checkAdd={checkAdd} /></ProtectedRoute>}/>
            </Routes>
            <Routes>
                <Route  path='/userform' element={<ProtectedRoute isAuthenticated={addClicked}><MyForm/></ProtectedRoute>}/>
            </Routes>
            </div>
        </Router>
    
    );
}

export default App;
