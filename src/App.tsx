import React, { useState } from 'react';
import {funcaoDePrimeiroGrau, funcaoDeSegundoGrau, patternPrimeiroGrau, patternSegundoGrau} from './utils/parser';
import './App.css';


function App() {
  const [input, setInput] = useState("");

  const [resultado, setResultado] = useState<any | null>(null);

  const handleSubmit = (event: { preventDefault: () => void; }) => {
     event.preventDefault();
     if(input.match(patternPrimeiroGrau))  setResultado("Resultado: " + funcaoDePrimeiroGrau(input));
     else if (input.match(patternSegundoGrau)) setResultado("Resultado: " + funcaoDeSegundoGrau(input));
     else setResultado("Análise Léxica falhou, por favor use o formato f(6) = 12x + 25 ou f(2) = 42x² + 9x + 55 para funções de segundo grau");
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
