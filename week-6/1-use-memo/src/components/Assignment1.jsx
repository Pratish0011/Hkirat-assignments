import { useMemo, useState } from "react";

// In this assignment, your task is to create a component that performs an expensive calculation (finding the factorial) based on a user input. 

// Use useMemo to ensure that the calculation is done only when the input changes not on every render


export function Assignment1() {
    const [input, setInput] = useState("");

    const expensiveValue = useMemo(function factoralNum(){
        let num = parseInt(input)
        let value = 1;
        for (let i = num; i > 1; i--){
           value = value * i
        }

        return value

    },[input])
    // Your solution starts here
    // const expensiveValue = 0; 
    // Your solution ends here

    return (
        <div>
            <input 
                type="text" 
                value={input} 
                onChange={(e) => setInput(Number(e.target.value))} 
            />
            <p>Calculated Value: {expensiveValue}</p>
        </div>
    );
}
