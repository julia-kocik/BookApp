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
      hidden: '.hidden',
    },
    form: '.filters form',
  };
  
  const templates = {
    booksList: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };

  const bookContainer = document.querySelector(select.wrapper.bookList);
  
  const allBooks = [];
  const favoriteBooks = [];
  const filters = [];
 
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
      const clickedElement = event.target.offsetParent;
      //console.log(clickedElement);
      if(clickedElement.classList.contains('.book__image')) {
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

    const form = document.querySelector(select.form);
    //console.log(form);
    form.addEventListener('click', function(event) {
      const clickedElement = event.target;
      if(clickedElement.tagName === 'INPUT' && clickedElement.type === 'checkbox' && clickedElement.name ==='filter') {
        if(clickedElement.checked) {
          filters.push(clickedElement.value);
          filterBooks();
        } else {
          const i = filters.indexOf(clickedElement.value);
          filters.splice(i);
          filterBooks();
        }
      }
    });
  }

  function filterBooks() {
    for(let book of dataSource.books) {
      const bookToBeHidden = document.querySelector('.book__image[data-id="id-of-the-book-here"]');
      let shouldBeHidden = false;
      for(let filter of filters) {
        if(!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }
      if(shouldBeHidden){
        bookToBeHidden.classList.add(select.class.hidden);
      } else {
        bookToBeHidden.classList.remove(select.class.hidden);
      }
    }
  }

  render();
  initActions();
  
}