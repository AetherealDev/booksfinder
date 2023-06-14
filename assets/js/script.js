// API Configuration
const API_BASE_URL = 'https://www.googleapis.com/books/v1';
const API_KEY = 'AIzaSyD1BULOrUdMikCMnnqhiseWb3rTSXvv3WU';
const API_NY_URL = 'https://api.nytimes.com/svc/books/v3'
const API_NY_KEY = 'vYzXEiXGWMX2OJB96yfvKFNuAB5y5ZJH'

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

  const favoritesButton = document.createElement('button');
  favoritesButton.classList.add('button');
  favoritesButton.classList.add('is-primary');
  favoritesButton.textContent = 'Favorite';
  favoritesButton.addEventListener('click', function() {
    favoriteBook(book);
  });
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

// Function to get recommended sliding books
function getRecommendedBooks() {
  fetch(`${API_BASE_URL}/volumes?q=recommended&maxResults=5&key=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => {
      // Process the API response and display the recommended books
      data.items.forEach (slideShow) 
        const bookCard = createBookCard(book);
        var rand;
        $(document).ready(function() {
          bookCard = Math.floor((Math.random() * $('.item').length));
          rand = bookCard;
          $('#myCarousel').carousel(bookCard);
          $('#myCarousel').fadeIn(1000);
          setInterval(function(){ 
            while(rand == bookCard){
              rand = Math.floor((Math.random() * $('.item').length));
            }
            bookCard = rand;
            $('#myCarousel').carousel(rand);
        },3000);
        })});
        
        $(document).ready(function() {
          
          /* Pick a random number and apply it to the first slide in the slideshow item */
          $('.item').eq(Math.floor((Math.random() * $('.item').length))).addClass("active");
        
          /* Pick random next slide */
          $('#myCarousel').carousel(Math.floor((Math.random() * $('.item').length)));
        
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

// $('.carousel').carousel({
//   interval: 2000
// })

