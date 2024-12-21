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



let carrito = [];
let totalCarrito = 0;

// Cargar el carrito desde localStorage al iniciar
function cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        totalCarrito = carrito.reduce((total, producto) => total + (producto.amount * producto.quantity), 0);
        actualizarCarrito();
    }
}

function agregarAlCarrito(event) {
    const button = event.target; 
    const productoCard = button.closest('.producto-card'); 
    const index = productoCard.getAttribute('data-index'); 

    const productoSeleccionado = {
        name: productos[index].name,
        description: productos[index].description,
        amount: productos[index].amount,
        quantity: 1 // Agregamos una propiedad para la cantidad
    };

    // Verificamos si el producto ya está en el carrito
    const productoExistente = carrito.find(producto => producto.name === productoSeleccionado.name);
    if (productoExistente) {
        // Si existe, aumentamos la cantidad
        productoExistente.quantity++;
        totalCarrito += productoExistente.amount; // Aumentamos el total
    } else {
        // Si no existe, lo agregamos al carrito
        carrito.push(productoSeleccionado);
        totalCarrito += productoSeleccionado.amount; 
    }

    actualizarCarrito();
}

function aumentarCantidad(producto) {
    producto.quantity++;
    totalCarrito += producto.amount; // Aumentamos el total
    actualizarCarrito();
}

function disminuirCantidad(producto) {
    if (producto.quantity > 1) {
        producto.quantity--;
        totalCarrito -= producto.amount; // Disminuimos el total
    } else {
        eliminarProducto(producto);
    }
    actualizarCarrito();
}

function eliminarProducto(producto) {
    carrito = carrito.filter(item => item.name !== producto.name);
    totalCarrito -= producto.amount; // Disminuimos el total
    actualizarCarrito();
}

function actualizarCarrito() {
    const carritoContainer = document.getElementById('carrito'); 
    carritoContainer.innerHTML = ''; 
    
    carrito.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.textContent = `${producto.name} - $${producto.amount.toFixed(2)} (Cantidad: ${producto.quantity})`;

        // Botón para aumentar cantidad
        const btnAumentar = document.createElement('button');
        btnAumentar.textContent = '+';
        btnAumentar.classList.add('carrito-boton'); // Agregar clase
        btnAumentar.addEventListener('click', () => aumentarCantidad(producto));
        productoDiv.appendChild(btnAumentar);

        // Botón para disminuir cantidad
        const btnDisminuir = document.createElement('button');
        btnDisminuir.textContent = '-';
        btnDisminuir.classList.add('carrito-boton'); // Agregar clase
        btnDisminuir.addEventListener('click', () => disminuirCantidad(producto));
        productoDiv.appendChild(btnDisminuir);

        // Botón para eliminar producto
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.classList.add('carrito-boton'); // Agregar clase
        btnEliminar.addEventListener('click', () => eliminarProducto(producto));
        productoDiv.appendChild(btnEliminar);

        carritoContainer.appendChild(productoDiv);
    });

    const totalDiv = document.getElementById('total-carrito');
    totalDiv.textContent = `Total del carrito: $${totalCarrito.toFixed(2)}`;

    // Guardar el carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

    const totalDiv = document.getElementById('total-carrito');
    totalDiv.textContent = `Total del carrito: $${totalCarrito.toFixed(2)}`;

    // Guardar el carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));


// Cargar el carrito al iniciar
cargarCarrito();

const botonesComprar = document.querySelectorAll('.Compra');
botonesComprar.forEach(button => {
    button.addEventListener('click', agregarAlCarrito);
});

    async function fetchExtras() {
        const url = 'https://fakestoreapi.com/products';

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Error al obtener los productos');
            }

            const products = await response.json();
            displayProducts(products.slice(0, 3)); // Mostrar solo los primeros 3 productos
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function fetchProducts() {
        const url = 'https://fakestoreapi.com/products';

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Error al obtener los productos');
            }

            const products = await response.json();
            displayProducts(products.slice(0, 3)); // Mostrar solo los primeros 3 productos
        } catch (error) {
            console.error('Error:', error);
        }
    }

    function displayProducts(products) {
        const extrasContainer = document.getElementById('extras-container');
        extrasContainer.innerHTML = ''; // Limpiar productos anteriores

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('producto-card');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>${product.description.substring(0, 60)}...</p>
                <p>Precio: $${product.price}</p>
                <button class="Compra">Comprar</button>
                <button class="Description">Ver más</button>
            `;
            extrasContainer.appendChild(productCard);
        });
    }

    // Llama a la función para obtener productos al cargar la página
    window.onload = fetchProducts;