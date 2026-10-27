import React from 'react'
import { useTabForm } from '../../context/TabFormContext'

const Profile = () => {
    const { formData, setFormData, error, setError } = useTabForm();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.name === "age" ? Number(e.target.value) : e.target.value;

        setFormData({
            ...formData,
            [e.target.name]: value
        })
        setError({
            ...error, [e.target.name]: ""
        })
    }

    return (
        <div className='flex flex-col gap-3'>
            <div className='flex gap-3 items-center'>
                <label htmlFor='name'>Name</label> :
                <input type="text" name='name' value={formData?.name} onChange={handleChange} className='border p-2 w-80' />
            </div>
            {error?.name && <span className='text-red-400'>{error.name}</span>}
            <div className='flex gap-3 items-center'>
                <label htmlFor='age'>Age</label> :
                <input type="number" name='age'
                    onWheel={(e) => e.currentTarget.blur()}
                    value={formData?.age} onChange={handleChange} className='border p-2 w-80' />
            </div>
            {error?.age && <span className='text-red-400'>{error.age}</span>}
            <div className='flex gap-3 items-center'>
                <label htmlFor='email'>Email</label> :
                <input type="email" name='email' value={formData?.email} onChange={handleChange} className='border p-2 w-80' />
            </div>
            {error?.email && <span className='text-red-400'>{error.email}</span>}
        </div>
    )
}

export default Profile