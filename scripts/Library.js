export class Library {
    constructor() {
        if (window.localStorage.getItem("books")) {
            this.books = [...JSON.parse(window.localStorage.getItem("books"))]
        } else {
            this.books = []
        }
    }

    addBook(newBook, inputs, bookEl) {
        if (!this.bookExists(newBook)) {
            this.books.push(newBook)
            this.generateCard(newBook, inputs, bookEl)
            window.localStorage.setItem("books", JSON.stringify([...this.books]))
            document.querySelector(".no-books").classList.add("hide")
        } else {
            alert("This book already exists!")
        }
    }

    readBook(id, booksEl) {
        const book = this.books.find((el) => el.id === id)
        if (book) {
            book.hasRead = !book.hasRead
            window.localStorage.setItem("books", JSON.stringify([...this.books]))
            this.updateCards(booksEl)
        }
    }

    deleteBook(id, booksEl) {
        this.books = this.books.filter((book) => book.id !== id)
        window.localStorage.setItem("books", this.books)
        this.updateCards(booksEl)
    }

    bookExists(newBook) {
        return this.books.some((book) => book.title === newBook.title)
    }

    generateCard(newBook, inputs, booksEl) {
        const { title, author, pages, hasRead, id } = newBook
        const { hasReadInput } = inputs

        const cardEl = document.createElement("div")
        cardEl.classList.add("card")
        const titleEl = document.createElement("h2")
        titleEl.innerText = title
        const authorEl = document.createElement("p")
        authorEl.innerText = `By ${author}`
        const pagesEl = document.createElement("p")
        pagesEl.innerText = `${pages} pages`

        // Action buttons
        const actionBtns = document.createElement("div")

        const readBtn = document.createElement("button")
        readBtn.classList.add("btn", "btn-primary", "read-btn")
        readBtn.innerHTML = `<i class="fas fa-solid fa-book"></i><span>${
            hasReadInput.checked ? "Not read" : "Read"
        }</span>`

        const deleteBtn = document.createElement("button")
        deleteBtn.classList.add("btn", "btn-secondary", "delete-btn")
        deleteBtn.innerHTML = `<i class="fas fa-solid fa-trash"></i><span>Remove</span>`

        actionBtns.appendChild(readBtn)
        actionBtns.appendChild(deleteBtn)
        actionBtns.classList.add("action-btns")

        // Ribbon
        const ribbonEl = document.createElement("div")
        ribbonEl.classList.add("ribbon")
        hasRead ? ribbonEl.classList.add("blue") : ribbonEl.classList.add("red")

        cardEl.appendChild(titleEl)
        cardEl.appendChild(authorEl)
        cardEl.appendChild(pagesEl)
        cardEl.appendChild(ribbonEl)
        cardEl.appendChild(actionBtns)
        booksEl.appendChild(cardEl)

        readBtn.addEventListener("click", () => {
            this.readBook(id, booksEl)
        })

        deleteBtn.addEventListener("click", () => {
            this.deleteBook(id, booksEl)
        })
    }

    updateCards(booksEl) {
        const noBooksText = document.createElement("h2")
        noBooksText.innerHTML = "No books found"
        noBooksText.classList.add("no-books", "hide")
        booksEl.innerHTML = ""
        booksEl.appendChild(noBooksText)

        if (this.books.length === 0) {
            noBooksText.classList.remove("hide")
        }

        const inputs = {
            hasReadInput: document.querySelector("#has_read"),
        }

        for (let i = 0; i < this.books.length; i++) {
            this.generateCard(this.books[i], inputs, booksEl)
        }
    }
}

export class Book {
    constructor(title, author, pages, hasRead = false, id) {
        this.title = title
        this.author = author
        this.pages = pages
        this.hasRead = hasRead
        this.id = id
    }
}
