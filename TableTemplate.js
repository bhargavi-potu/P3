"use strict";

class TableTemplate {
  static fillIn(id, dict, columnName) {
    const table = document.getElementById(id);

    if (!table) {
      console.error(`Table with id '${id}' not found.`);
      return;
    }

    const headers = table.rows[0].cells;

    for (let i = 0; i < headers.length; i++) {
      const headerText = headers[i].textContent;
      const replacedText = this.replaceTemplateStrings(headerText, dict);
      headers[i].textContent = replacedText;
    }

    if (columnName) {
      const columnIndex = this.getColumnIndex(headers, columnName);

      if (columnIndex !== -1) {
        const rows = table.rows;

        for (let i = 1; i < rows.length; i++) {
          const cellText = rows[i].cells[columnIndex].textContent;
          const replacedText = this.replaceTemplateStrings(cellText, dict);
          rows[i].cells[columnIndex].textContent = replacedText;
        }
      } else {
        console.error(`Column '${columnName}' not found.`);
      }
    }

    table.style.visibility = "visible";
  }

  static replaceTemplateStrings(text, dict) {
    return text.replace(/\{\{(\w+)\}\}/g, (match, property) => {
      return dict[property] || "";
    });
  }

  static getColumnIndex(headers, columnName) {
    for (let i = 0; i < headers.length; i++) {
      if (headers[i].textContent === columnName) {
        return i;
      }
    }
    return -1;
  }
}
