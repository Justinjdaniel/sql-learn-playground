// db.js - handles database interactions

// Initialize the database
let db;
let tableSchemas = {};

/**
 * Initializes the SQL.js database and loads the initial dummy data.
 */
async function initDb() {
  const SQL = await initSqlJs({
    locateFile: (file) =>
      `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.13.0/${file}`,
  });
  db = new SQL.Database();
  loadDummyData("customers");
}

/**
 * Loads a selected dummy dataset into the database.
 * @param {string} dataset The name of the dataset to load.
 */
function loadDummyData(dataset) {
  // Clear existing tables
  const tables = db.exec("SELECT name FROM sqlite_master WHERE type='table';");
  tables[0].values.forEach((table) => {
    db.run(`DROP TABLE ${table[0]};`);
  });

  if (dataset === "customers") {
    db.run("CREATE TABLE customers (id INT, name VARCHAR, email VARCHAR);");
    db.run(
      "INSERT INTO customers VALUES (1, 'John Smith', 'john.smith@example.com'), (2, 'Jane Doe', 'jane.doe@example.com'), (3, 'Peter Jones', 'peter.jones@example.com');"
    );
    db.run("CREATE TABLE orders (id INT, customer_id INT, amount REAL);");
    db.run(
      "INSERT INTO orders VALUES (1, 1, 100.50), (2, 1, 25.00), (3, 2, 75.25), (4, 3, 50.00);"
    );
  } else if (dataset === "employees") {
    db.run(
      "CREATE TABLE employees (id INT, first_name VARCHAR, last_name VARCHAR, department_id INT);"
    );
    db.run(
      "INSERT INTO employees VALUES (1, 'John', 'Doe', 1), (2, 'Jane', 'Smith', 1), (3, 'Peter', 'Jones', 2);"
    );
    db.run("CREATE TABLE departments (id INT, name VARCHAR);");
    db.run("INSERT INTO departments VALUES (1, 'Sales'), (2, 'Marketing');");
  }

  // Store table schemas and render explorer
  updateSchema();
}

/**
 * Updates the schema information and re-renders the schema explorer.
 */
async function updateSchema() {
  const tables = db.exec("SELECT name FROM sqlite_master WHERE type='table';");
  tableSchemas = {};
  tables[0].values.forEach((table) => {
    const tableName = table[0];
    const columns = db.exec(`PRAGMA table_info(${tableName});`);
    tableSchemas[tableName] = columns[0].values.map((col) => col[1]);
  });
  renderSchema();
}

/**
 * Provides a practice suggestion based on the error message.
 * @param {string} errorMessage The error message from the SQL engine.
 * @returns {string} A practice suggestion.
 */
function getPracticeSuggestion(errorMessage) {
  if (errorMessage.includes("no such table")) {
    return "It seems like you are trying to query a table that does not exist. You can see the available tables in the autocomplete suggestions.";
  }
  if (errorMessage.includes("no such column")) {
    return "It seems like you are trying to query a column that does not exist. You can see the available columns for each table in the autocomplete suggestions.";
  }
  if (errorMessage.includes("syntax error")) {
    return 'It seems like there is a syntax error in your query. You can review the SQL syntax in the "Tips" section.';
  }
  return "";
}
