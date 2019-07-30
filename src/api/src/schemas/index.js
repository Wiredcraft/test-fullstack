const user = require("./user-schema")
const article = require("./article-schema")
const voting = require("./voting-schema")
	
module.exports = function(app) {
  app.schemas = {
    user,
    article,
    voting
  }
}
