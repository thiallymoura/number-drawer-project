// Selecionar elementos do DOM
const btn = document.getElementById('btn');
const btnNew = document.getElementById('btn-new');
const rightContent = document.querySelector('.right-content');
const resultadoFinal = document.getElementById('resultado-final');

const numerosSorteados = document.getElementById('numeros-sorteados');
const numeroSorteio = document.getElementById('numero-sorteio');

let sorteioCount = 0; // Contador de sorteios

// Adiciona um evento de clique ao botão 'btn'
btn.addEventListener('click', () => {
    try {
        // Obtém os valores inseridos pelo usuário no formulário
        const numCount = parseInt(document.getElementById('amount').value);
        const minValue = parseInt(document.getElementById('min').value);
        const maxValue = parseInt(document.getElementById('max').value);


        // Função para gerar números aleatórios
        const generateRandomNumbers = (numCount, minValue, maxValue) => {
            const numbers = [];
            while (numbers.length < numCount) {
                // Gera um número aleatório entre minValue e maxValue
                let num = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
                numbers.push(num);
            }
            return numbers;
        };

        // Gerar números e atualizar UI
        const randomNumbers = generateRandomNumbers(numCount, minValue, maxValue);

        // Atualiza o conteúdo do elemento 'numerosSorteados' com os números sorteados
        numerosSorteados.innerHTML = randomNumbers.map(num => `<span class="sorteado">${num}</span>`).join(' ');

        // Atualizar contador e exibir resultado
        sorteioCount++;
        numeroSorteio.textContent = `${sorteioCount}º resultado`;

        // Esconder formulário e mostrar resultado
        rightContent.style.display = 'none';
        resultadoFinal.style.display = 'flex'; // Ajustado para aparecer corretamente

    } catch (error) {
        alert(error.message);
    }
});

btnNew.addEventListener('click', () => {
    try {
        // Esconder o resultado e mostrar o formulário novamente
        resultadoFinal.style.display = 'none';
        rightContent.style.display = 'block';
    } catch (error) {
        alert('Erro ao tentar reiniciar o sorteio: ' + error.message);
    }
});

