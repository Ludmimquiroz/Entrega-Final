const productos = [
    {
        name: "Producto 1",
        description: "Descripción del producto 1",
        amount: 10.99
    },
    {
        name: "Producto 2",
        description: "Descripción del producto 2",
        amount: 15.49
    },
    {
        name: "Producto 3",
        description: "Descripción del producto 3",
        amount: 7.99
    }
];

let carrito = [];
let totalCarrito = 0;

productos.forEach(producto => {
    console.log(`Nombre: ${producto.name}`);
    console.log(`Descripción: ${producto.description}`);
    console.log(`Precio: $${producto.amount}`);
});

function agregarDescripcion(event) {
    const button = event.target; // El botón que fue clickeado
    const productoCard = button.closest('.producto-card'); // Encontrar la tarjeta del producto
    const index = productoCard.getAttribute('data-index'); // Obtener el índice del producto
    const descripcionContainer = productoCard.querySelector('.descripcion-ampliada'); // Contenedor para la descripción ampliada

    // Verificar si ya se ha agregado la descripción
    if (descripcionContainer.innerHTML === "") {
        const descripcionAmpliada = document.createElement('p');
        descripcionAmpliada.textContent = productos[index].description; // Obtener la descripción del producto
        descripcionContainer.appendChild(descripcionAmpliada); // Agregar la descripción al contenedor
    } else {
        // Si ya existe, puedes optar por eliminarla o mostrar un mensaje
        alert("La descripción ya está visible.");
    }
}

// Agregar eventos a los botones "Ver más"
const botonesVerMas = document.querySelectorAll('.Description');
botonesVerMas.forEach(button => {
    button.addEventListener('click', agregarDescripcion);
});



function agregarAlCarrito(event) {
    const button = event.target; // El botón que fue clickeado
    const productoCard = button.closest('.producto-card'); // Encontrar la tarjeta del producto
    const index = productoCard.getAttribute('data-index'); // Obtener el índice del producto

    // Crear un objeto del producto a agregar al carrito
    const productoSeleccionado = {
        name: productos[index].name,
        description: productos[index].description,
        amount: productos[index].amount
    };

    // Agregar el producto al carrito
    carrito.push(productoSeleccionado);
    totalCarrito += productoSeleccionado.amount; // Sumar el precio al total

    // Actualizar la visualización del carrito
    actualizarCarrito();
}

// Función para actualizar la visualización del carrito
function actualizarCarrito() {
    const carritoContainer = document.getElementById('carrito'); // Contenedor del carrito
    carritoContainer.innerHTML = ''; // Limpiar el contenedor

    // Mostrar cada producto en el carrito
    carrito.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.textContent = `${producto.name} - $${producto.amount.toFixed(2)}`;
        carritoContainer.appendChild(productoDiv);
    });

    // Mostrar el total del carrito
    const totalDiv = document.getElementById('total-carrito');
    totalDiv.textContent = `Total del carrito: $${totalCarrito.toFixed(2)}`;
}

const botonesComprar = document.querySelectorAll('.Compra');
botonesComprar.forEach(button => {
    button.addEventListener('click', agregarAlCarrito);
});