document.addEventListener('DOMContentLoaded', function() {
    const genreItems = document.querySelectorAll('.genre-item');
  
    genreItems.forEach(function(item) {
      const genreName = item.querySelector('span').textContent;
      const bookContainer = item.querySelector('.books');
  
      axios.get('https://www.googleapis.com/books/v1/volumes?q=subject:' + genreName)
        .then(function(response) {
          const books = response.data.items;
  
          books.forEach(function(book) {
            const title = book.volumeInfo.title;
            const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author';
            const thumbnail = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/100';
  
            const bookElement = document.createElement('div');
            bookElement.classList.add('card', 'book-card');
            bookElement.innerHTML = `
              <img src="${thumbnail}" class="card-img-top" alt="Book Cover">
              <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${authors}</p>
              </div>
            `;
  
            const favoritesButton = document.createElement('button');
            favoritesButton.classList.add('button', 'is-primary', 'favorite-button');
            favoritesButton.textContent = 'Favorite';
            favoritesButton.addEventListener('click', function() {
              favoriteBook(book);
            });
  
            bookElement.appendChild(favoritesButton); // Append the button to the card element
  
            bookContainer.appendChild(bookElement);
            bookContainer.appendChild(document.createElement('br'));
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    });
  });
  