import type { IEmployeeData } from '../../ts/employee';

interface IEmployeeCardData {
    singleEmployeeData: IEmployeeData;
    setSingleEmployeeData: React.Dispatch<React.SetStateAction<IEmployeeData>>
    setData: React.Dispatch<React.SetStateAction<IEmployeeData[]>>
    setViewForm: React.Dispatch<React.SetStateAction<boolean>>
}

const EmployeeForm = ({ singleEmployeeData, setSingleEmployeeData, setData, setViewForm }: IEmployeeCardData) => {

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (singleEmployeeData?.id !== 0) {
            setData((prev) => prev?.map((employee) =>
                employee?.id === singleEmployeeData?.id ? singleEmployeeData : employee
            ))
        } else {
            const newEmployee = { ...singleEmployeeData, id: Date.now() }
            setData(prev => [...prev, newEmployee]);
        }
        setViewForm(false);
    }

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black/60'>
            <div className='w-[50%] h-[80vh] bg-white p-5 flex flex-col'>
                <h1 className='text-2xl font-bold border-b p-2'>EmployeeForm</h1>
                <form className='py-2 min-h-0 overflow-y-scroll flex-1' onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="name">Name</label>
                        <input type="text" id='name' name='name' value={singleEmployeeData?.name || ""} onChange={(e) => setSingleEmployeeData({ ...singleEmployeeData, name: e.target.value })} className='p-2 border' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="email">Email</label>
                        <input type="text" id='email' name='email' value={singleEmployeeData?.email || ""} onChange={(e) => setSingleEmployeeData({ ...singleEmployeeData, email: e.target.value })} className='p-2 border' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="phone">Phone</label>
                        <input type="number" id='phone' name='phone' value={singleEmployeeData?.phone} onChange={(e) => setSingleEmployeeData({ ...singleEmployeeData, phone: e.target.value })} className='p-2 border' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="img">Profile Img</label>
                        <input type="text" id='img' name='img' value={singleEmployeeData?.img} onChange={(e) => setSingleEmployeeData({ ...singleEmployeeData, img: e.target.value })} className='p-2 border' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="department">Department</label>
                        <input type="text" id='department' name='department' value={singleEmployeeData?.department} onChange={(e) => setSingleEmployeeData({ ...singleEmployeeData, department: e.target.value })} className='p-2 border' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="role">Roles</label>
                        <input type="text" id='role' name='role' value={singleEmployeeData?.role} onChange={(e) => setSingleEmployeeData({ ...singleEmployeeData, role: e.target.value })} className='p-2 border' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="salary">Salary</label>
                        <input type="text" id='salary' name='salary' value={singleEmployeeData?.salary} onChange={(e) => setSingleEmployeeData({ ...singleEmployeeData, salary: Number(e.target.value) })} className='p-2 border' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="location">Location</label>
                        <input type="text" id='location' name='location' value={singleEmployeeData?.location} onChange={(e) => setSingleEmployeeData({ ...singleEmployeeData, location: e.target.value })} className='p-2 border' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="status">Status</label>
                        <select name="status" id="status" className='border p-2' value={singleEmployeeData?.status} onChange={(e) => setSingleEmployeeData({ ...singleEmployeeData, status: e.target.value })}>
                            <option value="Active" selected>Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                    <div className='mt-2 flex gap-3 justify-end'>
                        <button className='bg-transparent! text-[#30336b]! border!' onClick={() => setViewForm(false)}>Cancel</button>
                        <button type='submit' className=''>Add Employee</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EmployeeForm