// Guardar el usuario
const save = () => {
    const register = document.querySelector('.btn-register');
    register.addEventListener('click', () => {
        const name = document.querySelector('.name').value;
        const email = document.querySelector('.email').value;
        const password = document.querySelector('.password').value;
        const data = {
                email,
                name,
                password
            }
            // Hacer una peticion a nuestro servidor para almacenar nuestro usuario
        fetch('http://localhost:3000/api/register', {
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
                    alert("Usuario creado correctamente")
                    window.location.href = "./login.html"

                }
            }).catch(err => console.log(err))
    })
}


save();