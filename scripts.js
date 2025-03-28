// Selecionar elementos do DOM
const amounts = document.querySelectorAll('.amount');
const btn = document.getElementById('btn');
const btnNew = document.getElementById('btn-new');
const rightContent = document.querySelector('.right-content');
const endResult = document.getElementById('end-result');
const drawnNumbers = document.getElementById('drawn-numbers');
const drawnNumber = document.getElementById('drawn-number');
const repeat = document.getElementById('repeat');
const btnBack = document.getElementById('btn-back');
const btnReset = document.getElementById('btn-reset');

// Selecionar os inputs
const amountInput = document.getElementById('amount');
const minInput = document.getElementById('min');
const maxInput = document.getElementById('max');

// Função de validação para garantir que apenas números sejam inseridos
const handleInput = (event) => {
    let value = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    event.target.value = value; // Atualiza o valor do campo
}

// Adicionando o evento de input a todos os campos com a classe "amount"
amounts.forEach(amount => {
    amount.oninput = handleInput;
});


// Função para gerar números aleatórios
const generateRandomNumbers = (numCount, minValue, maxValue) => {
    const numbers = [];
    const repetition = !repeat.checked; // Verifica se o checkbox "não repetir" está marcado

    while (numbers.length < numCount) {
        let num = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;

        // Verifica se o número ja foi sorteado ou se o checkbox "não repetir" está marcado
        if (repetition || !numbers.includes(num)) {
            numbers.push(num);
        }
    }
    return numbers;
};

// Função para validar os dados inseridos pelo usuário
const validateInputs = (numCount, minValue, maxValue) => {
    if (minValue >= maxValue) {
        throw new Error('o valor "DE" deve ser menor que o valor "ATÉ".');
    }
    if (numCount <= 0) {
        throw new Error('A quantidade de números deve ser maior que zero.');
    }
};

let sorteioCount = 0; // Contador de sorteios

// Função para realizar o sorteio e atualizar o UI
const newDraw = (event) => {
    event.preventDefault();

    try {
        // Obtém os valores inseridos pelo usuário no formulário
        const numCount = parseInt(document.getElementById('amount').value);
        const minValue = parseInt(document.getElementById('min').value);
        const maxValue = parseInt(document.getElementById('max').value);

        //Validação dos inputs
        validateInputs(numCount, minValue, maxValue);

        // Gera números e atualiza UI
        const randomNumbers = generateRandomNumbers(numCount, minValue, maxValue);

        // Atualiza o conteúdo do elemento 'drawnNumbers' com os números sorteados
        drawnNumbers.innerHTML = randomNumbers.map(num => `<span class="sorteado">${num}</span>`).join(' ');

        // Atualizar contador e exibe o resultado
        sorteioCount++;
        drawnNumber.textContent = `${sorteioCount}º resultado`;

        // Esconder formulário e mostrar resultado
        rightContent.style.display = 'none';
        endResult.style.display = 'flex'; // Mostrar o resultado do sorteio

    } catch (error) {
        alert(error.message);
    }
};

// Adiciona um evento de clique ao botão 'btn'
btn.addEventListener('click', newDraw);

// Adiciona um evento de clique ao botão 'btnNew' para gerar novos sorteios continuamente
btnNew.addEventListener('click', newDraw);


btnBack.addEventListener('click', () => {
    // Esconder o resultado e mostra o formulário novamente
    rightContent.style.display = 'flex';
    endResult.style.display = 'none';
});

const originalValues = {
    amount: amountInput.value,
    min: minInput.value,
    max: maxInput.value
};

btnReset.addEventListener('click', () => {
    // Esconder o resultado e mostra o formulário novamente
    rightContent.style.display = 'flex';
    endResult.style.display = 'none';

    // limpa o contador de sorteios
    sorteioCount = 0;
    drawnNumber.textContent = '1º resultado';

    //se o checkbox estiver marcado, desmarca
    repeat.checked = false;

    // Restaurar os valores originais dos inputs
    amountInput.value = originalValues.amount;
    minInput.value = originalValues.min;
    maxInput.value = originalValues.max;
});
