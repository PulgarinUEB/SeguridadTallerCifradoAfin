const alphabet = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';

function quitarTildes(cadena) {
  var tildes = {
    'á': 'a',
    'é': 'e',
    'í': 'i',
    'ó': 'o',
    'ú': 'u',
    'Á': 'A',
    'É': 'E',
    'Í': 'I',
    'Ó': 'O',
    'Ú': 'U'
  };

  return cadena.replace(/[áéíóúÁÉÍÓÚ]/g, function(match) {
    return tildes[match];
  });
}

function affineCipherEncrypt(text, a, b) {
  let ciphertext = '';

  for (let i = 0; i < text.length; i++) {
    let char = text[i].toUpperCase();
    if (alphabet.includes(char)) {
      let x = alphabet.indexOf(char); // Índice del carácter en el alfabeto
      let encryptedChar = alphabet[(a * x + b) % 27]; // Cálculo del carácter cifrado
      ciphertext += encryptedChar;
    } else {
      ciphertext += char;
    }
  }

  return ciphertext;
}

function affineCipherDecrypt(ciphertext, a, b) {
  let plaintext = '';

  // Calcular el inverso multiplicativo de 'a' en el módulo 27
  let aInverse = 0;
  for (let i = 0; i < 27; i++) {
    if ((a * i) % 27 === 1) {
      aInverse = i;
      break;
    }
  }

  for (let i = 0; i < ciphertext.length; i++) {
    let char = ciphertext[i].toUpperCase();
    if (alphabet.includes(char)) {
      let y = alphabet.indexOf(char); // Índice del carácter cifrado en el alfabeto
      let decryptedCharIndex = ((aInverse * (y - b + 27)) % 27 + 27) % 27; // Cálculo del índice del carácter descifrado
      let decryptedChar = alphabet[decryptedCharIndex]; // Obtención del carácter descifrado
      plaintext += decryptedChar;
    } else {
      plaintext += char;
    }
  }

  return plaintext;
}

function handleCipherButtonClick() {
    const fromText = document.querySelector(".from-text");
    const resultOutput = document.querySelector('.to-text');
    const a_input = document.getElementById("a_input");
    const b_input = document.getElementById("b_input");

    const a = parseInt(a_input.value);
    const b = parseInt(b_input.value);

    let text = fromText.value.trim();
    let cleanText = quitarTildes(text);

    if (isNaN(a) || isNaN(b)) {
        resultOutput.textContent = 'Por favor ingrese valores numéricos para a y b.';
    } 
    else {
        const ciphertext = affineCipherEncrypt(cleanText, a, b);
        resultOutput.textContent = ciphertext;
    }
}

function handleDecipherButtonClick() {
    const fromText = document.querySelector(".from-text");
    const resultOutput = document.querySelector('.to-text');

    const a = 10;
    const b = 10;

    let text = fromText.value.trim();
    let cleanText = quitarTildes(text);

    resultOutput.textContent = 'Desencriptando...';

    if (isNaN(a) || isNaN(b)) {
        resultOutput.textContent = 'Por favor ingrese valores numéricos para a y b.';
    } 
    else {
        const ciphertext = affineCipherDecrypt(cleanText, a, b);
        resultOutput.textContent = ciphertext;
    }
}

document.getElementById('cipher-button').addEventListener('click', handleCipherButtonClick);
document.getElementById('decipher-button').addEventListener('click', handleDecipherButtonClick);
