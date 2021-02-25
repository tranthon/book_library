// see https://repl.it/@Dotdash/Goodreads-Server-Express for implementation details
const searchInput = document.querySelector('#searchInput');
const bookOutput = document.querySelector('#bookOutput');
const pageButtons = document.querySelector('#pageButtons');
const search = document.querySelector('#searchButton');
var term;
var bookList;
var thisPage = 1;
var numItems = 6;

function retrieveBookInfo() {
  const apiUrl = `https://goodreads-server-express--dotdash.repl.co/search/${term}`;
  fetch(apiUrl, {
    method: 'GET',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json'}
  }).then(res => res.json()).then(books => {
    bookList = books.list;
    thisPage = 1;
    renderBook(bookList, bookOutput, numItems, thisPage);
  }).catch(error => {
    bookOutput.innerHTML = 'Please try again with a different book name';
    pageButtons.innerHTML = '';
  })
}

function pagination(list, container, items_each_page) {
  container.innerHTML = '';
  var numPages = Math.ceil(list.length/items_each_page);
  for(var i = 1; i < numPages + 1; i++) {
    var button = createButtons(i, list);
    container.appendChild(button);
  }
}

function createButtons(page, list) {
  var button = document.createElement('button');
  button.innerText = page;
  if(thisPage == page) {
    button.classList.add('active');
  }
  button.addEventListener('click', function() {
    thisPage = page;
    renderBook(list, bookOutput, numItems, thisPage);
  });
  return button;
}

function renderBook(list, container, items_each_page, page) {
  container.innerHTML = "";
  page--;
  var result = '';
  var sliceList = list.slice(items_each_page * page, items_each_page * page + items_each_page);
  sliceList.forEach(book => {
    result += 
    `<div class="book">
      <img src=${book.imageUrl} alt=${book.title}>
      <span class="title">${book.title}</span>
      <span class="author">By ${book.authorName}</span>
    </div>`
  });
  container.innerHTML = result;
  pagination(bookList, pageButtons, numItems);
}

search.addEventListener('click', function(ev) {
  ev.preventDefault();
  retrieveBookInfo();
});

searchInput.addEventListener('change', function(event) {
  term = event.target.value;
});