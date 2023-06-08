const favoriteBooksContainer = document.getElementById('favorite-books');


function favoriteBooks() {
    // Get the favorite books from local storage
    const favoriteBooks = JSON.parse(localStorage.getItem('favorites'));

    // Check if there are favorite books in local storage
    if (favoriteBooks && favoriteBooks.length > 0) {
        // Process the favorite books and display them
        favoriteBooks.forEach((book) => {
            console.log(book)
            const bookCard = createBookCard(book);
            favoriteBooksContainer.appendChild(bookCard);
        });
    } else {
        console.log('No favorite books found in local storage.');
    }
}

favoriteBooks()