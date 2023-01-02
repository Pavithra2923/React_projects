import React,{useState,useContext} from "react";
import { BrowserRouter as Router, Route, Routes  } from "react-router-dom";
import UserContext from "./utilites/userContext"
import Login from "./pages/Login";
import FormPage from "./pages/Form";
import Register from "./pages/Register";
import ViewResume from "./pages/View";
 

export default function MainRoute(){

    const [islogged,setIslogged] = useState(false)  
    
    
     return(
    <>
    <UserContext.Provider value={{islogged,setIslogged}}>
        <Router>
            <Routes>
                <Route path='/' exact element={<Login />} />
                <Route path='/formpage' element={<FormPage />} />
                <Route path='/register' element={<Register />} />
                <Route path='/view/:id' element={<ViewResume />} /> 
            </Routes> 
        </Router>
    </ UserContext.Provider>
    </>
    )
}   