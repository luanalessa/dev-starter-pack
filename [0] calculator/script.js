// Pega o visor da calculadora
const display = document.getElementById("display");

// Pega todos os botões de número
const numberButtons = document.querySelectorAll(".number");

// Pega todos os botões de operação
const operationButtons = document.querySelectorAll(".operation");

// Pega o botão de limpar
const clearButton = document.getElementById("clear");

// Pega o botão de igual
const equalsButton = document.getElementById("equals");

// Guarda o número que está aparecendo na tela
let currentValue = "0";

// Guarda o número anterior
let previousValue = "";

// Guarda a operação escolhida
let selectedOperation = "";

// Atualiza o valor mostrado no visor
function updateDisplay() {
  display.innerText = currentValue;
}

// Adiciona evento de clique em cada botão de número
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Pega o texto do botão clicado
    const value = button.innerText;

    // Impede que o usuário digite dois pontos no mesmo número
    if (value === "." && currentValue.includes(".")) {
      return;
    }

    // Se o visor estiver em 0, substitui pelo número clicado
    if (currentValue === "0" && value !== ".") {
      currentValue = value;
    } else {
      // Senão, concatena o valor no final
      currentValue += value;
    }

    // Atualiza o visor
    updateDisplay();
  });
});

// Adiciona evento de clique em cada botão de operação
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Salva a operação clicada
    selectedOperation = button.innerText;

    // Salva o valor atual como valor anterior
    previousValue = currentValue;

    // Reseta o visor para começar a digitar o próximo número
    currentValue = "0";
  });
});

// Evento do botão AC
clearButton.addEventListener("click", () => {
  // Limpa todos os valores
  currentValue = "0";
  previousValue = "";
  selectedOperation = "";

  // Atualiza o visor
  updateDisplay();
});

// Evento do botão =
equalsButton.addEventListener("click", () => {
  // Converte os valores para número
  const previousNumber = parseFloat(previousValue);
  const currentNumber = parseFloat(currentValue);

  // Se algum valor não for número válido, não calcula
  if (isNaN(previousNumber) || isNaN(currentNumber)) {
    return;
  }

  // Variável para guardar o resultado
  let result = 0;

  // Verifica qual operação foi escolhida
  switch (selectedOperation) {
    case "+":
      result = previousNumber + currentNumber;
      break;

    case "-":
      result = previousNumber - currentNumber;
      break;

    case "x":
      result = previousNumber * currentNumber;
      break;

    case "/":
      result = previousNumber / currentNumber;
      break;

    case "%":
      result = previousNumber % currentNumber;
      break;

    default:
      return;
  }

  // Coloca o resultado no visor
  currentValue = result.toString();

  // Limpa os valores antigos
  previousValue = "";
  selectedOperation = "";

  // Atualiza o visor
  updateDisplay();
});

// Mostra 0 ao abrir a calculadora
updateDisplay();