// main.js - initializes the application

require.config({
  paths: {
    vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.52.2/min/vs",
  },
});
require(["vs/editor/editor.main"], function () {
  // Register a completion item provider for SQL
  monaco.languages.registerCompletionItemProvider("sql", {
    provideCompletionItems: function (model, position) {
      const suggestions = [];
      // Add SQL keywords
      const keywords = [
        "SELECT",
        "FROM",
        "WHERE",
        "JOIN",
        "ON",
        "GROUP BY",
        "ORDER BY",
        "LIMIT",
        "INSERT INTO",
        "VALUES",
        "UPDATE",
        "SET",
        "DELETE",
      ];
      keywords.forEach((keyword) => {
        suggestions.push({
          label: keyword,
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: keyword,
        });
      });

      // Add table names
      Object.keys(tableSchemas).forEach((tableName) => {
        suggestions.push({
          label: tableName,
          kind: monaco.languages.CompletionItemKind.Folder,
          insertText: tableName,
        });
      });

      // Add column names
      Object.values(tableSchemas)
        .flat()
        .forEach((columnName) => {
          suggestions.push({
            label: columnName,
            kind: monaco.languages.CompletionItemKind.Field,
            insertText: columnName,
          });
        });

      return { suggestions: suggestions };
    },
  });

  // Initialize the editor
  editor = monaco.editor.create(document.getElementById("editor"), {
    value: "SELECT * FROM customers;",
    language: "sql",
    theme: "vs-dark",
  });

  // Initialize the database and UI
  initDb().then((db) => {
    initializeUI(db, editor);
  });
});
