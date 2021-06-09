// Devolver el usuario
const getUser = () => {
        fetch('http://localhost:3000/api/user', {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            }).then(res => res.json())
            .then(data => {
                // console.log(data)
                document.querySelector('.name').innerHTML = data.user.name
            }).catch(err => console.log(err))
    }
    // Devolver la lista de los items
const getItems = () => {
    let table = document.querySelector('.table');
    fetch('http://localhost:3000/api/get-proyectos')
        .then(res => res.json())
        .then(items => {
            // console.log("Items", items)
            items.projects.map((item, i) => {
                let tr = document.createElement('tr');
                tr.className = 'item';
                tr.innerHTML = `
                    <tr >
                    <td>${i+1}</td>
                        <td>${item.title}</td>
                        <td>${item.description}</td>
                        <td>${item.author}</td>
                        <td value="${item._id}" class="delete-item"><i class="fas fa-trash-alt"></i></td>
                    </tr>
                    `
                table.appendChild(tr);
            })
            deleteItem();
        }).catch(err => console.log(err))
}

// Esta funcion nos ayuda para trabajar con el formulario para crear un nuevo item para la lista 
const saveItem = () => {
        // Llamamos a la clase add que es un boton para que aparezca el formulario
        const add = document.querySelector('.add');
        // Llamamos a la clase padre del formulario de crear una lista 
        const addForm = document.querySelector('.add-list-container');

        // Llamamos a la clase  close para cerrar el formulario
        const closeList = document.querySelector('.close');

        // llamamos el boton para luego capturar la informacion del formulario
        const addList = document.querySelector('.addList');

        // Hacer que aparezca el formulario para crear una nueva lista
        add.addEventListener('click', () => {
                addForm.style.display = 'block';
            })
            // Cerrar el formulario 
        closeList.addEventListener('click', () => {
                addForm.style.display = 'none';
            })
            // Capturar la informacion de los input
        addList.addEventListener('click', () => {
            const title = document.querySelector('.title').value;
            const description = document.querySelector('.description').value;
            const data = {
                title,
                description
            };
            console.log(data)
            fetch('http://localhost:3000/api/guardar-proyecto', {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: localStorage.getItem('token')
                    },
                    body: JSON.stringify(data)
                })
                .then(res => res.json())
                .then(item => {
                    // console.log(item)
                    if (item) {
                        window.location.reload();
                    }
                }).catch(err => console.log(err))

        })
    }
    // Esta funcion nos ayudara a eliminar un item de la lista
deleteItem = () => {
    const delItem = document.querySelectorAll('.delete-item')
    if (delItem) {
        // console.log(delItem);
        delItem.forEach(item => {
            item.addEventListener('click', () => {
                // console.log(item.getAttribute('value'))
                fetch('http://localhost:3000/api/borrar-proyecto/' + item.getAttribute('value'), {
                        method: 'DELETE',
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: localStorage.getItem('token')
                        }
                    }).then(res => res.json())
                    .then(item => {
                        if (item) {
                            window.location.reload();
                        }
                    }).catch(err => console.log(err))
            })
        })
    }

};

// Funcion que nos permite cerrar sesion
const logout = () => {
    const btnLogout = document.querySelector('.btn-logout');
    btnLogout.addEventListener('click', () => {
        localStorage.clear();
        window.location.href = './login.html';
    })



}
getUser();
getItems();
saveItem();
logout();