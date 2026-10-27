import React from 'react'
import { useTabForm } from '../../context/TabFormContext'

const Interests = () => {
    const { formData, setFormData, error, setError } = useTabForm();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev, interests: e.target.checked ? [...prev.interests, e.target.name] : prev.interests?.filter(val => val !== e.target.name)
        }));
        setError({
            ...error, interests: ""
        });
    }
    return (
        <div>
            <div className='flex gap-3 items-center'>
                <input type="checkbox" name='cricket' checked={formData.interests.includes("cricket")} onChange={handleChange} className='border p-2' />
                <label htmlFor='cricket'>Cricket</label>
            </div>
            <div className='flex gap-3 items-center'>
                <input type="checkbox" name='football' checked={formData.interests.includes("football")} onChange={handleChange} className='border p-2' />
                <label htmlFor='football'>Football</label>
            </div>
            <div className='flex gap-3 items-center'>
                <input type="checkbox" name='kabadi' checked={formData.interests.includes("kabadi")} onChange={handleChange} className='border p-2' />
                <label htmlFor='kabadi'>Kabadi</label>
            </div>
            {error?.interests && <span className='text-red-400'>{error.interests}</span>}
        </div>
    )
}

export default Interests