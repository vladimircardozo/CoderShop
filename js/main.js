// const productos = {
//     "1": { nombre: "Apple iPhone 13 Pro Max new green finishes", precio: 480 },
//     "2": { nombre: "Apple iPhone 14 Pro Max Price in Bangladesh", precio: 599 },
//     "3": { nombre: "Apple IPhone 15 Pro Max Natural Titanium", precio: 700 },
//     "4": { nombre: "MacBook Pro 14″ M1 Max 10-C CPU 24-C GPU", precio: 1230 },
//     "5": { nombre: "MacBook Pro 16″ M1 Max 10-C CPU, 32-C GPU, 32GB Unified, 1TB", precio: 1500 },
//     "6": { nombre: "(CUSTOM) MacBook Air M1 8-C CPU, 8-C GPU", precio: 1700 }
// };

// const calcularTotal = (productosSeleccionados) => {
//     let total = 0;
//     productosSeleccionados.forEach((item) => {
//         total += productos[item.id].precio * item.cantidad;
//     });
//     return total;
// };

// const construirMenu = () => {
//     let menu = "=== Menú de opciones ===\n";
//     for (let key in productos) {
//         menu += `${key}. ${productos[key].nombre} - $${productos[key].precio}\n`;
//     }
//     menu += "0. Salir";
//     return menu;
// };

// const guardarSeleccion = (productosSeleccionados) => {
//     window.localStorage.setItem(`productosSeleccionados`, JSON.stringify(productosSeleccionados));
// };

// const cargarSeleccion = () => {
//     return JSON.parse(window.localStorage.getItem(`productosSeleccionados`));
// };

// const Interaccion = () => {
//     const productosSeleccionados = cargarSeleccion ();
//     const menu = construirMenu();

//     do {
//         const opcion = prompt(`${menu}\n`);

//         if (opcion === "0") {
//             break;
//         } else if (productos[opcion]) {
//             const productoExistente = productosSeleccionados.find(item => item.id === opcion);
//             if (productoExistente) {
//                 productoExistente.cantidad += 1;
//             } else {
//                 productosSeleccionados.push({ id: opcion, cantidad: 1 });
//             }
//             alert(`Producto seleccionado: ${productos[opcion].nombre}`);
//         } else {
//             alert("Opción inválida. Por favor, ingrese un número de producto válido.");
//         }
//     } while (true);

//     const totalAPagar = calcularTotal(productosSeleccionados);
//     let resumen = "Productos seleccionados:\n";
//     productosSeleccionados.forEach((item) => {
//         resumen += `${productos[item.id].nombre} - Cantidad: ${item.cantidad} - Subtotal: $${productos[item.id].precio * item.cantidad}\n`;
//     });
//     resumen += `Total a pagar: $${totalAPagar}`;
//     alert(resumen);
// };

// const main = () => {
//     const db = {
//         products: JSON.parse(window.localStorage.getItem("productos")) || productos,
//         cart: JSON.parse(window.localStorage.getItem("productosSeleccionados")) || []
//     }
//     Interaccion();
// };

// main();

document.addEventListener("DOMContentLoaded", () => {
    const productos = {
        "1": { nombre: "Apple iPhone 13 Pro Max new green finishes", precio: 480, img: "./img/iPhone13.png" },
        "2": { nombre: "Apple iPhone 14 Pro Max Price in Bangladesh", precio: 599, img: "./img/iphone14.png" },
        "3": { nombre: "Apple IPhone 15 Pro Max Natural Titanium", precio: 700, img: "./img/iphone15.png" },
        "4": { nombre: "MacBook Pro 14″ M1 Max 10-C CPU 24-C GPU", precio: 1230, img: "./img/macbook1.png" },
        "5": { nombre: "MacBook Pro 16″ M1 Max 10-C CPU, 32-C GPU, 32GB Unified, 1TB", precio: 1500, img: "./img/macbook2.png" },
        "6": { nombre: "(CUSTOM) MacBook Air M1 8-C CPU, 8-C GPU", precio: 1700, img: "./img/macbook3.png" }
    };

    const productContainer = document.getElementById("productos-container");

    const renderProducts = () => {
        productContainer.innerHTML = "";

        for (const id in productos) {
            const product = productos[id];
            const productCard = `
                <div class="col mb-4">
                    <div class="card custom-card">
                        <img src="${product.img}" alt="${product.nombre}" class="card-img-top mb-3">
                        <div class="card-body">
                            <h5 class="card-title mb-0">${product.nombre}</h5>
                        </div>
                        <div class="card-body d-flex justify-content-around">
                            <p class="fs-3 fw-bold mb-0">$${product.precio}</p>
                            <button class="btn btn-outline-light" data-id="${id}">Agregar al carrito</button>
                        </div>
                    </div>
                </div>
            `;
            productContainer.insertAdjacentHTML("beforeend", productCard);
        }

        document.querySelectorAll(".btn-outline-light").forEach(button => {
            button.addEventListener("click", addToCart);
        });
    };

    const addToCart = (event) => {
        const productId = event.target.getAttribute("data-id");
        let cart = JSON.parse(localStorage.getItem("productosSeleccionados")) || [];
        const existingProduct = cart.find(item => item.id === productId);

        if (existingProduct) {
            existingProduct.cantidad += 1;
        } else {
            cart.push({ id: productId, cantidad: 1 });
        }

        localStorage.setItem("productosSeleccionados", JSON.stringify(cart));
    };

    renderProducts();
});