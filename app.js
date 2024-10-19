const registros = [];
let horaInicioProcessamento = null;

function calcularTempo(horaSaida, horaChegada) {
    const [h1, m1] = horaSaida.split(":");
    const [h2, m2] = horaChegada.split(":");

    const saida = new Date(0, 0, 0, h1, m1);
    const chegada = new Date(0, 0, 0, h2, m2);

    let diff = (chegada - saida) / (1000 * 60 * 60);
    if (diff < 0) {
        diff += 24; 
    }
    return diff;
}

function calcularDesconto(Vmedia) {
    if (Vmedia <= 60) {
        return 20 * 0.15;
    } else if (Vmedia > 60 && Vmedia <= 100) {
        return 20 * 0.10; 
    } else {
        return 0;
    }
}


function calcularPedagio() {
    const placaCarro = document.getElementById('placaCarro').value;
    const horaSaida = document.getElementById('horaSaida').value;
    const horaChegada = document.getElementById('horaChegada').value;

    
    if (!placaCarro || !horaSaida || !horaChegada) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const tempo = calcularTempo(horaSaida, horaChegada);
    const distancia = 70; 
    const Vmedia = distancia / tempo;
    const desconto = calcularDesconto(Vmedia);
    const precoFinal = 20 - desconto;

    const registro = {
        placa: placaCarro,
        horaSaida,
        horaChegada,
        Vmedia,
        precoFinal,
    };

    
    registros.push(registro);

  
    gerarNotaFiscal(registro);

   
    if (!horaInicioProcessamento) {
        horaInicioProcessamento = new Date();
    }


    document.getElementById('placaCarro').value = '';
    document.getElementById('horaSaida').value = '';
    document.getElementById('horaChegada').value = '';
}

function gerarNotaFiscal({ placa, horaSaida, horaChegada, Vmedia, precoFinal }) {
    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('resultado');

    resultadoDiv.innerHTML = `
        <p><strong>Placa do carro:</strong> ${placa}</p>
        <p><strong>Hora de saída do ponto A:</strong> ${horaSaida}</p>
        <p><strong>Hora de chegada no ponto B:</strong> ${horaChegada}</p>
        <p><strong>Velocidade média:</strong> ${Vmedia.toFixed(2)} km/h</p>
        <p><strong>Valor a ser cobrado no pedágio:</strong> R$ ${precoFinal.toFixed(2)}</p>
        <hr>
    `;

    document.body.appendChild(resultadoDiv);
}


document.getElementById('bnt').addEventListener('click', calcularPedagio);

function limparResultados() {
    const resultados = document.querySelectorAll('.resultado');
    resultados.forEach(resultado => resultado.remove());
    alert('Todos os resultados foram limpos.');
}

function exibirResumo() {
    if (registros.length === 0) {
        alert('Nenhum registro disponível para exibir o resumo.');
        return;
    }

    const velocidades = registros.map(r => r.Vmedia);
    const menorVelocidade = Math.min(...velocidades);
    const maiorVelocidade = Math.max(...velocidades);
    const mediaVelocidades = velocidades.reduce((a, b) => a + b, 0) / velocidades.length;
    const totalCobrancas = registros.reduce((total, r) => total + r.precoFinal, 0);

    const resumoDiv = document.createElement('div');
    resumoDiv.classList.add('resultado');

    resumoDiv.innerHTML = `
        <h3>Resumo do Dia</h3>
        <p><strong>Menor velocidade registrada:</strong> ${menorVelocidade.toFixed(2)} km/h</p>
        <p><strong>Maior velocidade registrada:</strong> ${maiorVelocidade.toFixed(2)} km/h</p>
        <p><strong>Média das velocidades:</strong> ${mediaVelocidades.toFixed(2)} km/h</p>
        <p><strong>Total arrecadado:</strong> R$ ${totalCobrancas.toFixed(2)}</p>
        <hr>
    `;

    document.body.appendChild(resumoDiv);
}

document.getElementById('bnt').addEventListener('click', calcularPedagio);
document.getElementById('limparResultados').addEventListener('click', limparResultados);
document.getElementById('exibirResumo').addEventListener('click', exibirResumo);