// Haciendo el login
const login = () => {
    const btnLogin = document.querySelector('.btn-login');
    btnLogin.addEventListener('click', () => {

        const email = document.querySelector('.email').value;
        const password = document.querySelector('.password').value;
        const data = { email, password }
            // console.log(data)
        fetch('http://localhost:3000/api/login', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(user => {
                if (user) {
                    // alert("Usuario logeado")
                    console.log(user)
                    if (user.token) {
                        localStorage.setItem('token', user.token)
                        if (localStorage.getItem('token')) {
                            window.location.href = "./index.html"

                        }
                    } else {
                        alert("Correo o contraseña incorrectas")
                    }


                }

            }).catch(err => console.log(err))
    })
};

login();