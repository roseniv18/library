import { checkErrorInputs } from "./checkErrorInputs.js"
import { Library, Book } from "./Library.js"

const modal = document.querySelector(".modal")
const addBtn = document.querySelector(".add-btn")
const submitBtn = document.querySelector("#submit-btn")
const titleInput = document.querySelector("#title")
const authorInput = document.querySelector("#author")
const pagesInput = document.querySelector("#pages")
const hasReadInput = document.querySelector("#has_read")
const bookEl = document.querySelector(".books")
const errorEl = document.querySelector(".error")

const library = new Library()

if (library.books.length > 0) {
	library.updateCards(bookEl)
}

let errorVals = []

// INPUTS
titleInput.addEventListener("input", (e) => {
	if (e.target.value.trim() !== "") {
		errorVals.map((val) => {
			if (val.name === "title") {
				val.classList.remove("error")
			}
		})
		errorEl.classList.add("hide")
	}
})

authorInput.addEventListener("input", (e) => {
	if (e.target.value.trim() !== "") {
		errorVals.map((val) => {
			if (val.name === "author") {
				val.classList.remove("error")
			}
		})
		errorEl.classList.add("hide")
	}
})

pagesInput.addEventListener("input", (e) => {
	if (e.target.value.trim() !== "") {
		errorVals.map((val) => {
			if (val.name === "pages") {
				val.classList.remove("error")
			}
		})
		errorEl.classList.add("hide")
	}
})

addBtn.addEventListener("click", () => {
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

	if (errorVals.length > 0) {
		errorEl.classList.remove("hide")
	}

	if (errorVals.length === 0) {
		errorEl.classList.add("hide")
		const title = titleInput.value
		const author = authorInput.value
		const pages = pagesInput.value
		const hasRead = hasReadInput.checked
		const id = generateId()
		const newBook = new Book(title, author, pages, hasRead, id)
		library.addBook(newBook, { hasReadInput }, bookEl)
		modal.classList.add("hide")

		if (library.books) {
			titleInput.value = ""
			authorInput.value = ""
			pagesInput.value = ""
			hasReadInput.checked = false
		}
	}
})

const generateId = () => {
	return Date.now() * Math.floor(Math.random() * 100)
}
