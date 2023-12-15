
const API_URL = 'https://api-dishes.vercel.app/';
const toastContentElement = document.getElementById('toastContent');
const showToastBtn = document.getElementById('showToastBtn');
const toastExample = new bootstrap.Toast(document.getElementById('customToast'));

let  dish = {}
let  dishs = []


function loadData() {
    return new Promise((resolve, reject) => {
        fetch(API_URL)
            .then(result => result.json())
            .then(result => {
                console.log(result);
                dishs = result.data;
                resolve(result);
            })
            .catch(err => reject(err));
    });
}


loadData()
    .then(result => {
        renderTable(result.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

function renderTable(data) {
    const tableBody = document.getElementById('tableBody');

    data.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${product.idDish}</td>
        <td>${product.name}</td>
        <td>${product.calories}</td>
        <td>${product.isVegetarian ? 'Sí' : 'No'}</td>
        <td>${product.value}</td>
        <td>${product.comments}</td>
        <td class="align-middle text-center"><button class="btn btn-primary" onclick="updateProduct('${product._id}')">Actualizar</button></td>
      
        <td class="align-middle text-center"><button class="btn btn-danger"  onclick="confirmDelete('${product._id}')">Eliminar</button></td>
     
        `;
        tableBody.appendChild(row);
    });
}


document.getElementById('formRegistro').addEventListener('submit', function (event) {
    event.preventDefault();

    const idDish = document.getElementById('idDish').value;
    const name = document.getElementById('platoName').value;
    const calories = document.getElementById('platoCalories').value;
    const isVegetarianSelect = document.getElementById('platoVegetariano');
    const isVegetarian = isVegetarianSelect.options[isVegetarianSelect.selectedIndex].value;
    const comments = document.getElementById('platoComments').value;
    const value = document.getElementById('platoValor').value;


    const product = {
        idDish,
        name,
        calories: parseInt(calories),
        isVegetarian,
        comments,
        value: parseFloat(value),

    };

    console.log(product);

    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => result.json())
        .then(result => {
            console.log(result);

            if (result.state === false) {

                if (result.error && result.error.errors && result.error.errors.calories) {
                    const caloriesError = result.error.errors.calories.message;
                    toastContentElement.innerText = `Error en las calorías: ${caloriesError}`;
                    toastExample.show();
                } else {
                    toastContentElement.innerText = result.error._message || 'Error en la solicitud';
                    toastExample.show();

                }

                return;
            } else {
                toastContentElement.innerText = 'Plato registrado correctamente';
                toastExample.show();
                loadData();
            }

            loadData();
            $('#addPlatoModal').modal('hide');
        }).catch(error => {
            console.error('Error:', error);
            toastContentElement.innerText = error.message;
            toastExample.show();
        });

});

function agregarboton(){

    console.log('hola');
    const boton = document.createElement('botonAgregar');
    boton.textContent = 'Agregar';

}

function confirmDelete(Dish) {
    console.log(Dish);
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

    // Asigna el idDish al botón de confirmación
    confirmDeleteBtn.dataset.idDish = Dish;

    // Muestra el nombre del plato en el modal
    const modalBody = document.getElementById('confirmDeleteModalBody');
    modalBody.textContent = `¿Estás seguro de que deseas eliminar el plato?`;

    $('#confirmDeleteModal').modal('show');
}

function deleteDish() {
    
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    const idDish = confirmDeleteBtn.dataset.idDish;

    console.log(idDish);

    fetch(`${API_URL}${idDish}`, {
        method: 'DELETE',
    }).then(result => result.json())
        .then(result => {
            console.log(result);

            if (result.state === false) {
                toastContentElement.innerText = result.error._message || 'Error en la solicitud';
                toastExample.show();
                return;
            } else {
                toastContentElement.innerText = 'Plato eliminado correctamente';
                toastExample.show();
                loadData();
            }

            $('#confirmDeleteModal').modal('hide');
        }).catch(error => {
            console.error('Error:', error);
            toastContentElement.innerText = error.message;
            toastExample.show();
        });

}



function updateProduct(product) {
    const boton = document.createElement('botonAgregar');
    boton.value = 'Actualizar';
    // Mostrar el modal de actualización
    $('#addPlatoModal').modal('show');


    dish = dishs.find(dish => dish._id === product);

    console.log(dish);

    // Asignar los valores a los campos del formulario

    document.getElementById('_id').value = _id;
    document.getElementById('idDish').value = dish.idDish;
    document.getElementById('platoName').value = dish.name;
    document.getElementById('platoCalories').value = dish.calories;
    document.getElementById('platoVegetariano').value = dish.isVegetarian;
    document.getElementById('platoComments').value = dish.comments;
    document.getElementById('platoValor').value = dish.value;


 



    


}



function getById(id){


}



document.addEventListener('DOMContentLoaded', function () {
    const showToastBtn = document.getElementById('showToastBtn');
    const toastExample = new bootstrap.Toast(document.getElementById('customToast'));


    if (showToastBtn) {
        showToastBtn.addEventListener('click', () => {
            toastContentElement.innerText = '¡Hola desde JavaScript!';
            toastExample.show();
        });
    }
});




