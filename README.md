# Real Estate Frontend

## Project Overview

This frontend application is part of a Senior Frontend Developer Technical Test for a large real estate company. Built with ReactJS, it serves as the user interface for displaying property data retrieved from a backend API. The backend is developed using .NET 8/9 and utilizes MongoDB as the database. The application provides a clean, responsive interface for browsing properties, applying filters, and viewing detailed information.

## Features

- **Property Data Fetching**: Retrieves property listings from the backend API.
- **Property List Display**: Shows a grid or list of available properties.
- **Filtering Capabilities**:
  - Filter by property name
  - Filter by address
  - Filter by price range
- **Property Details View**: Displays detailed information for a selected property.
- **Responsive Design**: Optimized layout for both desktop and mobile devices.
- **Error Handling and Loading States**: Manages API errors and displays loading indicators during data fetches.

## Technologies Used

- **ReactJS**: Core framework for building the user interface.
- **Axios**: HTTP client for making API requests to the backend.
- **TailwindCSS**: Utility-first CSS framework for styling and responsive design.
- **Jest**: Testing framework for unit and integration tests.
- **Vite**: Build tool and development server for fast project setup and hot reloading.

## Folder Structure

<img width="196" height="247" alt="image" src="https://github.com/user-attachments/assets/b2ac5f51-c6c1-4a1f-9e2c-3ca50695ba2d" />


- `components/`: Contains reusable UI components such as PropertyCard, PropertyList, Filters, and Header.
- `services/`: Houses service modules like api.js and PropertyService.js for handling API interactions and business logic.
- `repositories/`: Includes PropertyRepository.js for data access and management.
- `application/`: Contains application-specific logic, such as PropertyApplication.js.
- `__tests__/`: Directory for Jest test files covering components, services, and integration tests.
- `src/`: Additional source files, including setupTests.js for test configuration.

## Installation and Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Steps
1. Clone the repository:
   ```
   git clone <repository-url>
   cd realestate-frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```
   The application will run on `http://localhost:3000` by default.

4. To run tests:
   ```
   npm test
   ```

5. To build for production:
   ```
   npm run build
   ```

### Backend API Configuration

The frontend connects to a .NET 8/9 backend API that provides property data from a MongoDB database. The API base URL is configured via the `REACT_APP_API_BASE_URL` environment variable.

#### Default Configuration
- **Base URL**: `https://localhost:7259/api/v1.0`
- **Endpoints**:
  - `GET /properties` - Retrieve list of properties with optional filters
  - `GET /properties/{id}` - Retrieve details for a specific property

#### Environment Variables
To configure the API connection, create a `.env` file in the root directory:

```
REACT_APP_API_BASE_URL=https://your-api-domain.com/api/v1.0
```

#### API Filters
The properties endpoint supports the following query parameters:
- `name` - Filter by property name
- `address` - Filter by property address
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter

### Notes
- Ensure the backend API is running and accessible before starting the frontend.
- The application uses Create React App for setup and development.
- CORS must be configured on the backend to allow requests from the frontend domain.
