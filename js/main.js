document.addEventListener("DOMContentLoaded", () => {
    fetch('./productos.json')
        .then(response => response.json())
        .then(productos => {
            const contenedorProductos = document.getElementById("productos-container");

            const renderizarProductos = () => {
                contenedorProductos.innerHTML = "";

                productos.forEach(producto => {
                    const tarjetaProducto = `
                        <div class="col mb-4">
                            <div class="card custom-card">
                                <img src="${producto.imagen}" alt="${producto.nombre}" class="card-img-top mb-3">
                                <div class="card-body">
                                    <h5 class="card-title mb-0">${producto.nombre}</h5>
                                </div>
                                <div class="card-body d-flex justify-content-around">
                                    <p class="fs-3 fw-bold mb-0">$${producto.precio}</p>
                                    <button class="btn btn-outline-light" data-id="${producto.id_producto}">Agregar al carrito</button>
                                </div>
                            </div>
                        </div>
                    `;
                    contenedorProductos.insertAdjacentHTML("beforeend", tarjetaProducto);
                });

                document.querySelectorAll(".btn-outline-light").forEach(boton => {
                    boton.addEventListener("click", agregarAlCarrito);
                });
            };

            const agregarAlCarrito = (event) => {
                const productoId = event.target.getAttribute("data-id");
                let carrito = JSON.parse(localStorage.getItem("productosSeleccionados")) || [];
                const productoExistente = carrito.find(item => item.id == productoId);

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
                carrito = carrito.filter(item => item.id != productoId);
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
                        const producto = productos.find(p => p.id_producto == item.id);
                        total += producto.precio * item.cantidad;

                        const itemCarrito = `
                            <div>
                                <div class="img">
                                    <img src="${producto.imagen}" alt="${producto.nombre}">
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
        })
        .catch(error => console.error('Error al cargar el JSON de productos:', error));
});
