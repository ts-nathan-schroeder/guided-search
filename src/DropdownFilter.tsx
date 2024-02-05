import { useEffect, useState } from "react"
import { FieldID } from "./DataDefinitions"
interface DropdownFilterProps {
    tsURL: string,
    field: string,
    fieldId: string,
    fieldLabel: string,
    value: any[],
    runtimeFilters: {},
    setFilter: (value: any)=>void
    multiple: boolean,
    height:string
}
export const DropdownFilter: React.FC<DropdownFilterProps> = ({tsURL,field,fieldId, fieldLabel, value, runtimeFilters,setFilter,multiple,height}: DropdownFilterProps) => {
    const [options, setOptions] = useState<any[]>([])
    useEffect(()=>{
        var url = tsURL+"api/rest/2.0/searchdata"
        fetch(url,
        {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method:'POST',
            credentials: 'include',
            body: JSON.stringify({
                "logical_table_identifier": "782b50d1-fe89-4fee-812f-b5f9eb0a552d",
                "query_string":"["+field+"] ["+fieldId+"] sort by ["+field+"]", //Division 45 supply, 15 denver, 35 eastern. Generally DELETE
                "data_format": "COMPACT",
                "record_offset": 0,
                "runtime_filter":runtimeFilters,
                "record_size": 50,
            })
        }).then(response => response.json()).then(data => {
            let filterData = data.contents[0].data_rows;
            var optionsCopy: any[] = []
            for (var dataRow of filterData){
                optionsCopy.push(dataRow);
            }
            setOptions(optionsCopy)
        })
    },[])
    return (
        <select className={height + " text-gray-800"} style={{width:"100%"}} onChange={(e) => {
            if (multiple){
                let filterVals = Array.from(e.target.selectedOptions).map((option) => {return option.value})
                if (filterVals.includes("ALL")){
                    setFilter([])
                }else{
                    setFilter(filterVals)
                }
            }else{
                if (e.target.value == 'ALL'){
                    setFilter([])
                }else{
                    setFilter([e.target.value])
                }
            }
            }} multiple={multiple}>
            <option selected={value.length == 0 || value[0] == 'NONE' ? true : false } value={"NONE"}>NONE</option>
            <option value={"ALL"}>ALL {fieldLabel}</option>

            {options.map((option)=>{
                return <option selected={option && option[1] ? 
                    value.includes(option[1].toString()) : false
                } value={option[1]}>{fieldId == FieldID.UPC ? 
                    option[1] + " " + option[0]
                    :
                    option[0]
                    }</option>
            })}
        </select>
    )
}