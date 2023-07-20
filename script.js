import { checkErrorInputs } from "./checkErrorInputs.js"

const modal = document.querySelector(".modal")
const addBtn = document.querySelector(".add-btn")
const submitBtn = document.querySelector("#submit-btn")
const titleInput = document.querySelector("#title")
const authorInput = document.querySelector("#author")
const pagesInput = document.querySelector("#pages")
const hasReadInput = document.querySelector("#has_read")
const booksEl = document.querySelector(".books")

let errorVals = []

class Library {
    constructor() {
        this.books = []
    }

    addBook(newBook) {
        if (!this.bookExists(newBook)) {
            newBook.id = Date.now() * Math.floor(Math.random() * 100)
            this.books.push(newBook)
            generateCard(newBook)
        } else {
            alert("This book already exists!")
        }
    }

    readBook(id) {
        const book = this.books.find((el) => el.id === id)
        if (book) {
            book.hasRead = !book.hasRead
        }
    }

    deleteBook(id) {
        this.books = this.books.filter((book) => book.id !== id)
    }

    bookExists(newBook) {
        return this.books.some((book) => book.title === newBook.title)
    }
}

const library = new Library()

class Book {
    constructor(title, author, pages, hasRead = false) {
        this.title = title
        this.author = author
        this.pages = pages
        this.hasRead = hasRead
    }
}

const updateCards = () => {
    booksEl.innerHTML = ""
    for (let i = 0; i < library.books.length; i++) {
        generateCard(library.books[i])
    }
}

const generateCard = (newBook) => {
    const { title, author, pages, hasRead, id } = newBook

    const cardEl = document.createElement("div")
    cardEl.classList.add("card")
    const titleEl = document.createElement("h2")
    titleEl.innerText = title
    const authorEl = document.createElement("p")
    authorEl.innerText = `By ${author}`
    const pagesEl = document.createElement("p")
    pagesEl.innerText = `${pages} pages`

    const actionBtns = document.createElement("div")
    const readBtn = document.createElement("button")
    const deleteBtn = document.createElement("button")
    readBtn.innerHTML = `<i class="fas fa-solid fa-book"></i><span>${
        hasReadInput.checked ? "Not read" : "Read"
    }</span>`
    deleteBtn.innerHTML = `<i class="fas fa-solid fa-trash"></i><span>Remove</span>`

    deleteBtn.classList.add("btn", "btn-secondary", "delete-btn")
    readBtn.classList.add("btn", "btn-primary", "read-btn")

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

    readBtn.addEventListener("click", (e) => {
        library.readBook(id)
        updateCards()
    })

    deleteBtn.addEventListener("click", (e) => {
        library.deleteBook(id)
        updateCards()
    })
}

modal.addEventListener("mouseover", (e) => {
    if (e.target.className === "modal") {
        // document.querySelector("body").style.cursor = "pointer"
        return
    }
    // document.querySelector("body").style.cursor = "auto"
})

// INPUTS
titleInput.addEventListener("input", (e) => {
    if (title) {
        errorVals.map((val) => {
            if (val.name === "title") {
                val.classList.remove("error")
            }
        })
    }
})

authorInput.addEventListener("input", (e) => {
    if (author) {
        errorVals.map((val) => {
            if (val.name === "author") {
                val.classList.remove("error")
            }
        })
    }
})

pagesInput.addEventListener("input", (e) => {
    if (pages) {
        errorVals.map((val) => {
            if (val.name === "pages") {
                val.classList.remove("error")
            }
        })
    }
})

addBtn.addEventListener("click", (e) => {
    modal.classList.remove("hide")
})

modal.addEventListener("click", (e) => {
    if (e.target.className === "modal") {
        modal.classList.add("hide")
        return
    }
})

submitBtn.addEventListener("click", (e) => {
    e.preventDefault()

    errorVals = checkErrorInputs({ titleInput, authorInput, pagesInput })
    errorVals.map((errorVal) => errorVal.classList.add("error"))

    if (errorVals.length === 0) {
        const title = titleInput.value
        const author = authorInput.value
        const pages = pagesInput.value
        const hasRead = hasReadInput.checked
        const newBook = { title, author, pages, hasRead }
        console.log(newBook)
        library.addBook(newBook)
        modal.classList.add("hide")

        if (library.books) {
            titleInput.value = ""
            authorInput.value = ""
            pagesInput.value = ""
            hasReadInput.checked = false
        }
    }
})
