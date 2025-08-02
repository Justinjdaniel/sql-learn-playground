# SQL Learn Playground

sql-learn-playground is an interactive, browser-based SQL training app that lets you write, test, and explore SQL queries on a built-in dummy database. Featuring a beautiful UI and a fully client-side SQL engine, it’s perfect for learning and practicing SQL without any setup or backend required.

## Features

*   **Interactive SQL Editor**: A powerful editor with syntax highlighting, powered by Monaco Editor.
*   **Client-Side SQL Engine**: Uses `sql.js` (SQLite compiled to WebAssembly) to run SQL queries directly in the browser. No server needed!
*   **Dummy Data**: Comes pre-loaded with `customers` and `orders` tables to get you started right away.
*   **Result Display**: View your query results in a clean, easy-to-read table.
*   **Error Handling**: Get immediate feedback on any errors in your SQL queries.

## How to Use

1.  Open the `index.html` file in your web browser.
2.  Write your SQL query in the editor.
3.  Click the "Run Query" button to see the results.

## Sample Queries

Here are a few sample queries you can try:

*   `SELECT * FROM customers;`
*   `SELECT * FROM orders;`
*   `SELECT name, email FROM customers WHERE id = 1;`
*   `SELECT c.name, o.amount FROM customers c JOIN orders o ON c.id = o.customer_id;`

## Technology Stack

*   **HTML/CSS/JavaScript**: The core of the application.
*   **Monaco Editor**: Provides the code editor with syntax highlighting.
*   **sql.js**: A JavaScript library that provides a SQLite database in the browser.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.
## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.