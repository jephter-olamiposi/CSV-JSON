# 📊 CSV to JSON Converter API

A lightweight Node.js API that allows users to upload CSV files and returns their parsed content in JSON format. It uses Express for the server, Multer for file uploads, and the built-in `fs` module for asynchronous file handling and parsing.


## ⚙️ Tech Stack

- **Node.js**
- **Express**
- **Multer** for handling multipart/form-data uploads
- **fs/promises** for async file operations

## 🔁 API Usage

### `POST /upload-csv`

**Content-Type:** `multipart/form-data`  
**Form Field:** `file` (must be a `.csv` file)

#### ✅ Using Postman

1. Open Postman
2. Select `POST` as the request method
3. Enter the request URL: `http://localhost:3000/upload-csv`
4. Go to the **Body** tab
5. Select **form-data**
6. Add a key:
   - **Key**: `file`  
   - **Type**: `File`  
   - **Value**: Choose a `.csv` file from your system
7. Send the request

#### 📥 Response

Returns a JSON array of objects, each representing a row in the CSV file.

```json
[
  {
    "Name": "Alice",
    "Age": "28",
    "City": "New York"
  },
  {
    "Name": "Bob",
    "Age": "32",
    "City": "Chicago"
  }
]
```

## 🛠 How It Works

The application is structured into two main files:

### 1. `index.js` — Server & Upload Handler
- Sets up an Express server.
- Configures `Multer` to handle `.csv` file uploads and store them in the `/uploads` directory.
- Accepts `POST` requests on `/upload-csv` with a file field named `file`.
- After receiving a file:
  - It uses `logic.js` to parse the file contents into JSON.
  - Deletes the uploaded file from the disk after parsing.
  - Sends the parsed JSON response to the client.

### 2. `logic.js` — CSV to JSON Converter
- Uses the `fs.promises` API to read the uploaded file asynchronously.
- Splits the file content by line breaks (`\r\n`).
- Takes the first row as column headers and formats them (replacing spaces with underscores).
- Iterates over each remaining row:
  - Splits the row by commas.
  - Maps each value to its corresponding header to form a JSON object.
- Returns the final array of parsed JSON objects.


## ⚠️ Error Handling
- Returns 500 Internal Server Error if:
  - File is missing or not a .csv
  - There is an error during parsing or file deletion
- Validates both MIME type and file extension (.csv) before processing

## 🧹 Cleanup
- Uploaded CSV files are stored temporarily in the uploads/ directory and automatically deleted after successful parsing to avoid server clutter.

## 🚀 Getting Started

Follow the steps below to set up and run the project locally:

### 📦 1. Clone the repository

```bash
git clone https://github.com/your-username/csv-to-json-api.git
cd csv-to-json-api
```

```bash
npm install
```
```bash
node index.js
```
### The server will run on:
```
http://localhost:3000
```
