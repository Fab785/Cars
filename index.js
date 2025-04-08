// This is the data you want to simulate as your API response.
const searchResults = [
    {
        "Title": "The Fast and the Furious",
        "Year": "2001",
        "imdbID": "tt0232500",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BZGRiMDE1NTMtMThmZS00YjE4LWI1ODQtNjRkZGZlOTg2MGE1XkEyXkFqcGc@._V1_SX300.jpg"
    },
    {
        "Title": "Fast & Furious 6",
        "Year": "2013",
        "imdbID": "tt1905041",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMTM3NTg2NDQzOF5BMl5BanBnXkFtZTcwNjc2NzQzOQ@@._V1_SX300.jpg"
    },
    {
        "Title": "Fast Five",
        "Year": "2011",
        "imdbID": "tt1596343",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMTUxNTk5MTE0OF5BMl5BanBnXkFtZTcwMjA2NzY3NA@@._V1_SX300.jpg"
    },
    {
        "Title": "Fast & Furious",
        "Year": "2009",
        "imdbID": "tt1013752",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BM2Y1YzhkNzUtMzhmZC00OTFkLWJjZDktMWYzZmQ0Y2Y5ODcwXkEyXkFqcGc@._V1_SX300.jpg"
    },
    {
        "Title": "The Fast and the Furious: Tokyo Drift",
        "Year": "2006",
        "imdbID": "tt0463985",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMTQ2NTMxODEyNV5BMl5BanBnXkFtZTcwMDgxMjA0MQ@@._V1_SX300.jpg"
    },
    {
        "Title": "2 Fast 2 Furious",
        "Year": "2003",
        "imdbID": "tt0322259",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BOTQzYzEwNWMtOTAwYy00YWYwLWE1NTEtZTkxOGQxZTM0M2VhXkEyXkFqcGc@._V1_SX300.jpg"
    }
];

// Event listener for the Enter key
document.querySelector('.header__src--input').addEventListener('keypress', function(event) {
    if (event.key === "Enter") {
        event.preventDefault();  // Prevent form submission
        showLoadingSpinner();
        searchMovies();
    }
});

// Event listener for filters (Year and Alphabetical Order)
document.getElementById('year-filter').addEventListener('change', function() {
    showLoadingSpinner();
    searchMovies();
});
document.getElementById('sort-filter').addEventListener('change', function() {
    showLoadingSpinner();
    searchMovies();
});

// Function to populate the Year filter dropdown
function populateYearFilter() {
    const yearFilter = document.getElementById('year-filter');
    const years = Array.from(new Set(searchResults.map(movie => movie.Year))); // Get unique years
    years.sort(); // Sort years
    years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearFilter.appendChild(option);
    });
}

// Function to display the loading spinner
function showLoadingSpinner() {
    document.getElementById('loading-spinner').style.display = 'block'; // Show spinner
}

// Function to hide the loading spinner
function hideLoadingSpinner() {
    document.getElementById('loading-spinner').style.display = 'none'; // Hide spinner
}

// Function to display the results based on the search term, year, and sort filters
function searchMovies() {
    const query = document.querySelector('.header__src--input').value.toLowerCase();
    const yearFilterValue = document.getElementById('year-filter').value;
    const sortFilterValue = document.getElementById('sort-filter').value;
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';  // Clear previous results

    // Filter movies based on the query
    const filteredResults = searchResults.filter(movie => 
        movie.Title.toLowerCase().includes(query) &&
        (yearFilterValue ? movie.Year === yearFilterValue : true)
    );

    // Sort movies based on alphabetical order (A-Z or Z-A)
    if (sortFilterValue === "asc") {
        filteredResults.sort((a, b) => a.Title.localeCompare(b.Title));
    } else if (sortFilterValue === "desc") {
        filteredResults.sort((a, b) => b.Title.localeCompare(a.Title));
    }

    // Wait for a short moment to simulate the processing time
    setTimeout(() => {
        hideLoadingSpinner(); // Hide spinner once results are processed
        
        if (filteredResults.length > 0) {
            filteredResults.forEach(movie => {
                const movieElement = document.createElement('div');
                movieElement.classList.add('result-item');
                movieElement.innerHTML = `
                    <img class="movie-poster" src="${movie.Poster}" alt="${movie.Title}">
                    <h3>${movie.Title} (${movie.Year})</h3>
                    <a href="https://www.imdb.com/title/${movie.imdbID}/" target="_blank" class="imdb-link">View on IMDb</a>
                `;
                resultsContainer.appendChild(movieElement);
            });
        } else {
            resultsContainer.innerHTML = `<p>No results found for "${query}".</p>`;
        }
    }, 1000); // Simulating a 1-second delay
}

// Populate the Year filter when the page loads
populateYearFilter();

