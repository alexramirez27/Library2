// library.js
import Book from "./book.js";

class Library {
    #library = [];
    #mapTitleAndAuthor = new Map();

    get library() {
        return [...this.#library];
    }

    get mapTitleAndAuthor() {
        return this.#mapTitleAndAuthor;
    }

    addBookToLibrary(book) {
        this.#library.push(book);
    }

    removeBookFromLibrary(book) {
        const id = book.id;
        const index = this.#library.findIndex(book => book.id === id);

        if (index !== -1) {
            this.#library.splice(index, 1);
        }
    }

    addMapItem(title, author) {
        this.#mapTitleAndAuthor.set(title, author);
    }

    removeMapItem(title) {
        this.#mapTitleAndAuthor.delete(title);
    }

    toJSON() {
        return {
            library: this.#library.map(book => book.toJSON()),
            mapTitleAndAuthor: Array.from(this.#mapTitleAndAuthor)
        };
    }

    static fromJSON(data) {
        const library = new Library();
        library.#library = data.library.map(bookData => Book.fromJSON(bookData));
        library.#mapTitleAndAuthor = new Map(data.mapTitleAndAuthor);
        return library;
    }
}

export default Library;