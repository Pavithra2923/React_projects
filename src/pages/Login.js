import React,{useState,useEffect,useContext} from "react";
import axios from 'axios'
import { useNavigate,Link } from "react-router-dom";
import UserContext from "../utilites/userContext";

export default function Login(){

    const value = useContext(UserContext);
    const {islogged,setIslogged} =value;

    const[loginData , setLoginData] = useState({ 
        request : 'candidate_login',
        email : 'pavi@gmail.com',
        password : 1234
    })

    const  navigate = useNavigate()

    useEffect(()=>{
        localStorage.setItem('login', JSON.stringify(loginData))
    if(islogged) {
        navigate('/formpage')
    }},
    [islogged]
    )

    const login_api =async () =>{
        const {data} = await axios.post('http://karka.academy/api/action.php',JSON.stringify(loginData))
        console.log(data)
       if(data.status  ===  'success'){
            setIslogged(true);
            localStorage.setItem("value",true)
            navigate('/formpage')
        }
     }
     
     return(
        <>
        <form className="login_page container mt-20">
            <h1 className="page">LOGIN</h1>
            <div className="login mb-3 mt-10">
                <input type="email" className="form-control" value={loginData.email} placeholder='Email' onChange={(e=>setLoginData({...loginData,email:e.target.value}))}/>
            </div>
            <div className="mb-3">
                 <input type="password" className="form-control" value={loginData.password} placeholder="Password" onChange={(e=>setLoginData({...loginData,password:e.target.value}))}/>
             </div>
             <button type="button" className="btn btn-primary" onClick={login_api}>Login</button>
             <p className="mt-20">Click Here for <Link to='/register'>Sign-up</Link></p>
         </form>
        </>
    )
}