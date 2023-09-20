
const books = document.querySelector(".books");
const addBook = document.querySelector(".add-book");
const modal = document.querySelector("#modal");
const modalClose = document.querySelector(".close");
const addBookForm = document.querySelector(".add-book-form");

addBook.addEventListener("click", () => {
    modal.style.display = "block";
    // document.querySelector(".form-title").textContent = "Add Book";
    document.querySelector(".form-add-button").textContent = "Add";
});

modalClose.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    console.log(e);
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

function Book (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = Math.floor(Math.random() * 10000000);
}

function addBookToLibrary (title, author, pages, read) {
    myLibrary.push(new Book (title, author, pages, read));
    saveAndRenderBooks();
}

addBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    let newBook = {};
    for (let [name, value] of data) {
        if (name === "book-read") {
            // ignore it
            newBook["book-read"] = true;
        } else {
            newBook[name] = value || "";
        }
    }
    if (!newBook["book-read"]) {
        newBook["book-read"] = false;
    }
    if (document.querySelector(".form-title").textContent === "Edit Book") {
        let id = e.target.id;
        let editBook = myLibrary.filter( (book) => book.id == id)[0];
        editBook.title = newBook["book-title"];
        editBook.author = newBook["book-author"];
        editBook.pages = newBook["book-pages"];
        editBook.read = newBook["book-read"];
        saveAndRenderBooks();

    } else {
        addBookToLibrary(newBook["book-title"], newBook["book-author"], newBook["book-pages"], newBook["book-read"]);
    }
    
    addBookForm.reset();
    modal.style.display = "none";

});








let myLibrary = [];

// const myLibrary = [{
//     title: "Book 1",
//     author: "me",
//     pages: 500,
//     read: true
// }, {
//     title: "Book 2",
//     author: "you",
//     pages: 5000,
//     read: false
// }];


// localStorage
function addLocalStorage () {
    myLibrary = JSON.parse(localStorage.getItem("library")) || [];

    saveAndRenderBooks();
}

// helper function to create html elements with textcontent and classes

function createBookElement (el, content, className) {
    const element = document.createElement(el);
    element.textContent = content;
    element.setAttribute("class", className);
    return element;
}

// helper function - Creates an input with an event listener to select if a book is read
function createReadElement (bookItem, book) {
    let read = document.createElement("div");
    read.setAttribute("class", "book-read");
    read.appendChild(createBookElement("h1", "Read?", "book-read-title"));
    let input = document.createElement("input");
    input.type = "checkbox";
    input.addEventListener("click", (e) => {
        if (e.target.checked) {
            bookItem.setAttribute("class", "card book read-checked");
            book.read = true;
            saveAndRenderBooks();
        } else {
            bookItem.setAttribute("class", "card book read-unchecked");
            book.read = false;
            saveAndRenderBooks();
        }
    });

    if (book.read) {
        input.checked = true;
        bookItem.setAttribute("class", "card book read-checked");
    }
    read.appendChild(input)
    return read;
}

function fillOutEditForm (book){
    modal.style.display = "block";
    document.querySelector(".form-title").textContent = "Edit Book";
    document.querySelector(".form-add-button").textContent = "Edit";
    document.querySelector(".add-book-form").setAttribute("id", book.id);
    document.querySelector("#book-title").value = book.title || "";
    document.querySelector("#book-author").value = book.author || "";
    document.querySelector("#book-pages").value = book.pages || "";
    document.querySelector("#book-read").checked = book.read || "";

}

// create the edit icon w/ event listener
function createEditIcon (whacko) {
    const editIcon = document.createElement("img");
    editIcon.src = "icons/pencil.svg";
    editIcon.setAttribute("class", "edit-icon");
    editIcon.addEventListener("click", () => {
        fillOutEditForm(whacko);
    });
    return editIcon;
}

// create dummy icons that don't do anything yet
function createIcons () {
    const div = createBookElement("div", null, "icons");
    const icon1 = document.createElement("img");
    icon1.src = "../icons/star-plus-outline.svg";
    const icon2 = document.createElement("img");
    icon2.src = "../icons/eye-plus-outline.svg";
    const icon3 = document.createElement("img");
    icon3.src = "../icons/source-branch.svg";

    div.appendChild(icon1);
    div.appendChild(icon2);
    div.appendChild(icon3);

    return div;
}

function deleteBook (index) {
    // rememeber that splice array method second parameter is the delete count, in this case (1)
    myLibrary.splice(index, 1);
    saveAndRenderBooks();
}

// function to create all of the book content on the book dom card
function createBookItem (fart, index) {
    const bookItem = document.createElement("div");
    bookItem.setAttribute("id", index);
    bookItem.setAttribute("key", index);
    bookItem.setAttribute("class", "card book");
    bookItem.appendChild(createBookElement("h1", `Title: ${fart.title}`, "book-title"));
    bookItem.appendChild(createBookElement("h1", `Author: ${fart.title}`, "book-author"));
    bookItem.appendChild(createBookElement("h1", `Pages: ${fart.title}`, "book-pages"));
    bookItem.appendChild(createReadElement(bookItem, fart));
    bookItem.appendChild(createBookElement("button", "X", "delete"));
    bookItem.appendChild(createIcons());
    bookItem.appendChild(createEditIcon(fart));

    bookItem.querySelector(".delete").addEventListener("click", () => {
        deleteBook(index);
    });

    books.insertAdjacentElement("afterbegin", bookItem);
}

// function to render all the books
function renderBooks () {
    books.textContent = "";
    // remember that the most important part here is using the default parameters in the map array method. the second parameter is "index", which is then passed to the createBookItem function
    myLibrary.map((poop, index) => {
        createBookItem(poop, index)

    })
}

function saveAndRenderBooks () {
    localStorage.setItem("library", JSON.stringify(myLibrary));
    renderBooks();
}

// render on page load
addLocalStorage();

JSON.stringify(localStorage.setItem("name", 22));
