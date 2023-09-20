const myLibrary = [];

function Book(title, author, pages, completed) {
    this.title = title
    this.author = author
    this.pages = pages
    this.completed = completed
    this.info = function() {
        if (completed === "yes") {
            return `${title}, by ${author}, ${pages} pages, read`
        } else if (completed === "no") {
            return `${title}, by ${author}, ${pages} pages, not read yet`
        }
        
    }
}

const poop = new Book("Poop", "Salinger", "900", "no")

console.log(poop.info());

// do stuff here

// function addBookToLibrary() {

// }

