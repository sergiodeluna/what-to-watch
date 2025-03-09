# What to Watch

What to Watch helps families find the perfect movies and series to enjoy together. Get personalized recommendations based on shared preferences, vote on options, and make movie nights easier and more fun. Discover, decide, and watch—together!

## Features

- Personalized movie and series recommendations based on user preferences.
- Voting system to decide on the next movie or series.
- Easy-to-use interface for both browsing and voting.

## Technology Stack

### Backend

- **Java** with **Spring Boot**: The backend is built using Java with Spring Boot, providing a robust and scalable solution for handling business logic, data management, and user interactions.

### Frontend

- **React** with **TypeScript**: The frontend is built with React and TypeScript, providing a dynamic and responsive user interface.
- **NestJS**: For handling the API requests and serving data from the backend to the frontend efficiently.

## Installation

To run this project locally, follow these steps:

### Backend

1. Clone the repository:
   ```bash
   git clone https://github.com/sergiodeluna/what-to-watch.git
   cd what-to-watch/backend

2. Install dependencies:
   ```bash
   ./gradlew build

3. Run the application:
   ```bash
   ./gradlew bootRun

### Frontend

1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   
2. Install dependencies:
   ```bash
   npm install

3. Start the development server:   
   ```bash
   npm start

## Testing

It is crucial to write unit and integration tests to ensure the application works as expected. The project includes support for testing:

- **Backend**: Use **JUnit** and **Mockito** for unit tests, and **Spring Boot Test** for integration tests.
- **Frontend**: Use **Jest** and **React Testing Library** for unit and integration tests.

Make sure to write tests for new features and bug fixes to maintain high quality in the codebase.

## Contributing

We welcome contributions to make the app even better! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Write tests for any new features.
4. Make your changes and ensure the tests pass.
5. Submit a pull request describing your changes.

## License

This project is proprietary and all rights are reserved. No part of this project may be used, copied, modified, or distributed without prior written permission from the author.