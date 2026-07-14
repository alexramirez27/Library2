// library.js

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
}

export default Library;