    document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("miModal");
    const iframe = document.getElementById("miIframe");
    const closeBtn = document.querySelector(".close");
    const contenedorProyectos = document.getElementById("contenedorProyectos");

    // Función para abrir modal
    function abrirModal(url) {
        iframe.src = url;
        modal.style.display = "block";
    }

    // Función para cerrar modal
    function cerrarModal() {
        iframe.src = "";
        modal.style.display = "none";
    }

    // Evento cerrar
    closeBtn.onclick = cerrarModal;
    window.onclick = function (event) {
        if (event.target === modal) {
        cerrarModal();
        }
    };

    // Cargar proyectos desde JSON
    fetch("assets/js/proyectos.json")
    .then(response => response.json())
    .then(data => {
        console.log("Datos cargados:", data); // Verifica los datos

        const contenedorProyectos = document.getElementById("contenedorProyectos");

        data.proyectos.forEach((proyecto, index) => {
        // Crear la columna
        const col = document.createElement("div");
        col.className = "col-md-4 mb-4";

        // Crear la tarjeta
        col.innerHTML = `
        <div class="card h-100">
            <img src="${proyecto.imagen}" class="card-img-top" alt="${proyecto.nombre}">
            <div class="card-body">
                <h5 class="card-title">${proyecto.nombre}</h5>
                <p class="card-text">${proyecto.descripcion}</p>
                <button class="btn btn-primary abrirModalBtn" data-url="${proyecto.url}">Ver Proyecto</button>
            </div>
        </div>
        `;

        // Insertar la tarjeta en el contenedor
        contenedorProyectos.appendChild(col);
        });

        // Agregar eventos a los botones
        document.querySelectorAll(".abrirModalBtn").forEach(btn => {
        btn.addEventListener("click", function () {
            const url = this.getAttribute("data-url");
            document.getElementById("miIframe").src = url;
            document.getElementById("miModal").style.display = "block";
        });
        });
    })
    .catch(error => {
        console.error("Error al cargar proyectos:", error);
    })})