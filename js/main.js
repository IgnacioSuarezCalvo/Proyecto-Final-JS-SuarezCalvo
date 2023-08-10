const signupForm = document.querySelector('#signupForm')
const loginForm = document.querySelector('#loginForm')
const logout = document.querySelector('#logout')


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
            timer: 1000
          })
     }
     Users.push({name: name, email: email, password: password})
     localStorage.setItem('users', JSON.stringify(Users))
     Swal.fire({
        icon: 'success',
        title: 'Felicitaciones',
        text: 'Ya estas registrados',
        timer: 1000
      })
      window.location.href = '../index.html'
})

loginForm.addEventListener('submit', (e)=>{
     e.preventDefault()
     const Users = JSON.parse(localStorage.getItem('users')) || []
     const validUser = Users.find(user => user.mail === email && user.password === password)
     if(!validUser){
          return Swal.fire({
               icon: 'error',
               title: 'Oops...',
               text: 'Usuario y/o contraseña Incorrecto',
               timer: 1000
          })
     }
     Swal.fire({
          icon: 'success',
          title: 'Felicitaciones',
          text: 'Bienvenido',
          timer: 1000
        })
     localStorage.setItem('login_success', JSON.stringify(validUser))
     window.location.href = '../notas.html'
})   

const user = JSON.parse(localStorage.getItem('login_success')) || false
if(!user){
     window.location.href = './index.html'
}

logout.addEventListener('click', ()=>{
     Swal.fire({
          icon: 'success',
          title: 'Hasta Pronto',
          text: 'Gracias!',
          timer: 1000
        })
     localStorage.removeItem('login_success')
     window.location.href = './index.html'
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