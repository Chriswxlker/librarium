document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('input[name="search"]');
    const stateSelect = document.querySelector('select[name="state"]');
    const form = searchInput.closest('form');
    const tbody = document.getElementById('authors-tbody');
    const paginationDiv = document.getElementById('pagination');
    let debounceTimeout;
    let currentPage = window.pageData?.page || 1;
    let totalPages = window.pageData?.totalPages || 1;

    function renderRows(authors) {
        tbody.innerHTML = authors.map(author => `
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
                    <form action="/authors/delete/${author.id_author}" method="POST" class="inline-block">
                        <button type="submit" class="bg-gray-700 hover:bg-red-700 text-gray-300 hover:text-gray-100 font-medium py-1 px-4 rounded-md transition-colors duration-300">Eliminar</button>
                    </form>
                </td>
            </tr>
        `).join('');
    }

    function renderPagination(page, totalPages) {
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
        // Eventos
        paginationDiv.querySelectorAll('button[data-page]').forEach(btn => {
            btn.addEventListener('click', function() {
                const newPage = parseInt(this.getAttribute('data-page'));
                if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
                    goToPage(newPage);
                }
            });
        });
    }

    function fetchAuthors(page = 1) {
        const params = new URLSearchParams(new FormData(form));
        params.set('page', page);
        fetch(`/authors?${params.toString()}`, { headers: { 'Accept': 'application/json' } })
            .then(res => res.json())
            .then(data => {
                renderRows(data.authors);
                renderPagination(data.page, data.totalPages);
                currentPage = data.page;
                totalPages = data.totalPages;
            });
    }

    function goToPage(page) {
        fetchAuthors(page);
    }

    searchInput.addEventListener('input', function() {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => fetchAuthors(1), 400);
    });
    stateSelect.addEventListener('change', function() {
        fetchAuthors(1);
    });

    // Inicializar paginación al cargar
    renderPagination(currentPage, totalPages);
});
