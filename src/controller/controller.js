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

    #createBookFromDialog() {
        const dialog = document.querySelector("dialog");
        const form = dialog.querySelector("form");

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const titleInput = document.querySelector('#title').value;
            const authorInput = document.querySelector('#author').value;
            const pagesInput = Number(document.querySelector('#pages').value);
            const readInput = document.querySelector('input[name="read"]:checked')?.value;

            if (this.#library.mapTitleAndAuthor.has(titleInput)) {
                alert("Book already in the table!");
                return;
            }

            if (!readInput) {
                alert("No read input entered!");
                return;
            }

            const book = new Book(
                titleInput,
                authorInput,
                pagesInput,
                readInput === "yes"
            );

            this.#library.addBookToLibrary(book);
            this.#library.addMapItem(titleInput, authorInput);

            // Save to local storage
            this.saveToLocalStorage();

            form.reset();
            dialog.close();

            this.#view.displayTableBody(this.#library);
        });
    }

    saveToLocalStorage() {
        localStorage.setItem("library", JSON.stringify(this.#library));
    }

    loadFromLocalStorage() {
        const savedLibrary = localStorage.getItem("library");

        if (!savedLibrary) return;

        const parsedLibrary = JSON.parse(savedLibrary);
        this.#library = Library.fromJSON(parsedLibrary);
    }

    controllerInit() {
        this.loadFromLocalStorage();

        const view = new View();
        view.viewInit();

        view.displayTableBody(this.#library);

        this.#createBookFromDialog();
    }
}

export default Controller;