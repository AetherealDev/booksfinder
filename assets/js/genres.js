document.addEventListener('DOMContentLoaded', function() {
  const genreItems = document.querySelectorAll('.genre-item');

  genreItems.forEach(function(item) {
    const genreName = item.querySelector('span').textContent;
    const bookContainer = item.querySelector('.books');

    axios.get('https://www.googleapis.com/books/v1/volumes?q=subject:' + genreName)
      .then(function(response) {
        const books = response.data.items;

        books.forEach(function(book) {
          const bookCard = createBookCard(book);

          const favoritesButton = bookCard.querySelector('.button.is-primary');
          favoritesButton.addEventListener('click', function() {
            favoriteBook(book);
          });

          bookContainer.appendChild(bookCard);
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  });
});

function favoriteBook(book) {
  // Retrieve the existing favorites from local storage
  const favorites = localStorage.getItem('favorites') || '[]';

  // Parse the favorites into an array
  const favoritesArray = JSON.parse(favorites);

  // Add the book to the favorites array
  favoritesArray.push(book);

  // Convert the favorites array back to a string
  const updatedFavorites = JSON.stringify(favoritesArray);

  // Store the updated favorites in local storage
  localStorage.setItem('favorites', updatedFavorites);
}

function createBookCard(book) {
  const bookCard = document.createElement('div');
  bookCard.classList.add('box');
  bookCard.classList.add('has-background-dark');
  bookCard.style.color = 'white'; // Set text color to white

  const title = document.createElement('h3');
  title.textContent = book.volumeInfo.title;
  bookCard.appendChild(title);

  const author = document.createElement('p');
  author.textContent = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Author not available';
  bookCard.appendChild(author);

  if (book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail) {
    const image = document.createElement('img');
    image.src = book.volumeInfo.imageLinks.thumbnail;
    image.alt = book.volumeInfo.title;
    bookCard.appendChild(image);
  }

  const favoritesButton = document.createElement('button');
  favoritesButton.classList.add('button');
  favoritesButton.classList.add('is-primary');
  favoritesButton.textContent = 'Favorite';
  bookCard.appendChild(favoritesButton);

  // Apply consistent styling to the book card
  bookCard.style.display = 'flex';
  bookCard.style.flexDirection = 'column';
  bookCard.style.alignItems = 'center';
  bookCard.style.textAlign = 'center';

  title.style.marginTop = '10px';
  author.style.marginTop = '5px';

  favoritesButton.style.marginTop = 'auto';

  return bookCard;
}
