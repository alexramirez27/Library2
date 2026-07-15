// book.js

class Book {
    #id = crypto.randomUUID();
    #title;
    #author;
    #pages;
    #read;

    constructor(title, author, pages, read) {
        this.#title = title;
        this.#author = author;
        this.#pages = pages;
        this.#read = read;
    }

    get id() {
        return this.#id;
    }

    get title() {
        return this.#title;
    }

    set title(title) {
        this.#title = title;
    }

    get author() {
        return this.#author;
    }

    set author(author) {
        this.#author = author;
    }

    get pages() {
        return this.#pages;
    }

    set pages(pages) {
        this.#pages = pages;
    }

    get read() {
        return this.#read;
    }

    set read(read) {
        this.#read = read;
    }

    info() {
        if (this.read) {
            return `${this.title} by ${this.author}, ${this.pages} pages, read already`;
        } else {
            return `${this.title} by ${this.author}, ${this.pages} pages, not read yet`;
        }
    };

    toJSON() {
        return {
            id: this.#id,
            title: this.#title,
            author: this.#author,
            pages: this.#pages,
            read: this.#read
        };
    }

    static fromJSON(data) {
        const book = new Book(
            data.title,
            data.author,
            data.pages,
            data.read
        );
        book.#id = data.id;
        return book;
    }
}

export default Book;