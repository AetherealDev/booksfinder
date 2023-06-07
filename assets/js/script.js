// API Configuration
const API_BASE_URL = 'https://www.googleapis.com/books/v1';
const API_KEY = 'AIzaSyD1BULOrUdMikCMnnqhiseWb3rTSXvv3WU';

// Get references to HTML elements
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('results');
const slidingBooksContainer = document.getElementById('sliding-books');
const authorButton = document.getElementById('author-button');

// Add event listener to the search form
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchQuery = searchInput.value;
  searchBooks(searchQuery);
});

// Function to search books based on the given query
function searchBooks(query) {
  // Clear previous search results
  resultsContainer.innerHTML = '';

  // Send a request to the Google Books API using the query
  fetch(`${API_BASE_URL}/volumes?q=${query}&key=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => {
      // Process the API response and display the results
      data.items.forEach((book) => {
        const bookCard = createBookCard(book);
        resultsContainer.appendChild(bookCard);
      });
    })
    .catch((error) => {
      console.log('Error:', error);
    });
}

// Function to create a book card
function createBookCard(book) {
  const bookCard = document.createElement('div');
  bookCard.classList.add('book-card');

  const title = document.createElement('h3');
  title.textContent = book.volumeInfo.title;
  bookCard.appendChild(title);

  const author = document.createElement('p');
  author.textContent = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Author not available';
  bookCard.appendChild(author);

  // Add book cover image
  if (book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail) {
    const image = document.createElement('img');
    image.src = book.volumeInfo.imageLinks.thumbnail;
    image.alt = book.volumeInfo.title;
    bookCard.appendChild(image);
  }

  // Add more details such as ratings, description, etc.

  return bookCard;
}

// Function to get recommended sliding books
function getRecommendedBooks() {
  fetch(`${API_BASE_URL}/volumes?q=recommended&maxResults=5&key=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => {
      // Process the API response and display the recommended books
      data.items.forEach((book) => {
        const bookCard = createBookCard(book);
        slidingBooksContainer.appendChild(bookCard);
      });
    })
    .catch((error) => {
      console.log('Error:', error);
    });
}

// Function to get a list of authors
function getAuthorSuggestions() {
  fetch(`${API_BASE_URL}/volumes?q=*&orderBy=newest&maxResults=40&key=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => {
      // Extract unique authors from the API response
      const authors = [...new Set(data.items.flatMap((book) => book.volumeInfo.authors))];
      console.log(authors);
    })
    .catch((error) => {
      console.log('Error:', error);
    });
}

// Event listener for author button click
authorButton.addEventListener('click', getAuthorSuggestions);

// Load recommended sliding books on page load
getRecommendedBooks();

