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
          text: 'Something went wrong!',
          timer: 1000,
        })
     }
     Users.push({name: name, email: email, password: password})
     localStorage.setItem('users', JSON.stringify(Users))
     Swal.fire({
        icon: 'success',
        title: 'Felicitaciones',
        text: 'Ya estas registrados',
        timer: 1500,
      })
      window.location.href = './index.html'
})

loginForm.addEventListener('submit', (e)=>{
     e.preventDefault()
     const Users = JSON.parse(localStorage.getItem('users')) || []
     const validUser = Users.find(user => user.mail === email && user.password === password)
     if(!validUser){
          return Swal.fire({
               icon: 'error',
               title: 'Oops...',
               text: 'Something went wrong!',
               timer: 1500,
             })
     }
     Swal.fire({
          icon: 'success',
          title: 'Felicitaciones',
          text: 'Bienvenido',
          timer: 1000,
        })
     localStorage.setItem('login_success', JSON.stringify(validUser))
     window.location.href = './notas.html'
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
          timer: 1000,
        })
     localStorage.removeItem('login_success')
     window.location.href = './index.html'
})

//----------------------------------------------------------//
