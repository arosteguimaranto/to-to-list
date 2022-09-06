// Variables

const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];


//evenlisteners
evenListeners();

function evenListeners(){
    // Cuando el usuario agrega un nuevo tweet 
    formulario.addEventListener('submit', agregarTweet);

    // Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () =>{
       tweets = JSON.parse(localStorage.getItem('tweets')) || [];

        console.log(tweets);
        
        createHTML();
    })

}

// Funciones

function agregarTweet(e){
    e.preventDefault();
 
    //Testea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    // validacion...

    if(tweet === ''){
     mostrarError('Un mensaje no puede ir vacio');
    return;  // Evita que se ejecuten mas lineas de codigo
    }

    const tweetObj ={
    id: Date.now(),
    tweet
    //texto: tweet 
} 

// Agregar al arreglo de los tweets
    tweets = [...tweets, tweetObj];

// Una vez agregado vamos a crear HTML
createHTML();

    
}



// Mostrar Mensaje de Error

function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // Insertarlo en el contenido  
const contenido = document.querySelector('#contenido');
contenido.appendChild(mensajeError);

// Elimina la alerta despues de  3 Segundos
setTimeout(() =>{
    mensajeError.remove();
}, 3000);

}




//Mostrar un listado de los tweets
function createHTML(){

    limpiarHtml();

    if(tweets.length > 0){
      tweets.forEach(tweet => {               

        // Agregar  un boton de eliminar
        const btnEliminar = document.createElement('a');
        btnEliminar.classList.add('borrar-tweet');
        btnEliminar.innerText = 'X';


        //Añadir la funcion de eliminar
        btnEliminar.onclick = () => {
            borrarTweet(tweet.id);

        }



        // Crear HTML     
        const li = document.createElement('li');

        // añadir texto
        li.innerText = tweet.tweet;

        //Asignar el boton
        li.appendChild(btnEliminar);




        // insertarlo en HTML
        listaTweets.appendChild(li);


      });
    }

    sincronizarStorage();
}

//Agrega los tweets actuales a Local Storage

function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));      

}

// Elimina un Tweet

function borrarTweet(id){
   tweets = tweets.filter( tweet => tweet.id !== id);
    
createHTML();

}






// Limpiar HTML

function limpiarHtml() {
    while(listaTweets.firstChild ){
        listaTweets.removeChild(listaTweets.firstChild);
    }

}
