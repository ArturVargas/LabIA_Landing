// Google Apps Script para manejar la waitlist
// Copia este código en https://script.google.com/

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    
    if (action === 'addToWaitlist') {
      return addToWaitlist(data.data);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: 'Acción no válida' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    const action = e.parameter.action;
    
    if (action === 'getWaitlist') {
      return getWaitlist();
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: 'Acción no válida' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function addToWaitlist(entry) {
  try {
    // Reemplaza con el ID de tu hoja de cálculo
    const spreadsheetId = 'TU_SPREADSHEET_ID_AQUI';
    const sheet = SpreadsheetApp.openById(spreadsheetId).getActiveSheet();
    
    // Verificar si el email ya existe
    const data = sheet.getDataRange().getValues();
    const emailColumn = 0; // Asumiendo que el email está en la primera columna
    
    for (let i = 1; i < data.length; i++) { // Empezar desde 1 para saltar el header
      if (data[i][emailColumn] === entry.email) {
        return ContentService
          .createTextOutput(JSON.stringify({ 
            success: false, 
            error: 'Este email ya está registrado' 
          }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }
    
    // Agregar nueva fila
    const newRow = [
      entry.email,
      entry.name,
      entry.language,
      entry.timestamp,
      entry.utm_source,
      entry.utm_medium,
      entry.utm_campaign
    ];
    
    sheet.appendRow(newRow);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getWaitlist() {
  try {
    // Reemplaza con el ID de tu hoja de cálculo
    const spreadsheetId = 'TU_SPREADSHEET_ID_AQUI';
    const sheet = SpreadsheetApp.openById(spreadsheetId).getActiveSheet();
    
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const rows = data.slice(1);
    
    const entries = rows.map(row => {
      const entry = {};
      headers.forEach((header, index) => {
        entry[header.toLowerCase().replace(/\s+/g, '_')] = row[index];
      });
      return entry;
    });
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, data: entries }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
