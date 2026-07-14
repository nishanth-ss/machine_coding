import { useRef, useState } from "react";
import "../style/counter.css"

const Timer = () => {
  const [time, setTime] = useState<number>(0);

  const timeRef = useRef<number | null>(null);

  const handleStart = ()=>{
    if(timeRef.current) return;
    
    timeRef.current = setInterval(()=>{
      setTime((prev)=>prev + 1);
    },1000)
  }

   const handlePause = ()=>{
    if(timeRef.current !== null) clearInterval(timeRef.current);
    timeRef.current = null;
  }

   const handleReset = ()=>{
    handlePause();
    setTime(0);
  }
  return (
    <div>
      <h1>Counter</h1>
      <h1 style={{ color: "red" }}>{time}</h1>
      <div className="btn-container">
        <button onClick={handleStart}>Start</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  )
}

export default Timer