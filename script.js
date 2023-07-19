const modal = document.querySelector(".modal")
const addBtn = document.querySelector(".add-btn")
const submitBtn = document.querySelector("#submit-btn")
const titleInput = document.querySelector("#title")
const authorInput = document.querySelector("#author")
const pagesInput = document.querySelector("#pages")
const hasReadInput = document.querySelector("#has_read")
let errorVals = []

let title = titleInput.value
let author = authorInput.value
let pages = pagesInput.value
let hasRead = hasReadInput.checked

class Library {
    constructor() {
        this.books = []
    }

    addBook(newBook) {
        if (!this.bookExists(newBook)) {
            this.books.push(newBook)
            generateCard(newBook)
        } else {
            alert("This book already exists!")
        }
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

const generateCard = (newBook) => {
    const { title, author, pages, hasRead } = newBook
    const booksEl = document.querySelector(".books")

    const cardEl = document.createElement("div")
    cardEl.classList.add("card")
    const titleEl = document.createElement("h2")
    titleEl.innerText = title
    const authorEl = document.createElement("p")
    authorEl.innerText = `By ${author}`
    const pagesEl = document.createElement("p")
    pagesEl.innerText = pages
    const hasReadEl = document.createElement("p")
    const deleteBtn = document.createElement("button")
    deleteBtn.innerHTML = `<i class="fas fa-solid fa-trash"></i><span>Remove</span>`
    const ribbonEl = document.createElement("div")

    ribbonEl.classList.add("ribbon")
    deleteBtn.classList.add("btn", "btn-primary", "delete-btn")
    hasRead ? ribbonEl.classList.add("blue") : ribbonEl.classList.add("red")

    cardEl.appendChild(titleEl)
    cardEl.appendChild(authorEl)
    cardEl.appendChild(pagesEl)
    cardEl.appendChild(hasReadEl)
    cardEl.appendChild(ribbonEl)
    cardEl.appendChild(deleteBtn)
    booksEl.appendChild(cardEl)
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
    title = e.target.value
    if (title) {
        errorVals.map((val) => {
            if (val.name === "title") {
                val.classList.remove("error")
            }
        })
    }
})

authorInput.addEventListener("input", (e) => {
    author = e.target.value
    if (author) {
        errorVals.map((val) => {
            if (val.name === "author") {
                val.classList.remove("error")
            }
        })
    }
})

pagesInput.addEventListener("input", (e) => {
    pages = e.target.value
    if (pages) {
        errorVals.map((val) => {
            if (val.name === "pages") {
                val.classList.remove("error")
            }
        })
    }
})

hasReadInput.addEventListener("change", (e) => {
    hasRead = e.target.checked
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
    errorVals = []
    const values = {
        titleInput,
        authorInput,
        pagesInput,
    }

    Object.keys(values).map((val) => {
        if (!values[val].value) {
            errorVals.push(values[val])
        }
    })

    errorVals.map((errorVal) => errorVal.classList.add("error"))

    if (errorVals.length === 0) {
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
