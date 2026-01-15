Product Hub is a web application built with Next.js and TailwindCSS that allows users to manage
and view products through a clean and responsive interface. It includes user authentication,
protected routes, and dynamic product management features.


Setup & Installation Instructions

1. Install Node.js (v18 or higher).
2. Clone the project repository.
3. Run npm install to install all required dependencies listed in package.json.
4. Run npm run dev to start the development server.
5. Open http://localhost:3000 in your browser.

Route Summary

/ - Home page
/login - Login page
/items - Product list
/items/[id] - Product details 
/addItems - Add product (protected)

Implemented Features

- User Authentication (login & protected routes)
- Product CRUD operations
- Responsive UI with TailwindCSS
- Active navigation highlighting
- Cookie-based session handling

Feature Explanation

Authenticated users can manage products securely. The UI adapts to all screen sizes, and
sessions are maintained using cookies for better user experience.