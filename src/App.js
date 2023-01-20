import { useState } from "react"

function App() {
  const [calc, setCalc] = useState("")
  const [result, setResult] = useState("")

  const opes = ['/', '*', '-', '+', '.'];

  const updateCalc = value => {
    if(opes.includes(value) && (opes.includes(calc.slice(-1)) || calc === "")){
      return
    }

    setCalc(calc + value)

    if(!opes.includes(value)){
      setResult(eval(calc + value).toString())
    }
  }

  const createDigits = () => {
    const digits=[]
    for(let i=1; i<10; i++){
      digits.push(<button  onClick={() => updateCalc(i.toString())} key={i}>{i}</button>)
    }
    return digits
  }

  const deleteCharacter = () => {
    setCalc(calc.slice(0, -1))
    if(calc.slice(0, -1) === ''){
      setResult('')
      return
    }
    if(opes.includes(calc.slice(-2,-1))){
      setResult(eval(calc.slice(0,-2)).toString())
    }
    else{
      setResult(eval(calc.slice(0,-1)).toString())
    }
  }

  const calculate = () => {
    setCalc(result)
    setResult('')
  }

  const clearAll = () => {
    setCalc('')
    setResult('')
  }

  return (
    <div className="App">

      <div className="calculator">

        <div className="display">
          {result ? <span>( {result} )</span> : ''}&nbsp; { calc || "0"}
        </div>

        <div className="operators">
          <button onClick={() => updateCalc("/")}>/</button>
          <button onClick={() => updateCalc("*")}>*</button>
          <button onClick={() => updateCalc("-")}>-</button>
          <button onClick={() => updateCalc("+")}>+</button>
          <button onClick={() => deleteCharacter()}>DEL</button>
          <button onClick={() => clearAll()}>CLR</button>
        </div>

        <div className="digits">
          { createDigits() }
          <button onClick={() => updateCalc("0")}>0</button>
          <button onClick={() => updateCalc(".")}>.</button>
          <button onClick={() => calculate()}>=</button>
        </div>

      </div>

    </div>
  );
}

export default App;
