# Simple API - Rocketseat Node.js Challenge

This is a simple API created as part of the Node.js course challenge from Rocketseat.

## Requirements

- [x] **User Creation**: It must be possible to create a user.
- [x] **User Identification**: The user must be identifiable between requests.
- [x] **Meal Registration**: It must be possible to register a meal with the following information:
  - Name
  - Description
  - Date and Time
  - Whether it is part of the diet or not
- [x] **Meal Relation to User**: Meals should be related to a user.
- [x] **List All Meals**: It must be possible to list all meals of a specific user.
- [x] **View Single Meal**: It must be possible to view a single meal.
- [x] **Edit Meal**: It must be possible to edit a meal, modifying all the data listed above.
- [x] **Delete Meal**: It must be possible to delete a meal.
- [x] **User Metrics**: It must be possible to retrieve the following metrics for a user:
  - Total number of meals registered
  - Total number of meals within the diet
  - Total number of meals outside the diet
  - Best sequence of meals within the diet
- [x] **Access Control**: A user can only view, edit, or delete meals that they have created.

## API Endpoints

- **POST /users**: Create a new user
- **POST /meals**: Register a new meal
- **GET /meals**: List all meals
- **GET /meals/:id**: View a single meal
- **PUT /meals/:id**: Edit a meal
- **DELETE /meals/:id**: Delete a meal
- **GET /metrics**: Retrieve user metrics (total meals, diet status, best diet sequence)

## Technology Stack

- Node.js
- Fastify
- Knex.js
- SQLite 
- Zod
