// books-list.js
// AJAX paginación y búsqueda para libros

document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-books');
    const tableContainer = document.getElementById('books-table')?.parentElement;
    const paginationContainer = document.querySelector('.pagination-books');

    function fetchBooks(page = 1, search = '') {
        let url = `/books?page=${page}`;
        if (search) url += `&search=${encodeURIComponent(search)}`;
        fetch(url, { headers: { 'X-Requested-With': 'XMLHttpRequest' } })
            .then(res => res.text())
            .then(html => {
                // Extraer solo la tabla y paginación del HTML
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const newTable = doc.getElementById('books-table')?.parentElement;
                const newPagination = doc.querySelector('.pagination-books');
                if (newTable && tableContainer) tableContainer.innerHTML = newTable.innerHTML;
                if (newPagination && paginationContainer) paginationContainer.innerHTML = newPagination.innerHTML;
            });
    }

    if (searchInput) {
        searchInput.addEventListener('input', function () {
            fetchBooks(1, searchInput.value);
        });
    }

    if (paginationContainer) {
        paginationContainer.addEventListener('click', function (e) {
            if (e.target.tagName === 'A') {
                e.preventDefault();
                const url = new URL(e.target.href);
                const page = url.searchParams.get('page') || 1;
                const search = searchInput ? searchInput.value : '';
                fetchBooks(page, search);
            }
        });
    }
});
