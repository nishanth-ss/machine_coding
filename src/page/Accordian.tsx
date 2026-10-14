import { useState } from 'react';
import AccordianData from "../json/AccordianData.json";
import { BiMinus, BiPlus } from 'react-icons/bi';

interface IAccordiamData {
    id: number;
    title: string;
    content: string;
}

const Accordian = () => {
    const [selectedID,setSelectedID] = useState<Record<number,boolean> >({});
    
  return (
    <div>
        <h1 className='text-2xl font-bold'>Accordian</h1>
        {
            AccordianData.map((accordian: IAccordiamData)=>(
                <div key={accordian.id} className='my-5'>
                    <span className='flex text-xl font-semibold items-center gap-5 border-2 p-2'>{accordian.title}<span onClick={()=>setSelectedID({...selectedID,[accordian.id]: !selectedID[accordian.id]})}>{!(selectedID[accordian.id]) ? <BiPlus/> : <BiMinus />}</span></span>
                    {selectedID[accordian.id] && <span className='text-xl p-4 my-4'>{accordian.content}</span>}
                </div>
            ))
        }
    </div>
  )
}

export default Accordian