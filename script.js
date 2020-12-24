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
    const read = document.getElementById('read').checked

    
    addBookToLibrary(new Book(bname, aname, pages, read))
    
    location.reload()
}

function addBookToLibrary(book) {
    myLibrary.push(book)
    localSave()
    renderBook()
};


    
function renderBook() {
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
    const deleteBut = document.createElement('button')
    const checkbox = document.createElement('input')
    checkbox.setAttribute('type', 'checkbox')

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

    readDiv.textContent = 'Read:';
    readDiv.classList.add('read');
    bookDiv.appendChild(readDiv);
    checkbox.checked = item.read
    readDiv.appendChild(checkbox)

    deleteBut.textContent = 'Delete Book'
    deleteBut.classList.add('delete')
    bookDiv.appendChild(deleteBut)

    container.appendChild(bookDiv)

    
    deleteBut.addEventListener('click', function()  {
        toDelete = bookDiv.id
        myLibrary.splice(toDelete, 1)
        localSave()
        renderBook()
    })

    checkbox.addEventListener('click', function() {
        if (item.read == true) {
            item.read = false
        }else {
            item.read = true
        }
        localSave()
        renderBook()
    })

}

  

addEventListener

// Saves book objects

function localSave() {
    localStorage.setItem('Library', JSON.stringify(myLibrary))
};

function restore() {
    if(!localStorage.Library) {
        renderBook();
    }else {
        let objects = localStorage.getItem('Library') // gets information from local storage
        objects = JSON.parse(objects);
        myLibrary = objects;
        renderBook();
    }
}

restore()

