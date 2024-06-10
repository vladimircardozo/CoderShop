document.addEventListener("DOMContentLoaded", () => {
    const productos = {
        "1": { nombre: "Apple iPhone 13 Pro Max new green finishes", precio: 480, img: "./img/iPhone13.png" },
        "2": { nombre: "Apple iPhone 14 Pro Max Price in Bangladesh", precio: 599, img: "./img/iphone14.png" },
        "3": { nombre: "Apple IPhone 15 Pro Max Natural Titanium", precio: 700, img: "./img/iphone15.png" },
        "4": { nombre: "MacBook Pro 14″ M1 Max 10-C CPU 24-C GPU", precio: 1230, img: "./img/macbook1.png" },
        "5": { nombre: "MacBook Pro 16″ M1 Max 10-C CPU, 32-C GPU, 32GB Unified, 1TB", precio: 1500, img: "./img/macbook2.png" },
        "6": { nombre: "(CUSTOM) MacBook Air M1 8-C CPU, 8-C GPU", precio: 1700, img: "./img/macbook3.png" }
    };

    const contenedorProductos = document.getElementById("productos-container");

    const renderizarProductos = () => {
        contenedorProductos.innerHTML = "";

        for (const id in productos) {
            const producto = productos[id];
            const tarjetaProducto = `
                <div class="col mb-4">
                    <div class="card custom-card">
                        <img src="${producto.img}" alt="${producto.nombre}" class="card-img-top mb-3">
                        <div class="card-body">
                            <h5 class="card-title mb-0">${producto.nombre}</h5>
                        </div>
                        <div class="card-body d-flex justify-content-around">
                            <p class="fs-3 fw-bold mb-0">$${producto.precio}</p>
                            <button class="btn btn-outline-light" data-id="${id}">Agregar al carrito</button>
                        </div>
                    </div>
                </div>
            `;
            contenedorProductos.insertAdjacentHTML("beforeend", tarjetaProducto);
        }

        document.querySelectorAll(".btn-outline-light").forEach(boton => {
            boton.addEventListener("click", agregarAlCarrito);
        });
    };

    const agregarAlCarrito = (event) => {
        const productoId = event.target.getAttribute("data-id");
        let carrito = JSON.parse(localStorage.getItem("productosSeleccionados")) || [];
        const productoExistente = carrito.find(item => item.id === productoId);

        if (productoExistente) {
            productoExistente.cantidad += 1;
        } else {
            carrito = [...carrito, { id: productoId, cantidad: 1 }];
        }

        localStorage.setItem("productosSeleccionados", JSON.stringify(carrito));
        
        actualizarVisualizacionCarrito().then(() => {
            Toastify({
                text: "Producto agregado al carrito",
                className: "info",
                style: {
                    background: "rgb(47, 47, 70)",
                },
                duration: 3000
            }).showToast();
        });
    };

    const eliminarDelCarrito = (productoId) => {
        let carrito = JSON.parse(localStorage.getItem("productosSeleccionados")) || [];
        carrito = carrito.filter(item => item.id !== productoId);
        localStorage.setItem("productosSeleccionados", JSON.stringify(carrito));
        actualizarVisualizacionCarrito();
    };

    const actualizarVisualizacionCarrito = () => {
        return new Promise((resolve) => {
            const carrito = JSON.parse(localStorage.getItem("productosSeleccionados")) || [];
            const contenedorProductosCompra = document.getElementById("productosCompra");
            const totalElemento = document.getElementById("total");

            contenedorProductosCompra.innerHTML = "";
            let total = 0;

            carrito.forEach(item => {
                const producto = productos[item.id];
                total += producto.precio * item.cantidad;

                const itemCarrito = `
                    <div>
                        <div class="img">
                            <img src="${producto.img}" alt="${producto.nombre}">
                            <span>${producto.nombre}</span>
                        </div>
                        <div>
                            <span>${item.cantidad} x $${producto.precio}</span>
                            <button class="btn-remover" data-id="${item.id}">x</button>
                        </div>
                    </div>
                `;
                contenedorProductosCompra.insertAdjacentHTML("beforeend", itemCarrito);
            });

            totalElemento.innerHTML = `Total: $${total}`;

            document.querySelectorAll(".btn-remover").forEach(boton => {
                boton.addEventListener("click", (e) => {
                    const productoId = e.target.getAttribute("data-id");
                    eliminarDelCarrito(productoId);
                });
            });

            resolve();
        });
    };

    renderizarProductos();
    actualizarVisualizacionCarrito();

    const iconoCarrito = document.getElementById("carritoIcono");
    const contenedorCompra = document.getElementById("contenedorCompra");
    const botonCerrar = document.getElementById("x");

    iconoCarrito.addEventListener("click", (e) => {
        e.preventDefault();
        contenedorCompra.style.display = "flex";
    });

    botonCerrar.addEventListener("click", () => {
        contenedorCompra.style.display = "none";
    });
});
