let historicoCalculos = [];
const tela = document.getElementById('resultado');
const icone = document.getElementById('icone');
const calculadora = document.querySelector('.calculadora');
const buttons = document.querySelectorAll('button');
const iconeImg = icone.querySelector('img');
const modal = document.getElementById('modal');
const closeButton = document.querySelector('.close');
const lista = document.getElementById('historico-lista');

function adicionarValor(valor) {
    tela.value += valor;
}

function calcularResultado() {
    try {
        const expressao = tela.value;
        const resultado = eval(expressao); 
        tela.value = resultado;
        adicionarAoHistorico(`${expressao} = ${resultado}`);
    } catch (error) {
        tela.value = "Erro";
    }
}

function adicionarAoHistorico(conta) {
    if (historicoCalculos.length >= 5) {
        historicoCalculos.shift(); 
    }
    historicoCalculos.push(conta);
    atualizarModal();
}

function atualizarModal() {
    lista.innerHTML = '';
    historicoCalculos.forEach((calculo) => {
        const item = document.createElement('li');
        const botao = document.createElement('button');
        botao.textContent = calculo;

        botao.onclick = () => {
            const resultadoOriginal = calculo.split('=')[1].trim(); 
            tela.value = resultadoOriginal;
        };

        item.appendChild(botao);
        lista.appendChild(item);
    });
}


function limpar() {
    tela.value = "";
}

function apagar() {
    tela.value = tela.value.slice(0, -1);
}

function calcularSeno() {
    const expressao = tela.value;
    const valor = parseFloat(expressao);
    const resultado = Math.sin(valor * Math.PI / 180);
    tela.value = resultado;
    adicionarAoHistorico(`sin(${expressao}) = ${resultado}`);
}

function calcularCosseno() {
    const expressao = tela.value;
    const valor = parseFloat(expressao);
    const resultado = Math.cos(valor * Math.PI / 180);
    tela.value = resultado;
    adicionarAoHistorico(`cos(${expressao}) = ${resultado}`);
}

function calcularTangente() {
    const expressao = tela.value;
    const valor = parseFloat(expressao);
    const resultado = Math.tan(valor * Math.PI / 180);
    tela.value = resultado;
    adicionarAoHistorico(`tan(${expressao}) = ${resultado}`);
}

function calcularLogaritmo() {
    const expressao = tela.value;
    const valor = parseFloat(expressao);
    const resultado = Math.log10(valor);
    tela.value = resultado;
    adicionarAoHistorico(`log(${expressao}) = ${resultado}`);
}

function calcularRaiz() {
    const expressao = tela.value;
    const valor = parseFloat(expressao);
    const resultado = Math.sqrt(valor);
    tela.value = resultado;
    adicionarAoHistorico(`√(${expressao}) = ${resultado}`);
}

function calcularPI() {
    tela.value = Math.PI;
}

function calcularPotencia() {
    const expressao = tela.value;
    const valor = parseFloat(expressao);
    const expoente = prompt("Digite o expoente:");
    if (expoente !== null) {
        const resultado = Math.pow(valor, expoente);
        tela.value = resultado;
        adicionarAoHistorico(`${expressao}^${expoente} = ${resultado}`);
    }
}

function porcentagem() {
    const expressao = tela.value;
    const valor = parseFloat(expressao);
    const resultado = valor / 100;
    tela.value = resultado;
    adicionarAoHistorico(`${expressao}% = ${resultado}`);
}

function calcularFatorial() {
    const expressao = tela.value;
    const valor = parseInt(expressao);
    let fatorial = 1;
    if (!isNaN(valor) && valor >= 0) {
        for (let i = 1; i <= valor; i++) {
            fatorial *= i;
        }
        tela.value = fatorial;
        adicionarAoHistorico(`${valor}! = ${fatorial}`);
    } else {
        tela.value = "Erro";
    }
}

function alternarCorDeFundo() {
    const body = document.body;
    if (tela.style.color != 'black') {
        body.classList.remove('dark-mode');
        calculadora.style.backgroundColor = 'white';
        tela.style.backgroundColor = '#ddd';
        tela.style.color = 'black';
        iconeImg.src = "./lua.png";
        buttons.forEach(button => {
            button.style.backgroundColor = '#ddd';
            button.style.color = 'black';
        });
        icone.style.filter = 'none';
        calculadora.style.borderColor = '#ccc';
    } else {
        body.classList.add('dark-mode');
        calculadora.style.backgroundColor = 'black';
        tela.style.backgroundColor = '#222';
        tela.style.color = 'white';
        iconeImg.src = "./sun.png";
        buttons.forEach(button => {
            button.style.backgroundColor = '#444';
            button.style.color = 'white';
        });
        icone.style.filter = 'invert(1)';
        calculadora.style.borderColor = 'transparent';
    }
}

icone.addEventListener('click', alternarCorDeFundo);

function abrirModal() {
    modal.style.display = "block";
}

function fecharModal() {
    modal.style.display = "none";
}

closeButton.addEventListener('click', fecharModal);

window.addEventListener('click', (event) => {
    if (event.target === modal) fecharModal();
});
