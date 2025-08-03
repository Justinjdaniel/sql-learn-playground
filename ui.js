// ui.js - handles UI interactions and updates

let editor;
let currentTheme = "vs-dark";

/**
 * Renders the database schema in the schema explorer.
 */
function renderSchema() {
  const schemaList = document.getElementById("schema-list");
  schemaList.innerHTML = "";
  Object.keys(tableSchemas).forEach((tableName) => {
    const tableLi = document.createElement("li");
    tableLi.textContent = tableName;
    const columnsUl = document.createElement("ul");
    columnsUl.style.display = "none";
    tableSchemas[tableName].forEach((columnName) => {
      const columnLi = document.createElement("li");
      columnLi.textContent = columnName;
      columnsUl.appendChild(columnLi);
    });
    tableLi.appendChild(columnsUl);
    tableLi.addEventListener("click", (e) => {
      e.stopPropagation();
      columnsUl.style.display =
        columnsUl.style.display === "none" ? "block" : "none";
    });
    schemaList.appendChild(tableLi);
  });
}

/**
 * Initializes the UI components and event listeners.
 */
function initializeUI(db, editor) {
  const runButton = document.getElementById("run-button");
  const themeButton = document.getElementById("theme-button");
  const resultsDiv = document.getElementById("results");
  const errorDiv = document.getElementById("error");
  const fileInput = document.getElementById("file-input");
  const uploadButton = document.getElementById("upload-button");
  const refreshSchemaButton = document.getElementById("refresh-schema-button");
  const dummyDataSelect = document.getElementById("dummy-data-select");

  dummyDataSelect.addEventListener("change", (event) => {
    loadDummyData(event.target.value);
  });

  themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    currentTheme = document.body.classList.contains("dark-theme")
      ? "vs-dark"
      : "vs-light";
    monaco.editor.setTheme(currentTheme);
  });

  uploadButton.addEventListener("click", () => fileInput.click());

  fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      const contents = e.target.result;
      const tableName = file.name.split(".")[0];
      if (file.name.endsWith(".csv")) {
        const lines = contents.split("\n");
        const headers = lines[0].split(",");
        const createTableQuery = `CREATE TABLE ${tableName} (${headers
          .map((h) => `${h.trim()} TEXT`)
          .join(", ")});`;
        db.run(createTableQuery);

        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(",");
          if (values.length === headers.length) {
            const insertQuery = `INSERT INTO ${tableName} VALUES (${values
              .map((v) => `'${v.trim()}'`)
              .join(", ")});`;
            db.run(insertQuery);
          }
        }
      } else if (file.name.endsWith(".json")) {
        const data = JSON.parse(contents);
        const headers = Object.keys(data[0]);
        const createTableQuery = `CREATE TABLE ${tableName} (${headers
          .map((h) => `${h} TEXT`)
          .join(", ")});`;
        db.run(createTableQuery);

        data.forEach((row) => {
          const values = headers.map((h) => `'${row[h]}'`).join(", ");
          const insertQuery = `INSERT INTO ${tableName} VALUES (${values});`;
          db.run(insertQuery);
        });
      }
      // Refresh schema for autocompletion and explorer
      updateSchema();
      alert(`Table '${tableName}' created successfully!`);
    };
    reader.readAsText(file);
  });

  runButton.addEventListener("click", () => {
    const query = editor.getValue();
    resultsDiv.innerHTML = ""; // Clear previous results
    errorDiv.style.display = "none"; // Clear previous errors

    try {
      const results = db.exec(query);
      if (results.length > 0) {
        results.forEach((result) => {
          const table = document.createElement("table");
          const thead = document.createElement("thead");
          const tbody = document.createElement("tbody");
          const headerRow = document.createElement("tr");
          result.columns.forEach((col) => {
            const th = document.createElement("th");
            th.textContent = col;
            headerRow.appendChild(th);
          });
          thead.appendChild(headerRow);
          result.values.forEach((row) => {
            const tr = document.createElement("tr");
            row.forEach((cell) => {
              const td = document.createElement("td");
              td.textContent = cell;
              tr.appendChild(td);
            });
            tbody.appendChild(tr);
          });
          table.appendChild(thead);
          table.appendChild(tbody);
          resultsDiv.appendChild(table);
        });
      } else {
        resultsDiv.textContent =
          "Query executed successfully, but no results were returned.";
      }
    } catch (e) {
      const suggestion = getPracticeSuggestion(e.message);
      errorDiv.innerHTML = `Oops! It looks like there's an error in your SQL query: ${e.message}<br>${suggestion}`;
      errorDiv.style.display = "block";
    }
  });

  refreshSchemaButton.addEventListener("click", updateSchema);
}
