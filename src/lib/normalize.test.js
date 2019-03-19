import normalize, { denormalize } from "./normalize";

const userSchema = {
  key: "users",
  idName: "name"
};

const commentSchema = {
  key: "comments"
};

const articleSchema = {
  key: "articles",
  nestedString: {
    author: userSchema
  },
  nested: {
    comments: commentSchema
  }
};

userSchema.nested = {
  articles: articleSchema
};

const user = {
  name: "Joe"
};

const articles = [
  {
    id: 1,
    title: "Article 1",
    author: user.name,
    comments: [{ id: 1, content: "Comment 1" }, { id: 2, content: "Comment 2" }]
  },
  {
    id: 2,
    title: "Article 2",
    author: user.name,
    comments: [{ id: 3, content: "Comment 3" }, { id: 4, content: "Comment 4" }]
  }
];

user.articles = articles;

function deepFreeze(value) {
  if (typeof value !== "object") return;

  if (!Array.isArray(value)) {
    for (let k in value) {
      deepFreeze(value[k]);
    }
  }

  return Object.freeze(value);
}

test("nested schema with circular references", () => {
  const state = deepFreeze(normalize(user, userSchema));

  expect(state).toMatchInlineSnapshot(`
Object {
  "entities": Object {
    "articles": Object {
      "1": Object {
        "author": "Joe",
        "comments": Array [
          1,
          2,
        ],
        "id": 1,
        "title": "Article 1",
      },
      "2": Object {
        "author": "Joe",
        "comments": Array [
          3,
          4,
        ],
        "id": 2,
        "title": "Article 2",
      },
    },
    "comments": Object {
      "1": Object {
        "content": "Comment 1",
        "id": 1,
      },
      "2": Object {
        "content": "Comment 2",
        "id": 2,
      },
      "3": Object {
        "content": "Comment 3",
        "id": 3,
      },
      "4": Object {
        "content": "Comment 4",
        "id": 4,
      },
    },
    "users": Object {
      "Joe": Object {
        "articles": Array [
          1,
          2,
        ],
        "name": "Joe",
      },
    },
  },
  "result": "Joe",
}
`);

  const userState = state.entities.users[user.name];

  expect(denormalize(userState, userSchema, state.entities)).toEqual(user);
});

test("schema without key", () => {
  const schema = {
    key: null,
    article: articleSchema,
    comment: commentSchema
  };

  const data = [{ article: articles[0] }, { comment: articles[0].comments[0] }];

  const state = deepFreeze(normalize(data, schema));

  expect(state).toMatchInlineSnapshot(`
Object {
  "entities": Object {},
  "result": Array [
    Object {
      "article": Object {
        "author": "Joe",
        "comments": Array [
          Object {
            "content": "Comment 1",
            "id": 1,
          },
          Object {
            "content": "Comment 2",
            "id": 2,
          },
        ],
        "id": 1,
        "title": "Article 1",
      },
    },
    Object {
      "comment": Object {
        "content": "Comment 1",
        "id": 1,
      },
    },
  ],
}
`);

  expect(denormalize(state.result, schema, state.entities)).toEqual(data);
});
