var formulario = document.querySelector('form');

formulario.addEventListener('submit', function(e) {

    e.preventDefault(); //bloqueia refresh da pagina
    let urlForm = "https://pokeapi.co/api/v2/pokemon/"; //api

    urlForm = urlForm + this.name.value; //concatena url + input
    urlForm = urlForm.toLocaleLowerCase() //transforma o value em minusculo

    let resposta = document.getElementById('content');
    let imagem = document.getElementById('img-pokemon');
    let html = '' //reposta em html

    fetch(urlForm) // consumo da api
        .then(resposta => resposta.json())
        .then(function(data) {
            html = 'Nome: ' + letraMaiuscula(data.name) + '<br>'
            html = html + 'Type: ' + letraMaiuscula(data.types[0].type.name)
            resposta.innerHTML = html

            imagem.innerHTML = "<img src='" + data.sprites.front_default + "'> <img src='" + data.sprites.back_default + "'>" + "<br>" + "<img src='" + data.sprites.front_shiny + "'> <img src='" + data.sprites.back_shiny + "'>"
        })
        .catch(function(err) {
            if(err == 'SyntaxError: Unexpected token N in JSON at position 0') {
                html = 'Pokemon não encontrado!'
            } else {
                html = 'Erro: ' + err
            }
            resposta.innerHTML = html        
        })
});

function letraMaiuscula(val) {
    return val[0].toUpperCase() + val.substr(1)
}