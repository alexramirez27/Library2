// view.js

class View {
    #cancelBtnListener() {
        const dialog = document.querySelector('dialog');
        const form = dialog.querySelector('form');
        const cancelBtn = dialog.querySelector('.cancel-btn');

        cancelBtn.addEventListener("click", () => {
            form.reset();
            dialog.close();
            const errors = document.querySelectorAll('.error');
            errors.forEach(error => {
                error.className = 'valid';
            });
        });
    }

    #openModal() {
        const dialog = document.querySelector("dialog");
        const form = dialog.querySelector('form');
        dialog.showModal();

        dialog.addEventListener("click", e => {
            const dialogDimensions = dialog.getBoundingClientRect();
            if (
                e.clientX < dialogDimensions.left ||
                e.clientX > dialogDimensions.right ||
                e.clientY < dialogDimensions.top ||
                e.clientY > dialogDimensions.bottom
            ) {
                form.reset();
                dialog.close();
                const errors = document.querySelectorAll('.error');
                errors.forEach(error => {
                    error.className = 'valid';
                });
            }
        });
    }

    addTableRow(book) {
        const tbody = document.querySelector("tbody");
        const tr = document.createElement("tr");
        tbody.appendChild(tr);

        const id = document.createElement("td");
        id.textContent = book.id
        tr.setAttribute("data-row-id", id.textContent);
        tr.appendChild(id);

        const title = document.createElement("td");
        title.textContent = book.title
        tr.appendChild(title);

        const author = document.createElement("td");
        author.textContent = book.author
        tr.appendChild(author);

        const pages = document.createElement("td");
        pages.textContent = book.pages
        tr.appendChild(pages);

        const readTd = document.createElement("td");
        const readBtn = document.createElement("button");
        readBtn.classList = "toggle-read";

        readTd.appendChild(readBtn);
        book.read === true ? readBtn.textContent = "true" : readBtn.textContent = "false";

        readBtn.addEventListener("click", () => {
            readBtn.textContent === "true" ? readBtn.textContent = "false" : readBtn.textContent = "true";
        });

        tr.appendChild(readTd);

        const removeBtnTd = document.createElement("td");
        const removeBtn = document.createElement("button");
        removeBtnTd.appendChild(removeBtn);
        removeBtn.classList = "remove-btn";
        removeBtn.textContent = "Remove Book";
        tr.appendChild(removeBtnTd);

        activateRemoveButton(removeBtn);
    }

    displayTableBody(library, saveToLocalStorage) {
        const tbody = document.querySelector('tbody');
        tbody.textContent = '';

        for (const book of library.library) {
            const tr = document.createElement('tr');
            tr.dataset.bookId = book.id;

            const tdTitle = document.createElement('td');
            tdTitle.textContent = book.title;

            const tdAuthor = document.createElement('td');
            tdAuthor.textContent = book.author;

            const tdPages = document.createElement('td');
            tdPages.textContent = book.pages;

            const tdRead = document.createElement('td');

            const readBtn = document.createElement('button');
            readBtn.textContent = book.read ? 'Yes' : 'No';
            readBtn.addEventListener('click', () => {
                book.read = !book.read;
                readBtn.textContent = book.read ? "Yes" : "No";
                saveToLocalStorage();
            });

            tdRead.appendChild(readBtn);

            const tdRemove = document.createElement('td');
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove Book';

            removeBtn.addEventListener('click', () => {
                library.removeBookFromLibrary(book);
                library.removeMapItem(book.title);
                saveToLocalStorage();
                this.displayTableBody(library, saveToLocalStorage);
            });

            tdRemove.appendChild(removeBtn)

            tr.append(tdTitle, tdAuthor, tdPages, tdRead, tdRemove);
            tbody.appendChild(tr);
        }
    }
    
    viewInit() {
        const btnAddNewBook = document.querySelector("#btn-new-book");
        btnAddNewBook.addEventListener("click", () => {
            this.#openModal();
        }); 

        this.#cancelBtnListener();
    }
}

export default View;