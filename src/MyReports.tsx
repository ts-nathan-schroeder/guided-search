import { type } from "@testing-library/user-event/dist/type"
import React, { useEffect, useState } from "react"

interface MyReportsProps {
    tsURL: string,
    collapseFilters: ()=>void
}
const MyReports: React.FC<MyReportsProps> = ({tsURL,collapseFilters}: MyReportsProps) => {

    const [restAnswers, setRestAnswers] = useState([])
    const [dropdownVisible, setDropdownVisible] = useState(false)
    const loadReport = (id: string) => {
        const event = new CustomEvent('loadExistingReport', {detail: {data: {
            id: id}
        }});
        window.dispatchEvent(event)
        collapseFilters();
        setDropdownVisible(false);
    }
    useEffect(()=>{


        var baseURL = tsURL.replace("#/","").replace("#","")
        fetch(baseURL+"callosum/v1/tspublic/v1/metadata/list?type=QUESTION_ANSWER_BOOK&category=MY",
        {
            credentials: 'include',
        })
        .then(response => response.json()).then(
            data => {
                setRestAnswers(data.headers)
            })

    },[])

    return (

      <div >
        <div className="flex font-bold w-96 h-full items-center hover:cursor-pointer hover:text-blue-500" onClick={()=>setDropdownVisible(!dropdownVisible)}>My Reports</div>
        {dropdownVisible && (<div className="absolute shadow-2xl flex flex-col space-y-4 bg-white p-4" >
        {restAnswers.map((answer: any)=>(
            <div className="hover:cursor-pointer hover:text-blue-500" onClick={()=>loadReport(answer.id)}>
                {answer.name}
            </div>
        ))}
        </div>)}
      </div>

    )
}
export default MyReports;