# Travel Destinations Vanilla JS App

Single page application (SPA) built with Vanilla JS to manage a list of travel destinations. This application will allow users to:

1. View a list of travel destinations.
2. Add a new destination.
3. Delete a destination from the list

## Running the app

Clone repository.

Run the following:

```
npm i
npx vite
```

This will start a local server at `http://localhost:5173/`. Navigate to `http://localhost:5173/` on the browser and use the app.

## Requirements

1. General Functionality:
   - Implement navigation between "Home" and "About" pages without a full page reload.
   - Maintain the URL state using the browser's History API (`pushState` and `popState`)
2. Home Page:
   - Display a list of travel destinations.
   - Use a public API to fetch a list of possible cities (I used `https://countriesnow.space/api/v0.1/countries/population/cities`).
   - Provide an input field and a button to add a new destination.
   - Allow the user to delete a destination from the list.
3. About Page:
   - Display static information about the purpose of the application (i.e., "This is a simple SPA for managing travel destinations").
4. Routing:
   - Use a minimal router implementation with no external libraries.
   - Define routes for:
     - `/` -> Home page
     - `/about` -> About page
5. Styling
   - Basic styling using inline CSS or `<style>` tags in your HTML file.

## Technical Constraints

1. JavaScript
   - Use only Vanilla JavaScript (no libraries like React, Vue, or Angular)
   - Avoid using frameworks; focus on DOM manipulation, events, and routing logic.
2. HTML
   - Write a single `index.html` file that serves as the base for your SPA.
3. CSS
   - Minimal styling; focus is on JavaScript functionality.

## Expected Deliverables

1. A working SPA with two functional pages:
   - A dynamic "Home" page for managing travel destinations.
   - A static "About" page.
2. The ability to add, display and delete destinations dynamically without reloading the page.
3. Navigation between pages without full page reloads, maintaining appropriate URLs.
