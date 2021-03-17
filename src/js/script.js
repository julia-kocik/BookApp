/* eslint-disable no-debugger */
{
  'use strict';

  const select = {
    templateOf: {
      book: '#template-book',
    },
    wrapper: {
      bookList: '.books-list',
      cover: '.book__image',
      filters: '.filters',
    },
    class: {
      favoriteBook: 'favorite',
      hidden: 'hidden',
    },
    form: '.filters form',
  };
  
  const templates = {
    booksList: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };



  class BooksList {
    constructor() {
      const thisBookList = this;
      thisBookList.initData();
      thisBookList.getElements();
      thisBookList.render();
      thisBookList.initActions();
    }
  
    initData() {
      const thisBookList = this;
      thisBookList.data = dataSource.books;
    }
  
    getElements() {
      const thisBookList = this;
      thisBookList.bookListWrapper = document.querySelector(select.wrapper.bookList);
      thisBookList.filterWrapper = document.querySelector(select.wrapper.filters);
      thisBookList.favoriteBooks = [];
      thisBookList.filters = [];
    }

    render() {
      const thisBookList = this;
      for(let book of thisBookList.data) {
        //book.ratingBgc = thisBookList.determineRatingBgc(book.rating);
        const generatedHTML = templates.booksList(book);
        const element = utils.createDOMFromHTML(generatedHTML);
        thisBookList.bookListWrapper.appendChild(element);
      }
    }

    filterBooks() {
      const thisBookList = this;
      for(let book of thisBookList.data) {
        const bookToBeHidden = document.querySelector(`.book__image[data-id="${book.id}"]`);
        
        let shouldBeHidden = false;
        for(let filter of thisBookList.filters) {
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
  
    initActions() {
      debugger;
      const thisBookList = this;
      thisBookList.bookListWrapper.addEventListener('click', function(event) {
        event.preventDefault();
      });
      thisBookList.bookListWrapper.addEventListener('dblclick', function(event) {
        event.preventDefault();
        const clickedElement = event.target.offsetParent;
        if(clickedElement.classList.contains('book__image')) {
          const id = clickedElement.getAttribute('data-id');
          if(!clickedElement.classList.contains(select.class.favoriteBook)) {
            clickedElement.classList.add(select.class.favoriteBook);
            thisBookList.favoriteBooks.push(id);
          } else {
            clickedElement.classList.remove(select.class.favoriteBook);
            const i = thisBookList.favoriteBooks.indexOf(id, 1);
            thisBookList.favoriteBooks.splice(i);
          }
        }
      });
  
      thisBookList.filterWrapper.addEventListener('click', function(event) {
        const clickedElement = event.target;
        if(clickedElement.tagName === 'INPUT' && clickedElement.type === 'checkbox' && clickedElement.name ==='filter') {
          if(clickedElement.checked) {
            thisBookList.filters.push(clickedElement.value);
            thisBookList.filterBooks();
          } else {
            const i = thisBookList.filters.indexOf(clickedElement.value);
            thisBookList.filters.splice(i);
            thisBookList.filterBooks();
          }
        }
      });
    }

  }

  const app = {
    initializeProject: function(){
      new BooksList();
    }
  };
  app.initializeProject();
}
  
