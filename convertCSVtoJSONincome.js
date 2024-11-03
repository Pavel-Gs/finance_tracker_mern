// Import the required modules using ES module syntax
import fs from 'fs';
import path from 'path';

// Function to convert date strings like "01-Jan-24" to a valid ISO format
const parseDate = (dateStr) => {
  // Remove any unwanted characters like \r
  const cleanedDateStr = dateStr.trim().replace('\r', '');
  const [day, month, year] = cleanedDateStr.split('-');
  const months = {
    Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
    Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
  };
  const fullYear = `20${year}`;
  return `${fullYear}-${months[month]}-${day}T00:00:00Z`;
};

// Define the function to convert CSV data to JSON format
const convertCSVToJSON = (csvData) => {
  // Split the CSV data by line breaks for each record
  const rows = csvData.trim().split('\n');
  
  // Map each row to a JavaScript object
  return rows.map((row) => {
    const columns = row.split(',');

    return {
      amountIncome: parseFloat(columns[1]),
      typeIncome: columns[3].trim(),
      categoryIncome: columns[5].trim(),
      commentsIncome: columns[7].trim(),
      locationIncome: columns[9].trim(),
      organizationName: columns[11].trim(),
      dateIncome: parseDate(columns[13].trim()), // Use parseDate here for proper formatting
    };
  });
};

// Define the input and output file paths
const inputFilePath = path.join('input.txt'); // Replace with your actual file path
const outputFilePath = path.join('output.json'); // Replace with your desired output path

// Read the CSV file and convert it to JSON
fs.readFile(inputFilePath, 'utf8', (err, csvData) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  const jsonData = convertCSVToJSON(csvData);
  
  fs.writeFile(outputFilePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log('JSON data saved successfully!');
    }
  });
});
