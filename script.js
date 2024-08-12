const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    displayBooks();
}

function displayBooks() {
    const bookList = document.getElementById("book-list");
    bookList.innerHTML = '';

    myLibrary.forEach((book, index) => {
        const card = document.createElement('div');
        card.classList.add('book-card');

        card.innerHTML = `
        <h1>${book.title}</h1>
        <p>Pages: ${book.pages}<p>
        <p>Author: ${book.author}<p>
        <p>Read: ${book.read == 'yes' ? 'Yes' : 'No'}<p>
        <button class="button-remove" data-index="${index}">Remove</button>
        <button class="button-read" data-index="${index}">Change Read Status</button>
        `;
        console.log(book.read);
        bookList.appendChild(card);
    });

    const removeButtons = document.querySelectorAll(".button-remove");
    removeButtons.forEach(button => {
        button.addEventListener('click', removeBook);
    });

    const readButtons = document.querySelectorAll(".button-read");
    readButtons.forEach(button => {
        button.addEventListener('click', readBook);
    });
}

function removeBook(event) {
    const index = event.target.getAttribute('data-index');
    myLibrary.splice(index,1);
    displayBooks();
}

function readBook(event) {
    const index = event.target.getAttribute('data-index');
    
    if(myLibrary[index].read == 'yes') {
        myLibrary[index].read = 'no';
    } else {
        myLibrary[index].read = 'yes';
    }
    displayBooks();
}

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('myForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(form);

        const title = formData.get('title');
        const author = formData.get('author');
        const pages = formData.get('pages');
        const read = formData.get('read');

        const book_object = new Book(title,author,pages,read);

        addBookToLibrary(book_object);
    });
});

