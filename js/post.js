var filhoDoPai = document.querySelector('#filhoDoPai');
var enviaParaFilho = document.querySelector('#enviaParaFilho');
var yeahh = document.querySelector('#yeahh');

function envia(event) {
    filhoDoPai.contentWindow.postMessage('hey son!', 'http://lagden.webfactional.com');
}

function recebe(event) {
    if (event.data === "go to Yeahhhh") {
        window.scrollToAnimated(yeahh.offsetTop, function(){
            alert('O filho disse ao pai para ir no Yeahhhh via postMessage!');
        });
    }
}

enviaParaFilho.addEventListener('click', envia, false);
window.addEventListener("message", recebe, false);