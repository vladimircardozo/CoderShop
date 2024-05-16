//* simulador interactivo
/*const productos = {
    "1": { nombre: "Apple iPhone 13 Pro Max new green finishes", precio: 480 },
    "2": { nombre: "Apple iPhone 14 Pro Max Price in Bangladesh", precio: 599 },
    "3": { nombre: "Apple IPhone 15 Pro Max Natural Titanium", precio: 700 },
    "4": { nombre: "MacBook Pro 14″ M1 Max 10-C CPU 24-C GPU", precio: 1230 },
    "5": { nombre: "MacBook Pro 16″ M1 Max 10-C CPU, 32-C GPU, 32GB Unified, 1TB", precio: 1500 },
    "6": { nombre: "(CUSTOM) MacBook Air M1 8-C CPU, 8-C GPU", precio: 1700 }
};

const calcularTotal = (productosSeleccionados) => {
    let total = 0;
    for (let producto in productosSeleccionados) {
        total += productos[producto].precio * productosSeleccionados[producto];
    }
    return total;
};

const mostrarMenu = () => {
    console.log("=== Menú de opciones ===");
    for (let key in productos) {
        console.log(`${key}. ${productos[key].nombre} - $${productos[key].precio}`);
    }
    console.log("0. Salir");
}

const Interaccion = () => {
    const productosSeleccionados = {};

    do {
        mostrarMenu();
        const opcion = prompt("Ingrese el número del producto que desea comprar (0 para salir):");

        if (opcion === "0") {
            break;
        } else if (productos[opcion]) {
            productosSeleccionados[opcion] = (productosSeleccionados[opcion] || 0) + 1;
            console.log(`Producto seleccionado: ${productos[opcion].nombre}`);
        } else {
            console.log("Opción inválida. Por favor, ingrese un número de producto válido.");
        }
    } while (true);

    const totalAPagar = calcularTotal(productosSeleccionados);
    console.log(`Total a pagar: $${totalAPagar}`);
};

Interaccion();*/