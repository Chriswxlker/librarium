document.addEventListener('DOMContentLoaded', function() {
    // Detectar si estamos en la vista de inactivos o activos
    const isInactive = !!document.getElementById('authors-inactive-table');
    const tbody = document.getElementById(isInactive ? 'authors-inactive-tbody' : 'authors-tbody');
    const paginationDiv = document.getElementById('pagination');
    let currentPage = window.pageData?.page || 1;
    let totalPages = window.pageData?.totalPages || 1;

    function renderRows(authors) {
        tbody.innerHTML = authors.map(author => {
            if (isInactive) {
                return `
                <tr class="border-b border-gray-700 hover:bg-gray-700/30 transition-colors">
                    <td class="py-4 px-4">${author.id_author}</td>
                    <td class="py-4 px-4 font-medium">${author.name}</td>
                    <td class="py-4 px-4">
                        <span class="inline-flex items-center gap-1 text-red-400">
                            <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-4 w-4\" viewBox=\"0 0 20 20\" fill=\"currentColor\"><path fill-rule=\"evenodd\" d=\"M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z\" clip-rule=\"evenodd\" /></svg>
                            Inactivo
                        </span>
                    </td>
                    <td class="py-4 px-4 text-right">
                        <div class="flex justify-end gap-2">
                            <form action="/authors/activate/${author.id_author}" method="POST" class="inline-block">
                                <button type="submit" class="inline-flex items-center gap-1 bg-teal-600 hover:bg-teal-500 text-gray-900 font-medium py-1.5 px-3 rounded-md transition-colors duration-300 text-sm">
                                    <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-4 w-4\" viewBox=\"0 0 20 20\" fill=\"currentColor\"><path fill-rule=\"evenodd\" d=\"M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z\" clip-rule=\"evenodd\" /></svg>
                                    Activar
                                </button>
                            </form>
                        </div>
                    </td>
                </tr>
                `;
            } else {
                return `
                <tr class="border-b border-gray-700 hover:bg-gray-700/30 transition-colors">
                    <td class="py-3">${author.id_author}</td>
                    <td class="py-3">${author.name}</td>
                    <td class="py-3">
                        <span class="${author.state == 1 ? 'text-green-400' : 'text-red-400'}">
                            ${author.state == 1 ? 'Activo' : 'Inactivo'}
                        </span>
                    </td>
                    <td class="py-3 text-right">
                        <a href="/authors/edit/${author.id_author}" class="inline-block bg-teal-600/80 hover:bg-teal-500 text-gray-900 font-medium py-1 px-4 rounded-md transition-colors duration-300 mr-2">Editar</a>
                        <form action="/authors/deactivate/${author.id_author}" method="POST" class="inline-block">
                            <button type="submit" class="bg-gray-700 hover:bg-red-700 text-gray-300 hover:text-gray-100 font-medium py-1 px-4 rounded-md transition-colors duration-300">Desactivar</button>
                        </form>
                    </td>
                </tr>
                `;
            }
        }).join('');
    }

    // Asegura que la búsqueda funcione al cargar y al cambiar de página
    function fetchAuthors(page = 1) {
        // Solo paginación, sin búsqueda
        let url = isInactive ? `/authors/inactive?page=${page}` : `/authors?page=${page}`;
        fetch(url, { headers: { 'Accept': 'application/json' } })
            .then(res => res.json())
            .then(data => {
                renderRows(data.authors);
                renderPagination(data.page, data.totalPages);
                currentPage = data.page;
                totalPages = data.totalPages;
            });
    }

    // Corrige el paginado para que funcione con AJAX
    function renderPagination(page, totalPages) {
        if (!paginationDiv) return;
        let html = '';
        html += `<button type="button" class="px-3 py-1 rounded ${page === 1 ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-teal-600 text-gray-900 hover:bg-teal-500'}" ${page === 1 ? 'disabled' : ''} data-page="${page - 1}">Anterior</button>`;
        let start = Math.max(1, page - 2);
        let end = Math.min(totalPages, page + 2);
        if (start > 1) html += `<span class="px-2">...</span>`;
        for (let i = start; i <= end; i++) {
            html += `<button type="button" class="px-3 py-1 rounded ${i === page ? 'bg-teal-600 text-white font-bold' : 'bg-gray-700 text-gray-100 hover:bg-teal-500'}" data-page="${i}">${i}</button>`;
        }
        if (end < totalPages) html += `<span class="px-2">...</span>`;
        html += `<button type="button" class="px-3 py-1 rounded ${page === totalPages ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-teal-600 text-gray-900 hover:bg-teal-500'}" ${page === totalPages ? 'disabled' : ''} data-page="${page + 1}">Siguiente</button>`;
        paginationDiv.innerHTML = html;
        paginationDiv.querySelectorAll('button[data-page]').forEach(btn => {
            btn.addEventListener('click', function() {
                const newPage = parseInt(this.getAttribute('data-page'));
                if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
                    fetchAuthors(newPage);
                }
            });
        });
    }

    // Crear paginación dinámica si no existe
    if (!paginationDiv) {
        const pagDiv = document.createElement('div');
        pagDiv.id = 'pagination';
        pagDiv.className = 'flex justify-center items-center gap-2 mt-6';
        tbody.parentElement.appendChild(pagDiv);
    }

    // Al cargar, muestra la página actual correctamente
    fetchAuthors(currentPage);
});
