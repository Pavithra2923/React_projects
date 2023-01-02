import { useState , useContext,useEffect} from "react";
import UserContext from "../utilites/userContext";
import axios from 'axios'; 
import { Link, useNavigate} from 'react-router-dom'


export default function FormPage(){

  const value = useContext(UserContext);
  const {islogged,setIslogged} = value;
  
  const [resumeData,setResumeData] = useState({  name : "",  email :'',  skills :[],  educations : []  ,projects : [] ,certifications : [], hobbies:[],language_know: [],Daughter_of : '', gender:'' ,dob:'',marital_status :' ' , address:''})
  const [skill , setSkill] = useState({})
  const [hobbie , setHobbie] = useState([])
  const [language , setLanguage] = useState([])
  const [education , setEducation] = useState({Course :'', YOP :'' , Mark_Per : '', institute : ''})
  const [project,setProject] = useState({Title :' ', Domain :'' ,Discription : ''})
  const [certification , setCertification] = useState({Course_name:'', institute_name:'',Duration:''})
  // const [personalDetail ,setPersonalDetail] = useState({Daughter_of : '', gender:'' ,dob:'',marital_status :' ' , address:''})
       
  const addValue=(key,value)=> {
    let updateValue=""
    if(key == 'skills' || key == 'hobbies'  || key == 'language_know'){
      if(skill){
          updateValue = {...resumeData,[key] : [...resumeData[key],skill] }
          setSkill('')
      }
      else if(hobbie){
          updateValue = {...resumeData,[key] : [...resumeData[key],hobbie] }
          setHobbie('')
       }
       else{
          updateValue= {...resumeData,[key] : [...resumeData[key],language] }
          setLanguage('')
       }
      }

      else if(key == 'educations' || key == 'projects' || key == 'certifications' ){
        if(education){
            updateValue = {...resumeData,[key] :[...resumeData[key],education] }
            setEducation({Course :'', YOP :'' , Mark_Per : '', institute : ''})
        }
        else if(project){
            updateValue = {...resumeData,[key] :[...resumeData[key],project]}
            setProject({Title :' ', Domain :'' ,Discription : ''})
        }
        else if(certification){
            updateValue = {...resumeData,[key] :[...resumeData[key],certification]}
            setCertification({Course_name:'', institute_name:'',Duration:''})
        }
     }  
    //  else if(key == 'personaldetails'){
    //   if(personalDetail){
    //     updateValue = {...resumeData,[key]:[...resumeData[key],[personalDetail]]}
    //     setPersonalDetail({Daughter_of : '', gender:'' ,dob:'',marital_status :' ' , address:''})
    //   }
    //  }
    else{
      updateValue ={ ...resumeData,[key] : value}
    }
      setResumeData(updateValue)
    };

    const Delete =(index,value)=>{
      let delete_item=resumeData[value].filter((item,id)=>{return (id!==index)})
      setResumeData({...resumeData,[value]:delete_item})
    }

   const Submit = async ()=>{
      let api_call = {
        request : 'create_react_resume',
        user : 'pavithra2923',
        resume : resumeData
      }
      var {data} = await axios.post('http://karka.academy/api/action.php',JSON.stringify(api_call))
      console.log(data)
  }
   
  const navigate = useNavigate();
  useEffect(() => {
      
    
      if(localStorage.getItem("key") || islogged) navigate('/formpage')
  },[islogged]
  
  )
  useEffect(() =>{
    if(!islogged){
        navigate('/')
    }
})
   const  [getResume,setGetResume] = useState([])
   useEffect(() =>{
     get_api();
     api_delete();
 },[getResume])

 let get_api = async() =>{
    let {data} =  await axios.get('http://karka.academy/api/action.php?request=get_user_react_resume&&user=pavithra2923')
  //  console.log(data.data)
   setGetResume(data.data)
  }
  // get_api()

var api_delete = async(id) =>{
  let {data} = await axios.get(`http://karka.academy/api/action.php?request=delete_react_user_resume&user=pavithra2923&id=${id}`)
  // console.log(data.data)
} 
//  console.log(api_delete())

return (
        <>
         <div className="cotainer main">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card">
                      <div className="card-header col-12"><h1 className="heading col-10">Resume Form</h1>
                        <button type="button" className="logout btn btn-warning" onClick={()=>{setIslogged(false)}}>Logout</button>
                      </div>
                        <div className="card-body">
                           <div className="form-group row">
                             <label for="full_name" className="col-md-4  mt-2 col-form-label text-md-right">Full Name</label>
                                    <div className="col-md-6">
                                        <input type="text" className="form-control" onChange={(e=>addValue('name',e.target.value))} id="name"/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for="email_address" className="col-md-4 mt-2 col-form-label text-md-right">E-Mail Address</label>
                                    <div className="col-md-6">
                                        <input type="text" className="form-control" onChange={(e=>addValue('email',e.target.value))} id="email"/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for="phone_number" className="col-md-4 mt-2 col-form-label text-md-right">Phone Number</label>
                                    <div className="col-md-6">
                                        <input type="text" className="form-control" onChange={(e=>addValue('phone',e.target.value))} id="phone"/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for="role" className="col-md-4 mt-2 col-form-label text-md-right">Role</label>
                                    <div className="col-md-6">
                                        <input type="text" row='5' className="form-control" onChange={(e=>addValue('role',e.target.value))} id="role"/>
                                    </div> 
                                </div>
                                <div className="form-group row">
                                    <label  className="col-4 mt-2 col-form-label text-md-right">Skills</label>
                                    <div className="col-6">
                                        <input type="text" id="skills" value={skill} onChange={(e)=>setSkill(e.target.value)} className="form-control"/>
                                        <button className="col-2 btn btn-primary"  type="button"  onClick={()=>addValue('skills')}>Add</button>
                                        {resumeData.skills.map((item,index)=>{
                                         return(
                                            <div className="skill">
                                                <ul>
                                                  <li>{item}</li>
                                                  <button type="button" class="btn btn-danger" onClick={()=>Delete(index,'skills')}>del</button>
                                                </ul>
                                            </div>
                                            )
                                        })}
                                   </div>
                                </div>
                                  <div className="form-group row">
                                    <label className="col-md-4 mt-2 col-form-label text-md-right">Objective</label>
                                    <div className="col-md-6 mt-2">
                                    <textarea onChange={(e=>addValue('objective',e.target.value))} id="objective" className="form-control"></textarea>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-4 mt-2 col-form-label text-md-right">Education Details</label>
                                </div>
                               
                                <div className="container-fluid ">
                                <table class="table table-striped">
                                      <thead>
                                        <tr>
                                          <th scope="col">Course</th>
                                          <th scope="col">YOP</th>
                                          <th scope="col">Institute</th>
                                          <th scope="col">Mark_percentage</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                        <td><input type="text" value={education.Course} onChange={(e=>setEducation({...education,Course:e.target.value}))}/></td>
                                        <td><input type="text" value={education.YOP} onChange={(e=>setEducation({...education,YOP:e.target.value}))}/></td>
                                        <td><input type="text" value={education.institute} onChange={(e=>setEducation({...education,institute:e.target.value}))}/></td>
                                        <td><input type="text" value={education.Mark_Per} onChange={(e=>setEducation({...education,Mark_Per :e.target.value}))}/></td>
                                        <td>
                                        <button type="button" class="btn btn-primary" onClick={()=>{addValue('educations');(setEducation(""))}}>Add</button>
                                        </td>
                                        </tr>
                                     </tbody>
                                     </table>
                                     {resumeData.educations.map((item,index)=>{
                                       return( 
                                        <>
                                        <table class="table table-sm table-dark">
                                          <thead>
                                            <tr>
                                              <th scope="col">Course</th>
                                              <th scope="col">YOP</th>
                                              <th scope="col">Institute</th>
                                              <th scope="col">Mark_per</th>
                                            
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr>
                                              <td>{item.Course}</td>
                                              <td>{item.YOP}</td>
                                              <td>{item.institute}</td>
                                              <td>{item.Mark_Per}</td>
                                             
                                            </tr>
                                            </tbody>
                                            </table>
                                            </>
                                          )
                                     }
                                   ) }
                                   </div>
                                   <div className="form-group row">
                                    <label className="col-md-4 mt-2 col-form-label text-md-right">Certification Details</label>
                                </div>
                               
                                 <div className="container col-md-10 mt-4"> 
                                  
                                <table class="table table-striped">
                                      <thead>
                                        <tr>
                                          <th scope="col">Course Name</th>
                                          <th scope="col">Institute</th>
                                          <th scope="col">Duaration</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td><input type="text" value={certification.Course_name} onChange={(e=>setCertification({...certification,Course_name:e.target.value}))}/></td>
                                          <td><input type="text" value={certification.institute_name} onChange={(e=>setCertification({...certification,institute_name:e.target.value}))}/></td>
                                          <td><input type="text" value={certification.Duration} onChange={(e=>setCertification({...certification,Duration:e.target.value}))}/></td>
                                          <td><button type="button" class="btn btn-primary" onClick={()=>{addValue('certifications')}}>Add</button>  </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    {/* {resumeData.certifications.map((item,index)=>{
                                       return( 
                                        <>
                                        <table class="table table-sm table-dark">
                                          <thead>
                                            <tr>
                                              <th scope="col">Course</th>
                                              <th scope="col">YOP</th>
                                              <th scope="col">Institute</th>  
                                            
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr>
                                              <td>{item.Course_name}</td>
                                              <td>{item.institute_name}</td>
                                              <td>{item.Duration}</td>
                                         </tr>
                                            </tbody>
                                            </table>
                                            </>
                                          )
                                     }
                                   ) } */}
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-4 mt-2 col-form-label text-md-right">Project Details</label>
                                </div>
                               
                              <div className="container col-md-10 mt-4">
                                <table class="table table-striped">
                                      <thead>
                                        <tr>
                                          <th scope="col">Title</th>
                                          <th scope="col">Domain</th>
                                          <th scope="col">Abstract</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td><input type="text" value={project.Title} onChange={(e=>setProject({...project,Title:e.target.value}))}/></td>
                                          <td><input type="text" value={project.Domain} onChange={(e=>setProject({...project,Domain:e.target.value}))}/></td>
                                          <td><textarea  value={project.Abstract}    onChange={(e=>setProject({...project,Abstract:e.target.value}))}></textarea></td>
                                          <td>  <button type="button" class="btn btn-primary" onClick={()=>{addValue('projects')}}>add</button>   </td>
                                        </tr> 
                                      </tbody>
                                    </table>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-4 mt-2 col-form-label text-md-right">Personal Details</label>
                                </div>
                               <div className="container col-md-10 mt-4">
                                    <div className="form-group row">
                                    <label className="col-md-4 mt-2 col-form-label text-md-right">Father Name</label>
                                    <div className="col-md-6">
                                        <input type="text" className="form-control"  onChange={(e) => addValue('Daughter_of',e.target.value)}   id="Daughter_of"/>
                                    </div>
                                  </div>
                                    <div className="form-group row">
                                    <label className="col-md-4 mt-2 col-form-label text-md-right"> Date_of_Birth</label>
                                    <div className="col-md-6">
                                        <input type="text" className="form-control"  onChange={(e)=>addValue('dob',e.target.value)} id="dob"/>
                                    </div>
                                  </div>
                                    <div className="form-group row">
                                    <label className="col-md-4 mt-2 col-form-label text-md-right">Gender</label>
                                    <div className="col-md-6">
                                        <input type="text" className="form-control"  onChange={(e=>addValue('gender',e.target.value))} id="gender"/>
                                    </div>
                                   </div>
                                  <div className="form-group row">
                                    <label className="col-md-4 mt-2 col-form-label text-md-right">Marital_Status</label>
                                    <div className="col-md-6">
                                        <input type="text" className="form-control"   onChange={(e=>addValue('marital_status',e.target.value))} id="marital_status"/>
                                    </div>
                                  </div>
                                   <div className="form-group row">
                                    <label className="col-md-4 mt-2 col-form-label text-md-right">Address</label>
                                    <div className="col-md-6">
                                        <input type="text" className="form-control"  onChange={(e=>addValue('address',e.target.value))} id="address"/>
                                    </div>
                                </div>
                                  <div className="form-group row mt-2">
                                    <label  className="col-md-4 mt-2 col-form-label text-md-right">Hobbies</label>
                                    <div className="col-md-6">
                                        <input type="text" id="Hobies" value={hobbie} onChange={(e)=>setHobbie(e.target.value)} className="form-control"/>
                                       <button type="button" class="btn btn-primary" onClick={()=>addValue('hobbies')}>Add</button>
                                    {resumeData.hobbies.map((data,index)=>{
                                         return(
                                            <div className="skill">
                                                <ul>
                                                  <li>{data}</li>
                                                  <button type="button" class="btn btn-danger"  onClick={()=>Delete(index,'hobbies')}>del</button>
                                                </ul>
                                            </div>
                                              )
                                        })}
                                        </div>
                                </div>
                                  <div className="form-group row mt-2">
                                    <label  className="col-md-4 mt-2 col-form-label text-md-right">Language Known</label>
                                    <div className="col-md-6">
                                        <input type="text" id="languages"  value={language} onChange={(e)=>setLanguage(e.target.value)} className="form-control"/>
                                        <button type="button" class="btn btn-primary" onClick={()=>addValue('language_know')}>Add</button>
                                        {resumeData.language_know.map((data)=>{
                                         return(
                                            <div className="skill">
                                                <ul>
                                                  <li>{data}</li>
                                                  <button type="button" class="btn btn-danger"   onClick={Delete}>del</button>
                                                </ul>
                                            </div>
                                         )
                                        })}
                                    </div>
                                </div> 
                                    <div className=" mt-40">
                                        <button type="button" className="btn btn-primary" onClick={Submit}>
                                        Submit
                                        </button>
                                    </div>
                                    <table className="table mt-10">
                                      <thead className="thead-dark">
                                        <tr>
                                          <th>S.No</th>
                                          <th scope="col">ID</th>
                                          <th scope="col">User</th>
                                          <th scope="col">Name</th>
                                          <th scope="col">Action</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                      {getResume && getResume.map((item, index) => {
                                          return(
                                              <tr>
                                              <th>{index+1}</th>
                                              <th>{item.id}</th>
                                              <td>{item.user}</td>
                                              <td>{JSON.parse(item.data).name}</td>
                                              <td><Link to={`/view/${item.id}`}>
                                              <td><button  type="button" class="btn btn-success">VIEW</button></td></Link>
                                              <button  type="button" class="btn btn-danger" onClick={()=>api_delete(item.id)}>DELETE</button></td>
                                          </tr>
                                          )
                                        })}
                                      </tbody>
                                    </table>
                                      </div>
                                </div>
                            </div>
                       </div>
                 </div>
            </div>
         </>
      )
  }
                                    