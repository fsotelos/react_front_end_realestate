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

- `components/`: Contains reusable UI components such as PropertyCard, PropertyList, Filters, and Header.
- `services/`: Houses service modules like api.js and PropertyService.js for handling API interactions and business logic.
- `repositories/`: Includes PropertyRepository.js for data access and management.
- `application/`: Contains application-specific logic, such as PropertyApplication.js.
- `__tests__/`: Directory for Jest test files covering components, services, and integration tests.
- `src/`: Additional source files, including setupTests.js for test configuration.
