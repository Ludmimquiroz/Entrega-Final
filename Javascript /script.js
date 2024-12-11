const productos = [
    {
        name: "Producto 1",
        description: "Descripción ampliada del producto 1",
        amount: 10.99
    },
    {
        name: "Producto 2",
        description: "Descripción ampliada del producto 2",
        amount: 15.49
    },
    {
        name: "Producto 3",
        description: "Descripción ampliada del producto 3",
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
    const button = event.target; 
    const productoCard = button.closest('.producto-card'); 
    const index = productoCard.getAttribute('data-index'); 
    const descripcionContainer = productoCard.querySelector('.descripcion-ampliada'); 

    
    if (descripcionContainer.innerHTML === "") {
        const descripcionAmpliada = document.createElement('p');
        descripcionAmpliada.textContent = productos[index].description; 
        descripcionContainer.appendChild(descripcionAmpliada); 
    } else {

        alert("La descripción ya está visible.");
    }
}


const botonesVerMas = document.querySelectorAll('.Description');
botonesVerMas.forEach(button => {
    button.addEventListener('click', agregarDescripcion);
});



function agregarAlCarrito(event) {
    const button = event.target; 
    const productoCard = button.closest('.producto-card'); 
    const index = productoCard.getAttribute('data-index'); 

    
    const productoSeleccionado = {
        name: productos[index].name,
        description: productos[index].description,
        amount: productos[index].amount
    };

    
    carrito.push(productoSeleccionado);
    totalCarrito += productoSeleccionado.amount; 

    
    actualizarCarrito();
}


function actualizarCarrito() {
    const carritoContainer = document.getElementById('carrito'); 
    carritoContainer.innerHTML = ''; 
    
    carrito.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.textContent = `${producto.name} - $${producto.amount.toFixed(2)}`;
        carritoContainer.appendChild(productoDiv);
    });

    
    const totalDiv = document.getElementById('total-carrito');
    totalDiv.textContent = `Total del carrito: $${totalCarrito.toFixed(2)}`;
}

const botonesComprar = document.querySelectorAll('.Compra');
botonesComprar.forEach(button => {
    button.addEventListener('click', agregarAlCarrito);
});