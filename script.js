let myLibrary = [];


const myForm = document.querySelector('.book-form');
const container = document.querySelector('.container');

function Book(name, author, pages, read) {
    this.name = name
    this.author = author
    this.pages = pages
    this.read = read
};

function submitBook() {
    const bname = document.getElementById('bname').value
    const aname = document.getElementById('aname').value
    const pages = document.getElementById('pages').value
    const read = document.getElementById('read').value

    
    addBookToLibrary(new Book(bname, aname, pages, read))
    
    location.reload()
}

function addBookToLibrary(book) {
    myLibrary.push(book)
    localSave()
    renderBook()
};


    
function renderBook() {
    const display = document.querySelector('Library-container');
    const books = document.querySelectorAll('.book')
    

    books.forEach(book => { container.removeChild(book) });  

    for (let i=0; i<myLibrary.length; i++){
        createHtml(myLibrary[i]);
    }
}

function createHtml(item) {
    
    const bookDiv = document.createElement('div');
    const nameDiv = document.createElement('div');
    const authorDiv = document.createElement('div');
    const pageDiv = document.createElement('div');
    const readDiv = document.createElement('div');

    bookDiv.classList.add('book');
    bookDiv.setAttribute('id', myLibrary.indexOf(item));

    nameDiv.textContent = item.name;
    nameDiv.classList.add('title');
    bookDiv.appendChild(nameDiv);

    authorDiv.textContent = item.author;
    authorDiv.classList.add('author');
    bookDiv.appendChild(authorDiv);

    pageDiv.textContent = item.pages;
    pageDiv.classList.add('pages');
    bookDiv.appendChild(pageDiv);

    readDiv.textContent = item.read;
    readDiv.classList.add('read');
    bookDiv.appendChild(readDiv);

    container.appendChild(bookDiv)
}

// Saves book objects

function localSave() {
    localStorage.setItem('Library', JSON.stringify(myLibrary))
};

function restore() {
    if(!localStorage.Library) {
        renderBook();
    }else {
        let objects = localStorage.getItem('Library') // gets information from local storage to use in below loop to create DOM/display
        objects = JSON.parse(objects);
        myLibrary = objects;
        renderBook();
    }
}

restore()

