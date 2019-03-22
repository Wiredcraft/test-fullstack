import React, { useMemo } from "react";
import { create } from "react-test-renderer";
import Router, { Routes } from "./router";

const Home = () => <div>Home</div>;

const ArticleList = () => <div>ArticleList</div>;

const Article = ({ params: [id] }) => <div>{`Article ${id}`}</div>;

const AllUsers = ({ children }) => (
  <div>
    AllUsers
    {children}
  </div>
);

const User = ({ params: [id], children }) => (
  <div>
    {`User ${id}`}
    {children}
  </div>
);

const NotFound = () => <div>NotFound</div>;

const App = ({ location }) => {
  const routes = useMemo(
    () => [
      ["/", Home],
      ["/articles", ArticleList],
      ["/articles/:id", Article],
      [
        "/users",
        AllUsers,
        [":id", User, ["articles", ArticleList], ["articles/:id", Article]]
      ]
    ],
    []
  );

  return (
    <Router serverLocation={location}>
      <main>
        <Routes routes={routes} notFound={NotFound} />
      </main>
    </Router>
  );
};

test("simple route path", () => {
  const renderer = create(<App location={{ pathname: "/" }} />);
  const json = renderer.toJSON();
  expect(json).toMatchInlineSnapshot(`
<main>
  <div>
    Home
  </div>
</main>
`);
});

test("route path contains parameters", () => {
  const renderer = create(<App location={{ pathname: "/articles/1" }} />);
  expect(renderer.toJSON()).toMatchInlineSnapshot(`
<main>
  <div>
    Article 1
  </div>
</main>
`);
});

test("sub routes matches at level 1", () => {
  const renderer = create(<App location={{ pathname: "/users" }} />);
  expect(renderer.toJSON()).toMatchInlineSnapshot(`
<main>
  <div>
    AllUsers
  </div>
</main>
`);
});

test("sub routes matches at level 2", () => {
  const renderer = create(<App location={{ pathname: "/users/1" }} />);
  expect(renderer.toJSON()).toMatchInlineSnapshot(`
<main>
  <div>
    AllUsers
    <div>
      User 1
    </div>
  </div>
</main>
`);
});

test("sub routes matches at level 3", () => {
  const renderer = create(<App location={{ pathname: "/users/1/articles" }} />);
  expect(renderer.toJSON()).toMatchInlineSnapshot(`
<main>
  <div>
    AllUsers
    <div>
      User 1
      <div>
        ArticleList
      </div>
    </div>
  </div>
</main>
`);
});

test("sub routes matches at level 3 with parameters", () => {
  const renderer = create(
    <App location={{ pathname: "/users/1/articles/2" }} />
  );
  expect(renderer.toJSON()).toMatchInlineSnapshot(`
<main>
  <div>
    AllUsers
    <div>
      User 1
      <div>
        Article 2
      </div>
    </div>
  </div>
</main>
`);
});

test("render `notFound` prop if none matched", () => {
  const renderer = create(<App location={{ pathname: "/do/not/exist" }} />);
  expect(renderer.toJSON()).toMatchInlineSnapshot(`
<main>
  <div>
    NotFound
  </div>
</main>
`);
});
