# Contrived Web Application for Wiredcraft Full-stack Developer Test

Live demo available at [45.76.253.20](http://45.76.253.20).

## Install on Local Machine

### Prerequisites

- Not a too old version of Node.js which already implemented the `Object Rest/Spread Properties` proposal;
- PostgreSQL version >= 9, installation guide see below;
- Of course clone the repo and run `npm install` first.

### Init Database

```
$ psql -f api/definition.sql
```

### Run API Server

```
$ node api
```

It will print information about how to access it.

### Run Development Web Server

```
$ make dev
```

It will:
- Copy required vendor scripts to `dist/` directory;
- Start a Node.js server for server side rendering (React SSR) which can hot reload itself when any dependencies in `src` directory changes;
- Start `rollup.watch` to build assets required by client to `dist/` dir and auto rebuild them.

Pay attention to its stdout for better use of it.

## PostgreSQL Installation Guide

On latest MacOS:

```
$ brew update
$ brew install postgresql
```

You will have a `postgres` command to start the PostgreSQL server. It must know where to find the data directory it is supposed to use. This is done with the -D option:

```
$ postgres -D /usr/local/var/postgres
```

which is the default path where Homebrew has automatically created the data directory for you.

You can then use `psql` interactive tool to access and manage your database.

NOTE: All default values including those the Node.js PostgreSQL driver (npm: `pg`) is using should **just work** when nothing is changed. If you have more specific requirements (e.g. your machine already have a PostgreSQL database in other use), you have to resolve them on your own.

## Design

### Complete Functional Front End using React Hooks

One of the biggest change React Hooks brings to the codebase IMO is that many popular libraries in React ecosystem become unnecessary.

Redux once solved many problems in the old days with some ever lasting headaches coming with it:
- Related logic is separated between too many files. (actions, reducers, container/connected components, normal components)
- Even implementing a very simple feature requires many boilerplate code and is really a chore.
- Composed reducers are often too fine-grained, making access to previous state in other reducer scopes hard. (Often resolved by pass required previous state in action object, again making related code separated.)

While with the ability to define common logic in one place using React Hooks:
- Action creators become custom Hooks, with natural ability to be asynchronous (they are just functions). We stop worrying about how to access them in components because reading proper context variable (perhaps `dispatch` function) now can be done in corresponding Hook code.

```js
import useItem from "./useItem";

const Component = id => {
  // This hook fetch the needed data from server and provide necessary state.
  const [item, loading, error] = useItem("resourceName", id);

  if (error) {
    return "Item failed to load.";
  }
 
  if (loading) {
    return `Item ${id} is loading...`;
  }
	
  return `Got item ${item.title}`;	
}
```

- Reading context is just one line of code, wouldn't introduce more nesting in JSX. As long as you have a good state shape design, writing complex but one-time interactive features now can be done directly in corresponding component, with all code in one place!
- React Hooks provide built-in Hook called `useReducer` which is ideal for managing global state.

Besides, in this contrived app I even abandoned action types, all actions dispatched have the same shape as global state and will finnally got deep merged directly into the previous state.

```js
const initialState = {
  items: {},
  reqs: {}
};

const rootReducer = (state, action) => {
  return deepMerge(state, action);
};

// somewhere in custom Hook or component:
dispatch({ reqs: { talks: [true] } });
// then later:
dispatch({ reqs: { talks: [false] }, items: { talks } });
// or:
dispatch({ reqs: { talks: [false, someError] } });
```

IMO at least when app is small, this is quite convenient and let the state change caused by a global dispatch esaier to reason about.

### Data Cache for SPAs and Robust Fetch State Management

It dosn't make sense if a Single Page Web Application have to wait every time for the data a page depends on when its `location` changes:
- A `pop` history action (aka user navigate back or forward) should not load data when data is already loaded before.
- In other case if data is already loaded then render it immediately, but reload with a visual indication to let user know the application is loading data.

Consistent, robust and user friendly data fetching management in SPAs is hard, in fact much harder than most people would have thought:
- There should be always visual indication when the application is loading data.
- In some case when the server/network response the data fast (as in most cases it should), the visual indication should not flash to cause confusion. Better delay its appearance when a small amount of time have passed and data is still pending.
- When there is an error fetching data, especially when its important user actions, proper error message should be displayed and also a retry button is sometimes necessary.
- Action triggers (page transition, button etc.) should not casue unnecessary duplicating requests.
- A slow request should be canceled when its not required any more, e.g. user has been waiting too long and decide to move to anther view.

This application meets most of the requirements above, however canceling a `window.fetch` request is not implemented yet.

### A Fast React Server Side Rendering Solution

Problem a non SSR site, especially a static but interaction-heavy site may encounter is that it often takes too long for the application to become interactive.

With the help of React Hooks, some hard tricks for React SSR is much simpler.

This application doesn't serve dynamic React markup from server side, it only serialize the initial state required by the first render and make sure when client finishes loading all assets and `ReactDOM` finishes rendering the screen, everything is interactive.

This approach doesn't introduce duplicate HTML content most approaches does. And avoids the confusion when user are trying to interact with a server rendered page but javascript hasn't been downloaded and parsed yet.

### Back End Data Consistency

The contrived API need to implement a interface for different users voting different "talks" and then sort the talks by votes they've got. One may easily get the idea to store users and talks in two data table/collections, and store the voting relations in a third one. A counting number is also store in talks for sorting.

Problem may occur when try to update a vote result, causing the count and the data in relation table inconsistent.

By using PostgreSQL transaction, the API can make sure when something goes wrong, nothing get updated. Thanks to the Node.js async/await syntax, implementing such a branching logic isn't a hard thing at all.
