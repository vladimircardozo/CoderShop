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

// const Interaccion = () => {
//     const productosSeleccionados = [];
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

// Interaccion();