# Wiredcraft Full-stack Developer test

Make sure you read **all** of this document carefully, and follow the guidelines in it.

## Context

Build a [Hacker News](https://news.ycombinator.com/) like App but for lightning talk polling.

Sorry no mock here, please make a simple and beautiful page that get the job done. We don't mind whether it looks as great as **Hacker News**.

## User Story

1. User opens the page and could see a list of lighting talks order by rating submitted by other users;
2. If there's no lighting talk, simply put a placeholder text and encourage user to submit their own talks;
3. The user could vote for the lighting talk by clicking the vote button or icon;
4. After voting the user will get an updated version of the lighting talk list(order by rating);
5. User could always submit a lighting talk with `title`, `description`, and `username`;
6. The user could see his lighting talk on the list after submitting;

## Requirements

### Functionality

- The **frontend** part should be a single page application rendered in the frontend and load data from restful API (**not** rendered from backend).
- There should be a **backend** and database to store the lightning talks.

### Tech stack

- Backend oriented
    - Use [Loopback](http://loopback.io/) for the backend.
    - Use any **frontend** framework as you like.
- Frontend oriented
    - Use any **backend** framework as you like, even a static JSON file storage would do it.
    - Use React for the frontend.

### Bonus

- Write clear **documentation** on how it's designed and how to run the code.
- Provide proper unit test.
- Write good commit messages.
- An online demo is always welcome.

### Advanced requirements

These are used for some further challenges. You can safely skip them if you are not asked to do any, but feel free to try out.

- **Backend**:
    - Use [Seneca](http://senecajs.org/) to build the core feature and use a different framework (such as Express or Loopback) to handle HTTP requests.
    - Provide a complete user auth (authentication/authorization/etc) strategy, such as OAuth.
    - Provide a complete logging (when/how/etc) strategy.
    - Use a NoSQL DB and build a filter feature that can filter records with some of the attributes such as username. Do not use query languages such as MongoDB Query or Couchbase N1QL.
- **Frontend**:
    - *TODO*

## What We Care About

Feel free to use any libraries you would use if this were a real production App, but remember we're interested in your code & the way you solve the problem, not how well you can use a particular library.

We're interested in your method and how you approach the problem just as much as we're interested in the end result.

Here's what you should aim for:

- Good use of current HTML, CSS, and JavaScript & performance best practices.
- Solid testing approach.
- Extensible code.

## Q&A

> Where should I send back the result when I'm done?

Fork this repo and send us a pull request when you think you are done. We don't have a deadline for the task.

> What if I have a question?

Create a new issue in the repo and we will get back to you very quickly.

### TODO

- PostCSS
- Pagination / Infinite scrolling
