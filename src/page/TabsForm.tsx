import { useState } from 'react'
import Profile from '../components/tabform/Profile'
import Interests from '../components/tabform/Interests'
import Settings from '../components/tabform/Settings'
import { useTabForm } from '../context/TabFormContext'

const tabs = [
    {
        name: "Profile",
        component: Profile
    },
    {
        name: "Interests",
        component: Interests
    },
    {
        name: "Settings",
        component: Settings
    }
]

const TabsForm = () => {

    const [activeTab, setActiveTab] = useState(0);
    const ActiveTabComponent = tabs[activeTab]?.component;
    const { error, setError, formData } = useTabForm();

    const validForms = () => {
        const newErrors: Record<string, string> = {};
        if (!formData?.name.trim()) {
            newErrors.name = "Name field is required"
        }
        if (!formData?.age) {
            newErrors.age = "Age field is required"
        }
        if (!formData?.email.trim()) {
            newErrors.email = "Email field is required"
        }
        if (!formData?.interests.length) {
            newErrors.interests = "Must choose one"
        }
        if (!formData?.theme) {
            newErrors.theme = "Theme need to be selected"
        }
        return newErrors;
    }

    const handleSubmit = () => {
        const newErrors = validForms();
        setError(newErrors);
        if (Object.keys(newErrors).length === 0) {
            console.log("submitted", formData)
        }
    }
    return (
        <div>
            <h1>Tab Form</h1>
            <div className='flex gap-4 my-4'>
                {
                    tabs?.map((tab, index) => {
                        return <div key={index}>
                            <span className={`text-2xl px-2 font-bold cursor-pointer ${activeTab === index ? "text-green-800 border" : ""}`}
                                onClick={() => setActiveTab(index)}
                            >{tab.name}</span>
                        </div>
                    })
                }
            </div>
            <div>
                <ActiveTabComponent />
            </div>
            <button onClick={handleSubmit} disabled={Object.keys(validForms()).length > 0} className={`w-20! btn my-3 ${Object.keys(validForms()).length > 0 ? "bg-gray-300! text-black!" : ""}`}>Submit</button>
            <div className='flex gap-4 mt-5'>
                {
                    Array.from({ length: tabs.length }, (_, index) => {
                        return <button key={index} onClick={() => setActiveTab(index)} disabled={activeTab === index}
                            className={`w-20! ${activeTab === index ? "bg-gray-300! text-black!" : ""} btn`}
                        >{index + 1}</button>
                    })
                }
            </div>
        </div>
    )
}

export default TabsForm