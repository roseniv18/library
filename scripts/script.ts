import { checkErrorInputs } from "./checkErrorInputs.js"
import { Library, Book } from "./Library.js"

const modal: Element = document.querySelector(".modal") as Element
const addBtn: Element = document.querySelector(".add-btn") as Element
const submitBtn: Element = document.querySelector("#submit-btn") as Element
const titleInput: HTMLInputElement = document.querySelector(
	"#title"
) as HTMLInputElement
const authorInput: HTMLInputElement = document.querySelector(
	"#author"
) as HTMLInputElement
const pagesInput: HTMLInputElement = document.querySelector(
	"#pages"
) as HTMLInputElement
const hasReadInput: HTMLInputElement = document.querySelector(
	"#has_read"
) as HTMLInputElement
const bookEl: Element = document.querySelector(".books") as Element
const errorEl: Element = document.querySelector(".error") as Element

const library = new Library()

if (library.books.length > 0) {
	library.updateCards(bookEl)
}

let errorVals: HTMLInputElement[] = []

// INPUTS
titleInput?.addEventListener("input", (e: InputEvent) => {
	const element: HTMLInputElement = e.target as HTMLInputElement

	if (element && element.value) {
		if (element.value.trim() !== "") {
			errorVals.map((val) => {
				if (val.name === "title") {
					val.classList.remove("error")
				}
			})
			errorEl.classList.add("hide")
		}
	}
})

authorInput?.addEventListener("input", (e: Event) => {
	const element: HTMLInputElement = e.target as HTMLInputElement

	if (element.value.trim() !== "") {
		errorVals.map((val) => {
			if (val.name === "author") {
				val.classList.remove("error")
			}
		})
		errorEl.classList.add("hide")
	}
})

pagesInput?.addEventListener("input", (e) => {
	const element: HTMLInputElement = e.target as HTMLInputElement

	if (element.value.trim() !== "") {
		errorVals.map((val) => {
			if (val.name === "pages") {
				val.classList.remove("error")
			}
		})
		errorEl?.classList.add("hide")
	}
})

addBtn?.addEventListener("click", () => {
	modal?.classList.remove("hide")
})

modal?.addEventListener("click", (e) => {
	const element: HTMLInputElement = e.target as HTMLInputElement

	if (element.className === "modal") {
		modal.classList.add("hide")
		return
	}
})

submitBtn?.addEventListener("click", (e) => {
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
		const pages = parseInt(pagesInput.value)
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

const generateId = (): number => {
	return Date.now() * Math.floor(Math.random() * 100)
}
