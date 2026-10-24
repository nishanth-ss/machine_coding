import EmployeeList from '../components/employeecomp/EmployeeList'
import EmployeeCard from '../components/employeecomp/EmployeeCard'
import EmployeeData from "../json/EmployeeData.json"
import EmployeeForm from '../components/employeecomp/EmployeeForm'
import { useState } from 'react'
import type { IEmployeeData } from '../ts/employee'

const EmployeeDetails = () => {

  const [singleEmployeeData, setSingleEmployeeData] = useState<IEmployeeData>({
    id: 0,
    name: "",
    email: "",
    phone: "",
    img: "",
    department: "",
    role: "",
    salary: 0,
    joiningDate: "",
    status: "",
    location: ""
  });
  const [data, setData] = useState(EmployeeData);
  const [viewForm, setViewForm] = useState(false);

  return (
    <div className='relative'>
      {viewForm && <EmployeeForm singleEmployeeData={singleEmployeeData} setSingleEmployeeData={setSingleEmployeeData}
        setViewForm={setViewForm}
        setData={setData} />}
      <div className="flex justify-end">
        <button className="my-3" onClick={() => {
          setViewForm(!viewForm); setSingleEmployeeData({
            id: 0,
            name: "",
            email: "",
            phone: "",
            img: "",
            department: "",
            role: "",
            salary: 0,
            joiningDate: "",
            status: "",
            location: ""
          })
        }}>
          Add Employee
        </button>
      </div>
      <div className='grid grid-cols-2'>
        <EmployeeList data={data} setSingleEmployeeData={setSingleEmployeeData} />
        <EmployeeCard data={singleEmployeeData?.id ? singleEmployeeData : data[0]} setData={setData} setViewForm={setViewForm} setSingleEmployeeData={setSingleEmployeeData} />
      </div>
    </div>
  )
}

export default EmployeeDetails
