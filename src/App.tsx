import React, { useState } from 'react';
import logo from './logo.svg';
import { funcaoDePrimeiroGrau, funcaoDeSegundoGrau } from './utils/parser';
import './App.css';


function App() {
  const [input, setInput] = useState("");
  // Button Text
  const [resultado, setResultado] = useState<any | null>(null);

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    try {
      event.preventDefault();
      const test = funcaoDePrimeiroGrau(input);
      //TODO testar se é primeiro grau ou segundo usando a tokenização
      // funcaoDeSegundoGrau
      setResultado("Resultado: " + test);    
    } catch (error) {
      setResultado("Não foi possível fazer a análise dos valores inseridos, tente no formato: f(3)=4x*2")
    }
  
  }

  return (
    <><h1>LF e Compiladores</h1>
    <div className='container'>
      <form onSubmit={handleSubmit} id='myForm'>
        <label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)} />
        </label>
        <button type="submit"> Enviar </button>
      </form>
    </div>
    
    <div id="result">
      <h1 id='resultado'>{resultado}</h1></div></>
    
    
  );
}

export default App;
