class createUser {
    constructor (usr) {
        this.id = usr.id
        this.user = usr.user;
        this.mail = usr.mail;
        this.pass = usr.pass;
    }    
}    

const btnLog = document.querySelector('#sig-btn');
const btnReg = document.querySelector('#reg-btn');

if(btnLog) {btnLog.addEventListener('click', logIn)};
if(btnReg) {btnReg.addEventListener('click', register)};



async function getUsers() {
    const resp = await fetch('../datos/datos.json');
    const userFile = await resp.json() || [];
    const userLocal = await JSON.parse(localStorage.getItem('users')) || [];
    return users = userLocal.length > 0 ? userLocal : userFile;
}


async function logIn(e){
    e.preventDefault();
    if(e.target.id == 'sig-btn'){
        const enteredUser = document.querySelector('#signup #sig-user').value;
        const users = await getUsers();
        const userIdx = users.findIndex(user => user.user == enteredUser)
        if(userIdx != -1){
            const enteredPass = document.querySelector('#signup #sig-pass').value;
            if(enteredPass === users[userIdx].pass){
                Swal.fire(
                    '¡Bienvenido!',
                    enteredUser,
                    'success'
                    ).then(() => location.href = './notas.html')
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Usuario o contraseña incorrectos',
                  })
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Usuario o contraseña incorrectos',
              })
        }
        
    }
}

/* --------------------------- registro de usuario -------------------------- */
async function register(e){
    e.preventDefault();
    if(e.target.id == 'reg-btn'){
        const enteredUser = document.querySelector('#register #reg-user').value;
        const users = await getUsers();
        const userIdx = users.findIndex(user => user.user == enteredUser)
        if(userIdx === -1){
            const enteredPass = document.querySelector('#register #reg-pass').value;
            const enteredMail = document.querySelector('#register #reg-email').value;
            const maxId = users.reduce((users,usr)=> users = users > usr.id ? users: usr.id,0 )
            Swal.fire(
                '¡Bienvenido!',
                enteredUser,
                'success'
                ).then(() => location.href = 'index.html')
            const newUser = {
                id: maxId + 1,
                user: enteredUser,
                mail: enteredMail,
                pass: enteredPass
            }
            users.push(new createUser(newUser));
            localStorage.setItem('users', JSON.stringify(users));
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Usuario ya existente'
              })
        }
    }
}
