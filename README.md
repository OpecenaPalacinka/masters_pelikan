# Academic diary

## Description

This application is for collecting user stories of doctoral students.

## Installation

1. Clone the repository.
2. Navigate to the project directory.
3. In project root, run `docker compose up` (ensure to have docker running).
4. Move to ./api/ folder and run `yarn install`.
5. Generate graphql with `yarn graphql`.
6. Run the dev server with `yarn dev`.
7. Move to 'frontend' folder and run `yarn install`.
8. Generate graphql with `yarn graphql-codegen` (make sure, that API is running).
9. Run dev server `yarn dev`.
10. In your DB client use `./api/migrations/createDBStructure.sql` to generate DDL.
11. Then run `./api/migrations/populateDbDefaultData.sql` to generate default data.

## Usage

After installing all the dependencies. You can start using the application.
There are predefined users with events and admin rights. Password is always same: 123abc

