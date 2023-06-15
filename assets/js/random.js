const API_BASE_URL = 'https://www.googleapis.com/books/v1';
const API_KEY = 'AIzaSyD1BULOrUdMikCMnnqhiseWb3rTSXvv3WU';

function fetchRandomBook() {
  const startIndex = Math.floor(Math.random() * 80) + 1; // Random number between 1 and 40 (inclusive)
  const maxResults = 3; // Fetch a single book

  axios.get(`${API_BASE_URL}/volumes?q=subject:fiction&maxResults=${maxResults}&startIndex=${startIndex}&key=${API_KEY}`)
    .then((response) => {
      const books = response.data.items;
      if (books.length > 0) {
        const book = books[0];
        const bookCard = createBookCard(book);
        document.getElementById('lucky-book').innerHTML = '';
        document.getElementById('lucky-book').appendChild(bookCard);
      } else {
        console.log('No books found');
      }
    })
    .catch((error) => {
      console.log('Error:', error);
    });
}

function createBookCard(book) {
  const bookCard = document.createElement('div');
  bookCard.classList.add('box');
  bookCard.classList.add('has-background-dark');

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

  // Apply consistent styling to the book card
  bookCard.style.display = 'flex';
  bookCard.style.flexDirection = 'column';
  bookCard.style.alignItems = 'center';
  bookCard.style.textAlign = 'center';

  title.style.marginTop = '10px';
  author.style.marginTop = '5px';

  return bookCard;
}
