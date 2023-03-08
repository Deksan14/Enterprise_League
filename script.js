"use strict";
const bookCardTemplate = document.querySelector("[data-book-template]");
const bookCardContainer = document.querySelector("[data-book-cards-container]");

let books = [];
console.log(books);
fetch("listofbooks.json")
  .then((res) => res.json())
  .then((data) => {
    data.sort((a, b) =>
      a.author < b.author ? -1 : a.author === b.author ? 0 : 1
    );

    books = data.map((book) => {
      const card = bookCardTemplate.content.cloneNode(true).children[0];
      const author = card.querySelector("[data-author]");
      const title = card.querySelector("[data-title]");
      const genre = card.querySelector("[data-genre]");

      author.textContent = book.author;
      title.textContent = book.title;
      genre.textContent = book.genre;

      bookCardContainer.append(card);
      return {
        name: book.author,
        title: book.title,
        genre: book.genre,
        element: card,
      };
    });
    //console.log(books);
    const filterBtn = document.getElementById("search-btn");
    filterBtn.addEventListener("click", () => {
      const searchInput = document
        .getElementById("searchInput")
        .value.trim()
        .toLowerCase();
      //console.log(searchInput);
      console.log(books);
      books.forEach((book) => {
        console.log(book);
        const isVisible =
          book.name.toLowerCase().includes(searchInput) ||
          book.title.toLowerCase().includes(searchInput) ||
          book.genre.toLowerCase().includes(searchInput);

        book.element.classList.toggle("hide", !isVisible);
      });
    });
  });
