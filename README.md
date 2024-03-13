# Konzek Frontend Developer Assignments

This project contains three assignments.

## Projects

### GraphQL & Filter

- Query GraphQL API and show the results in a list.
- E.g. input "search:tt group:continent" in search filter to search for the results containing "tt", and group those results by the value of a "continent" or any given title.
- Selectable and de-selectable list by clicking on them. One item can be selected at a time.
- Selected item's background should be picked from a predefined color set. The color should be different from previous selected item.
- After listing and after filtering, select the 10th item or the last one if the amount of items is smaller than 10.

### Kanban Board

- Users can create boards and add tasks.
- Tasks can be sort by dragging inside the board and draggable to other boards.
- Boards data persists in database.

### Authentication & Role Based Authorization

- Users can login, register as admin or user.
- Role based permission for both roles.
- Admin role has access to users list in the "User" page while user role can't see them.

## Technologies Used

- Next.js
- Nest.js
- MongoDB

## Installation

> 🚧 To run this application on your machine, you need to have [Node.js](https://nodejs.org/en/) and [MongoDB](https://www.mongodb.com) installed. Here are the steps:

1. Clone this repository to your local machine using

```
git clone https://github.com/ahmettancisoy/konzek.git
```

2. Install the dependencies in the both client and server folders.

```
npm install
```

## Running

1. Run server

```
npm run start:dev
```

2. Run client

```
npm run dev
```

3. Navigate your web browser to

```
http://localhost:3000
```

<b>“You’re all set!”</b>
