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
  
    const pattern = /\s*f\((-?\d+)\)\s*=\s*(-?\d+x)\s*([-+*\/])\s*(-?\d+)/;
    //const pattern2 = /\s*f(\(-?\d+\))\s*=\s*(-?\d+x²)\s*([-+*\/])\s*(-?\d+x)\s*([-+*\/])\s*(-?\d+)/;
    const match = funcaoInicial.match(pattern);
  
    if (!match) {
      throw new Error('Expressão inválida. Use o formato "f(+-NÚMERO) = +-NÚMEROx operação_matemática +-NÚMERO".');
    }
  
    console.log('X:', match[1]);
  
    const a = parseInt(match[1], 10);
    const b = parseInt(match[2], 10);
    const operacaoMatematica = match[3];
    const c = parseInt(match[4], 10);
  
    // Realize a operação matemática com base no operador
    let resultado;
    switch (operacaoMatematica) {
      case '+':
        resultado = a + b * c;
        break;
      case '-':
        resultado = a - b * c;
        break;
      case '*':
        resultado = a * b * c;
        break;
      case '/':
        if (c === 0) {
          throw new Error('Divisão por zero não é permitida.');
        }
        resultado = a / (b * c);
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
  
    const pattern = /\s*f(\(-?\d+\))\s*=\s*(-?\d+x²)\s*([-+*\/])\s*(-?\d+x)\s*([-+*\/])\s*(-?\d+)/;;
    const match = funcaoInicial.match(pattern);
  
    if (!match) {
      throw new Error('Expressão inválida. Use o formato "f(NÚMERO) = NÚMEROx² operação_matemática NÚMEROx operação_matemática NÚMERO".');
    }
  
    const a = parseInt(match[1], 10);
    const b = parseInt(match[2], 10);
    const operacaoMatematica1 = match[3];
    const c = parseInt(match[4], 10);
    const operacaoMatematica2 = match[5];
    const d = parseInt(match[6], 10);
  
    // Realize as operações matemáticas com base nos operadores
    let resultado;
    switch (operacaoMatematica1) {
      case '+':
        resultado = a + b;
        break;
      case '-':
        resultado = a - b;
        break;
      case '*':
        resultado = a * b;
        break;
      case '/':
        if (b === 0) {
          throw new Error('Divisão por zero não é permitida.');
        }
        resultado = a / b;
        break;
      default:
        throw new Error('Operação matemática inválida.');
    }
  
    switch (operacaoMatematica2) {
      case '+':
        resultado = resultado + (c + d);
        break;
      case '-':
        resultado = resultado - (c + d);
        break;
      case '*':
        resultado = resultado * (c + d);
        break;
      case '/':
        if (c + d === 0) {
          throw new Error('Divisão por zero não é permitida.');
        }
        resultado = resultado / (c + d);
        break;
      default:
        throw new Error('Operação matemática inválida.');
    }
  
    return resultado;
  }
  const funcaoInicial = 'f(3)=4x*2';
  try {
    const resultado = parserFuncaoDePrimeiroGrau(funcaoInicial);
    console.log('Y:', resultado);
  } catch (error) {
    console.error('Erro:', error.message);
  }