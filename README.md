# Log Management Application

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup


1. Install the dependencies:

    ```sh
    npm install
    ```

## Running the Application

2. Start the server:

    ```sh
    node server.js
    ```

2. Open your browser and navigate to:

    ```
    http://localhost:3000 (for macOS and Linux)
    ```
   

## API Endpoints

- `GET /logs` - Fetch all logs
- `POST /log` - Create a new log
- `DELETE /log/:id` - Delete a log by ID
- `GET /country` - Fetch country details
- `POST /country` - Save country details

## Usage

- To add a new log, fill in the log details and click the "Submit" button.
- To delete a log, click the "Delete" button next to the log entry.
- To update country details, fill in the country details and click the "Save" button.

## Notes

- Ensure the server is running before accessing the application in the browser.
- The application uses a `data.json` file to store logs and country details.