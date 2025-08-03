# SQL Learn Playground

[![GitHub license](https://img.shields.io/badge/license-GPLv3-blue.svg)](LICENSE)
[![GitHub Pages](https://github.com/justinjdaniel/sql-lear-playground/actions/workflows/static.yml/badge.svg)](https://justinjdaniel.github.io/sql-lear-playground/)

sql-learn-playground is an interactive, browser-based SQL training app that lets you write, test, and explore SQL queries on a built-in dummy database. Featuring a beautiful UI and a fully client-side SQL engine, it’s perfect for learning and practicing SQL without any setup or backend required.

## Features

*   **Interactive SQL Editor**: A powerful editor with syntax highlighting and intelligent autocompletion for SQL keywords, table names, and column names, powered by Monaco Editor.
*   **Client-Side SQL Engine**: Uses `sql.js` (SQLite compiled to WebAssembly) to run SQL queries directly in the browser. No server needed!
*   **Dummy Data**: Comes pre-loaded with `customers` and `orders` tables to get you started right away.
*   **Upload Local Data**: Upload your own CSV or JSON files to create new tables in the database and practice with your own data.
*   **Schema Explorer**: Explore the database schema, view tables and their columns.
*   **Theme Change Option**: Switch between light and dark themes for the editor.
*   **Result Display**: View your query results in a clean, easy-to-read table.
*   **Improved Error Handling**: Get immediate, user-friendly feedback on any errors in your SQL queries.
*   **Practice Suggestions**: When your query has an error, the playground will suggest a relevant topic to practice.
*   **Tips Section**: A handy section with tips for writing SQL queries.

## How to Use

1.  Open the `index.html` file in your web browser.
2.  Write your SQL query in the editor.
3.  Click the "Run Query" button to see the results.
4.  (Optional) Click the "Upload Data" button to upload your own CSV or JSON file.
5.  (Optional) Click the "Toggle Theme" button to switch between light and dark themes.

## Sample Queries

Here are a few sample queries you can try:

*   `SELECT * FROM customers;`
*   `SELECT * FROM orders;`
*   `SELECT name, email FROM customers WHERE id = 1;`
*   `SELECT c.name, o.amount FROM customers c JOIN orders o ON c.id = o.customer_id;`

## Technology Stack

*   **HTML/CSS/JavaScript**: The core of the application.
*   **Monaco Editor**: Provides the code editor with syntax highlighting and autocompletion.
*   **sql.js**: A JavaScript library that provides a SQLite database in the browser.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.
