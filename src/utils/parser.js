export const patternPrimeiroGrau = /\s*f\((-?\d+)\)\s*=\s*(-?\d+)x\s*([-+*\/])\s*(-?\d+)/;
export const patternSegundoGrau = /\s*f\((-?\d+)\) = (-?\d+)x² ([-+\/]) (-?\d+)x ([-+\/]) (-?\d+)$/;

function lexer(input) {
    const tokens = [];
    let current = 0;
  
    while (current < input.length) {
      let char = input[current];
  
      if (/\s/.test(char)) {
        // Ignorar espaços em branco.
        current++;
        continue;
      }
  
      if (/[0-9]/.test(char)) {
        // Iniciar a leitura de um número.
        let value = '';
        while (/[0-9]/.test(char)) {
          value += char;
          char = input[++current];
        }
        tokens.push({ type: 'numero', value });
        continue;
      }
      
  
      if (/[+-/*]/.test(char)) {
        // Token para operadores.
        tokens.push({ type: 'operador', value: char });
        current++;
        continue;
      }
  
      if (/[()]/.test(char)) {
        // Token para parênteses.
        tokens.push({ type: 'parentese', value: char });
        current++;
        continue;
      }
  
      if (/=/.test(char)) {
        // Token para o sinal de igual.
        tokens.push({ type: 'igual', value: char });
        current++;
        continue;
      }
  
      if (/[fx]/.test(char)) {
        // Token para os caracteres 'f' e 'x'.
        tokens.push({ type: 'caracteres', value: char });
        current++;
        continue;
      }
  
      if (/[x]/.test(char)) {
        // Token para o caractere 'x'.
        tokens.push({ type: 'variavel', value: char });
        current++;
        continue;
      }
  
      if (/[²]/.test(char)) {
        // Token para o caractere '²'.
        tokens.push({ type: 'quadrado', value: char });
        current++;
        continue;
      }
  
    // Se o caractere não corresponder a nada, gera um erro.
      throw new Error('Caractere não reconhecido: ' + char);
    }
  
    return tokens;
  }
  
  export const funcaoDePrimeiroGrau = (funcaoInicial)=>{
    return parserFuncaoDePrimeiroGrau(funcaoInicial)
  }
  function parserFuncaoDePrimeiroGrau(funcaoInicial) {

    const tokens = lexer(funcaoInicial);
    console.log(tokens);
    const match = funcaoInicial.match(patternPrimeiroGrau);
  
    if (!match) {
      return;
    }
  
    const a = parseInt(match[1], 10);
    const b = parseInt(match[2], 10);
    const operacaoMatematica = match[3];
    const c = parseInt(match[4], 10);
  
    // Realize a operação matemática com base no operador
    let resultado;
    switch (operacaoMatematica) {
      case '+':
        resultado = a * b + c;
        break;
      case '-':
        resultado = a * b - c;
        break;
      case '*':
        resultado = a * b * c;
        break;
      case '/':
        if (c === 0) {
          return;
        }
        resultado = a * b / c;
        break;
      default:
        throw new Error('Operação matemática inválida.');
    }
  
    return resultado;
  }
  
  export const funcaoDeSegundoGrau = (funcaoInicial)=>{
    return parserFuncaoDeSegundoGrau(funcaoInicial)
  }

  function parserFuncaoDeSegundoGrau(funcaoInicial) {
    const tokens = lexer(funcaoInicial);
    console.log(tokens);
    const match = funcaoInicial.match(patternSegundoGrau);
  
    if (!match) {
      return;
    }
  
    // Extrai os coeficientes a, b e c da expressão
    const a = parseInt(match[2], 10);
    const operacaoMatematica1 = match[3];
    const b = parseInt(match[4], 10);
    const operacaoMatematica2 = match[5];
    const c = parseInt(match[6], 10);
  
    // Calcula a função de segundo grau f(x) = ax² + bx + c para x = 4
    const x = parseInt(match[1], 10);
    
    console.log(`a: ${a}`);
    console.log(`op1: ${operacaoMatematica1}`);
    console.log(`b: ${b}`);
    console.log(`op2: ${operacaoMatematica2}`);
    console.log(`c: ${c}`);

    console.log(`x: ${x}`);

    let resultado = a * x ^ 2 + b * x + c;
    switch (operacaoMatematica1) {
      //Casos positivos
      case '+':
        switch(operacaoMatematica2){
          case '+':
            resultado = a * x ^ 2 + b * x + c;
          break;
          case '-':
            resultado = a * x ^ 2 + b * x - c;
          break;
          case '*':
            resultado = a * x ^ 2 + b * x * c;
          break;
          case '/':
            resultado = a * x ^ 2 + b * x / c;
          break;
        }
        break;
      //Casos negativos
      case '-':
        switch(operacaoMatematica2){
          case '+':
            resultado = a * x ^ 2 - b * x + c;
          break;
          case '-':
            resultado = a * x ^ 2 - b * x - c;
          break;
          case '*':
            resultado = a * x ^ 2 - b * x * c;
          break;
          case '/':
            resultado = a * x ^ 2 - b * x / c;
          break;
        }
        break;
      //Mult
      case '*':
        switch(operacaoMatematica2){
          case '+':
            resultado = a * x ^ 2 * b * x + c;
          break;
          case '-':
            resultado = a * x ^ 2 * b * x - c;
          break;
          case '*':
            resultado = a * x ^ 2 * b * x * c;
          break;
          case '/':
            resultado = a * x ^ 2 * b * x / c;
          break;
        }
        break;
      //Div
      case '/':
        if (c === 0) {
          throw new Error('Divisão por zero não é permitida.');
        }
        switch(operacaoMatematica2){
          case '+':
            resultado = a * x ^ 2 / b * x + c;
          break;
          case '-':
            resultado = a * x ^ 2 / b * x - c;
          break;
          case '*':
            resultado = a * x ^ 2 / b * x * c;
          break;
          case '/':
            resultado = a * x ^ 2 / b * x / c;
          break;
        }
        break;
      default:
        throw new Error('Operação matemática inválida.');
    }
    
    
  
    return resultado;
  }