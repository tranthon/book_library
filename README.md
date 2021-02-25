# book_library
- A small book library webapp using vanilla HTML/CSS/JS, leveraging the Goodreads Public APIs 
- Created a simple search box that upon enter or click of the "Search" button, triggers a search using a REST endpoint which proxies Goodreads' public APIs, transforms it into JSON, and adds CORS headers for client-side use. The results of the API call with the book title, author, image displayed on the web app as grid layout using DOM manipulation.
- Pagination: slice the results from the API call to display 6 books per page, dynamically render book list based on the page number.
- UI is responsive to any screen sizes and works with touch device.   