import React, { useEffect, useRef, useState } from 'react';

const OTP_DIGITS = 6;

const OTPInput = () => {
    const [inputArr, setInputArr] = useState<string[]>(new Array(OTP_DIGITS).fill(""));
    const inputRef = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(()=>{
        inputRef.current[0]?.focus();
    },[]);

    const handleChange = (value: string, index: number) => {
        if (!value.trim() || isNaN(Number(value))) return;
        const newArr = [...inputArr];
        newArr[index] = value.slice(-1);
        setInputArr(newArr);
        inputRef.current[index+1]?.focus();
    }

    const handleBackspace = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace") {
            const newArr = [...inputArr];
            newArr[index] = "";
            setInputArr(newArr);
            inputRef.current[index-1]?.focus();
        }
    }

    return (
        <div>
            <h1>OTP Input</h1>
            <div style={{ display: "flex", gap: "5px", margin: "2rem" }}>
                {
                    inputArr?.map((_, index) => {
                        return <div key={index}>
                            <input className='bg-white border-black! border-2' type="text" value={inputArr[index]}
                                ref={input => { inputRef.current[index] = input }}
                                style={{ width: "50px", height: "50px", textAlign: "center", fontSize: "20px" }}
                                onChange={(e) => handleChange(e.target.value, index)}
                                onKeyDown={(e) => handleBackspace(e, index)}
                            />
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default OTPInput