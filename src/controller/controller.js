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

            if (this.#library.mapTitleAndAuthor.has(titleInput, authorInput)) {
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
            // this.saveToLocalStorage();

            form.reset();
            dialog.close();

            this.#view.displayTableBody(this.#library);
        });
    }

    controllerInit() {
        const view = new View();
        view.viewInit();

        this.#createBookFromDialog();
    }
}

export default Controller;