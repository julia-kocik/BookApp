{
  'use strict';

  const select = {
    templateOf: {
      book: '#template-book',
    },
    wrapper: {
      bookList: '.books-list',
      cover: '.book__image',
    },
    class: {
      favoriteBook: '.favorite',
    },
  };
  
  const templates = {
    booksList: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };

  const bookContainer = document.querySelector(select.wrapper.bookList);
  
  const allBooks = [];
  const favoriteBooks = [];
 
  function render() {
    for(let book of dataSource.books) {
      const generatedHTML = templates.booksList(book);
      /* create element using utils.createElementFromHTML */
      const element = utils.createDOMFromHTML(generatedHTML);
      /* add element to menu */
      bookContainer.appendChild(element);
      allBooks.push(element);
    }
  }

  function initActions() {
    //const bookCovers = document.querySelectorAll(select.wrapper.cover);
    //console.log(bookCover);
    
    bookContainer.addEventListener('dblclick', function(event) {
      event.preventDefault();
      const clickedElement = event.target;
      //console.log(clickedElement);
      if(clickedElement.offsetParent.classList.contains('.book__image')) {
        const id = clickedElement.getAttribute('data-id');
        if(!clickedElement.classList.contains(select.class.favoriteBook)) {
          clickedElement.classList.add(select.class.favoriteBook);
          favoriteBooks.push(id);
        } else {
          clickedElement.classList.remove(select.class.favoriteBook);
          const i = favoriteBooks.indexOf(id, 1);
          favoriteBooks.splice(i);
        }
      }
     
    });
  }

  render();
  initActions();
  console.log(favoriteBooks);

}