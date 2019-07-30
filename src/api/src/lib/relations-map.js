const userFields = ["id", "username"]

const articleFields = [
  "id",
  "slug",
  "title",
  "description",
  "created_at",
  "updated_at",
]

const votingField = ["id", "author"]

const relationsMaps = [
  {
    mapId: "articleMap",
    idProperty: "id",
    properties: [...articleFields],
    associations: [
      { name: "author", mapId: "userMap", columnPrefix: "author_" },
      { name: "voting", mapId: "votingMap", columnPrefix: "voting_" },
    ],
  },
]

exports.relationsMaps = relationsMaps
exports.userFields = userFields
exports.articleFields = articleFields
