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

    const carritoIcono = document.getElementById("carritoIcono");
    const contenedorCompra = document.getElementById("contenedorCompra");
    const botonCerrar = document.getElementById("x");
    
    carritoIcono.addEventListener("click", (e) => {
        e.preventDefault();
        contenedorCompra.style.display = "flex";
    });

    botonCerrar.addEventListener("click", () => {
        contenedorCompra.style.display = "none";
    });
});