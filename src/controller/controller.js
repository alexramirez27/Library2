// controller.js
import View from "../view/view.js";
import Library from "../model/library.js";
import Book from "../model/book.js";

class Controller {
    #view;
    #library;

    constructor() {
        this.#view = new View();
        this.#library = new Library();
    }

    #addListenerToInput(input) {
        let isValid = true;
        input.addEventListener("input", () => {
            const p = input.parentNode.parentNode.querySelector('p');
            if (!input.checkValidity()) {
                p.className = 'error';
                isValid = false;
            } else {
                p.className = 'valid';
            }
        });
        return isValid;
    }

    #checkInputValidity(input) {
        let isValid = true;
        if (!input.checkValidity()) {
            const p = input.parentNode.parentNode.querySelector('p');
            p.className = 'error';
            isValid = false;
        }
        return isValid;
    }

    #createBookFromDialog() {
        const dialog = document.querySelector("dialog");
        const form = dialog.querySelector("form");

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const titleInput = document.querySelector('#title');
            const authorInput = document.querySelector('#author');
            const pagesInput = document.querySelector('#pages');
            const numPagesInput = Number(pagesInput.value);
            const readInput = document.querySelector('input[name="read"]:checked');

            if (this.#library.mapTitleAndAuthor.has(titleInput.value)) {
                alert("Book is already in the table!");
                return;
            }

            // Constraint validation
            let isValid = true;
            isValid = this.#addListenerToInput(titleInput);
            isValid = this.#addListenerToInput(authorInput);
            isValid = this.#addListenerToInput(pagesInput);

            const yesRadio = document.querySelector("#yes");
            yesRadio.addEventListener("input", () => {
                const divRead = document.querySelector('#div-read');
                const p = divRead.parentNode.querySelector('p');
                if (!yesRadio.checkValidity()) {
                    p.className = 'error';
                    isValid = false;
                } else {
                    p.className = 'valid';
                }
            });

            const noRadio = document.querySelector("#no");
            noRadio.addEventListener("input", () => {
                const divRead = document.querySelector('#div-read');
                const p = divRead.parentNode.querySelector('p');
                if (!noRadio.checkValidity()) {
                    p.className = 'error';
                    isValid = false;
                } else {
                    p.className = 'valid';
                }
            });

            isValid = this.#checkInputValidity(titleInput);
            isValid = this.#checkInputValidity(authorInput);
            isValid = this.#checkInputValidity(pagesInput);

            if (!yesRadio.checkValidity()) {
                const divRead = document.querySelector('#div-read');
                const p = divRead.parentNode.querySelector('p');
                p.className = 'error';
                isValid = false;
            }
            
            if (!isValid) return;

            const book = new Book(
                titleInput.value,
                authorInput.value,
                numPagesInput,
                readInput.value === "yes"
            );

            this.#library.addBookToLibrary(book);
            this.#library.addMapItem(titleInput.value, authorInput.value);
            this.#saveToLocalStorage();
            form.reset();
            dialog.close();
            this.#view.displayTableBody(this.#library, this.#saveToLocalStorage.bind(this));
        });
    }

    #saveToLocalStorage() {
        localStorage.setItem("library", JSON.stringify(this.#library));
    }

    #loadFromLocalStorage() {
        const savedLibrary = localStorage.getItem("library");

        if (!savedLibrary) return;

        const parsedLibrary = JSON.parse(savedLibrary);
        this.#library = Library.fromJSON(parsedLibrary);
    }

    controllerInit() {
        this.#loadFromLocalStorage();

        const view = new View();
        view.viewInit();

        view.displayTableBody(this.#library, this.#saveToLocalStorage.bind(this));

        this.#createBookFromDialog();
    }
}

export default Controller;