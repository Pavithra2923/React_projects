import React, { useState,useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


export default function Register(){

    const [registerDetail,setRegisterDetail]=useState({
        request :'create_candidate',
        name :'',
        email :'',
        password :'',
        aadhar : '',
        address :'',
        phone:'',
        city:'',
        area:'',
        pin:''
    })        

  useEffect(() => {
  localStorage.setItem('registerd_people', JSON.stringify(registerDetail));
}, [registerDetail]);

    const navigate = useNavigate()

    const register = async () =>{
        const {data} = await  axios.post('http://karka.academy/api/action.php',JSON.stringify(registerDetail))
        navigate("/");
      
        console.log(data)
    }
    return(
        <>
       <section className="vh-100">
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                         <div className="col-12">
                            <div className="card">
                                 <div className="card-body p-5">
                                    <h2 className="text-uppercase text-center mb-5">Create an account</h2>

              <form>

                <div className="form-outline mb-4">
                  <input type="text" id="form3Example1cg" className="form-control form-control-lg" placeholder="your Name" onChange={(e=>setRegisterDetail({...registerDetail,name:e.target.value}))}/>
                  
                </div>

                <div className="form-outline mb-4">
                  <input type="email" id="form3Example3cg" className="form-control form-control-lg" placeholder="your Email" onChange={(e=>setRegisterDetail({...registerDetail,email:e.target.value}))} />
                  
                </div>

                <div className="form-outline mb-4">
                  <input type="password" id="form3Example4cg" className="form-control form-control-lg" placeholder="your Password" onChange={(e=>setRegisterDetail({...registerDetail,password:e.target.value}))}/>
                  
                </div>

                <div className="form-outline mb-4">
                  <input type="text" id="form3Example4cdg" className="form-control form-control-lg" placeholder="your Address" onChange={(e=>setRegisterDetail({...registerDetail,address:e.target.value}))}/>

                </div>
                <div className="form-outline mb-4">
                  <input type="text" id="form3Example5cg" className="form-control form-control-lg" placeholder="your Mobile Number" onChange={(e=>setRegisterDetail({...registerDetail,phone:e.target.value}))}/>
                  
                </div>
                <div className="form-outline mb-4">
                  <input type="text" id="form3Example6cg" className="form-control form-control-lg" placeholder="your Aadhar Number" onChange={(e=>setRegisterDetail({...registerDetail,aadhar:e.target.value}))} />
                </div>
                <div className="form-outline mb-4">
                  <input type="text" id="form3Example7cg" className="form-control form-control-lg" placeholder="your City" onChange={(e=>setRegisterDetail({...registerDetail,city:e.target.value}))}/>
                </div>
                <div className="form-outline mb-4">
                  <input type="text" id="form3Example8cg" className="form-control form-control-lg" placeholder="your Area" onChange={(e=>setRegisterDetail({...registerDetail,area:e.target.value}))} />
                </div>
                <div className="form-outline mb-4">
                  <input type="text" id="form3Example9cg" className="form-control form-control-lg" placeholder="your Pin" onChange={(e=>setRegisterDetail({...registerDetail,area:e.target.value}))}/>
                </div>

                <div className="d-flex justify-content-center">
                  <button type="button"
                    className="btn btn-success btn-block btn-lg gradient-custom-4 text-body" onClick={register}>Register</button>
                </div>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
        </>
    )
}