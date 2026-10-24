import type { IEmployeeData } from "../../ts/employee"

interface IEmployeeCardProps {
  data: IEmployeeData;
  setSingleEmployeeData: React.Dispatch<React.SetStateAction<IEmployeeData>>;
  setData: React.Dispatch<React.SetStateAction<IEmployeeData[]>>;
  setViewForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmployeeCard = ({ data, setSingleEmployeeData, setViewForm, setData }: IEmployeeCardProps) => {

  const profileImg = data?.img || "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="

  const handleDelete = (id: number) => {
    setData(prev => prev?.filter((employee) => employee.id !== id));
    setSingleEmployeeData({
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
  }
  return (
    <div className='p-5 bg-gray-100'>
      <div className="flex justify-end">
        <button className="bg-green-400! text-black!" onClick={() => { setSingleEmployeeData(data); setViewForm(true) }}>Update</button>
        <button className="bg-red-400! text-black!" onClick={() => handleDelete(data.id)}>Delete</button>
      </div>
      <div className='flex items-center justify-center'>
        <img src={profileImg} alt={data?.name} className='w-48 h-48 rounded-4xl' />
      </div>
      <div className="flex justify-center flex-col items-center">
        <h1 className='text-2xl font-bold'>{data?.name}</h1>
        <h1>{data?.email}</h1>
        <h3>{data?.phone}</h3>
        <h3>{data?.department}</h3>
        <h3>{data?.role}</h3>
        <h3>{data?.salary}</h3>
        <h3>{data?.location}</h3>
        <h3>{data?.joiningDate}</h3>
      </div>
    </div>
  )
}

export default EmployeeCard
