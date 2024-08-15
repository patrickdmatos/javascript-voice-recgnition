var engine = {
    "numbers": ['0','1','2','3','4','5','6','7','8','9','10',],
    "textNumbers": {
        0: 'Zero',
        1: 'One',
        2: 'Two',
        3: 'Three',
        4: 'Four',
        5: 'Five',
        6: 'Six',
        7: 'Seven',
        8: 'Eight',
        9: 'Nine',
        10: 'Ten',
    },
    "moedas": 0
}

const audioMoeda = new Audio('audio/moeda.mp3');
const audioErrou = new Audio('audio/errou.mp3');

function selectRondomNumber() {
    var indexSelectedNumber = Math.floor(Math.random() * 10);
    var subtitleTextNumber = document.getElementById('subtilte-number');
    var selectedNumber = engine.numbers[indexSelectedNumber];

    subtitleTextNumber.innerText = selectedNumber.toUpperCase();

    return engine.textNumbers[selectedNumber];
}


function alterarNumeroExibido(NumeroAtual) {
    var divExibeNumero = document.getElementById('numero-atual');

    divExibeNumero.textContent = NumeroAtual;
    divExibeNumero.style.backgroundSize = "100%";

}


function atualizaPontuacao(valor) {
    var pontuacao = document.getElementById('pontuacao-atual');

    engine.moedas += valor;

    if (valor < 0) {
        audioErrou.play();
    } else {
        audioMoeda.play();
    }

    pontuacao.innerText = engine.moedas;
}

alterarNumeroExibido(selectRondomNumber())
//API DE RECONHECIMENTO DE VOZ
var btnRecorder = document.getElementById("btn-responder");
var transcricaoAudio = "";
var respostaCorreta = "";

if (window.SpeechRecognition || window.webkitSpeechRecognition) {
    var SpeechAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recorder = new SpeechAPI();

    recorder.continuos = false;
    recorder.lang = "en-US";


    recorder.onstart = function () {
        btnRecorder.innerText = "Estou Ouvindo";
        btnRecorder.style.backgroundColor = "white";
        btnRecorder.style.color = "black";
    }

    recorder.onend = function () {
        btnRecorder.innerText = "Responder";
        btnRecorder.style.backgroundColor = "blue";
        btnRecorder.style.color = "white";
    }

    recorder.onresult = function (event) {
        transcricaoAudio = event.results[0][0].transcript.toUpperCase();
        respostaCorreta = document.getElementById('cor-na-caixa').innerText.toUpperCase();

        if (transcricaoAudio === respostaCorreta) {
            atualizaPontuacao(1);
        } else {
            atualizaPontuacao(-1);
        }

        alterarNumeroExibido(selectRondomNumber());

    }


} else {
    alert('não tem suporte');
}


btnRecorder.addEventListener('click', function (e) {
    recorder.start();
})