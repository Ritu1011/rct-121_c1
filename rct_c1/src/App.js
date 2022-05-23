import React, { useState,useEffect } from "react";
import Button from "./components/Button";
import CandidateCard from "./components/CandidateCard";
import "./styles.css";
import axios from "axios"

export default function App() {
  const [data, setData] = useState([]);
  const [error, setErroe] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page,setPage] =useState(1)
  const [salary,setSalary] =useState("asc")



  useEffect(() => {
    fatchCanditeData({page,salary})
  },[page,salary])

   const fatchCanditeData=async({page,salary}) => {
      setLoading(true)
    axios({
      method :"get",
      url:"http://localhost:3000/candidatesData",
      params:{
        _page:page,
        _limit:5,
        _sort:"salary",
        _order:salary
      }
    })
  .then(res=>{
    setData(res.data)
    setLoading(false)
  })
  .catch(err=>{
    setErroe(true)
    setLoading(false)
  })
  }
 // console.log(data)
function handleSalary(salary){
  if(salary=="asc"){
    setSalary("desc")
  }
  else{
    setSalary("asc")
  }
 
}


  return (
    <div className="App">
      <div>
        { loading && <div id="loading-container">...Loading</div>}
        <Button id="SORT_BUTTON" title={`Sort by Ascending Salary`}  onClick={()=>handleSalary(salary)} />
        <Button title="PREV" id="PREV" disabled={page===1}   onClick={()=>setPage(page-1)}/>
        <Button id="NEXT" title="NEXT" onClick={()=>setPage(page+1)}/>
      </div>
      <div>
      {data.map((item) => 
        <CandidateCard  key={item.id} {...item}/>
      )}
      </div>
    </div>
  );
}

