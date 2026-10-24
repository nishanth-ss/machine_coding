import React, { useEffect, useState } from 'react';
import type { IEmployeeData } from '../../ts/employee'
import { useDebounce } from '../../utils/debounce';

interface IEmployeeDataList {
    data: IEmployeeData[];
    setSingleEmployeeData: React.Dispatch<React.SetStateAction<IEmployeeData>>
}
const searchMap = new Map<string, IEmployeeData[]>()
const EmployeeList = ({ data,setSingleEmployeeData }: IEmployeeDataList) => {
    const [search, setSearch] = useState("");
    const debounceSearch = useDebounce(search, 500);
    const [employeeData,setEmployeeData] = useState(data);

    useEffect(()=>{
        if(!debounceSearch) {
            setEmployeeData(data);
            return;
        }
        const searchKey = debounceSearch.toLowerCase();
        if(searchMap.get(searchKey)){
           let response = searchMap.get(searchKey) || []
           setEmployeeData(response)
            return
        }
        const filteredData = data?.filter((val) => val.name.toLowerCase().includes(debounceSearch.toLowerCase().trim()));
        searchMap.set(searchKey,filteredData);
        setEmployeeData(filteredData)
    },[debounceSearch,data]);

    return (
        <div className='h-full'>
            <input type="text" value={search} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                className='bg-gray-200 border w-full p-2'
            />
            {
                employeeData?.map((employee) => {
                    return <div className='bg-blue-300' key={employee.id}>
                        <h1 className='hover:bg-amber-200 p-2 rounded-md' onClick={()=>setSingleEmployeeData(employee)}>{employee?.name}</h1>
                    </div>
                })
            }
        </div>
    )
}

export default EmployeeList