const listaNotas = document.getElementById('lista-notas');
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');


//----------------------------------------------------------//

form.addEventListener('submit' , e =>{
     e.preventDefault();

     checkInputs();
});

function checkInputs(){
     const usernameValue = username.value.trim();
     const emailValue = email.value.trim();
     const passwordValue = password.value.trim();
     const password2Value = password2.value.trim();

     if(username === ''){
          setErrorFor(username, 'Completar');
     }else {
               setSuccessFor(username);
          }

     if(emailname === ''){
          setErrorFor(email, 'El Email tiene que completarse');
     } else if (!isEmail(emailValue)) {
          serErrorFor(email, 'No es valido este email');
     } else{
          setSuccessFor(username);
     }
       
     if(passwordValue === ''){
          setErrorFor(password, 'Completar');
     }else{
          setSuccessFor(password);
     }

     if(password2Value === ''){
          setErrorFor(password2, 'Completar');
     } else if(passwordValue !== password2Value){
          setErrorFor(password2, 'No son iguales');
     } else{
          setSuccessFor(password2);
     }
}

function setErrorFor(input, message){
     const formControl = input.parentElement;
     const small = formControl.querySelector('small');
     formControl.className = 'form-control error';
     small.innerText = message;
}

function setSuccessFor(input){
     const formControl = input.parentElement;
     formControl.className = 'form-control success'
}

function isEmail(email){
     return email.test(email);
}


//----------------------------------------------------------//
eventListeners();

function eventListeners() {
     
     document.querySelector('#formulario').addEventListener('submit', agregarNota);
     listaNotas.addEventListener('click', borrarNota);
     document.addEventListener('DOMContentLoaded', localStorageListo); 
}

function agregarNota(e) {
     e.preventDefault();
     
     const nota = document.getElementById('nota').value;
     
     const botonBorrar = document.createElement('a');
     botonBorrar.classList = 'borrar-nota';
     botonBorrar.innerText = ' X';

     const li = document.createElement('li');
     li.innerText = nota;
     
     li.appendChild(botonBorrar);
     
     listaNotas.appendChild(li);

     agregarNotaLocalStorage(nota);
}

function borrarNota(e) {
     e.preventDefault();
     if(e.target.className === 'borrar-nota') {
          e.target.parentElement.remove();
          borrarNotaLocalStorage(e.target.parentElement.innerText);
     } 
}

function localStorageListo() {
     let notas;

     notas = obtenerNotasLocalStorage();

     notas.forEach(function(nota) {
          
          const botonBorrar = document.createElement('a');
          botonBorrar.classList = 'borrar-nota';
          botonBorrar.innerText = 'X';

          
          const li = document.createElement('li');
          li.innerText = nota;
          
          li.appendChild(botonBorrar);
          
          listaNotas.appendChild(li);
     });
}

function obtenerNotasLocalStorage() {
     let notas;
     
     if(localStorage.getItem('notas') === null) {
          notas = []; 
     } else {
          notas = JSON.parse(localStorage.getItem('notas')); 
     }
     return notas;
}

function agregarNotaLocalStorage(nota) {
     let notas;
     notas = obtenerNotasLocalStorage();
     
     notas.push(nota);
     
     localStorage.setItem('notas', JSON.stringify(notas)); 
}

function borrarNotaLocalStorage(nota) {

     let notas, notaBorrar;
     
     notaBorrar = nota.substring(0, nota.length - 1); 

     notas = obtenerNotasLocalStorage();

     notas.forEach(function(nota, index) {
          if(notaBorrar === nota) {
               notas.splice(index, 1); 
          }
     });

     localStorage.setItem('notas', JSON.stringify(notas)); 
    }