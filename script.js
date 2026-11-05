// Referencias a los elementos del DOM
const btnCrear = document.getElementById("btnCrear");
const btnDescargar = document.getElementById("btnDescargar");
const btnSlice = document.getElementById("btnSlice");
const resultado = document.getElementById("resultado");

// Variable global donde guardamos el Blob creado
let miBlob = null;

// Texto de ejemplo que usaremos para crear el Blob
const textoEjemplo =
  "Este es un archivo de texto generado dinámicamente utilizando el objeto Blob de JavaScript. " +
  "Los Blobs permiten representar datos binarios o de texto de forma inmutable dentro del navegador.";

// 1) CREAR BLOB DE TEXTO
btnCrear.addEventListener("click", () => {
  // Creamos el Blob indicando el contenido y su tipo MIME
  miBlob = new Blob([textoEjemplo], { type: "text/plain" });

  resultado.innerHTML = `
    <strong>Blob creado correctamente:</strong>
    Tamaño: ${miBlob.size} bytes
    Tipo: ${miBlob.type}
  `;
});

// 2) DESCARGAR BLOB
btnDescargar.addEventListener("click", () => {
  if (!miBlob) {
    resultado.textContent = "Primero debes crear el Blob de texto.";
    return;
  }

  // Creamos una URL temporal que apunta al Blob en memoria
  const url = URL.createObjectURL(miBlob);

  // Creamos un enlace <a> invisible para forzar la descarga
  const enlace = document.createElement("a");
  enlace.href = url;
  enlace.download = "archivo_generado.txt";
  document.body.appendChild(enlace);
  enlace.click();
  document.body.removeChild(enlace);

  // Liberamos la URL temporal de la memoria
  URL.revokeObjectURL(url);

  resultado.innerHTML = `<strong>Descarga iniciada:</strong> archivo_generado.txt`;
});

// 3) USAR SLICE()
btnSlice.addEventListener("click", () => {
  if (!miBlob) {
    resultado.textContent = "Primero debes crear el Blob de texto.";
    return;
  }

  // slice(inicio, fin, tipo) crea un nuevo Blob con una porción del original
  const blobParcial = miBlob.slice(0, 30, "text/plain");

  // Usamos FileReader para leer el contenido del Blob parcial como texto
  const lector = new FileReader();

  lector.onload = (e) => {
    resultado.innerHTML = `
      <strong>Blob original (${miBlob.size} bytes)</strong> dividido con slice(0, 30):

      <strong>Fragmento obtenido (${blobParcial.size} bytes):</strong>
      "${e.target.result}"
    `;
  };

  lector.readAsText(blobParcial);
});
