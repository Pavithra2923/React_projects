import React,{useState,useEffect,useContext} from "react";
import { useParams } from "react-router-dom";
import axios from 'axios' 

export default function ViewResume (){
    const params =useParams();
    const[resume,setResume]=useState("")
    const get_id = async() => {
        const {data} = await axios.get(`http://karka.academy/api/action.php?request=get_react_resume_by_id&user=pavithra2923&id=${params.id}`)
        let get_view=JSON.parse(data.data.data)
        setResume(get_view)
        console.log(get_view)
      }

    useEffect(() =>{
        get_id();
    })

      return(
        <>
       {resume && (
        <div className="container view">
            <div className="container-fluid">
            <h1 className="font-weight-bold text-center">Resume</h1>
            <div className="head">
              <h2 id="name" className="name">{resume.name}</h2>  
              <h4 id='email' >Email : {resume.email}</h4>
              <h4 id='phone'>Ph : {resume.phone}</h4>
            </div>
            <div className="objective">
              <h3>Objective :</h3>
              <p id='objective'> {resume.objective}</p>
            </div>
            <div className="education">
              <h3>Education Details:</h3>
                  <table class="table" id="education">
                  <thead class="thead-dark">
                    <tr>
                      <th scope="col">S.No</th>
                      <th scope="col">Course</th>
                      <th scope="col">YOP</th>
                      <th scope="col">Institute</th>
                      <th scope="col">Mark_percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resume.educations.map((item,index)=>{
                        return(
                            <tr>
                            <td>{index+1}</td>
                            <td>{item.Course}</td>
                            <td>{item.YOP}</td>
                            <td>{item.institute}</td>
                            <td>{item.Mark_Per}</td>
                            </tr>
                            )
                    } )}
                  </tbody>
                </table>
            </div>
            <div className="project">
            <h3>Project  Details:</h3>
              <h4>Main Project:</h4>
              {resume.projects.map((item)=>{
                      return(
                      <>
                      <dl className="row">
                      <dt className="col-sm-3">Title</dt>
                      <dd className="col-sm-9">{item.Title}</dd>
                      <dt className="col-sm-3">Domain </dt>
                      <dd className="col-sm-9">{resume.Domain}</dd>
                      <dt className="col-sm-3">Abstract </dt>
                      <dd className="col-sm-9">{resume.Abstract}</dd>
                      </dl>
                      
                      </>
                          )
                  } )} 
            

            </div>
            <div className="certification">
                <h3>Certification Details :</h3>
                <table class="table" id="certification">
                    <thead class="thead-dark">
                    <tr>
                      <th scope="col">S.No</th>
                      <th scope="col">Course_name</th>
                      <th scope="col">institute_name</th>
                      <th scope="col">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resume.certifications.map((item,index)=>{
                        return(
                            <tr>
                            <td>{index+1}</td>
                            <td>{item.Course_Name}</td>
                            <td>{item.institute_name}</td>
                            <td>{item.Duration}</td>
                            </tr>
                            )
                    } )}
                  </tbody>
                </table>
                </div>
                <div className="skill">
                   <h3>Skills : </h3>
                </div>
                 <ul id="skills">
                      {resume.skills.map((item)=>{
                          return(
                            <li>{item}</li>
                          )
                      })}
                  </ul>
                <div className="personal">
                <h3>Personal Details :</h3>
                    <dl className="row">
  <dt className="col-sm-4">Father's Name </dt>
  <dd className="col-sm-8">{resume.Daughter_of}</dd>

  <dt className="col-sm-4">Date_of_Birth </dt>
  <dd className="col-sm-8">{resume.dob}</dd>

  <dt className="col-sm-4">Gender </dt>
  <dd className="col-sm-8">{resume.gender}</dd>

  <dt className="col-sm-4">Marital_Status</dt>
  <dd className="col-sm-8">{resume.marital_status}</dd>

  <dt className="col-sm-4">Hobbies </dt>
  {resume.hobbies.map((item)=>{
                          return(
                            <dd className="col-sm-4"><li>{item}</li></dd>
                          )
                      })}
  <dt className="col-sm-4">Language_know </dt>
  {resume.language_know.map((item)=>{
                            return(
                              <dd className="col-sm-4"><li>{item}</li></dd>
                            )
                        })}

</dl>
                      </div>
                  </div>
            </div>
        )}
         </>
          )
  }
 