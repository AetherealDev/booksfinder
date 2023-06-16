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
      var resultsSection = document.getElementById("results-section");
      resultsSection.style.display = "block";
    })
    .catch((error) => {
      console.log('Error:', error);
    });
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

// Function to fetch bestsellers from NY Times API 
fetch(`${API_NY_URL}/lists/full-overview.json?api-key=${API_NY_KEY}`)
  .then(function (response) {
    return response.json();
  })
  
  .then(function (data) {
    console.log('Bestseller books');
    console.log(data)
      var listitem = data.results.lists[0];
      var innerBlock = document.querySelector('#carouselExample .carousel-inner');
      console.log(innerBlock);
      for (var x = 0; x < listitem.books.length; x++) {
        var bookItem = listitem.books[x];
        if (bookItem.book_image){
          console.log(bookItem.book_image);
          var slideDeck = createSlide (bookItem.book_image, x);

          innerBlock.appendChild (slideDeck);
        }
      }
    return data;
  })

// Function to create carousel items
 function createSlide (url, index) {
    var slideDeck = document.createElement('div');
    var slidePic = document.createElement('img');
    slideDeck.classList.add ('carousel-item');
    if (index === 0) {
      slideDeck.classList.add ("active")
    }
    slidePic.id = 'carousel-image' + index;
    slidePic.src = url;
    slidePic.alt = "..."
    slidePic.classList.add ("d-block");
    slidePic.classList.add ("w-100");

    slideDeck.appendChild (slidePic);
    return slideDeck;
 }
 


