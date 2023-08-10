const signupForm = document.querySelector('#signupForm')
const loginForm = document.querySelector('loginForm')
signupForm.addEventListener('submit',(e)=>{
     e.preventDefault()
     const name = document.querySelector('#name').value
     const email = document.querySelector('#email').value
     const password = document.querySelector('#password').value

     const Users = JSON.parse(localStorage.getItem('users')) || []
     const isUserRegistered = Users.find(user => user.mail === email)
     if(isUserRegistered){
        return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ya esta registrado',
          })
     }
     Users.push({name: name, email: email, password: password})
     localStorage.setItem('users', JSON.stringify(Users))
     Swal.fire({
        icon: 'success',
        title: 'Felicitaciones',
        text: 'Ya estas registrados',
      })
      window.location.href = '../index.html'
})


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