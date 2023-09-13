import { checkErrorInputs } from "./checkErrorInputs.js";
import { Library, Book } from "./Library.js";
const modal = document.querySelector(".modal");
const addBtn = document.querySelector(".add-btn");
const submitBtn = document.querySelector("#submit-btn");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const hasReadInput = document.querySelector("#has_read");
const bookEl = document.querySelector(".books");
const errorEl = document.querySelector(".error");
const library = new Library();
if (library.books.length > 0) {
    library.updateCards(bookEl);
}
let errorVals = [];
// INPUTS
titleInput === null || titleInput === void 0 ? void 0 : titleInput.addEventListener("input", (e) => {
    const element = e.target;
    if (element && element.value) {
        if (element.value.trim() !== "") {
            errorVals.map((val) => {
                if (val.name === "title") {
                    val.classList.remove("error");
                }
            });
            errorEl.classList.add("hide");
        }
    }
});
authorInput === null || authorInput === void 0 ? void 0 : authorInput.addEventListener("input", (e) => {
    const element = e.target;
    if (element.value.trim() !== "") {
        errorVals.map((val) => {
            if (val.name === "author") {
                val.classList.remove("error");
            }
        });
        errorEl.classList.add("hide");
    }
});
pagesInput === null || pagesInput === void 0 ? void 0 : pagesInput.addEventListener("input", (e) => {
    const element = e.target;
    if (element.value.trim() !== "") {
        errorVals.map((val) => {
            if (val.name === "pages") {
                val.classList.remove("error");
            }
        });
        errorEl === null || errorEl === void 0 ? void 0 : errorEl.classList.add("hide");
    }
});
addBtn === null || addBtn === void 0 ? void 0 : addBtn.addEventListener("click", () => {
    modal === null || modal === void 0 ? void 0 : modal.classList.remove("hide");
});
modal === null || modal === void 0 ? void 0 : modal.addEventListener("click", (e) => {
    const element = e.target;
    if (element.className === "modal") {
        modal.classList.add("hide");
        return;
    }
});
submitBtn === null || submitBtn === void 0 ? void 0 : submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    errorVals = checkErrorInputs({ titleInput, authorInput, pagesInput });
    errorVals.map((errorVal) => errorVal.classList.add("error"));
    if (errorVals.length > 0) {
        errorEl.classList.remove("hide");
    }
    if (errorVals.length === 0) {
        errorEl.classList.add("hide");
        const title = titleInput.value;
        const author = authorInput.value;
        const pages = parseInt(pagesInput.value);
        const hasRead = hasReadInput.checked;
        const id = generateId();
        const newBook = new Book(title, author, pages, hasRead, id);
        library.addBook(newBook, { hasReadInput }, bookEl);
        modal.classList.add("hide");
        if (library.books) {
            titleInput.value = "";
            authorInput.value = "";
            pagesInput.value = "";
            hasReadInput.checked = false;
        }
    }
});
const generateId = () => {
    return Date.now() * Math.floor(Math.random() * 100);
};
