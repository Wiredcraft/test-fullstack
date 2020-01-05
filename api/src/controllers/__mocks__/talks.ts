import { RequestHandler } from "express";
import Errors from "../../constants/error";

const talks = [
  {
    id: "fakeId",
    title: "title",
    description: "description",
    author: {
      id: "1",
      name: "name"
    },
    votedAuthors: [
      {
        id: "1",
        name: "name"
      }
    ]
  }
];

export const getAll: RequestHandler = async (req, res) => {
  const result = talks.map(talk => {
    const { votedAuthors, author, ...others } = talk;
    return {
      ...others,
      vote: votedAuthors.length,
      isVoted: req.user
        ? !!votedAuthors.find(item => item.id === req.user?.id)
        : false,
      authorName: author.name
    };
  });

  res.success(result);
};

export const post: RequestHandler = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      res.error(Errors.MISSING_FIELD, {
        field: "title and/or description" // TODO: write a util function to handle this
      });
    }
    const result = {};
    res.success(result);
  } catch (error) {
    res.error(Errors.UNKNOWN, undefined, error);
  }
};

export const patch: RequestHandler = async (req, res) => {
  try {
    const data = req.body;

    const ALLOW_PATCH = ["isVoted"];

    const isAllowed = Object.keys(data).every(key => ALLOW_PATCH.includes(key));
    if (!isAllowed) {
      res.error(Errors.NOT_ALLOWED_UPDATE_TALK, {
        methods: ALLOW_PATCH.join(",")
      });
    }

    // Update vote
    if (typeof data.isVoted !== "undefined") {
      const result = {};
      res.success(result);
    } else {
      res.error(Errors.MISSING_FIELD, {
        field: "isVoted"
      });
    }
  } catch (error) {
    res.error(Errors.UNKNOWN, undefined, error);
  }
};
