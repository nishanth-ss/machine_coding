import React from 'react'
import { useTabForm } from '../../context/TabFormContext'

const Settings = () => {
    const { formData, setFormData, error, setError } = useTabForm();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData, theme: e.target.value
        });
        setError({
            ...error, [e.target.name]: ""
        })
    }
    return (
        <div>
            <div className='flex gap-3 items-center'>
                <input type="radio" name='theme' className='border p-2' value={"dark"} onChange={handleChange} />
                <label htmlFor='theme'>Dark</label>
            </div>
            <div className='flex gap-3 items-center'>
                <input type="radio" name='theme' className='border p-2' value={"light"} onChange={handleChange} />
                <label htmlFor='theme'>Light</label>
            </div>
            {error?.theme && <span className='text-red-400'>{error.theme}</span>}
        </div>
    )
}

export default Settings