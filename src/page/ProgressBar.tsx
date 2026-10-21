import { useEffect, useState } from 'react';
import ProgressData from "../json/progressbar.json";

interface IProgressData {
    id: number;
    name: string;
    subject: ISubject[]
}

interface ISubject {
    maths: number,
    science: number,
    english: number,
    tamil: number,
    social: number,
}

const ProgressBarComp = ({ progress = 60 }) => {
    const bgcolor = progress < 35 ? "bg-red-400" : progress < 60 ? "bg-yellow-400" : progress < 75 ? "bg-orange-400" : "bg-green-400"
    return (
        <span className="flex h-8 w-full items-center rounded-4xl bg-gray-200">
            <span
                className={`flex h-8 items-center justify-center rounded-4xl ${bgcolor}`}
                style={{ width: `${progress}%` }}
            >
                {progress}%
            </span>
        </span>)
}

const ProgressBar = () => {
    const [progressList] = useState<IProgressData[]>(ProgressData);
    const [selectedStudent, setSelectedStudent] = useState<IProgressData | null>(null);


    useEffect(()=>{
        if(!selectedStudent){
            setSelectedStudent(progressList[0])
        }
    },[])

    const handleSelectedStudent = (id: number) => {
        const filteredStudent = progressList?.find((student) => student.id === id);
        setSelectedStudent(filteredStudent ?? null);
    }

    return (
        <div>
            <h1 className='text-2xl font-bold'>STUDENT INFO:</h1>
            <select onChange={(e) => handleSelectedStudent(Number(e.target.value))}>
                {
                    progressList?.map((student: IProgressData) => (
                        <option key={student.id} value={student.id}>{student.name}</option>
                    ))
                }
            </select>
            <div>
              {
                selectedStudent?.subject.map((subject,index)=>(
                    <div key={index}>
                        {
                            (Object.entries(subject) as [keyof ISubject,number][]).map(([subjectName,marks])=>(
                                <div key={subjectName}>
                                    <h1 className='text-center'>{subjectName.toUpperCase()}</h1>
                                    <ProgressBarComp progress={marks} />
                                </div>
                            ))
                        }
                    </div>
                ))
              }
            </div>
        </div>
    )
}

export default ProgressBar