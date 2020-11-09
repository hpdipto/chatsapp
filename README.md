# ChatsApp

This is a real time room based chatting app. Here a user can Login/Register and then user have to Create or Join in a particular chat room to start chatting in the room.

For this project,

- In backend I used Node with Express and MongoDB as database. I also used GraphQL instead of REST API though there is two REST API route.
- In frontend, I used React with NextJS. I used Redux for state management. For this particular app, Redux was not a must but it'll help to scale the project further. I also used GraphQL client to interact with backend GraphQL.

The project directory structure is mostly self explanatory, the directory _backend_ contains all the code for backend. The directory _client_ contains all the codes for frontend.

Here is a quick overview of the project structure:

## backend

In the _src_ directory almost all the code for backend is stored.

The _server.ts_ is the core script to run the server for the backend.

The other directories are:

- config
- models
- resolvers
- routes
- schemas

The directory _config_ contains password configuration with passport.js.
The directory _models_ contains database configuration.
The directory _resolvers_ contains the GraphQL resolvers.
The directory _routes_ contains some API routes.
The directory _schemas_ contains GraphQL schmeas.

## client

Inside the client directory all the frontend codes exists.

The main directories of _client_ directory are:

- components
- pages
- public
- queries
- redux
- styles

The directory _components_ contains all the components.
The directory _pages_ contains all the pages in NextJS.
The directory _public_ contains the images.
The directory _queries_ contains client side GraphQL queries.
The directory _redux_ contains all Redux codes.
The directory _styles_ contains all custom CSS files.
