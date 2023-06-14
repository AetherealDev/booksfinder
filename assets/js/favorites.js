const favoriteBooksContainer = document.getElementById('favorite-books');

// the favoriteBooks function is a general function that takes the books from localstorage
// parses them, and then displays them on the web page
function favoriteBooks() {
    // Get the favorite books from local storage
    let favoriteBooks = JSON.parse(localStorage.getItem('favorites'));

    // Check if there are favorite books in local storage
    if (favoriteBooks && favoriteBooks.length > 0) {
        // Process the favorite books and display them
        favoriteBooks.forEach((book) => {
            console.log(book)
            const bookCard = createFavoriteBookCard(book);
            favoriteBooksContainer.appendChild(bookCard);
        });
    } else {
        console.log('No favorite books found in local storage.');
    }
}

function unfavoriteBook(book) {
    // Get the favorite books from local storage
    let favoriteBooks = JSON.parse(localStorage.getItem('favorites'));
  
    if (favoriteBooks && favoriteBooks.length > 0) {
      // Set our index to -1 so that we can check later
      // If it is still -1, we know the book was not found
      let bookIndex = -1;
  
      // Using a loop instead of the findIndex function because it was giving me issues
      for (let i = 0; i < favoriteBooks.length; i++) {
        let bookTitleAtIndex = favoriteBooks[i].volumeInfo.title;
        console.log("Book: " + i + bookTitleAtIndex);
        if (book.volumeInfo.title === bookTitleAtIndex) {
          console.log("Found book at index: " + i);
          bookIndex = i;
          break;
        }
      }
  
      if (bookIndex > -1) {
        // Remove the book from the favoriteBooks array
        favoriteBooks.splice(bookIndex, 1);
  
        // Update the favorite books in local storage
        localStorage.setItem('favorites', JSON.stringify(favoriteBooks));
  
        // Remove the book card from the UI
        favoriteBooksContainer.innerHTML = ''; // Clear the container
        favoriteBooks.forEach((book) => {
          const bookCard = createFavoriteBookCard(book);
          favoriteBooksContainer.appendChild(bookCard);
        });
  
        console.log('Book unfavorited successfully.');
      } else {
        console.log('Book not found in favorites.');
      }
    } else {
      console.log('No favorite books found in local storage.');
    }
  }
  


// the createFavoriteBookCard function works the same as the createBookCard function except
// it appends a unfavorite button instead
function createFavoriteBookCard(book) {
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
    favoritesButton.textContent = 'Unfavorite';
    favoritesButton.addEventListener('click', function() {
      unfavoriteBook(book);
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

favoriteBooks()